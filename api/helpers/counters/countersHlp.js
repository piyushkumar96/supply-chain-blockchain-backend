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

exports.counters =  (role) => {

return new Promise((resolve, reject) => {
    try {
        if (role == "seller") {
            counterSchema.findByIdAndUpdate({ _id: 'seller' },
                { $inc: { seq: 1 } },
                {
                    new: true,
                    upsert: true // Make this update into an upsert
                },
                function (error, counter) {
                    if (error)
                        throw Error("Something happened wrong. Please try again");
                    let cnt = "SEL" + counter.seq;
                    console.log(cnt)
                    resolve (cnt);
                });
        } else if (role == "buyer") {
            console.log(counterSchema)
            counterSchema.findByIdAndUpdate({ _id: 'buyer' },
                { $inc: { "seq": 1 } },
                {
                    new: true,
                    upsert: true // Make this update into an upsert
                },
                function (error, counter) {
                    if (error)
                        throw Error("Something happened wrong. Please try again");
                    let cnt = "BUY" + (counter.seq).toString();
                    console.log(cnt)
                    resolve (cnt);
                });
        } else if (role == "logistic") {
            counterSchema.findByIdAndUpdate({ _id: 'logistic' },
                { $inc: { seq: 1 } },
                {
                    new: true,
                    upsert: true // Make this update into an upsert
                },
                function (error, counter) {
                    if (error)
                        throw Error("Something happened wrong. Please try again");
                    let cnt = "LOG" + (counter.seq).toString();
                    console.log(cnt)
                    resolve (cnt);
                });
        } else if (role == "order") {
            counterSchema.findByIdAndUpdate({ _id: 'order' },
                { $inc: { seq: 1 } },
                {
                    new: true,
                    upsert: true // Make this update into an upsert
                },
                function (error, counter) {
                    if (error)
                        throw Error("Something happened wrong. Please try again");
                    let cnt = "ORD" + (counter.seq).toString();
                    resolve (cnt);
                });
        }
    } catch (err) {
        logger.error(loggerName + err)
        return (err)
    }
})
}