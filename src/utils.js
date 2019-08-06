import fileExist from 'file-exists'

const path = require("path")
const fs = require("fs")

const tokenFile = path.resolve(__dirname, 'token.json')

const readToken = () => {
  if(fileExist.sync(path.resolve(__dirname, 'token.json'))) {
    let tokenObj = fs.readFileSync(tokenFile, 'utf-8')
    return JSON.parse(tokenObj)
  } else {
    console.log(`\nError reading token`)
    return null
  }
}

const writeToken = (token) => {
  fs.writeFileSync(path.resolve(__dirname, 'token.json'),
    JSON.stringify(token), 'utf-8')
}
export default { readToken, writeToken }