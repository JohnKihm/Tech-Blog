const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name']
                }
            ]
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('homepage', {
            layout: 'main',
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name']
                }
            ]
        });

        const post = postData.get({ plain: true });

        const commentData = await Comment.findAll({
            where: {
                post_id: post.id
            },
            include: [
                {
                    model: User,
                    attributes: ['name']
                }
            ]
        });

        const comments = commentData.map((comment) => comment.get({ plain: true }));

        res.render('post', {
            layout: 'main',
            post,
            comments,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/signup', async (req, res) => {
    try {
        if (req.session.logged_in) {
            res.redirect('/dashboard');
            return;
        }

        res.render('signup', {
            layout: 'main'
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', async (req, res) => {
    try {
        if (req.session.logged_in) {
            res.redirect('/dashboard');
            return;
        }

        res.render('login', {
            layout: 'main'
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
