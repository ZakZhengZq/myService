/**
 * Created by hunter on 2017/6/5.
 */
const sequelize = require('sequelize');
const model = require('./model');
const moment = require('./moment');

let
    art = model.articles,
    lea = model.leaveMsg;
    tools = model.tools;

var operation_tools = {
    pages:function () {
        return async ()=>{
            let p;
            await tools.count().then(
                function (result) {
                    p=Math.ceil(result/8)
                }
            )
            return  p;
        }
    },
    getAllTools:function (option) {
        return async () => {
            let returnTools = {};
            await tools.findAll({
                attributes:['title','type','img','abstract','date','id','url'],
                order: [['date','DESC']],
                limit: option+8,
                offset: option
            }).then(function (result) {
                for (let res of result){
                    let month=res.dataValues.date.substr(0,7);
                    if (returnTools[month]) {
                        returnTools[month].push(res.dataValues);
                    } else {
                        returnTools[month] = [res.dataValues];
                    }
                }
            })
            return JSON.stringify(returnTools);
        }
    },
    getTools:function () {
        return async ()=>{
            let res=[];
            await tools.findAndCountAll({
                attributes:['title','type','img','abstract','date','id','url','author'],
                order: [['date','DESC']],
                limit: 100})
                .then(function(result){
                    res=result;
                })
            return JSON.stringify(res);
        }
    },
    deleteToolById: async (id) => {
        return tools.destroy({
            where: {
                id
            }
        }).catch(e => {
            console.log(e)
        });
    },
    upSertTool: async (tool) => {
        return tools.upsert(tool, {})
        .catch(e => {
            console.log(e)
        });
    }
}

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
            // let article =[];
            // let menu=[];
            let article = {};
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
                attributes:['title','type','img','abstract','date','id'],
                order: [['date','DESC']],
                limit: option+8,
                offset: option
            }).then(function (result) {
                for (let res of result.rows){
                    let month=res.dataValues.date.substr(0,7);
                    // if (!menu.contains(month)){
                    //     menu.push(month);
                    //     let dome={
                    //         date: month.substr(0,4)+'年'+month.substr(6,1)+'月',
                    //         test: []
                    //     }
                    //     let two=[];
                    //     two.push(res.dataValues);
                    //     dome.test.push(two);
                    //     article.push(dome)
                    //     continue;
                    // }

                    // let i= article.position(month.substr(0,4)+'年'+month.substr(6,1)+'月');
                    // if (article[i].test[article[i].test.length-1].length==2){
                    //     let two = [];
                    //     two.push(res.dataValues);
                    //     article[i].test.push(two);
                    // }else {
                    //     article[i].test[article[i].test.length-1].push(res.dataValues);
                    // }
                    if (article[month]) {
                        article[month].push(res.dataValues);
                    } else {
                        article[month] = [res.dataValues];
                    }
                }
            })
            return JSON.stringify(article);
        }
    },
    getArtById: async (id) => {
        return art.findAll({
            where: {
                id
            }
        }).catch(e => {
            console.log(e)
        });
    },
    upSertArt: async (article) => {
        return art.upsert(article, {})
        .catch(e => {
            console.log(e)
        });
    },
    pages:function () {
        return async ()=>{
            let p;
            await art.count().then(
                function (result) {
                    p=Math.ceil(result/8)
                }
            )
            return  p;
        }
    },
    latest:function () {
        return async ()=>{
            let latest=[];
            await art.findAndCountAll({
                attributes:['title','type','img','author','date','id'],
                order: [['date','DESC']],
                limit: 5,
                offset: 0
            }).then(function (result) {

                for (let res of result.rows) {
                    let arts = res.dataValues;
                    latest.push(arts);
                }
            })
            return JSON.stringify(latest)
        }
    },
    fenlei:function () {
        return async ()=>{
            let res=[];
           await art.findAll({
               attributes:['type', ['COUNT("type")','num']],
               group:'type',
               raw:true})
               .then(function(result){
               res=result;
           })
            return JSON.stringify(res);
        }
    },
    guidang:function () {
        return async ()=>{
            let res=[];
            await art.findAll({
                attributes:[['SUBSTRING(date, 1, 7)','mon'],['COUNT("mon")','num']],
                group:'mon',
                raw:true})
                .then(function(result){
                    res=result;
                })
            return JSON.stringify(res);
        }
    },
    getAllArts:function () {
        return async ()=>{
            let res=[];
            await art.findAndCountAll({
                attributes:['title','type','img','abstract','date','id','article','author'],
                order: [['date','DESC']],
                limit: 100})
                .then(function(result){
                    res=result;
                })
            return JSON.stringify(res);
        }
    },
    deleteArtById: async (id) => {
        return art.destroy({
            where: {
                id
            }
        }).catch(e => {
            console.log(e)
        });
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
    operation_leaveMsg:operation_leaveMsg,
    operation_tools:operation_tools,
}
