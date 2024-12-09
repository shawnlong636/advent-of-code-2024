import * as path from "path";
import * as fs from "fs";

type Operator = "mul" | "add" | "sub" | "div";
type Operation = {
    x: number;
    y: number;
    operator: Operator;
};

interface IndexedOperation extends Operation {
    startIndex: number;
    endIndex: number;
}

type IndexedCommand = {
    command: "do" | "don't";
    startIndex: number;
    endIndex: number;
};

function main() {
    const inputPath = path.resolve(__dirname, "../data/3b.txt");
    const fileContent = fs.readFileSync(inputPath, "utf-8");

    const combinedRegex =
        /do\(\)|don't\(\)|(mul|add|sub|div)\((\d{1,3}),(\d{1,3})\)/g;

    let sum: number = 0;

    const matches = fileContent.match(combinedRegex);

    let isActive = true;
    matches.forEach((match) => {
        if (match === "do()") {
            isActive = true;
        } else if (match === "don't()") {
            isActive = false;
        } else {
            if (isActive) {
                const substr = match.slice("mul(".length, match.length - 1);
                const numbers = substr.split(",");
                const x = parseInt(numbers[0]);
                const y = parseInt(numbers[1]);
                sum += x * y;
            }
        }
    });

    console.log(`Total Sum is ${sum}`);
}

main();
