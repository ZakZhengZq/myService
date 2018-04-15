var MyXMLHttpRequest=function(){
  var xmlhttprequest;
  if (window.XMLHttpRequest) {
    xmlhttprequest=new window.XMLHttpRequest();
    if (xmlhttprequest.overrideMimeType) {
      xmlhttprequest.overrideMimeType('application/json');
    }
  }else if (window.ActiveXObject) {
    var activeName=["MSXML2.XMLHTTP","Microsoft.XMLHTTP"];
    for (var i = 0; i < activeName.length; i++) {
      try {
        xmlhttprequest=new ActiveXObject(activeName[i]);
        break;
      } catch (e) {

      }
    }
  }

  if (xmlhttprequest==undefined || xmlhttprequest==null) {
    console.log('XMlHttpRequest对象创建失败！');
  }else {
    this.xmlhttp=xmlhttprequest;
  }

  //用户发送请求的参数
  MyXMLHttpRequest.prototype.send=function(method,url,data,callback,failback){
    if (this.xmlhttp!=undefined || this.xmlhttp!=null) {
      //参数检查
      method=method.toUpperCase();
      if (method!='POST' && method!='GET') {
        console.log('请求方法应为POST或GET！');
        return;
      }
      if (url==null || url==undefined) {
        console.log('url不能为空！');
        return;
      }

      //设置响应句柄
      var tempxmlhttp=this.xmlhttp;
      this.xmlhttp.onreadystatechange=function () {
        if (tempxmlhttp.readyState==4) {
          if (tempxmlhttp.status==200) {
            var responseText=tempxmlhttp.responseText;
            var responseXML=tempxmlhttp.responseXML;
            if (callback==undefined || callback==null) {
              console.log('没有设置数据处理函数');
              console.log('返回的数据'+responseText);
            }else {
              callback(responseText,responseXML);
            }
          }else {
            if (failback==undefined ||failback==null) {
              console.log('没有失败处理函数！');
              console.log('http响应码：'+tempxmlhttp.status+'  响应码文本信息：'+tempxmlhttp.statusText);
            }else {
              failback(tempxmlhttp.status,tempxmlhttp.statusText);
            }
          }
        }
      }

      //解决跨域问题
      // if (url.indexOf("http://")>=0) {
      //   url.replace("?","&");
      //   url="Proxy?url="+url;
      //   console.log(url);
      // }
      //原始接口配置参数
      this.xmlhttp.open(method,url,true);
      //如果是POST请求，需要设置请求头和body
      if (method=='POST') {
        this.xmlhttp.setRequestHeader("Content-type","application/json;charset=utf-8")
      }
      this.xmlhttp.send(data);
    }else {
      console.log('XMlHttpRequest对象创建失败！');
    }
    MyXMLHttpRequest.prototype.abort=function () {
      this.xmlhttp.abort();
    }
  }
}

var myXHR=new MyXMLHttpRequest();
callback=function (responseText,responseXML) {
  var win=window.parent;
  win.postMessage(responseText,'*');
}
myXHR.send('GET','http://localhost:3000/blog/latest',null,callback);
