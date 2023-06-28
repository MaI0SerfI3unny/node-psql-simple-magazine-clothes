const { Router } = require("express")
const { 
    loginUserController,
    registerUserController
} = require("./controller")

const router = Router()

router.post("/register", registerUserController)
router.post("/login", loginUserController)


module.exports = router