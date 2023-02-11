const router = require("express").Router();
const apiRoutes = require("./api");
const { User, Comment, Post } = require('../models');

router.use('/api', apiRoutes);

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User }]
        });
        console.log(postData);
        const posts = postData.map((post) => post.get({ plain: true }));
        console.log(posts);

        res.render('all', {
            posts,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

module.exports = router;