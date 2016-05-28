(function($){
	'use strict';

	if(!console){
		var consoleFix = function() {};
		window.console = {log:consoleFix, info:consoleFix, warn:consoleFix, debug:consoleFix, error:consoleFix};
	}

	if(typeof($)==='undefined') {
		console.error('[CC Slider] No jQuery detected.');
		return false;
	}
	else if(typeof($.fn.slidercc)==='undefined') {
		console.error('[CC Slider] No core found.');
		return false;
	}

	// var mode = {
	// 	name: 'carousel'
	// };
	var modeName = 'carousel';
	var Mode = function(){
		this.name = modeName;
	};

	Mode.prototype.defaults = {
		/* percentage must be set as string,
		 * includes margins,
		 * margins for percantege widths are reduced to achieve left and right alignment
		 */
		adaptiveHeight: false, // true, false
		autoPlay: false,
		slideWidth: '25%',
		slideMargin: 30,
		activeAlign: 'left', // left, right, center, center-always
		scrollLimit: true
	};

	Mode.prototype.init = function(){
		this.namespace = this.slider.opts.namespace;
		this.animate = this.slider.animate;
		this.opts = this.slider.opts;
		this.setAnimations();
		// console.log('Mode.prototype.init', this.slider.$wrap.attr('id'));
		this.bind();
		this.slider.$slides.eq(this.slider.active).addClass(this.namespace+'-active');
	};

	Mode.prototype.setAnimations = function(){
		// var _this = this;
		if(this.opts.animationMethod==='css'){
			if(window.Modernizr && Modernizr.prefixed('transform')==='WebkitTransform'){
				this.slider.$slideList.css('transition', '-webkit-transform '+this.opts.animationSpeed+'ms '+this.opts.easing+'');
			}
			else {
				this.slider.$slideList.css('transition', 'transform '+this.opts.animationSpeed+'ms '+this.opts.easing+'');
			}
		}
		else if($.fn.velocity) {
		}
		else {
		}
	};


	Mode.prototype.reset = function(){

	};

	Mode.prototype.bind = function(){
		var _this = this;
		this.slider.$wrap.on(this.namespace+'-prev', $.proxy(this.prev, this));
		this.slider.$wrap.on(this.namespace+'-next', $.proxy(this.next, this));
		this.slider.$wrap.on(this.namespace+'-slideTo', $.proxy(this.slideTo, this));
		if(this.name==='slide') {this.slider.$wrap.on(this.namespace+'-setActive', $.proxy(this.slideTo, this));}
		else {this.slider.$wrap.on(this.namespace+'-setActive', $.proxy(this.setActive, this));}
		// this.slider.$wrap.on(this.namespace+'-ready', $.proxy(this.start, this));
		// console.log('Mode.prototype.bind',_this.slider.$wrap.attr('id'));
		if(_this.slider.$wrap.attr('id')==='demo1') {_this.test = _this.slider.$wrap;}
		this.slider.$wrap.on(this.namespace+'-ready', function(){
			// console.log('Mode.prototype.bind on -ready',_this.slider.$wrap.attr('id'), _this.test);
			_this.start();
		});
	};

	Mode.prototype.start = function(){
		// console.log('Mode.prototype.start', this.slider.$wrap.attr('id'));
		var _this = this;
		var $current = this.slider.$slides.eq(this.slider.current);
		// $current.css('zIndex', 2);
		this.maxHeight = $current.outerHeight();
		this.slider.$viewport.height(this.maxHeight);
		this.slider.$wrap.addClass(this.namespace+'-mode-'+this.name);
		_this.setDimentions();
		this.slideTo(this.slider.current, null, true);
		this.slider.$slides
		.css({
			opacity: 1,
			display: 'block',
			float: 'left',
			boxSizing: 'border-box'
		})
		.imagesLoaded(function(){
			_this.setDimentions();
		});
	};

	Mode.prototype.prev = function(){
		if(this.slider.next > 0){
			this.slider.$wrap.trigger(this.namespace+'-slideTo', this.slider.next - 1);
		}
		else if(this.opts.loop){
			this.slider.$wrap.trigger(this.namespace+'-slideTo', this.slider.slideCount - 1 );
		}
	};

	Mode.prototype.next = function(e, d){
		if(this.slider.next < this.slider.slideCount - 1){
			this.slider.$wrap.trigger(this.namespace+'-slideTo', this.slider.next * 1 + 1);
		}
		else if(this.opts.loop || (d && d.auto)){
			this.slider.$wrap.trigger(this.namespace+'-slideTo', 0 );
		}
	};

	Mode.prototype.setActive = function(e, d){
//		var _this = this;
		var target = e instanceof jQuery.Event ? d : e;
		this.slider.active = target;
		this.slider.$wrap.trigger(this.namespace+'-slideTo', [this.slider.$slides[target].screen, 'setActive', true] );
	};

	Mode.prototype.slideTo = function(e, d, force, preserveActive){
		var _this = this;
		var target = e instanceof jQuery.Event ? d : e;
		if(!force && (this.slider.animating || target===this.slider.current)) {return;}
		if(this.opts.autoPlay){
			_this.slider.startAutoplay();
		}
		var $nextScreen = this.screens[target];
		var $currentScreen = this.screens[this.slider.current];
		if(!$nextScreen || !$currentScreen) {return;}
		var $next = this.slider.$slides.eq($nextScreen.firstSlide);//.addClass(this.namespace+'-in');
		var $current = this.slider.$slides.eq($currentScreen.firstSlide);//.addClass(this.namespace+'-out');
		if(this.opts.lockDuringAnimation) {this.slider.animating = true;}
		this.slider.next = target;
		// if(_this.opts.changePaginations=='before') _this.slider.active = this.screens[target].firstSlide;
		if(!preserveActive) {_this.slider.active = this.screens[target].firstSlide;}
		this.slider.$wrap.trigger(this.namespace+'-before', {old: $current, new: $next});
		if(this.opts.adaptiveHeight) {this.slider.$viewport.height($next[0].slideHeight);}
		if(_this.opts.scrollLimit){
			this.animate.slide(this.slider.$slideList, Math.min(0, Math.max(-_this.slideWidthSum+_this.slider.wrapWidth, -$nextScreen.position)), force && force!=='setActive');
		}
		else {
			this.animate.slide(this.slider.$slideList, -$nextScreen.position, force && force!=='setActive');
		}
		setTimeout(function(){
			_this.slider.current = target;
			// $current.removeClass(_this.namespace+'-out');
			// $next.removeClass(_this.namespace+'-in');
			// if(_this.opts.changePaginations=='after') _this.slider.active = this.screens[target].firstSlide;
			_this.slider.$wrap.trigger(_this.namespace+'-after', {old: $current, new: $next});
			_this.slider.animating = false;
		}, this.opts.animationSpeed);
	};

	Mode.prototype.setDimentions = function(){
		var _this = this;
		var slideWidth, slideMargin;
		this.slideWidthSum = 0;
		this.maxHeight = 0;
		this.screens = [{
			position: 0,
			firstSlide: 0
		}];
		if($.isNumeric(this.opts.slideMargin)) {
			slideMargin = this.opts.slideMargin;
		}
		else if(/^[0-9\.]+\%$/.test(this.opts.slideMargin) ){
			slideMargin = parseFloat(this.opts.slideMargin) / 100 * this.slider.wrapWidth;
		}
		else {
			slideMargin = 0;
		}
		if($.isNumeric(this.opts.slideWidth)) {
			slideWidth = this.opts.slideWidth - slideMargin;
		}
		else if(/^[0-9\.]+\%$/.test(this.opts.slideWidth) ){
			var w = parseFloat(this.opts.slideWidth) / 100;
			slideWidth = Math.round((w * this.slider.wrapWidth - slideMargin * (1 - w)) * 1000) / 1000;
		}
		else if( $(this.opts.slideWidth).length>0 ){
			slideWidth = $(this.opts.slideWidth).outerWidth();
		}
		else {
			slideWidth = this.slider.wrapWidth - slideMargin;
		}
		slideWidth = Math.round(slideWidth);
		var tmpPosition = 0;
		this.slider.$slides.each(function(i){
			$(this).css({minHeight: 0, width: slideWidth, marginRight: slideMargin});
			this.slideHeight = $(this).outerHeight();
			this.slideWidth = $(this).outerWidth(true);

			// this.slidePosition = _this.slideWidthSum;
			if(_this.opts.activeAlign==='center' || _this.opts.activeAlign==='center-always'){
				this.slidePosition = _this.slideWidthSum - _this.slider.wrapWidth/2 + (this.slideWidth - slideMargin)/2;
			}
			else if(_this.opts.activeAlign==='right'){
				this.slidePosition = _this.slideWidthSum - _this.slider.wrapWidth + this.slideWidth - slideMargin;
			}
			else {
				this.slidePosition = _this.slideWidthSum;
			}

			_this.slideWidthSum += this.slideWidth;
			$(this).css('minHeight', '');
			if(this.slideHeight > _this.maxHeight) {
				_this.maxHeight = this.slideHeight;
			}
			if(_this.name==='carousel'){
				// console.log(tmpPosition, this.slidePosition, _this.screens.length);
				if(_this.slideWidthSum - slideMargin - tmpPosition > _this.slider.wrapWidth ){
					tmpPosition = this.slidePosition;
					_this.screens.push( {
						position: this.slidePosition,
						firstSlide: i
					} );
				}
			}
			else if(i>0) {
				_this.screens.push( {
					position: this.slidePosition,
					firstSlide: i
				} );
			}
			this.screen = _this.screens.length-1;
		});
		this.slider.$slides.last().css({marginRight: 0});
		_this.slideWidthSum -= slideMargin;
		this.slider.$slideList.css({width: this.slideWidthSum + 1});
		if(this.opts.adaptiveHeight) {
			this.slider.$viewport.height( this.slider.$slides[this.slider.current].slideHeight );
		} else {
			this.slider.$viewport.height(this.maxHeight);
		}
//		if(this.opts.arrows) {this.slider.$arrows.children().height( this.maxHeight );}
	};

	Mode.prototype.resize = function(){
		// // console.log('ok');
		this.setDimentions();
		this.slideTo(this.slider.current, null, true);
	};

	var modeSlideName = 'slide';
	var ModeSlide = function(){
		this.name = 'slide';
	};

	// ModeSlide.prototype = Mode.prototype;

	$.each(Mode.prototype, function(key, val){
		if(key!=='defaults') {ModeSlide.prototype[key] = val;}
	});

	ModeSlide.prototype.defaults = {
		adaptiveHeight: true, // true, false
		autoPlay: 3000,
		slideWidth: '100%',
		slideMargin: 0,
		activeAlign: 'center',
		scrollLimit: true
	};

	$.fn.slidercc.insertMode(modeName, Mode);
	$.fn.slidercc.insertMode(modeSlideName, ModeSlide);

})(jQuery);
