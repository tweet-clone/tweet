const models = require("../models/tweet");

module.exports = {
  // 모든 트윗 글
  get: async (req, res) => {
    const tweets = await models.get();

    if (!tweets) {
      return res.status(404).json({ message: "no tweet" });
    }

    return res.status(200).json({ data: tweets });
  },
  post: async (req, res) => {
    const { content, picture } = req.body;
    const userId = req.id;
    const user = await models.findId(userId);

    if (!user) {
      return res.status(401).json({ message: "user is not found" });
    }

    const tweet = await models.post(content, userId, picture);

    return res.status(201).json({ data: tweet, message: "tweet ok" });
  },
  put: (req, res) => {
    const tweetId = req.params.id;
    console.log(tweetId);
  },
  delete: (req, res) => {},
};
