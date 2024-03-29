---
layout: "@/layouts/BlogPost"
title: Python's virtual environments
pubDate: 16 July 2020
description: The venv module and how to use it.
tags: ["python"]
author: "Ratul Maharaj"
---

## Why you should use venv

It can be quite tempting to just install all your dependencies globally, but you'll soon find yourself running into issues.

By default, every Python project on your system uses the same directories to store and retrieve third party libraries (site-packages) and given that Python isn't able to differentiate between various versions of packages in the `site-packages` directory, a real problem arises.

A virtual environment is a tool that helps to keep dependencies required by different projects separate by creating an isolated python environment for them.

## Creating virtual environments

The easiest way to create a virtual environment in Python (version 3.3 and later) is to use the `venv` package that is built into the standard library.

A virtual environment can be created in your current working directory by running the following command in a terminal:

```py
python -m venv venv
```

The `python -m` command tells Python to run a library module as a script. The first `venv` specifies which module should be run i.e. the `venv` module. The second `venv` is the name of the virtual environment. I like naming my virtual environments `venv`, but you can really name it anything you like.

You should now be able to see a new folder named `venv` in your current working directory. The structure of this folder should look similar to the following:

```sh
# Windows
main.py
venv
├── Include
├── Lib
│   └── site-packages
├── Scripts
│   ├── activate
│   ├── activate.bat
│   ├── activate.ps1
│   ├── deactivate.bat
│   ├── pip.exe
│   └── python.exe
└── pyvenv.cfg
```

This is the virtual environment. As seen above, a version of `python` or `python.exe` is placed in the scripts folder as well as a version of `pip`. This will be found in `.\venv\bin` on mac.

So now when you `pip install` packages into your virtual environment, they will get placed in the `site-packages` folder above. The `scripts` folder also contains scripts that can be used to activate the virtual environment. Again, `venv` is just a Python package and the version of Python that exists inside the virtual environment will depend on the version of Python used to create the environment.

Note that any Python scripts you create e.g. `main.py` should sit outside of the `venv` folder.

## Activating the virtual environment

In order to `pip install` packages into the virtual environment you need to first activate it. This step is quite important as it allows you to specify that all project dependencies must come from the virtual environment and not the global environment. As seen in the `Scripts` folder above, creating a new virtual environment will create various scripts that can be used to activate and deactivate the virtual environment.

From the root of your project folder, you can activate the `venv` with one of the following:

```sh
# windows
venv\scripts\activate

# mac
source ./venv/bin/activate
```

Once the virtual environment has been activated you can them `pip install` a package e.g. `pip install pip-install-test` and it will be installed to the `site-packages` folder in the virtual environment. You can then proceed to the `import` packages as you usually would in your Python scripts.

## Requirements.txt

To quickly and easily replicate environments elsewhere or even on other machines, you can create a `requirements.txt` file using the commands:

```python
pip freeze > requirements.txt
```

This will create a file which specifies all the dependencies of a project along with the specific version of each required package. The `requirements.txt` file sits outside of the `venv` folder and looks something like this:

```python
pip-install-test==0.5
```

You can copy this file elsewhere, create another virtual environment and install all the listed packages into your new virtual environment using:

```python
pip install -r requirements.txt
```

Note that the `requirements.txt` file does not specify the version of Python that is required.

## Deactivating the virtual environment

The easiest way to get out of a virtual environment is to use the `deactivate` command in the terminal.

## Other alternatives for creating virtual environments

There are many ways to create virtual environments in Python. In this post, I demonstrated how to use `venv` simply because it is built into the standard library and doesn't require any additional packages. However there are many other feature rich packages out there worth exploring.

Some notable ones are [virtualenv](https://pypi.org/project/virtualenv/) and [pipenv](https://pypi.org/project/pipenv/).
