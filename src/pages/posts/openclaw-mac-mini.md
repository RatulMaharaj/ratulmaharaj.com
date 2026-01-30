---
layout: "@/layouts/BlogPost"
title: OpenClaw on a Mac mini
pubDate: 31 January 2026
description: My always-on AI assistant that writes code whilst I sleep.
tags: ["AI"]
author: "Ratul Maharaj"
---


I've been running [OpenClaw](https://openclaw.ai), previously [Clawdbot](https://clawdbot.ai) (and then [moltbot](https://molt.bot)), on my base model M4 Mac mini for about a week now and honestly? It's been pretty wild. Here's what I've figured out so far.

## What is this thing?

So the way I understand it: OpenClaw lets you give an LLM actual control of your computer. Instead of just chatting, I can text it "create a PR for that bug fix" and it actually does it - clones the repo, makes changes, pushes, opens the PR. Like having an assistant that does work when instructed.

## Why a Mac Mini?

Because that's what everyone seems to be doing and I had just got an amazing Black Friday deal on one.

## IDENTITY.md

One of the first things I did was let my OpenClaw choose its own name. It chose **Arlo** - which means "fortified hill", here to hold the line. It also chose 🏔️ as its emoji.

## My Setup

My setup is actually pretty simple. I created a bot that I send a message to via discord. The bot will go do some work either interactively or by spawning background agents and then respond to my message. I chose discord because it's where I am most of the time anyway.

GitHub Copilot has been great. I'm able to sign in pretty much everywhere with it and get access to all my favourite models. I'm currently reusing my subscription across Zed, OpenCode and now OpenClaw.

I'm using Claude Opus 4.5 as my primary model - it's awesome but also quite expensive and OpenClaw seems to burn through premium requests extremely fast (especially if it's using it's own agents to write code).

I am also running within a Tailscale network so that I can access the dashboard easily from my other devices.

If you're interested in the setup, here's what's been working for me:

```json
{
  "channels": {
    "discord": {
      "enabled": true,
      "token": "your-discord-token",
      "groupPolicy": "disabled",
      "dm": {
        "enabled": true,
        "policy": "allowlist",
        "allowFrom": ["your-discord-id"]
      }
    }
  },
  "gateway": {
    "port": 18789,
    "mode": "local",
    "bind": "loopback",
    "auth": {
      "allowTailscale": true,
      "mode": "password",
      "password": "your-password"
    },
    "tailscale": {
      "mode": "serve"
    },
    "trustedProxies": ["127.0.0.1"]
  }
}
```

Setting the `"dm.policy" : "allowlist"` and putting your discord user id in the allowFrom array will ensure that only you can interact with your OpenClaw. I also disabled group chats to be safe.

I'd recommend starting with `openclaw configure` and then going from there. If you're struggling to figure out how to setup tailscale or discord, I would suggest using the built-in dashboard chat to just ask your OpenClaw to do it for you.

## What it's been good for

Honestly, it's pretty amazing. I understand the hype. I have mostly been using it to orchestrate [OpenCode](https://opencode.ai) (an open source AI coding agent), but it's been really great at:

- Managing GitHub issues
- Creating pull requests on my behalf
- Cloning and setting up repos
- Doing quick checks on other PRs
- Checking that my apps build locally
- Running tests locally

The desktop file thing has been weirdly satisfying. I'll ask it to draft a letter, slap it on company letterhead, and drop it on my desktop. A minute later it's just... there. Ready to send. Could I let it send emails directly? Probably. Am I ready for that? Not yet.

It also has baked in cron jobs that can be used to schedule tasks. For example, I've asked it to open 2 small PRs every night against certain repos. The first is to help improve test coverage. The second is to identify and suggest ways to reduce tech debt within our codebase.

It's actually so cool having something that literally works whilst I sleep.

Of course, I also have a mandatory morning brief setup. Here's an example of what that looks like:

```txt
Good morning Ratul! ☀️ Happy Friday!

🌡️ Weather — Cape Town
19.6°C, mostly clear skies with light southerly breeze (6 km/h). 
Nice summer morning.

---
✅ Todoist Tasks Due Today
None scheduled for today! Either you've got a clean slate or 
tasks need due dates.
---

🔧 GitHub — Needs Attention
loopedautomation/mono (PRs)
#225: chore: improve error logging in API routes (yours)
#224: test: add unit tests for utilities/validation (yours)
#218: Aligning settings route to invoices (Happy)
#88: Abstract permission system (Copilot agent — stale?)

→ Consider clearing some of these today if they're ready.

---
📣 Warm Outreach Reminder
Goal: 5 people today. Ask if they know any freelancers, consultants, 
or agencies who track billable hours.
---

Have a productive Friday! 🏔️
```

I actually look forward to these now, especially now that it pulls info from various places for me.

## Where it struggles

Although the experience has mostly been great, I find that it often forgets to use OpenCode for code related tasks. This is a bit annoying because I then get bombarded with discord progress messages, I'd much rather it go away and do its thing, then come back with questions.

It is still early days though, and I'm sure this tech is only going to get better from here. I'm excited for it.

> As you saw from the warm outreach reminder above - we're working hard to validate our applications and find our 10 customers. If you are someone who runs a freelance or service business and has trouble with tracking time or invoicing - I would love to chat to you and show you what we are building! Please reach out at [cal.com/ratulmaharaj](https://cal.com/ratulmaharaj) or share this with someone who might be interested. You can find more info at [looped.sh](https://looped.sh)
