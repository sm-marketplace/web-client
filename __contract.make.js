const artifact = require("./contract-artifact.json");
const {readFileSync, promises: fsPromises} = require('fs');

const templatePath = "./ci/templates/__contract.js";
const artifactStr = JSON.stringify(artifact);
const contents = readFileSync(templatePath, 'utf-8');
const result = contents.replace(
  "JSON.parse(\"${CONTRACT_ARTIFACT_STR}\")",
  artifactStr,
);

console.log(result)