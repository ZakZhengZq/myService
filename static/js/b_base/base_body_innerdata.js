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