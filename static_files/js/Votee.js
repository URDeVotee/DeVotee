//@Version 0.5
var chartinfo;
var main = function() {
	infoquery();

	$('.ReVote').click(function() {
		window.location.href = "survey.html";
	});

	$('.Abstain').click(function() {
		$.ajax({
		    url: "users/logout",
		    type: "GET",
		    dataType: "json",

		    success: function(data){
		      if (typeof data.redirect == 'string'){
		      	document.cookie = document.cookie + ";expires=Thu, 01 Jan 1970 00:00:00 GMT";
		        window.location = data.redirect;
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
	    },

	    error: function(){
	      console.log("no candidate data");
	    }
	});

}

function basicinfo(){
    $(".profile .container").css({
            'background-image': 'url("../image/'+chartinfo.name+'.jpg"'
        });

    if(chartinfo.party=="Republican"){
        $(".namecard_background").css({
            'background-image': 'url("../image/replogo.png")'
        });
        $(".profile").css({
            'border': '10px solid rgba(51, 51, 255, 1)'
        });
    } else if (chartinfo.party=="Democratic"){
        $(".namecard_background").css({
            'background-image': 'url("../image/demlogo.png")'
        });
        $(".profile").css({
            'border': '10px solid rgba(255, 51, 51, 1)'
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

    $(".namecard .container").append('<p id="name">'+chartinfo.name+'</p>');
    $(".namecard .container").append('<p id="campaign_target">For President</p>');
    $(".namecard .container").append('<div id="namecard_underline"></div>');
    $(".namecard .container").append('<p id="info1">'+charinfo.party+'</p>');
    $(".namecard .container").append('<p id="info2">'+chartinfo.position+'</p>');
}


$(function () {

    $('#container').highcharts({

        chart: {
            polar: true,
            type: 'line',
            backgroundColor: null,
            plotBorderColor: '#606063'
        },

        title: {
            text: '',
            x: -80
        },

        pane: {
            size: '80%'
        },

        xAxis: {
            categories: ['Abortion', 'Gun Control', 'Military', 'Customer Support',
                    'Religion', 'Obamacare'],
            tickmarkPlacement: 'on',
            lineColor: 'rgb(0, 0, 0)',
            labels: {
		         style: {
		            fontSize: '12px',
		            color: 'black'
		         }
		      },
            minorGridLineColor: 'gb(0, 0, 0)',
            lineWidth: 0

        },

        yAxis: {
            gridLineInterpolation: 'polygon',
            lineWidth: 0,
            lineColor: 'rgb(0, 0, 0)',
            labels: {
		         style: {
		            fontSize: '12px',
		            color: 'black'
		         }
		      },
            minorGridLineColor: 'gb(0, 0, 0)',
            min: 0
        },

        tooltip: {
            shared: true,
            pointFormat: '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>'
        },

        legend: {
            align: 'right',
            verticalAlign: 'top',
            y: 70,
            layout: 'vertical'
        },

        series: [{
            name: 'You',
            data: [2,1,0,1,0,2],
            pointPlacement: 'on'
        }, {
            name: "Candidate",
            data: [1.5,1,0.2,1.1,0.3,1],
            pointPlacement: 'on'
        }]

    });
});



$(document).ready(main);