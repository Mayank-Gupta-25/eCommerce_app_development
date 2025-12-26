import Product from "../models/productModel.js"

export const addProduct = async(req , res)=>{
    try{
        const pro = req.body ; 
        const createProd = await Product.create({
            name : pro.name,
            price : pro.price,
            productId : pro.productId,
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
            productId : pro
        });
        if(!findProduct){
            return res.status(401).json({
                message : "No product find !!"
            })
        }
        res.status(200).json({
            message: "You successfully added product !! ",
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
        const pro = req.params.id ;
        const findProduct = await Product.findById({
            productId : pro
        });
        if(!findProduct){
            return res.status(401).json({
                message : "No product found!!"
            })
        }
        findProduct.name =  update.name ;
        findProduct.price = update.price ;
        findProduct.category = update.category;
        findProduct.quantity = update.quantity;
        findProduct.unit = update.unit;
        findProduct.imageURL = update.imageURL;
        findProduct.discount = update.discount;
        findProduct.description = update.description ; 
        findProduct.isActive = update.isActive;
        
        
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
export const deleteProduct = async(req , res)=>{
    try{
        const pro = req.params.id ; 
        const findProduct = await Product.findByIdAndDelete({
            productId : pro
        });
        if(!findProduct){
            return res.status(401).json({
                message : "No product found!!"
            })
        }
        res.status(200).json({
            message: "You successfully added product!! ",
        })
    }
    catch(err){
        res.status(500).json({
            err : "Internal server error",
            message : err.message
        })
    }
}