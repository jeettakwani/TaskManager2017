module.exports = function (app, db, mongoose) {
    //var http = require('http');

    var userModel = require("./src/server/models/user.model.server.js")(db, mongoose);
    var taskListModel = require("./src/server/models/taskList.model.server.js")(db, mongoose);
    var taskModel = require("./src/server/models/task.model.server.js")(db, mongoose);

    var userService = require("./src/server/services/user.service.server.js")(app, userModel);
    var taskListService = require("./src/server/services/taskList.service.server.js")(app, taskListModel);
    var taskService = require("./src/server/services/task.service.server.js")(app, taskModel);

};