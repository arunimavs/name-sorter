# Name Sorter

A Node.js command-line application that reads names from a text file, sorts them alphabetically by last name and then by given names, prints the sorted names to the console, and writes the results to `sorted-names-list.txt`.

## Prerequisites

* **Node.js** (v24 or compatible version)
* **npm**
* **Lodash** — Utility library for multi-criteria sorting
* **Jest** — Unit testing framework

## Installation

Clone the repository and navigate to the project directory:

```bash
git clone YOUR-REPOSITORY-URL
cd name-sorter
```

Install the dependencies:

```bash
npm ci
```

## Usage

Provide the path to a text file containing one name per line:

```bash
node name-sorter.js ./unsorted-names-list.txt
```

The program prints the sorted names to the console and creates or overwrites `sorted-names-list.txt` in the current working directory.

### Input format

The input file must contain one person's name per line. Each name must have:

* At least one given name.
* No more than three given names.
* A last name, according to the application's validation rules.

Names can contain up to four words in total: three given names and one last name.

### Sorting rules

1. Sort alphabetically by last name.
2. If last names are identical, sort alphabetically by given names.
3. Comparisons are case-insensitive.
4. Preserve duplicate names and the original name formatting in the output.

## Running the tests

Execute the unit tests with:

```bash
npm test
```

The Jest test suite covers the following functionality:

### `Name-Level validation`

* Splitting a two-word name into given name and last name.
* Extracting multiple given names.
* Accepting names with three given names and one last name.
* Handling leading, trailing and repeated spaces.
* Rejecting names with more than four words.
* Rejecting single-word names and empty names.

### `InputFile-level validation `

* Reading one name per line.
* Rejecting input containing invalid names.
* Removing empty lines and trimming extra spaces.
* Supporting Windows line endings.
* Rejecting files that contain no names.

### `Sorting-level validation`

* Sorting by last name.
* Sorting by given names when last names match.
* Handling uppercase and lowercase differences.
* Preserving the original input array.
* Retaining duplicate names.
* Rejecting invalid names.
* Sorting names with multiple given names.

## Build and test pipeline

The project can use GitHub Actions to automate dependency installation and unit tests on each push and pull request.

## Technologies

* JavaScript
* Node.js
* Lodash
* Jest
* GitHub Actions (CI)
