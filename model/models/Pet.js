/**
 * Created by dell on 2017/5/1.
 */
const db = require('../db');

module.exports=db.defineModel('pets',{
    passwd:db.STRING(100),
    name:db.STRING(100),
    gender:db.BOOLEAN,
    birth:db.STRING(10),
});