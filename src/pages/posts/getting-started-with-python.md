---
layout: "@/layouts/BlogPost"
title: Get started with Python
pubDate: 29 March 2020
description: Everything you need to start writing code in Python.
tags: ["python"]
author: "Ratul Maharaj"
---

## What is this thing?

Python is a programming language that was created by Guido van Rossum in the late 1980s. Python is sometimes referred to as a general-purpose language, which basically implies that you can use it for anything you want. From developing desktop applications, websites and web applications to data science, machine learning or building an Iron Man suit - you can do it all with python (well, sort of).

Python is also a high-level programming language, which makes it easier for you to focus on the core functionality of your application or program. It has a simple syntax which makes the code easier for humans to read.

It is also an interpreted language, which means that it doesn't need to be <a target="_blank" href="https://www.webopedia.com/TERM/C/compile.html">compiled</a> before it's programs are executed. Instead, this other thing, called an interpreter, looks at your program and executes it on the fly.

### Should I consider learning it?

Yes

### Installation

Python comes pre-installed on most new computers. To check if you have python installed already, open up a new <a target="_blank" href="https://www.wikihow.com/Open-the-Command-Prompt-in-Windows">command prompt</a> or <a target="_blank" href="https://www.wikihow.com/Open-a-Terminal-Window-in-Mac">terminal</a> window and type `python` or `python3`. If you get an error, then chances are python isn't yet installed on your machine.

Head over to <a target="_blank" href="https://www.python.org/">python.org</a> and navigate to the downloads page where you'll be able to find the latest version of python for your operating system. During the installation process, be sure to check the box that says 'Add Python to PATH' - this will allow you to use python from anywhere on your computer. If you would like a step-by-step guide on how to install python on your computer, you should be able to find one at <a target="_blank" href="https://realpython.com/installing-python/">realpython.com/installing-python</a>.

Another way to get python onto your computer, which works particularly well if you're on a computer that is controlled by your employer's IT administrator, is to install <a href="https://www.anaconda.com/distribution/">Anaconda</a> (or <a target="_blank" href="https://docs.conda.io/en/latest/miniconda.html">Miniconda</a> if you're looking to save some space). This includes everything you need to get started, such as python itself, a few popular python packages as well as Jupyter Notebooks - a great tool used to create and share documents that contain live code, equations, visualizations and explanatory text.

### Package manager

[pip](https://pip.pypa.io/en/stable/) is the standard package manager for python. It will allow you to install and manage additional libraries and dependencies which are not included in the standard python library. pip is typically included in the standard python installer. To check if you have pip, after installing python, you can type `pip --version` in your terminal. You can install python packages by using the command `pip install package_name` or `pip install package_name==version` to install a specific version of a package.

A python package is made up of python modules, which are essentially files with a .py extension containing pre-written python code that other developers have created for others to re-use. There are an insane amount of python packages out there, which you'll be able to find on <a target="_blank" href="https://pypi.org/">PyPI</a> (the Python Package Index) - the official repository for third-party software for the python programming language.

PyPI is where pip gets python packages from when you use pip to install a new package on your computer.

### A worthy text editor

The last thing you would need, in order to start coding, would be a decent text editor. As of writing this, I use <a target="_blank" href="https://code.visualstudio.com/">VS Code</a>, which is a Microsoft product that can be used with just about any language. It's clean and customizable with some cool themes but more importantly, it's free and open source!

You can check out this <a target="_blank" href="https://code.visualstudio.com/docs/python/python-tutorial">tutorial</a> for more info on installing VS Code.

### Writing some code

Once you're all setup, it's almost tradition to create a 'Hello World' app to ensure that everything is working correctly. You can do this by creating a file named `main.py` which contains the following code.

```py
print('Hello World!')
```

If you got this far, you should see a 'Hello World!' printed out on your screen. If not, don't panic.

One of the great things about python is the community. You should be able to do a quick google search for just about any issue you have (you could even copy and paste an error you get straight into google) and chances are that someone else has had and solved the exact same problem.

Now go change the world!
