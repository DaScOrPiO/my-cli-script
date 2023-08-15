"use strict";

const fs = require("fs");
const prompt = require("prompt-sync")({ sigint: true });
const currentPath = process.argv[1];
const path = require("path");
// const Input = process.argv[2];
let exitFlag = false;
//

while (!exitFlag) {
  const firstAsk = prompt(
    "What would you like to do? (Type 'F' for Folders, 'f' for files, 'C' to copy, Exit with 'Q'): "
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
        inputFile = prompt("File name (type X to exit): ");

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
    // Copy to folders
    const copyfiles = () => {
      let inputpath = "";
      let inputDestination = "";
      if (inputpath !== "X") {
        inputpath = prompt("Enter path to file (type X to exit): ");
        const inputPathSync = fs.statSync(inputpath);
        if (inputpath !== "X" && inputPathSync.isFile()) {
          try {
            const currentPath = fs.createReadStream(inputpath);
            // Check is path contains valid file
            inputDestination = prompt(
              "Enter path to file to write to (type X to exit): "
            );
            if (inputDestination !== "X") {
              const directoryStat = fs.statSync(inputDestination);
              // Check if path is a is a file
              if (directoryStat.isDirectory()) {
                const file = path.basename(inputpath);
                const destinationPath = path.join(inputDestination, file);
                const destination_Dir = fs.createWriteStream(destinationPath);
                currentPath.pipe(destination_Dir);
                console.log(`Action Successful!`);
              }
            }
          } catch (err) {
            console.trace(`Something Went Wrong: ${err}`);
          }
        } else {
          console.log(`Error: ${inputpath} is not a valid File`);
        }
      }
    };
    copyfiles();
  } else if (firstAsk === "D") {
    // Delete a file in directory
    let path_dir = prompt("Enter filename: ");
    if (path_dir !== "X") {
      try {
        let pathStat = fs.statSync(path_dir);
        if (pathStat.isFile()) {
          const file = path.basename(path_dir);
          fs.unlinkSync(file);
          console.log("Action Successful!");
        } else {
          console.log("Action Failed, file not found!");
        }
      } catch (e) {
        console.log(`An error occurred ${e}`);
      }
    }
  } else {
    console.log("Invalid input!");
  }
}
