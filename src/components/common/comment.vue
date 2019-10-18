<template>
	<div class="relevant_comments">
		<!--评论的输入框-->
		<div class="relevant_comments_title">
			<div class="comments_title">
				<textarea id="comment_content" maxlength="500" v-on:keyup="keyup($event,1)" v-model="comment.commentContent"></textarea>
				<div class="comments_portrait comment_login_btn">
					<p v-on:click="portrait"><img src="../../assets/img/eventGroup/top_hand.png"></p>
				</div>
			</div>
			<div class="comments_buttton">
				<span><i id="showText">还可以输入<a class="clear-pointer" id="comment_b_size">500</a>个字符</i><img class="comments-submit" @click='addComment($event)' src="../../assets/img/eventGroup/published.png"></span>
			</div>
		</div>
		<div class="relevant_comments_body">
			<div class="comments_body_top">最新评论（{{comment.commentCount}}）</div>
			<!--评论列表-->
			<div class="commentSection" id="commentSection">
				<div class="comments_section" v-for='i in comment.groupcomment' style="border: none;">
					<!--评论后页面的显示-->
					<div class="comments_section" :data-id='i.commentId'>
						<div class="hand_top">
							<img :src="i.img">
						</div>
						<div class="hand_message">
							<p>
								<a>{{i.nickName}}</a>：{{i.commentContent}}
							</p>
							<div class="hand_message_time">
								<span> {{i.createTime}}</span>
								<div class="comment-operate-area">
									<!-- <span class="operate-area" @click='report($event)'>举报</span> -->
									<a class="comment_reply_btn" @click='replyCommen($event)'>
										<img src="../../assets/img/eventGroup/reply.png"> 回复（<span class="spaCount">{{i.replyCount}}</span>）
									</a>
									<i @click='laud($event)'>
			                          <img class="laud" src="../../assets/img/eventGroup/gray_praise.png" v-if='i.isLoad==0'>
			                          <img class="laud" src="../../assets/img/eventGroup/red_praise.png" v-if='i.isLoad==1'>
			                          <span class="laud_count">{{i.laudCount}}</span>
			                        </i>
								</div>
							</div>
							<div class="Leave_message hide" style="margin-left: -7px;">
								<div class="Leave_hide" v-for='i in comment.tolist'>
									<div class="hand_top hand_left">
										<img :src="i.img">
									</div>
									<div>
										<p class="div_p">
											<a>{{i.nickName}}</a>：{{i.commentContent}}</p>
										<div class="hand_message_time">
											<span> {{i.createTime}}</span>
											<div class="comment-operate-area">
											</div>
										</div>
									</div>
								</div>
								<div class="Leave_message_in">
									<textarea maxlength="500" id='Tcomment_content' @keyup="keyup($event,2)" :placeholder="'回复'+i.nickName+'：'"></textarea>
									<div class="comments_buttton Leave_message_button">
										<span class="">
				                            <i id="TshowText">还可以输入<a class="reply_b_size">500</a>个字符</i>
				                            <img class="reply-submit" src="../../assets/img/eventGroup/write_back.png" @click='tworeply($event)'>
				                        </span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="paging">
					<el-pagination
				      @size-change = "handleSizeChange"
				      @current-change = "handleCurrentChange"
				      :current-page = "currentPage"
				      :page-size = 1
				      layout = "prev, pager, next, jumper"
				      :total = "totalPage">
				    </el-pagination>
				</div>
				<div class="announcement cement hide">
					<div class="report">
						<div class="report_main">
							<div class="To_report">
								<div class="To_report_title">
									<span>选择举报原因</span>
									<a><img src="../../assets/img/eventGroup/To_report_close.png"></a>
								</div>
								<div class="To_report_body">
									<ul>
										<li><input name="report_type" type="radio">淫秽信息</li>
										<li><input name="report_type" type="radio">广告垃圾</li>
										<li><input name="report_type" type="radio">违法信息</li>
										<li><input name="report_type" type="radio" class="other">其他</li>
									</ul>
								</div>
								<div class="textarea">
									<textarea id="other_reason" placeholder="说明详细原因，帮助我们更快的处理..." maxlength="100"></textarea>
									<span class="hide">0/10</span>
								</div>
								<div class="sub_mit"><img src="../../assets/img/eventGroup/sublimt_button.png"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<Login v-if="isShowLoginModal" @hideLoginModal="hideLoginModal"></Login>
		<Aalert :text='alertText' v-show='alert' @yes="yes"></Aalert>
	</div>
</template>
<script>
import Login from '../common/Login'
import Aalert from './alert'
export default {
	props:{
		objType:{
			default(){return 0;}//0题材  1题材组
		}
	},
	data() {
		return {
			totalPage: 0,
			currentPage:1,
			alert:false,
			alertText:'',
			isShowLoginModal:false,
			comment:{
				groupcomment:[],//评论列表
				commentCount:0,//评论数量
				commentContent:'',//评论内容
				tolist:[],//回复评论
				flag:true,//阻止连击

			},
			yesType:'',//弹层确定类型
		}
	},
	components: {
			Aalert,
			Login
		},
	created(){
		this.getComment();
	},
	methods: {
		hideLoginModal(){
				this.isShowLoginModal = false;
			},
		//点赞
		laud(e){
			this.laud = e.path[5].getAttribute('data-id')
			this.$CPOST('/event/v1/comment/giveThumbsUp', {
					objId: this.laud
				},(res) => {
					if(res.resultMessages == "SUCCESS") {
						e.path[1].querySelector('.laud_count').innerHTML++
					}
				})
			return false
		},
		portrait() {
				//alert(123)
				/*var session=sessionStorage.getItem("key"); 
				if(session==null){
					this.$router.push('/common/Login')
				}*/
			},
		yes(){
			switch(this.yesType){
				case 'pinglun':
				this.getComment();
				break;
				case 'huifu':
				this.$CPOST('/event/v1/comment/getReply', {
					page: 0,
					rowId: this.commentId,
					size: 20
				}, (res) => {
					this.comment.tolist = res.resultValue.replyResponseList
					this.getComment();
				})
				break;
			}
		},
		alertDailog(txt){
				this.alert = true;
				$('.confirm_modal').show();
				this.alertText=txt;
			},
		//回复评论
		tworeply(e){
			if(this.$store.state.refreshToken == '') {
				this.isShowLoginModal = true;
				return false
			}
			this.commentId=e.path[6].getAttribute('data-id')
			if(e.path[4].querySelector('textarea').value==''){
				return false
			}else{
				this.commentContent=e.path[4].querySelector('textarea').value
			}
			if(this.comment.flag){
				this.comment.flag = false;
				var objId = this.$route.params.id || this.$route.query.id
				this.$CPOST('/event/v1/comment/replyComment', {
					commentId:this.commentId,
					content:this.commentContent,
					objId:objId,
					objType:this.objType,
					replyedId:this.commentId
				},(res) => {
					this.comment.flag = true;
					if(res.resultMessages == 'SUCCESS') {
						e.path[4].querySelector('textarea').value = '';
						e.path[4].querySelector('.reply_b_size').innerText=500;
						this.yesType = 'huifu';
						this.alertDailog('回复成功')
							
					} else{
						this.alertDailog(res.resultMessages);
					}
				})
			}
		},
		//添加评论
			addComment(e) {
				if(this.$store.state.refreshToken == '') {
					this.isShowLoginModal = true;
					return false;
				}
				if(this.comment.commentContent == '') {
					this.alertDailog('请输入评论内容');
					return false;
				}
				if(this.comment.flag){
					this.comment.flag = false;
					var objId = this.$route.params.id || this.$route.query.id;
					this.$CPOST('event/v1/comment/addComment', {
						content: this.comment.commentContent,
						objId: objId,
						objType: this.objType
					}, (res) => {
						if(res.resultMessages == 'SUCCESS') {
							this.comment.commentContent = '';
							this.yesType = 'pinglun';
							this.alertDailog('评论成功');							
						}else{
							this.alertDailog(res.resultMessages);
						}
						this.comment.flag = true;
						for(var i = 0; i < document.querySelectorAll(".Leave_message").length; i++) {
							document.querySelectorAll(".Leave_message")[i].classList.add('hide')
						}
						
					})
				}
			},
		 handleSizeChange(val) {
		 	for(var i=0;i<document.querySelectorAll(".Leave_message").length;i++){
				document.querySelectorAll(".Leave_message")[i].classList.add('hide')
			}
			this.pagesize = val;
			this.getComment()
		},
		handleCurrentChange(val) {
			for(var i=0;i<document.querySelectorAll(".Leave_message").length;i++){
				document.querySelectorAll(".Leave_message")[i].classList.add('hide')
			}
			this.currentPage = val;
			this.getComment()
		},
		//获取评论信息
		getComment() {
			var objId = this.$route.params.id || this.$route.query.id;
			this.$CPOST('event/v1/comment/getComment' + this.$signParam(), {
					objId: objId,
					page: this.currentPage - 1,
					size:10
				},(res) => {
					this.comment.groupcomment=res.resultValue.commentResponses;
					this.comment.commentCount=res.resultValue.commentCount;
					this.totalPage = Math.ceil(res.resultValue.totalElements / 10);
				})
		},
		reply(e) {
			// console.log(e.path)
			this.reples = !this.reples
		},
		replyCommen(e) {
				for(var i = 0; i < document.querySelectorAll(".Leave_message").length; i++) {
					document.querySelectorAll(".Leave_message")[i].classList.add('hide')
				}
				e.path[3].querySelector('.Leave_message').classList.remove('hide')
				this.twoid = e.path[4].getAttribute('data-id')
				this.$CPOST('/event/v1/comment/getReply', {
						page: 0,
						rowId: this.twoid,
						size: 20
					}, (res) => {
						this.comment.tolist = res.resultValue.replyResponseList
					})
			},
		keyup(e,type) {
			var sum = 500;
			var len = e.path[0].value.length;
			if(type == 1){
				var size = e.path[2].childNodes[2].childNodes["0"].firstChild.children["0"];
			}else{
				var size = e.path[4].querySelector('.reply_b_size');
			}
			
			var last = sum - len;
			size.innerText = last;
		},
	}
			
}
</script>
<style scoped>
	/*评论*/
	.paging {
		margin: 30px 0;
	}
	.el-pagination{
		text-align: center;
	}
	.relevant_comments {
		min-height: 654px;
	}
	
	.relevant_comments_title {
		width: 1180px;
		min-height: 176px;
		margin: 0 auto;
		margin-top: 26px;
		overflow: hidden;
	}
	
	.comments_title {
		min-height: 106px;
		margin-top: 32px;
		background: url('../../assets/img/eventGroup/comments.png') no-repeat center;
		background-size: 100% 100%;
		position: relative;
		text-align: center;
	}
	
	.comments_title textarea {
		width: 1170px;
		height: 86px;
		margin-top: 18px;
		resize: none;
		border: none;
		outline: none;
	}
	
	.comments_portrait p {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		-webkit-border-radius: 50%;
		-moz-border-radius: 50%;
		border: solid 1px #b2b2b2;
		float: left;
	}
	
	.comments_portrait>p>img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		-webkit-border-radius: 50%;
		-moz-border-radius: 50%;
	}
	
	.comments_portrait span {
		height: 30px;
		line-height: 30px;
		margin-left: 6px;
		background: #fff;
		float: left;
		margin-top: 13px;
		padding: 0px 10px;
	}
	
	.comments_buttton {
		height: 32px;
		margin-top: 6px;
	}
	
	.comments_buttton span {
		float: right;
		font-size: 14px;
		color: #343434;
		display: flex;
		margin-right: 8px;
	}
	
	.comments_buttton span a {
		color: #fa4c4c;
	}
	
	.comments_buttton>span img {
		margin-left: 10px;
		cursor: pointer;
	}
	
	.Leave_message_button {
		margin-bottom: 30px;
	}
	
	.comments_portrait {
		height: 42px;
		position: absolute;
		top: -32px;
		left: 8px;
	}
	
	.comments_body_top {
		height: 60px;
		line-height: 60px;
		color: #1e1d1d;
		font-size: 16px;
		font-weight: bold;
		padding-left: 10px;
	}
	
	.comments_section {
		width: 1160px;
		margin: auto;
		min-height: 89px;
		border-bottom: solid 1px #ededed;
		display: inline-block;
		margin-left: 10px;
	}
	
	.hand_top {
		width: 76px;
		min-height: 88px;
		float: left;
		margin-left: -17px;
		text-align: center;
	}
	
	.hand_left {
		width: 76px;
		min-height: 88px;
		float: left;
		margin-left: -17px;
		text-align: center;
	}
	
	.hand_top>img {
		width: 56px;
		height: 56px;
		border-radius: 50%;
		-webkit-border-radius: 50%;
		-moz-border-radius: 50%;
	}
	
	.hand_message {
		width: 1100px;
		min-height: 88px;
		float: left;
	}
	
	.hand_message>p {
		font-size: 16px;
		color: #5e5e5e;
		line-height: 24px;
		word-wrap: break-word;
		word-break: break-all;
	}
	
	.hand_message>p a {
		color: #acacac;
	}
	
	.hand_message_time {
		height: 22px;
		line-height: 22px;
		font-size: 14px;
		color: #acacac;
		margin-bottom: 20px;
	}
	
	.comment-operate-area:hover .operate-area {
		display: block;
	}
	
	.operate-area {
		display: none;
		float: left;
	}
	
	.hand_message_time>span {
		float: left;
	}
	
	.hand_message_time>div {
		float: right;
		margin-right: -10px;
	}
	
	.hand_message_time>div span {
		cursor: pointer;
	}
	
	.hand_message_time>div a,
	.hand_message_time>div i {
		height: 22px;
		line-height: 22px;
		margin-left: 30px;
	}
	
	.hand_message_time>div i {
		margin-right: 12px;
	}
	
	.hand_message_time>div a img,
	.hand_message_time>div i img {
		vertical-align: middle;
		margin-right: 6px;
		cursor: pointer;
	}
	
	.hand_message_time div i img {
		display: inline;
	}
	
	.hand_message_time div i.current img {
		display: none;
	}
	
	.hand_message_time div i.current img+img {
		display: inline;
	}
	
	.hand_message_time div i.current {
		color: #e4393c;
	}
	
	.againCom {
		width: 1100px;
		display: inline-block;
		float: right;
	}
	
	.againCom .againCom_top {
		width: 76px;
		float: left;
		margin-left: 0;
	}
	
	.againCom .hand_message {
		width: 1007px;
		float: left;
	}
	/****举报弹层****/
	
	.report,
	.placeOrder_modal {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: url(../../assets/img/eventGroup/zhezhao.png) no-repeat center;
		background-size: 100%;
		z-index: 5;
		display: table;
	}
	
	.report_main {
		display: table-cell;
		vertical-align: middle;
	}
	
	.To_report {
		width: 318px;
		/*height:207px;*/
		background: white;
		margin: 0 auto;
		vertical-align: middle;
		text-align: center;
		overflow: hidden;
	}
	
	.To_report_title {
		height: 35px;
		line-height: 35px;
		background: #f3f3f3;
	}
	
	.To_report_title span {
		float: left;
		font-size: 14px;
		color: #676767;
		margin-left: 20px;
	}
	
	.To_report_title a {
		float: right;
		margin-right: 10px;
	}
	
	.To_report_body {
		min-height: 73px;
		margin-top: 20px;
	}
	
	.To_report_body ul li {
		float: left;
		width: 50%;
		height: 36px;
		line-height: 36px;
		text-align: left;
		font-size: 14px;
		color: #676767;
	}
	
	.To_report_body ul li input {
		margin-left: 25px;
		margin-right: 7px;
		cursor: pointer;
	}
	
	.sub_mit {
		height: 30px;
		margin-top: 28px;
		text-align: center;
		margin-bottom: 12px;
		cursor: pointer;
	}
	
	.To_report .textarea {
		width: 288px;
		height: 80px;
		margin: 0 auto;
		display: none;
		position: relative;
	}
	
	.To_report .textarea textarea {
		width: 288px;
		height: 80px;
		line-height: 30px;
		resize: none;
		text-indent: 5px;
		border: solid 1px #e0e0e0;
	}
	
	.To_report .textarea span {
		height: 30px;
		line-height: 30px;
		position: absolute;
		bottom: -5px;
		right: 10px;
		font-size: 14px;
		color: #a9a9a9;
	}
	
	.textarea_main {
		display: block;
	}
	
	.comment_login_btn {
		cursor: pointer;
	}
	
	.To_view {
		height: 46px;
		line-height: 46px;
		font-size: 14px;
		color: #5e5e5e;
		text-align: center;
		margin-bottom: 8px;
	}
	
	.Leave_message {
		min-height: 104px;
	}
	
	.Leave_hide {
		clear: both;
	}
	
	.Leave_message_in {
		width: 1100px;
		min-height: 104px;
		float: right;
		margin-right: 8px;
	}
	
	.Leave_message_in textarea {
		width: 100%;
		min-height: 60px;
		border-radius: 2px;
		-webkit-border-radius: 2px;
		-moz-border-radius: 2px;
		resize: none;
		outline: none;
		overflow-y: hidden;
		text-indent: 26px;
		font-size: 16px;
		border: solid 1px #d3d3d3;
		line-height: 18px;
		padding: 5px 0px;
	}
	
	.check_in_click {
		width: 100%;
		height: 82px;
		line-height: 82px;
		text-align: center;
		font-size: 16px;
		color: #333333;
	}
	
	.check_in_click a {
		cursor: pointer;
	}
	
	.Leave_message_button span {
		margin-right: 0 !important;
	}
</style>