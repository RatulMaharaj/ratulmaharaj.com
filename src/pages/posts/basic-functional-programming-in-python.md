---
layout: "@/layouts/BlogPost"
title: Basic functional programming in Python
pubDate: 31 October 2022
description: And why the func should you care?!
tags: ["python", "functions"]
author: "Ratul Maharaj"
---

## What is a function?

A function is a block of code that is executed when it is called. It can take parameters and return a value. It is a way to create reusable code.

## Why use functions?

Functions are useful for creating reusable code. They can be used to perform a specific task. They can also be used to perform a specific task multiple times or to perform a specific task multiple times with different parameters.

## Built-in functions

Python has a number of built-in functions. These are functions that are already defined in the Python language. They can be used without having to define them. Some of the most common built-in functions are:

* `print()` which prints it's arguments to the screen,
* `input()` which takes input from the user,
* `len()` which returns the length of an object,
* `type()` which returns the type of an object, and many others.

## User-defined functions

User-defined or 'regular' functions in python are custom functions which we can create with the `def` keyword.

### Arguments and return values

User-defined functions can take arguments and return values. The `return` keyword is used to return a value from a function. If no value is returned, the function returns `None`. The `return` keyword can also be used to exit a function early.

```python
# Example of arguments and return values

def add(a, b): # a and b are called arguments
    c = a + b
    return c # c is called a return value
```

### Calling a function

To call a function, you use the function name followed by parentheses. The parentheses can contain arguments to pass to the function. The arguments are separated by commas. The order of the arguments matters.

```python
# Example of calling a function

add(1, 2) # returns 3
```

We can also store the return value of a function in a variable to use later.

```python
# Example of storing the return value of a function in a variable

result = add(1, 2)
print(result) # prints 3
```

### Docstrings

Docstrings are used to document functions. They are defined by a string literal that is the first statement in the function. They are also used by the `help()` function to display documentation for a function.

```python
# Example of a docstring

def add(a, b):
    """Adds two numbers together"""
    c = a + b
    return c
```

### Type annotations

Type annotations are used to specify the type of arguments and return values. They are defined by a colon followed by the type. They are not enforced by the Python interpreter, but they can be used by other tools (e.g. [pydantic](https://pydantic-docs.helpmanual.io/)).

```python
# Example of type annotations

def add(a: int, b: int) -> int:
    c = a + b
    return c
```

The example above takes two integers and returns an integer.

### Default arguments

Default arguments are used to specify a default value for an argument. If the argument is not passed to the function, the default value is used instead. Default arguments must be defined after all non-default arguments.

```python
# Example of default arguments

def add(a, b, c=0):
    d = a + b + c
    return d

add(1, 2) # returns 3
add(1, 2, 3) # returns 6
```

### Arbitrary arguments (args)

Arbitrary arguments are used to pass a variable number of arguments to a function. They are defined by an asterisk (`*`) followed by the name of the argument. The arguments are passed to the function as a tuple.

```python
# Example of arbitrary arguments

def add(*args):
    total = 0
    for arg in args:
        total += arg
    return total

add(1, 2, 3) # returns 6
```

### Keyword arguments (kwargs)

Keyword arguments are used to pass a variable number of keyword arguments to a function. They are defined by two asterisks (`**`) followed by the name of the argument. The arguments are passed to the function as a dictionary.

```python
# Example of keyword arguments

def add(**kwargs):
    total = 0
    for key, value in kwargs.items():
        total += value
    return total

add(a=1, b=2, c=3) # returns 6
```

## Lamda functions

Lambda functions are anonymous functions (no named identifier) that can be used to create a function on the fly. They are useful when you need to pass a function as an argument to another function. They are defined with the `lambda` keyword followed by the arguments, a colon, and the expression to return.

```python
# Example of a lambda function

# a,b are the arguments, a + b is the expression to return
add = lambda a, b: a + b 

add(1, 2) # returns 3
```

### Lamda functions in pandas

Lamda functions are useful when used with pandas. They can be used to create new columns in a dataframe.

```python
# Example of using a lambda function to create a new column in a dataframe

# Import pandas
import pandas as pd

# Create a dataframe 
df = pd.DataFrame({
    "a": [1, 2, 3],
    "b": [4, 5, 6]
})

# Create a new column with the sum of a and b
df["c"] = df.apply(lambda row: row["a"] + row["b"], axis=1)
```

## Decorator functions

Decorator functions are used to modify the behavior of other functions. They are defined with the `@` symbol followed by the name of the decorator function. The decorator function must take a function as an argument and return a function.

```python
# Example of a decorator function

def decorator(func):
    def wrapper(*args, **kwargs):
        print("Before")
        func(*args, **kwargs)
        print("After")
    return wrapper

@decorator
def add(a, b):
    print(a + b)

add(1, 2)
```

A common use case for decorators is to determine the execution time of a function. Here is an example of a timer:

```python
# Example of a decorator function that times a function

import time

def timer(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        func(*args, **kwargs)
        end = time.time()
        print(f"Time taken: {end - start}")
    return wrapper

@timer
def add(a, b):
    print(a + b)

add(1, 2)
```

## Recursive functions

Recursive functions are functions that call themselves. They are useful for performing a task multiple times. They are defined with the `def` keyword followed by the name of the function, the arguments, a colon, and the expression to return. The expression to return must call the function again with different arguments.

```python
# Example of a recursive function

def factorial(n):
    if n == 0:
        return 1
    return n * factorial(n - 1)

factorial(5) # returns 120
```

I would be careful with these as they can cause infinite loops if not used correctly.

## Exercises

You can find some exercises to practice your python skills [here](https://www.codecademy.com/resources/blog/python-code-challenges-for-beginners/) and [here](https://www.practicepython.org/).
