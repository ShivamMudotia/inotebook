const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');


// create a user using POST - "/api/post/createuser" , no auth needed. 
router.post('/createuser', [
    body('email','Enter a Valid email').isEmail(),
    body('name', 'Enter a valid Name').isLength({ min: 5 }),
    body('password','Enter a Valid Password').isLength({ min: 5 })
    ], async (req, res) => {
        // If there are validation errors, return bad request and the error(s)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // check if a user with supplied email already exists
        try {
 
        let user =  await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({ errors: 'A user ith this email is  already registered'});
        }
            
        user = await User.create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email
          })

        res.json(user)
                   
    }
    catch(error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured")
    }
})

module.exports = router