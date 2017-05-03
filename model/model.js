/**
 * Created by dell on 2017/5/1.
 */
const fs = require('fs');
const db = require('./db');

let files = fs.readdirSync(__dirname+'/models');

let js_files = files.filter((f)=>{
     return f.endsWith('.js');
},files);
console.log(js_files);
for (let f of js_files){
    console.log(`import model from file ${f}...`);
    let name=f.substring(0,f.length-3);
    module.exports[name] = require(__dirname+'/models/'+name);
    console.log(module.exports)
}

// module.exports.sync = () => {
//     return db.sync();
// };