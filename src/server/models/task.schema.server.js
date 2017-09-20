"use strict";
module.exports = function(mongoose)
{
    // use mongoose to declare a field schema
    var field = mongoose.Schema({
        label: String,
        text: String
    });

    return field;
};