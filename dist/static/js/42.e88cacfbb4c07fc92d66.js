webpackJsonp([42],{"1EFa":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"new_trends"},[a("div",{staticClass:"about_kong"}),t._v(" "),a("div",{staticClass:"trends_content"},[a("div",{staticClass:"trends_content_title"},[t._v("未来资讯")]),t._v(" "),a("ul",t._l(t.journalism,function(e){return a("li",{key:e.newsId,attrs:{"data-content":"item.content","data-time":"item.updateTime"}},[a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.img,expression:"item.img"}],on:{click:function(a){t.getdetails(e.newsId)}}}),t._v(" "),a("p",{on:{click:function(a){t.getdetails(e.newsId)}}},[t._v(t._s(e.title))]),t._v(" "),a("a",[t._v(t._s(t._f("data")(e.updateTime)))])])})),t._v(" "),t._m(0)]),t._v(" "),a("div",{staticClass:"paging"},[a("el-pagination",{attrs:{"current-page":this.currentPage,"page-size":1,layout:"prev, pager, next, jumper",total:this.totalPage},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)])},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"about_content_particulars"},[a("div",{staticClass:"particulars_kong"})])}],o={render:n,staticRenderFns:i};e.a=o},NU8x:function(t,e,a){"use strict";e.a={data:function(){return{current:1,showItem:10,allpage:20}},computed:{pages:function(){var t=[];if(this.current<this.showItem)for(var e=Math.min(this.showItem,this.allpage);e;)t.unshift(e--);else{var a=this.current-Math.floor(this.showItem/2),e=this.showItem;for(a>this.allpage-this.showItem&&(a=this.allpage-this.showItem+1);e--;)t.push(a++)}return t}},methods:{goto:function(t){t!=this.current&&(this.current=t)}}}},WE2g:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ul",{staticClass:"pagination"},[a("li",{directives:[{name:"show",rawName:"v-show",value:t.current=1,expression:"current = 1"}],on:{click:function(e){t.current--&&t.goto(t.current)}}},[a("a",{attrs:{href:"#"}},[t._v("上一页")])]),t._v(" "),t._l(t.pages,function(e){return a("li",{key:e,class:{active:t.current==e},on:{click:function(a){t.goto(e)}}},[a("a",{attrs:{href:"#"}},[t._v(t._s(e))])])}),t._v(" "),a("li",{directives:[{name:"show",rawName:"v-show",value:t.allpage!=t.current&&0!=t.allpage,expression:"allpage != current && allpage != 0 "}],on:{click:function(e){t.current++&&t.goto(t.current++)}}},[a("a",{attrs:{href:"#"}},[t._v("下一页")])])],2)},i=[],o={render:n,staticRenderFns:i};e.a=o},Xk10:function(t,e,a){"use strict";function n(t){a("f4kA")}var i=a("NU8x"),o=a("WE2g"),r=a("C7Lr"),c=n,s=r(i.a,o.a,!1,c,"data-v-28686cec",null);s.exports},YHIi:function(t,e,a){e=t.exports=a("UTlt")(!1),e.push([t.i,".about_content_particulars[data-v-5db65ecc]{display:none}.new_trends[data-v-5db65ecc]{width:1200px;min-height:782px;margin:0 auto;background:#fff;position:relative}.trends_content[data-v-5db65ecc]{width:1028px;margin:0 auto}.about_kong[data-v-5db65ecc]{width:1162px;height:41px;border-bottom:1px solid #ededed;margin:0 auto;margin-bottom:30px}.trends_content_title[data-v-5db65ecc]{line-height:28px;font-size:14px;color:#323232;font-weight:700;margin-bottom:13px}.trends_content>ul>li[data-v-5db65ecc]{height:73px;line-height:73px;font-size:14px;color:#323232;border-bottom:1px dashed #e5e5e5;cursor:pointer}.trends_content>ul>li>img[data-v-5db65ecc]{width:86px;height:53px;margin-right:20px;float:left;margin-top:10px}.trends_content>ul>li>p[data-v-5db65ecc]{line-height:73px;display:inline-block;float:left}.trends_content>ul>li>a[data-v-5db65ecc]{float:right;line-height:73px;font-size:14px;color:#323232}.about_content_particulars[data-v-5db65ecc]{width:1200px;margin:0 auto;background:#fff;position:absolute;top:91px;left:0;bottom:0;right:0;z-index:3}.particulars_kong[data-v-5db65ecc]{width:1160px;height:39px;border-bottom:1px solid #ededed;margin:0 auto;margin-bottom:30px}.particulars_content[data-v-5db65ecc]{width:1028px;margin:0 auto}.particulars_content_title[data-v-5db65ecc]{text-align:center;line-height:35px;font-size:18px;color:#323232}.particulars_content_time[data-v-5db65ecc]{text-align:center;line-height:32px;font-size:14px;color:#323232;margin-bottom:5px}.particulars_content>p[data-v-5db65ecc]{font-size:16px;color:#323232;text-indent:2em;line-height:30px}.turning[data-v-5db65ecc]{height:105px;margin-top:40px;border-top:1px dashed #e5e5e5;padding-top:20px}.turning>p[data-v-5db65ecc]{line-height:32px;font-size:14px;color:#323232;cursor:pointer}.turning_color[data-v-5db65ecc]{color:#e52735!important}.particulars_content_a[data-v-5db65ecc]{position:absolute;top:12px;left:26px;font-size:14px;color:#6d6d6d}.paging[data-v-5db65ecc]{width:100%;position:absolute;bottom:80px}.el-pagination[data-v-5db65ecc]{text-align:center}",""])},Yd8L:function(t,e,a){"use strict";function n(t){a("hjvQ")}Object.defineProperty(e,"__esModule",{value:!0});var i=a("kOuS"),o=a("1EFa"),r=a("C7Lr"),c=n,s=r(i.a,o.a,!1,c,"data-v-5db65ecc",null);e.default=s.exports},bEEc:function(t,e,a){e=t.exports=a("UTlt")(!1),e.push([t.i,"li[data-v-28686cec]{list-style:none}a[data-v-28686cec]{text-decoration:none}.pagination[data-v-28686cec]{position:relative}.pagination li[data-v-28686cec]{display:inline-block;margin:0 5px}.pagination li a[data-v-28686cec]{padding:.5rem 1rem;display:inline-block;border:1px solid #ddd;background:#fff;color:#0e90d2}.pagination li a[data-v-28686cec]:hover{background:#eee}.pagination li.active a[data-v-28686cec]{background:#0e90d2;color:#fff}",""])},f4kA:function(t,e,a){var n=a("bEEc");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a("FIqI")("1fb4e45a",n,!0,{})},hjvQ:function(t,e,a){var n=a("YHIi");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a("FIqI")("09ec78b8",n,!0,{})},kOuS:function(t,e,a){"use strict";a("Xk10");e.a={data:function(){return{journalism:[],newsId:"",totalPage:null,currentPage:1}},created:function(){this.New()},filters:{days:function(t){var e=new Date(t),a=(e.getFullYear(),e.getMonth(),e.getDate()<10?+e.getDate():""+e.getDate());e.getHours(),e.getMinutes(),e.getSeconds();return a},data:function(t){var e=new Date(t);return e.getFullYear()+"-"+(e.getMonth()+1)+"-"+(e.getDate()<10?"0"+e.getDate():""+e.getDate())+" "+e.getHours()+":"+e.getMinutes()+":"+e.getSeconds()},fixed:function(t){return t.toFixed(0)},decimal:function(t){return t.toFixed?t.toFixed(2):t}},methods:{addTrackLog:function(){this.$Bury(window.location.href,"",0,"weilaizixun_03029")},getLocalTime:function(t){return new Date(1e3*parseInt(t)).toLocaleString().replace(/:\d{1,2}$/," ")},getdetails:function(t){this.$router.push({path:"/others/newdetails/",query:{id:0,newsId:t}})},hideModal:function(){document.querySelector(".about_content_particulars").style.display="none"},handleSizeChange:function(t){this.pagesize=t,this.New()},handleCurrentChange:function(t){this.currentPage=t,this.New()},New:function(){var t=this;this.$CPOST("/share/news/queryNews",{size:10,page:this.currentPage-1},function(e){t.journalism=e.resultValue.newsList,t.newsId=e.resultValue.newsList.newsId,t.totalPage=Math.ceil(data.resultValue.count/8)}),this.addTrackLog()}}}}});