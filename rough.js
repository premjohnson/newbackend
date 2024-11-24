import xlsx from 'xlsx';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Specify the path to the Excel file
const filePath = path.join(__dirname, 'data.xlsx');

// Read the Excel file
try {
    const workbook = xlsx.readFile(filePath); // Load the Excel file
    const sheetNames = workbook.SheetNames;  // Get the names of the sheets
    console.log('Sheet Names:', sheetNames);

    // Read the first sheet
    const firstSheetName = sheetNames[1];
    const worksheet = workbook.Sheets[firstSheetName];

    // Convert the sheet to JSON
    const data = xlsx.utils.sheet_to_json(worksheet);
    console.log('Data from the sheet:', data);
} catch (error) {
    console.error('Error reading the Excel file:', error.message);
}
