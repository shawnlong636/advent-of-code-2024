import * as path from "path";
import * as fs from "fs";

function main() {
    const inputPath = path.resolve(__dirname, "../data/day-one-p1.txt");

    const list1: number[] = [];
    let list2: number[] = [];

    const fileContent = fs.readFileSync(inputPath, "utf-8");
    const lines = fileContent.split("\n");

    lines.forEach((line) => {
        const numbers = line.split("   ");
        if (numbers.length !== 2) {
            throw new Error(
                "Each line should contain two numbers separated by three spaces"
            );
        }
        if (numbers) {
            list1.push(parseInt(numbers[0]));
            list2.push(parseInt(numbers[1]));
        }
    });

    list1.sort((a, b) => a - b);
    list2.sort((a, b) => a - b);

    if (list1.length !== list2.length) {
        throw new Error("Lists should have the same length");
    }

    let sum = 0;
    for (let i = 0; i < list1.length; i++) {
        console.log(`Comparing ${list1[i]} and ${list2[i]}`);
        sum += Math.abs(list1[i] - list2[i]);
    }

    console.log(`The sum of the differences between the two lists is ${sum}`);
}
main();
