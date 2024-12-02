import * as path from "path";
import * as fs from "fs";

function main() {
    const inputPath = path.resolve(__dirname, "../data/day-one-p2.txt");

    const list1: number[] = [];
    const counts: Map<number, number> = new Map();

    const fileContent = fs.readFileSync(inputPath, "utf-8");
    const lines = fileContent.split("\n");

    lines.forEach((line) => {
        const numbers = line.split("   ");
        if (numbers.length !== 2) {
            throw new Error(
                "Each line should contain two numbers separated by three spaces"
            );
        }
        const num1 = parseInt(numbers[0]);
        const num2 = parseInt(numbers[1]);

        if (counts.has(num2)) {
            counts.set(num2, counts.get(num2) + 1);
        } else {
            counts.set(num2, 1);
        }

        list1.push(num1);
    });

    let sum = 0;
    for (const num of list1) {
        const count = Math.abs(counts.get(num) ?? 0);
        sum += num * count;
    }
    console.log(`The total Similarity Score is ${sum}`);
}
main();
