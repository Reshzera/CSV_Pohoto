/* eslint-disable @typescript-eslint/no-explicit-any */
import { dialog, ipcMain } from "electron";
import { parse, writeToPath } from "fast-csv";
import * as fs from "fs";
import path from "path";
import { sortDir } from "./utils";

const IMAGES_EXTENSIONS = ["jpg", "jpeg", "png"];

export const instanceServices = async () => {
  ipcMain.handle("/get-path", async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      properties: ["openDirectory"],
    });
    if (canceled) {
      return "";
    } else {
      //retornar erro se nao tiver foto
      return filePaths[0];
    }
  });

  ipcMain.on("/create-project", (event, project) => {
    const projectFolderPath = path.join(
      __dirname,
      "/projects",
      `/${project.name}`
    );
    const projectFilePath = path.join(
      projectFolderPath,
      `/${project.name}.json`
    );
    const csvFilePath = path.join(projectFolderPath, `/${project.name}.csv`);
    try {
      const projectInfo = JSON.stringify(project);

      if (!fs.existsSync(projectFolderPath)) {
        fs.mkdirSync(projectFolderPath, { recursive: true });
      }

      if (fs.existsSync(projectFilePath)) {
        event.reply("/create-project", {
          message: "Project already exists",
          status: 400,
        });
      }

      if (!fs.existsSync(projectFilePath) && !fs.existsSync(csvFilePath)) {
        fs.writeFileSync(projectFilePath, projectInfo);
        fs.closeSync(fs.openSync(csvFilePath, "w"));
        const files = fs.readdirSync(project.pathFolder).sort(sortDir);

        if (files) {
          const rowsToCsvArray: any = [];
          files.map((item) => {
            const extension = item?.split(".")?.pop();
            if (
              IMAGES_EXTENSIONS.includes(extension.toLocaleLowerCase()) &&
              !item.startsWith("._")
            ) {
              rowsToCsvArray.push([item, ""]);
            }
          });
          writeToPath(path.resolve(csvFilePath), rowsToCsvArray)
            .on("error", () => {
              event.reply("/create-project", {
                message: "Internal Server Error",
                status: 500,
              });
            })
            .on("finish", () => {
              event.reply("/create-project", {
                message: "Success",
                status: 200,
              });
            });
        }
      }
    } catch (e) {
      event.reply("/create-project", {
        message: "Internal Server Error",
        status: 500,
      });
    }
  });

  ipcMain.on("/get-photo-info", (event, { index, projectName }) => {
    const projectJsonPath = path.join(
      __dirname,
      "/projects",
      `/${projectName}`,
      `/${projectName}.json`
    );
    const projectCsvPath = path.join(
      __dirname,
      "/projects",
      `/${projectName}`,
      `/${projectName}.csv`
    );

    try {
      //get photo base64
      const { pathFolder } = JSON.parse(
        fs.readFileSync(projectJsonPath, "utf8")
      );
      const fileName = fs
        .readdirSync(pathFolder)
        .sort(sortDir)
        .filter((item) => !item.startsWith("._"))[index];
      const fileExtension = fileName?.split(".")?.pop();
      const filePath = path.join(pathFolder, fileName);
      const data = fs.readFileSync(filePath);
      const base64Image = Buffer.from(data).toString("base64");
      const imgSrc = `data:image/${fileExtension};base64,${base64Image}`;
      const currentCSV: any[] = [];
      //get csv infos
      fs.createReadStream(projectCsvPath)
        .pipe(parse())
        .on("error", () =>
          event.reply("/get-photo-info", {
            message: "Internal Server Error",
            status: 500,
          })
        )
        .on("data", (row) => {
          currentCSV.push(row);
        })
        .on("end", (rowCount: number) => {
          const nameImage = currentCSV[index][0];
          let HandleCurrentNumberLabel = currentCSV[index];
          HandleCurrentNumberLabel.shift();
          HandleCurrentNumberLabel = HandleCurrentNumberLabel.join(";");

          event.reply("/get-photo-info", {
            message: "Success",
            response: {
              name: nameImage,
              number: HandleCurrentNumberLabel,
              totalPhotos: rowCount,
              imageSource: imgSrc,
            },
            status: 200,
          });
        });
    } catch (e) {
      console.log(e);
      event.reply("/get-photo-info", {
        message: "Internal Server Error",
        status: 500,
      });
    }
  });

  ipcMain.on("/save-photo-info", (event, { index, number, projectName }) => {
    const projectCsvPath = path.join(
      __dirname,
      "/projects",
      `/${projectName}`,
      `/${projectName}.csv`
    );
    const projectJsonPath = path.join(
      __dirname,
      "/projects",
      `/${projectName}`,
      `/${projectName}.json`
    );

    try {
      const currentCSV: any[] = [];
      fs.createReadStream(projectCsvPath)
        .pipe(parse())
        .on("error", () =>
          event.reply("/save-photo-info", {
            message: "Internal Server Error",
            status: 500,
          })
        )
        .on("data", (row) => {
          currentCSV.push(row);
        })
        .on("end", () => {
          const newCsv = currentCSV.map((item, idx) => {
            if (idx === index) {
              //mutiple values split by ';'
              const mutipleNumbers = number?.split(";");

              return [item[0], ...mutipleNumbers];
            } else {
              return item;
            }
          });
          writeToPath(path.resolve(projectCsvPath), newCsv)
            .on("error", () => {
              event.reply("/save-photo-info", {
                message: "Internal Server Error",
                status: 500,
              });
            })
            .on("finish", () => {
              //write the last index on json
              const projectInfo = JSON.parse(
                fs.readFileSync(projectJsonPath, "utf8")
              );
              const newProjectInfo = JSON.stringify({
                ...projectInfo,
                lastImageIndex: index ?? 0,
                totalImage: newCsv.length ?? 0,
              });
              fs.writeFileSync(projectJsonPath, newProjectInfo);
              event.reply("/save-photo-info", {
                message: "Success",
                status: 200,
              });
            });
        });
    } catch (e) {
      console.log(e);
      event.reply("/save-photo-info", {
        message: "Internal Server Error",
        status: 500,
      });
    }
  });

  ipcMain.on("/list-projects", (event) => {
    const projectPath = path.join(__dirname, "/projects");
    try {
      const projectsFolders = fs.readdirSync(projectPath);
      if (projectsFolders) {
        const result: any[] = [];
        projectsFolders.map((item) => {
          const projectJsonPath = path.join(
            projectPath,
            `/${item}`,
            `/${item}.json`
          );

          const ProjectInfo = JSON.parse(
            fs.readFileSync(projectJsonPath, "utf8")
          );
          result.push({ ProjectInfo });
        });

        event.reply("/list-projects", {
          message: "Success",
          response: { result },
          status: 200,
        });
      }
    } catch (e) {
      console.log(e);
      event.reply("/list-projects", {
        message: "Internal Server Error",
        status: 500,
      });
    }
  });
};
