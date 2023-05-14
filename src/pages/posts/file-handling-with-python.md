---
layout: "@/layouts/BlogPost"
title: File handling with python
pubDate: 8 November 2022
description: Using python to read, write and delete files
tags: ["python", "functions"]
author: "Ratul Maharaj"
---


## File handling with python

Python has the ability to simplify the way in which we work with files. This is a very useful skill to have when you are working with data which is stored in a flat file.

We will start off by looking at some of the built in functions that we can use to read, write and delete data from files. Thereafter, we will look at how we can leverage the functionality within the pandas library to work with our data.

## Working directories

Before we can start working with files, we need some way of telling python which directory our files live in. There are multiple ways to do so e.g. you can use the os module to change the working directory. However, I prefer to use the `pathlib` module as it is more intuitive and a little easier to use.

```python
# Import the pathlib module
from pathlib import Path

# Define the working directory
working_directory = Path('/path/to/working/directory')
```

Something to note when providing a path to a directory on windows is that you need to use double backslashes. This is because the backslash is an escape character in python. Therefore, if you want to use a backslash in your path, you need to escape it with another backslash. For example, if you want to use the path `C:\Users\username\Documents` you need to use `C:\\Users\\username\\Documents`. 

Alternatively, you can use a raw string by prefixing the path with an `r`. For example, `r'C:\Users\username\Documents'`. This will tell python to treat the backslashes as a raw string and not an escape character.


We can now easily refer to files within the working_directory using a relative path. For example, if we have a file called `data.csv` in our working directory, we can refer to it as follows:

```python
# Define the file path
file_path = working_directory / 'data.csv'
```

## Writing files

To write to a file we will be using the `open()` function. This function takes two arguments, the file name and the mode. The mode can be either `r` for read, `w` for write or `a` for append. The default mode is `r` if no mode is specified. The `open()` function returns a file object, which has a `write()` method for writing to the file.

```python
# Open the file in write mode and add some text to it
file = open(working_directory / "file.txt", "w")
file.write("Hello world!")
file.close()
```


## Reading files

To read a file we can again use the `open()` function. This time we will specify the mode as `r` for read.

```python
# Open the file in read mode and read the contents
file = open(working_directory / "file.txt", "r")
content = file.read()
file.close()
```

The `read()` method takes an argument for the number of bytes to read. If no argument is specified, it will read the whole file. The `readline()` method reads a single line from the file. The `readlines()` method reads all the lines from the file and returns them as a list.

Let's first add a few more lines to our file.

```python
# Open the file in write mode and append some text
file = open(working_directory / "file.txt", "a")
file.write("This is a new line.")
file.write("This is another new line.")
file.close()
```

We can now read the file line by line using the `readline()` method.

```python
# Open the file in read mode and read the contents line by line
file = open(working_directory / "file.txt", "r")
line_1 = file.readline()
line_2 = file.readline()
line_3 = file.readline()
file.close()
```

Using `readlines()` we can read all the lines from the file and store them in a list.

```python
file = open(working_directory / "file.txt", "r")
content = file.readlines()
file.close()
```

## Deleting files

To delete a file we will be using the `remove()` function from the `os` module. This function takes the path to the file as an argument and returns `None` if the file is deleted successfully.

```python
# Import the os module
import os

# Delete the file
os.remove(working_directory / "file.txt")
```

## Using _with_ statements

The `open()` function returns a file object, which has a `close()` method for closing the file. However, if an exception is raised when we are performing operations on the file, the `close()` method will not be called and the file will remain open. This can lead to errors when trying to perform operations on the file. To avoid this, we can use a `with` statement. This will automatically close the file once we are done with it.

```python
# Open the file in write mode and add some text to it
with open(working_directory / "file.txt", "w") as file:
    file.write("Hello world!")
```

## Using pandas

When working with data, we will often need to read data from a file and store it in a data structure. This is where the pandas library comes in handy. The pandas library has a `read_csv()` function which can be used to read data from a csv file and store it in a pandas dataframe. The `read_csv()` function takes the path to the file as an argument and returns a pandas dataframe.

```python
# Import the pandas library
import pandas as pd

# Read the data from the csv file
df = pd.read_csv(working_directory / "data.csv")
```

We can also use the `to_csv()` function to write a pandas dataframe to a csv file. This function takes the path to the file as an argument and returns `None` if the file is written successfully.

```python
# Write the data to a csv file
df.to_csv(working_directory / "data_output.csv")
```

Some other pandas data handling functions to experiment with include `read_excel()`, `read_json()` and `read_sql()`. You can find more information about these functions [here](https://pandas.pydata.org/pandas-docs/stable/reference/io.html).