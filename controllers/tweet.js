const tweetmodel = require("../models/tweet");


module.exports = {

    //테이블의 모든 트윗 불러오기
    get: async (req,res) => {
      const result = await tweetmodel.get()
      res.status(200).json(result)
    },
    //게시글 작성
    post: async (req,res) => {
      //사용자의 아이디값: req.id
      const { id } = req
      // console.log("아이디",id)
      const { content, picture } = req.body

      if(!content ) return res.status(400).json({message: "content must exist" })
      //picture는 사용자 단에서 전달할 수도 있고 전달하지 않을 수도 있다. 

      const tweetId = await tweetmodel.post(id,content,picture)
      //tweet 테이블에 사용자id, 게시글 내용, (사진) 추가하기: model 
      return res.status(201).json({ data: tweetId, message : "ok"})
    },
    //게시글 수정
    put: async (req,res) => {
      //사용자의 아이디 값, 그리고 어떤 포스트 번호를 수정하는지, 어떤 내용으로 수정할건지
      //사용자 아이디
      const { id: userId } = req
      const { id: tweetId } = req.params
      const { content, picture } = req.body

      if(!userId || !tweetId || !content ) return res.status(400).json({ message: "userId, tweetId, content must exist" })
      
      const modifiedTweet = await tweetmodel.put(content, picture, tweetId, userId)
      console.log(modifiedTweet)
      return res.status(204).json({ data: modifiedTweet, message : "ok"})
    },
    //게시글 삭제
    delete: async (req,res) => {
      const { id: userId } = req
      const { id: tweetId } = req.params
      
      if(!userId || !tweetId) return res.status(400).json({ message: "userId, tweetId must exist"})

      const [deleteCount, deletedTweet] = await tweetmodel.delete(tweetId , userId)
      return res.status(201).json({ deletedTweet, deleteCount, message : "ok"})
    }
}

