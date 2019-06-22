const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/User');


//@route GET api/users
//@desc  test
//@access Public
router.get('/', (req, res) => res.send('auth route'))

//@route POST api/users
//@desc Auth & get token
//@access Public
router.post('/', [
  check('email', "Email should be correct format").not().isEmpty(),
  check('password', "Password could not be empty").exists()
], async (req, res) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    res.status(401).json({ errors: errors.array() })
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({email})

    if(!user) {
      res.status(401).json( { errors: [{msg: "There is no such user"}] } )
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
      res.status(401).json( { errors: [{ msg: "Wrong password"}]} )
    }

    const payload = {
      user:{
        id: user.id
      }
    }
    console.log(payload)
    jwt.sign(
      payload,
      config.get('jwtSecret'),
      (err, token) => {
        if(err) throw err;

        res.json({ token });
      }
    )
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error!")
  }
});




module.exports = router;