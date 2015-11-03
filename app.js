@Version 0.1.1

$(document).ready(function() {
  $(document).ajaxError(function() {
    alert("Sorry, there was a problem!");
  });

  $("#Sign-up-submit").click(function() {
    $.ajax({
      url: "users/",
      type: "POST",
      dataType : "text", 
      data : { username: $("#Sign-up-UserBox").val(),
               password: $("#Sign-up-PasswordBox").val(),
               profile: $("#Sign-up-Profile").val()
             },
      success: function( data ) {
        console.log("You received some data!", data);
        if (data == 'OK') {
          
        } else {
          alert("Sorry, not valid!");
        }
      },
    });
  });
  
  $("#Sign-in-submit").click(function() {
    $.ajax({
      url: "users/" + $("#Sign-in-UserBox").val(),
      type: "GET",
      dataType : "json", 
      success: function( data ) {
        console.log("You received some data!", data);
        if (data.username) {
          
        } else {
          alert("Sorry, no such a user");
        }
      },
    });
  });
});
