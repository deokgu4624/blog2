//jQuery Call.
(function($){
    //Document Ready.
    $(document).ready(function(){
        var Parallax = {
            init : function() {
                this.layout();
                this.reset();
                this.addEvent();
            },
            layout : function() {
                this.$win = $(window);
                this.$wrap = $('#wrap');
                this.$section = this.$wrap.find('.section');
                this.$imageArea = this.$section.find('.image-area');
                this.$textArea = this.$section.find('.text-area');
            },
            reset : function() {
                var _this = Parallax;
                this._max = this.$section.length;
                $.each(this.$section, function(index, data){
                    var $el = $(data);
                    //섹션의 뎁스 설정.
                    $el.css({'z-index' : _this._max - index});
                    if(index === _this._max - 1){
                        //섹션의 뎁스 설정시 이미지가 깜빡이는 현상을 방지하기 위해, #wrap 에 visibility : hidden 을 설정함.
                        //뎁스 설정이 완료되는 index - 4 가 되는 시점에 #wrap 를 보이도록 활성화.
                        _this.$wrap.removeClass('inactive');
                    }
                });
            },
            addEvent : function() {
                this.$win.on('resize', this.onResize).trigger('resize');
                this.$win.on('scroll', this.onScroll).trigger('scroll');
            },
            resetInit : function() {
            },
            onResize : function() {
                var _this = Parallax;
                _this._winH = _this.$win.height();
            },
            onScroll : function() {
                var _this = Parallax, scrollTop = _this.$win.scrollTop();
                $.each(_this.$section, function(index, data){
                    var $el = $(data), elT = $el.offset().top, startLimit, endLimit;
                    startLimit = elT - _this._winH;
                    endLimit = elT + _this._winH * 2;
                    if(scrollTop >= startLimit && scrollTop < endLimit){
                        var $img = $el.find('.parralax-img'), imgY = (elT - scrollTop) / 10 * -1;
                        $img.css({transform : 'translateY(' + imgY + 'px)'});
                    }
                });
            }
        }
        Parallax.init();
    });
    })(jQuery);