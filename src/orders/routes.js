const { Router } = require("express")
const { 
    getOrdersController,
    createOrdersController
} = require("./controller")
const { checkAuth } = require("../../middleware/checkAuth")
const router = Router()
const url = "/orders"

router.get(url, checkAuth, getOrdersController)
router.post(url, checkAuth, createOrdersController)

module.exports = router