const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const auth = require("../../utils/auth");

router.get('/', auth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User }],
            where: {
                user_id: req.session.user_id
            }
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('dashboard', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    };
});

router.get('/edit/:id', auth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);
        const post = postData.get({ plain: true });
        res.render('edit-post', {
            post,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    };
});




module.exports = router;