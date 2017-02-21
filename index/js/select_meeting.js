$(function(){
	

	$('#create_work_plan_div').dialog({
		autoOpen:false,
		title:'新建会议',
		draggable:false,
		width:850,
		height:500,
		resizable:false,
		buttons:{
			'提交':function(){$('#create_work_plan').submit();},
			'取消':function(){$('#create_work_plan_div').dialog('close');},
		},
	});
	$('#me_start_time,#me_stop_time').datepicker({
		changeMonth:true,
		changeYear:true,
		//showOn:'button',
		yearRange:'1980:2020',
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
	$('#button').button();
	$('#button').click(function(){
		$('#create_work_plan_div').dialog('open');
		
	});
	$('#create_work_plan').validate({
		submitHandler : function (form) {
			$(form).ajaxSubmit({
				url:ajax_url,
				type:'POST',
				beforeSubmit:function(){
					$('#create_work_plan_div').dialog('widget').find('button').eq(1).button('disable');
					$('#loading').dialog('open').html('提交中...');
				},
				success:function(responseText,statusText){
					if(responseText){
						$('#create_work_plan_div').dialog('widget').find('button').eq(1).button('enable');		
						$('#loading').css('background','url('+public+'/images/ok.png) no-repeat 20px center').html('新建成功...');
						setTimeout(function(){
						$('#loading').dialog('close');
						$('#create_work_plan_div').dialog('close');
						$('#loading').css('background','url('+public+'/images/loading.gif) no-repeat 20px center').html('提交中...');
						},1000);

					}
				}


			})
		},
	});
	$('#modi_button').button().click(function(){
		$('#modi_meeting').submit();
	});

});