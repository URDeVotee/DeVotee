//@Version 0.9.0
var age_select = false;
var occupation_select = false;
var gender_select = false;
var age_value="";
var occupation_value="";
var gender_value="";

var main = function() {
	
	setTimeout(function() {
		info_flyin();
	}, 1500);
	
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
		      dataType : "json",
		      success: function( data ) {
		        if (data == 'OK') {
		          console.log("Get your survey");
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

    $('logout').click(function(event){
    	$.ajax({
		      url: "/user/logout",
		      type: "GET",
		      dataType : "json",
		      success: function( data ) {
		      	document.cookie = "";
		        redirectTo();
		      },
		      error: function(){
		        console.log("There is an error in LOGOUT");
		      }
		    });
    })
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

function redirectTo(){
  $.ajax({
    url: "users/login",
    type: "GET",
    dataType: "json",

    success: function(data){
      if (typeof data.redirect == 'string')
        window.location = data.redirect;
      else
        console.log("not a string");
    },
    error: function(){
      console.log("direction error");
    }
  });
}

$(document).ready(main);