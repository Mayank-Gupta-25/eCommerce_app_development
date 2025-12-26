import {signup , login , profile, addUser, forgotPassword, resetPassword} from "../controllers/authController.js"
import {protect, roleRestriction} from "../middleware/authMiddleware.js"
import express from "express"

const route = express.Router()

route.post("/signup",signup);
route.post("/login",login);
route.post("/adduser",protect, roleRestriction, addUser);
route.get("/forgotpassword/:email",forgotPassword);
route.put("/resetpassword",protect,resetPassword);
route.get("/profile",protect,profile);

export default route 