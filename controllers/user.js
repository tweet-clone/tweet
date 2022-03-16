// const models = require('../models/user');

// module.exports = {
//   auth: {
//     signup: (req, res) => {
//       //
//       const {email, password, nickname} = req.body
//       if(!email || !password || !nickname){
//         return res.status(400).send('모든 항목 필수입니다')
//       }
//       //주어진 이메일이 중복인지를 확인
//       models.signup.hasId(email,(error,result) => {
//         if(error){
//           return res.status(400).send('이미 사용중인 이메일입니다')
//         }else{
//           return res.status(200).send('사용가능한 이메일입니다')
//         }
//       })
//     },
//   }
// }
