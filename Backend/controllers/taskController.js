const Task = require('../models/taskModel');

exports.getTasks = async (req, res) => {
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
};

exports.createTask = async (req, res) => {
    const { title, description, column } = req.body;

    const task = new Task({
        title,
        description,
        column,
        user: req.user._id,
    });

    const createdTask = await task.save();
    res.status(201).json(createdTask);
};

exports.updateTask = async (req, res) => {
    const { title, description, column } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.column = column || task.column;

    const updatedTask = await task.save();
    res.json(updatedTask);
};

exports.deleteTask = async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }

    await task.remove();
    res.json({ message: 'Task removed' });
};

