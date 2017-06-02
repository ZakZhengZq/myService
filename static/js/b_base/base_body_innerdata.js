/**
 * Created by dell on 2017/5/29.
 */
var wl=new Vue({
    el: '#widget-latest',
    data:{
        articleList:[]
    },
    mounted: function () {
        this.latestArticle();
    },
    methods:{
        latestArticle:function () {
            axios.get('/static/acti.json')
                .then((response)=>{
                    this.articleList=response.data.result.latestarticle;
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
});

var wf=new Vue({
    el: '#widget-fenlei',
    data: {
        fenleiList: []
    },
    mounted: function () {
        this.latestArticle();
    },
    methods:{
        latestArticle:function () {
            axios.get('/static/acti.json')
                .then((response)=>{
                    this.fenleiList=response.data.result.fenlei;
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
});

var wg=new Vue({
    el: '#widget-guidang',
    data: {
        guidangList: []
    },
    mounted: function () {
        this.latestArticle();
    },
    methods:{
        latestArticle:function () {
            axios.get('/static/acti.json')
                .then((response)=>{
                    this.guidangList=response.data.result.guidang;
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
});

Vue.component('myarticle', {
    props: ['item'],
    template: ' \
            <section>\
                <div class="articles-years">\
                  <a href="/archives/2017" class="archive-year" v-text="item.date"><i class="icon fa fa-calendar-o"></i>2017</a>\
                </div>\
                <div class="articles" v-for="item2 in item.test">\
                    <div class="article-row">\
                        <article class="article article-summary">\
                            <div class="article-summary-inner">\
                                <a href="/blog/2017/02/10/why-rax/" class="_thumbnail">\
                                    <span style="background-image:url(//img.alicdn.com/tps/TB1LxebPVXXXXaHXpXXXXXXXXXX-900-500.png)" alt="Why Rax?" class="thumbnail-image"></span>\
                                </a>\
                                <div class="article-meta">\
                                    <p class="category"><a class="article-category-link" href="/categories/无线开发/" v-text="item2.article1.name"></a></p>\
                                    <p class="date"><time datetime="2017-02-10T10:17:45.000Z" itemprop="datePublished">2017-02-10</time></p>\
                                </div>\
                                <h2 class="article-title">\
                                    <a href="/blog/2017/02/10/why-rax/" class="title">Why Rax?</a>\
                                </h2>\
                                <p class="article-excerpt">https://github.com/alibaba/rax 从今年 1 月 12 日在 Weex Conf 上宣布 Rax 开源，至今已过去一个月左右的时间，这段时间里，Rax 拿到 2400+ 的 star, 我们深知这对一个开源产品来说是微不足道的，但是从中可以发现的是「前端或者 Weex 社区对于类 React 的技术方案是有很大需求的」。同时，结合近期 GitHub 上的相关 is</p>\
                            </div>\
                        </article>\
                        <article class="article article-summary">\
                            <div class="article-summary-inner">\
                                <a href="/blog/2017/02/10/why-rax/" class="_thumbnail">\
                                    <span style="background-image:url(//img.alicdn.com/tps/TB1LxebPVXXXXaHXpXXXXXXXXXX-900-500.png)" alt="Why Rax?" class="thumbnail-image"></span>\
                                </a>\
                                <div class="article-meta">\
                                    <p class="category"><a class="article-category-link" href="/categories/无线开发/" v-text="item2.article2.name">无线开发</a></p>\
                                    <p class="date"><time datetime="2017-02-10T10:17:45.000Z" itemprop="datePublished">2017-02-10</time></p>\
                                </div>\
                                <h2 class="article-title">\
                                    <a href="/blog/2017/02/10/why-rax/" class="title">Why Rax?</a>\
                                </h2>\
                                <p class="article-excerpt">https://github.com/alibaba/rax 从今年 1 月 12 日在 Weex Conf 上宣布 Rax 开源，至今已过去一个月左右的时间，这段时间里，Rax 拿到 2400+ 的 star, 我们深知这对一个开源产品来说是微不足道的，但是从中可以发现的是「前端或者 Weex 社区对于类 React 的技术方案是有很大需求的」。同时，结合近期 GitHub 上的相关 is</p>\
                            </div>\
                        </article>\
                    </div>\
                </div>\
            </section>\
                '
});

new Vue({
    el: '#articleId',
    data: {
        articleInfor: [
                { date: '2017年5月' ,test:[
                    {article1:{name:'article1'}, article2:{name:'article2'}},
                    {article1:{name:'article3'}, article2:{name:'article4'}}
                ]},

                { date: '2016年6月' ,test:[
                    {article1:{name:'article1'}, article2:{name:'article2'}},
                    {article1:{name:'article3'}, article2:{name:'article4'}}
                ]}
        ]
    }
});

new Vue({
    el:'#pagination',
    data: {
        staticNum:[{id:2,display:false,val:2},{id:3,display:false,val:3},{id:4,display:false,val:4}
                        ,{id:5,display:false,val:5},{id:6,display:false,val:6}],
        pageNum:15,
        ellipsis1:false,
        ellipsis2:false,
        left:false,
        right:false,
        lastNum:false,
        preSec:1
    },
    mounted:function () {
        document.getElementById("1").className='_active';
        if (this.pageNum<=4){
            if (this.pageNum==2){this.lastNum=true}
            if (this.pageNum==3){this.lastNum=true;this.staticNum[0].display=true;}
            if (this.pageNum==4){this.lastNum=true;this.staticNum[0].display=true;this.staticNum[1].display=true;}
        }
        if (this.pageNum>4){
            this.left=true;
            this.right=true;
            this.lastNum=true;
            this.ellipsis2=true;
            this.staticNum[0].display=true;this.staticNum[1].display=true;
        }
    },
    methods: {
        select: function (event) {
            this.preSec=parseInt(event.target.id);
            let arr=document.getElementsByName('pana');
            for (let i in arr) {
                if (!arr.hasOwnProperty(i)){continue}
                arr[i].className='';
            }
            //document.getElementById(event.target.id).className='_active';
            //console.log(document.getElementById(event.target.id).firstChild.nodeValue);
            if(this.pageNum>=5){
               let seleVal=parseInt(document.getElementById(event.target.id).firstChild.nodeValue);
                if((seleVal-1)>=4 && (this.pageNum-seleVal)>=4){
                    this.ellipsis1=true;
                    this.ellipsis2=true;
                    document.getElementById('4').className='_active';
                    for (let i=0,j=-2;i<5;i++,j++)
                    this.staticNum[i].val=seleVal+j;
                }
                if((seleVal-1)<4 && (this.pageNum-seleVal)>=4){
                    document.getElementById(event.target.id).className='_active';
                    this.disappear();
                    for (let i=2,j=2;i<=parseInt(event.target.id)+2;i++,j++){
                        this.staticNum[i-2].val=j;
                        this.staticNum[i-2].display=true;}
                    this.ellipsis1=false;
                    this.ellipsis2=true;
                }
                if((seleVal-1)>=4 && (this.pageNum-seleVal)<4){
                    document.getElementById(event.target.id).className='_active';
                    this.disappear();
                    for (let i=6,j=this.pageNum-1;i>=parseInt(event.target.id)-2;i--,j--){
                        this.staticNum[i-2].val=j;
                        this.staticNum[i-2].display=true;}
                    this.ellipsis1=true;
                    this.ellipsis2=false;
                }
                if (this.pageNum==5){
                    document.getElementById(event.target.id).className='_active';
                    if(seleVal==2 || seleVal==3 || seleVal==4){
                        for (let i=2;i<5;i++){
                            this.staticNum[i-2].val=i;
                            this.staticNum[i-2].display=true;}
                        this.ellipsis1=false;
                        this.ellipsis2=false;
                    }
                }
                if (this.pageNum==6){
                    document.getElementById(event.target.id).className='_active';
                    if(seleVal==3 || seleVal==4){
                        for (let i=2;i<6;i++){
                            this.staticNum[i-2].val=i;
                            this.staticNum[i-2].display=true;}
                        this.ellipsis1=false;
                        this.ellipsis2=false;
                    }
                }
                if (this.pageNum==7){
                    document.getElementById(event.target.id).className='_active';
                    if(seleVal==4){
                        for (let i=2;i<7;i++){
                            this.staticNum[i-2].val=i;
                            this.staticNum[i-2].display=true;}
                        this.ellipsis1=false;
                        this.ellipsis2=false;
                    }
                }
            }
        },
        disappear:function () {
            for(let i=0; i<5;i++){
                    this.staticNum[i].display=false;
            }
        },
        previous:function () {
            if(this.preSec-1>0)
            document.getElementById(this.preSec-1+'').click()
        },
        theNext:function () {
            if(this.preSec+1<=this.pageNum)
                document.getElementById(this.preSec+1+'').click()
        }
    }
});
