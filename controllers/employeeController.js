const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("employee/addEdit", {
    viewTitle: "Insert Employee"
  });
});

router.post("/", (req, res) => {
  if (req.body._id == "") {
    insertRecord(req, res);
  } else {
    updateRecord(req, res);
  }
});

function insertRecord(req, res) {
  const employee = new Employee();
  employee.fullName = req.body.fullName;
  employee.email = req.body.email;
  employee.school = req.body.school;
  employee.contact = req.body.contact;
  employee.save((err, doc) => {
    if (!err) {
      res.redirect("employee/list");
    } else {
      if (err.name == validationError) {
        handleValidationError(err, req.body);
        res.render("employee/addEdit", {
          viewTitle: "Insert Employee",
          employee: req.body
        });
      } else console.log("Error during record Insertion : " + err);
    }
  });
}

function updateRecord(req, res) {
  Employee.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true },
    (err, docs) => {
      if (!err) {
        res.redirect("employee/list");
      } else {
        if (!err.name == "ValidationError") {
          handleValidationError(err, req.body);
          res.render("employee/addEdit", {
            viewTitle: "Update Employee",
            employee: req.body
          });
        } else {
          console.log("Error during update: " + err);
        }
      }
    }
  );
}
router.get("/list", (req, res) => {
  res.json("From list");
  Employee.find((err, docs) => {
    if (!err) {
      res.render("employee/list", {
        list: docs
      });
    } else {
      console.log("Error in retrieving Employees");
    }
  });
});

function handleValidationError(err, body) {
  for (field in err.errors) {
    switch (err.errors[field].path) {
      case "fullName":
        body["fullNameError"] = err.errors[field].message;
        break;
      case "email":
        body["emailError"] = err.errors[field].message;
        break;
      default:
        break;
    }
  }
}

router.get("/:id", (req, res) => {
  Employee.findById(req.params.id, (err, docs) => {
    if (!err) {
      res.render("employee/addEdit", {
        viewTitle: "Update Employee",
        employee: docs
      });
    }
  });
});

router.get("/delete/:id", (req, res) => {
  Employee.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) {
      res.render("employee/list");
    } else {
      console.log("Error in deleting employee: " + err);
    }
  });
});

module.exports = router;
