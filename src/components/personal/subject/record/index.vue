<template>
<div class="listData">
  <!--出题记录-->
  <div class="record">
    <div class="record_div" v-for="(item,index) in recordData" :key="item.userId">
	    <router-link tag="div" :to="'/personal/subject/record/detail/' + item.subjectId" class="record_div_left">
	      <div class="record_div_left_title">
	        <p :class="item.status==1 ? 'not-pass' : ''">{{slice(item.title)}}</p>
	      </div>
	      <div :class="item.status==1 ? 'not-pass' : ''" class="record_div_left_content">{{sliceContent(item.content)}}</div>
	      <div class="submit_time">
	        <p>提交时间：{{formatDate(item.createTime)}}
				<img v-if="item.attachment && item.status==0" src="../../../../assets/img/center/pin.png"/>
				<img v-if="item.attachment && item.status==2" src="../../../../assets/img/center/pin1.png"/>
			</p>
	        <div class="record_check">
	          <span v-if="item.status==0"><img src="../../../../assets/img/center/identifying1.png"/>待审核</span>
	          <span v-if="item.status==2"><img src="../../../../assets/img/center/identifying2.png"/>审核通过</span>
	          <span v-if="item.status==1" class="not-pass">未通过</span>
	          <b @click.stop="showModal(index,item.subjectId)">删除</b>
	        </div>
	      </div>
	    </router-link>
	  </div>
    <div class="paging">
  		<el-pagination
	      @size-change = "handleSizeChange"
	      @current-change = "handleCurrentChange"
	      :current-page.sync = "currentPage"
	      :page-size = 1
	      layout = "prev, pager, next, jumper"
	      :total = "totalPage">
	   	</el-pagination>
  	</div>
  </div>
  <div class="noData" v-if="isData">
		<p><img src="../../../../assets/img/nodata_icon.png"/></p>
	</div>
	<div class="confirm_modal" v-if="isShow">
			<div class="confirm_box">
				<div class="confirm_main_or">
					<div class="confirm_main_head">
						<p>提示</p>
						<span @click='hideModal'><img src="../../../../assets/img/center/close.png"/></span>
					</div>
					<div class="confirm_text">
						<div class="confirm_text_box">
							<p>确定要删除此出题吗？</p>
						</div>
					</div>
					<div class="confirm_btn">
						<button @click='removedata()'>确定</button>
						<button @click='hideModal'>取消</button>
					</div>
				</div>
			</div>
		</div>
</div>
</template>

<script>

export default {
  data(){
    return{
      recordData:[],   //获取出题列表数据
      totalPage:null,  //页数
      currentPage:1,    //当前页
      isShow: false,
      listIndex:0,
      isData: false
    }
  },
  created(){
  	this.$Bury(window.location.href,'',0,'wodechuti_04009')
    setTimeout(()=>{
      this.getRecord()
    },50)
    
  },
  methods:{
    //用户出题记录列表
    getRecord(){
      this.$CPOST('/account/v1/userSubject/queryUserSubject',{
        page: this.currentPage-1,
        size: 5
      },(res) => {
        this.recordData=res.resultValue.userSubjectEntitys;
        this.totalPage=Math.ceil(res.resultValue.userSubjectEntitysCount/5);
        if(this.recordData.length > 0){
        	this.isData = false;
        }else{
        	this.isData = true;
        }
      })
    },
    handleSizeChange(val) {
				this.pagesize = val;
		    this.getRecord();
    },
    handleCurrentChange(val) {
    		this.currentPage = val;
    		this.getRecord();
    },
    slice(substring) {
   		if(substring.length>50){
   		  return substring.substring(0,50) + '...';
   		}else{
   			return substring;
   		}
   	},
   	//截取出题内容
   	sliceContent(substring) {
   		if(substring.length>150){
   		  return substring.substring(0,150) + '...';
   		}else{
   			return substring;
   		}
   	},
   	/**/
   	showModal(ind,subjectId) {
			this.subjectId=subjectId;
			this.isShow = true;
			this.listIndex = ind;
		},
		// 用户出题注销
		removedata(){
			this.$CPOST('/account/v1/userSubject/deleteUserSubject',{
					subjectId: this.subjectId
      },(res) => {
      	this.hideModal();
				this.recordData.splice(this.listIndex,1);
			})
		},
   	formatDate (timestamp) {
			return this.$dateFormat(timestamp, 'yyyy-mm-dd HH:MM');
		},
		hideModal() {
			this.isShow = false;
		}
  }
}
</script>
<style>
.paging{width: 100%;position:absolute;bottom:80px;}
.el-pagination{text-align: center;}
.listData{width: 100%;height: 886px;position: relative;}
/*出题记录*/
.record_div{border-bottom: dashed 1px #e1e1e1;display: inline-block;margin-bottom: 18px;width: 100%;}
.record_div_left{width: 100%;float: left;}
.record_div_left_title{font-size: 14px;color: #323232;font-weight: bold;}
.record_div_left_title>p{width: 881px;line-height: 26px;cursor: pointer;}
.record_div_left_title>a{font-size: 12px;color: #3282ff;line-height: 26px;}
.record_div_left_title>a>img{margin-left: 4px;vertical-align: middle;margin-top: -4px;}
.record_div_left_content{line-height: 24px;font-size: 14px;color: #323232;width: 925px;cursor: pointer;display:-webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 3;overflow: hidden;}
.submit_time{margin-bottom: 11px;}
.submit_time>p{line-height: 26px;font-size: 14px;color: #a4a4a4;display: inline-block;}
.submit_time>p img{vertical-align: middle;margin-left: 10px;}
.not-pass{color: #a4a4a4 !important;}
.record_check{text-align: right;float: right;width: 200px;height: 26px;}
.record_check>span{font-size: 14px;color: #323232;line-height: 16px;}
.record_check>span>img{margin-right: 3px;vertical-align: middle;}
.record_check>b{font-size: 14px;color: #676767;margin-left: 24px;cursor: pointer;}
/*空白页*/
.noData{position: absolute;width: 100%;height: 100%;text-align: center;line-height: 950px;}
/*取消下单弹层*/
.confirm_modal{width: 100%;height: 100%;position: fixed;left: 0;top: 0;background: url(../../../../assets/img/eventGroup/zhezhao.png) no-repeat center;background-size: 100%;z-index: 5;}
.confirm_box{width: 435px;height: 196px;background: #e6e6e6;position: absolute;left: 0;top: 0;bottom: 0;right: 0;margin: auto;}
.confirm_main,.confirm_main_or{width: 423px;height: 184px;background: #fff;border: 1px solid #c9c9c9;margin: auto;margin-top: 5px;}
.confirm_main_head{width: 100%;height: 32px;}
.confirm_main_head>p{float: left;line-height: 32px;color: #323232;font-size: 14px;padding-left: 13px;}
.confirm_main_head>span{display: block;float: right;cursor: pointer;}
.confirm_text{width: 340px;height: 85px;line-height: 85px;text-align: center;margin: auto;}
.confirm_text_box{display: inline-block;vertical-align: middle;line-height: 24px; color: #323232;}
.confirm_btn{width: 100%;height: 32px;text-align: center;color: #323232;font-size: 14px;}
.confirm_btn>button{width: 98px;height: 32px;background: url(../../../../assets/img/eventGroup/event-btn.png) no-repeat center;border: 0;outline: none;color: #fff;font-size: 14px;cursor: pointer;}
</style>
