$(document).ready(function(){
  //Configuration	
  var slidePosition = 0;　//現在のスライド位置認識用
  var windowWidth   = $(window).width();　//ウィンドウサイズ監視用
  var defaultHeight = 0;
  var slideWidth    = 0;  //画像一つの横幅用
  var sliderMargin  = 0;  //スライドの左マージン用
  var slideHeight   = 0;  //スライドの高さ用
  var adjustMargin  = 40; //両サイドのマージンを調整
  var easing        = "easeInOutCirc"; //イージングの種類
  var animateSpeed  = 800; //全体的なアニメーションの速さ
  var settings    = {}; //スライドのポジション設定
  var NumberOfSlides = $('li.slide').length;
  var autoSlide = false;
  var $headerRight = $('#headerRight');
  var $innerHeader = $('#innerHeader');
  var gifHeight = 0;
  //次へボタンの動作設定
  var click_allowed = true;
  $('.next').on('click',function(event){
  	if(!click_allowed){return};
  	event.preventDefault();
    if (autoSlide !== false) {
        clearInterval(autoSlide);
    }
    settings = setRanges();
  	animateSlideNext(settings);
  	click_allowed = false; 
  	var wait = window.setTimeout(function(){
  		click_allowed = true;
      startAutoSlide();
  	},600,easing);
  });
  
  //前へボタンの動作設定
  $('.back').on('click',function(event){
  	if(!click_allowed){return};
  	event.preventDefault();
    if (autoSlide !== false) {
        clearInterval(autoSlide);
    }
    settings = setRanges();
  	animateSlideBack(settings);
  	click_allowed = false; 
  	var wait = window.setTimeout(function(){
  		click_allowed = true;
      startAutoSlide();
  	},600,easing);
  });

  //ウィンドウのリサイズが行われるたびにスライドの再設定を実行
  $(window).resize(function(){
    if (autoSlide !== false) {
        clearInterval(autoSlide);
    }
    startAutoSlide();
    windowWidth = $(window).width();
    settings = setRanges();
    adjestImgs(windowWidth,settings);
  });
  

  function startAutoSlide(){
      autoSlide = setInterval(function(){
      animateSlideNext(settings);
    },7000);
  }


  //デフォルト設定オブジェクト返し
  function setRanges(){
    if(windowWidth > 600){
       settings = {
        slideWidth:windowWidth*0.6,
        slideLeftMargin:windowWidth*0.2,
        mainSlideWidth:function(){return this.slideWidth*NumberOfSlides}, 
        originalPosition:function(){return this.slideLeftMargin*1.5-slidePosition*this.slideWidth+adjustMargin},
        startingPosition:function(){return this.slideLeftMargin*1.5+adjustMargin},
        endPosition:function(){return this.slideLeftMargin*1.5+adjustMargin-this.slideWidth*(NumberOfSlides-1)}
      };
    }
    else{
       settings = {
        slideWidth:windowWidth*0.9,
        slideLeftMargin:windowWidth*0.05,
        mainSlideWidth:function(){return this.slideWidth*NumberOfSlides}, 
        originalPosition:function(){return this.slideLeftMargin},
        startingPosition:function(){return this.slideLeftMargin},
        endPosition:function(){return this.slideLeftMargin-this.slideWidth*(NumberOfSlides-1)}
      };
    }
    return settings;
  }
  //スライド設定関数
  function adjestImgs(windowWidth,settings){	

  	  if(windowWidth > 600){

          
          var leftValue = settings.slideLeftMargin+adjustMargin*2;
          var widthValue = settings.slideWidth+leftValue;
          $innerHeader.css({left:0});
          
          

          var tempHeigh = setTimeout(function(){
            adjustHeaderHeight();
            gifHeight = $('#mainGif').height();
            gifTop = defaultHeight/2 - gifHeight/2;
            $('#mainGif').css({top:gifTop + "px"});
          
          },50);

      	  $('#mainSlide').width(settings.mainSlideWidth()).css({left:settings.originalPosition()+"px"});
          $('.innerContent,#footerElmWrapper,#innerMenuArea,#headerContent,#innersnsIconsWrapper').width(widthValue+"px");
      	  $('.slide,.slideImg').width(settings.slideWidth);
      	  $('.textOver').css({width:leftValue+"px",left:settings.slideLeftMargin/2-adjustMargin+"px"});
      	  $('.textSetting').css({width:leftValue-100+"px",right:"55px",left:"auto"});
      	  $('.next').css({top:"100px",left:settings.slideLeftMargin*1.5-50+adjustMargin+"px"});
          $('.back').css({top:"100px",left:settings.slideLeftMargin*1.5+1+adjustMargin+"px"});
      }
      else{
           var tempHeigh = setTimeout(function(){
          adjustHeaderHeight();
           },50);
          $('#innerMenuArea').css({width:"100%"});
          $innerHeader.css({left:settings.slideLeftMargin});
      	  $('.slide')      .css({width:settings.slideWidth+"px"});
      	  $('.slideImg')   .css({width:settings.slideWidth+"px"});  
          $('.innerContent').width(settings.slideWidth+"px");
          $('#footerElmWrapper').width(settings.slideWidth+"px");
          var adjustHeight = parseInt($('.textOver').height()) - 15;
          slideHeight = $('.slide').height();                
      	  $('#mainSlide')  .css({width:settings.mainSlideWidth()+"px",left:settings.slideLeftMargin-slidePosition*settings.slideWidth+"px",marginLeft:0});
      	  $('.textOver')   .css({width:"100%",left:0});
      	  $('.textSetting').css({width:"95%",left:"2.5%"});
          $('.next')       .css({top:slideHeight/2-15+"px",right:0,left:"auto"});
          $('.back')       .css({top:slideHeight/2-15+"px",left:0,right:"auto"}); 
      }
      var textSettingHeight = $('.contentsHolder').height();
      $('.textOver').height(textSettingHeight);
  }

  //moveSlideForward function definition
  function moveSlideForward(settings){
		$('#mainSlide').animate({left:"-="+settings.slideWidth},animateSpeed,easing);
  }

  //moveSlideBackward function definition		 
  function moveSlideBackward(settings){
	  $('#mainSlide').animate({left:"+="+settings.slideWidth},animateSpeed,easing);
  }	

  //次への動作関数
  function animateSlideNext(settings){
      
        var $currentText = $('.textSetting').eq(slidePosition);
        if(slidePosition < NumberOfSlides-1){         
          var $nextText = $('.textSetting').eq(slidePosition+1);
          moveSlideForward(settings);
          $currentText.animate({top:"100px",opacity:"0"},animateSpeed);
          $nextText.animate({top:"50px",opacity:"1"},animateSpeed);
          slidePosition++;
		    }
        else{
          $('#mainSlide').animate({left:settings.startingPosition()+"px"},animateSpeed,easing);
          var $firstText = $('.textSetting').eq(0);
          $currentText.animate({top:"100px",opacity:"0"},animateSpeed);
          $firstText.animate({top:"50px",opacity:"1"},animateSpeed);
          slidePosition = 0;
        }
  }      
 

  //前への動作関数
  function animateSlideBack(settings){

        var $currentText = $('.textSetting').eq(slidePosition);
        if(slidePosition > 0){
          var $prevText = $('.textSetting').eq(slidePosition-1);
          moveSlideBackward(settings);
          $currentText.animate({top:"100px",opacity:"0"},animateSpeed);
          $prevText.animate({top:"20px",opacity:"1"},animateSpeed);
          slidePosition--;
        }
        else{
          $('#mainSlide').animate({left:settings.endPosition()+"px"},animateSpeed,easing);
          var $endText = $('.textSetting').eq(NumberOfSlides-1);
          $currentText.animate({top:"100px",opacity:"0"},animateSpeed);
          $endText.animate({top:"20px",opacity:"1"},animateSpeed);
          slidePosition = NumberOfSlides-1;
        }
   }

  function adjustHeaderHeight(){
      defaultHeight = $(window).height();
      defaultHeight2 = defaultHeight-50;
      var innerHeaderHeight = $innerHeader.height();
      $('#header').height(defaultHeight2);
      $innerHeader.css({
      top :defaultHeight/2-innerHeaderHeight/2 + "px",
      });
      $headerRight.height(defaultHeight);
  }



  //ページロード時のスライド表示
  settings = setRanges();
  startAutoSlide();
　 adjestImgs(windowWidth,settings);  

});
