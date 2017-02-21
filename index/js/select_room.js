$(function(){
	$('#create_room_div').dialog({
		autoOpen:false,
		title:'新建会议室',
		draggable:false,
		width:850,
		height:500,
		resizable:false,
		buttons:{
			'提交':function(){$('#create_room').submit();},
			'取消':function(){$('#create_room_div').dialog('close');},
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
	$('#button').button();
	
  
	$('#button').click(function(){
		$('#create_room_div').dialog('open');
		
	});
	$('#create_room').validate({
		submitHandler : function (form) {
			$(form).ajaxSubmit({
				url:ajax_url,
				type:'POST',
				beforeSubmit:function(){
					$('#create_room_div').dialog('widget').find('button').eq(1).button('disable');
					$('#loading').dialog('open').html('提交中...');
				},
				success:function(responseText,statusText){
					if(responseText){
						$('#create_room_div').dialog('widget').find('button').eq(1).button('enable');		
						$('#loading').css('background','url('+public+'/images/ok.png) no-repeat 20px center').html('新建成功...');
						setTimeout(function(){
						$('#loading').dialog('close');
						$('#create_room_div').dialog('close');
						$('#loading').css('background','url('+public+'/images/loading.gif) no-repeat 20px center').html('提交中...');
						},1000);

					}
				}


			})
		},
	});
});