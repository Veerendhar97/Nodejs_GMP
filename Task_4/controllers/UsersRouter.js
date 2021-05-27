const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { validator } = require('../utils');
const User = require('../models/User');
const { getAllUsers,getUserById, createUser,updateUser, deleteUser,getAutoSuggestUsers } = require('../services/UserService');

let userData = [
    { id: uuidv4(), login: 'Create a project', password: 'password1', isDeleted: false, age: 25 },
    { id: uuidv4(), login: 'Take a cofféé', password: 'password2', isDeleted: false, age: 25 },
    { id: uuidv4(), login: 'Write new article', password: 'password3', isDeleted: false, age: 25 },
    { id: uuidv4(), login: 'Walk toward home', password: 'password4', isDeleted: false, age: 25 },
    { id: uuidv4(), login: 'Have some dinner', password: 'password5', isDeleted: false, age: 25 },
];

const router = express.Router();

router.get('/', async(req, res) => {
    const users = await getAllUsers();
    return res.status(200).json(users)
})

router.get('/getUserById/:id', async(req, res) => {
    try {
    let found =await getUserById(req.params.id)
    if (found) {
       return res.status(200).json(found);
    } else {
       return res.status(200).sendStatus(404)
    }
} catch(e) {
    console.log(e.message)
}       
})

router.post('/createUser', async(req, res) => {
    try{
    const { isValid, message } = validator(req.body)
    const {login,password,age} = req.body;
    if (isValid) {
         await createUser(login,password,age) 
        const users = await getAllUsers()
        return res.status(201).json(users);
    } else {
        return res.status(400).json(message)
    }
    } catch(e) {
        console.log(e.message)
    }
})


router.get('/getAutoSuggestUsers', async(req, res) => {
    const { login,limit } = req.query;
    const result = await getAutoSuggestUsers(login)
    res.status(200).json(result.slice(0,limit))
   
})
router.put('/updateUser/:id', async(req, res) => {
    const { isValid, message } = validator(req.body)
    const { id} = req.params;
    const {login,password,age} = req.body;
    try {
    if (isValid) {
        let found = await getUserById(id)
        if (found) {
            await updateUser(login,password,age,+id)
            const updatedUser = await getUserById(id)
            return res.status(200).send(updatedUser);
        } else {
            return res.sendStatus(404);
        }
    } else {
        res.status(400).json(message)
    }
}catch(e) {
    console.log(e.message)
}
})

router.delete('/deleteUser/:id',async (req, res) => {
    const { id} = req.params;
    let found =  await getUserById(id)
    if (found !== null) {
        await deleteUser(id)
        return res.sendStatus(200)
    } else {
        return res.sendStatus(404)
    }
});

module.exports = router