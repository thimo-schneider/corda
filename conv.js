const convert = require('tsconfig-to-swcconfig').convert
const fs = require("fs")

const conf = convert('tsconfig.json', process.cwd(), {
  // more swc config to override...
  minify: false,
})
fs.writeFileSync("./.swcrc", JSON.stringify(conf))
console.log(conf)
