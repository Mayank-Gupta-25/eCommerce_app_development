import express from "express";
import upload from "../middleware/upload.js";

import {
  uploadSingle,
  uploadMultiple,
} from "../controllers/uploadController.js" ;

const route = express.Router();

// Single file upload
route.post("/single", upload.single("file"), uploadSingle);

// Multiple file upload
route.post("/multiple", upload.array("files", 2), uploadMultiple);

export default route;
