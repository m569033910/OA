$(function(){
	$('#staff_self_msg input').attr('readonly','readonly');
	$('#modi').button();
	$('#modi').click(function(){
		$('#modi_div').dialog('open');
	});
	$('#modi_div').dialog({
		autoOpen:false,
		title:'信息修改',
		width:600,
		modal:true,
		resizable:true,
		draggable:true,
		buttons:{
			'确认':function(){$('#staff_self_msg_form').submit();},
			'取消':function(){$('#modi_div').dialog('close');}
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
	$('#staff_self_msg_form').validate({
		submitHandler : function (form) {
			$(form).ajaxSubmit({
				url:ajax_url,
				type:'POST',
				beforeSubmit:function(){
					$('#modi_div').dialog('widget').find('button').eq(1).button('disable');
					$('#loading').dialog('open').html('提交中...');
				},
				success:function(responseText,statusText){
					if(responseText){
						$('#modi_div').dialog('widget').find('button').eq(1).button('enable');		
						$('#loading').css('background','url('+public+'/images/ok.png) no-repeat 20px center').html('修改成功...');
						setTimeout(function(){
						$('#loading').dialog('close');
						$('#modi_div').dialog('close');
						$('#loading').css('background','url('+public+'/images/loading.gif) no-repeat 20px center').html('提交中...');
						},1000);

					}
				}


			})
		},
	});
});