/**
 * Created by dell on 2017/5/1.
 */
const model = require('./model');
const fs = require('fs');

console.log('model是---->'+model);
let files = fs.readdirSync(__dirname+'/models');
let js_files = files.filter((f)=>{
    return f.endsWith('.js');
},files);

for (let f of js_files){
    let name=f.substring(0,f.length-3);
    console.log(model[name]);
    model[name].sync().then(()=>{
        console.log('模板'+f+'初始化完毕！');
    }).catch((e)=>{
        console.log('failed with: '+e);
    });
}

// model.sync().then(()=>{
//     console.log('初始化database成功!');
//     process.exit(0);
// }).catch((e)=>{
//     console.log('failed with: '+e);
//     process.exit(0);
// });

console.log('init db ok.');
