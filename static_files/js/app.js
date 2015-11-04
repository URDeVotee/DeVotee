//@Version 0.1.1

// $(document).ready(function() {
//   $(document).ajaxError(function() {
//     console.log("There is an error");
//   });

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
  
  $("#Sign-in-submit").click(function() {
    $.ajax({
      url: "users/login/" + $("#username").val() + "/" + $("#password").val(),
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

