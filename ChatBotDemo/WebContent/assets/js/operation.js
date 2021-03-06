﻿$(function () {
	$('.bot-wrap').hide();

	var ie = (function (){
		if (window.ActiveXObject === undefined) return null;
		if (!document.querySelector) return 7;
		//if (parseFloat(navigator.appVersion.split("MSIE")[1].split(";")[0].split(" ").join("")) == 8) return 8;
		if(!document.addEventListener) return 8;
		if (!window.atob) return 9;
		if (!document.__proto__) return 10;
		return 11;
	})();
	if(ie == 10 || ie == 9 || ie == 8 || ie == 7){
		$('.bot-wrap').remove();
		$(".banner").remove();
	}

});

function isMobile() {
	var UserAgent = navigator.userAgent;

	if (UserAgent.match(/iPhone|iPad|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null) {
		return true;
	} else {
		return false;
	}
}

if (isMobile()) {   //모바일 환경
	$(document).on('click', '#botChatBtn', function () {
		location.href = "index_m.html";
	});
} else {    // 웹 환경
	$(document).on('click', '#botChatBtn', function () {
		/*if(location.href=='https://bottest.hyundai.com'){
			$('.wc-chatview-panel').show();
			$('.bot-wrap').show();
			$('.btnMin').click();
		}else{
			location.href = "https://bottest.hyundai.com";
		}*/
		$('.wc-chatview-panel').css('bottom', 0).show();
		$('.bot-wrap').show();
		$('.btnMin').click();
	});

	/*$(document).on('click', '.wc-carousel-item > div.img > .wc-card-div', function () {
		$('#imgTag').attr('src',$(this).children().eq(0).attr('src'));
		$('#imgTitle').text($(this).next().text());
		$('.map-wrapper , .mov-wrapper').fadeOut();
		$('.img-wrapper').show().animate({ "left": "0px", "opacity": "1" }, "fast");				
		$(this).parent().addClass('on');
	});*/
	$(document).on('click', '.wx-carousel-map > div > .wc-card-div', function () {
		$('.wc-carousel-360 > div').removeClass('on');
		$('.wx-carousel-map > div').removeClass('on');
		$('.wc-carousel-play > div').removeClass('on');
		$('.wc-carousel-image > div').removeClass('on');
		$("#video").attr('src','');
		$('.vr-wrapper , .mov-wrapper, .img-wrapper, .lifestyle-wrapper').fadeOut();

		$('#mapArea > div').remove();
		$('#mapArea').add( "<div id='map' style='border:1px solid #000;'></div>" ).appendTo('#mapArea');
		var mapTitle = $(this).next().text();
		$('#mapTitle').text(mapTitle);
		var latitude = $(this).children().eq(2).attr('alt');
		var longitude = $(this).children().eq(3).attr('alt');
		
		var oPoint = new nhn.api.map.LatLng(longitude, latitude);
		nhn.api.map.setDefaultPoint('LatLng');
		oMap = new nhn.api.map.Map('map' ,{
		  point : oPoint,
		  zoom : 10,
		  enableWheelZoom : true,
		  enableDragPan : true,
		  enableDblClickZoom : false,
		  mapMode : 0,
		  activateTrafficMap : false,
		  activateBicycleMap : false,
		  minMaxLevel : [ 1, 14 ],
		  size : new nhn.api.map.Size(568,318)
		});
		var sIcon = new nhn.api.map.Icon("http://www.hyundai.com/kr/images/counsel/map_pin.png", new nhn.api.map.Size(28,37) );
		var oMarker = new nhn.api.map.Marker(sIcon, { title : mapTitle});
		oMarker.setPoint(oPoint);
		oMap.addOverlay(oMarker);
		var oLabel = new nhn.api.map.MarkerLabel();
		oMap.addOverlay(oLabel);
		oLabel.setVisible(true, oMarker);

		$('.map-wrapper').show().animate({ "left": "-70px", "opacity": "1" }, "fast");
		$(this).parent().addClass('on');
	});
	$(document).on('click', '.wc-carousel-360 > div > .wc-card-div', function () {
		$('.wc-carousel-360 > div').removeClass('on');
		$('.wx-carousel-map > div').removeClass('on');
		$('.wc-carousel-play > div').removeClass('on');
		$('.wc-carousel-image > div').removeClass('on');
		$('.map-wrapper , .mov-wrapper, .img-wrapper, .lifestyle-wrapper').fadeOut();
		$("#video").attr('src','');

		var imgPopTitle =$(this).children().eq(2).attr('alt');
		var exColor =$(this).children().eq(3).attr('alt');
		$('#vrTitle').text(imgPopTitle);
		$(".imgBox").attr("id", exColor);
		
		/*var frameCnt = new Array();
		var temp;
		for(var i=1; i<61; i++){
			if(i<10){
				temp = "00000"+i+".jpg";
			}else{
				temp = "0000"+i+".jpg";
			}
			frameCnt.push(temp);
			
		}*/

		if($('.vr-wrapper').css('display', 'block')){
			$('#image').reel({
				images: "https://bottest.hyundai.com/assets/images/price/360/"+exColor+"/000##.jpg",
				//images: "https://www.hyundai.com/kr/360VR/kona/SS7/000##.jpg",
				frames: 60,
				cw: true,
				brake: 10,
				throwable: 10
			});
			/*$('#image').reel({
				images: frameCnt,
				path: "https://bottest.hyundai.com/assets/images/price/360/"+exColor+"/",
				frames: 1,
				cw: false,
				throwable: 10
			});*/
		}
		$(".popTxt").removeClass('wc-message-from');
		$('.vr-wrapper').show().animate({ "left": "-70px", "opacity": "1" }, "fast");
		$(this).parent().addClass('on');
	});
	

	$(document).on('click', '.wc-carousel-play > div > .wc-card-div', function () {
		$('.wc-carousel-360 > div').removeClass('on');
		$('.wx-carousel-map > div').removeClass('on');
		$('.wc-carousel-play > div').removeClass('on');
		$('.wc-carousel-image > div').removeClass('on');
		$('.map-wrapper , .vr-wrapper, .img-wrapper, .lifestyle-wrapper').fadeOut();
		var movePopTitle = $(this).children().eq(2).attr('alt');
		$('#movTitle').text(movePopTitle);
		
		var movePopUrl = $(this).children().eq(3).attr('alt');
		$('#video').attr('src', movePopUrl);

		/*
		var result = Math.floor(Math.random() * 2) + 1;
		//document.write(result);
		if(result == 1){$("#video").attr('src','https://www.youtube.com/embed/jeE_C96keCc?rel=0');}
		else if(result == 2){$("#video").attr('src','https://www.youtube.com/embed/1vpP-XWCRzA?rel=0');}
		*/
		$('.mov-wrapper').show().animate({ "left": "-70px", "opacity": "1" }, "fast");
		$(this).parent().addClass('on');
	});
	$(document).on('click', '.wc-carousel-image > div > .wc-card-div', function () {
		$('.wc-carousel-360 > div').removeClass('on');
		$('.wx-carousel-map > div').removeClass('on');
		$('.wc-carousel-play > div').removeClass('on');
		$('.wc-carousel-image > div').removeClass('on');
		$("#video").attr('src','');
		$('.map-wrapper , .vr-wrapper, .mov-wrapper, .lifestyle-wrapper').fadeOut();
		
		$('#imgSlideCnt > li').remove();
		$('#imgDiv > div').remove();
		$('#imgCarousel > ol').add( "<li data-target='#imgCarousel' data-slide-to='0' class='active'></li>" ).appendTo('#imgCarousel > ol');
		$('#imgCarousel > div').add("<div class='item active'> <img id='imgTag' src='' width='568' height='318' alt='First slide'></div>").appendTo('#imgCarousel > div');
		var manyImg = false;
		var imgUrl = $(this).children().eq(0).attr('src');
		var imgPopTitle = $(this).children().eq(2).attr('alt');
		var imgCnt = $(this).children().eq(3).attr('alt');
		
		if(imgCnt != ''){
			manyImg = true;
			var tempImg = imgUrl.substring(0, imgUrl.lastIndexOf('-'));
			for(var i=2; i<=parseInt(imgCnt); i++){
				$('#imgCarousel > ol').add( "<li data-target='#imgCarousel' data-slide-to='1'></li>" ).appendTo('#imgCarousel > ol');
				$('#imgCarousel > div').add("<div class='item'> <img src='"+tempImg+"-"+i+"p.jpg' width='568' height='318'></div>").appendTo('#imgCarousel > div');
			}
		}else{
			$('#imgSlideCnt > li').remove();
		}
		
		if(manyImg){
			$('#imgCarousel > div').add("<a class='left carousel-control' href='#imgCarousel' data-slide='prev'><span class='glyphicon glyphicon-chevron-left'></span></a><a class='right carousel-control' href='#imgCarousel' data-slide='next'><span class='glyphicon glyphicon-chevron-right'></span></a>").appendTo('#imgCarousel > div');	
		}
		var smallImg = $(this).children().eq(0).attr('src');
		var largeImg = smallImg.substring(0, smallImg.lastIndexOf('.')) + 'p.jpg';
		$('#imgTag').attr('src',largeImg );
		//$('#imgTitle').text($(this).next().text());
		$('#imgTitle').text($(this).children().eq(2).attr('alt'));
		$('.img-wrapper').show().animate({ "left": "-70px", "opacity": "1" }, "fast");
		$(this).parent().addClass('on');
	});

	//코나 추천!
	$(document).on('click', '.wc-card > .car_recommend > .wc-card-buttons > li > button:contains("차량 추천 결과 보기")', function () {
		$('.wc-carousel-360 > div').removeClass('on');
		$('.wx-carousel-map > div').removeClass('on');
		$('.wc-carousel-play > div').removeClass('on');
		$('.wc-carousel-image > div').removeClass('on');
		$("#video").attr('src','');
		$('.map-wrapper , .vr-wrapper, .mov-wrapper, .img-wrapper').fadeOut();
		
		var recommendItems = new Array();
		var recommendIndex = $('.wc-card > .car_recommend > .wc-card-buttons > li > button:contains("차량 추천 결과 보기")').index(this);
		recommendItems = $(".car_recommend").eq(recommendIndex).children().eq(2).attr('alt').split('|');
		
		var recommendColors = new Array();																							// 칼라 배열명
		recommendColors = recommendItems[2].split('@');																				// 칼라 배열
		var exColor = recommendColors[0].substring(recommendColors[0].indexOf('0')+2, recommendColors[0].lastIndexOf('/'));			// 메인칼라 색상 추출
		
		var selectColors = new Array();																								// 동적 칼라 배열명
		var tempColor = "";
		for(var i=0; i<recommendColors.length; i++){
			tempColor = i + recommendColors[i].substring(recommendColors[i].indexOf('0')+2, recommendColors[i].lastIndexOf('/'));	
			selectColors.push(tempColor);																							// 번호 + 동적칼라명만 추출
		}
		
		var colorKorNm = new Array();
		colorKorNm = recommendItems[13].split('@');

		/*
		recommendItems[0] 타이틀 -> 가솔린 1.6 터보 스마트 2WD 7단 DCT|
		recommendItems[1] 가격 -> 가격: 18,950,000원 |
		recommendItems[2] 360img -> https://bottest.hyundai.com/assets/images/price/360/chalk white/00001.jpg@
									https://bottest.hyundai.com/assets/images/price/360/chalk white/00001.jpg@
									https://bottest.hyundai.com/assets/images/price/360/lake silver/00001.jpg@
									https://bottest.hyundai.com/assets/images/price/360/velvet dune/00001.jpg@
									https://bottest.hyundai.com/assets/images/price/360/dark night/00001.jpg@
									https://bottest.hyundai.com/assets/images/price/360/blue lagoon/00001.jpg@
									https://bottest.hyundai.com/assets/images/price/360/phantom black/00001.jpg|
		recommendItems[3] 옵션1 -> https://bottest.hyundai.com/assets/images/price/option/7-inch_display_audio.jpg|
		recommendItems[4] 옵션1명 -> 7인치 디스플레이 오디오 + 후방 카메라@추가 500,000원|
		recommendItems[5] 옵션2 -> https://bottest.hyundai.com/assets/images/price/option/Smart_sense_I.jpg|
		recommendItems[6] 옵션2명 -> 현대스마트센스1 (전방충돌+차로이탈+운전자주의+후측방충돌)@추가 1,200,000원|
		recommendItems[7] 옵션3 -> https://bottest.hyundai.com/assets/images/price/option/Value_Package.jpg|
		recommendItems[8] 옵션3명 -> 밸류패키지 (버튼시동&스마트키+17인치 알로이휠&타이어)@추가 500,000원|
		recommendItems[9] 옵션4 -> https://bottest.hyundai.com/assets/images/wheel/17Wheel.jpg|
		recommendItems[10] 옵션4 -> 17인치 알로이휠&타이어 추가 : 0원|
		recommendItems[11] 옵션5 -> https://bottest.hyundai.com/assets/images/price/interior/beige.jpg|
		recommendItems[12] 옵션5 -> 내장색상 : 베이직(투톤)|
		recommendItems[13] 차량색상 -> 쵸크화이트
		*/




		$('#trim_infoText > p').remove();
		$('#option_slider > ul > li').remove();
		$('#optionVR_prev').attr('alt', '');
		$('#optionVR_next').attr('alt', '');
		$('#option_slider ul').animate({
			left: 0
		}, 500);

		//추천 360
		$(".imgBox").attr("id", exColor);
		if($('.lifestyle-wrapper').css('display', 'block')){
			$('#imageRecommend').reel({
				images: "https://bottest.hyundai.com/assets/images/price/360/"+exColor+"/000##.jpg",
				frames: 60,
				cw: true,
				brake: 10,
				throwable: 10
			});
		}
		//$('.optionVR_prev').hide();
		
		if(recommendColors.length > 1){
			$('#optionVR_prev').css('opacity', '0.4').attr('disabled', true);
			$('#optionVR_next').css('opacity', '0.8').attr('disabled', false);
			$('.optionVR_prev').show();
			$('.optionVR_next').show();
		}else{
			$('.optionVR_prev').hide();
			$('.optionVR_next').hide();
		}
		$('#optionVR_prev').attr("alt", selectColors).attr("name", colorKorNm);
		$('#optionVR_next').attr("alt", selectColors).attr("name", colorKorNm);
		
		//추천 트림
		$('#trim_infoText').append("<p>"+recommendItems[0]+" (<span class='recommendColor'>"+colorKorNm[0]+"</span>)</p>");
		$('#trim_infoText').append("<p>"+recommendItems[1]+"</p>");

		//추천 옵션
		var optionCnt = 0;
		for(var i=3; i<12; i+=2){
			if(recommendItems[i] != null){
				$('#option_slider > ul').append("<li><img src='"+recommendItems[i]+"'></li>");
				optionCnt++;
			}
		}

		$('#optionSlide_prev').hide();
		if(optionCnt <= 4){
			$('#optionSlide_next').hide();
		}else{
			$('#optionSlide_next').show();
		}

		$('.lifestyle-wrapper').show().animate({ "left": "-70px", "opacity": "1" }, "fast");
		$(this).parent().parent().parent().addClass('on');
	});



	$(document).on('click', '.wc-carousel-video > div > .wc-card-div', function () {
		$('#movTitle').text($(this).next().text());
		$('.map-wrapper , .vr-wrapper').fadeOut();
		$('.mov-wrapper').show().animate({ "left": "0px", "opacity": "1" }, "fast");
		$(this).parent().addClass('on');
	});
	$(document).on('click', '.wc-carousel-item > .on > .wc-card-div', function () {
		$('.popupArea').animate({ "left": "338px", "opacity": "0" }, "fast").fadeOut("fast");
		$("#video").attr('src','');
		$(this).parent().removeClass('on');
	});
	
	/*$(document).on('click', '.icoShaka', function () {
	viewMenu('<img src="assets/images/loading.gif"/>');
	});*/
	function viewMenu(v) {
		$('div.wc-console').addClass('has-text');
		$('input[type="text"].wc-shellinput').attr('value', v);
		$('input[type="text"].wc-shellinput').val(v);
		$('label.wc-send').trigger('click');
		$('input[type="text"].wc-shellinput').attr('value', '');
		$('input[type="text"].wc-shellinput').val('');
		$('.wc-console').removeClass('has-text');
		$('.btnMenu').removeClass('hamburgerBtnAction').addClass('hamburgerBtn');
	}

}           


//PC+모바일 구분 없는 부분 시작

$(document).on('click', '.wc-card > .wc-card-buttons > li > button:contains("현재 위치 사용 승인")', function () {
	//viewMenu('<img src="assets/images/03_chat_recommend_btn_OV_v2@1x.png"/>');
	// 형식 : 반드시 src 속성만 쌍따옴표(")로 묶어야함. 나머지는 작은따옴표(') -> \'
	// 악의적인 사용자가 채팅창 img 태그를 사용한다면 막을 방법이 아직 없음. 
	navigator.geolocation.getCurrentPosition(function(position){
		var pos = { lat: position.coords.latitude, lng: position.coords.longitude };
		//alert("현재 위치: 위도(" + pos.lat + "), 경도(" + pos.lng + ")");
		var directLineUrl = "https://directline.botframework.com";
		var secretKey = "doiYLN6qe-k.cwA.3rQ.pkj_VE-moZHMtKkP9NwWDisZNe2aBVfNKT2rYvwMKCU";
		//var secretKey = "g1-wUK1BHJ8.cwA.hJM.C2hxJgvoj50OaqqF_ZW4B44A4jrr1Lbrm92qt9z4c4g";
		//var secretKey = "VvL1saGXIWY.cwA.rcg.E8K7RyD7MbSwqBBNHBAxic-SC_unVCTqFfqkxZ_D6Wc";
		var info = JSON.stringify({
		  type: 'message',
		  text: 'current location:'+pos.lat+':'+pos.lng,
		  from: { id: 'userid' },
		});
		$.ajax({      
			type : "POST",  
			url : directLineUrl + "/v3/directline/conversations/" + $('#conversationId').val() + "/activities",      
			data : info,
			//dataType : "json",
			headers: {
				"Authorization": "Bearer " + secretKey,
				'Content-Type': 'application/json'
			},						
			success : function(data){   								
			},    
			error : function(e){ 
			}  
		});	
	}, function(error){
		//alert("에러: " + error.message);
		var directLineUrl = "https://directline.botframework.com";
		var secretKey = "doiYLN6qe-k.cwA.3rQ.pkj_VE-moZHMtKkP9NwWDisZNe2aBVfNKT2rYvwMKCU";
		//var secretKey = "g1-wUK1BHJ8.cwA.hJM.C2hxJgvoj50OaqqF_ZW4B44A4jrr1Lbrm92qt9z4c4g";
		//var secretKey = "VvL1saGXIWY.cwA.rcg.E8K7RyD7MbSwqBBNHBAxic-SC_unVCTqFfqkxZ_D6Wc";
		var info = JSON.stringify({
		  type: 'message',
		  text: '직접 검색',
		  from: { id: 'userid' },
		})
		$.ajax({      
			type : "POST",  
			url : directLineUrl + "/v3/directline/conversations/" + $('#conversationId').val() + "/activities",      
			data : info,
			//dataType : "json",
			headers: {
				"Authorization": "Bearer " + secretKey,
				'Content-Type': 'application/json'
			},						
			success : function(data){   								
			},    
			error : function(e){ 
			}  
		});
	});
});	