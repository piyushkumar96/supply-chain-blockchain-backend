/*
 *This file contains users creation, login, updatation routes
*/
'use strict';

module.exports = function (app) {

    const   iotDevicesController = require('../../controllers/iotdevices/iotDevicesCntrl');
    
    // create user route
    app.route('/api/v1/registerIOTDevices')
       .post(iotDevicesController.registerIOTDevices)
};
