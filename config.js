const cors = require("cors");
const express = require("express");
const multer = require("multer");

const setServerConfiguration = (app) => {
    app.use(express.urlencoded({ extended: true }));
    app.use('/public',express.static("public"));
    app.use(express.json());
    app.use(cors());
  }
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/images/");
    },
  
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  const upload = multer({ storage: storage });
module.exports = {setServerConfiguration, upload}