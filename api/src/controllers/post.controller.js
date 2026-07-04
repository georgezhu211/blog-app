const postRepository = require("../repositories/post.repository");

exports.create = async (req, res) => {
  const { title, content } = req.body;
  const post = await postRepository.create({
    title,
    content,
    authorId: req.user.id,
  });
  res.status(201).json(post);
};
