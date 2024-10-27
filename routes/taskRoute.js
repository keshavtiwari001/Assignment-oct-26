const express = require('express')
const router = express.Router()

const { createTask, viewAll, onlyOne, UpdateTask, deleteTask } = require('../controller/taskController')

router.post('/', createTask)
router.get('/', viewAll)
router.get('/:id', onlyOne)
router.put('/:id', UpdateTask)
router.delete('/:id', deleteTask)

module.exports = router