$(function(){
	$('#loading').dialog({
		autoOpen:false,
		width:180,
		height:50,
		modal:true,
		closeOnEscape:false,
		draggable:false,
		resizable:false,
	}).parent().find('.ui-widget-header').hide();
	//$('input[type=button]').click(function(){
		$('input[type=button]').click(function(){
			//alert($(this).val());
						
		$.ajax({
			type:'POST',
			url:ajax_url,
			data:"info="+this.value+"&num="+$(this).parent().parent().children()[0].innerText,
			beforeSend:function(){
				$('#loading').dialog('open').html('预约中...');
			},
			 success: function(msg){
     					$('#loading').css('background','url('+public+'/images/ok.png) no-repeat 20px center').html('预约成功...');
						setTimeout(function(){
						$('#loading').dialog('close');
						$('#create_work_plan_div').dialog('close');
						$('#loading').css('background','url('+public+'/images/loading.gif) no-repeat 20px center').html('预约中...');
						},1000);
						
   				}

		});
		if($(this).val()=='预约'){
							//alert('0');
							$(this).val('取消');
						}else if($(this).val()=='取消'){
							//alert('1');
						$(this).val('预约');
						}
		
	});
	
});