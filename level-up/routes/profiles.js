const express = require('express');
const router = express.Router();

//@route POST api/profiles
//@desc  Create a new post
//@access Private
router.get('/', (req, res) => res.send('profiles route'))

module.exports = router;