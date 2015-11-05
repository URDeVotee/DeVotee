//@Version 0.1.1

var main = function() {
  opened = false;
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