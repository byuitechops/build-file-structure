# Build File Structure
### *Package Name*: build-file-structure
### *Child Type*: post import
### *Platform*: All
### *Required*: Required

This child module is built to be used by the Brigham Young University - Idaho D2L to Canvas Conversion Tool. It utilizes the standard `module.exports => (course, stepCallback)` signature and uses the Conversion Tool's standard logging functions. You can view extended documentation [here](https://github.com/byuitechops/d2l-to-canvas-conversion-tool/tree/master/documentation).

## Purpose

This child module goes through the files of the course during conversion. It then reorganizes the files into a new structure so every course has the same file structure. It will also remove unnecessary files and put them into a folder called archives. 

## How to Install

```
npm install git+https://github.com/byuitechops/build-file-structure.git
```

## Run Requirements

 It should be executed before the other post import child modules.

## Options

If there are options that need to be set before the module runs, include them in a table, like this:

| Option | Values | Description |
|--------|--------|-------------|
|settings['Create three main folders']| true/false | Determines whether the course has to create three main folders (it is where the child module should put images inside)|
|settings['Move files into three main folders']| true/false | Determines whether the child module needs to move files into the three main folders |

## Outputs

If your module adds anything to `course.info` or anywhere else on the course object, please include a description of each in a table:

| Option | Type | Location |
|--------|--------|-------------|
|Lesson Folders| Array | course.info|

## Process

Describe in steps how the module accomplishes its goals.

1. Does this thing
2. Does that thing
3. Does that other thing

## Log Categories

List the categories used in logging data in your module.

- Discussions Created
- Canvas Files Deleted
- etc.

## Requirements

These are the expectations for the child module. What does it need to do? What is the "customer" wanting from it? 