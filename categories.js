 Vue.component('categories-component',{
			template:`
			<div class="rightkuang">
				<div style="font-size:2.3rem;font-family:NSimSun;font-weight:bold;color:#19537D;margin-top:1rem;margin-left:3rem">诗词分类</div>
		          <div style="height:1rem"></div>
		          	<div style="margin-left:1.5rem;">
						<el-button size="small" round v-for="item in message" style="color:#19537D;backgroundColor:transparent;
						margin-left:2.5rem;margin-top:1rem" :buttonid="item.id" @click="toSortPage($event)">{{item.name}}
						</el-button>
					</div>
					
					<div style="height:2rem"></div>


			</div>
			`,
			data(){
				return{
					message:null
				}
			},
			methods:{
				toSortPage(e){
					window.location.href='sort.html?bid='+e.currentTarget.getAttribute('buttonid');
				},
				jumppoem(){
	
						axios({
						 	 method: 'get',
							  url: 'http://rap2.taobao.org:38080/app/mock/245255/api/categories',
							 })
					    .then(response =>
					      { 
					      	if(response.data.code==200)
					      	{
					      		this.message=response.data.data;
						      	
					       	}
					      })
					      .catch(function (error) { // 请求失败处理
					        console.log(error);
					      });
				   	}
			   
				  },
				
			mounted:function(){
				this.jumppoem();
			}
		});
