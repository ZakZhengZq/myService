/**
 * Created by hunter on 2017/6/6.
 */
const model = require('./model');

let
    articles = model.articles,
    lea = model.leaveMsg;

(async () => {
    var user = await lea.create({
        u_photo:'../static/images/0.png',
        u_name:'rap',
        leaveMsg:'<p align="center"><b>永遇乐•京口北固亭怀古</b></p><p align="center"><b>【宋】辛弃疾</b></p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 千古江山，英雄无觅，孙仲谋处。舞榭歌台，风流总被，雨打风吹去。斜阳草树，寻常巷陌，人道寄奴曾住。想当年，金戈铁马，气吞万里如虎。</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 元嘉草草，封狼居胥，赢得仓皇北顾。四十三年，望中犹记，烽火扬州路。可堪回首，佛狸祠下，一片神鸦社鼓。凭谁问，廉颇老矣，尚能饭否？</p>'
    });
    console.log('created: ' + JSON.stringify(user));
})();