const commentModel = require("../models/reply");


module.exports = {

    //현재 게시글의 모든 댓글 불러오기
    get: async (req,res) => {
      const { id: tweetId } = req.params //현재 게시글아이디
      try{
        const result = await commentModel.get(tweetId)
        res.status(200).json(result)
      }catch(err){
        res.sendStatus(500)
      }
    },

    //댓글 작성
    post: async (req,res) => {
      const { id: userId } = req // 사용자 아이디(번호)
      const { id: tweetId } = req.params //현재 게시글아이디
      const { content } = req.body
      //인자 하나라도 없으면 에러 처리
      console.log(userId,tweetId,content)
      if(!userId || !tweetId || !content) return res.status(404).json({ message : "userId, tweetId, content must exist" })
      try{
        const result = await commentModel.post(userId, tweetId, content)
        return res.status(201).json({ data: result[0], message: "ok" })
      }catch(err){
        //서버 자체 에러 
        res.sendStatus(500)
      }
    },

}

