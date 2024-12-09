import { spawn } from "child_process";
import path from "path";

// Get the file identifier from the arguments
const fileArg = process.argv[2]; // E.g., "1a"

if (!fileArg) {
    console.error("Error: Please provide a file identifier (e.g., 1a).");
    process.exit(1);
}

// Resolve the file path
const filePath = path.resolve(__dirname, `${fileArg}.ts`);

// Run the file dynamically using tsx
const child = spawn("tsx", [filePath], { stdio: "inherit" });

child.on("error", (err) => {
    console.error(`Failed to start process: ${err.message}`);
});
