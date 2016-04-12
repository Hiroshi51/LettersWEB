 $(document).ready(function(){
    var windowWidth   = $(window).width();　//ウィンドウサイズ監視用
    
	function adjustCatchyImgHeight(){
		$('p.catchyImg').height($('p.catchyImg').width());
		$('p.catchyImg-work').height($('p.catchyImg-work').width());
        $('.oneThird').height($('.oneThird').width()*1.5);
        $('.oneFourth').height($('.oneFourth').width()*1.5);
    } 

    var resizeflag = false;
	$(window).resize(function(){

	if(resizeflag != false){
		clearTimeout(resize); 
	}
	var resize = setTimeout(adjustCatchyImgHeight,100);

	});
    
    var appearAllowed = true;
    var $menuAreaWrapper = $('#menuAreaWrapper');
    var $innerMenuArea = $('#innerMenuArea');
	$(window).on('scroll',function(){
		var scrollAmount = $(window).scrollTop();
		if(scrollAmount > 500 && appearAllowed == true){
			$menuAreaWrapper.css({
			 	position : "fixed",
			 	"z-index": 1000,
			 	top      : "-50px",
			 	left     : "0px",
			 	"borderBottom":"1px dotted #eee"
			})
			.animate({
				top      : "0px"
			},300);
			appearAllowed = false;
 		}
 		if(scrollAmount <= 500 && appearAllowed == false){
			$menuAreaWrapper.animate({
				top      : "-50px"
			},50);

			var backToOriginalPosi = setTimeout(function(){
				$menuAreaWrapper.css({
			 	position : "relative",
			 	top      : "0px"
		    	});
			},200);
		appearAllowed = true;
     	}
     	
	});
	//Inicially called functions
	adjustCatchyImgHeight();
});  