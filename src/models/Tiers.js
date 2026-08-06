const mongoose =require("mongoose");

const tierSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            unique:true,
            required:true,
            trim:true,
        },
        maxRequests:{
            type:Number,
            required:true,
        },
        windowSeconds:{
            type:Number,
            required: true,
        }
    }
)

module.exports = mongoose.model('Tier', tierSchema);

