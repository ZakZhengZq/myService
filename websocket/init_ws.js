/**
 * Created by dell on 2017/5/2.
 */
//导入websocket模块
const WebSocket =require('ws');
//引用server类
const WebSocketServer =WebSocket.Server;

const url = require('url');

function init_ws(server, onConnection, onMessage, onClose, onError) {
    //实例化sever类
    const wss = new WebSocketServer({
        server: server
    });

    wss.broadcast = function broadcast(data) {
        wss.clients.forEach(function each(client) {
            client.send(data);
        });
    };

    //引入parseUser
    const parseUser = require('../cookie/parseUser');

    wss.on('connection', function (ws) {
        console.log('[SERVER] connected...');
        let location = url.parse(ws.upgradeReq.url, true);
        console.log('[WebSocketServer] connection: ' + location.href);
        if (location.pathname !== '/ws/chat') {
            // close ws:
            ws.close(4000, 'Invalid URL');
        }

        onConnection = onConnection || function () {
                console.log('[WebSocket] connected.');
            };
        onMessage = onMessage || function (msg) {
                console.log('[WebSocket] message received: ' + msg);
            };
        onClose = onClose || function (code, message) {
                console.log(`[WebSocket] closed: ${code} - ${message}`);
            };
        onError = onError || function (err) {
                console.log('[WebSocket] error: ' + err);
            };

        ws.on('message', onMessage);
        ws.on('close', onClose);
        ws.on('error', onError);
        // ws.upgradeReq是一个request对象:
        let user = parseUser(ws.upgradeReq);
        if (!user) {
            // Cookie不存在或无效，直接关闭WebSocket:
            ws.close(4001, 'Invalid user');
        }
        // 识别成功，把user绑定到该WebSocket对象:
        ws.user = user;
        // 绑定WebSocketServer对象:
        ws.wss = wss;
        onConnection.apply(ws);
        console.log('cookie--->' + user);
    });
    console.log('WebSocketServer was attached.');
    return wss;
}

module.exports=init_ws;