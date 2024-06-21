---
layout: "@/layouts/BlogPost"
title: Tauri v2 custom menu items
pubDate: 21 June 2024
description: Adding a webview navigation shortcut to the native app menu.
tags: ["tauri", "rust", "javascript"]
author: "Ratul Maharaj"
---

I've been trying to add a custom native `Settings...` menu item to my Tauri v2 app. When clicking this menu item, I wanted the frontend webview to navigate to the `/settings` page.

After a few days of struggling with this, I've finally got it working! Here's how I did it:

## Overview

In order to achieve this, we need to implement a custom menu via the Rust backend. This will allow us to add a custom menu item to our app menu with a specified `id`.

Once added, we can listen for menu click events on the backend and `emit` a window event to the frontend. 

On the frontend, we can listen for this custom event and trigger the desired action which, in my case, will be navigating to the `/settings` page.

Here's what the code looks like:

## Create a custom menu

In your `main.rs` file, we will create a menu with various submenus as required (e.g. File, Edit, Help etc). From what I understand, menus can be created either globally or per window. I currently only have a single window in my app, so I opted for a global menu.

I added my custom `Settings...` menu item to the `App` submenu, which is the submenu that appears when you click on the app name in the top menu bar on macOS.

Once we have created the menu, we can use `app.on_menu_event()` to listen for the menu item click event on the backend and `emit` a browser window event to our frontend as follows:

```rust
use tauri::{
    menu::{AboutMetadata, MenuBuilder, MenuItemBuilder, SubmenuBuilder},
    Manager,
};

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let handle = app.handle();
            
            // my custom settings menu item
            let settings = MenuItemBuilder::new("Settings...")
                .id("settings")
                .accelerator("CmdOrCtrl+,")
                .build(app)?;

            // my custom app submenu
            let app_submenu = SubmenuBuilder::new(app, "App")
                .about(Some(AboutMetadata {
                    ..Default::default()
                }))
                .separator()
                .item(&settings)
                .separator()
                .services()
                .separator()
                .hide()
                .hide_others()
                .quit()
                .build()?;

            // ... any other submenus

            let menu = MenuBuilder::new(app)
                .items(&[
                    &app_submenu,
                    // ... include references to any other submenus
                ])
                .build()?;

            // set the menu
            app.set_menu(menu)?;

            // listen for menu item click events
            app.on_menu_event(move |app, event| {
                if event.id() == settings.id() {
                    // emit a window event to the frontend 
                    let _event = app.emit("custom-event", "/settings");
                }
            });

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

## Listening for the custom event

On the frontend, we can listen for the `custom-event` event using `listen` function from the `@tauri-apps/api/event` library. 

I'm using `Next.js` so here's how I implemented this in my `providers.tsx` component:

```typescript
import React, { useEffect } from "react";
import { listen } from "@tauri-apps/api/event";
import { useRouter } from "next/navigation";

export default function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    // listen for Tauri events
    const unlisten = listen("go-to", (e: { payload: string }) => {
      console.log("An event occurred: ", e);
      router.push(e.payload);
    });

    return () => {
      if (unlisten === undefined) return;
      unlisten.catch(console.error);
    };
  }, [router]);
}
```

If you're getting `__TAURI_IPC__ is not a function` errors, I would suggest checking your dependency versions.

## Accelerator Key

We want our users to be able to navigate to the `/settings` page using a hotkey as well by pressing `CmdOrCtrl+,` on their keyboard. Tauri will take care of this for you, provided you've set the `accelerator` property when creating the menu item.