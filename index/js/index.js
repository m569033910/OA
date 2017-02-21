$(function(){
	//alert(login_url);
	//alert($('#login_form'));
	$('#login_form').validate({

		rules:{
			staff_password:{
				remote:{
					url:login_url,
					type:'POST',
					data:{
						staff_username:function(){
							return $("#staff_username").val();
						},
					},
				},
			},
		},
		messages:{
			staff_password:{
				remote:'账号或密码不正确',
			},
		},
	});
});