const { Router } = require("express")
const { 
    createClothesController,
    getClothesController,
    deleteClothesController,
    putClothesController
} = require("./controller")

const router = Router()
const url = "/clothes"

router.get(url, getClothesController)
router.post(url, createClothesController)
router.delete(url, deleteClothesController)
router.put(url, putClothesController)

module.exports = router