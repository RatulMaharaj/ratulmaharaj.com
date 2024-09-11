---
layout: "@/layouts/BlogPost"
title: I'm trying to build a bootstrapped SaaS
pubDate: 12 September 2024
description: Spoiler alert, it's really tough
tags: ["invoicelink.io"]
author: "Ratul Maharaj"
---

## The inspiration behind Invoicelink.io

As a freelancer in South Africa, there aren't many good solutions that allow me to send payment links to international clients. 

In 2023, I started working part-time on Upwork but was quickly annoyed about having to give up 10-20% of my earnings just to use the platform.

Having built a few e-commerce sites in the past, my idea was to take the checkout experience from online shopping and attach an invoice to it. And so, [invoicelink.io](https://invoicelink.io) was born.


## My personal experience with the app

I'm obviously biased, but I think it's a great tool. I've been using various versions of the app for about 2 years now and have had really great results. 

I get paid on time, almost instantly after sending out my invoices and the payment process is really simple for my clients. They effectively just swipe their company credit card!


### How it works

The app allows you to create invoices. You can customise the look and feel, add your clients details, line items, taxes etc. Each invoice will get a unique URL that you can copy, paste and share with your client. 

They can view the invoice, download a PDF, and pay you directly from this page. Check out this [demo](https://pay.invoicelink.io/demo) to see how it works.


### BYO payment gateway

I don't want to touch people's money and I don't want to be a payment gateway. I want to build a really great invoicing app. 

So with this in mind, my approach to payments has been to integrate with existing gateways. 

I build integrations with a variety of gateways and allow users to connect their accounts. This eliminates a whole lot of complexity and risk on my end and allows me to focus on building a great invoicing app.

If you would like me to support a gateway in your country, please do let me know via [discord](https://discord.gg/TwCrkdCnPS) or [github](https://github.com/orgs/invoicelink-io/discussions).

### Crypto

I'm a big fan of the transactional nature of cryptocurrencies and am trying hard to figure out a seamless way to integrate it into the app. In my opinion, it's the future of payments and I really want to enable people to pay and get paid with it.

There are 4 scenarios that come to mind when thinking about crypto payments:
- The client pays with crypto and my user receives crypto
- The client pays with crypto and my user receives fiat
- The client pays with fiat and my user receives crypto
- The client pays with fiat and my user receives fiat, but the payment is routed through crypto

I currently have an integration for coinbase commerce but that unfortunately only covers the first point above. I'm still thinking about ways to cover the other 3 scenarios. If you have ideas, I would love to hear them.

## Turning this into a SaaS

So far, I've been bootstrapping this project. I've been working on it part-time for about 2 years now. I have had ~96 signups and have on average 4 monthly active users.

Here's what I've learned so far:
- Going from zero to one is extremely hard i.e. building software is fairly easy, getting people to use it is extremely hard
- Just because an app is free, doesn't mean people will use it
- Marketing is very hard
- Advertising is expensive and almost never works

### Marketing

Here's what I have tried so far:
- Social Ads
- Posting on forums
- Launching on Product Hunt
- Posting to Hacker News

Most of these have not worked. I have been getting some traffic from organic search as well as a few Reddit referrals. I think this is an area I need to focus on more.

### Open sourcing the project

Today I decided to open source the project. Check it out  [here on github](https://github.com/invoicelink-io/invoicelink).

It's a shot in the dark, but I'm hoping that doing so will help attract users as well as build trust with the community. 

This was a hard decision, but ultimately I think it's the right one. I chose the GNU GPL v3 license because I want to ensure that any derivative works are also open source. I want to build a community around this project and ultimately a business as well. I think this is the best way to do so.

## What's next

For now, to paraphrase Paul Graham, I will be doing the things that don't scale - I'm going to try my best to find people who have the problem I'm solving for.

My goal now is to get to 10 monthly active users and then go from there. I think this is a good milestone to aim for and will be a good indicator of whether this project has legs or not.

If you're interested in trying out the app, please do sign up at [app.invoicelink.io](https://app.invoicelink.io) and let me know what you think!


