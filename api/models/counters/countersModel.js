/*
 *This file contains user Model require for creating user
*/
'use strict';

//External modules
const   mongoose    = require('mongoose');

const Schema = mongoose.Schema;

const counterSchema = new Schema({
    _id: {
        type: String,
        required: true,
    },
    seq: {
        type: Number,
        default: 0
    }
})

const counters = mongoose.model('counters', counterSchema);
module.exports = counters