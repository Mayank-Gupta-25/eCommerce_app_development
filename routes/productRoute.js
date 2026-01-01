import express from "express"
import {addProduct , getProduct , updateProduct , deleteProduct, getAllProduct} from "../controllers/productController.js"

const route = express.Router()

route.get("/",getAllProduct)
route.get("/:id",getProduct)
route.post("/add",addProduct)
route.put("/update/:id",updateProduct)
route.delete("/delete/:id",deleteProduct)

export default route ;