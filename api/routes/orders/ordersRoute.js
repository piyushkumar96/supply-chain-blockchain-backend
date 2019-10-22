/*************************************************************************
*
*   Author:- piyushkumar96
*   Git:-    https://github.com/piyushkumar96
*   Folder Link:- https://github.com/piyushkumar96/supply-chain-blockchain-backend
* 
*   This file contains order addition, updateorderstatus, etc. routes
 **************************************************************************/

'use strict';

module.exports = function (app) {

    const   ordersController = require('../../controllers/orders/ordersCntrl'),
            authentication = require('../../middleware/auth');
    
    // create order route
    app.route('/api/v1/addOrder')
       .post(authentication.auth, ordersController.addOrder)

    // update order status
    app.route('/api/v1/updateOrderStatus')
       .patch(authentication.auth, ordersController.updateOrderStatus)

    // update logistic details of order 
    app.route('/api/v1/updateLogisticDetails')
       .patch(authentication.auth, ordersController.updateLogisticDetails)
   
   // update time raster details of order
   app.route('/api/v1/updateTimeRaster')
      .patch(ordersController.updateTimeRaster)  

   // get all orders
   app.route('/api/v1/getAllOrders')
      .get(authentication.auth,ordersController.getAllOrders)  

   // get an order
   app.route('/api/v1/getOrder/:orderId')
      .get(authentication.auth,ordersController.getOrder)  
   
};
