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

// parse user from cookie:
const parseUser = require('./cookie/parseUser');
app.use(async (ctx, next) => {
    ctx.state.user = parseUser(ctx.cookies.get('name') || '');
    await next();
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
let server = app.listen(3000);
const init_ws = require('./websocket/init_ws');

var messageIndex = 0;
function createMessage(type, user, data) {
    messageIndex ++;
    return JSON.stringify({
        id: messageIndex,
        type: type,
        user: user,
        data: data
    });
}

function onConnect() {
    let user = this.user;
    let msg = createMessage('join', user, `${user.name} joined.`);
    this.wss.broadcast(msg);
    // build user list:
    let users = this.wss.clients.map(function (client) {
        return client.user;
    });
    this.send(createMessage('list', user, users));
}

function onMessage(message) {
    console.log(message);
    if (message && message.trim()) {
        let msg = createMessage('chat', this.user, message.trim());
        this.wss.broadcast(msg);
    }
}

function onClose() {
    let user = this.user;
    let msg = createMessage('left', user, `${user.name} is left.`);
    this.wss.broadcast(msg);
}


app.wss = init_ws(server, onConnect, onMessage, onClose);


console.log('app started at port 3000...');