const express = require('express')
const router = express.Router()

const { createUser, onlyOne, UpdateUser, deleteUser, viewAll, signUp, login } = require("../controller/userController")
const { sign } = require('jsonwebtoken')

router.post('/', createUser)
router.get('/', viewAll)
router.get('/:id', onlyOne)
router.put('/:id', UpdateUser)
router.delete('/:id', deleteUser)

router.post('/signup', signUp)
router.post('/login', login)

module.exports = router