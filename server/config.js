
function ExtractJwt(req) {
    let token = null;
    if (req.cookies && req.cookies.token != void 0) {
      token = req.cookies['token'];
    }
    return token;
  }
  //.process.env.Monhodb_uri
 
  module.exports = {
    jwt: {
      jwtFromRequest: ExtractJwt,
      secretOrKey: 'TfbTq2NfLzqMcbVY9EpGQ2p'
    },
  
    expiresIn: '1 day',
}
//     mongo: {
//       url: 'mongodb+srv://Avioleta:q2LFzHOnql0hSd7M@node-chat.lmbptbi.mongodb.net/?retryWrites=true&w=majority' || "mongodb://localhost:27017/",
//       options: {
//         dbName: "chatik",
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//       }
//     }
//   };