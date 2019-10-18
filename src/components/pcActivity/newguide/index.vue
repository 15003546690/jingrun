<template>
		<div class="newGuide">
			<p class="newGuide_p1">
				<span>
					<img src="../../../assets/img/newguide/new-img.png"/>
					<button class="new_header_register_btn"></button>
				</span>
			</p>
			<p class="newGuide_p2"></p>
			<p class="newGuide_p3"></p>
			<div class="newGuide_p4">
				<ul class="newGuide_list">
					<li>
						<img src="../../../assets/img/newguide/new-img1.png"/>
						<button></button>
					</li>
					<li>
						<img src="../../../assets/img/newguide/new-img2.png"/>
						<button></button>
					</li>
					<li>
						<img src="../../../assets/img/newguide/new-img3.png"/>
						<button></button>
					</li>
					<li>
						<img src="../../../assets/img/newguide/new-img4.png"/>
						<button></button>
					</li>
				</ul>
			</div>
		</div>
</template>
<style>
	*{
		padding: 0;
		margin: 0;
	}
	ul,li{
		list-style: none;
	}
	body{
		background: #fff;
	}
	.newGuide{
		min-width: 1200px;
		max-width: 1920px;
		margin: auto;
		font-size: 0;
	}
	.newGuide_p1{
		width: 100%;
		height: 1021px;
		background: url(../../../assets/img/newguide/new01.jpg) no-repeat center;
		background-size: cover;
		overflow: hidden;
	}
	.newGuide_p1>span{
		width: 1200px;
		height: 422px;
		text-align: center;
		margin: auto;
		display: block;
		margin-top: 597px;
		position: relative;
	}
	.newGuide_p1>span>button{
		width: 244px;
		height: 50px;
		position: absolute;
	    bottom: 0;
	    left: 479px;
	    cursor: pointer;
	    opacity: 0;
	    filter: alpha(opacity=0);
	}
	.newGuide_p2{
		width: 100%;
		height: 873px;
		background: url(../../../assets/img/newguide/new02.jpg) no-repeat center;
		background-size: cover;
	}
	.newGuide_p3{
		width: 100%;
		height: 891px;
		background: url(../../../assets/img/newguide/new03.png) no-repeat center;
		background-size: cover;
	}
	.newGuide_p4{
		width: 100%;
		height: 831px;
		background: url(../../../assets/img/newguide/new04.jpg) no-repeat center;
		background-size: cover;
		overflow: hidden;
	}
	.newGuide_list{
		width: 1172px;
		margin: auto;
		margin-top: 121px;
	}
	.newGuide_list>li{
		width: 535px;
		height: 263px;
		float: left;
		margin-left: 35px;
		margin-top: 35px;
		position: relative;
	}
	.newGuide_list>li>button{
		width: 211px;
		height: 53px;
		position: absolute;
		opacity: 0;
		filter:alpha(opacity=0);
		cursor: pointer;
	}
	.newGuide_list>li:nth-child(1)>button{
		right: 32px;
		bottom: 47px;
	}
	.newGuide_list>li:nth-child(2)>button{
		right: 26px;
		bottom: 47px;
	}
	.newGuide_list>li:nth-child(3)>button{
	    right: 27px;
		bottom: 57px;
	}
	.newGuide_list>li:nth-child(4)>button{
	    right: 19px;
		bottom: 57px;
	}
		</style>
