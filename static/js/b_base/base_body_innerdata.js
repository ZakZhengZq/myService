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

// 注册
Vue.component('child', {
    // 声明 props
    props: ['message'],
    // 同样也可以在 vm 实例中像 “this.message” 这样使用
    template: '<span>{{ message }}</span>'
})
// 创建根实例
new Vue({
    el: '#app',
    data: {
        parentMsg: '父组件内容'
    }
})
