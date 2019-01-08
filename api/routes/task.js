const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task');
const checkAuth = require('../middleware/check-auth');

/* @GET(/api/rest/v1/todo/task/gettask) */
router.get('/gettask/:emailId', checkAuth,taskController.getByEmailId);

/* @POST(/api/rest/v1/todo/task/create) */
router.post('/create',checkAuth, taskController.addNewTask);

/* @PATCH(/api/rest/v1/todo/task/edit/:taskId) */
router.patch('/edit/:taskId', checkAuth, taskController.editExistingTask);

/* @DELETE(/api/rest/v1/todo/task/delete/:taskId) */
router.delete('/delete/:taskId', checkAuth, taskController.deleteTask);

/* @POST(/api/rest/v1/todo/task/status) */
router.post('/status', taskController.changeStatus);

/* @POST(/api/rest/v1/todo/task/share) */
router.post('/share', taskController.shareToOtherUser);

/* @POST(/api/rest/v1/todo/task/specificrecord) */
router.post('/specificrecord', taskController.getSpecificTask);

module.exports = router;