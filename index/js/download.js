$(function(){
	$("a[class!='all']").click(function(){
		//alert(public+'/Uploads/'+$('#name').text()+'/'+$(this).parent().parent().children().html());
		$(this).attr('href',public+'/Uploads/'+$('#name').text()+'/'+$(this).parent().parent().children().html());

	});
});