var namespace = 'UI';

window[namespace] = window[namespace] || {};

/* [S] USER AGENT : [REQUIRED LIBRARY] ua-parser-js */
(function(global){
  'use strict';

  global.$window = $(window);
  global.$document = $(document);
  global.$html = $('html');
  global.$body = $('body');

  global.ua = function(){
    try {
      if (UAParser) return new UAParser();
    }
    catch(error){
      console.error(`${namespace} ERROR: ${namespace}.ua is required UAParser.`);
    }
  }();

  if (global.ua) {
    global.isMobile = global.ua.getDevice().type === 'mobile';
    global.isTablet = global.ua.getDevice().type === 'tablet';
    global.isIOS = global.ua.getOS().name === 'iOS';
    global.isAOS = global.ua.getOS().name === 'Android';
    global.isDesktop = !global.isMobile && !global.isTablet && true;

    global.isMobile && global.$html.addClass(':mobile');
    global.isTablet && global.$html.addClass(':tablet');
    global.isIOS && global.$html.addClass(':ios');
    global.isAOS && global.$html.addClass(':aos');
    global.isDesktop && global.$html.addClass(':desktop');
  }
/* [E] USER AGENT */

/* [S] COMPONENT */
  global.component = function(options){
    this.options = $.extend({ on: {} }, options);

    this.on = function(event, callback){
      if (this.is('object', event)) {
        $.each(event, function(key, value){
          this.prop('on')[key] = value;
        }.bind(this));

        this.bind && this.bind();
      }

      if (this.is('string', event) && callback) {
        this.prop('on')[event] = callback;

        switch(event){
          case 'init': this.bind && this.bind(); break;
          case 'change': this.change.observe(this); break;
          case 'scroll': this.scroll.observe(this); break;
        }
      }
    };

    this.is = function (type, target) {
      return $.type(target) === type;
    };

    this.prop = function (key, value) {
      if (value !== undefined) {
        this.options[key] = value;
        this.bind && this.bind();
      }
      else return this.options[key];
    };

    this.class = function (string) {
      return `.${this.prop(string)}`;
    };

    this.style = function(target, string){
      var tagname = 'style'
        , attribute = 'data-selector'
        , object = {};

      $(`${tagname}[${attribute}=${this.prop('selector')}]`).remove();

      object['text'] = string;
      object[attribute] = this.prop('selector');

      $(target).append($(`<${tagname}>`, object));
    };

    this.nearest = function($current, selector){
      var $result;

      do {
        $current = $current.children();
        $result = $current.filter(selector);
      }
      while (!$result.length && $current.length)

      return $result;
    };

    this.pad = function(value, char, length, after){
      var result = String(value);

      while (result.length < length) {
        result = after
          ? result + String(char)
          : String(char) + result;
      }

      return result;
    };

    this.change = {
      observe: function(context, options){
        if (!context.prop('on').change) return;

        var config = $.extend({
          attributes: true,
          childList: true,
          subtree: true,
          characterData: true,
          attributeOldValue: true,
          characterDataOldValue: true
        }, options);

        this.observer && this.disconnect();
        this.observer = new MutationObserver(context.prop('on').change);

        $.each($(context.class('selector')), function(index, target){
          this.observer.observe(target, config);
        }.bind(this));
      },
      disconnect: function(){
        this.observer && this.observer.disconnect();
      },
      takeRecords: function(){
        return this.observer && this.observer.takeRecords();
      }
    };

    this.scroll = {
      observe: function(context, options){
        if (!context.prop('on').scroll) return;

        var config = $.extend({
          root: document,
          rootMargin: '0px 0px 0px 0px',
          threshold: 0
        }, options);

        this.observer && this.disconnect();
        this.observer = new IntersectionObserver(context.prop('on').scroll, config);

        $.each($(context.class('selector')), function(index, target){
          this.observer.observe(target);
        }.bind(this));
      },
      disconnect: function(){
        this.observer && this.observer.disconnect();
      },
      takeRecords: function(){
        return this.observer && this.observer.takeRecords();
      },
      unobserve: function(){
        this.observer && this.observer.unobserve();
      }
    };
  };
/* [E] COMPONENT */

/* [S] MODAL */
  
  global.modal = function(){
      var component = new global.component({
      container: 'body',
      selector: '_modal',
      alert:'_alert',
      content: '_modal-content',
      close: '_modal-close',
      cancel: '_modal-cancel',
      confirm: '_modal-confirm',
      top: '_top',
      right: '_right',
      bottom: '_bottom',
      left: '_left',
      center: '_center',
      full: '_full',
      active: ':active',
      branch: ':modal',
      duration: '250ms',
      easing: 'cubic-bezier(.86, 0, .07, 1)',
      focus: ':rtFocus'
      });
  
      function initial(){
      this.style(this.prop('container'), style.call(this));
      this.prop('on').init && this.prop('on').init($(this.class('selector')));
      }
  
      function style(){
      return `
          ${this.class('selector')} {
          transition: opacity ${this.prop('duration')} ${this.prop('easing')};
          }
          ${this.class('selector')} ${this.class('content')} {
          transition: all ${this.prop('duration')} ${this.prop('easing')};
          }`;
      }
  
      function handlerEnd(event){}
  
      function handlerClick(event){
      var $target = $(event.target);
  
      $target.hasClass(this.prop('cancel')) && this.prop('on').cancel && this.prop('on').cancel();
      $target.hasClass(this.prop('confirm')) && this.prop('on').confirm && this.prop('on').confirm();
  
      this.hide();
      }
  
      function handlerSelector(event){
      if (!$(event.target).closest(this.class('content')).length) {
          this.hide();
          }
      }
  
      component.show = function(options){
        
      var options = $.extend({ target: null }, options);
  
      if ($(options.target).length) this.prop('target', $(options.target));
      if (!this.prop('target')) this.prop('target', $(this.class('selector')).eq(0));
      if (!this.prop('target')) return;
  
      $(this.class('selector')).removeClass(this.prop('active'));
      this.prop('target').addClass(this.prop('active'));
      // this.prop('close').css({"background":"red"});
  
      global.$html.addClass(this.prop('branch'));
      global.lock.lockup();
      global.anchor.disable(true);
  
      if (options.on) {
          this.on('confirm', options.on.confirm);
          this.on('cancel', options.on.cancel);
      }
  
      this.prop('on').show && this.prop('on').show();    
      this.change.observe(this);
  
      // WAH : btn-close focus in - bluewebd
      setTimeout(function() {
          $(options.target).find("._modal-content").attr("tabindex","0").focus();
          // $(options.target).find(".modal-content ._modal-close ").focus();
      }, 100);
      
      
      // center modal pop auto Height - bluewebd
      const _popAutoH = $(options.target).find(".modal-content");
      const _innerContH = $(options.target).find(".modal-inner").outerHeight()
          , _popHeadH = $(options.target).find(".modal-header").outerHeight()
          , _popFootH = $(options.target).find(".modal-footer").outerHeight()
          , _thisContH = _innerContH + _popHeadH + _popFootH        
          , _docH = $(window).outerHeight();  
      if (_popAutoH.hasClass("_center")) {
          if(_docH <= _thisContH ){
              console.log(_thisContH, _docH);
              $(options.target).find("._center").css({"height" : "80%"}).find(".modal-main").attr("tabindex","0");
          }
      } else if (_popAutoH.hasClass("_bottom")) {
        if(_docH <= _thisContH ){
            console.log(_thisContH, _docH);
            $(options.target).find("._bottom").css({"height" : "90%"}).find(".modal-main").attr("tabindex","0");
        }
    }
      
      }; // [e] show
  
      component.hide = function(callback){
      var $selector = this.prop('target') || $(this.class('selector'));
  
      global.$html.removeClass(this.prop('branch'));
      global.lock.unlock();
      global.anchor.disable(false);
  
      $selector.removeClass(this.prop('active')).find("._modal-content").removeAttr("tabindex");
      callback && callback($selector);
      this.prop('on').hide && this.prop('on').hide();
      delete this.prop('on').confirm;
      delete this.prop('on').cancel;
  
      if($selector.hasClass(this.prop('alert'))){
        $selector.remove();
        $("style[data-selector=_modal]").remove();
      }
  
      // WAH : btn-close focus out - bluewebd
      // WAH : return BTN
      global.wahFocus.focusOut();
      
      };
  
      component.bind = function(options){
      $(this.prop('container')).off('TransitionEnd webkitTransitionEnd', this.class('selector'));
      // $(this.prop('container')).off('touchstart', this.class('selector'));
      // $(this.prop('container')).off('click', this.class('selector')); // dimmed closing
      $(this.prop('container')).off('click', `${this.class('selector')} ${this.class('close')}`);
      $(this.prop('container')).off('click', `${this.class('selector')} ${this.class('cancel')}`);
      $(this.prop('container')).off('click', `${this.class('selector')} ${this.class('confirm')}`);
  
      $.extend(this.options, options);
  
      $(this.prop('container')).on('TransitionEnd webkitTransitionEnd', this.class('selector'), handlerEnd.bind(this));
      // $(this.prop('container')).on('touchstart', this.class('selector'), handlerSelector.bind(this));
      // $(this.prop('container')).on('click', this.class('selector'), handlerSelector.bind(this)); // dimmed closing
      $(this.prop('container')).on('click', `${this.class('selector')} ${this.class('close')}`, handlerClick.bind(this));
      $(this.prop('container')).on('click', `${this.class('selector')} ${this.class('cancel')}`, handlerClick.bind(this));
      $(this.prop('container')).on('click', `${this.class('selector')} ${this.class('confirm')}`, handlerClick.bind(this));
  
      initial.call(this);
      };
  
      return component;
  }();
  /* [E] MODAL */

  /* [S] MODAL - ALERT */

  global.alert = function(){
    var component = new global.component({
      container: 'body',
      selector: '_alert',
      confirm: '_modal-confirm',
      cancel: '_modal-cancel'
    });

    function initial(){
      this.prop('on').init && this.prop('on').init($(this.class('selector')));
    }
    
    function html(options){
      return `
        <div class="modal _modal ${this.prop('selector')}">
          <div class="modal-content _modal-content _center">
            <div class="modal-main">
              <div class="modal-inner alC">${options.message}</div>
            </div>
            <div class="modal-footer">
              <div class="btnWrap grow">
                <button type="button" aria-role="button" class="btn btn-size md bg ${this.prop('cancel')}">${options.cancel}</button>
                <button type="button" aria-role="button" class="btn btn-size md bg type2 ${this.prop('confirm')}">${options.confirm}</button>
              </div>
            </div>
          </div>
        </div>`;
    }

    function handlerClick(event){
      console.log("aaa");
      var $target = $(event.target);
  
      $target.hasClass(this.prop('cancel')) && this.prop('on').cancel && this.prop('on').cancel();
      $target.hasClass(this.prop('confirm')) && this.prop('on').confirm && this.prop('on').confirm();
  
      this.hide();
      // $selector.remove();
      }

    component.show = function(options){
      var options = $.extend({ target: this.class('selector'), message: 'message', confirm: 'confirm', cancel: null }, options)
        , timeout;

      $(this.class('selector')).remove();
      $(this.prop('container')).append(html.call(this, options));

      if (!options.cancel) $(this.class('cancel'), this.class('selector')).remove();

      clearTimeout(timeout);

      timeout = setTimeout(function(){
        global.modal.show(options);
      }, 10);

      if (options.on) {
        this.on('confirm', options.on.confirm);
        this.on('cancel', options.on.cancel);
      }

      this.prop('on').show && this.prop('on').show();
      this.change.observe(this);
    };

    component.hide = function(){
      global.modal.hide(function($selector){
        $selector.remove();
      });

      this.prop('on').hide && this.prop('on').hide();
      delete this.prop('on').confirm;
      delete this.prop('on').cancel;
    };

    component.bind = function(options){
      $(this.prop('container')).off('click', `${this.class('selector')} ${this.class('cancel')}`);
      $(this.prop('container')).off('click', `${this.class('selector')} ${this.class('confirm')}`);

      $.extend(this.options, options);

      $(this.prop('container')).on('click', `${this.class('selector')} ${this.class('cancel')}`, handlerClick.bind(this));
      $(this.prop('container')).on('click', `${this.class('selector')} ${this.class('confirm')}`, handlerClick.bind(this));

      initial.call(this);
    };

    return component;
  }();
/* [E] MODAL - ALERT */

/* [S] LOCK */
  global.lock = function(){
    var component = new global.component({
      html: 'html',
      body: 'body',
      fixed: 'guide-container',
      branch: ':lockup'
    });

    component.lockup = function(){
      this.prop('scroll', $(this.prop('html')).scrollTop());
      $(this.prop('html')).addClass(this.prop('branch'));
      $(this.class('fixed')).css('margin-top', `-${this.prop('scroll')}px`);

      this.prop('on').lockup && this.prop('on').lockup();
    };

    component.unlock = function(){
      $(this.prop('html')).removeClass(this.prop('branch'));
      $(this.prop('html')).scrollTop(this.prop('scroll'));
      $(this.class('fixed')).removeAttr('style');
      this.prop('scroll', null);

      this.prop('on').unlock && this.prop('on').unlock();
    };

    component.bind = function(options){
      $.extend(this.options, options);
    };

    return component;
  }();
/* [E] LOCK */

/* [S] ANCHOR */
  global.anchor = function(){
    var component = new global.component({
    container: 'body',
    scroller: 'html',
    selector: '_anchor',
    overflow: '_anchor-overflow',
    button: '_anchor-button',
    target: '_anchor-target',
    transform: '_anchor-transform',
    top: '_anchor-top',
    before: '_before',
    after: '_after',
    active: ':active',
    scroll: '_scroll',
    margin: 0,
    buffer: 20,
    duration: 250,
    disable: false
    });

    function initial(){
    this.height = $(this.class('selector')).outerHeight();
    this.prop('on').init && this.prop('on').init($(this.class('selector')));
    }

    function change(index){
    var $overflow = $(this.class('overflow'))
        , $buttons = $(this.class('button'))
        , $button = $buttons.eq(index)
        , scrollLeft = $overflow.scrollLeft() + $button.position().left + $button.outerWidth() / 2 - $overflow.width() / 2;

    $buttons.removeClass(this.prop('active'));
    $button.addClass(this.prop('active'));

    $overflow.stop().animate({ scrollLeft: scrollLeft }, { duration: this.prop('duration') });
    }

    function disable(boolean, delay){
    delay = delay || this.prop('duration');

    if (boolean) {
        this.prop('disable', boolean);
    }
    else {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(function(){
        this.prop('disable', boolean);
        }.bind(this), delay * 1.25);
    }
    }

    function handlerTransform(event){
    var $selector = $(this.class('selector'))
        , $button = $(this.class('button')).filter(function(index, button){
        return $(button).hasClass(this.class('active'));
        }.call(this))
        , index = $button.length ? $button.index() : 0;

    $selector.hasClass(this.prop('scroll'))
        ? $selector.removeClass(this.prop('scroll'))
        : $selector.addClass(this.prop('scroll'));

    change.call(this, index);
    }

    function handlerClick(event){
    var $button = $(event.target).closest(this.class('button'))
        , $target = $($button.attr('href'))
        , scrollTop = 0, index = 0;

    if ($button.length) {
        scrollTop = $target.position().top - this.height;
        index = $button.index();
    }

    disable.call(this, true);
    $(this.prop('scroller')).stop().animate({ scrollTop: scrollTop }, { duration: this.prop('duration') });
    change.call(this, index);
    disable.call(this, false);

    event.preventDefault();
    }

    function handlerHorizontal(event){
    var $scroller = $(event.target)
        , $selector = $(this.class('selector'));

    if ($scroller.scrollLeft() > 0) {
        if (!$selector.hasClass(this.prop('before'))) {
        $selector.addClass(this.prop('before'));
        }
    }
    else {
        if ($selector.hasClass(this.prop('before'))) {
        $selector.removeClass(this.prop('before'));
        }
    }

    if ($scroller.scrollLeft() + $scroller.width() < $scroller.prop('scrollWidth')) {
        if (!$selector.hasClass(this.prop('after'))) {
        $selector.addClass(this.prop('after'));
        }
    }
    else {
        if ($selector.hasClass(this.prop('after'))) {
        $selector.removeClass(this.prop('after'));
        }
    }
    }

    function handlerVertical(event){
    var $scroller = $(this.prop('scroller'))
        , $buttons = $(this.class('button'))
        , $targets = $(this.class('target'))
        , scrollTop = $scroller.scrollTop() + this.height;

    if (this.prop('disable')) return;

    $.each($targets, function(index, target){
        var $target = $(target);

        if ($target.position().top <= scrollTop && $target.position().top + $target.outerHeight() > scrollTop) {
        if ($buttons.eq(index).hasClass(this.prop('active'))) return;
        change.call(this, index);
        }
    }.bind(this));

    if ($scroller.scrollTop() + $scroller.height() - this.prop('buffer') > $scroller.prop('scrollHeight') - this.prop('buffer') * 2) {
        if ($buttons.eq($buttons.last().index()).hasClass(this.prop('active'))) return;
        change.call(this, $buttons.last().index());
    }
    }

    component.disable = function(boolean){
    disable.call(this, boolean);
    }

    component.bind = function(options){
    $(this.prop('container')).off('click', `${this.class('selector')} ${this.class('button')}`);
    $(this.prop('container')).off('click', `${this.class('selector')} ${this.class('top')}`);
    $(this.prop('container')).off('click', `${this.class('selector')} ${this.class('transform')}`);
    $(this.class('overflow')).off('scroll', handlerHorizontal);
    global.$window.off('scroll', handlerVertical);

    $.extend(this.options, options);

    $(this.prop('container')).on('click', `${this.class('selector')} ${this.class('button')}`, handlerClick.bind(this)).click();
    $(this.prop('container')).on('click', `${this.class('selector')} ${this.class('top')}`, handlerClick.bind(this));
    $(this.prop('container')).on('click', `${this.class('selector')} ${this.class('transform')}`, handlerTransform.bind(this));
    $(this.class('overflow')).on('scroll', handlerHorizontal.bind(this)).scroll();
    global.$window.on('scroll', handlerVertical.bind(this));

    initial.call(this);
    };

    return component;
}();
/* [E] ANCHOR */

/* [S] toolTip */

  global.toolTip = function(){
    var component = new global.component({
      container: 'body',
      selector: '_toolTip',
      content: '_toolTip-content',
      message: '_toolTip-message',
      close:'_toolTip-close',
      top: '_top',
      right: '_right',
      bottom: '_bottom',
      left: '_left',
      active: ':active',
      duration: '250ms',
      easing: 'cubic-bezier(.86, 0, .07, 1)',
      direction: 'top',
      space: 8,
      padding: 32
    });

    function initial(){
      this.style(this.prop('container'), style.call(this));
      this.prop('on').init && this.prop('on').init($(this.class('selector')));
    }

    function style(){
      return `
        ${this.class('selector')} ${this.class('content')} {
          transition: opacity ${this.prop('duration')} ${this.prop('easing')};
        }`;
    }

    function html(options){
      var html = `
        <div class="toolTip-content ${this.prop('content')} ${this.prop(options.direction)}">
          <div class="toolTip-message ${this.prop('message')}">
            <button type="button" aria-role="button" class="_toolTip-close" onclick="UI.toolTip.hide();">
              <span class="hide">창닫기</span>
            </button>
            
            <div class="message-content">${options.message}</div>
          
          </div>
        </div>`;

      return css.call(this, options, html);
    }

    function css(options, markup){
      var $html = $(markup)
        , $target = $(options.selector)
        , width = function(){
          var deviceWidth = global.$window.width();

          switch(options.direction){
            case 'top':
            case 'bottom': return deviceWidth - options.padding * 2;
            case 'left': return deviceWidth - options.padding - options.space - (deviceWidth - $target.offset().left);
            case 'right': return deviceWidth - options.padding - options.space - $target.offset().left - $target.outerWidth();
          }
        }()
        , left = function(){
          switch(options.direction){
            case 'top':
            case 'bottom': return - ($target.offset().left + $target.outerWidth() / 2) + (width / 2) + options.padding;
            case 'left':
            case 'right': return 0;
          }
        }()
        , translate = function(){
          switch(options.direction){
            case 'top': return `translateY(calc(-100% - ${this.prop('space')}px))`;
            case 'bottom': return `translateY(calc(100% + ${this.prop('space')}px))`;
            case 'left': return `translateX(calc(-100% - ${this.prop('space')}px))`;
            case 'right': return `translateX(calc(100% + ${this.prop('space')}px))`;
          }
        }.call(this);

      // $html.css({ transform: translate, width: width });
      $html.css({ transform: translate });
      $(this.class('message'), $html).css({ width: width, left: left });

      return $html;
    }

    function handlerEnd(event){
      if (!$(event.target).hasClass(this.prop('active'))) {
        $(event.target).unwrap().remove();
        this.prop('on').hide && this.prop('on').hide();
      }
    }

    component.show = function(options){
      var options = $.extend({
          selector: null,
          message: 'message',
          direction: this.prop('direction'),
          padding: this.prop('padding'),
          space: this.prop('space')
        }, options);

      if (!options.selector) return;
      if ($(options.selector).closest(this.class('selector')).length) return this.hide();

      $(this.class('content')).unwrap().remove();

      $(options.selector).wrap($('<div>', { class: this.prop('selector') }));
      $(options.selector).after(html.call(this, options));

      clearTimeout(this.timeout);

      // const _objH = $(this.class('message')).outerHeight();
      // .css({"height":_objH});

      this.timeout = setTimeout(function(){
        $(this.class('content')).addClass(this.prop('active'))
        .find(this.class('message')).attr('tabindex','0').focus();
      }.bind(this), 10);

      this.prop('on').show && this.prop('on').show();
    };

    component.hide = function(){
      $(this.class('content')).removeClass(this.prop('active')).unwrap().remove();
      global.wahFocus.focusOut();
    };

    component.bind = function(options){
      $(this.prop('container')).off('TransitionEnd webkitTransitionEnd', `${this.class('selector')} ${this.class('content')}`);

      $.extend(this.options, options);

      $(this.prop('container')).on('TransitionEnd webkitTransitionEnd', `${this.class('selector')} ${this.class('content')}`, handlerEnd.bind(this));

      initial.call(this);
    };

    return component;
  }();
/* [E] toolTip */

/* [S] TOAST */
  global.toast = function(){
    var component = new global.component({
      container: 'body',
      selector: '_toast',
      message: '_toast-message',
      active: ':active',
      duration: '250ms',
      easing: 'cubic-bezier(.86, 0, .07, 1)',
      delay: 3000
    });

    function initial(){
      this.style(this.prop('container'), style.call(this));
      this.prop('on').init && this.prop('on').init($(this.class('selector')));
    }

    function style(){
      return `
        ${this.class('selector')} {
          transition: opacity ${this.prop('duration')} ${this.prop('easing')};
        }`;
    }

    function html(options){
      var html = `
        <div class="${this.prop('selector')}">
          <p class="${this.prop('message')}">${options.message}</p>
        </div>`;

      return html;
    }

    function handlerEnd(event){
      if (!$(event.target).hasClass(this.prop('active'))) {
        $(event.target).remove();
      }
    }

    component.show = function(options){
      var options = $.extend({ message: 'message', delay: this.prop('delay') }, options);

      $(this.class('selector')).remove();
      $(this.prop('container')).append(html.call(this, options));

      setTimeout(function(){
        $(this.class('selector')).addClass(this.prop('active'));

        clearTimeout(this.timeout);

        this.timeout = setTimeout(function(){
          $(this.class('selector')).removeClass(this.prop('active')).remove();
        }.bind(this), options.delay);
      }.bind(this), 10);

      this.prop('on').show && this.prop('on').show();
    };

    component.bind = function(options){
      $(this.prop('container')).off('TransitionEnd webkitTransitionEnd', this.class('selector'));

      $.extend(this.options, options);

      $(this.prop('container')).on('TransitionEnd webkitTransitionEnd', this.class('selector'), handlerEnd.bind(this));

      initial.call(this);
    };

    return component;
  }();
/* [E] TOAST */

/* [S] WAH : FOCUS */
  // WAH : return BTN
  const _rtBtn = $('[data-focus="true"]');
  _rtBtn.on("click", function(){
    var _thisBtn = $(this);
    _thisBtn.addClass("_rtFocus");
  });

global.wahFocus = function(){
  var component = new global.component({
    body: 'body',
    rtBtn: '[data-focus="true"]',
    focus: '_rtFocus'
  });

  component.focusOut = function(){
    const _rtBtn = $('._rtFocus');
      setTimeout(function() {
        _rtBtn.removeClass('_rtFocus').focus();
    }, 100)
    this.prop('on').focusOut && this.prop('on').focusOut();
  };

  component.bind = function(options){
    $.extend(this.options, options);
  };

  return component;
}();

/* [E] WAH : FOCUS */

/* [S] INPUT */

  global.input = function(){
    var component = new global.component({
      container: 'body',
      selector: '_input',
      clear: '_input-clear',
      active: ':active'
    });

    function initial(){
      this.prop('on').init && this.prop('on').init($(this.class('selector')));
    }

    function handlerClear(event){
      var $clear = $(event.target).closest(this.class('clear'))
        , $input = $clear.siblings(this.class('selector')).find('input');

      $input.val('');
      $clear.removeClass(this.prop('active'));
    }

    function handlerChange(event){
      var $clear = $(event.target).closest(this.class('selector')).siblings(this.class('clear'));

      $(event.target).val().length
        ? $clear.addClass(this.prop('active'))
        : $clear.removeClass(this.prop('active'));
    }

    component.bind = function(options){
      $(this.prop('container')).off('click', `${this.class('selector')} ~ ${this.class('clear')}`);
      $(this.prop('container')).off('keyup', `${this.class('selector')} input`);
      $(this.prop('container')).off('keydown', `${this.class('selector')} input`);
      $(this.prop('container')).off('change', `${this.class('selector')} input`);

      $.extend(this.options, options);

      $(this.prop('container')).on('click', `${this.class('selector')} ~ ${this.class('clear')}`, handlerClear.bind(this));
      $(this.prop('container')).on('keyup', `${this.class('selector')} input`, handlerChange.bind(this));
      $(this.prop('container')).on('keydown', `${this.class('selector')} input`, handlerChange.bind(this));
      $(this.prop('container')).on('change', `${this.class('selector')} input`, handlerChange.bind(this));
      initial.call(this);
    };

    return component;
  }();
/* [E] INPUT */

/* [S] FORMATTER : [REQUIRED LIBRARY] cleave.js */

  global.formatter = function(){
    var component = new global.component({
      container: 'body',
      selector: '_format',
      number: '_number',
      price: '_price',
      date: '_date',
      time: '_time',
      phone: '_phone',
      security :'_security',
    });

    function initial(){
      this.prop('on').init && this.prop('on').init($(this.class('selector')));
      this.change.observe(this);
      this.scroll.observe(this);
    }

    function format (target){
      if ($(target).data('format')) return;

      if ($(target).hasClass(this.prop('number'))) {
        new Cleave(target, {
          numeral: true,
          numeralThousandsGroupStyle: 'none',
          onValueChanged: function(event){}
        });
      }

      if ($(target).hasClass(this.prop('security'))) {
        new Cleave(target, {
          numeral: true,
          numeralThousandsGroupStyle: 'none',
          onValueChanged: function(event){
            $(this.prop('selector')).attr("type","text");
          }
        });
      }

      if ($(target).hasClass(this.prop('number'))) {
        new Cleave(target, {
          numeral: true,
          numeralThousandsGroupStyle: 'none',
          onValueChanged: function(event){}
        });
      }

      if ($(target).hasClass(this.prop('price'))) {
        new Cleave(target, {
          numeral: true,
          numeralThousandsGroupStyle: 'thousand',
          prefix: '₩',
          // tailPrefix: true,
          noImmediatePrefix: true,
          onValueChanged: function(event){}
        });
      }

      if ($(target).hasClass(this.prop('date'))) {
        new Cleave(target, {
          date: true,
          delimiter: '.',
          // dateMin: '2000-01-01',
          // dateMax: '2099-12-31',
          datePattern: ['Y', 'm', 'd'],
          onValueChanged: function(event){}
        });
      }

      if ($(target).hasClass(this.prop('time'))) {
        new Cleave(target, {
          time: true,
          // timeFormat: '12',
          timePattern: ['h', 'm', 's'],
          onValueChanged: function(event){}
        });
      }

      if ($(target).hasClass(this.prop('phone'))) {
        new Cleave(target, {
          numericOnly: true,
          delimiter: '-',
          blocks: [3, 4, 4],
          prefix: '010',
          noImmediatePrefix: true,
          onValueChanged: function(event){}
        });
      }

      $(target).data('format', true);
    }

    function handler(event){
      try{
        if (!Cleave) return;

        format.call(this, event.target);
      }
      catch(error){
        console.error(`${namespace} ERROR: ${namespace}.formatter is required Cleave.`);
      }
    }

    component.bind = function(options){
      $(this.prop('container')).off('focusin', this.class('selector'));

      $.extend(this.options, options);

      $(this.prop('container')).on('focusin', this.class('selector'), handler.bind(this));

      initial.call(this);
    };

    return component;
  }();
/* [E] FORMATTER */


}(window[namespace]));


/* [S] INITIALIZE */
$(function(global){
  global.initial = function(){
      this.wahFocus.bind();
      // this.collapse.bind();
      // this.tabs.bind();
      this.modal.bind();
      this.alert.bind();
      // this.select.bind();
      // this.dropdown.bind();
      // this.pdf.bind();
      this.lock.bind();
      //this.popover.bind();
      this.toolTip.bind();
      this.toast.bind();
      this.input.bind();
      this.formatter.bind();      
      
      // this.checkbox.bind();
      // this.calendar.bind();
      // this.datepicker.bind();
      // this.graph.bind();
      // this.progress.bind();
      // this.anchor.bind();
  };

  global.initial();
}(window[namespace]));
/* [E] INITIALIZE */