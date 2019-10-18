/*
 *This file contains Orders creation, login, updation main logic
*/
'use strict';

// Internal Modules
const config = require('../../../config/config.json'),
    logger = require('../../../logger'),
    fabricInvoke = require('../../fabric-libs/invoke'),
    fabricQuery = require('../../fabric-libs/query'),
    counterHlp = require('../../helpers/counters/countersHlp');

const loggerName = "[ordersSvc ]: ";

/**
 * Add Order
 * @param {String} orderId
 * @param {String} buyerId
 * @param {String} buyerLoc
 * @param {String} temperature
 *
 * @returns {Promise}
 */

exports.addOrder = function (data) {

    return new Promise(async (resolve, reject) => {

        let orderId = await counterHlp.counters("order")

        let sellerId = data.user.Id,
            sellerLoc = data.user.location,
            status = data.body.status,
            buyerId = data.body.buyerId,
            buyerLoc = data.body.buyerLoc,
            temperature = data.body.temperature;

        let timestamp = new Date();
        let args = [orderId.toString(), sellerId.toString(), sellerLoc.toString(), buyerId.toString(), buyerLoc.toString(), timestamp.toString(), temperature.toString(), status.toString()]


        try {
            var result = await fabricInvoke.invokeChaincode(config.peerNames, config.channelName, config.chaincodeName, "addOrder", args, sellerId, config.orgName);
            // if (result && typeof result !== 'string') {
            logger.debug(loggerName + ' Order added Successfully in Blockchain with  %s ', orderId);
            resolve("Order added Successfully")

            // }else {
            //     logger.error(loggerName + " Error in adding the order in Blockchain");
            //     reject("Unable to add Order in blockchain")
            // }
        } catch (error) {
            logger.error(loggerName + ' Error in adding the order in Blockchain');
            reject("Error in adding the order in Blockchain " + error)
        }
    });

}

/**
 * update Order Status
 * @param {String} orderId
 * @param {String} status
 *
 * @returns {Promise}
 */

exports.updateOrderStatus = function (data) {
    let Id = data.user.Id,
        orderId = data.body.orderId,
        status = data.body.status;

    let args = [orderId.toString(), status.toString()]

    return new Promise(async (resolve, reject) => {

        try {
            var result = await fabricInvoke.invokeChaincode(config.peerNames, config.channelName, config.chaincodeName, "updateStatus", args, Id, config.orgName);
            //if (result && typeof result !== 'string') {
            logger.debug(loggerName + ' Order Status Successfully Updated in Blockchain with  %s ', orderId);
            resolve("Order Status Successfully Updated")

            // }else {
            //     logger.error(loggerName + ' Error in updating the order status in Blockchain');
            //     reject("Error in updating the order status in Blockchain")
            // }
        } catch (error) {
            logger.error(loggerName + ' Error in updating the order status in Blockchain');
            reject("Error in updating the order status in Blockchain")
        }
    });

}

/**
 * update Logistic Details
 * @param {String} orderId
 * @param {String} logisticId
 * @param {String} logisticLoc
 * @param {String} status
 *
 * @returns {Promise}
 */

exports.updateLogisticDetails = function (data) {
    let Id = data.user.Id,
        orderId = data.body.orderId,
        logisticId = data.body.logisticId,
        logisticLoc = data.body.logisticLoc,
        status = data.body.status;

    let args = [orderId.toString(), logisticId.toString(), logisticLoc.toString(), status.toString()]

    return new Promise(async (resolve, reject) => {

        try {
            var result = await fabricInvoke.invokeChaincode(config.peerNames, config.channelName, config.chaincodeName, "updateLogisticDetails", args, Id, config.orgName);
            //if (result && typeof result !== 'string') {
            logger.debug(loggerName + ' Order Logistic Details Successfully Updated in Blockchain with  %s ', orderId);
            resolve("Order Logistic Details Successfully Updated")

            // }else {
            //     logger.error(loggerName + " Error in updating logistic details of an order in Blockchain");
            //     reject("Unable to update Order  Logistic Details in blockchain")
            // }
        } catch (error) {
            logger.error(loggerName + " Error in updating logistic details of an order in Blockchain " + error);
            reject("Unable to update Order  Logistic Details in blockchain  " + error)
        }
    });

}

/**
 * update Time Raster Details
 * @param {String} orderId
 * @param {String} timestamp
 * @param {String} temperature
 *
 * @returns {Promise}
 */

exports.updateTimeRaster = function (data) {
    let iotDeviceId = data.body.iotDeviceId,
        orderId = data.body.orderId,
        timestamp = data.body.timestamp,
        temperature = data.body.temperature;

    let args = [orderId.toString(), timestamp.toString(), temperature.toString()]

    return new Promise(async (resolve, reject) => {

        try {
            var result = await fabricInvoke.invokeChaincode(config.peerNames, config.channelName, config.chaincodeName, "updateTimeRaster", args, iotDeviceId, config.orgName);
            //if (result && typeof result !== 'string') {
            logger.debug(loggerName + ' Update the   %s ', orderId);
            resolve("Order Time Raster Details Successfully Updated")

            // }else {
            //     logger.error(loggerName + " Error in updating Time Raster of an order in Blockchain");
            //     reject("Unable to update Order Time Raster in blockchain")
            // }
        } catch (error) {
            logger.error(loggerName + " Error in updating logistic details of an order in Blockchain");
            reject("Unable to update Order Time Raster Details in blockchain")
        }
    });

}


/**
 * get All Orders 
 *
 * @returns {Promise}
 */

exports.getAllOrders = function (data) {
    let id = data.user.Id,
        role = data.user.role;

    if (role == "seller") {
        var args = [`{"selector":{ "seller.sellerId" : "${id}"} }`]
    } else if (role == "buyer") {
        var args = [`{"selector":{ "buyer.buyerId" : "${id}"} }`]
    } else if (role == "logistic") {
        var args = [`{"selector":{ "logistic.logisticId" : "${id}"} }`]
    }

    return new Promise(async (resolve, reject) => {

        try {
            var result = await fabricQuery.queryChaincode(config.peerNames, config.channelName, config.chaincodeName, args, "queryOrders", id, config.orgName);
            //if (result && typeof result !== 'string') {
            logger.debug(loggerName + ' Succesfully get all Orders   %s ');
            resolve(result)

            // }else {
            //     logger.error(loggerName + " Error in getting orders from Blockchain");
            //     reject("Unable to get orders from blockchain")
            // }
        } catch (error) {
            logger.error(loggerName + " Error in getting orders from Blockchain");
            reject("Unable to get orders from blockchain")
        }
    });

}

/**
 * get an Order 
 *
 * @returns {Promise}
 */

exports.getOrder = function (data) {
    let id = data.user.Id,
        orderId = data.params.orderId,
        args = [orderId.toString()];

    return new Promise(async (resolve, reject) => {

        try {
            var result = await fabricQuery.queryChaincode(config.peerNames, config.channelName, config.chaincodeName, args, "readOrder", id, config.orgName);
            //if (result && typeof result !== 'string') {
            logger.debug(loggerName + ' Succesfully get an Order   %s ');
            resolve(result)

            // }else {
            //     logger.error(loggerName + " Error in getting an order from Blockchain");
            //     reject("Unable to get orders from blockchain")
            // }
        } catch (error) {
            logger.error(loggerName + " Error in getting an order from Blockchain");
            reject("Unable to get an order from blockchain " + error)
        }
    });

}


