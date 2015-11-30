//@Version 0.9.0
var age_select = false;
var occupation_select = false;
var gender_select = false;
var age_value="";
var occupation_value="";
var gender_value="";
var flip=false;
var result = [];

var abortion = {
    head:"ABORTION",
    detail:"Unrestricted Right",
    age_weight:1,
    age:["YOUNG ADULT","ADULT","MIDDLE AGE","SENIOR CITIZEN"],
    occupation_weight:2,
    occupation:["UNEMPLOYED","STUDENT","BLUE-COLLAR","WHITE-COLLAR","RETIRED"],
    gender_weight:3,
    gender:["FEMALE"],
    score:0
};

var female_employee = {
    head:"FEMALE EMPLOYEE",
    detail:"Legally Require More",
    age_weight:1,
    age:["YOUNG ADULT","ADULT","MIDDLE AGE"],
    occupation_weight:2,
    occupation:["UNEMPLOYED","STUDENT","BLUE-COLLAR","WHITE-COLLAR"],
    gender_weight:3,
    gender:["FEMALE"]
};

var same_sex_marriage = {
	head:"SAME-SEX MARRIAGE",
    detail:"Legal and Natrual",
    age_weight:3,
    age:["ADULT","MIDDLE AGE","SENIOR CITIZEN"],
    occupation_weight:2,
    occupation:["STUDENT","BLUE-COLLAR","WHITE-COLLAR","MANAGER","ENTREPRENEUR","RETIRED"],
    gender_weight:1,
    gender:["MALE","FEMALE"],
    score:0
}

var god = {
	head:"GOD",
	detail:"in the Public Sphere",
	age_weight:3,
    age:["MIDDLE AGE","SENIOR CITIZEN"],
    occupation_weight:2,
    occupation:["WHITE-COLLAR","MANAGER","ENTREPRENEUR","RETIRED"],
    gender_weight:1,
    gender:["MALE","FEMALE"],
    score:0
}

var epa_regulation = {
	head:"EPA REGULATION",
	detail:"Too Restrictive",
	age_weight:2,
    age:["YOUNG ADULT","ADULT"],
    occupation_weight:3,
    occupation:["STUDENT","ENTREPRENEUR"],
    gender_weight:1,
    gender:["MALE","FEMALE"],
    score:0
}

var crime = {
	head:"CRIME",
	detail:"Stricter Punishment",
	age_weight:3,
    age:["MIDDLE AGE","SENIOR CITIZEN"],
    occupation_weight:2,
    occupation:["UNEMPLOYED","STUDENT","BLUE-COLLAR","WHITE-COLLAR","MANAGER","ENTREPRENEUR","RETIRED"],
    gender_weight:1,
    gender:["MALE","FEMALE"],
    score:0
}

var gun = {
	head:"GUN OWNERSHIP",
	detail:"ABSOLUTE RIGHT",
	age_weight:3,
    age:["ADULT","MIDDLE AGE"],
    occupation_weight:1,
    occupation:["BLUE-COLLAR","WHITE-COLLAR"],
    gender_weight:2,
    gender:["MALE"],
    score:0
}

var obamacare = {
	head:"OBAMACARE",
	detail:"EXPAND",
	age_weight:2,
    age:["ADULT","MIDDLE AGE","SENIOR CITIZEN"],
    occupation_weight:3,
    occupation:["UNEMPLOYED","BLUE-COLLAR","WHITE-COLLAR","RETIRED"],
    gender_weight:1,
    gender:["MALE","FEMALE"],
    score:0
}

var green_energy = {
	head:"GREEN ENERGY",
	detail:"Prioritize",
	age_weight:2,
    age:["YOUNG ADULT","ADULT"],
    occupation_weight:3,
    occupation:["STUDENT","ENTREPRENEUR"],
    gender_weight:1,
    gender:["MALE","FEMALE"],
    score:0
}

var marijuana = {
	head:"MARIJUANA",
	detail:"Gateway Drug",
	age_weight:2,
    age:["YOUNG ADULT","ADULT","MIDDLE AGE","SENIOR CITIZEN"],
    occupation_weight:3,
    occupation:["STUDENT","WHITE-COLLAR","MANAGER","ENTREPRENEUR","RETIRED"],
    gender_weight:1,
    gender:["MALE","FEMALE"],
    score:0
}

var stimulus = {
	head:"STIMULUS",
	detail:"Better than Market-Led",
	age_weight:2,
    age:["ADULT","MIDDLE AGE","SENIOR CITIZEN"],
    occupation_weight:3,
    occupation:["UNEMPLOYED","BLUE-COLLAR","WHITE-COLLAR","MANAGER","ENTREPRENEUR"],
    gender_weight:1,
    gender:["MALE","FEMALE"],
    score:0
}

var wealthy_tax = {
	head:"WEALTHY TAX",
	detail:"Higher",
	age_weight:2,
    age:["ADULT","MIDDLE AGE"],
    occupation_weight:3,
    occupation:["UNEMPLOYED","BLUE-COLLAR","WHITE-COLLAR","MANAGER","ENTREPRENEUR"],
    gender_weight:1,
    gender:["MALE","FEMALE"],
    score:0
}

var illegal_aliens = {
	head:"ILLEGAL ALIENS",
	detail:"Pathway to Citizenship",
	age_weight:3,
    age:["ADULT","MIDDLE AGE","SENIOR CITIZEN"],
    occupation_weight:2,
    occupation:["UNEMPLOYED","BLUE-COLLAR","MANAGER","ENTREPRENEUR"],
    gender_weight:1,
    gender:["MALE","FEMALE"],
    score:0
}

var social_security = {
	head:"SOCIAL SECURITY",
	detail:"Privatize",
	age_weight:3,
    age:["ADULT","MIDDLE AGE","SENIOR CITIZEN"],
    occupation_weight:2,
    occupation:["UNEMPLOYED","BLUE-COLLAR","MANAGER","ENTREPRENEUR"],
    gender_weight:1,
    gender:["MALE","FEMALE"],
    score:0
}

var free_trade = {
	head:"FREE TRADE",
	detail:"Support & Expand",
	age_weight:2,
    age:["ADULT","MIDDLE AGE"],
    occupation_weight:3,
    occupation:["UNEMPLOYED","BLUE-COLLAR","MANAGER","ENTREPRENEUR"],
    gender_weight:1,
    gender:["MALE","FEMALE"],
    score:0
}

var military = {
	head:"MILITARY",
	detail:"Expand",
	age_weight:2,
    age:["ADULT","MIDDLE AGE","SENIOR CITIZEN"],
    occupation_weight:3,
    occupation:["WHITE-COLLAR","MANAGER","ENTREPRENEUR","RETIRED"],
    gender_weight:1,
    gender:["MALE","FEMALE"],
    score:0
}

var american_exceptionalism = {
	head:"AMERICAN EXCEPTIONAL",
	detail:"SUPPORT",
	age_weight:2,
    age:["ADULT","MIDDLE AGE","SENIOR CITIZEN"],
    occupation_weight:3,
    occupation:["BLUE-COLLAR","WHITE-COLLAR","MANAGER","ENTREPRENEUR","RETIRED"],
    gender_weight:1,
    gender:["MALE","FEMALE"],
    score:0
}

var foreign_entanglements = {
	head:"FOREIGN ENTANGLE",
	detail:"Avoid",
	age_weight:2,
    age:["ADULT","MIDDLE AGE","SENIOR CITIZEN"],
    occupation_weight:3,
    occupation:["WHITE-COLLAR","MANAGER","ENTREPRENEUR","RETIRED"],
    gender_weight:1,
    gender:["MALE","FEMALE"],
    score:0
}

var topics = [abortion, female_employee, same_sex_marriage, god, epa_regulation, crime, gun, obamacare, green_energy, marijuana, stimulus, wealthy_tax,
illegal_aliens, social_security, free_trade, military, american_exceptionalism, foreign_entanglements];

var main = function() {
	$('body').fadeOut(0);
    $('body').fadeIn(400);
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
	
	$('.detail').fadeOut(300);
	$('.submit').fadeOut(0);

	$('#submit').click(function(event){
		info_flyout();
		if (!(age_select&&occupation_select&&gender_select)){
			setTimeout(function() {
				info_incomplete();
			}, 2000);
		} else {
			setTimeout(function() {
				priority(age_value,occupation_value,gender_value);
				appendtopic();
				$('.above').hover(function(e){
					currentElement = $(e.currentTarget);
					currentElement.fadeOut(300);
				});

				$('.below').mouseleave(function(){
					$('.above').fadeIn(300);
				});

				drag();
				$('.detail').fadeIn(1000);
				$('.submit').fadeIn(1000);
				$('.background').css({'-webkit-filter': 'blur(1px)'});
			}, 2000);
		}
    });

    $('.logout').click(function(event){
    	$.ajax({
		    url: "users/logout",
		    type: "GET",
		    dataType: "json",

		    success: function(data){
		      $('body').fadeOut(200);
                setTimeout(function() {
                    document.cookie = document.cookie + ";expires=Thu, 01 Jan 1970 00:00:00 GMT";
                    window.location = data.redirect;
                }, 200);
		    },
		    error: function(){
		      console.log("direction error");
		    }
		});
    })

    $('.submit').click(function(event){
    	upload();
    	$.ajax({
		    url: "/vote/submit",
		    type: "POST",
		    dataType: "json",
		    data: { 
		    	data: result
	        },

		    success: function(data){
		      $('body').fadeOut(200);
                setTimeout(function() {
                    document.cookie = document.cookie + ";expires=Thu, 01 Jan 1970 00:00:00 GMT";
                    window.location = data.redirect;
                }, 200);
			},
		    error: function(){
		      console.log("No Candidate");
		    }
		});
    })
}

function vague(){
	$('.background').css({'-webkit-filter': 'blur(2px)'});
}

function info_flyin(){
	$('.basic_info_ticket').animate({top: "1%"}, 1000);
	$('.background').css({'-webkit-filter': 'blur(2px)'});
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

function priority(age,occupation,gender){
	var arrayLength = topics.length;
	for (var i = 0; i < arrayLength; i++) {
		var age_score = 0;
		var occupation_score = 0;
		var gender_score = 0;
	    if ($.inArray(age,topics[i].age)!=-1){
	    	age_score = topics[i].age_weight;
	    }
	    if ($.inArray(occupation,topics[i].occupation)!=-1){
	    	occupation_score = topics[i].occupation_weight;
	    }
	    if ($.inArray(gender,topics[i].gender)!=-1){
	    	gender_score = topics[i].gender_weight;
	    }
	    topics[i].score=age_score+occupation_score+gender_score;
	    // console.log(topics[i].head);
	    // console.log(topics[i].score);
	}
	topics.sort(function(topic1,topic2){
		if(topic1.score>topic2.score){
			return -1;
		} else return 1;
	});
}

function appendtopic(){
	for (var i = 0; i < 8; i++) {
		$(".topics").append('<li><div class="above"><h1>'+topics[i].head+'</h1><p>'+topics[i].detail+'</p></div><div class="below abortion"><p class="text">Neutrual</p><div class="attitude"><div class="range"><input class="attitude-range" type="range" min="-50" max="50"></div></div></div></li>');
	}
}

function drag(){
	$('.attitude-range').mousemove(function(event){
		var target = event.target;
		var val = target.value;
		//alert(attitude);
		if (val<=0){
			var red = val/(-50)*240;
			var green = (50-(-val))/50*240;
			var blue = 0;
		}else {
			var red = 0;
			var green = (50-val)/50*240;
			var blue = val/(50)*240;
		}
		var text = $(this).parents('.below').children('.text')
		switch (true) {
			case (-50 <= val &&  val < -30): text.html("Strongly Oppose");break;
			case (-30 <= val &&  val < -10): text.html("Oppose");break;
			case (-10 <= val &&  val < 10): text.html("Neutrual");break;
			case (10 <= val &&  val < 30): text.html("Favor");break;
			case (30 <= val &&  val < 50): text.html("Strongly Favor");break;
		}
		$(this).parents('.below').css({
			'background-color': 'rgb('+red+','+green+','+blue+')'
		});
		//alert('rgb('+red+','+green+','+blue+')');
	});
}

function upload(){
	var topicname = $(".above h1");
	var topicattitude = document.getElementsByClassName("attitude-range");
	for (var i = 0; i < 8; i++){
		result.push([topicname[i].innerHTML,topicattitude[i].value]);
	}
}

function onload(){
    $('body').fadeOut(0);
}

$(document).ready(main);