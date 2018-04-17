const db = require('../db');

module.exports=db.defineModel('tools',{
    title:{
        type:db.STRING(100),
        unique:true
    },
    type:db.STRING(100),
    img:db.STRING(100),
    author:db.STRING(100),
    abstract:db.STRING(200),
    url:db.STRING(100),
    date:db.STRING(100)
});
