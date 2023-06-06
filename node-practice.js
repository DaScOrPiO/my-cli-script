"use strict";

const fs = require("fs");
const prompt = require("prompt-sync")({ sigint: true });
const currentPath = process.argv[1];
// const Input = process.argv[2];
let exitFlag = false;

while (!exitFlag) {
  const firstAsk = prompt(
    "What would you like to do? (Type 'F' for Folders, 'f' for files, 'C' to copy) Exit with 'Q'): "
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
  } else if (firstAsk === "C") {
    // Copy files
    let inputpath = "";
    let inputDestination = "";
    const copyfiles = (sourcePath, destination) => {
      if (inputpath !== "X") {
        try {
          inputpath = prompt("Enter path to file (type X to exit): ");
          if (inputpath !== "X") {
            sourcePath = inputpath;
            const fileData = fs.readFileSync(sourcePath, "utf-8");
            console.log(fileData);
            inputDestination = prompt(
              "Enter path to directory (type X to exit): "
            );
            if (inputDestination !== "X") {
              destination = inputDestination;
              fs.writeFileSync(destination, fileData);
            }
          }
        } catch (err) {
          console.log(`Something Went Wrong: ${err}`);
        }
      }
    };
    copyfiles(inputpath, inputDestination);
  } else {
    console.log("Invalid input!");
  }
}
