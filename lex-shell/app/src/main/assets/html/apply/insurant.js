!function(e){var t={};function a(c){if(t[c])return t[c].exports;var i=t[c]={i:c,l:!1,exports:{}};return e[c].call(i.exports,i,i.exports,a),i.l=!0,i.exports}a.m=e,a.c=t,a.d=function(e,t,c){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:c})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var c=Object.create(null);if(a.r(c),Object.defineProperty(c,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)a.d(c,i,function(t){return e[t]}.bind(null,i));return c},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=13)}({13:function(e,t,a){"use strict";var c=function(){function e(e,t){for(var a=0;a<t.length;a++){var c=t[a];c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(e,c.key,c)}}return function(t,a,c){return a&&e(t.prototype,a),c&&e(t,c),t}}();var i=function(e){function t(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var e=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.state={orderId:common.param("orderId"),genderDict:{M:"男",F:"女"},nationDict:{},marriageDict:{},certTypeDict:{},relationDict:{"00":"本人","01":"夫妻"},verify:{},index:0,mode:0,cust:[{}]},e}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,React.Component),c(t,[{key:"componentDidMount",value:function(){var e=this;MF.setTitle("被保险人"),APP.dict("cert,marriage,nation,occupation,relation",function(t){var a={},c={},i=t.occupation.datas.map(function(e){var t=e.smalls.map(function(e){return a[e.occupationCode]={text:e.occupationName},c[e.occupationCode]=e.occupationLevel,{code:e.occupationCode,text:e.occupationName}});return a[e.occupationCode]={text:e.occupationName,children:t},{code:e.occupationCode,text:e.occupationName}});e.setState({occMap:a,occRank:c,occDict:i,nationDict:t.nation,nationDictMap:APP.toMapDict(t.nation),certTypeDict:t.cert,relationDict:t.relation,marriageDict:t.marriage})}),APP.apply.view(this.state.orderId,function(t){var a=t.detail?t.detail.insurants:null;e.setState({cust:a||[{}]})})}},{key:"verify",value:function(e){var t={};if(1==this.state.mode)if(e.name?e.name.length>60?t.name="姓名太长":e.name.indexOf(" ")>0&&(t.name="姓名中不能有空格"):t.name="该项必填",e.birthday?e.birthday>common.dateStr(new Date)&&(t.birthday="生日不能大于当前日期"):t.birthday="该项必填",e.certNo){if(1==e.certType){var a=checkIdCard(e.certNo);a&&(t.certNo=a)}}else t.certNo="该项必填";return 2==this.state.mode&&(e.income?/^[0-9]*$/.test(e.income)||(t.income="年收入需要为数字"):t.income="该项必填"),this.setState({verify:t}),0==Object.keys(t).length}},{key:"save",value:function(){var e=this,t=this.state.cust[this.state.index];1==this.state.mode?(t.name=this.refs.name.value,t.certNo=this.refs.certNo.value):2==this.state.mode?(t.company=this.refs.company.value,t.workJob=this.refs.workJob.value,t.income=this.refs.income.value):3==this.state.mode?(t.address=this.refs.address.value,t.address1=this.refs.address1.value,t.address2=this.refs.address2.value,t.telephone=this.refs.telephone.value,t.mobile=this.refs.mobile.value,t.qq=this.refs.qq.value,t.wechat=this.refs.wechat.value,t.zipcode=this.refs.zipcode.value,t.email=this.refs.email.value):this.state.mode,this.state.cust[this.state.index]=t,this.verify(t)?(t["mode"+this.state.mode]=!0,APP.apply.save({id:this.state.orderId,detail:{insurants:this.state.cust}},function(t){e.setState({mode:0,cust:e.state.cust})})):t["mode"+this.state.mode]=!1}},{key:"getIdCardImg",value:function(){this.setState({IdCardImg:{}})}},{key:"next",value:function(){var e=!0;if(this.state.cust.map(function(t){e=e&&t.mode1&&t.mode2&&t.mode3&&t.mode4}),e){var t=JSON.parse(localStorage.everyState),a=this.state;t.insurant=a,localStorage.everyState=JSON.stringify(t),MF.navi("apply/plan.html?orderId="+this.state.orderId)}else MF.toast("请完善客户信息")}},{key:"newInsurant",value:function(){this.state.cust.push({}),this.setState({cust:this.state.cust})}},{key:"onInsurantSwitch",value:function(e){this.setState({mode:0,index:e})}},{key:"onValChange",value:function(e,t){this.state.cust[this.state.index][e]=t,"occupation1"==e?(this.state.cust[this.state.index].occupation=null,this.state.cust[this.state.index].occupationLevel=null):"occupation"==e&&(this.state.cust[this.state.index].occupationLevel=this.state.occRank[this.state.cust[this.state.index].occupation]),this.setState({cust:this.state.cust})}},{key:"deleteInsurant",value:function(){var e=this;this.state.cust.length<=1?MF.toast("至少需要一个被保险人"):APP.alert("注意","确定删除吗？",function(t){e.state.cust.splice(e.state.index,1),e.state.index=0,e.save()},function(e){})}},{key:"render",value:function(){var e=this,t=this.state.cust[this.state.index];return React.createElement("div",null,React.createElement("div",{className:"bg-desk",style:{display:"flex",position:"fixed",zIndex:"50",top:"0",width:"100%"}},this.state.cust.map(function(t,a){return React.createElement("div",{className:"tab "+(a==e.state.index?"tab-focus":"tab-blur"),key:a,style:{width:"250px"},onClick:e.onInsurantSwitch.bind(e,a)},React.createElement("text",{className:"text18"},null==t.name||""==t.name?"被保险人"+(a+1):t.name))}),this.state.cust.length>=3?null:React.createElement("div",{className:"ml-auto",style:{height:"80px",textAlign:"right"}},React.createElement("img",{style:{width:"42px",height:"45px",margin:"17px"},src:"../images/add-ins.png",onClick:this.newInsurant.bind(this)}))),React.createElement("div",{style:{height:"80px"}}),React.createElement("div",{className:"divx text16 tc-white bg-primary p-2 mt-1 lh-60 h-100",style:{width:"100%"}},React.createElement("div",{style:{width:"40%",height:"60px"}},"与同投保人关系"),React.createElement("div",{className:"ml-auto h-60",style:{textAlign:"right"},onClick:function(t){APP.pick("select",e.state.relationDict,e.onValChange.bind(e,"relation"))}},React.createElement("div",{className:"mr-2"},this.state.relationDict[t.relation])),React.createElement("img",{style:{width:"27px",height:"39px",marginTop:"10px"},src:"../images/white-arrow-right.png"})),React.createElement("div",{className:"divx bg-white pl-3 pr-3",style:{height:"100px",marginTop:"20px",textAlign:"center"},onClick:function(t){e.setState({mode:1==e.state.mode?0:1})}},React.createElement("div",{className:"divx text18",style:{height:"60px",margin:"25px auto 0 auto",verticalAlign:"middle",lineHeight:"50px"}},React.createElement("img",{style:{width:"50px",height:"50px",margin:"0 20px 0 65px"},src:"../images/"+(1==this.state.mode?"sub":"add")+".png"}),"基本信息"),React.createElement("div",{style:{width:"65px"}},t.mode1?React.createElement("img",{style:{width:"39px",height:"30px",marginTop:"35px",float:"right"},src:"../images/filled.png"}):null)),1!=this.state.mode?null:React.createElement("div",{className:"div"},React.createElement("div",{className:"form-item text16"},React.createElement("div",{className:"form-item-label"},React.createElement("span",{style:{color:"red"}},"*"),"投保人姓名"),React.createElement("div",{className:"form-item-widget"},React.createElement("input",{className:"mt-1",ref:"name",defaultValue:t.name,placeholder:"请输入投保人姓名"}))),this.state.verify.name?React.createElement("div",{className:"form-alert"},this.state.verify.name):null,React.createElement("div",{className:"form-item text16"},React.createElement("div",{className:"form-item-label"},React.createElement("span",{style:{color:"red"}},"*"),"性别"),React.createElement("div",{className:"form-item-widget",onClick:function(t){APP.pick("select",e.state.genderDict,e.onValChange.bind(e,"gender"))}},React.createElement("div",{className:(null==t.gender?"tc-gray ":"")+"text16 ml-1 mr-auto"},null==t.gender?"请选择性别":this.state.genderDict[t.gender]),React.createElement("img",{className:"mt-2 mr-0",style:{width:"27px",height:"39px"},src:"../images/right.png"}))),React.createElement("div",{className:"form-item text16"},React.createElement("div",{className:"form-item-label"},React.createElement("span",{style:{color:"red"}},"*"),"国籍"),React.createElement("div",{className:"form-item-widget",onClick:function(t){APP.pick("select",e.state.nationDict,e.onValChange.bind(e,"nation"))}},React.createElement("div",{className:(null==t.nation?"tc-gray ":"")+"text16 ml-1 mr-auto"},null==t.nation?"请选择国籍":this.state.nationDictMap[t.nation]),React.createElement("img",{className:"mt-2 mr-0",style:{width:"27px",height:"39px"},src:"../images/right.png"}))),React.createElement("div",{className:"form-item text16"},React.createElement("div",{className:"form-item-label"},React.createElement("span",{style:{color:"red"}},"*"),"出生日期"),React.createElement("div",{className:"form-item-widget",onClick:function(t){APP.pick("date",{begin:"1900-01-01",end:new Date},e.onValChange.bind(e,"birthday"))}},React.createElement("div",{className:(null==t.birthday?"tc-gray ":"")+"text16 ml-1 mr-auto"},null==t.birthday?"请选择出生日期":t.birthday),React.createElement("img",{className:"mt-2 mr-0",style:{width:"27px",height:"39px"},src:"../images/right.png"}))),this.state.verify.birthday?React.createElement("div",{className:"form-alert"},this.state.verify.birthday):null,React.createElement("div",{className:"form-item text16"},React.createElement("div",{className:"form-item-label"},React.createElement("span",{style:{color:"red"}},"*"),"婚姻状况"),React.createElement("div",{className:"form-item-widget",onClick:function(t){APP.pick("select",e.state.marriageDict,e.onValChange.bind(e,"marriage"))}},React.createElement("div",{className:(null==t.marriage?"tc-gray ":"")+"text16 ml-1 mr-auto"},null==t.marriage?"请选择婚姻状况":this.state.marriageDict[t.marriage]),React.createElement("img",{className:"mt-2 mr-0",style:{width:"27px",height:"39px"},src:"../images/right.png"}))),React.createElement("div",{className:"form-item text16"},React.createElement("div",{className:"form-item-label"},React.createElement("span",{style:{color:"red"}},"*"),"证件类型"),React.createElement("div",{className:"form-item-widget",onClick:function(t){APP.pick("select",e.state.certTypeDict,e.onValChange.bind(e,"certType"))}},React.createElement("div",{className:(null==t.certType?"tc-gray ":"")+"text16 ml-1 mr-auto"},null==t.certType?"请选择证件类型":this.state.certTypeDict[t.certType]),React.createElement("img",{className:"mt-2 mr-0",style:{width:"27px",height:"39px"},src:"../images/right.png"}))),React.createElement("div",{className:"form-item text16"},React.createElement("div",{className:"form-item-label"},React.createElement("span",{style:{color:"red"}},"*"),"证件号码"),React.createElement("div",{className:"form-item-widget"},React.createElement("input",{className:"mt-1",ref:"certNo",defaultValue:t.certNo,placeholder:"请输入证件号码"}))),this.state.verify.certNo?React.createElement("div",{className:"form-alert"},this.state.verify.certNo):null,React.createElement("div",{className:"form-item text16"},React.createElement("div",{className:"form-item-label"},React.createElement("span",{style:{color:"red"}},"*"),"证件有效期"),React.createElement("div",{className:"form-item-widget",onClick:function(t){APP.pick("date",{begin:new Date},e.onValChange.bind(e,"certValidDate"))}},React.createElement("div",{className:(null==t.certValidDate?"tc-gray ":"")+"text16 ml-1 mr-auto"},null==t.certValidDate?"请选择证件有效期":t.certValidDate),React.createElement("img",{className:"mt-2 mr-0",style:{width:"27px",height:"39px"},src:"../images/right.png"}))),React.createElement("div",{className:"form-item text16"},React.createElement("img",{className:"mt-1 ml-auto mr-3",style:{width:"120px",height:"60px"},src:"../images/finish.png",onClick:this.save.bind(this)}))),React.createElement("div",{className:"divx bg-white pl-3 pr-3",style:{height:"100px",marginTop:"20px",textAlign:"center"},onClick:function(t){e.setState({mode:2==e.state.mode?0:2})}},React.createElement("div",{className:"divx text18",style:{height:"60px",margin:"25px auto 0 auto",verticalAlign:"middle",lineHeight:"50px"}},React.createElement("img",{style:{width:"50px",height:"50px",margin:"0 20px 0 65px"},src:"../images/"+(2==this.state.mode?"sub":"add")+".png"}),"职业信息"),React.createElement("div",{style:{width:"65px"}},t.mode2?React.createElement("img",{style:{width:"39px",height:"30px",marginTop:"35px",float:"right"},src:"../images/filled.png"}):null)),2!=this.state.mode?null:React.createElement("div",{className:"div"},React.createElement("div",{className:"form-item text16"},React.createElement("div",{className:"form-item-label"},"工作单位"),React.createElement("div",{className:"form-item-widget"},React.createElement("input",{className:"mt-1",ref:"company",defaultValue:t.company,placeholder:"请输入工作单位"}))),React.createElement("div",{className:"form-item text16"},React.createElement("div",{className:"form-item-label"},"职务"),React.createElement("div",{className:"form-item-widget"},React.createElement("input",{className:"mt-1",ref:"workJob",defaultValue:t.workJob,placeholder:"请输入职务"}))),React.createElement("div",{className:"form-item text16"},React.createElement("div",{className:"form-item-label"},React.createElement("span",{style:{color:"red"}},"*"),"职业大类"),React.createElement("div",{className:"form-item-widget",onClick:function(t){APP.pick("select",e.state.occDict,e.onValChange.bind(e,"occupation1"))}},React.createElement("div",{className:(null==t.occupation1?"tc-gray ":"")+"text16 ml-1 mr-auto"},null==t.occupation1?"请选择职业大类":this.state.occMap[t.occupation1].text),React.createElement("img",{className:"mt-2 mr-0",style:{width:"27px",height:"39px"},src:"../images/right.png"}))),React.createElement("div",{className:"form-item text16"},React.createElement("div",{className:"form-item-label"},React.createElement("span",{style:{color:"red"}},"*"),"职业小类"),React.createElement("div",{className:"form-item-widget",onClick:function(a){APP.pick("select",e.state.occMap[t.occupation1].children,e.onValChange.bind(e,"occupation"))}},React.createElement("div",{className:(null==t.occupation?"tc-gray ":"")+"text16 ml-1 mr-auto"},null==t.occupation?"请选择职业小类":this.state.occMap[t.occupation].text),React.createElement("img",{className:"mt-2 mr-0",style:{width:"27px",height:"39px"},src:"../images/right.png"}))),React.createElement("div",{className:"form-item text16"},React.createElement("div",{className:"form-item-label"},"职业代码"),React.createElement("div",{className:"form-item-widget"},React.createElement("div",{className:(null==t.occupation?"tc-gray ":"")+"text16 ml-1 mr-auto"},t.occupation))),React.createElement("div",{className:"form-item text16"},React.createElement("div",{className:"form-item-label"},"职业类别"),React.createElement("div",{className:"form-item-widget"},React.createElement("div",{className:(null==t.occupationLevel?"tc-gray ":"")+"text16 ml-1 mr-auto"},null==t.occupationLevel?"":t.occupationLevel+"类"))),React.createElement("div",{className:"form-item text16"},React.createElement("div",{className:"form-item-label"},React.createElement("span",{style:{color:"red"}},"*"),"年收入（万元）"),React.createElement("div",{className:"form-item-widget"},React.createElement("input",{className:"mt-1",ref:"income",defaultValue:t.income,placeholder:"请输入年收入"}))),React.createElement("div",{className:"form-item text16"},React.createElement("img",{className:"mt-1 ml-auto mr-3",style:{width:"120px",height:"60px"},src:"../images/finish.png",onClick:this.save.bind(this)}))),React.createElement("div",{className:"divx bg-white pl-3 pr-3",style:{height:"100px",marginTop:"20px",textAlign:"center"},onClick:function(t){e.setState({mode:3==e.state.mode?0:3})}},React.createElement("div",{className:"divx text18",style:{height:"60px",margin:"25px auto 0 auto",verticalAlign:"middle",lineHeight:"50px"}},React.createElement("img",{style:{width:"50px",height:"50px",margin:"0 20px 0 65px"},src:"../images/"+(3==this.state.mode?"sub":"add")+".png"}),"联系方式"),React.createElement("div",{style:{width:"65px"}},t.mode3?React.createElement("img",{style:{width:"39px",height:"30px",marginTop:"35px",float:"right"},src:"../images/filled.png"}):null)),3!=this.state.mode?null:React.createElement("div",{className:"div"},React.createElement("div",{className:"form-item text16"},React.createElement("div",{className:"form-item-label"},React.createElement("span",{style:{color:"red"}},"*"),"联系地址"),React.createElement("div",{className:"form-item-widget"},React.createElement("input",{className:"mt-1",ref:"address",defaultValue:t.address,placeholder:"请输入联系地址"}))),React.createElement("div",{className:"form-item text16"},React.createElement("div",{className:"form-item-label"},"乡镇（街道）"),React.createElement("div",{className:"form-item-widget"},React.createElement("input",{className:"mt-1",ref:"address1",defaultValue:t.address1,placeholder:"请输入乡镇（街道）"}))),React.createElement("div",{className:"form-item text16"},React.createElement("div",{className:"form-item-label"},"村（社区）"),React.createElement("div",{className:"form-item-widget"},React.createElement("input",{className:"mt-1",ref:"address2",defaultValue:t.address2,placeholder:"请输入村（社区）"}))),React.createElement("div",{className:"form-item text16"},React.createElement("div",{className:"form-item-label"},"邮政编码"),React.createElement("div",{className:"form-item-widget"},React.createElement("input",{className:"mt-1",ref:"zipcode",defaultValue:t.zipcode,placeholder:"请输入邮政编码"}))),this.state.verify.zipcode?React.createElement("div",{className:"form-alert"},this.state.verify.zipcode):null,React.createElement("div",{className:"form-item text16"},React.createElement("div",{className:"form-item-label",style:{width:"670px"}},"联系方式（手机或者电话二者选其一）")),React.createElement("div",{className:"form-item text16"},React.createElement("div",{className:"form-item-label"},"电话"),React.createElement("div",{className:"form-item-widget"},React.createElement("input",{className:"mt-1",ref:"telephone",defaultValue:t.telephone,placeholder:"请输入电话 例：000-12345678"}))),React.createElement("div",{className:"form-item text16"},React.createElement("div",{className:"form-item-label"},React.createElement("span",{style:{color:"red"}},"*"),"手机"),React.createElement("div",{className:"form-item-widget"},React.createElement("input",{className:"mt-1",ref:"mobile",defaultValue:t.mobile,placeholder:"请输入手机"}))),React.createElement("div",{className:"form-item text16"},React.createElement("div",{className:"form-item-label"},"电子邮箱"),React.createElement("div",{className:"form-item-widget"},React.createElement("input",{className:"mt-1",ref:"email",defaultValue:t.email,placeholder:"请输入电子邮箱"}))),React.createElement("div",{className:"form-item text16"},React.createElement("div",{className:"form-item-label"},"QQ号码"),React.createElement("div",{className:"form-item-widget"},React.createElement("input",{className:"mt-1",ref:"qq",defaultValue:t.qq,placeholder:"请输入QQ号码"}))),React.createElement("div",{className:"form-item text16"},React.createElement("div",{className:"form-item-label"},"微信号码"),React.createElement("div",{className:"form-item-widget"},React.createElement("input",{className:"mt-1",ref:"wechat",defaultValue:t.wechat,placeholder:"请输入微信号码"}))),React.createElement("div",{className:"form-item text16"},React.createElement("img",{className:"mt-1 ml-auto mr-3",style:{width:"120px",height:"60px"},src:"../images/finish.png",onClick:this.save.bind(this)}))),React.createElement("div",{className:"divx bg-white pl-3 pr-3",style:{height:"100px",marginTop:"20px",textAlign:"center"},onClick:function(t){e.setState({mode:4==e.state.mode?0:4})}},React.createElement("div",{className:"divx text18",style:{height:"60px",margin:"25px auto 0 auto",verticalAlign:"middle",lineHeight:"50px"}},React.createElement("img",{style:{width:"50px",height:"50px",margin:"0 20px 0 65px"},src:"../images/"+(4==this.state.mode?"sub":"add")+".png"}),"其他信息"),React.createElement("div",{style:{width:"65px"}},t.mode4?React.createElement("img",{style:{width:"39px",height:"30px",marginTop:"35px",float:"right"},src:"../images/filled.png"}):null)),4!=this.state.mode?null:React.createElement("div",{className:"div"},React.createElement("div",{className:"form-item text16"},React.createElement("img",{className:"mt-1 ml-auto mr-3",style:{width:"120px",height:"60px"},src:"../images/finish.png",onClick:this.save.bind(this)}))),React.createElement("div",{style:{backgroundColor:"#ff3333",borderRadius:"10px",margin:"20px",lineHeight:"70px",height:"70px",width:SIZE-40+"px",textAlign:"center",color:"#ffffff"},onClick:this.deleteInsurant.bind(this)},"删除"),React.createElement("div",{style:{height:"120px"}}),React.createElement("div",{className:"bottom text18 tc-primary"},React.createElement("div",{className:"ml-3 mr-auto"},React.createElement("img",{className:"mt-2",style:{width:"220px",height:"60px"},src:"../images/btn-scan.png",onClick:this.getIdCardImg.bind(this)})),React.createElement("div",{className:"mr-3",onClick:this.next.bind(this)},"投保计划")))}}]),t}();$(document).ready(function(){ReactDOM.render(React.createElement(i,null),document.getElementById("root"))})}});