# TSX Files Usage Checker

This script scans a specified directory for `.tsx` files and checks if they are used in other TypeScript or JavaScript files. It helps to identify unused `.tsx` files in a React project, which can be useful for cleaning up or refactoring code.

## Features

- Recursively searches through directories to find `.tsx` files.
- Checks if each `.tsx` file is imported in any other `.ts`, `.tsx`, `.js`, or `.jsx` file.
- Lists unused `.tsx` files, if any, with their paths.
- Outputs results to the console with color-coded messages.

## Requirements

- Node.js (v12 or higher)

## Installation

1. **Clone the repository:**

   ```sh
   git clone <repository-url>
   ```

2.	Navigate to the directory containing the script:
   ```sh
   cd <repository-directory>
   ```

3.	Install dependencies (if any):
   ```sh
   npm install
   ```

## Usage

1.	Edit the directoryToSearch variable in the script:
Modify the directoryToSearch variable in the script to point to the root directory of your React project where the .tsx files are located.
   ```js
   const directoryToSearch = path.join(__dirname, 'react/src'); // Set the base directory
   ```

2.	Run the script:
Execute the script using Node.js:
   ```js
   node path/to/your/script.js
   ```

Replace `path/to/your/script.js` with the actual path to the script file.

## How It Works
1.	getAllFiles(dir, fileList): Recursively retrieves all files from the specified directory.
2.	getStrippedPathForImport(filePath): Converts a file path to a relative path suitable for imports.
3.	getRelativeImportPath(fromFile, toFile): Calculates the relative import path from one file to another.
4.	checkIfUsedInOtherFiles(importPath, allFiles, tsxFilePath): Checks if a .tsx file is imported in any other file.
5.	findTSXFilesAndCheckUsage(dir): Main function that finds .tsx files and checks their usage.

## Output
•	If unused .tsx files are found, they are listed in red.
•	If all .tsx files are in use, a success message is displayed in green.

## Example
   ```sh
   node findTSXFiles.js
   ```

If there are unused .tsx files, the output will look something like:
   ```bash
   [3] Unused .tsx files:
    /path/to/unusedFile1.tsx
    /path/to/unusedFile2.tsx
    /path/to/unusedFile3.tsx
```

If all .tsx files are in use, you will see:
    ```bash
    All .tsx files are being used.
    ```
