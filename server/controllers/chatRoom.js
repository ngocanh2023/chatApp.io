const ChatRoom = require("../models/chatRoom")

exports.postChatRoom = (req, res, next) => {
    const username = req.body.username;
    const room = req.body.room;
    console.log('req.body', req.body)

    const chatRoom = new ChatRoom({
        username: username,
        room: room
    })
    chatRoom.save()
    .then(result => {
        res.json(result);
        console.log('result', result, result._id)
    })
    .catch(e => {console.log(e)})

}
exports.getChatRoom = (req, res, next)=> {
    ChatRoom.find()
    .then(result => {console.log(result); res.json(result)})
    .catch(e => {console.log(e)})
}