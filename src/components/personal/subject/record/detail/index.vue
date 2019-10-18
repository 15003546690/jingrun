<template>
  <div class="result">
    <!--警示-->
    <div class="forbid" v-if="recordDetail.status==1">
        <a><img src="../../../../../assets/img/center/forbid.png"/></a>
        <p>{{recordDetail.subjectOption}}</p>
    </div>
    <div class="result_title">{{recordDetail.title}}</div>
    <div class="result_content">{{recordDetail.content}}</div>
    <div class="submission_time">提交时间：{{formatDate(recordDetail.createTime)}}</div>
    <div class="preview">
      <div v-if="attachment"><img src="../../../../../assets/img/center/pdf.png"/>{{recordDetail.attachmentName}}</div>
      <div v-if="img1">
      	<img src="../../../../../assets/img/center/jpg.png"/>图片1
      	<div class="preview_hover1">
      		<i>预览</i>
      		<div class="preview_img1">
			      <img :src="recordDetail.img1"/>
			    </div>
      	</div>
      </div>
      <div v-if="img2"><img src="../../../../../assets/img/center/jpg.png"/>图片2
      	<div class="preview_hover2">
      		<i>预览</i>
      		<div class="preview_img2">
			      <img :src="recordDetail.img2"/>
			    </div>
      	</div>
      </div>
      <div v-if="img3"><img src="../../../../../assets/img/center/jpg.png"/>图片3
      	<div class="preview_hover3">
      		<i>预览</i>
      		<div class="preview_img3">
			      <img :src="recordDetail.img3"/>
			    </div>
      	</div>
      </div>
			
    </div>
    <div class="download" v-if="attachment">
      <a href="recordDetail.attachment" download="recordDetail.attachmentName"><img src="../../../../../assets/img/center/download.png"/>下载附件</a>
    </div>
    
    <div class="record_check">
      <span v-if="recordDetail.status==0"><img src="../../../../../assets/img/center/identifying2.png"/>待审核</span>
      <span v-if="recordDetail.status==2"><img src="../../../../../assets/img/center/identifying2.png"/>审核通过</span>
      <span v-if="recordDetail.status==1" class="not-pass">未通过</span>
    </div>
  </div>
</template>

<script>
	export default{
		data() {
			return {
				recordDetail: [],   //获取出题详情数据
				attachment: false,
				img1: false,
				img2: false,
				img3: false
			}
		},
		created() {
			this.$Bury(window.location.href,'',0,'chutixiangqing_04019')
			this.getRecordDetail();
		},
		methods: {
			//获取出题详情
			getRecordDetail(){
	      this.$CPOST('/account/v1/userSubject/queryUserSubjectInfo',{
	       	subjectId: this.$route.params.id
	      },(res) => {
	        this.recordDetail=res.resultValue.userSubjectEntitys;
	        if(this.recordDetail.attachment != ''){
	        	this.attachment = true
	        }
	        if(this.recordDetail.img1 != ''){
	        	this.img1 = true
	        }
	        if(this.recordDetail.img2 != ''){
	        	this.img2 = true
	        }
	        if(this.recordDetail.img3 != ''){
	        	this.img3 = true
	        }
	      })
	   	},
	   	//时间戳转换
	   	formatDate (timestamp) {
				return this.$dateFormat(timestamp, 'yyyy年mm月dd日');
			},
			//下载附件
			downloadFile(url) {   
        try{ 
            var elemIF = document.createElement("iframe");   
            elemIF.src = url;   
            elemIF.style.display = "none";   
            document.body.appendChild(elemIF);   
        }catch(e){ 
 					window.confirm("下载URL出错!");
        } 
    	}
		}
	}
</script>


<style scoped>
.preview_hover1:hover .preview_img1{display: block;}
.preview_hover2:hover .preview_img2{display: block;}
.preview_hover3:hover .preview_img3{display: block;}
.result{width: 925px;margin: 0 auto;margin-top: 38px;position: relative;}
.forbid{width: 100%;min-height: 20px;}
.forbid>a{width: 24px;height: 20px;line-height: 20px;float: left;}
.forbid>p{width: 736px;float: left;line-height: 16px;font-size: 12px;color: #e52735;}
.result_title{line-height: 26px;font-size: 14px;color: #323232;font-weight: bold;margin-top: 20px;}
.result_content{line-height: 24px;font-size: 14px;color: #323232;text-indent: 2em;}
.submission_time{height: 47px;line-height: 47px;font-size: 14px;color: #a4a4a4;border-bottom: dashed 1px #e1e1e1;}
/*预览*/
.preview{padding-bottom: 8px;position: relative;}
.preview>div{line-height: 42px;font-size: 12px;color: #676767;text-align: left;}
.preview>div>img{vertical-align: middle;margin-right: 20px;}
.preview>div>div{float: right;cursor: pointer;}
.download{height: 58px;text-align: right;}
.download>a{cursor: pointer;font-size: 14px;color: #676767;line-height: 58px;}
.download>a>img{vertical-align: middle;margin-right: 8px;}
.preview_img1,.preview_img2,.preview_img3{width: 387px;height: 287px;line-height: 287px;position: absolute;top: -58px;left: 222px;right: 0px;bottom: 0px;display: none;}
.preview_img1>img,.preview_img2>img,.preview_img3>img{width: 100%;vertical-align: middle;}
/**/
.record_check{text-align: right;float: right;width: 200px;height: 26px;line-height: 26px;position: absolute;top: 0;right: 0;}
.record_check>span{font-size: 14px;color: #323232;line-height: 16px;}
.record_check>span>img{margin-right: 3px;vertical-align: middle;}
.record_check>a{font-size: 14px;color: #676767;margin-left: 24px;}
</style>
