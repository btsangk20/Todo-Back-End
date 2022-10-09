const fs = require("fs");
const path = require("path");

function getTaskList() {
  let rawData = fs.readFileSync(path.join(__dirname, "../database/data.json"));
  return JSON.parse(rawData);
}

function storeTask(valueSave) { 
  fs.writeFileSync(path.join(__dirname, "../database/data.json"), JSON.stringify(valueSave));
}
  

module.exports = {getTaskList, storeTask};
