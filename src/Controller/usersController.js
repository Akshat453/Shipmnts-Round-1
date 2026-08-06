const mongoose = require("mongoose");

const Tier = require("../models/Tiers");
const User = require("../models/User");

async function createUser(req, res) {

    try {
        const { name, email, tierId } = req.body;

        const tierIds = await User.findByID(TierID);

        if (!tierId) {
            res.status(404).json({
                success: false,
                message: "No tier Found",
            });
        }

        if(tierId.toString()!==User.tierId){
            res.status(400).json({
                success: false,
                message: "Id is required",
            });
        }

        if (!name.trim()) {
            res.status(400).json({
                success: false,
                message: "name is required",
            });
        }

        if (!email.trim()) {
            res.status(400).json({
                success: false,
                message: "email is required",
            });
        }

        const tier = await Tier.findByID(tierId);

        const newUser = await User.create({
                    name: name.trim(),
                    email:email.trim(),
                    tier_Id,
                });


        res.status(200).json({
            success: true,
            data: newUser,
        });

    }
    catch (error) {
        if (error.code == 11000) {
            res.status(409).json({
                success: false,
                message: "A user with this email already exists",
            });
        }
        res.status(500).json({
            success: false,
            message: "Something went wrong try again",
        });
    }
}

async function updateUserTier(req,res){
    try{
        const { TierId } = req.params;

        const upgradeID=await User.findByIdAndUpdate(tierId,TierId)
    
        res.status(200).json({
            success: true,
            data: upgradeID,
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: "Something went wrong try again",
        });
    }

}


module.exports = { createUser, updateUserTier }