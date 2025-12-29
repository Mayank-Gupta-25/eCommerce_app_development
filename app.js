import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import uploadRoute from "./routes/uploadRoute.js";
import productRoute from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js"

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use('/api/user',userRoute)
app.use('/api/auth',authRoute)
app.use('/api/upload',uploadRoute)
app.use('/api/product',productRoute)
app.use('/api/cart',cartRoute)

export default app;