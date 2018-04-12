/**
 * Created by hunter on 2017/9/16.
 */
//事件对象
var EventUtil = {
    addHandle: function (element, type, handler) {
        if (element.addEventListener)
            element.addEventListener(type, handler);
        else if (element.attachEvent)
            element.attachEvent('on' + type, handler);
        else
            element['on' + type] = handler;
    },
    removeHandler: function (element, type, handler) {
        if (element.removeEventListener)
            element.removeEventListener(type, handler);
        else if (element.detach)
            element.detach('on' + type, handler);
        else
            element['on' + type] = null;
    }
}
function onInput(e) {
    var v = e.target.value.trim()
    if (v !== '') {
        var a = document.createElement('script');
        a.src = 'http://www.baidu.com/su?&wd=' + encodeURI(v) + '&p=3&cb=fcb';
        document.body.appendChild(a);
    }
}
function fcb(data) {
    var newUl = document.createElement("ul");
    var oddUl = document.getElementsByTagName("ul")[0];
    if (data) {
        data.s.forEach(function (val) {
            var li = document.createElement("li");
            li.textContent = val;
            newUl.appendChild(li);
        })
        newUl.className = 'ul';
        newUl.style.display = 'block';
        EventUtil.addHandle(newUl, 'click', function (event) {
            var e = event || window.event;
            var target = e.target || e.srcElement;
            if (target.tagName.toLowerCase() == 'li') {
                var text = target.innerHTML || target.innerText;
                window.open('https://www.baidu.com/s?word=' + text);
                document.getElementsByClassName('text')[0].value = '';
                newUl.style.display = 'none';
            }
        })
        document.getElementsByClassName("form")[0].replaceChild(newUl, oddUl);
        oddUl = null;//gc垃圾回收
    }
    //删除script标签
    var s = document.body.querySelectorAll('script');
    for (var i = 1, len = s.length; i < len; i++) {
        document.body.removeChild(s[i]);
    }
}
function sub(obj) {
    var t = obj.t.value;
    if (t.trim() != '') {
        window.open('https://www.baidu.com/s?word=' + t.trim());
        obj.t.value = '';
        return false;
    }
}
function onKeydown(e) {
    if (e.keyCode != '38' && e.keyCode != '40') {
        return;
    }
    var ulList = document.getElementsByTagName('ul')[0];
    var txtInput = document.getElementsByClassName('text')[0];

    if (!ulList.dataset.listIndex)
        ulList.dataset.listIndex = -1;

    if (ulList.dataset.listIndex == -1)
        ulList.dataset.query = txtInput.value;
    switch (e.keyCode) {
        case 38:
            if (ulList.dataset.listIndex == -1) {
                ulList.dataset.listIndex = parseInt(ulList.childNodes.length - 1);
            }
            else {
                ulList.dataset.listIndex = parseInt(ulList.dataset.listIndex) - 1;
            }
            break;
        case 40:
            if (ulList.dataset.listIndex == parseInt(ulList.childNodes.length) - 1) {
                ulList.dataset.listIndex = parseInt(-1);
            }
            else {
                ulList.dataset.listIndex = parseInt(ulList.dataset.listIndex) + 1;
            }
            break;
    }
    txtInput.value = (ulList.dataset.listIndex == -1) ? ulList.dataset.query : ulList.childNodes[ulList.dataset.listIndex].innerHTML;
    [].forEach.call(ulList.childNodes,function (val) {
        val.className='';
    })
    if(ulList.dataset.listIndex!=-1)
    ulList.childNodes[ulList.dataset.listIndex].className+=' select';
}
function hideList(e) {
    var target = e.target || e.srcElement;
    var tagname = target.tagName.toLowerCase();
    var ulList = document.getElementsByTagName('ul')[0];
    if (tagname !== 'li' && tagname !== 'input') {
        ulList.style.display='none';
    }

}
EventUtil.addHandle(document.getElementsByClassName("text")[0], 'input', onInput);
EventUtil.addHandle(window, 'keydown', onKeydown);
EventUtil.addHandle(window, 'click', hideList);