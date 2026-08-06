const mongoose = require("mongoose");

const Tier = require("../models/Tiers");
const User = require("../models/User");

async function createUser(req, res) {

    try {
        const { name, email, tierId } = req.body;

        if (!tierId) {
            return res.status(400).json({
                success: false,
                message: "tierId is required",
            });
        }

        if (!name || !name.trim()) {
            return res.status(400).json({
                success: false,
                message: "name is required",
            });
        }

        if (!email || !email.trim()) {
            return res.status(400).json({
                success: false,
                message: "email is required",
            });
        }

        // Validate that the referenced tier exists
        const tier = await Tier.findById(tierId);
        if (!tier) {
            return res.status(404).json({
                success: false,
                message: "No tier found with the given tierId",
            });
        }

        const newUser = await User.create({
            name: name.trim(),
            email: email.trim(),
            tierId,
        });

        return res.status(201).json({
            success: true,
            data: newUser,
        });

    }
    catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "A user with this email already exists",
            });
        }
        return res.status(500).json({
            success: false,
            message: "Something went wrong try again",
        });
    }
}

async function updateUserTier(req, res) {
    try {
        const { id } = req.params;
        const { tierId } = req.body;

        if (!tierId) {
            return res.status(400).json({
                success: false,
                message: "tierId is required",
            });
        }

        // Validate that the new tier exists
        const tier = await Tier.findById(tierId);
        if (!tier) {
            return res.status(404).json({
                success: false,
                message: "No tier found with the given tierId",
            });
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { tierId },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "No user found with the given id",
            });
        }

        return res.status(200).json({
            success: true,
            data: updatedUser,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong try again",
        });
    }

}


module.exports = { createUser, updateUserTier }