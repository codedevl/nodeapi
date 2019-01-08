const Task = require('../models/task');
const User = require('../models/user');

exports.getByEmailId = (req, res, next) => {
    Task.find({
            createdBy: req.params.emailId
        })
        .exec()
        .then(results => {
            res.status(200).json({
                status: true,
                message: "All Task Retrieved Successfully",
                data: results.map(result => {
                    return {
                        name: result.name,
                        description: result.description,
                        taskDate: result.taskDate,
                        status: result.status,
                        receivedBy: result.receivedBy
                    };
                })
            });
        })
        .catch(err => {
            console.log("Error in /api/rest/v1/todo/task/gettask Fetching Task From Database")
            res.status(500).json({
                message: "Internal Server Error"
            });
        });
};

exports.addNewTask = (req, res, next) => {
    if (req.body.sendTo != null) {
        const task = new Task({
            "name": req.body.name,
            "description": req.body.description,
            "taskDate": req.body.taskDate,
            "createdBy": req.body.createdBy,
        });
        task
        .save()
        .then(result => {
            const task1 = new Task({
                "name": req.body.name,
                "description": req.body.description,
                "taskDate": req.body.taskDate,
                "createdBy": req.body.sendTo,
                "receivedBy": req.body.createdBy,
            });
            task1.save().then(result1 => {
                res.status(200).json({
                    status: true,
                    message: "Task Added and Shared Successfully",
                    data: result,
                    sharedData: result1
                })
            })
        })
        .catch(err => {
            console.log("Error in /api/rest/v1/todo/task/create Inserting Task From Database")
            res.status(500).json({
                message: "Internal Server Error"
            });
        })
    } else {
        const task = new Task({
            "name": req.body.name,
            "description": req.body.description,
            "taskDate": req.body.taskDate,
            "createdBy": req.body.createdBy,
        });
        task
        .save()
        .then(result => {
            res.status(200).json({
                status: true,
                message: "Task Added Successfully",
                data: result,
            })
        })
        .catch(err => {
            console.log("Error in /api/rest/v1/todo/task/create Inserting Task From Database")
            res.status(500).json({
                message: "Internal Server Error"
            });
        })
    }
};

exports.editExistingTask = (req, res, next) => {
    const id = req.params.taskId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Task.update({
            _id: id
        }, {
            $set: updateOps
        })
        .exec()
        .then(result => {
            if (result) {
                res.status(200).json({
                    status: true,
                    message: 'Task Updated Successfully',
                    flag: 1
                });
            } else {
                res.status(404).json({
                    status: false,
                    message: "You Entered Invalid Id",
                    flag: -1
                });
            }

        })
        .catch(err => {
            console.log("Error in /api/rest/v1/todo/task/edit Updating Task From Database")
            res.status(500).json({
                message: "Internal Server Error"
            });
        });
};

exports.deleteTask = (req, res, next) => {
    const id = req.params.taskId;
    Task.remove({
            _id: id
        })
        .exec()
        .then(result => {
            if (result) {
                res.status(200).json({
                    status: true,
                    message: 'Task Deleted Successfully',
                });
            } else {
                res.status(404).json({
                    status: false,
                    message: "You Entered Invalid Task ID"
                });
            }
        })
        .catch(err => {
            console.log("Error in /api/rest/v1/todo/task/deleteTask");
            res.status(500).json({
                message: "Internal Server Error"
            });
        });
};

exports.changeStatus = (req, res, next) => {
    res.status(200).json({
        message: "changeStatus WOrking",
    });
};

exports.shareToOtherUser = (req, res, next) => {
    res.status(200).json({
        message: "shareToOtherUser wORKING",
    });
};

exports.getSpecificTask = (req, res, next) => {
    res.status(200).json({
        message: "getSpecificTask WOrking",
    });
};