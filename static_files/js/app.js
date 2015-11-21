//@Version 2.1
var username;
var main = function() {
  opened = false;
  signup = false;
  $('.toggle-button').click(function(){
    if (!opened){
      $('.nav').animate({top: "74px"}, 200);
      $('.toggle-button').animate({top: "74px"}, 200);
      opened = true;
    }
    else {
      $('.nav').animate({top: "-=74px"}, 200);
      $('.toggle-button').animate({top: "-=74px"}, 200);
      opened = false;
    }
    });
	
	$('.container').click(function(){
    if (opened){
      $('.nav').animate({top: "-=74px"}, 200);
      $('.toggle-button').animate({top: "-=74px"}, 200);
      opened = false;
    }else if (signup){
  		$('.signup-container').animate({top: "-=95%"}, 400);
  		$('.body').css({'-webkit-filter': 'blur(5px)'});
  		$('.nav').css({'-webkit-filter': 'blur(0px)'});
  		$('.toggle-button').css({'-webkit-filter': 'blur(0px)'});
  		$('.header').css({'-webkit-filter': 'blur(0px)'});
		signup = false;
		}
    });
	
	$('.signup').click(function(){
    if (!signup){
      $('.signup-container').animate({top: "95%"}, 400);
  	  $('.body').css({'-webkit-filter': 'blur(15px)'});
  	  $('.nav').css({'-webkit-filter': 'blur(15px)'});
  	  $('.toggle-button').css({'-webkit-filter': 'blur(15px)'});
  	  $('.header').css({'-webkit-filter': 'blur(15px)'});
		}
    });
	
	$('.signup-container').hover(function(){
    if (!signup){
      signup=true;
		}
    });
	
}
	
function checkCookie() {
    if (document.cookie != null && document.cookie != "") {
		var info = document.cookie.split("/");
       $.ajax({
		  url: "users/checklogin/",
		  type: "POST",
		  dataType : "json",
      data: { username: info[0],
              password: info[1]
            },
		  success: function( data ) {
			if (data.username) {
			  redirectTo();
			}
			else if (data.error){
			  console.log("Error: ", data.error);
			}
		  },
		  error: function(){
			console.log("There is an error");
		  }
		});
    } else {
        console.log("No cookie");
    }
}

function setCookie() {
	document.cookie = $("#username").val()+"/"+$("#password").val();
}

function setCookieLogin() {
	document.cookie = $("#username-log-in").val()+"/"+$("#password-log-in").val();
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
  $("#Sign-up-submit").click(function() {
    $.ajax({
      url: "users/",
      type: "POST",
      dataType : "text",
      data : { username: $("#username").val(),
               password: $("#password").val()
             },
      success: function( data ) {
        if (data == 'OK') {
          console.log("user created Yeah!");
		      setCookie();
          redirectTo();
        }
        else {
          alert(data);
        }
      },
      error: function(){
        console.log("There is an error");
      }
    });
  });
  

  $("#Log-in-submit").click(function() {
    $.ajax({
      url: "users/checklogin",
      type: "POST",
      dataType : "json",
      data: { username: $("#username-log-in").val(),
              password: $("#password-log-in").val()
            },
      success: function( data ) {
        if (data.username) {
		      setCookieLogin();
          redirectTo();
        }
        else if (data.error){
          alert(data.error);
          console.log("Error: ", data.error);
        }
      },
      error: function(){
        console.log("There is an error");
      }
    });
  });


$(document).ready(main);