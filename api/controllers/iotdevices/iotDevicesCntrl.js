/*************************************************************************
*
*   Author:- piyushkumar96
*   Git:-    https://github.com/piyushkumar96
*   Folder Link:- https://github.com/piyushkumar96/supply-chain-blockchain-backend
* 
*   This file contains iots devices registration 
 **************************************************************************/

'use strict';

// Internal Modules
const   iotDevicesSvc = require('../../services/iotdevices/iotDevicesSvc'),
        logger = require('../../../logger');

const   loggerName = "[iotDevicesCntrl]: ";

// function for creating a new user
exports.registerIOTDevices = async function (req, res) {

    try {
        let result = await iotDevicesSvc.registerIOTDevices(req);
        res.status(200).json({
            success: true,
            message: result
        });
    } catch(err) {
        logger.error(loggerName + err)
        res.status(400).json({
            success: false, 
            message: err
        });
    }
}

