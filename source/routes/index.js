const express = require('express');
const indexRouter = express.Router();
const { ensureAuthenticated } = require('../../config/auth');

indexRouter.get('', async(req, res) => {
    res.render('index')
});

module.exports = indexRouter;