import Product from "../models/productModel.js"

export const addProduct = async(req , res)=>{
    try{
        const pro = req.body ; 
        const createProd = await Product.create({
            name : pro.name,
            price : pro.price,
            category : pro.category,
            quantity : pro.quantity,
            unit : pro.unit,
            imageURL : pro.imageURL,
        });
        res.status(200).json({
            message: "You successfully added product !! "
        })
    }
    catch(err){
        res.status(500).json({
            err : "Internal server error",
            message : err.message
        })
    }
}
export const getProduct = async(req , res)=>{
    try{
        const pro = req.params.id ; 
        const findProduct = await Product.findById({
            _id : pro
        });
        if(!findProduct){
            return res.status(401).json({
                message : "No product find !!"
            })
        }
        res.status(200).json({
            message: "Here is/are the products you demanded !! ",
            data : findProduct
        })
    }
    catch(err){
        res.status(500).json({
            err : "Internal server error",
            message : err.message
        })
    }
}
export const updateProduct = async(req , res)=>{
    try{
        const update = req.body ;
        console.log(update);
        const pro = req.params.id ;
        const findProduct = await Product.findByIdAndUpdate({
            _id : pro
        },{
            $set:{
                name :  update.name ,
                price : update.price ,
                category : update.category,
                quantity : update.quantity,
                unit : update.unit,
                imageURL : update.imageURL,
                discount : update.discount,
                description : update.description , 
                isActive : update.isActive,
            }
        });
        if(!findProduct){
            return res.status(401).json({
                message : "No product found!!"
            })
        }
        console.log(findProduct.category);
        console.log(update.category);
        
        res.status(200).json({
            message: "You successfully updated product !! "
        })
    }
    catch(err){
        res.status(500).json({
            err : "Internal server error",
            message : err.message
        })
    }
}
export const deleteProduct = async(req , res)=>{
    try{
        const pro = req.params.id ; 
        const findProduct = await Product.findByIdAndDelete({
            _id : pro
        });
        if(!findProduct){
            return res.status(401).json({
                message : "No product found!!"
            })
        }
        res.status(200).json({
            message: "You successfully delelted product!! ",
        })
    }
    catch(err){
        res.status(500).json({
            err : "Internal server error",
            message : err.message
        })
    }
}