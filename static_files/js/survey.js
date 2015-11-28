//@Version 0.9.0
var age_select = false;
var occupation_select = false;
var gender_select = false;
var age_value="";
var occupation_value="";
var gender_value="";
var flip=false;

var main = function() {
	
	// setTimeout(function() {
	// 	info_flyin();
	// }, 1500);
	
	$('.container-age .option').click(function(event){
		if (!age_select) {
			age_select = true;
			var target = event.target;
			$(target).css({
				'background-color': 'rgb(102, 102, 102)',
				'color': 'rgba(255, 255, 128, 0.95)'
			});
			$('#age p span').css({
				'background-color': 'rgba(255, 255, 128, 0.95)',
				'color': 'black'
			});
			age_value = target.innerText;
		}
		else {
			$('.container-age .option').css({
				'background-color': 'rgba(217, 217, 217,0.4)',
				'color': 'black'
			});
			var target = event.target;
			$(target).css({
				'background-color': 'rgb(102, 102, 102)',
				'color': 'rgba(255, 255, 128, 0.95)'
			});
			age_value = target.innerText;
		}
    });
	
	$('.container-occupation .option').click(function(event){
		if (!occupation_select) {
			occupation_select = true;
			var target = event.target;
			$(target).css({
				'background-color': 'rgb(102, 102, 102)',
				'color': 'rgba(255, 255, 128, 0.95)'
			});
			$('#occupation p span').css({
				'background-color': 'rgba(255, 255, 128, 0.95)',
				'color': 'black'
			});
			occupation_value = target.innerText;
		}
		else {
			$('.container-occupation .option').css({
				'background-color': 'rgba(217, 217, 217,0.4)',
				'color': 'black'
			});
			var target = event.target;
			$(target).css({
				'background-color': 'rgb(102, 102, 102)',
				'color': 'rgba(255, 255, 128, 0.95)'
			});
			occupation_value = target.innerText;
		}
    });
	
	$('.container-gender .option').click(function(event){
		if (!gender_select) {
			gender_select = true;
			var target = event.target;
			$(target).css({
				'background-color': 'rgb(102, 102, 102)',
				'color': 'rgba(255, 255, 128, 0.95)'
			});
			$('#gender p span').css({
				'background-color': 'rgba(255, 255, 128, 0.95)',
				'color': 'black'
			});
			gender_value = target.innerText;
		}
		else {
			$('.container-gender .option').css({
				'background-color': 'rgba(217, 217, 217,0.4)',
				'color': 'black'
			});
			var target = event.target;
			$(target).css({
				'background-color': 'rgb(102, 102, 102)',
				'color': 'rgba(255, 255, 128, 0.95)'
			});
			gender_value = target.innerText;
		}
    });
	
	$('#submit').click(function(event){
		info_flyout();
		if (!(age_select&&occupation_select&&gender_select)){
			setTimeout(function() {
				info_incomplete();
			}, 2000);
		} else {
			$.ajax({
		      url: "/submit",
		      type: "POST",
		      dataType : "text",
		      data : { age: age_value,
		               occupation: occupation_value,
		               gender: gender_value
		             },
		      success: function( data ) {
		        if (data == 'OK') {
		          setTimeout(function() {
						portal();
					}, 1500);
		        }
		        else {
		          
		        }
		      },
		      error: function(){
		        console.log("There is an error in survey");
		      }
		    });
		}
    });

    $('.logout').click(function(event){
    	$.ajax({
		    url: "users/logout",
		    type: "GET",
		    dataType: "json",

		    success: function(data){
		      if (typeof data.redirect == 'string'){
		      	document.cookie = document.cookie + ";expires=Thu, 01 Jan 1970 00:00:00 GMT";
		        window.location = data.redirect;
		    }
		      else
		        console.log("not a string");
		    },
		    error: function(){
		      console.log("direction error");
		    }
		});
    })

    $('.above').hover(function(e){
		currentElement = $(e.currentTarget);
		currentElement.fadeOut(300);
	});

	$('.below').mouseleave(function(){
		$('.above').fadeIn(300);
	});

	$('#attitude-range').mousemove(function(event){
		var target = event.target;
		var val = target.value;
		//alert(attitude);
		if (val<=0){
			var red = val/(-50)*230;
			var green = (50-(-val))/50*230;
			var blue = 0;
		}else {
			var red = 0;
			var green = (50-val)/50*230;
			var blue = val/(50)*230;
		}
		var text = $(this).parents('.below').children('.text')
		switch (true) {
			case (-50 <= val &&  val < -30): text.html("Strongly Oppose");break;
			case (-30 <= val &&  val < -10): text.html("Oppose");break;
			case (-10 <= val &&  val < 10): text.html("Neutral");break;
			case (10 <= val &&  val < 30): text.html("Favor");break;
			case (30 <= val &&  val < 50): text.html("Strongly Favor");break;
		}
		$(this).parents('.below').css({
			'background-color': 'rgb('+red+','+green+','+blue+')'
		});
		//alert('rgb('+red+','+green+','+blue+')');
	});
}


function info_flyin(){
	$('.basic_info_ticket').animate({top: "1%"}, 1000);
	$('.background').css({'-webkit-filter': 'blur(1px)'});
}

function info_flyout(){
	$('.basic_info_ticket').animate({top: "-180%"}, 800);
	$('.background').css({'-webkit-filter': 'blur(0px)'});
	var target = event.target;
	$(target).css({
		'background-color': 'rgb(102, 102, 102)',
		'color': 'rgba(255, 255, 128, 0.95)'
	});
}

function info_incomplete(){
	if (!age_select){
		$('#age p span').css({
				'background-color': 'red',
				'color': 'rgba(255, 255, 128,0.95)'
			});
	}
	if (!occupation_select){
		$('#occupation p span').css({
			'background-color': 'red',
			'color': 'rgba(255, 255, 128,0.95)'
		});
	}
	if (!gender_select){
		$('#gender p span').css({
			'background-color': 'red',
			'color': 'rgba(255, 255, 128,0.95)'
		});
	}
	$('.background').css({'-webkit-filter': 'blur(1px)'});
	$('.basic_info_ticket').animate({top: "1%"}, 800);
}

function portal(){
	window.location.href = "Votee.html";
}

$(document).ready(main);