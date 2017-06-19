/**
 * Created by dell on 2017/5/4.
 */
const Cookies=require('cookies');
function parseUser(obj) {
    if (!obj){
        return;
    }
    let s='';
    if (typeof obj==='string'){
        s=obj
    }else if (obj.headers) {
        let cookies = new Cookies(obj,null);
        s=cookies.get('name');
        //console.log('cookies--->'+cookies+'    name--->'+s+'    .cook--->'+obj.cookie);
    }

    if (s){
        try {
            let user = JSON.parse(Buffer.from(s, 'base64').toString());
            //console.log(`get name:${user.name} and id:${user.id}`);
            return user
        }catch(e) {
            console.log(e);
        }
    }
}

module.exports=parseUser;