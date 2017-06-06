/**
 * Created by hunter on 2017/6/5.
 */
const model = require('./model');

let
    articles = model.articles,
    lea = model.leaveMsg;

var operation_articles={
    create:async function(title, type, img, author, abstract, article){
            var article = await articles.create({
                title: title,
                type: type,
                img: img,
                author: author,
                abstract: abstract,
                article: article
            });
            console.log('created: ' + JSON.stringify(article));
    },
    find:async (title) => {
        var article = await articles.findAll({
            where: {
                name: title
            }
        });
        //console.log(`find ${pets.length} pets:`);
        //for (let p of pets) {
            console.log(JSON.stringify(article));
        //}
    }
};

var operation_leaveMsg={
    create:function (u_photo,u_name,leaveMsg) {
        return async () => {
            var leave = await lea.create({
                u_photo:u_photo,
                u_name:u_name,
                leaveMsg:leaveMsg
            });
            console.log('created: ' + JSON.stringify(leave));
        }
    },
    find:async (id) => {
        var leave = await leaveMsg.findAll({
            where: {
                name: id
            }
        });
        //console.log(`find ${pets.length} pets:`);
        //for (let p of pets) {
        console.log(JSON.stringify(leave));
        //}
    }
};


module.exports={
    operation_articles:operation_articles,
    operation_leaveMsg:operation_leaveMsg
}
