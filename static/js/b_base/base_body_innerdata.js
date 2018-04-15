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
            axios.get('/blog/latest')
                .then((response)=>{
                    this.articleList=response.data;
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
            axios.get('/blog/fenlei')
                .then((response)=>{
                    this.fenleiList=response.data;
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
            axios.get('/blog/guidang')
                .then((response)=>{
                    this.guidangList=response.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
});