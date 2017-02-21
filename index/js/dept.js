$(function(){
	$('#create').button();
	$('#create').click(function(){
		$('#dept_div').dialog('open');
	});
	$('#dept_div').dialog({
		autoOpen:false,
		title:'新建部门',
		width:600,
		modal:true,
		resizable:true,
		draggable:true,
		buttons:{
			'确认':function(){$('#dept_form').submit();},
			'取消':function(){$('#dept_div').dialog('close');}
		},
	});
	$('#loading').dialog({
		autoOpen:false,
		width:180,
		height:50,
		modal:true,
		closeOnEscape:false,
		draggable:false,
		resizable:false,
	}).parent().find('.ui-widget-header').hide();
	$('#dept_form').validate({
		submitHandler : function (form) {
			$(form).ajaxSubmit({
				url:ajax_url,
				type:'POST',
				beforeSubmit:function(){
					$('#dept_div').dialog('widget').find('button').eq(1).button('disable');
					$('#loading').dialog('open').html('提交中...');
				},
				success:function(responseText,statusText){
					if(responseText){
						$('#dept_div').dialog('widget').find('button').eq(1).button('enable');		
						$('#loading').css('background','url('+public+'/images/ok.png) no-repeat 20px center').html('新建成功...');
						setTimeout(function(){
						$('#loading').dialog('close');
						$('#dept_div').dialog('close');
						$('#loading').css('background','url('+public+'/images/loading.gif) no-repeat 20px center').html('提交中...');
						},1000);

					}
				}


			})
		},
	});
});