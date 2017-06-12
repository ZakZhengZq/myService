/**
 * Created by hunter on 2017/6/6.
 */
const model = require('./operation-db');

let
    art = model.operation_articles;
    //lea = model.leaveMsg;
//let string='<p align="center"><b>永遇乐•京口北固亭怀古</b></p><p align="center"><b>【宋】辛弃疾</b></p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 千古江山，英雄无觅，孙仲谋处。舞榭歌台，风流总被，雨打风吹去。斜阳草树，寻常巷陌，人道寄奴曾住。想当年，金戈铁马，气吞万里如虎。</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 元嘉草草，封狼居胥，赢得仓皇北顾。四十三年，望中犹记，烽火扬州路。可堪回首，佛狸祠下，一片神鸦社鼓。凭谁问，廉颇老矣，尚能饭否？</p>';
//let ms=Buffer.from(string).toString('base64');
// (async () => {
//     var user = await lea.create({
//         u_photo:'../static/images/0.png',
//         u_name:'rap',
//         leaveMsg:ms
//     });
//     console.log('created: ' + JSON.stringify(user));
//})();

//(
    //查找留言
    // async () => {
    //     var article = await lea.findAll({});
        //console.log(`find ${pets.length} pets:`);
        // for (let p of article) {
        //     let val=JSON.stringify(p)
        // console.log((Buffer.from(JSON.parse(val).leaveMsg, 'base64')).toString());
        // }
    //     console.log(article);
    // }

    //存入文章
//)();

// art.create('用github来展示你的前端页面','工具','/static/images/03.jpg','劳卜','经常会有人问我如何才能将自己做的静态页面放到网上供他人欣赏，是不是需要自己有一个服务器，是不是还要搞个域名才能访问？对于以上问题我都会回答：用github来展示你的前端页面吧','','2017-04-18')();
// art.create('6周学习计划，攻克JavaScript难关(React/Redux/ES6 etc.)','JavaScript','/static/images/09.jpg','余博伦','和大家一样，最近我也看了Jose Aguinaga写的How it feels to learn JavaScript in 2016.显然这篇文章击中了人们的痛处','有帮助的','2017-06-02')();
// art.create('如何面试前端工程师：Github很重要','前段杂谈','/static/images/10.jpg','GD_SeHun','之前我们介绍过：一名靠谱的JavaScript程序员应备的素质，从程序员的角度提出要去学习哪些知识，下面这篇文章从面试官的角度介绍到面试时可能会问到的一些问题。','有帮助的','2017-06-05')();
// art.create('从一个组件的实现来深刻理解 JS 中的继承','JavaScript','/static/images/11.jpg','songjz','其实，无论是写什么语言的程序员，最终的目的，都是把产品或代码封装到一起，提供接口，让使用者很舒适的实现功能。所以对于我来说，往往头疼的不是写代码，而是写注释和文档！','有帮助的','2017-02-08')();
// art.create('一个轻量的 Vue 拖动排序插件','Vue','/static/images/12.jpg','Awe','一个轻量的 Vue 拖动排序插件，兼容桌面和移动端。','有帮助的','2017-02-21')();
// art.create('target=’_blank’ 安全漏洞示例','HTML','/static/images/13.jpg','网友','Instagram已经解决了这个问题， 很可能是因为这篇文章。Facebook和Twitter仍未解决。我用Instagram作为基本的例子，但主要结论是target="_blank"安全漏洞极为普遍','有帮助的','2017-03-11')();
// art.create('你未必知道的12个JavaScript技巧 ','JavaScript','/static/images/14.jpg','Hyukoh','有时候我们需要对一个变量查检其是否存在或者检查值是否有一个有效值，如果存在就返回true值。为了做这样的验证，我们可以使用!!操作符来实现是非常的方便与简单','有帮助的','2017-03-28')();

(
    async()=>{
       await art.pages()().then(
           (x)=>{
               console.log(x)
           }
       )
    }

)();
