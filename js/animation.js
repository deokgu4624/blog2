(function($){
    $(document).ready(function() {
      var $line = $('.line');
      var $btnPlay = $('#btn-play');
      TweenMax.killTweensOf($line);
      //$box1 에 부여된 애니메이션 속성을 삭제.
      $line.empty();
      TweenMax.set($line, {css: {height:0, autoAlpha: 0}});
      TweenMax.to($line, 0.65, {css: {height:150, autoAlpha: 1}, ease: Back.easeInOut});
  $btnPlay.on('click', function(e) {
    e.preventDefault();
    play();
  });

      var play = function() {

        
      };
    });
    })(jQuery);