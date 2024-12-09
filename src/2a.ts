import * as path from "path";
import * as fs from "fs";

function main() {
    const inputPath = path.resolve(__dirname, "../data/2a.txt");
    const fileContent = fs.readFileSync(inputPath, "utf-8");
    const reports = fileContent.split("\n");

    let safeReportsCount = 0;

    reports.forEach((report) => {
        const list = report.split(" ");

        let reportIndex = 0;
        let foundUnsafeReport = false;

        const increasing = (x: number, y: number) => x < y;
        const decreasing = (x: number, y: number) => x > y;

        const diffIsMarginal = (x: number, y: number) =>
            Math.abs(x - y) >= 1 && Math.abs(x - y) <= 3;

        const shouldIncrease = increasing(parseInt(list[0]), parseInt(list[1]));

        while (reportIndex < list.length - 1 && !foundUnsafeReport) {
            const a = parseInt(list[reportIndex]);
            const b = parseInt(list[reportIndex + 1]);

            const validSequence = shouldIncrease
                ? increasing(a, b)
                : decreasing(a, b);

            const isSafe = diffIsMarginal(a, b) && validSequence;

            if (!isSafe) {
                foundUnsafeReport = true;
            }
            reportIndex++;
        }

        if (!foundUnsafeReport) {
            safeReportsCount++;
        }
    });

    console.log(`The total number of safe reports is ${safeReportsCount}`);
}
main();
