import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true,
        trim : true
    },
    price:{
        type: Number,
        required : true,
        min : 0
    },
    discount :{
        type : Number,
        default: 0,
        min : 0,
        max : 100
    },
    category:{
        type : String,
        required : true,
        enum: ["fruit","vegetable","grocery"]
    },
    quantity:{
        type: Number,
        required: true,
        min : 0
    },
    unit : {
        type : String,
        required : true,
        enum : ["kg","gram","kg","ltr","piece","dozen"]
    },
    description:{
        type : String,
        trim : true
    },
    imageURL: {
        type : [String]
        // required : true
    },
    isActive:{
        type : Boolean,
        default: true
    },
    ratings:{
        type : Number,
        default: 0,
        min : 0,
        max : 5
    },
    numOfReviews:{
        type: Number,
        default: 0
    }
},{
    timestamps: true
})


export default mongoose.model("Product", productSchema) ;