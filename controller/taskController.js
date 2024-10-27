const Task = require('../models/taskSchema')


exports.createTask = async (req, res) => {
    const data = req.body;

    const task = new Task(data)
    await task.save()
    res.status(201).json({ newTask: task, msg: "Task added successfully!" })

}

exports.viewAll = async (req, res) => {
    const task = await Task.find();
    res.status(200).json(task);
}

exports.onlyOne = async (req, res) => {
    const id = req.params.id
    const task = await Task.findById(id)
    if (!task) {
        return res.status(400).json({ error: "task not created!!" })
    }
    res.status(200).json({ task: task })
}

exports.UpdateTask = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const task = await Task.findByIdAndUpdate(id, data);
    res.status(200).json(task)
}

exports.deleteTask = async (req, res) => {
    const id = req.params.id
    const task = await Task.findByIdAndDelete(id);
    res.status(200).json({ msg: "Task deleted successfully!", subject: task.subject })

}
