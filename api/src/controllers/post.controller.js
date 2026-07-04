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

exports.list = async (req, res) => {
  const posts = await postRepository.findByAuthor(req.user.id);
  res.status(200).json(posts);
};

exports.get = async (req, res) => {
  const post = await postRepository.findById(Number(req.params.id));
  res.status(200).json(post);
};
