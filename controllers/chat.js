/**
 * Created by dell on 2017/5/9.
 */
const operation = require('../model/operation-db');

var fn_chat = async (ctx, next) => {
    let a = {name: "haha", age: 15, add: "gg"}
    console.log('test    ', Buffer.from(JSON.stringify(a)).toString('base64'));
    let user = ctx.state.user;
    //console.log('==================>'+user.name);
    if (user) {
        ctx.render('room.html', {
            user: user,
            title: 'Chat | 疯狂大石头的个人网站'
        });
    } else {
        ctx.response.redirect('/signin');
    }
};

var index = 0;

module.exports = {
    'GET /ws/chat': fn_chat,

    'GET /signin': async (ctx, next) => {
        let names = ['高富帅','白富美','女汉子','单身狗','斯巴达','王的女人','地表最强','学霸','渣渣','屌丝'];
        let name = names[index % 10];
        ctx.render('signin.html', {
            name: `${name}`
        });
    },

    'POST /signin': async (ctx, next) => {
        index ++;
        let name = ctx.request.body.name || '路人甲';
        let user = {
            id: index,
            name: name,
            image: index % 10
        };
        let value = Buffer.from(JSON.stringify(user)).toString('base64');
        //console.log(`Set cookie value: ${value}`);
        ctx.cookies.set('name', value);
        ctx.response.redirect('/ws/chat');
    },

    'GET /signout': async (ctx, next) => {
        ctx.cookies.set('name', '');
        ctx.response.redirect('/signin');
    },

    'POST /ws/chat': async (ctx, next)=>{
        let
            photo=ctx.request.body.u_photo,
            name=ctx.request.body.u_name,
            text=ctx.request.body.leaveMsg;
        //console.log('ph----->'+photo+'    name---->'+name+'    text----->'+text);
        operation.operation_leaveMsg.create(photo,name,text)();
    },

    'GET /ws/leaTexts':async (ctx,next)=>{
       await operation.operation_leaveMsg.find()().then(
            (leaTexts)=>{
                ctx.response.type='json';
                ctx.response.body=leaTexts;
            }
        )
    }
}

