const { v4: uuidv4 } = require("uuid");
const fs = require("node:fs");

const getNewId = () => {
    return uuidv4();
}

const writeJSONFile = (filename, content) => {
    fs.writeFileSync(filename, JSON.stringify(content), "utf8", (error) => {
    if(error) console.log(error);
    console.log(`changes saved to ${filename}`)
});
};

module.export = {
    getNewId,
    writeJSONFile,
};