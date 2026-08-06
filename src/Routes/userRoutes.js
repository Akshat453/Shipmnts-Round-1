const express=require("express");
const usersController=require("../Controller/usersController")

const router=express.Router();

router.post("/", usersController.createUser);
router.patch("/:id/tier", usersController.updateUserTier);


module.exports = router;