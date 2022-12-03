const fs = require("fs")

// fs.readFile("./out/index.html", "utf8", function (err, data) {
let [fileName] = fs.readdirSync("./out/_next/static/css/", "utf8", function (err, files) {
    return files
})

console.log(fileName)

fs.readFile(`./out/_next/static/css/${fileName}`, "utf8", function (err, data) {
    if (err) {
        return console.log(err)
    }
    //console.log(data)
    // let source = data.toString()
    // //let regexp = /_next/g;
    // const regexp = "url(/fonts"
    // let nodeCount = (source.match(new RegExp(regexp, "g")) || []).length
    // let count = 0
    // while (count <= nodeCount) {
    //     data = data.replace(new RegExp(regexp), "url(../../../fonts")
    //     count++
    // }
    let regexp = `url(/fonts`

    data = data.replace(regexp, "url(../../../fonts")

    fs.writeFile(`./out/_next/static/css/${fileName}`, data, "utf8", function (err) {
        if (err) return console.log(err)
    })
})
