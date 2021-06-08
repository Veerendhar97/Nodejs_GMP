const express = require('express');
const bunyan = require('bunyan');

const { validator } = require('../utils');
const User = require('../models/User');
const log = bunyan.createLogger({name: 'myapp'});
const AppError = require('../error');
const { getAllUsers,getUserById, createUser,updateUser, deleteUser,getAutoSuggestUsers } = require('../services/UserServices');
const router = express.Router();

router.get('/', async(req, res) => {
    const users = await getAllUsers();
    log.info('get all the users!');
    return res.status(200).json(users)
})

router.get('/getUserById/:id', async(req, res) => {
    try {
        log.info('query params',req.params.id)
        let found =await getUserById(req.params.id)
        if (found) {
            log.info('get the user by ID!');
            return res.status(200).json(found);
        } else {
            log.info('user not found!');
            throw new AppError('User not found!', 404)
        }
    } catch(e) {
        log.info(e.message);
        throw new AppError(e.message, 502)
    }       
})

router.post('/createUser', async(req, res) => {
    try{
    const { isValid, message } = validator(req.body)
    const {login,password,age} = req.body;
    if (isValid) {
        log.info('created user successfully!');
         await createUser(login,password,age)
        const users = await getAllUsers()
        return res.status(201).json(users);
    } else {
        log.info('user is not created!');
        throw new AppError('user is not created!', 402)
    }
    } catch(e) {
        log.info('e.message')
        throw new AppError(e.message, 502)
    }
})


router.get('/getAutoSuggestUsers', async(req, res) => {
    const { login,limit } = req.query;
    log.info('query parmas', login , limit);
    const result = await getAutoSuggestUsers(login);
    if(result){
        log.info('get auto suggested users!');
        res.status(200).json(result.slice(0,limit))
    }else{
        throw new AppError('Auto suggest user not found!', 402)
    }
   
})
router.put('/updateUser/:id', async(req, res) => {
    const { isValid, message } = validator(req.body)
    const { id} = req.params;
    log.info('query parmas', id);
    const {login,password,age} = req.body;
    log.info('body', login, password, age);
    try {
        if (isValid) {
            let found = await getUserById(id)
            if (found) {
                await updateUser(login,password,age,+id)
                const updatedUser = await getUserById(id)
                log.info('updated user info successfully!');
                return res.status(200).send(updatedUser);
            } else {
                log.info('user not found!');
                throw new AppError('user not found!', 404)
            }
        } else {
            throw new AppError(message, 400)
        }
    }catch(e) {
        throw new AppError(e.message, 502)
    }
})

router.delete('/deleteUser/:id',async (req, res) => {
    const { id} = req.params;
    // find item from array of data
    let found =  await getUserById(id)
    if (found !== null) {
        await deleteUser(id)
        log.info('Deleted user from the  DB successfully!');
        return res.sendStatus(200)
    } else {
        log.info('user not found!');
        throw new AppError('user not found!', 404)
    }
});

module.exports = router