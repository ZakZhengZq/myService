/**
 * Created by hunter on 2017/6/3.
 */
function addToUserList(list, user) {
    var i;
    for (i=0; i<list.length; i++) {
        if (list[i].id === user.id) {
            return;
        }
    }
    list.push(user);
}
function removeFromUserList(list, user) {
    var i, target = -1;
    for (i=0; i<list.length; i++) {
        if (list[i].id === user.id) {
            target = i;
            break;
        }
    }
    if (target >= 0) {
        list.splice(target, 1);
    }
}
function addMessage(list, msg) {
    list.push(msg);
    $('#message-list').parent().animate({
        scrollTop: $('#message-list').height()
    }, 1000);
}
var id,img,name='';
$(function () {
    var vmMessageList = new Vue({
        el: '#message-list',
        data: {
            messages: []
        }
    });
    var vmUserList = new Vue({
        el: '#user-list',
        data: {
            users: []
        }
    });
    var ws = new WebSocket('ws://localhost:3000/ws/chat');
    ws.onmessage = function (event) {
        var data = event.data;
        console.log(data);
        var msg = JSON.parse(data);
        if (id==''||img==''|| name==''){
            id=msg["user"].id;
            img=msg["user"].image;
            name=msg["user"].name;
        }
        if (msg.type === 'list') {
            vmUserList.users = msg.data;
        } else if (msg.type === 'join') {
            addToUserList(vmUserList.users, msg.user);
            addMessage(vmMessageList.messages, msg);
        } else if (msg.type === 'left') {
            removeFromUserList(vmUserList.users, msg.user);
            addMessage(vmMessageList.messages, msg);
        } else if (msg.type === 'chat') {
            addMessage(vmMessageList.messages, msg);
        }
    };
    ws.onclose = function (evt) {
        console.log('[closed] ' + evt.code);
        var input = $('#form-chat').find('input[type=text]');
        input.attr('placeholder', 'WebSocket disconnected.');
        input.attr('disabled', 'disabled');
        $('#form-chat').find('button').attr('disabled', 'disabled');
    };
    ws.onerror = function (code, msg) {
        console.log('[ERROR] ' + code + ': ' + msg);
    };
    $('#form-chat').submit(function (e) {
        e.preventDefault();
        var input = $(this).find('input[type=text]');
        var text = input.val().trim();
        console.log('[chat] ' + text);
        if (text) {
            input.val('');
            ws.send(text);
        }
    });
    Vue.component('leave-item', {
        props: ['itemtext'],
        template: '\
                <div class="leave-body">\
                    <div class="leave-img"><img v-bind:src=itemtext.img></div>\
                    <div class="leave-inner">\
                        <div class="title">\
                            <span class="name" v-text="itemtext.name">疯狂大石头</span>\
                            <span class="time" v-text="itemtext.date">今日16:23</span>\
                        </div>\
                        <div class="inner">\
                            <p v-bind:id="itemtext.id" class="text" v-html="itemtext.text"></p>\
                        </div>\
                    </div>\
                </div>\
              '
    })
    var vmLeaveList = new Vue({
        el: '#leave',
        data: {
            leaveTexts: [
                {id:'test1',img:'/static/images/photo2.png',name:'疯狂大石头',date:'2017年5月',text:'所有的评论目前都是匿名的哦'},
                {id:'test2',img:'/static/images/photo2.png',name:'疯狂大石头',date:'2017年5月',text:'念奴娇•赤壁怀古【宋】苏轼大江东去，浪淘尽，千古风流人物。故垒西边，人道是，三国周郎赤壁。乱石穿空，惊涛拍岸，卷起千堆雪。江山如画，一时多少豪杰。遥想公瑾当年，小乔初嫁了，雄姿英发。羽扇纶巾，谈笑间，樯橹灰飞烟灭。故国神游，多情应笑我，早生华发。人生如梦，一樽还酹江月。'},
                {id:'test3',img:'/static/images/photo2.png',name:'疯狂大石头',date:'2017年5月',text:'江城子•密州出猎【宋】苏轼老夫聊发少年狂，左牵黄，右擎苍，锦帽貂裘，千骑卷平冈。为报倾城随太守，亲射虎，看孙郎。酒酣胸胆尚开张，鬓微霜，又何妨？持节云中，何日遣冯唐？会挽雕弓如满月，西北望，射天狼。'},
                {id:'test4',img:'/static/images/photo2.png',name:'疯狂大石头',date:'2017年5月',text:'永遇乐•京口北固亭怀古【宋】辛弃疾千古江山，英雄无觅，孙仲谋处。舞榭歌台，风流总被，雨打风吹去。斜阳草树，寻常巷陌，人道寄奴曾住。想当年，金戈铁马，气吞万里如虎。元嘉草草，封狼居胥，赢得仓皇北顾。四十三年，望中犹记，烽火扬州路。可堪回首，佛狸祠下，一片神鸦社鼓。凭谁问，廉颇老矣，尚能饭否？'},
            ]
        },
        methods: {
            addNewText: function () {
                var newText={};
                newText.img='/static/images/'+img+'.png';
                newText.name=name;
                newText.date=this.getDate();
                newText.text=document.getElementById('editor').innerHTML;
                this.leaveTexts.push(newText);
                document.getElementById('editor').innerHTML='';
            },
            getDate:function getNowFormatDate() {
                var date = new Date();
                var seperator1 = "-";
                var seperator2 = ":";
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                    + " " + date.getHours() + seperator2 + date.getMinutes()
                    + seperator2 + date.getSeconds();
                return currentdate;
            }
        },
    });


    $('#editControls a').click(function(e) {
        switch($(this).data('role')) {
            case 'h1':
            case 'h2':
            case 'p':
                document.execCommand('formatBlock', false, '<' + $(this).data('role') + '>');
                break;
            default:
                document.execCommand($(this).data('role'), false, null);
                break;
        }

    })
})