const express=require("express");
const tiersController=require("../Controller/usersController")

const router=express.Router();

router.post("/", tiersController.createUser);
router.patch("/:id/tier", tiersController.createUser);


module.exports = router;