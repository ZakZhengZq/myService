/**
 * Created by dell on 2017/4/28.
 */
var fn_hello = async (ctx, next) => {
    var name = ctx.params.name;
    //ctx.response.body = '<h1>Hello, ${name}!</h1>';
    ctx.render('index.html', {
        title: 'Welcome'+name
    });
};

module.exports = {
    'GET /hello/:name': fn_hello
};