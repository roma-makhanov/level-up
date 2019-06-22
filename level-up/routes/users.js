const express = require("express");
const router = express.Router();
const { check, validationResult } = require("../level-up/node_modules/express-validator/check");
const gravatar = require('gravatar');
const bscrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../level-up/models/User');


//@route GET api/users
//@desc  get all users
//@access Public

// router.get("/", (req, res) => {
  
// })


//@route POST api/users
//@desc  Create new user
//@access Public
router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "Password should be longer than 6 chars").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    
    try {

      let user = await User.findOne({ email })

      if(user){
        return res.status(400).json({ errors: [{ msg: "This user is already exists" }] })
      }

      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });

      user = new User({
        name,
        password, 
        email,
        avatar
      });
      const salt = await bscrypt.genSalt(10);
      user.password = await bscrypt.hash(password, salt)
      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000},
        (err, token) => {

          if(err) throw err;

          res.json({ token })
        }
      )

    } catch (error) {
      res.status(500).send("Server error!")
    }
  }
);

module.exports = router;
