const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017/EmployeeDB",
  { useNewUrlParser: true },
  err => {
    if (!err) {
      console.log("Server Connected");
    } else {
      console.log("Error in Server Connection " + err);
    }
  }
);

require("./employee.model");
