const mongoose = require("mongoose");

const Tier = require("../models/Tiers");

async function tierDetials(req,res){

    try{
        const { name, maxRequests, windowSeconds }=req.body;

        if(!name.trim()){
            res.status(400).json({
                success:false,
                message:"name is required",
            });
        }

        if(maxRequests<0){
            res.status(400).json({
                success: false,
                message: "maxRequest must be greater than 0",
            });
        }

        if (windowSeconds < 0) {
            res.status(400).json({
                success: false,
                message: "window seconds must be greater than 0",
            });
        }
        

        const newTier = await Tier.create({
            name: name.trim(),
            maxRequests,
            windowSeconds,
        });


        res.status(200).json({
            success:true,
            data:newTier,
        });
       
    }
    catch(error){
        if(error.code==11000){
            res.status(409).json({
                success: false,
                message: "Tier with this name already exists",
            });
        }
        res.status(500).json({
            success:false,
            message:"Something went wrong try again",
        });
    }
}


module.exports = { tierDetials }