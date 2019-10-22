/*
 *This file is for authenticating user to hit APIs
*/

'use strict';

// External Modules
const jwt = require('jsonwebtoken');

// Internal Modules
const counterSchema = require('../../models/counters/countersModel'),
    logger = require('./../../../logger');

const loggerName = "[counterHelper ]: ";

exports.counters =  (role, count) => {

return new Promise((resolve, reject) => {
    try {
        if (role == "seller") {
            counterSchema.findByIdAndUpdate({ _id: 'seller' },
                { $inc: { seq: parseInt(count) } },
                {
                    new: true,
                    upsert: true // Make this update into an upsert
                },
                function (error, counter) {
                    if (error)
                        throw Error("Something happened wrong. Please try again");
                    resolve ("SEL" + counter.seq);
                });
        } else if (role == "buyer") {
            console.log(counterSchema)
            counterSchema.findByIdAndUpdate({ _id: 'buyer' },
                { $inc: { "seq": parseInt(count)  } },
                {
                    new: true,
                    upsert: true // Make this update into an upsert
                },
                function (error, counter) {
                    if (error)
                        throw Error("Something happened wrong. Please try again");
                    resolve ("BUY" + counter.seq);
                });
        } else if (role == "logistic") {
            counterSchema.findByIdAndUpdate({ _id: 'logistic' },
                { $inc: { seq: parseInt(count) } },
                {
                    new: true,
                    upsert: true // Make this update into an upsert
                },
                function (error, counter) {
                    if (error)
                        throw Error("Something happened wrong. Please try again");
                    resolve ("LOG" + counter.seq);
                });
        } else if (role == "order") {
            counterSchema.findByIdAndUpdate({ _id: 'order' },
                { $inc: { seq: parseInt(count) } },
                {
                    new: true,
                    upsert: true // Make this update into an upsert
                },
                function (error, counter) {
                    if (error)
                        throw Error("Something happened wrong. Please try again");
                    resolve ("ORD" + counter.seq);
                });
        }else{

            reject("Invalid Role type.")
        }
    } catch (err) {
        logger.error(loggerName + err)
        reject("Something happened wrong. Please try again")
    }
})
}