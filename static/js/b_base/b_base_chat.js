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
        template: '\
                <li v-text="itemText">\
                </li>\
              ',
        props: ['itemText']
    })
    var vmLeaveList = new Vue({
        el: '#leave',
        data: {
            leaveText: '',
            leaveTexts: [
                'Do the dishes',
                'Take out the trash',
                'Mow the lawn'
            ]
        },
        methods: {
            addNewText: function () {
                this.leaveTexts.push(this.leaveText)
                this.leaveText = ''
            }
        }
    });
})