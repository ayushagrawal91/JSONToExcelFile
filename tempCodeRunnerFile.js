  const fs = require('fs');
  const XLSX = require('xlsx');

  function ConvertToExcel(data, outputFilename = 'outputFile.xlsx') {
    try {
      // Conversion to excel
      const worksheet = XLSX.utils.json_to_sheet(data);
      //Creating a new Excel Workbook
      const workBook = XLSX.utils.book_new();
      // Adding the worksheet to workbook
      XLSX.utils.book_append_sheet(workBook, worksheet, 'Sheet 1');
      //write the WB to file
      XLSX.writeFile(workBook, outputFilename);
      console.log(`Data is exported to ${outputFilename}`);
    } catch (error) {
      // Catch error and return if error is encountered
      console.error(`Error was encountered during Excel conversion: ${error.message}`);
    }
  }

  function main() {
    try {
      // Reading the input JSON file data
      const jsonData = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));
      if (jsonData && jsonData.employees && Array.isArray(jsonData.employees)) {
        // Output as excel file
        ConvertToExcel(jsonData.employees, 'output.xlsx');
      } else {
        // Error handling in case of invalid Structure
        console.error('Invalid JSON format is used. Make sure the structure is correct and Try again.');
      }
    } catch (error) {
      //Return an error if there is error in parsing the file
      console.error(`Error reading or parsing the JSON file: ${error.message}`);
    }
  }

  main();