/**
 * Created by hunter on 2017/6/5.
 */
const model = require('./model');
const moment = require('./moment');

let
    art = model.articles,
    lea = model.leaveMsg;

var operation_articles={
    create:function(title, type, img, author, abstract, article,date){
        return async () => {
            await art.create({
                title: title,
                type: type,
                img: img,
                author: author,
                abstract: abstract,
                article: article,
                date:date
            });
            //console.log('created: ' + JSON.stringify(article));
        }
    },
    findallart:function (option) {
        return async () => {
            let article =[];
            let menu=[];
            Array.prototype.position=function (needle) {
                for (i in this) {
                    if (this[i].date == needle) return i;
                }
                return false;
            }
            Array.prototype.contains=function ( needle ) {
                for (i in this) {
                    if (this[i] == needle) return true;
                }
                return false;
            }
             await art.findAndCountAll({
                order: [['date','DESC']],
                limit: option+8,
                offset: option
            }).then(function (result) {
                for (let res of result.rows){
                    let month=res.dataValues.date.substr(0,7);
                    if (!menu.contains(month)){
                        menu.push(month);
                        let dome={date:month.substr(0,4)+'年'+month.substr(6,1)+'月', test:[]}
                        let two=[];
                        two.push(res.dataValues);
                        dome.test.push(two);
                        article.push(dome)
                        continue;
                    }

                    let i=article.position(month.substr(0,4)+'年'+month.substr(6,1)+'月');
                    if (article[i].test[article[i].test.length-1].length==2){
                        let two = [];
                        two.push(res.dataValues);
                        article[i].test.push(two);
                    }else {
                        article[i].test[article[i].test.length-1].push(res.dataValues);
                    }
                }
            })
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
            let leave=await lea.findAll({
                order: [['createdAt','ASC']]
            });
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
