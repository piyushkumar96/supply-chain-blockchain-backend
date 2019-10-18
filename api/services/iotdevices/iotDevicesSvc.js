/*
 *This file contains users creation, login, updation main logic
*/
'use strict';

// Internal Modules
const   config    = require('../../../config/config.json'),
        logger = require('../../../logger'),
        helper = require('./../../fabric-libs/helper');

const   loggerName = "[iotDevicesSvc ]: ";

/**
 * register IOT devices into blockchain
 *
 * @returns {Promise}
 */

exports.registerIOTDevices = function (data) {
    let deviceId = data.body.iotDeviceId;
    return new Promise(async (resolve, reject) => {
        try {
            let response = await helper.getRegisteredUser(deviceId, config.orgName, true, "user");
            //if (response && typeof response !== 'string') {
                logger.debug(loggerName + ' IOT device Registered Successfully in Blockchain with  %s ', deviceId);
                resolve("IOT device Registered Successfully")
            // } else {
            //     logger.error(loggerName + ' Error while registering User in Blockchain with  %s ', deviceId);
            //     reject("Unable to  register IOT device in blockchain")
            //}
        } catch (error) {
            logger.error(loggerName + ' Error while registering IOT device in Blockchain with  %s ', deviceId);
            reject("Unable to  register IOT device in blockchain")
        }
    });
}
