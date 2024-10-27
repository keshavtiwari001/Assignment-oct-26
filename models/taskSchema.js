const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    subject: { type: String },
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    to: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    deadline: { type: String }
})

module.exports = mongoose.model('tasks', taskSchema)