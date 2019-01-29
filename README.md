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
|settings['Create Archive']| true/false| Determines if there are unneeded files so it creates an Archive folder to move all of the unneeded files into.|

## Outputs

If your module adds anything to `course.info` or anywhere else on the course object, please include a description of each in a table:

| Option | Type | Location |
|--------|--------|-------------|
|unusedFiles| Array | course.info|

## Process

Describe in steps how the module accomplishes its goals.

1. It checks to see if the course.settings['Create three main folders'] is set to be true. If it is, it'll create the folders (documents, media and template).
2. It will also check to see if 1 is completed and the course.settings['Move files into three main folders'] is set to be true. If it is, it'll go through the process and move all of the files into those three folders created by step 1.

## Log Categories

List the categories used in logging data in your module.

- Folders Created
- Folders Deleted
- Files Moved
- Files Archived
- Unused Files Deleted

## Requirements

*These are the expectations for the child module. What does it need to do? What is the "customer" wanting from it?*

This child module goes through the files of the course during conversion. It then reorganizes the files into a new structure so every course has the same file structure. It will also remove unnecessary files and put them into a folder called archives. 