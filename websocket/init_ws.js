/**
 * Created by dell on 2017/5/2.
 */
//导入websocket模块
const WebSocket =require('ws');
//引用server类
const WebSocketServer =WebSocket.Server;

//实例化sever类

const wss = new WebSocketServer({
    port:3000
});

wss.on('connection',function (ws) {
    console.log('[SERVER] connected...');
    ws.on('message',function (message) {
        console.log('[SERVER] received : ${message}');
        ws.send('ECHO: 你好啊，旅行者',(err)=>{
            if (err) {
                console.log('[SERVER] error: ${err}');
            }
        });
    });
});