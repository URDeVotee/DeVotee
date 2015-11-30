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
    detail:"Respect and Natrual",
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
	setTimeout(function() {
            $("body").css('visibility','visible');
        }, 100);
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
				$('.above').mouseenter(function(e){
					currentElement = $(e.currentTarget);
					currentElement.fadeOut(200);
					currentElement.parents('li').children('.below').animate({
						width: "220px",
			            height: "220px"
			        }, 200
					);
				});

				$('.below').mouseleave(function(){
					$('.above').fadeIn(200);
					$('.below').animate({
						width: "180px",
			            height: "180px"
			        }, 200
					);
				});

				selection_handler();
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
		$(".topics").append('<li><div class="above"><h2 id="head">'+topics[i].head+'</h1><p>'+topics[i].detail+'</p></div><div class="below abortion"><p class="text">Neutral</p><div class="attitude"><div class="range"><input class="attitude-range" type="range" min="-50" max="50"></div></div></div></li>');
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

function selection_handler(){
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
		var text = $(this).parents('.below').children('.text');
		var topic = $(this).parents('li').children('.above').children('h2').html();
		switch(topic) {
		    case "ABORTION":
		    	switch (true) {
					case (-50 <= val &&  val < -30): text.html("Immoral Murder");break;
					case (-30 <= val &&  val < -10): text.html("Fetus's Right");break;
					case (-10 <= val &&  val < 10): text.html("Neutral");break;
					case (10 <= val &&  val < 30): text.html("With Restriction");break;
					case (30 <= val &&  val < 50): text.html("Right & Freedom");break;
				}
		        break;
		    case "FEMALE EMPLOYEE":
		    	switch (true) {
					case (-50 <= val &&  val < -30): text.html("No Intervention");break;
					case (-30 <= val &&  val < -10): text.html("No Enforce");break;
					case (-10 <= val &&  val < 10): text.html("Neutral");break;
					case (10 <= val &&  val < 30): text.html("Favored");break;
					case (30 <= val &&  val < 50): text.html("Law Enforce");break;
				}
		        break;
		    case "SAME-SEX MARRIAGE":
		    	switch (true) {
					case (-50 <= val &&  val < -30): text.html("Immoral");break;
					case (-30 <= val &&  val < -10): text.html("Not Marriage");break;
					case (-10 <= val &&  val < 10): text.html("Neutral");break;
					case (10 <= val &&  val < 30): text.html("Equal Respect");break;
					case (30 <= val &&  val < 50): text.html("Absolutely Equal");break;
				}
		        break;
		    case "GOD":
		    	switch (true) {
					case (-50 <= val &&  val < -30): text.html("Violate Constitution");break;
					case (-30 <= val &&  val < -10): text.html("Religious Diverse");break;
					case (-10 <= val &&  val < 10): text.html("Neutral");break;
					case (10 <= val &&  val < 30): text.html("More Exposure");break;
					case (30 <= val &&  val < 50): text.html("American Value");break;
				}
		        break;
		    case "EPA REGULATION":
		    	switch (true) {
					case (-50 <= val &&  val < -30): text.html("Nature First");break;
					case (-30 <= val &&  val < -10): text.html("Same Right");break;
					case (-10 <= val &&  val < 10): text.html("Neutral");break;
					case (10 <= val &&  val < 30): text.html("Huamn First");break;
					case (30 <= val &&  val < 50): text.html("Human Domain");break;
				}
		        break;
		    case "CRIME":
		    	switch (true) {
					case (-50 <= val &&  val < -30): text.html("Loose Law");break;
					case (-30 <= val &&  val < -10): text.html("Effectively Enforce");break;
					case (-10 <= val &&  val < 10): text.html("Neutral");break;
					case (10 <= val &&  val < 30): text.html("Stric Law");break;
					case (30 <= val &&  val < 50): text.html("Strictly Enforce");break;
				}
		        break;
		    case "GUN OWNERSHIP":
		    	switch (true) {
					case (-50 <= val &&  val < -30): text.html("Limit Guns");break;
					case (-30 <= val &&  val < -10): text.html("Strict Registration");break;
					case (-10 <= val &&  val < 10): text.html("Neutral");break;
					case (10 <= val &&  val < 30): text.html("More Restriction");break;
					case (30 <= val &&  val < 50): text.html("Absolute Right");break;
				}
		        break;
		    case "OBAMACARE":
		    	switch (true) {
					case (-50 <= val &&  val < -30): text.html("Remove");break;
					case (-30 <= val &&  val < -10): text.html("More Market-Led");break;
					case (-10 <= val &&  val < 10): text.html("Neutral");break;
					case (10 <= val &&  val < 30): text.html("Good Goal");break;
					case (30 <= val &&  val < 50): text.html("More Coverage");break;
				}
		        break;
		    case "GREEN ENERGY":
		    	switch (true) {
					case (-50 <= val &&  val < -30): text.html("Global Warming Lie");break;
					case (-30 <= val &&  val < -10): text.html("Do Nothing");break;
					case (-10 <= val &&  val < 10): text.html("Neutral");break;
					case (10 <= val &&  val < 30): text.html("Market-Led Solution");break;
					case (30 <= val &&  val < 50): text.html("Immediate Priority");break;
				}
		        break;
		    case "MARIJUANA":
		    	switch (true) {
					case (-50 <= val &&  val < -30): text.html("No Prohibition");break;
					case (-30 <= val &&  val < -10): text.html("Legally Medical");break;
					case (-10 <= val &&  val < 10): text.html("Neutral");break;
					case (10 <= val &&  val < 30): text.html("More Restriction");break;
					case (30 <= val &&  val < 50): text.html("Immoral Drug");break;
				}
		        break;
		    case "STIMULUS":
		    	switch (true) {
					case (-50 <= val &&  val < -30): text.html("No Fedral Invovled");break;
					case (-30 <= val &&  val < -10): text.html("Market-Led");break;
					case (-10 <= val &&  val < 10): text.html("Neutral");break;
					case (10 <= val &&  val < 30): text.html("Government-Led");break;
					case (30 <= val &&  val < 50): text.html("Fedral's Job");break;
				}
		        break;
		    case "WEALTHY TAX":
		    	switch (true) {
					case (-50 <= val &&  val < -30): text.html("No Income Tax");break;
					case (-30 <= val &&  val < -10): text.html("Flat Tax");break;
					case (-10 <= val &&  val < 10): text.html("Neutral");break;
					case (10 <= val &&  val < 30): text.html("Preserve Deduction");break;
					case (30 <= val &&  val < 50): text.html("Society's Conerstone");break;
				}
		        break;
		    case "ILLEGAL ALIENS":
		    	switch (true) {
					case (-50 <= val &&  val < -30): text.html("Fewer Immigration");break;
					case (-30 <= val &&  val < -10): text.html("Ban Illegal");break;
					case (-10 <= val &&  val < 10): text.html("Neutral");break;
					case (10 <= val &&  val < 30): text.html("Fewer Restrictions");break;
					case (30 <= val &&  val < 50): text.html("No Restriction");break;
				}
		        break;
		    case "SOCIAL SECURITY":
		    	switch (true) {
					case (-50 <= val &&  val < -30): text.html("Fedral Control");break;
					case (-30 <= val &&  val < -10): text.html("Refrom");break;
					case (-10 <= val &&  val < 10): text.html("Neutral");break;
					case (10 <= val &&  val < 30): text.html("Control on Investment");break;
					case (30 <= val &&  val < 50): text.html("Private Plans");break;
				}
		        break;
		    case "FREE TRADE":
		    	switch (true) {
					case (-50 <= val &&  val < -30): text.html("Made in USA");break;
					case (-30 <= val &&  val < -10): text.html("Fair Trade Instead");break;
					case (-10 <= val &&  val < 10): text.html("Neutral");break;
					case (10 <= val &&  val < 30): text.html("Trade With Restriction");break;
					case (30 <= val &&  val < 50): text.html("Globaliztion");break;
				}
		        break;
		    case "MILITARY":
		    	switch (true) {
					case (-50 <= val &&  val < -30): text.html("Defence only");break;
					case (-30 <= val &&  val < -10): text.html("Build Smart");break;
					case (-10 <= val &&  val < 10): text.html("Neutral");break;
					case (10 <= val &&  val < 30): text.html("Stay Strong");break;
					case (30 <= val &&  val < 50): text.html("World Police");break;
				}
		        break;
		    case "AMERICAN EXCEPTIONAL":
		    	switch (true) {
					case (-50 <= val &&  val < -30): text.html("Equal Countries");break;
					case (-30 <= val &&  val < -10): text.html("Multilateralism");break;
					case (-10 <= val &&  val < 10): text.html("Neutral");break;
					case (10 <= val &&  val < 30): text.html("US Interests First");break;
					case (30 <= val &&  val < 50): text.html("Restrict UN");break;
				}
		        break;
		    case "FOREIGN ENTANGLE":
		    	switch (true) {
					case (-50 <= val &&  val < -30): text.html("Always Prepared");break;
					case (-30 <= val &&  val < -10): text.html("Internve When Necessary");break;
					case (-10 <= val &&  val < 10): text.html("Neutral");break;
					case (10 <= val &&  val < 30): text.html("Less Military Presence");break;
					case (30 <= val &&  val < 50): text.html("No Oversea Military");break;
				}
		        break;
		}
		// switch (true) {
		// 	case (-50 <= val &&  val < -30): text.html("Strongly Oppose");break;
		// 	case (-30 <= val &&  val < -10): text.html("Oppose");break;
		// 	case (-10 <= val &&  val < 10): text.html("Neutral");break;
		// 	case (10 <= val &&  val < 30): text.html("Favor");break;
		// 	case (30 <= val &&  val < 50): text.html("Strongly Favor");break;
		// }
		$(this).parents('.below').css({
			'background-color': 'rgb('+red+','+green+','+blue+')'
		});
		//alert('rgb('+red+','+green+','+blue+')');
	});
}

function upload(){
	var topicname = $(".above h2");
	var topicattitude = document.getElementsByClassName("attitude-range");
	for (var i = 0; i < 8; i++){
		result.push([topicname[i].innerHTML,topicattitude[i].value]);
	}
}

function onload(){
    $('body').fadeOut(0);
}

$(document).ready(main);