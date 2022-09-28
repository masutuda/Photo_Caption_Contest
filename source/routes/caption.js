const express = require('express');
const captionRouter = express.Router();
const Photo = require('../../models').Photo;
const Caption = require('../../models').Caption;
const { check, validationResult } = require('express-validator');
const { ensureAuthenticated } = require('../../config/auth');

captionRouter.get('', ensureAuthenticated, async (req, res) => {
    const photo = await Photo.findOne({
        attributes: ['address', 'name', 'id'],
        raw: true,
        where: {id: req.query.id}
    });

    if(photo) {
        res.render('caption', {photo: photo, user: req.user});
    } else {
        res.redirect('/dashboard');
    }

});

captionRouter.post('', ensureAuthenticated, [
    check('caption', 'Please enter a caption')
        .exists()
        .escape(),
    check('caption', 'Enter a caption between 5 and 150 characters')
        .isLength({ min: 5, max: 150 })
    ],
    async (req, res) => {

        const errors = validationResult(req).errors;
        const captionExists = await Caption.findAll({
            where: { user_id: req.user.id, photo_id: req.body.photoId}
        });

        if(errors.length > 0) {
            res.send(errors.message);
        } else {
            if(captionExists) {
                try {
                    return await Caption.update({
                        caption: req.body.caption
                    },
                    {
                        where: {user_id: req.user.id, photo_id: req.body.photoId}
                    }).then(async caption => {
                        if (caption) {
                            const photos = await Photo.findAll({
                                attributes: ['address', 'name', 'id'],
                                raw: true
                            });
                            photos.forEach(photo => photo.captionLink = "/caption?id=" + photo.id);
                            const captions = await Caption.findAll({
                                attributes: ['photo_id', 'caption'],
                                where: { user_id: req.user.id },
                                raw: true
                            });
                            res.render('dashboard', { user: req.user, photos: photos, captions: captions });
                        } else {
                            response.status(400).send('Error inserting caption');
                        }
                    });
    
                } catch {
                    res.status(500).send('error update');
                }
            } else {
                try {
                    return await Caption.create({
                        user_id: req.user.id,
                        photo_id: req.body.photoId,
                        caption: req.body.caption
                    }).then(async caption => {
                        if (caption) {
                            const photos = await Photo.findAll({
                                attributes: ['address', 'name', 'id'],
                                raw: true
                            });
                            photos.forEach(photo => photo.captionLink = "/caption?id=" + photo.id);
                            const captions = await Caption.findAll({
                                attributes: ['photo_id', 'caption'],
                                where: { user_id: req.user.id },
                                raw: true
                            });
                            res.render('dashboard', { user: req.user, photos: photos, captions: captions });
                        } else {
                            response.status(400).send('Error inserting caption');
                        }
                    });
    
                } catch {
                    res.status(500).send('error create');
                }
            } 
        }
    }
);


module.exports = captionRouter;