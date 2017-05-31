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
        pagenum:5
    },
    methods: {
        select: function (event) {
            // `this` 在方法里指当前 Vue 实例
            //console.log(document.getElementsByName('pana'));
            let arr=document.getElementsByName('pana');
            for (let i in arr) {
                if (!arr.hasOwnProperty(i)){continue}
                //console.log(i);
                arr[i].className='';
            }
            document.getElementById(event.target.id).className='_active';
        }
    }
});
