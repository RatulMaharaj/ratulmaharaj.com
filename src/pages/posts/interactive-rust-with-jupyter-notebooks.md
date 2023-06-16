---
layout: "@/layouts/BlogPost"
title: Interactive Rust with jupyter
pubDate: 16 June 2023
description: Adding a Rust kernel to jupyter notebooks.
tags: ["python", "rust", "notebooks", "jupyter"]
author: "Ratul Maharaj"
---

## My experience with notebooks

I haven't always been the biggest fan of jupyter notebooks, but over the past year or so I've really grown to love using them. There are two scenarios in particular in which I find the notebook experience to be greatly superior to traditional methods of coding.

The first is when any sort of tabular data is involved. Figuring out how to manipulate a Pandas dataframe in a terminal, whilst having to repeatedly run `python main.py`, just isn't fun.

The second, and probably what I'm most looking forward to doing now with Rust, is when you want to learn or teach someone else how to code. When it comes to interactive coding, the notebook experience is unmatched, giving you the ability to play around, experiment and iterate on a few lines of code at a time.

I've recently learnt that I can add a variety of kernels (you can think of these as programming languages) other than Python to the classic jupyter notebook experience and so that's what I'm going to show you how to do here. I'm currently trying to teach myself Rust, so this post will be about adding a Rust kernel, but the same general approach will likely apply to any other kernel you want to add.

## Adding a Rust kernel to jupyter

I'm going to go ahead and assume you already have jupyter notebooks up and running, but if you don't then you can install it with `pip install notebook`.

### Step 1: Install Rust

From what I can tell, the most recommended approach to installing Rust is to use `rustup`. This will install `rustc`, `cargo`, `rustup` and other standard Rust tools to the relevant `.cargo` directory on your device.

You can find the guide for installing Rust using `rustup` linked [here](https://www.Rust-lang.org/tools/install).

Once complete, verify your Rust installation by running the following:

```sh
rustc --version
```

### Step 2: Installing the Rust jupyter kernel

Once you have Rust installed, we can move on to installing the Rust kernel for jupyter.

You can find a comprehensive list of all available jupyter kernels in the [jupyter github repo](https://github.com/jupyter/jupyter/wiki/Jupyter-kernels). The one we are interested in, is called the `EvCxR Jupyter Kernel`.

> EvCxR: An evaluation context for Rust.

You can either download the prebuilt binary from their [releases](https://github.com/evcxr/evcxr/releases) page or build it from source by running:

```text
cargo install evcxr_jupyter
```

It's worth noting that this step may take a few minutes.

### Step 3: Add the Rust kernel to jupyter

Once installed, we need to let jupyter know that we have a new kernel to use. We can do this by running the following:

```sh
evcxr_jupyter --install
```

### Step 4: Create a new notebook using the Rust kernel

Run `jupyter notebook` to open up the classic notebook experience and create a new notebook. If all went well, you will hopefully notice that you a new kernel available when creating a notebook. Select the one called `Rust`.

And that's it. You can now write some Rust code in a jupyter notebook!

I'm really looking forward to seeing if this helps make learning Rust a tiny bit easier. If you decide to try this out as well, definitely toot at me on [mastodon](https://fosstodon.org/@RatulMaharaj) - will be keen to hear your thoughts on this.
