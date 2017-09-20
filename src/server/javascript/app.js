module.exports = function (app, db, mongoose) {

    var userModel = require("../models/user.model.server.js")(db, mongoose);
    var taskListModel = require("../models/taskList.model.server.js")(db, mongoose);
    var taskModel = require("../models/task.model.server.js")(db, mongoose);

    var userService = require("../services/user.service.server.js")(app, userModel);
    var taskListService = require("../services/taskList.service.server.js")(app, taskListModel);
    var taskService = require("../services/task.service.server.js")(app, taskModel);
};