const express = require('express');
const bodyParser = require('body-parser');
const auth = require('../middleware/auth')
const {findUsers, registerUser, loginUser, logOut, showMyUserAccount} = require('../controllers/user-controller')

const router = express.Router();
router.use(bodyParser.json());


router.get('/users', findUsers);

router.post('/register', registerUser);

router.post('/login', loginUser)

router.get('/me', auth, showMyUserAccount)

router.post('/me/logout', auth, logOut)


module.exports = router;
