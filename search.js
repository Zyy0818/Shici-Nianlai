



Vue.component('common-search',{
	props: ['searchinput'],
	template:`<div style="display:inline-block;margin-top:0.8rem;float:left;margin-left:0.5rem;position: relative;">
					  <el-input @keyup.native="Keyup" placeholder="输入诗词分类或描述"  class="input-with-select"
					  prefix-icon="el-icon-search" 
					   v-model="input" 
					  style="width:40rem;margin-left:1rem;border:0.1rem solid #DF0101;
					  font-family: NSimSun;">
					     <el-button slot="append" @click="clicksearch" style="font-family:NSimSun;background-color:#D10101;color:white; "  >
					     搜索诗词</el-button>
					    </el-input>
					    
					    <div id="d1"  v-if="show"
			        	style="border:solid lightgrey 0.2rem;box-shadow: 0 0.2rem 1.2rem 0 rgba(0, 0, 0, 0.1);border-radius: 0.5rem;
			        	position: absolute;z-index:9999;width:30rem;margin-left:1rem;background-color:white"
			        	>
							<div style="height:1rem"></div>
			        		<span style="width:15%;text-align:center;margin-left:5%">{{message1}}</span>
							<table style="width:80%;margin-left:15%">
								<tr v-for="item in sort"> 
									<td style="padding-left:3%;border-left:solid 0.15rem grey;" 
										@mouseover="MouseOver($event)" 
			        					@mouseout="MouseLeave($event)" :sid='item.id' @click="getsearch($event)">{{item.name}}
			        				</td>
			        			</tr>
			        		</table>
			        		<hr/>
			        		<span style="width:15%;text-align:center;margin-left:5%;">{{message2}}</span>
			        		<table style="width:80%;margin-left:15%">
			        			<tr v-for="item in poem" > 
									<td style="padding-left:3%;border-left:solid 0.15rem grey;"
										@mouseover="MouseOver($event)" 
			        					@mouseout="MouseLeave($event)" :pid='item.id' @click="getpoem($event)">{{item.title}}&nbsp;-&nbsp;{{item.author}}
			        				</td>
			        			</tr>
			        		</table>
							<hr/>
			        		<span style="width:10%;text-align:center;margin-left:5%">{{message3}}</span>
			        		<table style="width:80%;margin-left:15%">
			        			<tr v-for="item in author" > 
									<td style="padding-left:3%;border-left:solid 0.15rem grey;"
										@mouseover="MouseOver($event)" 
			        					@mouseout="MouseLeave($event)" :aid='item.id' @click="getauthor($event)">{{item.name}}
			        				</td>
			        			</tr>
			        		</table>
							<div style="height:2rem"></div>
					    </div>
					</div>`,
	data(){
		return{
			input:'',
			show:false,
			nameid:null,
			sort:null,
			poem:null,
			author:null,
			message1:"分类",
			message2:"诗词",
			message3:"作者"
		}
	},
	methods:{
		clicksearch(){
					if(this.input==''){
						this.$alert('请输入诗词分类或描述', '警告', {
				          confirmButtonText: '确定',
				          callback: action => {
				            this.$message({
				              type: 'info',
				              message: `action: ${ action }`
				            });
				          }
				        });
					}else{
					var encodename=encodeURI(this.input);
					window.location.href='search_searchpoem.html?title='+encodename;
		}
				},
	    MouseOver(e){
	    	    console.log("moueseover");
				e.target.style.backgroundColor='lightblue'

	    },
	    MouseLeave(e){
	    	 e.target.style.backgroundColor = '';
	    },
	    Keyup(){
					 var uri='http://rap2.taobao.org:38080/app/mock/245255/api/search/'+encodeURI(this.input);
					 console.log(uri);
					 if(this.input!='')
					 {
					 	axios({
					 	 method: 'get',
						  url: uri,
						 })
				    .then(response =>
				      { 
				      	if(response.data.code==200)
				      	{
					        console.log(response)
					        this.sort=response.data.data.categories;
					      	this.poem=response.data.data.poetries;
							this.author=response.data.data.authors;
							this.show=true
				      	}else{
				      		this.show=false
				      	}
				      	
				      })
				      .catch(function (error) { // 请求失败处理
				        console.log(error);
				      });
					 }else{
					 	this.show=false
					 }
				},
				getsearch(e){
					console.log('search');
					window.location.href='search_poem.html?id='+e.target.getAttribute('sid');
					
				},
				getpoem(e){
					console.log('poem');
					window.location.href='poem.html?titleid='+e.target.getAttribute('pid');
					
				},
				getauthor(e){
					console.log('author');
					window.location.href='author.html?aid='+e.target.getAttribute('aid');
					
				}
			},
			watch:{
				searchinput:function(val){
					this.input=val;
				}
			}

});