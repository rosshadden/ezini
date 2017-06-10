const ini = require("../ini"),
    fs = require("fs"),
    path = require("path"),
    should = require("should")

ini_folder = path.join(path.dirname(__filename), "ini")

var parsedINI = { owner: { name: 'John Do', organization: 'Acme eProducts' },
    database: { server: '192.0.2.42', port: '143', file: 'acme payroll.dat' } }

var strINI ="[owner]\n\
name=John Do\n\
organization=Acme eProducts\n\
\n\
[database]\n\
server=192.0.2.42\n\
port=143\n\
file=acme payroll.dat"

describe("empty line ini parsing", () => {
    it("output object should equal given object", () => {
        str = fs.readFileSync(path.join(ini_folder, "empty_line.ini"), "utf-8")
        ini.parse(str).should.eql(parsedINI)
    })
})

describe("commented ini parsing", () => {
    it("output object should equal given object", () => {
        str = fs.readFileSync(path.join(ini_folder, "commented.ini"), "utf-8")
        ini.parse(str).should.eql(parsedINI)
    })
})

describe("inline-commented ini parsing", () => {
    it("output object should equal given object", () => {
        str = fs.readFileSync(path.join(ini_folder, "inline_commented.ini"), "utf-8")
        ini.parse(str).should.eql(parsedINI)
    })
})

describe("parsed object stringify", () => {
    it("output string should equal given string", () => {
        ini.stringify(parsedINI).should.equal(strINI)
    })
})