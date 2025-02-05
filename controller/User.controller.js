const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { userService } = require('../service');


const createUser = async( req, res, next) => {
    const user = await userService.createUser(req.body);
    res.status(httpStatus.CREATED).send(user);
}


const deleteUser = async (req, res) => {
    await userService.deleteUser(req.params.id);
    res.status(httpStatus.NO_CONTENT).send();
  };

  
const getUser = async (req, res) => {
    const user = await userService.FetchUser();
    if (user == '') {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    console.log(user)
    res.send(user);
  };
  const updateUser = async (req, res) => {
    const user = await userService.updateUser(req.params.id, req.body);
    res.send(user);
  };  

  module.exports = {
    updateUser, getUser, deleteUser, createUser
  }