/**
 * Created by dell on 2017/4/28.
 */

// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
// 创建一个Koa对象表示web app本身:
const app = new Koa();


//1. log request URL:
app.use(async (ctx, next) => {
    console.log(`Here Process ${ctx.request.method} --> ${ctx.request.url}`);
    var
        start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});

//2. 集中处理静态文件
let staticFile= require('./static/static-files');
app.use(staticFile('/static/', __dirname + '/static'));

//3. koa的解析Post请求部分
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

//4. 集成Nunjucks,给ctx提供render函数
const isProduction = process.env.NODE_ENV === 'production';
const templating=require('./templating');
app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));

//5. 导入controller middleware:
const controller = require('./controller');
// 使用middleware:
app.use(controller());


// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');