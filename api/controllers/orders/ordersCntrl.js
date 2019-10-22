/*
 *This file contains orders creation, login, updation control flow
*/
'use strict';

// Internal Modules
const   ordersSvc = require('../../services/orders/ordersSvc'),
        logger = require('../../../logger');

const   loggerName = "[ordersCntrl]: ";

// function for creating a new order
exports.addOrder = async function (req, res) {
    let  orderName = req.body.orderName,
         sellerId = req.body.sellerId,
         sellerLoc = req.body.sellerLoc;

    if (!orderName || !sellerId || !sellerLoc) {
        logger.error(loggerName + "Invalid Parameters while creating Order !!!")
        res.status(400).json({
            success: false,
            message: 'Invalid parameters'
        });
    }else{

        try {
            let result = await ordersSvc.addOrder(req);
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

}

// function for updating an order status
exports.updateOrderStatus = async function (req, res) {
    let  orderId = req.body.orderId,
         status = req.body.status;

    if (!orderId || !status) {
        logger.error(loggerName + "Invalid Parameters while updating an Order !!!")
        res.status(400).json({
            success: false,
            message: 'Invalid parameters'
        });
    }else {

        try {
            let result = await ordersSvc.updateOrderStatus(req);
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
}


// function for updating logistic details of an order
exports.updateLogisticDetails = async function (req, res) {
    let  orderId = req.body.orderId,
         logisticId = req.body.logisticId,
         logisticLoc = req.body.logisticLoc,
         status = req.body.status;

    if (!orderId || !logisticId || !logisticLoc || !status) {
        logger.error(loggerName + "Invalid Parameters while updating logistic details of an Order !!!")
        res.status(400).json({
            success: false,
            message: 'Invalid parameters'
        });
    }else {

        try {
            let result = await ordersSvc.updateLogisticDetails(req);
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
}

// function for updating Time Raster details of an order
exports.updateTimeRaster = async function (req, res) {
    let  orderId = req.body.orderId,
         timestamp = req.body.timestamp,
         temperature = req.body.temperature;

    if (!orderId || !timestamp || !temperature) {
        logger.error(loggerName + "Invalid Parameters while updating Time Raster details of an Order !!!")
        res.status(400).json({
            success: false,
            message: 'Invalid parameters'
        });
    }else {

        try {
            let result = await ordersSvc.updateTimeRaster(req);
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
}

// function for getting all orders
exports.getAllOrders = async function (req, res) {

    try {
        let result = await ordersSvc.getAllOrders(req);
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

// function for getting an order
exports.getOrder = async function (req, res) {

    try {
        let result = await ordersSvc.getOrder(req);
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
