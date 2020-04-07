 
 Vue.component('star-component',{
			template:`
			<div style="float:right;margin-top:0.5rem;margin-right:15rem"><i class="el-icon-star-off
				">&nbsp;<el-link type="primary" style="color:#19537D;font-weight:bold" @click="starpoem($event)">
				{{message}}</el-link></i>
			</div>
			`,
			data(){
				return{
					message:'-加入收藏',
					selectedId:null
				}
			},
			methods:{
				starpoem(e){
					 const url=new URLSearchParams(window.location.search);
						 if(url.has('titleid')){
							this.selectedId=url.get('titleid');
							if(this.message=="-加入收藏"){
						axios({
						 	 method: 'post',
							  url: 'http://rap2.taobao.org:38080/app/mock/245255/api/favour/poetry/'+this.selectedId,
							 })
					    .then(response =>
					      { 
					      	if(response.data.code==200)
					      	{
					      		this.open();
					      		this.message = "-已收藏";						      	
					       	}
					       	else{
					       		this.fail();
					       	}
					      })
					      .catch(function (error) { // 请求失败处理
					        console.log(error);
					      });
					}else{
						axios({
						 	 method: 'delete',
							  url: 'http://rap2.taobao.org:38080/app/mock/245255/api/favours/poetry/'+this.selectedId,
							 })
					    .then(response =>
					      { 
					      	if(response.data.code==200)
					      	{
					      		this.success();
					      		this.message = "-加入收藏";						      	
					       	}
					       	else{
					       		this.Fail();
					       	}
					      })
					      .catch(function (error) { // 请求失败处理
					        console.log(error);
					      });
					}
						 }
					
					
				},
				open() {
			        this.$message('恭喜，收藏成功');
			      },
			      fail() {
			        this.$alert('收藏失败', '抱歉', {
			          confirmButtonText: '确定',
			          callback: action => {
			            this.$message({
			              type: 'info',
			              message: `action: ${ action }`
			            });
			          }
			        });
			      },
				
				success() {
			        this.$message('恭喜，取消收藏成功');
			      },
			      Fail() {
			        this.$alert('取消收藏失败', '抱歉', {
			          confirmButtonText: '确定',
			          callback: action => {
			            this.$message({
			              type: 'info',
			              message: `action: ${ action }`
			            });
			          }
			        });
			      }		
			      }
				
			
		});
