/*************************************************************************
*
*   Author:- piyushkumar96
*   Git:-    https://github.com/piyushkumar96
*   Folder Link:- https://github.com/piyushkumar96/supply-chain-blockchain-backend
* 
*   This file contains users creation, login, updation main logic
 **************************************************************************/

'use strict';

//External Modules 
const bcrypt = require('bcryptjs'),
    uuidv4 = require('uuid/v4');

// Internal Modules
const userSchema = require('../../models/users/usersModel'),
    config = require('../../../config/config.json'),
    logger = require('../../../logger'),
    helper = require('./../../fabric-libs/helper'),
    counterHlp = require('../../helpers/counters/countersHlp');
// emailHlp = require('../../helpers/email/emailHlp');

const loggerName = "[usersSvc ]: ";

/**
 * Create User
 * @param {String} name
 * @param {String} email
 * @param {String} password
 *
 * @returns {Promise}
 */

exports.createUser = function (data) {
    return new Promise(async (resolve, reject) => {

        try {
            var userId = await counterHlp.counters(data.role, "1")
            data.Id = userId
            try {
                let response = await helper.getRegisteredUser(userId, config.orgName, true, "user");
                console.log(response)
                if (response && typeof response !== 'string') {

                    logger.debug(loggerName + ' User Registered Successfully in Blockchain with  %s ', userId);
                    const user = new userSchema(data)

                    try {
                        await user.save()
                        //emailHlp.sendWelcomeMail(user.name, user.email)
                        const token = await user.generateAuthToken()
                        logger.info(loggerName + "User Created Successfully @@@")
                        resolve({ "user": user, "token": token })

                    } catch (err) {
                        let userId = await counterHlp.counters(data.role, "-1")
                        logger.error(loggerName + err);
                        if (err.name === 'MongoError' && err.code === 11000) {
                            reject("User with email address exists");
                        }
                        reject(err.message);
                    }

                } else {
                    let userId = await counterHlp.counters(data.role, "-1")
                    logger.error(loggerName + ' Error while registering User in Blockchain with  %s ', userId);
                    console.log("Here is the error")
                    reject("Unable to  register User in blockchain")
                }
            } catch (error) {
                let userId = await counterHlp.counters(data.role, "-1")
                logger.error(loggerName + ' Error while registering User in Blockchain with  %s ', userId);
                reject("Unable to  register User in blockchain" + error)
            }
        } catch (error) {
            logger.error(loggerName + ' Error while generating the User ID', error);
            reject(error)
        }
    });

}


/**
 * Login User
 * @param {String} email
 * @param {String} password
 *
 * @returns {Promise}
 */

exports.loginUser = function (loginData) {

    return new Promise(async (resolve, reject) => {

        try {
            const user = await userSchema.findByCrendentials(loginData.email, loginData.password)
            const token = await user.generateAuthToken()
            logger.info(loggerName + "User " + user.name + " login Successfully @@@")
            resolve({ "user": user, "token": token })

        } catch (err) {
            logger.error(loggerName + err);
            reject("Authentication failed");
        }
    });

}


/**
 * Get User
 *
 * @returns {Promise}

exports.getUser = function() {

    return new Promise(async (resolve, reject) => {

        try {
            const user = await userSchema.findByCrendentials(loginData.email, loginData.password)
            const token = await user.generateAuthToken()
            resolve({"user": user,"token":token})

        } catch (err) {
            logger.error(loggerName+err);
            reject("Authentication failed");
        }
    });

}
*/


/**
 * Logout User's Current Session
 *
 * @returns {Promise}
 */

exports.logoutCS = function (data) {

    return new Promise(async (resolve, reject) => {

        try {
            data.user.tokens = data.user.tokens.filter((token) => {
                return token.token !== data.token
            })
            await data.user.save()
            logger.info(loggerName + "User " + data.user.name + " LogOut Current Session Successfully @@@")
            resolve("LogOut Current Session Successfully")

        } catch (err) {
            logger.error(loggerName + err);
            reject("Something failed, Please retry");
        }
    });

}

/**
 * Logout User's All Sessions
 *
 * @returns {Promise}
 */

exports.logoutAS = function (data) {

    return new Promise(async (resolve, reject) => {

        try {
            data.user.tokens = []
            await data.user.save()
            logger.info(loggerName + "User " + data.user.name + " LogOut All Sessions Successfully @@@")
            resolve("LogOut All Sessions Successfully")

        } catch (err) {
            logger.error(loggerName + err);
            reject("Something failed, Please retry");
        }
    });

}

/**
 * Update user's profile
 *
 * @returns {Promise}
 */

exports.updateUser = function (data) {

    return new Promise(async (resolve, reject) => {

        const updates = Object.keys(data.body)
        const allowedUpdates = ["location"]
        const isvalidOperation = updates.every((updates) => allowedUpdates.includes(updates))

        if (!isvalidOperation) {
            reject("Invalid updates!!!")
        }

        try {
            updates.forEach((update) => data.user[update] = data.body[update])
            await data.user.save()
            logger.info(loggerName + "User " + data.user.name + " User Successfully Updated @@@")
            resolve("User Successfully Updated")

        } catch (err) {
            logger.error(loggerName + err);
            reject("Something failed, Please retry");
        }
    });

}


/**
 * Update user's profile
 * @param {String} oldPassword
 * @param {String} newPassword
 *
 * @returns {Promise}
 */

exports.updatePassword = function (data) {

    return new Promise(async (resolve, reject) => {

        try {

            const isvalidOperation = bcrypt.compareSync(data.body.oldPassword, data.user.password)
            if (!isvalidOperation) {
                logger.info(loggerName + "User " + data.user.name + " Incorrect Old password !!!")
                reject("Incorrect Old password!!!")
            }

            data.user.password = data.body.newPassword
            await data.user.save()
            logger.info(loggerName + "User " + data.user.name + " Password Successfully Updated @@@")
            resolve("Password Successfully Updated")

        } catch (err) {
            logger.error(loggerName + err);
            reject(err.message);
        }
    });

}

/**
 * delete user profile
 *
 * @returns {Promise}
 */

exports.deleteUser = function (data) {

    return new Promise(async (resolve, reject) => {
        try {

            await data.user.remove()
            //emailHlp.sendGoodbyeMail(data.user.name, data.user.email)
            logger.info(loggerName + "User " + data.user.name + " User Successfully deleted @@@")
            resolve("User Successfully Deleted")

        } catch (err) {
            logger.error(loggerName + err);
            reject("Something failed, Please retry");
        }
    });

}


/** 
 * Get All Logistics
 *
 * @returns {Promise}
*/

exports.getAllLogistics = function () {

    return new Promise(async (resolve, reject) => {

        try {
            const user = await userSchema.findByCrendentials(loginData.email, loginData.password)
            const token = await user.generateAuthToken()
            resolve({ "user": user, "token": token })

        } catch (err) {
            logger.error(loggerName + err);
            reject("Authentication failed");
        }
    });

}
