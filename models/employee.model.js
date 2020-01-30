const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: "This field is required"
  },
  email: {
    type: String
  },
  school: {
    type: String
  },
  contact: {
    type: String
  }
});

mongoose.model("Employee", employeeSchema);
