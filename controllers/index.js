const router = require("express").Router();
const apiRoutes = require("./api");
const { User, Comment, Post } = require('../models');

router.use('/api', apiRoutes);

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User }]
        });
        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('all', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    };
});

router.get('/login', (req, res) => {
    res.render('login', {});
});

module.exports = router;