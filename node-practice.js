"use strict";

const fs = require("fs");
const prompt = require("prompt-sync")({ sigint: true });
const currentPath = process.argv[1];
// const Input = process.argv[2];
let exitFlag = false;

while (!exitFlag) {
  const firstAsk = prompt(
    "What would you like to do? (Type 'F' for Folders, 'f' for files) Exit with 'Q'): "
  );

  //Create Folder
  if (firstAsk === "F") {
    let inputFolder;

    while (inputFolder !== "X") {
      inputFolder = prompt("Folder name: (Type X to exit) ");
      if (inputFolder !== "X") {
        fs.mkdirSync(inputFolder);
        console.log("Done");

        //Create files in folder after creating folder
        const ask = prompt(
          "Would you like to create files in this folder? Type Y or N: "
        );
        if (ask === "Y") {
          let inputFile;

          while (inputFile !== "X") {
            inputFile = prompt("File name(s) (type X to exit): ");

            if (inputFile !== "X") {
              const filePath = `${inputFolder}/${inputFile}`;
              fs.writeFileSync(filePath, inputFile);
              console.log(`File created in ${filePath}`);
            }
          }
        }
      }
    }
  } else if (firstAsk === "f") {
    const ask = prompt("Would you like to create files? Type Y or N: ");

    if (ask === "Y") {
      let inputFile;
      const arr = [];

      while (inputFile !== "X") {
        inputFile = prompt("File name(s) (type X to exit): ");

        if (inputFile !== "X") {
          arr.push(inputFile);
        } else {
          arr.forEach((file) => {
            fs.writeFileSync(file, file);
          });
          console.log(`Done`);
        }
      }
    } else if (ask === "N") {
      console.log("No files created");
    } else {
      console.log("Invalid input!");
    }
  } else if (firstAsk === "Q") {
    //Terminates Operation
    console.log("Process Terminated");
    exitFlag = true;
  } else {
    console.log("Invalid input!");
  }
}
