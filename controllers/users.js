/**
 * Created by dell on 2017/4/28.
 */
var fn_index = async (ctx, next) => {
    ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="admin@example.com"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
    //console.log('首页的ctx.state:'+ ctx.state );
};

var fn_signin = async (ctx, next) => {
    var
        email = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log('login on email:'+email+'  password:'+password);
    if (email === 'admin@example.com' && password === '123456') {
        // 登录成功:
        ctx.render('signin-ok.html', {
            title: 'Sign In OK',
            name: '你好啊，旅行者'
        });
    } else {
        // 登录失败:
        ctx.render('signin-failed.html', {
            title: 'Sign In Failed'
        });
    }
};

module.exports = {
    'GET /': fn_index,
    'POST /signin': fn_signin
};