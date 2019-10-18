<template>
  <div>
    <listHeader :menuList="menuList" v-if="listShow"></listHeader>
    <div class="criticism_main">
        <div class="criticism_content">
          <ul class="criticism_content_list">
  					<Event v-for="item in eventList" :key="item.groupId" :group="item"></Event>
          </ul>
          <div class="noData" v-if="eventList.length==0">
            <p><img src="../../assets/img/nodata_icon.png"/></p>
          </div>
        </div>
        <div class="paging" v-if="eventList.length>0">
  	  		<el-pagination
  		      	@size-change = "handleSizeChange"
  		      	@current-change = "handleCurrentChange"
  		      	:current-page = "currentPage"
  		      	:page-size = 1
  		      	layout = "prev, pager, next, jumper"
  		      	:total = "totalPage" >
  		    </el-pagination>
  	  	</div>
      </div>
    </div>
</template>

<script>
import Event from '../index/Group'
import listHeader from '../common/HeaderCommon'
export default {
  data () {
    const path = this.$route.path.indexOf('predict') > -1 ? '/predict/' : '/criticism/'
    const classify = this.$route.params.classify
    return {
      newest: path + classify + '/0',
      expire: path + classify + '/1',
      hot: path + classify + '/2',
      end: path + classify + '/3',
      eventList: [],
      currentPage: 1,
      totalPage: null,
      listShow:false,
      menuList:[]
    }
  },

  components: {
    Event,
    listHeader
  },
  created () {
    // var path = this.$route.path
    // if(path.indexOf('predict') > 0 ){
    //   this.$Bury(window.location.href,'undefined',0,'yuceshouye_02001');
    // }else if(path.indexOf('criticism') > 0 ){
    //   this.$Bury(window.location.href,'undefined',0,'pingjianshouye_02002');
    // }
    setTimeout(() => {
      this.getEvent()
      this.navInit()
    },50)
    
  },
  methods: {
    navInit(){
      this.$CPOST('/event/v1/eventClassify/queryEventClassifyPc',{},(res) =>{
          this.menuList = res.resultValue.list;
          this.listShow = true;
      })
    },
  	newEvent() {
  		this.currentPage = 1
  	},
  	nearlyEvent() {
  		this.currentPage = 1
  	},
  	hotEvent() {
  		this.currentPage = 1
  	},
  	overEvent() {
  		this.currentPage = 1
  	},
    getEvent () {
      var classifyId = 0;
      if(this.$route.params.classify == 'all'){
        classifyId = 0;
      }else{
        classifyId = this.$route.params.classify
      }
      this.$CPOST('/event/v1/eventGroup/queryPCEventGroup',{
        classifyId: classifyId,
        groupEventCondition: this.$route.params.type,
        groupEventType: this.$route.path.indexOf('predict') > -1 ? 1 : 0,
        page: this.currentPage - 1,
        size: 30
        },(res) =>{
          this.eventList = [];
          var list = res.resultValue.eventGroupEntityParams;
          for (var i = 0; i < list.length; i++) {
            if(list[i].eventList.length>0){
              this.eventList.push(list[i])
            }
          }
          // console.log('eventList='+JSON.stringify(this.eventList))
          this.totalPage = Math.ceil(res.resultValue.count/30);
      })
    },
   	handleSizeChange(val) {
			this.pagesize = val;
	    this.getEvent()
	  },
    handleCurrentChange(val) {
			this.currentPage = val;
			this.getEvent()
    },
  },
  watch: {
    '$route' (to, from) {
      this.currentPage = 1
      const path = to.path.indexOf('predict') > -1 ? '/predict/' : '/criticism/'
      const classify = to.params.classify
      this.newest = path + classify + '/0'
      this.expire = path + classify + '/1'
      this.hot = path + classify + '/2'
      this.end = path + classify + '/3'
      this.getEvent()
    }
  }
}
</script>

<style scoped>
.noData{width: 100%;text-align: center;padding:100px 0;}
.paging{margin-bottom: 80px;}
.el-pagination{text-align: center;}
.criticism_main{width: 1200px;margin: auto;margin-top: 8px;}
.criticism_body_list{width: 100%;height: 36px;margin-top: 8px;border-bottom: 1px solid #eaeaea;}
.criticism_body_list>li{width: 117px;height: 37px;line-height: 36px;text-align: center;color: #444;font-size: 14px;float: left;cursor: pointer;}
.criticism_body_list>li.router-link-active{background: url(../../assets/img/criticism/event_bg.jpg) no-repeat center;color: #4867aa;}
.criticism_active_xian{width: 1200px;height: 6px;line-height: 6px;margin-top: -5px;overflow: hidden;}
.criticism_active_xian>img{vertical-align: bottom;margin-left: -400px;}
.criticism_content{margin-top: 34px;}
.criticism_content_list{width: 1220px;margin-left: -10px;}
</style>
