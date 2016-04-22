 $(document).ready(function(){
 	//inicialize the window width
    var windowWidth = $(window).width();　
  	function adjustCatchyImgHeight(){
		$('p.catchyImg').height($('p.catchyImg').width());
		$('p.catchyImg-work').height($('p.catchyImg-work').width());
        setUniformHeight();
    } 
    function setUniformHeight(){
		for(var j=0; j<2; j++){
		    	//genereate class name
		    	var heightName = '.averageHeight'+j;

		    	//get the class object
				var $height = $(heightName);

				//inicialize maxHeight
		        var maxHeight = 0;

		        //inspect which one is the heighest div.
		        $height.each(function(){
		           if($(this).height() > maxHeight){
		           	maxHeight = $(this).height();
		           }
		        });

		        //set this height to the heighest
		        $height.height(maxHeight);
		}
    }
    var resizeflag = false;
	$(window).resize(function(){
	if(resizeflag != false){
		clearTimeout(resize); 
	}
	var resize = setTimeout(adjustCatchyImgHeight,200);
	});
    
    var appearAllowed = true;
    var $menuAreaWrapper = $('#menuAreaWrapper');
    
	$(window).on('scroll',function(){
		var scrollAmount = $(window).scrollTop();
		if(scrollAmount > 500 && appearAllowed == true){
			$menuAreaWrapper.css({
			 	position : "fixed",
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
			},300);
			appearAllowed = true;
        }
		if(scrollAmount == 0 && appearAllowed == true){	
			
				$menuAreaWrapper.css({
			 	position : "absolute"
		    	});
				$menuAreaWrapper.animate({
			 	position : "absolute",
			 	top      : "0px"
		    	},300);
		
	
	    }
     
     	
	});
	//Inicially call this functions
	adjustCatchyImgHeight();
});  