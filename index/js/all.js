$(function(){
	$('a').click(function(){
		//alert(public+'/Uploads/all/'+$(this).parent().parent().children().html());
		$(this).attr('href',public+'/Uploads/all/'+$(this).parent().parent().children().html());

	});
});