const express = require('express');
const router = express.Router();
const { createUser, loginUser, loginStatus, addTargets, getTargetPage, getDashboard, addScores, getScores } = require('../controllers/userControllers');

router.post('/sign-up', createUser)

router.post('/',loginUser)

router.get('/loggedIn', loginStatus)

router.get('/add-target/:id', getTargetPage)

router.post('/add-target/:id', addTargets)

router.post('/add-score/:id/:target/:kpi', addScores)

router.get('/add-score/:id/:target/:kpi', getScores)

router.get('/dashboard/:id', getDashboard)

module.exports = router