const fs = require('fs');
const path = require('path');

const getAllFiles = (dir, fileList = []) => {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
        const filePath = path.join(dir, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
            fileList = getAllFiles(filePath, fileList);
        } else if (file.endsWith('.tsx')) {
            fileList.push(filePath);
        }
    });

    return fileList;
};

const getStrippedPathForImport = (filePath) => {
    const relativePath = path.relative('react/src', filePath);
    const strippedPath = relativePath.replace(/\\/g, '/').replace(/\.tsx$/, '');

    if (path.basename(filePath) === 'index.tsx') {
        return path.dirname(strippedPath);
    }

    return strippedPath;
};

const getRelativeImportPath = (fromFile, toFile) => {
    const fromDir = path.dirname(fromFile);
    const relativePath = path.relative(fromDir, toFile).replace(/\\/g, '/').replace(/\.tsx$/, '');
    return relativePath.startsWith('.') ? relativePath : './' + relativePath;
};

const checkIfUsedInOtherFiles = (importPath, allFiles, tsxFilePath) => {
    const importStatementDoubleQuotes = `from "src/${importPath}"`;
    const importStatementSingleQuotes = `from 'src/${importPath}'`;

    for (const file of allFiles) {
        if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.jsx')) {
            const content = fs.readFileSync(file, 'utf8');

            if (content.includes(importStatementDoubleQuotes) || content.includes(importStatementSingleQuotes)) {
                return file;
            }

            const relativeImportPath = getRelativeImportPath(file, tsxFilePath);
            const relativeImportDoubleQuotes = `from "${relativeImportPath}"`;
            const relativeImportSingleQuotes = `from '${relativeImportPath}'`;

            if (content.includes(relativeImportDoubleQuotes) || content.includes(relativeImportSingleQuotes)) {
                return file;
            }
        }
    }

    return null; // Not found
};

// Main function
const findTSXFilesAndCheckUsage = (dir) => {
    const allFiles = getAllFiles(dir);

    const unusedFiles = [];

    allFiles.forEach((tsxFile) => {
        const strippedPath = getStrippedPathForImport(tsxFile);
        const isUsedInFile = checkIfUsedInOtherFiles(strippedPath, allFiles, tsxFile);

        if (isUsedInFile) {
            // console.log(`File: ${tsxFile} is used in: ${isUsedInFile}`);
        } else {
            unusedFiles.push(tsxFile);
        }
    });

    if (unusedFiles.length > 0) {
        console.log('\x1b[31m%s\x1b[0m', `\n[${unusedFiles.length}] Unused .tsx files:`);
        unusedFiles.forEach((unusedFile) => {
            console.log('\x1b[31m%s\x1b[0m', unusedFile);
        });
    } else {
        console.log('\x1b[32m%s\x1b[0m', '\nAll .tsx files are being used.');
    }
};

const directoryToSearch = path.join(__dirname, 'react/src'); // Set the base directory
findTSXFilesAndCheckUsage(directoryToSearch);
