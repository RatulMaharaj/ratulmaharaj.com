---
layout: "@/layouts/BlogPost"
title: Proxying pip
pubDate: 15 May 2023
description: How to install Python packages with pip when you're behind a company firewall.
tags: ["python", "pip"]
author: "Ratul Maharaj"
---

If you're working with python on your company's network, chances are you're behind a firewall and that you may have run into issues whilst trying to install python packages with pip. This is because pip doesn't know how to use your proxy. Maybe this will help.

## What's a proxy?

A proxy is a server that sits between your computer and the internet. It's typically used to filter requests and block certain websites.

## Getting around it

You can tell pip that it needs to work with your proxy by setting the `http_proxy` and `https_proxy` environment variables. Alternatively, you can use the `--proxy` flag when running a pip command (I've personally had a bit more success with this method).

### Constructing the proxy url

Assuming you're on a windows machine, you can find the proxy url by searching for `internet options` in the start menu. Then go to the `Connections` tab and click on `LAN settings`. You should find the proxy url in the `Proxy server` section. Alternatively you can go to `Settings` and search for `proxy`.

The proxy url should look something like this: `http://proxy.company.net`. The part we care about is the `proxy.company.net`. Typically `8080` is the default port, but your company may use a different port.

Once you have this url, you can them construct the url that we will pass to pip. It should look something like this:

```txt
http://<username>:<uri_encoded_password>@proxy.company.net:8080
```

The `<username>` and `<uri_encoded_password>` are your windows credentials.

The `<uri_encoded_password>` is the URI encoded version of your password where any special characters are replaced with their % encoded counterparts  e.g. `password!` becomes `password%21`. Here are the commonly used characters and their encoded counterparts:

| Character | Encoded Character |
| :---------: | :-------: |
| !         | %21     |
| @         | %40     |
| #         | %23     |
| $         | %24     |
| %         | %25     |
| ^         | %5E     |
| &         | %26     |
| *         | %2A     |

You can find a more comprehensive list of characters [here](https://www.w3schools.com/tags/ref_urlencode.ASP).

## Installing packages

Once you have constructed the proxy url, you can pass it to pip using the `--proxy` flag. Here's an example:

```txt
pip install -r requirements.txt --proxy http://<username>:<uri_encoded_password>@<proxy_url>:<port>
```
