//@Version 0.5
var chartinfo;
var main = function() {
    $('body').fadeOut(0);
    $('body').fadeIn(400);
	infoquery();

	$('.revote').click(function() {
        $('body').fadeOut(200);
        setTimeout(function() {
                window.location.href = "survey.html";
            }, 300);
	});

	$('.logout').click(function() {
		$.ajax({
		    url: "users/logout",
		    type: "GET",
		    dataType: "json",

		    success: function(data){
		      if (typeof data.redirect == 'string'){
                $('body').fadeOut(200);
                setTimeout(function() {
                    document.cookie = document.cookie + ";expires=Thu, 01 Jan 1970 00:00:00 GMT";
                    window.location = data.redirect;
                }, 300);
		    }
		      else
		        console.log("not a string");
		    },
		    error: function(){
		      console.log("direction error");
		    }
		});
	});
}

function infoquery(){
	$.ajax({
		url: "/getCandidate",
		type: "GET",
    	dataType: "json",

    	success: function(data){
    		chartinfo = data;
            basicinfo();
            chart();
	    },

	    error: function(){
	      console.log("no candidate data");
	    }
	});

}

function basicinfo(){
    var name = chartinfo.name.split(" ");
    name[0]=name[0].toLowerCase();
    name[1]=name[1].toLowerCase();
    name = name[0]+"_"+name[1];

    $("#candidate_photo").css({
            'background-image': "url(../image/"+name+".jpg)",
            'background-size': 'cover'
        });

    if(chartinfo.party=="Republican"){
        $(".namecard_background").css({
            'background-image': 'url("../image/replogo.png")'
        });
        $(".profile").css({
            'border': '10px solid rgba(255, 51, 51, 1)'
        });
    } else if (chartinfo.party=="Democratic"){
        $(".namecard_background").css({
            'background-image': 'url("../image/demlogo.png")'
        });
        $(".profile").css({
            'border': '10px solid rgba(51, 51, 255, 1)'
        });
    } else if (chartinfo.party=="Green"){
        $(".namecard_background").css({
            'background-image': 'url("../image/grelogo.png")'
        });
        $(".profile").css({
            'border': '10px solid rgba(51,255, 51, 1)'
        });
    } else {
        $(".namecard_background").css({
            'background-image': 'url("../image/indlogo.png")'
        });
        $(".profile").css({
            'border': '10px solid rgba(255, 117, 26, 1)'
        });
    }

    $(".namecard .container").append('<p id="name" font-family="Sans-serif">'+chartinfo.name+'</p>');
    $(".namecard .container").append('<p id="campaign_target">For President</p>');
    $(".namecard .container").append('<div id="namecard_underline"></div>');
    $(".namecard .container").append('<p id="info1">'+chartinfo.party+'</p>');
    $(".namecard .container").append('<p id="info2">'+chartinfo.position+'</p>');
}

function chart(){
    var array = chartinfo.score;
    var arrayLength = chartinfo.score.length;
    var topic = [];
    var candidateattitude = [];
    var userattitude = [];
    for (var i = 0; i < arrayLength; i++) {
        topic.push(array[i][0]);
        candidateattitude.push(array[i][1]+50);
        userattitude.push(50+parseInt(array[i][2]));
    }

    $(function () {
        Highcharts.setOptions({
                colors: ['rgb(255, 77, 77)', 'rgb(77, 77, 255)']
            });

        $('#container').highcharts({

            credits: {
                enabled: false
            },
            chart: {
                polar: true,
                type: 'area',
                backgroundColor: null,
                plotBorderColor: '#000000'
            },

            plotOptions: {
                series: {
                    fillOpacity: 0.1,
                    lineWidth: 2
                }
            },

            title: {
                text: '',
                x: -80
            },

            pane: {
                size: '80%'
            },

            xAxis: {
                categories: topic,
                tickmarkPlacement: 'on',
                lineColor: 'rgb(0, 0, 0)',
                labels: {
                     style: {
                        fontSize: '12px',
                        color: '#6e6e70'
                     }
                  },
                minorGridLineColor: 'rgb(0, 0, 0)',
                lineWidth: 0

            },

            yAxis: {
                gridLineInterpolation: 'polygon',
                lineWidth: 0,
                lineColor: 'rgb(0, 0, 0)',
                labels: {
                     style: {
                        fontSize: '12px',
                        color: '#6e6e70'
                     }
                  },
                minorGridLineColor: 'rgb(0, 0, 0)',
                min: 0
            },

            tooltip: {
                shared: true,
                pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>'
            },

            legend: {
                verticalAlign: 'top',
                layout: 'vertical',
            },

            series: [{
                name: 'You',
                data: userattitude,
                pointPlacement: 'on'
            }, {
                name: "Candidate",
                data: candidateattitude,
                pointPlacement: 'on'
            }],

            navigation: {
                buttonOptions: {
                    align: 'center',
                    enabled: false
                }
            }

        });
    });
}






$(document).ready(main);