const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const auth = require("../../utils/auth");
const format_date = require("../../utils/helpers");

router.get("/:id", auth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{ model: User }],
        });

        const commentData = await Comment.findAll({
            where: {
                post_id: req.params.id
            },
            order: [['date_created', 'DESC']], 
            include: {
                model: User
            }});
            if (!postData) {
                res.status(404).json({ message: "No post found with this id!" });
                return;
            };
            
        const post = postData.get({ plain: true });
        post.date_created = format_date(post.date_created);
        const comments = commentData.map((comment) => comment.get({ plain: true }));
        comments.map((comment) => comment.date_created = format_date(comment.date_created));


        res.render("single-post", {
            post,
            comments,
            logged_in: req.session.logged_in 
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.put('/:id', auth, async (req, res) => {
    try {
        const post = await Post.update(req.body, {
            where: {
                id: req.params.id
            }
        });

        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    };
});

router.post('/', auth, async (req, res) => {
    try {
        const post = await Post.create({...req.body, user_id: req.session.user_id});

        res.status(200).json(post);
    } catch (err) {
        res.status(400).json(err);
    };
});

router.post('/:id/comments', auth, async (req, res) => {
    try {
        const comment = await Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.params.id,
            user_id: req.session.user_id
        });
        res.status(200).json(comment);
    } catch (err) {
        res.status(400).json(err);
    };
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id
            }
        });

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    };
});

module.exports = router;