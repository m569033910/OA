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
});