import * as path from "path";
import * as fs from "fs";

function main() {
    const inputPath = path.resolve(__dirname, "../data/2b.txt");
    const fileContent = fs.readFileSync(inputPath, "utf-8");
    const reports = fileContent.split("\n");

    let safeReportsCount = 0;

    reports.forEach((report) => {
        const list = report.split(" ").map((x) => parseInt(x));
        const variants = generateVariants(list);

        let foundSafeVariant = false;
        let variantIndex = 0;

        while (variantIndex < variants.length && !foundSafeVariant) {
            if (listIsSafe(variants[variantIndex])) {
                foundSafeVariant = true;
            }
            variantIndex++;
        }

        if (foundSafeVariant) {
            safeReportsCount++;
        }
    });

    console.log(`The total number of safe reports is ${safeReportsCount}`);
}

function listIsSafe(list: number[]): boolean {
    let i = 0;
    let foundUnsafeLevel = false;

    const increasing = (x: number, y: number) => x < y;
    const decreasing = (x: number, y: number) => x > y;

    const diffIsMarginal = (x: number, y: number) =>
        Math.abs(x - y) >= 1 && Math.abs(x - y) <= 3;

    const shouldIncrease = increasing(list[0], list[1]);

    while (i < list.length - 1 && !foundUnsafeLevel) {
        const a = list[i];
        const b = list[i + 1];

        const validSequence = shouldIncrease
            ? increasing(a, b)
            : decreasing(a, b);

        const isSafe = diffIsMarginal(a, b) && validSequence;

        if (!isSafe) {
            foundUnsafeLevel = true;
        }
        i++;
    }

    return !foundUnsafeLevel;
}

function generateVariants(list: number[]): number[][] {
    const variants: number[][] = [];
    variants.push(list);

    for (let i = 0; i < list.length; i++) {
        variants.push(list.filter((_, index) => index !== i));
    }

    return variants;
}

main();
