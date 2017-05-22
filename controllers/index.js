/**
 * Created by dell on 2017/4/28.
 */
var fn_hello = async (ctx, next) => {
    //var name = ctx.params.name;
    //ctx.response.body = '<h1>Hello, ${name}!</h1>';
    ctx.render('index.html', {
        title: 'Personal Blog'
    });
};

var fn_blog = async (ctx, next) => {
    ctx.render('hello.html', {
        title: 'blog'
    });
};

module.exports = {
    'GET /': fn_hello,
    'GET /blog': fn_blog
};