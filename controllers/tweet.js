const models = require('../models/tweet');
const userModels = require('../models/user');

module.exports = {
  // 모든 트윗 글
  get: async (req, res) => {
    const tweets = await models.getAll();

    if (!tweets) {
      return res.status(404).json({ message: 'no tweet' });
    }
    // tweets map 돌려서 필요 값만
    return res.status(200).json({ data: tweets });
  },

  post: async (req, res) => {
    const { content, picture } = req.body;
    const userId = req.id;
    const user = await userModels.findId(userId);

    if (!user) {
      return res.status(401).json({ message: 'user is not found' });
    }

    const tweet = await models.post(content, userId, picture);

    return res.status(201).json({ data: tweet, message: 'tweet ok' });
  },

  put: async (req, res) => {
    const tweetId = req.params.id;
    const user = await userModels.findId(req.id);
    const tweet = await models.get(tweetId);

    // 트윗 아이디 없으면 예외처리
    if (!tweetId) {
      return res.status(401).json({ message: 'tweet params not found' });
    }

    if (!user) {
      return res.status(401).json({ message: 'user is not found' });
    }

    // 트윗 없으면 예외 처리
    if (!tweet) {
      return res.status(401).json({ message: 'tweet is not found' });
    }

    if (user.id !== tweet.user_id) {
      return res.status(401).json({ message: '유저가 일치 하지 않습니다.' });
    }

    const { content, picture } = req.body;
    const updateTweetId = await models.update(tweetId, content, picture);
    const updatedTweet = await models.get(updateTweetId);

    res.status(201).json({ updatedTweet });
  },

  // delete를 통해 삭제
  // isdeleted 컬럼을 생성을 하여 true를 하면 안가져 오도록
  delete: async (req, res) => {
    const tweetId = req.params.id;

    // id 예외처리
    if (!tweetId) {
      return res.status(401).json({ message: 'tweet params not found' });
    }

    const tweet = await models.get(tweetId);

    if (!tweet) {
      return res.status(404).json({ message: 'tweet is not found' });
    }

    if (tweet.user_id !== req.id) {
      return res.status(401).json({ message: '유저가 일치 하지 않습니다.' });
    }

    await models.delete(tweetId);

    res.status(201).json({ message: 'tweet is deleted' });
  },
};
