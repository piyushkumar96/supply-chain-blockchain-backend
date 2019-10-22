/*************************************************************************
*
*   Author:- piyushkumar96
*   Git:-    https://github.com/piyushkumar96
*   Folder Link:- https://github.com/piyushkumar96/supply-chain-blockchain-backend
* 
*   This file contains iotdevices registrattion routes
 **************************************************************************/

'use strict';

module.exports = function (app) {

    const   iotDevicesController = require('../../controllers/iotdevices/iotDevicesCntrl');
    
    // create user route
    app.route('/api/v1/registerIOTDevices')
       .post(iotDevicesController.registerIOTDevices)
};
