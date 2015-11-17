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
    if (document.cookie != null) {
		var info = document.cookie.split(" ");
       $.ajax({
		  url: "users/login/" + info[0] + "/" + info[1],
		  type: "GET",
		  dataType : "json",
		  success: function( data ) {
			if (data.username) {
			  console.log("Success: login as " + data.username);
			  window.location.href = "http://www.google.com";
			}
			else if (data.error){
			  $("#information").html("Error: " + data.error);
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

  $("#Sign-up-submit").click(function() {
    $.ajax({
      url: "users/",
      type: "POST",
      dataType : "text",
      data : { username: $("#username").val(),
               password: $("#password").val()
               //profile: $("#Sign-up-Profile").val()
             },
      success: function( data ) {
        //console.log("You received some data!", data);
        if (data == 'OK') {
          console.log("user created Yeah!");
          //success then create cookie
		  setCookie();
        }
        else {
          console.log(data);
          $("#information").html(data);
        }
      },
      error: function(){
        console.log("There is an error");
      }
    });
  });
  
  $("#Log-in-submit").click(function() {
    $.ajax({
      url: "users/login/" + $("#username-log-in").val() + "/" + $("#password-log-in").val(),
      type: "GET",
      dataType : "json",
      success: function( data ) {
        //console.log("You received some data!");
        if (data.username) {
          console.log("Success: login");
          $("#information").html("Success: login as " + data.username);
          //success then create cookie
		  setCookieLogin();
        }
        else if (data.error){
          $("#information").html("Error: " + data.error);
          console.log("Error: ", data.error);
        }
      },
      error: function(){
        console.log("There is an error");
      }
    });
  });

$(document).ready(main);