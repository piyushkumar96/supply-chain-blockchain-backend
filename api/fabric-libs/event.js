/*************************************************************************
*
* FAO CONFIDENTIAL
* __________________
*
*  [2018] - FAO
*  All Rights Reserved.
*
* NOTICE:  All information contained herein is, and remains
* the property of FAO and its suppliers, if any.
* Dissemination of this information or reproduction of this material
* is strictly forbidden unless prior written permission is obtained
* from FAO.
***************************************************************************/

var path = require('path');

var fs = require('fs');
var util = require('util');
var hfc = require('fabric-client');
var helper = require('./helper.js');
var logger = helper.getLogger('Event');
var eventServer = require('../../socketEvent.js');

var registerEventHub = async function(peer, channelName, username, org_name) {

    try {

        // first setup the client for this org
        var client = await helper.getClientForOrg(org_name, username);
        logger.debug('Successfully got the fabric client for the organization "%s"', org_name);
        var channel = client.getChannel(channelName);

        if(!channel) {
            let message = util.format('Channel %s was not defined in the connection profile', channelName);
            logger.error(message);
            throw new Error(message);

        }

        const eh = channel.newChannelEventHub(peer);
        return new Promise(function(resolve, reject) {
            eh.registerBlockEvent(
                (block) => {
                        //logger.debug('Successfully register the block eventhub for "%s"', JSON.stringify(block));
                        let header = (block.number); // the "header" object contains metadata of the transaction
                        
                        eventServer.ioObj.emit('broadcast', header);
                },
                (err) => {
                    logger.error('Failed to register event due to error: ' + err.stack ? err.stack : err);
                    reject(err);
                }
            );
            eh.connect();
            resolve("Successfully register event hub!")
        })

    } catch(error) {
        logger.error('Failed to register event due to error: ' + error.stack ? error.stack : error);
        return error.toString();
    }

};

exports.registerEventHub = registerEventHub;