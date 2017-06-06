/**
 * Created by dell on 2017/5/1.
 */
const db = require('../db');

module.exports=db.defineModel('leaveMsgs',{
    u_photo:db.STRING(100),
    u_name:db.STRING(100),
    leaveMsg:db.TEXT
});