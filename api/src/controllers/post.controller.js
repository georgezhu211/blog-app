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
  const post = await postRepository.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  res.status(200).json(post);
};

exports.update = async (req, res) => {
  const existing = await postRepository.findById(req.params.id);
  if (!existing) {
    return res.status(404).json({ message: "Post not found" });
  }

  const { title, content } = req.body;
  const post = await postRepository.update(req.params.id, {
    title,
    content,
  });
  res.status(200).json(post);
};

exports.remove = async (req, res) => {
  const existing = await postRepository.findById(req.params.id);
  if (!existing) {
    return res.status(404).json({ message: "Post not found" });
  }

  await postRepository.remove(req.params.id);
  res.status(200).json({ message: "Post deleted" });
};
