Vue.component('common-navigator',{
	props: ['active'],
	template:`<div v-cloak>
		<el-menu
		  :default-active="active"
		  class="el-menu-demo"
		  mode="horizontal"
		  background-color="#5D6146"
		  text-color="#fff"
		  active-text-color="#F0EFE2"
		  >
					
		<img src="photo/1.png" style="float:left;margin-left:12rem;
		margin-top:0.5rem;width:6rem;height:5rem;">
					
		  <el-menu-item index="1" ><a href="main.html">{{text1}}</a></el-menu-item>
		  
		  <el-menu-item index="3" ><a href="sort.html">{{text3}}</a></el-menu-item>
		  <el-menu-item index="5" style="float: right;margin-right: 17rem" @click="jump">{{text5}}&nbsp;<span class="demo-basic--circle"><span class="block"><el-avatar :size="26" :src="url" style="margin-bottom: 0.8rem"></el-avatar></span></span></el-menu-item>
		</el-menu>
				
				</div>`,
				data(){
					return{
						
								text1:'首页',
								// text2:'诗文',
								text3:'分类',
								// text4:'社区',
								text5:'登录',
								url:'photo/head.png'
						
					}
				},
				methods:{
					checkuser(){
						const url=new URLSearchParams(window.location.search);
						var uri="http://rap2.taobao.org:38080/app/mock/245255/api/user/login/check"
						axios({
						 	 method: 'get',
							  url: uri,
							 })
					    .then(response =>
					      { 
					      	if(response.data.code==200)
					      	{
						       
						      	this.text5="用户中心"
					       	}
					      })
					      .catch(function (error) { // 请求失败处理
					        console.log(error);
					      });
					  },
					  jump(){
					  	if(this.text5=="登录")
					  	{
							window.location.href='login.html' ;
					  	}else{
							window.location.href='usercenter.html' ;
					  	}
					  }
					},
					mounted:function(){
						this.checkuser();
					},
					//watch:{
					//	active:function(val){
					//		this.activeIndex2=val;
			//	}
			//}

			});