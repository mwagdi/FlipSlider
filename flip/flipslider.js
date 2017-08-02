$(function(){
    $.fn.flipSlider = function( options ) {
        var container = $(this);
        var slides = container.children();
        container.append('<div class="flipContainer"></div>');
        var flipContainer = container.find('.flipContainer');
       
        var settings = $.extend({
            autoplay: true,
            flipTime: 6000,
            flipSpeed: 3000
        }, options );

        var numSlides = $(slides).length;
        var maxHeight = 0;
        $(slides).each(function(i,element){
            var thisHeight = $(this).height();
            if(thisHeight>maxHeight){
                maxHeight = thisHeight+maxHeight;
            }
            $(this).addClass('flipSlide');
            if(i==0){
                $(this).addClass('currentSlide');
            }
            $(this).appendTo(flipContainer);
        });
        var flipSpeed = (settings.flipSpeed)/1000;
        var transDelay = flipSpeed/2;
        $(flipContainer).css({
            'height': maxHeight+'px',
            'transition': flipSpeed+'s linear'
        });
        $(flipContainer).find('.flipSlide').css('transition-delay',transDelay+'s');
        var rotate = true;
        var counter = 1;
        var index = 1;
        var flipThisForward = function(){
            $(flipContainer).find('.currentSlide').removeClass('currentSlide');
            if(index<numSlides){
                $(flipContainer).find('.flipSlide').eq(index).addClass('currentSlide');
            }
            else{
                $(flipContainer).find('.flipSlide').eq(0).addClass('currentSlide');
                index = 0;
            }
            if(rotate){
                $(flipContainer).find('.flipSlide').eq(index).css('transform','rotateY(180deg)');
                rotate = false;
            }
            else{
                $(flipContainer).find('.flipSlide').eq(index).css('transform','rotateY(0deg)');
                rotate = true;
            }
            var rotated = counter*180;
            $(flipContainer).css('transform','rotateY('+rotated+'deg)');
            counter++;
            index++;
        }
        if(settings.autoplay){
            setInterval(function(){ flipThisForward(); },settings.flipTime);
        }
    };
});