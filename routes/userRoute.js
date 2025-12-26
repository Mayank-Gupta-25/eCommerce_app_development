import express from "express"
import {getAllUser, createUser,updateUser,deleteUser} from "../controllers/userController.js"


const route = express.Router()

route.get("/getall",getAllUser)
route.post("/create",createUser)
route.put("/update/:id",updateUser)
route.delete("/delete/:id",deleteUser)

export default route