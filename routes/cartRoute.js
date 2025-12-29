import express from "express"
import {getCart, addToCart, updateCartItem, removeFromCart, clearCart} from "../controllers/cartController.js"
import {protect} from "../middleware/authMiddleware.js"
const route = express.Router()

route.get('/',protect,getCart);
route.post('/add',protect,addToCart);
route.put('/update',protect,updateCartItem);
route.delete('/remove/:productId',protect,removeFromCart)
route.delete('/clear',protect,clearCart)

export default route;
