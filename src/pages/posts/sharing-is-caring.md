---
layout: "@/layouts/BlogPost"
title: Sharing Python code
pubDate: 14 May 2023
description: My thoughts on sharing Python code with other users.
tags: ["python", "packaging"]
author: "Ratul Maharaj"
---

Python is great. I absolutely love it. But sharing something I've created can sometimes be a massive chore - depending on who I'm trying to share with.

I think I can bucket the audience I would want to share code with into 3 broad categories:

1. Those who know nothing about code
2. Those who know a little about code
3. Those who can code

## Those who know nothing about code

Believe it or not, this is the audience I'm trying to help with code the most often. These are typically people who have never written a line of code in their life. They don't want to learn how to code, they just want to use the thing I've created, provided it adds value to them in some way.

I typically find that this category is the most difficult audience to share code with.

### Hosted web app

Ah the web, arguably the most flexible option. Thankfully people tend to know how to use a browser, so can almost always solve your problem by creating some sort of web based interface to control your app.

Unfortunately, this approach is expensive. It takes lot of time and effort to build and maintain. So as much as I would love a web app to be the solution to every problem I have, there likely needs to be a really strong motivation to go down this path.

### Hosted notebooks

I haven't tried this myself, but there are ways to do it. The one that comes up often is [binder](https://mybinder.org).

### Try not using code?

This might be a spicy take, but maybe sometimes the best solution is to not use code at all. Sometimes, maybe, just maybe, an excel spreadsheet is perfectly sufficient to help the user solve their problem?

## Those who know a little about code

This category can be interesting to deal with, I've tried a few different things with this group. Typically with this audience, I would walk them through the installation of git and python and I would then show them how to  `pip install` any packages they may need.

In the corporate world, this can sometime be a major blocker especially if they're sitting behind a company firewall and need to use a proxy - this sort of complexity can turn people off pretty fast, so I try to do some hand holding here.

### Jupyter notebooks

This is my favourite way to share code with someone who want to learn. You can help them set up their environment and then just send them a notebook. They can then run the code and see the output. They can also play around with the code and see what happens.

This approach has worked really well with people who are trying to analyze / visualize data or even automate something that would typically be done in excel.

### Mini project in a folder

Once the project gets a little larger, needs to be run on a schedule or needs to have a little more governance around it, I usually move to python scripts in a repo.

It can be quite easy to lose people here, but with a little convincing, I can usually get them to install git and python and then teach them how to clone a repo and run the code.

With this approach, there are a few things I like to make sure I do:

- Make sure the code is well documented and that you have a guide that explains how to get setup and run the code,
- Ensure there's a requirements.txt file that lists all the packages that need to be installed,
- Have just a single entry point into the code, typically a `main.py` file to make it easy for people to know where to start,
- Have some sort of logging in place so that people can see what's happening when they run the code,
- Have a basic configuration file that allows users to make changes to the code without having to change the code itself.
- Have a `run.bat` (or similar) file that users can double click to run the code.

The config file is one of the most important aspects. I tend to reach for a `.csv` file, just because almost everyone knows how to open those and make changes to it. `yaml` is sometimes a good choice if you need to give them flags to turn parts of the process on or off, but since python 3.11+ includes `toml` in the standard library, I'm leaning more towards using that instead.

## Those who are pretty comfortable with code

This is typically the easiest group to deal with. They usually have python installed and know how to use pip. They also know how to clone a repo and run the code. All I would need to do here is send them a link to the repo and they usually take it from there.

It's still pretty important to at least have a `README` file in the repo that explains what the code does and how to run it.

## The bottom line

I've found that the more I do to make it easy for people to use my code, the more likely they are to use it. It's slowly getting easier and easier to share your python code with others, but there's still a lot of room for improvement.

Thankfully there are a lot of great people working on these problems and I'm sure it's only going to get better from here.
