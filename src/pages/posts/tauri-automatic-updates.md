---
layout: "@/layouts/BlogPost"
title: Tauri V2 updater
pubDate: 15 June 2024
description: Making new app versions available to users automatically.
tags: ["tauri", "rust", "python", "javascript"]
author: "Ratul Maharaj"
---

As of writing this post, the beta release of Tauri v2 is available, and I'm helping build a desktop app using it. 

This post will outline how we implemented a basic version of the Tauri updater. Our app has a Next.js (static site) on the frontend. It's is backed by an independent FastAPI server running on [render.com](https://render.com).

## TL;DR

We release new versions of our app using GitHub Actions and GitHub Releases. We have a 'publish' github action workflow which uses the [official @tauri-apps/tauri-action](https://github.com/tauri-apps/tauri-action) github action to build and sign the app. Once this is done, the workflow drafts a new release on GitHub and uploads the built assets to the release.

One of the files uploaded to this github release is a `latest.json` file which contains the version number and download URLs of the latest release as required by the Tauri updater. I could not figure out how to read the raw version of this file directly from the release using the API (I know you can do it from a repo - so you could also consider committing this file to a branch). As a workaround, we use our FastAPI server to download the latest release file from the GitHub release and then serve up the contents of it via an internal API.

When the tauri app starts, it makes a request to the FastAPI server to get the latest release information. If the version of the latest release is greater than the current version, the app will prompt the user to update to the new version. If the user decides to update, the app will restart after having downloaded and installed the latest version.

What follows is some practical guidance on how to implement this:

## Update Dependencies

You will need to add these front-end javascript dependencies to your project:

```bash
pnpm add @tauri-apps/plugin-dialog
pnpm add @tauri-apps/plugin-process
pnpm add @tauri-apps/plugin-updater
```

You will also need to add the corresponding plugins to the Tauri app by adding the following to your `cargo.toml` file:

```bash
cargo add tauri-plugin-updater
cargo add tauri-plugin-dialog 
cargo add tauri-plugin-process 
```


## Initialize plugins

In your `main.rs` (or `lib.rs`) file, initialize the plugins as seen below:

```rust
use tauri_plugin_updater;
use tauri_plugin_dialog;
use tauri_plugin_process;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            #[cfg(desktop)]
            app.handle().plugin(tauri_plugin_updater::Builder::new().build())?;
            Ok(())
        })
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_process::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

## Signing updates

Tauri’s updater needs a signature to verify that the update is from a trusted source. You will need to generate a keypair and password which will be used to sign the update. This can be done by running:

```bash
# macOS and Linux
pnpm tauri signer generate -w ~/.tauri/myapp.key

# Windows
pnpm tauri signer generate -w $HOME/.tauri/myapp.key
```

You will be prompted to enter a password which will be used to sign the update. This password will be required to sign the update in the future.

Once the keypair has been generated, you will find your private and public keys in `~/.tauri/myapp.key` and the `~/.tauri/myapp.key.pub` files respectively.


Create a .env file with the following environment variables:

```bash
TAURI_SIGNING_PRIVATE_KEY="Path or String of your private key"
TAURI_SIGNING_PRIVATE_KEY_PASSWORD="Your private key password (optional)"
```

The variables above also need to be created as [action secrets](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions) in your GitHub repository.

You will need to add the public key generated above to your `tauri.conf.json` file:

```json
"plugins": {
    "updater": {
      "windows": {
        "installMode": "passive"
      },
      "endpoints": [
        "An endpoint that serves the raw content of the latest.json file",
      ],
      "pubkey": "contents of the .key.pub file"
    }
  }
```

## Capabilities

You will need to update the app permissions in the `src-tauri/capabilities/main.json` file to include the following permissions:

```json
"permissions": [
    // ...
    "dialog:default",
    "dialog:allow-ask",
    "dialog:allow-message",
    "updater:default",
    "updater:allow-check",
    "updater:allow-download-and-install",
    "process:allow-restart"
  ]
```

## Release via github actions

Here's what the build and publish step of our github action looks like:

```yaml
- uses: tauri-apps/tauri-action@v0
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    TAURI_SIGNING_PRIVATE_KEY: ${{ secrets.TAURI_SIGNING_PRIVATE_KEY }}
    TAURI_SIGNING_PRIVATE_KEY_PASSWORD: ${{ secrets.TAURI_SIGNING_PRIVATE_KEY_PASSWORD }}
    # you might also need to add app signing secrets here
  with:
    tagName: v__VERSION__
    releaseName: "App v__VERSION__"
    releaseBody: "See the assets to download this version and install."
    includeUpdaterJson: true # this will include the latest.json file in the release
    releaseDraft: true
    prerelease: false
```

The draft release will include the `latest.json` file which contains the version number and download URLs of the latest release.

## Serving the latest.json file

We have a FastAPI server which fetches the `latest.json` file from the GitHub release and serves it up via an internal API. Here's what the endpoint (configured in `tauri.conf.json` as seen above) looks like:

```python
from fastapi import APIRouter
import httpx

router = APIRouter()

@router.get("/updater")
async def fetch_updates():
    url = (
        "https://github.com/{org}/{repo}/releases/latest/download/latest.json"
    )

    async with httpx.AsyncClient(follow_redirects=True) as client:
        response = await client.get(url)
        if response.status_code == 200:
            return response.json()
        else:
            return {"error": "Failed to fetch updates"}
```

This is the approach I thought would be the simplest for us. If you decide to publish your `latest.json` file to an S3 bucket or GitHub gist, you can skip this step and simply provide a URL to the raw contents in the `tauri.conf.json` file.

## Check for updates

Via the frontend, we will need to check for updates and prompt the user to update if a new version is available. Here's an example of how you can do this:

```ts
// updater.ts
import { check } from "@tauri-apps/plugin-updater";
import { ask, message } from "@tauri-apps/plugin-dialog";
import { relaunch } from "@tauri-apps/plugin-process";

export async function checkForAppUpdates(onUserClick: false) {
  const update = await check();
  if (!update?.available) {
    console.log("No update available");
  } else if (update?.available) {
    console.log("Update available!", update.version, update.body);
    const yes = await ask(
      `Update to ${update.version} is available!\n\nRelease notes: ${update.body}`,
      {
        title: "Update Available",
        kind: "info",
        okLabel: "Update",
        cancelLabel: "Cancel",
      },
    );
    if (yes) {
      await update.downloadAndInstall();
      await relaunch();
    }
  } else if (onUserClick) {
    await message("You are on the latest version. Stay awesome!", {
      title: "No Update Available",
      kind: "info",
      okLabel: "OK",
    });
  }
}
```

Since I'm using Next.js and react hooks, I will call this function in my `providers.tsx` file like so:

```ts
// providers.tsx
import { checkForAppUpdates } from "@/utils/updater";

export default function Providers({ children }: {
    useEffect(() => {
        // check for updates
        checkForAppUpdates(false);
    }, []);

    return (
        // ...
    )
}
```

If all goes well, you should be able to push a new version of your app to GitHub and test the updater by running the app.

I would love to hear your thoughts on this approach or any improvements you might have. Feel free to let me know via [X](https://x.com/ratulmaharaj) or [Mastodon](https://fosstodon.org/@ratulmaharaj). 

