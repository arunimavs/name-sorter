const fs = require("node:fs");
const _ = require("lodash");

const OUTPUT_FILE = "sorted-names-list.txt";
const MIN_WORDS = 2;
const MAX_WORDS = 4;

/**
 * Splits a full name into its given names and last name.
 * The name is broken into whitespace-separated words and checked against the
 * allowed word count (`MIN_WORDS` to `MAX_WORDS`, inclusive). The last word is
 * treated as the last name, and all preceding words are joined with single
 * spaces to form the given names.
 *
 * @param {string} fullName - The full name to split, e.g. "Arunima VS".
 * @returns {{givenNames: string, lastName: string}} The given names (space-separated)
 *   and the last name. `givenNames` is an empty string if the name is a single word.
 * @throws {Error} If the number of words is outside the `MIN_WORDS` to `MAX_WORDS` range.
 */
function getNameParts(fullName) {
    const words = _.words(fullName, /\S+/g);

    if (!_.inRange(words.length, MIN_WORDS, MAX_WORDS + 1)) {
        throw new Error(
            `Invalid name "${fullName}". A name must contain (${MIN_WORDS} to ${MAX_WORDS} words in total).`
        );
    }

    return {
        givenNames: _.initial(words).join(" "), //fetch the given names ranging from 1 to 3 words
        lastName: _.last(words) //fetch the last name from each string
    };
}

/**
 * Reads a list of names from the contents of a text file.
 *
 * Splits the text into lines, trims whitespace from each line, and discards
 * blank lines. Every remaining name is then validated with `getNameParts`,
 * so the whole file is rejected if any single name is invalid.
 *
 * @param {string} fileContent - Raw text of the file, with one name per line.
 * @returns {string[]} The trimmed, non-empty names in their original order.
 * @throws {Error} If the file contains no names.
 * @throws {Error} If any name fails validation in `getNameParts`.
 */
function readNames(fileContent) {
    const names = fileContent
        .split(/\r?\n/)//Parse the file text into an array of names
        .map(_.trim)
        .filter(Boolean); // Drops empty lines

    if (_.isEmpty(names)) {
        throw new Error("The input file does not contain any names.");
    }

    names.forEach(getNameParts); // Throws if any name is invalid
    return names;
}

/**
 * Sorts a list of full names alphabetically by last name, then by given names.
 *
 * Each name is split with `getNameParts`. Comparison is case-insensitive and
 * ascending (A-Z). Names with the same last name are ordered by their given
 * names. The original array is not modified.
 *
 * @param {string[]} names - The full names to sort.
 * @returns {string[]} A new array containing the same names in sorted order.
 * @throws {Error} If any name fails validation in `getNameParts`.
 */
function sortNames(names) {
    return _.orderBy(
        names,
        [
            name => getNameParts(name).lastName.toLowerCase(),
            name => getNameParts(name).givenNames.toLowerCase()
        ],
        ["asc", "asc"]
    );
}

function main() {
    const inputFile = process.argv[2];

    if (!inputFile) {
        console.error("Usage: node name-sorter.js <input-file>");
        process.exitCode = 1;
        return;
    }

    try {
        const fileContent = fs.readFileSync(inputFile, "utf8");
        const names = readNames(fileContent);
        const sortedNames = sortNames(names);
        const output = sortedNames.join("\n") + "\n";//To separate names line ny line.

        console.log(output.trimEnd());

        fs.writeFileSync(OUTPUT_FILE, output, "utf8");
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exitCode = 1;
    }
}

if (require.main === module) {
    main();
}


module.exports = { getNameParts, readNames, sortNames };