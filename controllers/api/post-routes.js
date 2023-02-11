const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

router.get("/:id", async (req, res) => {
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
        const comments = commentData.map((comment) => comment.get({ plain: true }));

        res.render("single-post", {
            post,
            comments,
            loggedIn: req.session.loggedIn 
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/:id/comments', async (req, res) => {
    console.log(req.body);
    console.log(obj);
});

module.exports = router;