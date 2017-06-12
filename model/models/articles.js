/**
 * Created by dell on 2017/5/1.
 */
const db = require('../db');

module.exports=db.defineModel('articles',{
    title:{
        type:db.STRING(100),
        unique:true
    },
    type:db.STRING(100),
    img:db.STRING(100),
    author:db.STRING(100),
    abstract:db.STRING(200),
    article:db.TEXT,
    date:db.STRING(100)
});