/**
 * Created by hunter on 2017/9/20.
 */
//封装好的dialog组件类
function dialogCreator(components) {
    var dialog = {};
    dialog.render = function () {
        var dialogWrapper = document.createElement("dialog");
        dialogWrapper.className = "dialogWrapper";
        dialogWrapper.id = "dialogWrapper";
        //右上角关闭
        var dialogCloser = document.createElement("div");
        dialogCloser.className = "dialogCloser";
        var closerA = document.createElement("a");
        closerA.addEventListener('click', function () {
            dialogWrapper.close();
        })
        var X = document.createTextNode("X");
        closerA.appendChild(X);
        dialogCloser.appendChild(closerA);
        //插入dialog
        dialogWrapper.appendChild(dialogCloser);
        //插入传入的组件
        if (components) {
            components.forEach(function (val) {
                dialogWrapper.appendChild(val);
            })
        }
        return dialogWrapper;
    }
    dialog.appendTo = function (container) {
        container.appendChild(this.render());
    }
    return dialog;
}
function componentCreator(className, myRender) {
    var component = {};
    className = className || '';
    myRender = myRender || {};
    myRender.renderContent = function () {
        throw "You haven't implemented!"
    }
    component.render = function () {
        var div = document.createElement("div");
        div.className = className;
        div.appendChild(myRender.renderContent());
        return div;
    }
    return component;
}
function titleCreator(titobj) {
    titobj = titobj || {};
    var myRender = {},
        className = titobj.className,
        component = componentCreator(className, myRender);
    myRender.renderContent = function () {
        var p = document.createElement("p");
        p.className = "p";
        p.innerHTML=titobj.text;
        return p;
    }
    return component;
}
function contentCreator(conobj) {
    conobj = conobj || {};
    var myRender = {},
        className = conobj.className,
        component = componentCreator(className, myRender);
    myRender.renderContent = function () {
        var div=document.createElement("div");
        conobj.text.forEach(function (val){
            var p = document.createElement("p");
            p.className = "p";
            p.innerHTML=val;
            div.appendChild(p);
        })
        return div;
    }
    return component;
}
function bottomCreator(botobj) {
    botobj = botobj || {};
    var myRender = {},
        className = botobj.className,
        component = componentCreator(className, myRender);
    myRender.renderContent = function () {
        var button = document.createElement("button");
        button.className = "button";
        button.innerHTML=botobj.text;
        button.addEventListener('click',function () {
            document.getElementsByClassName("dialogWrapper")[0].close();
        })
        return button;
    }
    return component;
}
var dialog = dialogCreator([
    titleCreator({className:"title",text:"我是title"}).render(),
    contentCreator({className:"content",text:["我是内容","我是内容","我是内容"]}).render(),
    bottomCreator({className:"bottom",text:"确定"}).render()
]);
dialog.appendTo(document.getElementById("container"));

var button = document.getElementById("button");
button.addEventListener('click', function () {
    document.getElementsByClassName("dialogWrapper")[0].showModal();
})