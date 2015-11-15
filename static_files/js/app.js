//@Version 0.1.1

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
		signup = false;
		}
    });
	
	$('.signup').click(function(){
    if (!signup){
      $('.signup-container').animate({top: "95%"}, 400);
	  $('.body').css({'-webkit-filter': 'blur(15px)'});
	  $('.nav').css({'-webkit-filter': 'blur(15px)'});
	  $('.toggle-button').css({'-webkit-filter': 'blur(15px)'});
		}
    });
	
	$('.signup-container').hover(function(){
    if (!signup){
      signup=true;
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
               //profile: $("#Sign-up-Profile").val()
             },
      success: function( data ) {
        //console.log("You received some data!", data);
        if (data == 'OK') {
          console.log("user created Yeah!");
          $("#information").html("Success: user created!");
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
          console.log(data);
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