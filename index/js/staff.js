$(function(){
	$('#select_button').button({
		icons:{
			primary:'ui-icon-search'
		}
		});
	$('#select input[type=radio]').button();

	$('#select_button').click(function(){
		$('#select_form').submit();
	});

	$('#create_staff').button().click(function(){
			$('#reg').dialog('open');
	});


	$('#reg').dialog({
		autoOpen:false,
		title:'会员注册',
		buttons:{
			'提交':function(){$('#tform').submit();},
			'取消':function(){$('#reg').dialog('close');}
		},
		width:400,
		height:500,
		show:true,
		hide:true,
		draggable:false,
		resizable:false,
		modal:true,
		closeText:'关闭',
	});

	$('#loading').dialog({
		autoOpen:false,
		width:150,
		height:50,
		modal:true,
		closeOnEscape:false,
		draggable:false,
		resizable:false,
	}).parent().find('.ui-widget-header').hide();

	$("#reg input[type=radio]").button();
	$('#reg input[type=checkbox]').button();
	$('#birthday').datepicker({
		changeMonth:true,
		changeYear:true,
		//showOn:'button',
		yearRange:'1980:2020',
	});
	//$('#reg input[title]').tooltip();
	$('#email').autocomplete({
		delay:0,
		autoFocus:true,
		source:function(request,response){
			var hosts=['qq.com','163.com','sina.com.cn','gmail.com'],
				term=request.term,
				name=term,
				host='',
				ix=term.indexOf('@'),
				result=[];
				result.push(term);
			if(ix>-1){
				name=term.slice(0,ix);
				host=term.slice(ix+1);
			}
			if(name){
				var findhost=(host ? $.grep(hosts,function(value,index){
						return value.indexOf(host)>-1
					}) : hosts),findresult=$.map(findhost,function(value,index){
					return name+'@'+value;
				});
				result=result.concat(findresult);
			}
			response(result);
		},
	});
	$('#tform').validate({
		rules:{
			username:{
				required:true,
				minlength:2,
			},
			password:{
				required:true,
				minlength:4,
				/*remote:{
					url:'a2.php',
					data:{
						username:function(){
							return $("#username").val();
						},
					},
				},*/
			},
			enpassword:{
				required:true,
				equalTo:'#password',
			},
			email:{
				required:true,
				email:true,
			},
			age:{
				digits:true,
			}
		},
		messages:{
			username:{
				required:'用户名不能为空！',
				minlength:'长度不得小于两位！',
				remote:'账号被占用！',
			},
			password:{
				required:'密码不能为空！',
				minlength:'密码不得小于4位！',
				remote:'账号或密码不正确！',
			},
			enpassword:{
				required:'确认密码不能为空！',
				equalTo:'两次密码应保持一致！',
			},
			email:{
				required:'邮箱不能为空！',
				email:'请输入正确的邮箱！',
			},
			age:{
				digits:'请输入正确的年龄！',
			}
		},
		errorLabelContainer:'ol.reg_error',
		wrapper:'li',
		/*showErrors:function(){
			var errors=this.numberOfInvalids();
			if(errors>0){
				//var newheight=errors*20+450;
				//alert(newheight);
				$('#reg').dialog('option','height',550);
			}else{
				$('#reg').dialog('option','height',550);
			}
			this.defaultShowErrors();
		},*/
		submitHandler : function (form) {
			$(form).ajaxSubmit({
				url:ajax_url,
				type:'POST',
				beforeSubmit:function(){
					$('#reg').dialog('widget').find('button').eq(1).button('disable');
					$('#loading').dialog('open').html('注册中...');
				},
				success:function(responseText,statusText){
					if(responseText){
						$('#reg').dialog('widget').find('button').eq(1).button('enable');		
						$('#loading').css('background','url('+public+'/images/success.gif) no-repeat 20px center').html('注册成功...');
						setTimeout(function(){
						$('#loading').dialog('close');
						$('#reg').dialog('close');
						$('#tform').resetForm();
						$('#reg span.star').removeClass('ok').html('*');
						$('#loading').css('background','url('+public+'/images/loading.gif) no-repeat 20px center').html('注册中...');
						},1000);
					}
				},
			});
		},
		highlight:function(element,errorClass){
		//	alert('a');
			$(element).parent().find('span').removeClass('ok').html('*');
		},
		unhighlight:function(element,errorClass){
			$(element).parent().find('span').html('&nbsp').addClass('ok');
		},
	});
});