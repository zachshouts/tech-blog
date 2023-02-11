const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

router.get("/:id", (req, res) => {
    try {
        const postData = Post.findByPk(req.params.id, {
            include: [ {model: User, model: Comment} ]
        });

        if (!postData) {
            res.status(404).json({ message: "No post found with this id!" });
            return;
        };

        const post = postData.get({ plain: true });
        res.render("single-post", { post, loggedIn: req.session.loggedIn });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;