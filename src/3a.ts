import * as path from "path";
import * as fs from "fs";

type Operator = "mul" | "add" | "sub" | "div";
type Operation = {
    x: number;
    y: number;
    operator: Operator;
};

function main() {
    const inputPath = path.resolve(__dirname, "../data/3a.txt");
    const fileContent = fs.readFileSync(inputPath, "utf-8");
    const lines = fileContent.split("\n");

    const regex = /(mul|add|sub|div)\((\d{1,3}),(\d{1,3})\)/g;

    let sum = 0;

    lines.forEach((input) => {
        const operations: Operation[] = Array.from(
            input.matchAll(regex),
            (match) => {
                return {
                    operator: match[1] as Operator,
                    x: parseInt(match[2]),
                    y: parseInt(match[3]),
                };
            }
        );

        sum += operations.reduce((acc, cur) => acc + evaluate(cur), 0);
    });

    console.log(`Total sum is ${sum}`);
}

function evaluate(op: Operation) {
    switch (op.operator) {
        case "add":
            return op.x + op.y;
        case "div":
            return op.y !== 0 ? op.x / op.y : 0;
        case "mul":
            return op.x * op.y;
        case "sub":
            return op.x - op.y;
        default:
            return 0;
    }
}

main();
