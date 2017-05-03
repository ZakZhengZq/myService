/**
 * Created by dell on 2017/4/28.
 */
'use strict';

   var
       fs=require('fs'),
       url=require('url'),
       path=require('path'),
       http=require('http');

   //从命令行参数获取root目录，默认是当前路径
   var root=path.resolve(process.argv[2] || '.');

   var server=http.createServer(function (req,res) {
       var pathname=url.parse(req.url).pathname;
       var filepath=path.join(root,pathname);

       fs.stat(filepath,function (erro,stat) {
           if (erro){
               console.log('文件不存在');
               failure(res,'<h2>文件不存在</h2>');
           }else{
               if (stat.isFile()){
                   console.log('请求的是文件');
                   success(res,filepath);
               }else if (stat.isDirectory){
                   console.log('请求的是目录');
                   isDir(res,filepath);
               }
           }
       });
   });

   function isDir(res,dir) {
       var files=fs.readdir(dir,(erro,files)=>{
           if (erro){
               failure(res,'<h2>404 目录不存在</h2>');
           }else {
               console.log(files);
               var name=files.filter(function (x) {
                   return x==='index.html' || x==='default.html';
               });
               if (name.length!==0){
                   success(res,path.join(dir,name[0]));
               }else {
                   failure(res,'<h2>404 首页不存在</h2>');
               }
           }
           });
   }

   function success(res,path) {
       res.writeHead(200,{'Content-Type':'text/html'});
       fs.createReadStream(path).pipe(res);
   }

   function failure(res,errString) {
       res.writeHead(404,{'Content-Type':'text/html','charset': 'utf-8'});
       res.end(errString);
   }

   server.listen(8080);

   console.log('server start on 8080...');