import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the folder containing the icons
const iconsFolder = path.resolve(__dirname, "src/icons");

// Define the output directory and file
const outputDir = path.resolve(__dirname, "src/types");
const outputPath = path.resolve(outputDir, "IconType.ts");

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Read all .svg files from the folder
const iconFiles = fs.readdirSync(iconsFolder).filter((file) => file.endsWith(".svg"));

// Generate the TypeScript union type and runtime array, the latter only for demo purposes
const iconTypeContent = `
export type IconType = ${iconFiles
    .map((file) => `"${file.replace(".svg", "")}"`) // Convert filenames to string literals
    .join(" | ")};

// for demo purposes
export const iconNames: IconType[] = [
${iconFiles.map((file) => `  "${file.replace(".svg", "")}"`).join(",\n")}
];
`;

// Write the type and array to a TypeScript file
fs.writeFileSync(outputPath, iconTypeContent);

console.log("IconType union type and iconNames array generated successfully:");
console.log(iconTypeContent);
