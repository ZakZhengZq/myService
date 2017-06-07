/**
 * Created by hunter on 2017/6/5.
 */
const model = require('./model');
const moment = require('./moment');

let
    articles = model.articles,
    lea = model.leaveMsg;

var operation_articles={
    create:function(title, type, img, author, abstract, article){
        return async () => {
            var article = await articles.create({
                title: title,
                type: type,
                img: img,
                author: author,
                abstract: abstract,
                article: article
            });
            //console.log('created: ' + JSON.stringify(article));
        }
    },
    find:function (title) {
        async () => {
            var article = await articles.findAll({
                where: {
                    name: title
                }
            });
            return JSON.stringify(article);
        }
    }
};

var operation_leaveMsg={
    create:function (u_photo,u_name,leaveMsg) {
        let ms=Buffer.from(leaveMsg).toString('base64');
        return async () => {
            var leave = await lea.create({
                u_photo:u_photo,
                u_name:u_name,
                leaveMsg:ms
            });
            //console.log('created: ' + JSON.stringify(leave));
        }
    },
    find:function () {
        return async () => {
            let leave=await lea.findAll();
            let leaves=[];
            for (let le of leave){
                le.dataValues.leaveMsg=(Buffer.from(le.dataValues.leaveMsg, 'base64')).toString();
                le.dataValues.createdAt=moment(le.dataValues.createdAt).format('YYYY/MM/DD');
                leaves.push(le.dataValues);
            }
            return JSON.stringify(leaves);
        }
    }
};

module.exports={
    operation_articles:operation_articles,
    operation_leaveMsg:operation_leaveMsg
}
