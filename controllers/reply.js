const tweetmodels = require('../models/tweet');
const userModels = require('../models/user');
const replyModels = require('../models/reply');

module.exports = {
  get: async (req, res) => {
    const tweetId = req.params.id;

    if (!tweetId) {
      return res.status(400).json({ message: 'no params' });
    }

    const tweet = await tweetmodels.get(tweetId);

    if (!tweet) {
      return res.status(400).json({ message: 'tweet is not found' });
    }

    const replys = await replyModels.getAll(tweet.id);

    if (!replys) {
      return res.status(400).json({ message: 'reply is not found' });
    }

    res.status(200).json({ replys });
  },
  post: async (req, res) => {
    const tweetId = req.params.id;

    if (!tweetId) {
      return res.status(400).json({ message: 'no params' });
    }

    const tweet = await tweetmodels.get(tweetId);

    if (!tweet) {
      return res.status(400).json({ message: 'tweet is not found' });
    }

    const { content } = req.body;

    const reply = await replyModels.post(content, req.id, tweet.id);

    return res.status(201).json({ data: reply, message: 'ok' });
  },
  update: async (req, res, next) => {
    const tweetId = req.params.id;
    const replyId = req.params.comid;
    // console.log(tweetId);
    // console.log(replyId);

    if (!tweetId) {
      return res.status(400).json({ message: 'no params' });
    }

    const tweet = await tweetmodels.get(tweetId);

    if (!tweet) {
      return res.status(400).json({ message: 'tweet is not found' });
    }

    const reply = await replyModels.get(tweetId, replyId);

    if (!reply) {
      return res.status(400).json({ message: 'reply is not found' });
    }

    const userId = req.id;

    const user = await userModels.findId(userId);

    if (!user) {
      return res.status(400).json({ message: 'user is not found' });
    }

    if (user.id !== reply.user_id) {
      return res.status(400).json({ message: '유저와 일치하지 않습니다.' });
    }

    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: '글을 입력해주세요' });
    }

    const replyUpdateId = await replyModels.update(content, tweetId, replyId);

    const updatedReply = await replyModels.get(tweetId, replyUpdateId);

    res.status(200).json({ updatedReply });
  },
  delete: async (req, res, next) => {
    const tweetId = req.params.id;
    const replyId = req.params.comid;

    if (!tweetId) {
      return res.status(400).json({ message: 'no params' });
    }

    // reply 파람 예외 처리

    const tweet = await tweetmodels.get(tweetId);

    if (!tweet) {
      return res.status(400).json({ message: 'tweet is not found' });
    }

    const reply = await replyModels.get(tweetId, replyId);

    if (!reply) {
      return res.status(400).json({ message: 'reply is not found' });
    }

    const userId = req.id;

    const user = await userModels.findId(userId);

    if (!user) {
      return res.status(400).json({ message: 'user is not found' });
    }

    if (user.id !== reply.user_id) {
      return res.status(400).json({ message: '유저와 일치하지 않습니다.' });
    }

    await replyModels.delete(tweetId, replyId);

    res.status(204).json({ message: 'reply is deleted' });
  },
};
