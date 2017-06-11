"use strict";

var ini = require("../ini"),
    fs = require("fs"),
    path = require("path"),
    should = require("should");

var ini_folder = path.join(path.dirname(__filename), "ini");

var objINI = { owner: { name: 'John Do', organization: 'Acme eProducts' },
    database: { server: '192.0.2.42', port: '143', file: 'acme payroll.dat' } };

var strINI = "[owner]\n\
name=John Do\n\
organization=Acme eProducts\n\
\n\
[database]\n\
server=192.0.2.42\n\
port=143\n\
file=acme payroll.dat";

describe("empty line ini parsing", function () {
    it("output object should equal given object", function () {
        var str = fs.readFileSync(path.join(ini_folder, "empty_line.ini"), "utf-8");
        ini.parseSync(str).should.eql(objINI);
    });
});

describe("commented ini parsing", function () {
    it("output object should equal given object", function () {
        var str = fs.readFileSync(path.join(ini_folder, "commented.ini"), "utf-8");
        ini.parseSync(str).should.eql(objINI);
    });
});

describe("inline-commented ini parsing", function () {
    it("output object should equal given object", function () {
        var str = fs.readFileSync(path.join(ini_folder, "inline_commented.ini"), "utf-8");
        ini.parseSync(str).should.eql(objINI);
    });
});

describe("commented ini with empty line parsing", function () {
    it("output object should equal given object", function () {
        var str = fs.readFileSync(path.join(ini_folder, "commented_empty_line.ini"), "utf-8");
        ini.parseSync(str).should.eql(objINI);
    });
});

describe("start with properties ini parsing", function () {
    it("output object should equal given object", function () {
        var str = fs.readFileSync(path.join(ini_folder, "start_with_properties.ini"), "utf-8");
        var obj = JSON.parse(JSON.stringify(objINI));
        obj.author = "vimsucks";
        ini.parseSync(str).should.eql(obj);
    });
});

describe("ini syntax error parsing", function () {
    it("output object should equal given object", function () {
        var str = fs.readFileSync(path.join(ini_folder, "syntax_error.ini"), "utf-8");
        ini.parseSync(str).should.eql(objINI);
    });
});

describe("empty line ini async parsing", function () {
    it("output object should equal given object", function (done) {
        var str = fs.readFileSync(path.join(ini_folder, "empty_line.ini"), "utf-8");
        ini.parseSync(str).should.eql(objINI);
        ini.parse(str, function (obj) {
            obj.should.eql(objINI);
            done();
        });
    });
});

describe("parsed object stringify", function () {
    it("output string should equal given string", function () {
        ini.stringifySync(objINI).should.equal(strINI);
    });
});

describe("parsed start-with-properties object stringify", function () {
    it("output string should equal given string", function () {
        var str = fs.readFileSync(path.join(ini_folder, "start_with_properties.ini"), "utf-8");
        ini.stringifySync(ini.parseSync(str)).should.equal("author=vimsucks\n" + strINI);
    });
});

describe("parsed object async stringify", function () {
    it("output string should equal given string", function (done) {
        ini.stringify(objINI, function (str) {
            str.should.equal(strINI);
            done();
        });
    });
});
//# sourceMappingURL=ini.test.js.map