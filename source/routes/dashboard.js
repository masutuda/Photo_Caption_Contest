const express = require('express');
const dashboardRouter = express.Router();
const NodeCache = require('node-cache');
const Photo = require('../../models').Photo;
const Caption = require('../../models').Caption;
const { ensureAuthenticated } = require('../../config/auth');

const myCache = new NodeCache({ stdTTL: 10 });

dashboardRouter.get('', ensureAuthenticated, async (req, res) => {

    const captions = await Caption.findAll({
        attributes: ['photo_id', 'caption'],
        where: { user_id: req.user.id },
        raw: true
    });
    
    if(myCache.has('photosCache')){
        const photos = myCache.get('photosCache');
        photos.forEach(photo => photo.captionLink = "/caption?id=" + photo.id);
        res.render('dashboard', {user: req.user, photos: photos, captions: captions})
    } else {
        const photos = await Photo.findAll({
            attributes: ['address', 'name', 'id'],
            raw: true
        });
        photos.forEach(photo => photo.captionLink = "/caption?id=" + photo.id);
    
        myCache.set('photosCache', photos);
        res.render('dashboard', {user: req.user, photos: photos, captions: captions})
    }
});

module.exports = dashboardRouter;