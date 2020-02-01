const express = require("express");
var app = express();
var route = require("./student/student");
var routeFaculty = require("./faculty/faculty");

app.use("/student", route);
app.use("/faculty", routeFaculty);
app.listen(3000);