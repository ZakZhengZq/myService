/**
 * Created by dell on 2017/4/28.
 */
const operation = require('../model/operation-db');
var fn_hello = async (ctx, next) => {
    //var name = ctx.params.name;
    //ctx.response.body = '<h1>Hello, ${name}!</h1>';
    ctx.render('index.html', {
        title: 'Menu | 疯狂大石头的个人网站'
    });
};

var fn_blog = async (ctx, next) => {
    ctx.render('hello.html', {
        title: 'Blog | 疯狂大石头的个人网站'
    });
};

module.exports = {
    'GET /': fn_hello,
    'GET /blog': fn_blog,
    'GET /xhr':async (ctx, next) => {
        ctx.render('xhr.html', {});
    },
    'POST /blog/arts': async (ctx,next)=> {
        let index=ctx.request.body.index;
        await operation.operation_articles.findallart(index)().then(
            (x)=>{
                ctx.response.type='json';
                ctx.response.body=x;
            }
        )
    },
    'GET /blog/index': async (ctx,next)=>{
        await operation.operation_articles.pages()().then(
            (x)=>{
                ctx.response.body=x;
            }
        )
    },
    'GET /blog/latest':async (ctx,next)=>{
        await operation.operation_articles.latest()().then(
            (x)=>{
                ctx.response.body=x;
            }
        )
    },
    'GET /blog/fenlei':async (ctx,next)=>{
        await operation.operation_articles.fenlei()().then(
            (x)=>{
                ctx.response.body=x;
            }
        )
    },
    'GET /blog/guidang':async (ctx,next)=>{
        await operation.operation_articles.guidang()().then(
            (x)=>{
                ctx.response.body=x;
            }
        )
    }
};