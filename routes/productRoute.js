const express = require('express')
const router = express.Router()
const { createProduct, deleteProduct, onlyOne, viewAll, UpdateProduct } = require("../controller/productController")

router.post('/', createProduct)
router.get('/', viewAll)
router.get('/:id', onlyOne)
router.put('/:id', UpdateProduct)
router.delete('/:id', deleteProduct)

module.exports = router