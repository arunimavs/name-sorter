const { getNameParts, readNames, sortNames } = require("./name-sorter");


//Tests for method getNameParts:
describe("getNameParts", () => {
    test("splits a 2-word name into given name and last name", () => {
        expect(getNameParts("Jan Doe")).toEqual({
            givenNames: "Jan",
            lastName: "Doe"
        });
    });

    test("keeps all words before the last one as given names", () => {
        expect(getNameParts("Arunima Jan Doe")).toEqual({
            givenNames: "Arunima Jan",
            lastName: "Doe"
        });
    });

    test("accepts a 4-word name", () => {
        expect(getNameParts("Mary Ann Lee Smith")).toEqual({
            givenNames: "Mary Ann Lee",
            lastName: "Smith"
        });
    });

    test("ignores extra spaces", () => {
        expect(getNameParts("  Arunima    VS  ")).toEqual({
            givenNames: "Arunima",
            lastName: "VS"
        });
    });

    test("throws when the name has more than 4 words", () => {
        expect(() => getNameParts("Arunima Jan Doe Jan VS")).toThrow(
            "Invalid name"
        );
    });

    test("throws when the name has no given name (1 word)", () => {
        expect(() => getNameParts("Arunima")).toThrow("Invalid name");
    });

    test("throws when the name is empty", () => {
        expect(() => getNameParts("   ")).toThrow("Invalid name");
    });
});

//Tests for method readNames:
describe("readNames", () => {
    test("returns one name per line", () => {
        const fileContent = "Jan Doe\nArunima VS";

        expect(readNames(fileContent)).toEqual([
            "Jan Doe",
            "Arunima VS"
        ]);
    });

    test("throws when any name is invalid", () => {
        expect(() => readNames("Arunima VS\nArunima")).toThrow("Invalid name");
    });

    test("removes empty lines and extra spaces", () => {
        const fileContent = "  Arunima VS  \n\n   \nJan Doe\n";

        expect(readNames(fileContent)).toEqual([
            "Arunima VS",
            "Jan Doe"
        ]);
    });

    test("supports Windows line endings", () => {
        const fileContent = "Arunima VS\r\nJan Doe";

        expect(readNames(fileContent)).toEqual([
            "Arunima VS",
            "Jan Doe"
        ]);
    });

    test("throws when the file has no names", () => {
        expect(() => readNames("\n  \n")).toThrow("does not contain any names");
    });
});

//Tests for sortNames: 
describe("sortNames", () => {
    test("sorts by last name", () => {
        const names = ["Arunima VS", "Jan Doe"];

        expect(sortNames(names)).toEqual([
            "Jan Doe",
            "Arunima VS"
        ]);
    });

    test("sorts by given names when last names are the same", () => {
        const names = ["Sarah Smith", "Adam Smith", "Mike Smith"];

        expect(sortNames(names)).toEqual([
            "Adam Smith",
            "Mike Smith",
            "Sarah Smith"
        ]);
    });

    test("ignores upper and lower case", () => {
        const names = ["jan doe", "Arunima VS"];

        expect(sortNames(names)).toEqual([
            "jan doe",
            "Arunima VS"
        ]);
    });

    test("does not change the original list", () => {
        const names = ["Arunima VS", "Jan Doe"];

        sortNames(names);

        expect(names).toEqual(["Arunima VS", "Jan Doe"]);
    });

    test("keeps duplicate names", () => {
        expect(sortNames(["Jan Doe", "Jan Doe"])).toEqual(["Jan Doe", "Jan Doe"]);
    });

    test("throws when any name is invalid", () => {
        expect(() => sortNames(["Arunima VS", "Arunima"])).toThrow("Invalid name");
    });

    test("sorts multi-word given names when last names are the same", () => {
        const names = ["Mary Beth Smith", "Mary Ann Smith"];

        expect(sortNames(names)).toEqual(["Mary Ann Smith", "Mary Beth Smith"]);
    });
});