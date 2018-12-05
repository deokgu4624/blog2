//jQuery Call.
(function($){
//Document Ready.
$(document).ready(function() {
    var Menu = {
        
        //클릭할 때, 스크롤에 따라 메뉴 변경되는 것 막기 위한 Boolean.
        _isClick : false,

        init : function() {
            this.layout();
            this.reset();
            this.addEvent();
            this.resetInit();
            this.lineScrollEvents();
            this.textScrollEvents();
            this.imageScrollEvents();
            this.paragraphScrollEvents();
            this.subScrollEvents();
            this.boxEvents();
        },
        layout : function() {
            this.$win = $(window);
            this.$winScroll = $('html, body');
            this.$wrap = $('#wrap');
            this.$gn = this.$wrap.find('#global-nav');
            this.$gnEl = this.$gn.find('a');
            this.$content = this.$wrap.find('.content');
            this.$section = this.$content.find('.section');
        },
        reset : function() {
            this._max = this.$section.length;
        },
        addEvent : function() {
            this.$win.on('scroll', this.onScroll).trigger('scroll');
            this.$gnEl.on('click', this.onClickGN);
        },
        resetInit : function() {
        },
        onClickGN : function(e) {
            e.preventDefault();
            var _this = Menu, $el = $(this),
                index = _this.$gnEl.index(this),
                id = $el.attr('href'),
                $cuSection, sectionT;
            $cuSection = _this.$section.eq(index);
            $cuSection = $(id);
            sectionT = $cuSection.offset().top - _this.$gn.height();
            if(!_this.$gnEl.eq(index).hasClass('active')){
                _this.$gnEl.removeClass('active');
                _this.$gnEl.eq(index).addClass('active');
            }
            _this._isClick = true;
            _this.$winScroll.stop(true).animate({scrollTop : sectionT}, {duration : 500, easing : 'easeInOutQuad', complete : function() {
                //애니메이션이 완료되었을 때.
                setTimeout(function() {
                    //_this._isClick 가 false 된 이후,
                    //window 의 스크롤 이벤트가 발생될 수 있기 때문에. 타이머를 이용하여 조금 이후에 값을 false 로 변경.
                    _this._isClick = false;
                }, 1);
            }});
        },
        onScroll : function(e) {
            var _this = Menu;
            _this._cuScroll = _this.$win.scrollTop();
            if(!_this._isClick) {
                _this.scrollMenu();
            }
            //_this.scrollMenuVisible();
            _this._exScroll = _this._cuScroll;
        },
        scrollMenu : function() {
            var _this = Menu;
            $.each(_this.$section, function(index, data){
                var $el = $(data),
                    elT = $el.offset().top,
                    // startLimit = elT - _this.$gn.height(), // 네비게이션의 높이만큼 시작지점을 뺀다.
                    startLimit = elT - _this.$gn.height() - _this.$win.height() / 3, // 네비게이션의 높이만큼 시작지점을 뺀다. + 윈도우 상에서 시작지점이 높이
                    endLimit = startLimit + $el.outerHeight();
                //section - 0 : 120. //첫번 째 section 만 top 좌표가 다르기 때문에 강제로 시작지점을 0 으로 지정.
                if(index === 0) startLimit = 0;
                if(_this._cuScroll >= startLimit && _this._cuScroll < endLimit) {
                    _this.$gnEl.removeClass('active');
                    _this.$gnEl.eq(index).addClass('active');
                }
            });
        },
        scrollMenuVisible : function() {
            var _this = Menu;
            if(_this._cuScroll <= 0){
                if(_this.$gn.hasClass('hide')){
                    _this.$gn.removeClass('hide');
                }
            }
            if(_this._cuScroll < 0) return;
            if(_this._exScroll !== undefined ){
                if(_this._cuScroll > _this._exScroll){ //스크롤의 진행방향 체크.
                    //아래로.
                    //네비게이션이 hide.
                    // _this.$gn.hide();
                    if(!_this.$gn.hasClass('hide')){
                        _this.$gn.addClass('hide');
                    }
                }else{
                    //위로.
                    //네비게이션이 show.
                    // _this.$gn.show();
                    if(_this.$gn.hasClass('hide')){
                        _this.$gn.removeClass('hide');
                    }
                }
            }
        },
        lineScrollEvents : function() {
            var toggle = true;
            var toggle2 = true;
            var toggle3 = true;
            var toggle4 = true;
            var $line1 = $('.line-1');
            var $line2 = $('.line-2');
            var $line3 = $('.line-3');
            var $line4 = $('.line-4');
            $(window).scroll(function(){
                var height = $(document).scrollTop();
                console.log(height);
                if(height>600 && toggle)
                {
                    TweenMax.killTweensOf($line1);
                    $line1.empty();
                    TweenMax.set($line1, {css: {height:0, autoAlpha: 0}});
                    TweenMax.to($line1, 1, {css: {height:150, autoAlpha: 1}, ease: Power4.easeOut});
                    toggle = false;
                }
                if(height>2800 && toggle2)
                {
                    TweenMax.killTweensOf($line2);
                    $line2.empty();
                    TweenMax.set($line2, {css: {height:0, autoAlpha: 0}});
                    TweenMax.to($line2, 1, {css: {height:150, autoAlpha: 1}, ease: Power4.easeOut});
                    toggle2 = false;
                }
                if(height>4000 && toggle3)
                {
                    TweenMax.killTweensOf($line3);
                    $line2.empty();
                    TweenMax.set($line3, {css: {height:0, autoAlpha: 0}});
                    TweenMax.to($line3, 1, {css: {height:150, autoAlpha: 1}, ease: Power4.easeOut});
                    toggle3 = false;
                }
                if(height>5500 && toggle4)
                {
                    TweenMax.killTweensOf($line4);
                    $line4.empty();
                    TweenMax.set($line4, {css: {height:0, autoAlpha: 0}});
                    TweenMax.to($line4, 1, {css: {height:150, autoAlpha: 1}, ease: Power4.easeOut});
                    toggle4 = false;
                }
            });
        },

        textScrollEvents : function() {
            var toggle = true;
            var toggle2 = true;
            var toggle3 = true;
            var $word = $('.word-1').find('span');
            TweenMax.set($word, {css: {y:80,autoAlpha: 0}});
            setTimeout(function(){
                TweenMax.staggerTo($word, 2, {css: {y:0, autoAlpha:1}, ease: Power3.easeOut}, 0.15);
            }, 1000);
            $(window).scroll(function(){
                var height = $(document).scrollTop();
                if(height > 600 && toggle)
                {
                    var $word2 = $('#section-2 .title span:eq(0), #section-2 .title span:eq(3)');
                    TweenMax.set($word2, {css: {y:10,autoAlpha: 0}});
                    TweenMax.staggerTo($word2, 2, {css: {y:0, autoAlpha:1}, ease: Power3.easeOut}, 0.2);


                    var $word3 = $('#section-2 .title span:eq(1), #section-2 .title span:eq(2), #section-2 .title span:eq(4)');
                    TweenMax.set($word3, {css: {y:-10,autoAlpha: 0}});
                    TweenMax.staggerTo($word3, 2, {css: {y:0, autoAlpha:1}, ease: Power3.easeOut}, 0.2);
                    //TweenMax.to($word, 2, {css: {y:0,autoAlpha: 1}, ease: Back.easeInOut, delay:2});
                    toggle = false;
                }
                if(height > 2800 && toggle2)
                {
                    var $word2 = $('#section-3 .title span:eq(0), #section-3 .title span:eq(3),#section-3 .title span:eq(5),#section-3 .title span:eq(6),#section-3 .title span:eq(8),#section-3 .title span:eq(11)');
                    TweenMax.set($word2, {css: {y:10,autoAlpha: 0}});
                    TweenMax.staggerTo($word2, 4, {css: {y:0, autoAlpha:1}, ease: Power3.easeOut}, 0.2);


                    var $word3 = $('#section-3 .title span:eq(1), #section-3 .title span:eq(2), #section-3 .title span:eq(4),#section-3 .title span:eq(7),#section-3 .title span:eq(9),#section-3 .title span:eq(10),#section-3 .title span:eq(12)');
                    TweenMax.set($word3, {css: {y:-10,autoAlpha: 0}});
                    TweenMax.staggerTo($word3, 4, {css: {y:0, autoAlpha:1}, ease: Power3.easeOut}, 0.2);
                    //TweenMax.to($word, 2, {css: {y:0,autoAlpha: 1}, ease: Back.easeInOut, delay:2});
                    toggle2 = false;
                }
                if(height > 5500 && toggle3)
                {
                    var $word2 = $('#section-4 .title span:eq(0), #section-4 .title span:eq(3),#section-4 .title span:eq(5)');
                    TweenMax.set($word2, {css: {y:10,autoAlpha: 0}});
                    TweenMax.staggerTo($word2, 2, {css: {y:0, autoAlpha:1}, ease: Power3.easeOut}, 0.2);


                    var $word3 = $('#section-4 .title span:eq(1), #section-4 .title span:eq(2), #section-4 .title span:eq(4), #section-4 .title span:eq(6)');
                    TweenMax.set($word3, {css: {y:-10,autoAlpha: 0}});
                    TweenMax.staggerTo($word3, 2, {css: {y:0, autoAlpha:1}, ease: Power3.easeOut}, 0.2);
                    //TweenMax.to($word, 2, {css: {y:0,autoAlpha: 1}, ease: Back.easeInOut, delay:2});
                    toggle3 = false;
                }
            });
        },

        imageScrollEvents : function(){
            var toggle = true;
            var toggle2 = true;
            var $cover = $('.cover-1');
            var $cover2 = $('.cover-2');
            $(window).scroll(function(){
                var height = $(document).scrollTop();
                if(height > 3000 && toggle)
                {
                    TweenMax.set($cover, {css: {width:500}});
                    TweenMax.to($cover, 1,{css: {width:0}, ease: Power4.easeOut});
                    toggle = false;
                }
                if(height > 4500 && toggle2)
                {
                    TweenMax.set($cover2, {css: {width:500}});
                    TweenMax.to($cover2, 1,{css: {width:0}, ease: Power4.easeOut});
                    toggle2 = false;
                }
            });
        },

        paragraphScrollEvents : function(){
            var toggle = true;
            var toggle2 = true;
            var toggle3 = true;
            var toggle4 = true;
            var toggle5 = true;
            var toggle6 = true;
            var toggle7 = true;
            var $paragraph = $('#section-2 .area .paragraph span:eq(0)');
            var $paragraph2 = $('#section-2 .area .paragraph span:eq(1)');
            var $paragraph3 = $('#section-2 .area .paragraph span:eq(2)');
            var $paragraph4 = $('#section-2 .area .paragraph span:eq(3)');
            var $paragraph5 = $('#section-2 .area .paragraph span:eq(4)');
            var $paragraph6 = $('#section-3 .area .area-1 .text-area span');
            var $paragraph7 = $('#section-3 .area .area-2 .text-area span');
            
            $(window).scroll(function(){
                var height = $(document).scrollTop();
                if(height > 700 && toggle)
                {
                    TweenMax.set($paragraph, {css: {y:30,autoAlpha:0}});
                    TweenMax.to($paragraph, 2,{css: {y:0,autoAlpha:1}, ease: Power4.easeOut});
                    toggle = false;
                }
                if(height > 1000 && toggle2)
                {
                    TweenMax.set($paragraph2, {css: {y:30,autoAlpha:0}});
                    TweenMax.to($paragraph2, 2,{css: {y:0,autoAlpha:1}, ease: Power4.easeOut});
                    toggle2 = false;
                }
                if(height > 1500 && toggle3)
                {
                    TweenMax.set($paragraph3, {css: {y:30,autoAlpha:0}});
                    TweenMax.to($paragraph3, 2,{css: {y:0,autoAlpha:1}, ease: Power4.easeOut});
                    toggle3 = false;
                }
                if(height > 2000 && toggle4)
                {
                    TweenMax.set($paragraph4, {css: {y:30,autoAlpha:0}});
                    TweenMax.to($paragraph4, 2,{css: {y:0,autoAlpha:1}, ease: Power4.easeOut});
                    toggle4 = false;
                }
                if(height > 2300 && toggle5)
                {
                    TweenMax.set($paragraph5, {css: {y:30,autoAlpha:0}});
                    TweenMax.to($paragraph5, 2,{css: {y:0,autoAlpha:1}, ease: Power4.easeOut});
                    toggle5 = false;
                }
                if(height > 3500 && toggle6)
                {
                    TweenMax.set($paragraph6, {css: {y:30,autoAlpha:0}});
                    TweenMax.to($paragraph6, 2,{css: {y:0,autoAlpha:1}, ease: Power4.easeOut});
                    toggle6 = false;
                }
                if(height > 5000 && toggle7)
                {
                    TweenMax.set($paragraph7, {css: {y:30,autoAlpha:0}});
                    TweenMax.to($paragraph7, 2,{css: {y:0,autoAlpha:1}, ease: Power4.easeOut});
                    toggle7 = false;
                }
            });
        },

        subScrollEvents : function(){
            var toggle = true;
            var toggle2 = true;
            var toggle3 = true;
            var toggle4 = true;
            var $sub = $('#section-3 .area .area-1 .subtitle span');
            var $sub2 = $('#section-3 .area .area-2 .subtitle span');
            var $subtext = $('#section-3 .area .area-1 .subsubtitle span');
            var $subtext2 = $('#section-3 .area .area-2 .subsubtitle span');
            $(window).scroll(function(){
                var height = $(document).scrollTop();
                setTimeout(function() {
                    if(height > 3000 && toggle)
                {
                    TweenMax.set($sub, {css: {y:30,autoAlpha:0}});
                    TweenMax.to($sub, 1,{css: {y:0,autoAlpha:1}, ease: Power4.easeOut});
                    toggle = false;
                }
                if(height > 4500 && toggle2)
                {
                    TweenMax.set($sub2, {css: {y:30,autoAlpha:0}});
                    TweenMax.to($sub2, 1,{css: {y:0,autoAlpha:1}, ease: Power4.easeOut});
                    toggle2 = false;
                }
                if(height > 3000 && toggle3)
                {
                    TweenMax.set($subtext, {css: {y:30,autoAlpha:0}});
                    TweenMax.to($subtext, 1,{css: {y:0,autoAlpha:1}, ease: Power4.easeOut});
                    toggle3 = false;
                }
                if(height > 4500 && toggle4)
                {
                    TweenMax.set($subtext2, {css: {y:30,autoAlpha:0}});
                    TweenMax.to($subtext2, 1,{css: {y:0,autoAlpha:1}, ease: Power4.easeOut});
                    toggle4 = false;
                }
                }, 1000);
                
            });
        },

        boxEvents : function(){
            var $horizontal = $('.horizontal:nth-child(1)');
            var $horizontal2 = $('.horizontal:nth-child(2)');
            var $vertical = $('.vertical-1');
            var $vertical2 = $('.vertical-2');
            setTimeout(function(){
                TweenMax.set($horizontal, {css: {width:0,autoAlpha:1}});
                TweenMax.to($horizontal, 3,{css: {width:1030,autoAlpha:0}, ease: Power4.easeOut});
                TweenMax.set($horizontal2, {css: {width:0,autoAlpha:1}});
                TweenMax.to($horizontal2, 3,{css: {width:1030,autoAlpha:0}, ease: Power4.easeOut});
                TweenMax.set($vertical, {css: {height:0,autoAlpha:1}});
                TweenMax.to($vertical, 3,{css: {height:501,autoAlpha:0}, ease: Power4.easeOut});
                TweenMax.set($vertical2, {css: {height:0,autoAlpha:1,}});
                TweenMax.to($vertical2, 3,{css: {height:501,autoAlpha:0}, ease: Power4.easeOut});
            }, 1000);
        }
    };
    
    Menu.init();
});
})(jQuery);