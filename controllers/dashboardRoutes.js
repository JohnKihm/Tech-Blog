const router = require('express').Router();
const { Post } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            }
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('dashboard', {
            layout: 'dashboard',
            data: { posts }
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/create-post', withAuth, async (req, res) => {
    try {
        res.render('create-post', {
            layout: 'dashboard',
            data: { user_id: req.session.user_id }
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/edit-post/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);

        const post = postData.get({ plain: true });
        
        res.render('edit-post', {
            layout: 'dashboard',
            data: { post }
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
