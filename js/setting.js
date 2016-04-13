 $(document).ready(function(){
    var windowWidth   = $(window).width();　//ウィンドウサイズ監視用
  	function adjustCatchyImgHeight(){
		$('p.catchyImg').height($('p.catchyImg').width());
		$('p.catchyImg-work').height($('p.catchyImg-work').width());
        for(var j=0; j<2; j++){
        	var heightName = '.averageHeight'+j;
			var $height = $(heightName);
	        var onethirdHeight = new Array();
	        $height.each(function(){
	           onethirdHeight.push($(this).height());
	        });
	        var maxHeight = 0;
	        for(var i=0; i < onethirdHeight.length; i++){
		           if(maxHeight < onethirdHeight[i]){
		            	maxHeight = onethirdHeight[i];
		           }
	        }
	        $height.height(maxHeight);
	        }
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
			appearAllowed = true;
        }
		if(scrollAmount == 0 && appearAllowed == true){	
			
				$menuAreaWrapper.css({
			 	position : "relative"
		    	});
				$menuAreaWrapper.animate({
			 	position : "relative",
			 	top      : "0px"
		    	},200);
		
	
	    }
     
     	
	});
	//Inicially called functions
	adjustCatchyImgHeight();
});  