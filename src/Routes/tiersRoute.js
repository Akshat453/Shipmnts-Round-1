const express=require("express");
const tiersController=require("../Controller/tiersController")

const router=express.Router();

router.post("/", tiersController.tierDetials);

module.exports = router;