const models = require("../models/tweet");
const userModels = require("../models/user");

module.exports = {
  // 모든 트윗 글
  get: async (req, res) => {
    const tweets = await models.getAll();

    if (!tweets) {
      return res.status(404).json({ message: "no tweet" });
    }

    return res.status(200).json({ data: tweets });
  },
  post: async (req, res) => {
    const { content, picture } = req.body;
    const userId = req.id;
    const user = await userModels.findId(userId);

    if (!user) {
      return res.status(401).json({ message: "user is not found" });
    }

    const tweet = await models.post(content, userId, picture);

    return res.status(201).json({ message: "tweet ok" });
  },
  put: async (req, res) => {
    const tweetId = req.params.id;
    const user = await userModels.findId(req.id);
    const tweet = await models.get(tweetId);

    if (!user) {
      return res.status(401).json({ message: "user is not found" });
    }

    if (user.id !== tweet.user_id) {
      return res.status(401).json({ message: "유저가 일치 하지 않습니다." });
    }

    const { content, picture } = req.body;
    const updateTweetId = await models.update(tweetId, content, picture);
    const updatedTweet = await models.get(updateTweetId);

    res.status(200).json({ updatedTweet });
  },
  delete: async (req, res) => {
    const tweetId = req.params.id;
    const tweet = await models.get(tweetId);

    if (!tweet) {
      return res.status(404).json({ message: "tweet is not found" });
    }

    if (tweet.user_id !== req.id) {
      return res.status(401).json({ message: "유저가 일치 하지 않습니다." });
    }

    await models.delete(tweetId);

    res.status(204).json({ message: "tweet is deleted" });
  },
};
