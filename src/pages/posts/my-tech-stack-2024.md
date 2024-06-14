---
layout: "@/layouts/BlogPost"
title:  My 2024 stack
pubDate: 17 April 2024
description: The tools & tech I'm using as a full stack web developer in 2024.
tags: ["stack", "frameworks", "javascript", "python"]
author: "Ratul Maharaj"
---

I've been a full stack web developer for a several years now and thought it would be fun to document the tools and technologies I'm currently using. 

Think of this as something similar to a `/uses` page, except it's for building apps and in the format of a blog post.

## Web Frameworks

**[SvelteKit](https://kit.svelte.dev/)**

If I'm building a full stack web application in my personal capacity, then the likely choice will be SvelteKit. The developer experience is fantastic, the community is growing rapidly and the framework seems to be really well thought out.

Svelte v5 is coming soon. I haven't tried it yet, but I've watched a few videos and I'm really interested to play around with the new Runes as well as the fined-grained reactivity.

**[Next.js](https://nextjs.org)**

If I'm working on a team with other developers, I'm likely going to be using Next. React tends to be what most people already know, and that's perfectly fine. 

**[Astro](https://astro.build)**

At this point, (almost) all my static sites are built with Astro (Including this one). They make it really easy to build fast, modern websites and have a great plugin ecosystem. 

They also have their island architecture which is a really fascinating concept. I have found there to be a great overlap between Astro components and Svelte components, which tends to be my go-to for sprinkling in some interactivity.

## CSS Frameworks

**[Tailwind CSS](https://tailwindcss.com/)**

I wasn't always a fan of Tailwind. I actually had tried it multiple times and kept going back to regular css modules. Today, I can't imagine authoring my styles any other way. Once you get the hang of it, the productivity gains are unmatched.

The team is also working on some really cool new (rust enhanced?) features, so I'm really excited to try those out soon in Tailwind v4.

## Component Libraries

**[Skeleton UI](https://www.skeleton.dev/)**

I've been enjoying using Skeleton UI in SvelteKit. It has amazing theming capabilities and a really great design system. These two aspects alone have taught me a lot and have been a pleasure to work with. 

The one thing I'm not a huge fan of is their modal component. It uses the Singleton pattern which to my brain sounds like a good thing, but in practice this makes it a much more difficult concept to wrap your head around just to create a simple modal.

They're also currently busy with a major V3 overhaul in attempt to support other frameworks like React and Vue. I'm not sure how I feel about that yet, but I'll be following along closely.

Other notable mentions in this category include [Tailwind UI](https://tailwindui.com/) and [daisyUI](https://daisyui.com/), which I tend to use with React and Next.js projects.

## Standalone APIs

**[FastAPI](https://fastapi.tiangolo.com/)**

FastAPI is awesome - ask anyone who has used it. It's easy to get started, there's plenty of support and my favourite feature by far is the OpenAPI documentation that you get out the box.

## Databases

**[PostgreSQL](https://www.postgresql.org/)**

My go to relational database is PostgreSQL. I run a local postgres server for local dev and typically host staging and production instances on either Vercel or AWS RDS (depending on the size of the project). 

Honorable mention goes out to [DuckDB](https://duckdb.org). It's intended to be a fast in-process analytics database. I have briefly tried it, but I'm not actively using it at the moment. That said, I do really like the idea of a simple portable database. 

### ORMs

**[Prisma](https://www.prisma.io/)**

I'm currently using Prisma and have had a fairly good experience with it so far. The VS Code extension makes the experience of authoring the schema file magical.

I've read a lot of complaints about Prisma's performance, but haven't really felt that pain too much yet. At some point this year, I would like to try out [Drizzle](https://orm.drizzle.team/) which is currently all the rage.

## Authentication

**[Lucia](https://lucia-auth.com/)**

Lucia is fantastic. It's a simple, secure and privacy focused authentication framework that works in any runtime. I've been using it for a few months now and have been really happy with it. They also have a discord server where you can easily get support or find help with common issues.

## Email

**[SendGrid](https://sendgrid.com/)**

SendGrid remains my go-to email service provider. The main selling point for me is that it is incredibly affordable and they have a really simple email API. 

I'm also now using their email marketing service which has more than sufficient functionality for creating drip campaigns and newsletters.

## Testing

**[Vitest](https://vitest.dev/)**

I'm enjoying using vitest for my unit tests. It is compatible with Jest, and is Vite powered - so it works great with both Astro and SvelteKit. 

**[pytest](https://docs.pytest.org)**

In the python ecosystem, pytest has been great to work with as well.

### E2E tests

**[Cypress](https://www.cypress.io/)**

I'm still mostly using Cypress for end-to-end tests, but I'm likely going to move over to [Playwright](https://playwright.dev). They have good typescript support and I've heard good things about their speed.

## CI/CD

**[GitHub Actions](https://github.com/features/actions)** 

GitHub Actions all the way. I use it to run my tests, build my apps as well as publish packages to registries. For free!

## Hosting

**[Vercel](https://vercel.com)**

I currently use vercel for most of my projects. The platform's ease of use is, in my opinion, unmatched. It works exceptionally well with SvelteKit, Astro and Next.js. They also make it really easy to spin up a postgres database.

**[AWS](https://aws.amazon.com/)**

I have recently spent a lot of time learning about how to deploy stuff directly to AWS. In particular, deploying docker containers to ECR and running them on ECS as well as creating managed RDS instances. 

I can see myself moving more towards this in the future, especially given that they now also have data centres in Cape Town, South Africa.

## Analytics

**[PostHog](https://posthog.com/)**

PostHog is genuinely one of the most useful tools I've come across in a long time. It gives you full control over your analytics data and offers amazing session replay capabilities

## Monitoring

**[Sentry.io](https://sentry.io/)**

Sentry is a great tool for performance monitoring and error tracking. I swear this is not an ad.


And that's it! That's (most of) my stack for 2024. I'm sure it will change as the year progresses, but for now I'm really excited to be building with it.