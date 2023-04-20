/**
 * KB기업 2022
 * JS Loader : A Temp File
 */
if (!UICommon) {
  var UICommon = function () {
      function constructor() {
          return UICommon();
      }

      var init = function () {
          uiReset();
          uiDevice.check();
          uiDevice.hide();
          accordionButton.init(); //아코디온
          tabMenu.init(); //탭메뉴
          progressDiv.init(); //스탭
          countNumber.init(); //countNumber
          toggleButton.init(); //토글
          staffHopeSelect.init();//권유희망직원 선택
          anckorScroll.init(); //하단스크롤
          selectItem.init(); //항목선택
          transferMoney.init(); //이체 금액 입력폼
          dDay.init(); //거래내역조회 디데이위치
          scTop.init(); //추가정보입력 스크롤
          tooltipButton.init(); //툴팁
          uiSwiper.init(); //스와이프
          uiEffect.init(); //UI모션효과
          Layer.init(); //팝업
          orderDragBtn.dragIs();
          _front.init();
      }

      var $focusableEl = '[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]';
      var $inputEl = 'input[type=text]:not([disabled]), input[type=tel]:not([disabled]), textarea:not([disabled])';
      var originalPotion = false;
      var isSwipe = true;

      var uiReset = function () {
          Body.unlock();
          $('html').removeClass('keypad_open');
          if ($('#wrap').length) $('#wrap').removeAttr('aria-hidden');
          if ($('#content').length) $('#content').removeAttr('aria-hidden');
          originalPotion = false;
      }

      /* 페이지중복확인 */
      var $targetPage = function () {
          // return $('.pt-page').length > 1 ? $($('.pt-page')[1]) : $('.pt-page');
          var $returnDoc = $(document);
          if (window.SPA) {
              $returnDoc = $('.pt-page').length > 1 ? $($('.pt-page')[1]) : $('.pt-page');
          }

          return $returnDoc;
      }

      // 현재 화면에 선택 영역이 보이는지
      var isScreenIn = function (target, add) {
          if (add == undefined) add = 0;
          var $window = $(window),
              $wHeight = $window.height() + add,
              $scrollTop = $window.scrollTop(),
              $winBottom = ($scrollTop + $wHeight);
          var $el = $(target),
              $elHeight = $($el).outerHeight(),
              $elTop = $($el).offset().top,
              $elCenter = $elTop + ($elHeight / 2),
              $elBottom = $elTop + $elHeight;

          if (($elCenter >= $scrollTop) && ($elCenter <= $winBottom)) {
              return true;
          } else {
              return false;
          }
      }

      // 숫자만 
      var onlyNumber = function (num) {
          return num.toString().replace(/[^0-9]/g, '');
      };

      //PC 디바이스 체크
      uiPC = {
          window: function () {
              return navigator.userAgent.match(/windows/i) == null ? false : true;
          },
          mac: function () {
              return navigator.userAgent.match(/macintosh/i) == null ? false : true;
          },
          chrome: function () {
              return navigator.userAgent.match(/chrome/i) == null ? false : true;
          },
          firefox: function () {
              return navigator.userAgent.match(/firefox/i) == null ? false : true;
          },
          opera: function () {
              return navigator.userAgent.match(/opera|OPR/i) == null ? false : true;
          },
          safari: function () {
              return navigator.userAgent.match(/safari/i) == null ? false : true;
          },
          edge: function () {
              return navigator.userAgent.match(/edge/i) == null ? false : true;
          },
          msie: function () {
              return navigator.userAgent.match(/rv:11.0|msie/i) == null ? false : true;
          },
          ie11: function () {
              return navigator.userAgent.match(/rv:11.0/i) == null ? false : true;
          },
          ie10: function () {
              return navigator.userAgent.match(/msie 10.0/i) == null ? false : true;
          },
          ie9: function () {
              return navigator.userAgent.match(/msie 9.0/i) == null ? false : true;
          },
          ie8: function () {
              return navigator.userAgent.match(/msie 8.0/i) == null ? false : true;
          },
          any: function () {
              return uiPC.window() || uiPC.mac();
          },
          check: function () {
              if (uiPC.any()) {
                  $('html').addClass('pc');
                  if (uiPC.window()) $('html').addClass('window');
                  if (uiPC.mac()) $('html').addClass('mac');
                  if (uiPC.msie()) $('html').addClass('msie');
                  if (uiPC.ie11()) $('html').addClass('ie11');
                  if (uiPC.ie10()) $('html').addClass('ie10');
                  if (uiPC.ie9()) $('html').addClass('ie9');
                  if (uiPC.ie8()) $('html').addClass('ie8');
                  if (uiPC.edge()) {
                      $('html').addClass('edge');
                  } else if (uiPC.opera()) {
                      $('html').addClass('opera');
                  } else if (uiPC.chrome()) {
                      $('html').addClass('chrome');
                  } else if (uiPC.safari()) {
                      $('html').addClass('safari');
                  } else if (uiPC.firefox()) {
                      $('html').addClass('firefox');
                  }
              }
          }
      };


      //모바일 디바이스 체크
      var uiMobile = {
          Android: function () {
              return navigator.userAgent.match(/Android/i) == null ? false : true;
          },
          BlackBerry: function () {
              return navigator.userAgent.match(/BlackBerry/i) == null ? false : true;
          },
          iOS: function () {
              return navigator.userAgent.match(/iPhone|iPad|iPod/i) == null ? false : true;
          },
          iPhone: function () {
              return navigator.userAgent.match(/iPhone/i) == null ? false : true;
          },
          iPad: function () {
              return navigator.userAgent.match(/iPad/i) == null ? false : true;
          },
          iPhoneVersion: function () {
              const $sliceStart = navigator.userAgent.indexOf('iPhone OS') + 10;
              const $sliceEnd = $sliceStart + 2;
              const $version = parseFloat(navigator.userAgent.slice($sliceStart, $sliceEnd));
              return $version;
          },
          Opera: function () {
              return navigator.userAgent.match(/Opera Mini/i) == null ? false : true;
          },
          Windows: function () {
              return navigator.userAgent.match(/IEMobile/i) == null ? false : true;
          },
          tablet: function () {
              if (uiMobile.any()) {
                  if (window.screen.width < window.screen.height) {
                      return window.screen.width > 760 ? true : false;
                  } else {
                      return window.screen.height > 760 ? true : false;
                  }
              }
          },
          any: function () {
              return uiMobile.Android() || uiMobile.iOS() || uiMobile.BlackBerry() || uiMobile.Opera() || uiMobile.Windows();
          },
          check: function () {
              if (uiMobile.any()) {
                  $('html').addClass('mobile');
                  if (uiMobile.tablet()) $('html').addClass('tablet');
              }
              if (uiMobile.iOS()) $('html').addClass('ios');
              if (uiMobile.Android()) $('html').addClass('android');
              //if(uiMobile.iPhoneVersion() >= 12)$('html').addClass('ios12');
          }
      };

      //디바이스체크 실행
      var uiDevice = {
          iPhone8PlusH: 736,
          screenH: window.screen.height,
          screenW: window.screen.width,
          isIPhoneX: function () {
              $('html').addClass('iPhone-X');
          },
          notIPhoneX: function () {
              $('html').removeClass('iPhone-X');
          },
          check: function () {
              uiMobile.check();
              uiPC.check();
              if (uiMobile.any()) {
                  const $pixelRatio = Math.round(window.devicePixelRatio);
                  if (!!$pixelRatio) $('html').addClass('pixel-ratio-' + $pixelRatio);
              }
              const $isIPhoneX = uiMobile.iPhone() && uiDevice.screenH > uiDevice.iPhone8PlusH ? true : false;
              if ($isIPhoneX) {
                  //첫로딩
                  if ($(window).width() < $(window).height()) {
                      uiDevice.isIPhoneX();
                  } else {
                      uiDevice.notIPhoneX();
                  }
              }

              //가로, 세로 회전시
/*                 if (uiMobile.any()) {
                  if (window.orientation == 0) {
                      $('html').removeClass('landscape');
                  } else {
                      $('html').addClass('landscape');
                  }
                  $(window).on('orientationchange', function () {
                      if (window.orientation == 0) {
                          $('html').removeClass('landscape');
                          if ($isIPhoneX) uiDevice.isIPhoneX();
                      } else {
                          $('html').addClass('landscape');
                          if ($isIPhoneX) uiDevice.notIPhoneX();
                      }
                  });
              } */

              // 최소기준 디바이스(가로)크기보다 작으면 meta[name="viewport"] 수정
/*                const deviceMinWidth = 320;
              if ($(window).width() < deviceMinWidth) {
                  const $viewport = $('meta[name="viewport"]');
                  // const $content = $viewport.attr('content');
                  const $newContent = 'width=' + deviceMinWidth + ',user-scalable=no,viewport-fit=cover';
                  $viewport.attr('content', $newContent);
              } */
          },
          hide: function () {
              if ($('[data-device-hide]').length) {
                  $('[data-device-hide]').each(function () {
                      const $device = $(this).data('device-hide');
                      if (uiMobile.any()) {
                          //모바일
                          if ($device == 'ios' && uiMobile.iOS()) {
                              $(this).hide();
                          } else if ($device == 'android' && uiMobile.Android()) {
                              $(this).hide();
                          }
                      } else {
                          //PC
                          if ($device == 'ios' && $('html').hasClass('safari')) {
                              $(this).hide();
                          } else if ($device == 'android' && !$('html').hasClass('safari')) {
                              $(this).hide();
                          }
                      }
                  });
              }
          }
      };

      /* [Biz-007] 계좌순서 변경 기능 개선s */
      var orderList = {
          flag: false,
          evtStop: function (thisLi) {
              if (orderList.flag == true) {
                  thisLi.each(function () {
                      $(this).css('z-index', '-1')
                  });
              } else {
                  thisLi.each(function () {
                      $(this).css('z-index', '0')
                  });
              }
          },
          liEachSet: function (thisLi) {
              var itemHeight = 0;
              thisLi.each(function (index, item) {
                  thisLi.removeClass('last first');
                  if ($(this).hasClass('hidden')) {
                      $(this).css('top', 0);
                  } else {
                      $(this).css('top', itemHeight);
                      itemHeight += Math.ceil($(item).outerHeight());
                  }
              });
              thisLi.eq(0).addClass('first');
              thisLi.eq(-1).addClass('last');
              return itemHeight;
          },
          liPosHeight: function (upParent, upParentNP) {
              var upParentTop = parseInt(upParent.css('top'));
              var upParentheight = Math.ceil(upParent.outerHeight());
              var upParentNPTop = parseInt(upParentNP.css('top'));
              var upParentNPHeight = Math.ceil(upParentNP.outerHeight());
              return [upParentTop, upParentheight, upParentNPTop, upParentNPHeight];
          },
          compareOff: function (_re) {
              var toggleIs = $('.tit_area.js_toggle.on');
              if (toggleIs.length > 0 && !_re == 're') {
                  toggleIs.each(function () {
                      var thisLi = $(this).next().children().find('.li');
                      thisLi.each(function (index, item) {
                          $(this).removeAttr('style');
                      });
                      $(this).next().children().removeAttr('style');
                  });
              } else if (_re == 're') {
                  var newListDrag = $('.new_list_drag');
                  newListDrag.children().each(function () {
                      $(this).removeClass('chosen')
                      $(this).removeAttr('style');
                  });
                  newListDrag.removeClass('type_drag').addClass('drag').removeAttr('style');
              } else {
                  var thisLi = $('.drag').children();
                  thisLi.each(function (index, item) {
                      $(this).removeAttr('style');
                  });
                  thisLi.parent().removeAttr('style');
              }
          },
          compareOn: function (_currentClass, _this,) {
              if (_currentClass == 'orderSet') {
                  var toggleIs = $('#wrap .tit_area.js_toggle.on'); // [전담반 Biz-171] 대표계좌 설정 개선 :20220405 개발 피드백 수정
                  if (toggleIs.length > 0) {
                      console.log('test1');
                      toggleIs.each(function () {
                          var thisLi = $(this).next().children().find('.li');
                          var itemHeight = orderList.liEachSet(thisLi);
                          $(this).next().children().css('height', itemHeight);
                      });
                  } else {
                      console.log('test');
                      var thisLi = $('.type_drag').children();
                      var itemHeight = orderList.liEachSet(thisLi);
                      thisLi.parent().css('height', itemHeight);
                  }
              } else if (_currentClass == 'type_drag') {
                  var thisLi = _this.next().children().find('.li');
                  var itemHeight = orderList.liEachSet(thisLi);
                  _this.next().children().css('height', itemHeight);
              }
          },
          orderUp: function (_this) {
              var upParent = _this.closest($('.li'));
              var thisLi = _this.closest($('.type_drag')).children();
              var upParentNP = upParent.prev();
              var [upParentTop, upParentheight, upParentNPTop, upParentNPHeight] = orderList.liPosHeight(upParent, upParentNP);
              // animate stop
              orderList.flag = true;
              orderList.evtStop(thisLi);

              upParent.animate({ top: upParentTop - upParentNPHeight + 'px' }, 200);
              upParentNP.animate({ top: upParentNPTop + upParentheight + 'px' }, 200, function () {


                  upParent.insertBefore(upParentNP);
                  // 순서 변경 여부 개발 펑션 호출 - 없을 경우 퍼블 인터렉션 펑션만 호출
                  if (window.SPA_COMMON) {
                      window.SPA_COMMON.callbackWithSPA('chkModfiList', _this);
                  }
                  orderList.compareOn('orderSet');
                  // animate start
                  orderList.flag = false;
                  orderList.evtStop(thisLi);
              });
              // 애니메이션 완료 후 호출
              $('.new_list_drag .li').removeClass('chosen');
              upParent.addClass('chosen');

          },
          orderDown: function (_this) {
              var upParent = _this.closest($('.li'));
              var thisLi = _this.closest($('.type_drag')).children();
              var upParentNP = upParent.next();
              var [upParentTop, upParentheight, upParentNPTop, upParentNPHeight] = orderList.liPosHeight(upParent, upParentNP);
              // animate stop
              orderList.flag = true;
              orderList.evtStop(thisLi);
              upParent.animate({ top: upParentTop + upParentNPHeight + 'px' }, 200);
              upParentNP.animate({ top: upParentNPTop - upParentheight + 'px' }, 200, function () {
                  upParent.insertAfter(upParentNP);
                  // 순서 변경 여부 개발 펑션 호출 - 없을 경우 퍼블 인터렉션 펑션만 호출
                  if (window.SPA_COMMON) {
                      window.SPA_COMMON.callbackWithSPA('chkModfiList', _this);
                  }
                  orderList.compareOn('orderSet');
                  // animate start
                  orderList.flag = false;
                  orderList.evtStop(thisLi);
              });
              // 애니메이션 완료 후 호출
              $('.new_list_drag .li').removeClass('chosen');
              upParent.addClass('chosen');
          },
          init: function (_currentClass) {
              var btnMove = $('.move_area button');
              orderList.compareOn(_currentClass);
              btnMove.each(function () {
                  $(this).off('click').on('click', function (e) {
                      e.preventDefault();
                      var $this = $(this),
                          $list = $this.closest('.acc_list'),
                          $btnDel = $list.find('.btn_move_del');
                      //if ($btnDel.length) $btnDel.hide();
                      if ($this.hasClass('btn_up')) {
                          orderList.orderUp($this);
                      } else if ($this.hasClass('btn_down')) {
                          orderList.orderDown($this);
                      } else {
                          return;
                      }
                  });
              });
          }
      }
      // drag start
      var orderDragBtn = {
          drag_id: [],
          dragIs: function () {
              orderDragBtn.drag_id = new Array();
              var dragListIs = $('.new_list_drag');
              dragListIs.each(function (index, item) {
                  orderDragBtn.drag_id.push($(item).attr('id'));
              });
              orderDragBtn.accountSetup(orderDragBtn.drag_id);
          },
          accountSetup: function (id) {
              for (var i = 0; i < id.length; i++) {
                  Sortable.create(document.getElementById(id[i]), {
                      handle: '.btn_move',
                      animation: 150,
                      scrollSensitivity: 30,
                      deley: 3,
                      onStart: function (evt) {
                          var el = $(this.el);
                          var accPnnel = el.children('.li');
                          _chosen = accPnnel.filter('.sortable-chosen');
                          $('.new_list_drag .li').removeClass('chosen');
                          accPnnel.filter(':not(.sortable-drag)').addClass('opac');
                      },
                      onEnd: function () {
                          var el = $(this.el);
                          var accPnnel = el.children('.li');
                          accPnnel.filter(':not(.sortable-drag)').removeClass('opac');
                          _chosen.addClass('chosen');
                          //if(accPnnel.find('.btn_move_del').length) accPnnel.find('.btn_move_del').hide();

                          // 순서 변경 여부 개발 펑션 호출 - 없을 경우 퍼블 인터렉션 펑션만 호출
                          var btnMove = _chosen.children('.btn_move').eq(1);
                          if (window.SPA_COMMON) {
                              window.SPA_COMMON.callbackWithSPA('chkModfiList', btnMove);
                          }
                      }
                  });
                  orderDragBtn.selectDragSort();
              }
          },
          selectDragSort: function () {
              $(document).off('click', '.sel_drag_sort .selection input').on('click', '.sel_drag_sort .selection input', function (e) {
                  var _this = $(this);
                  var _listDrag = $('.new_list_drag')
                  var _st = $(window).scrollTop();

                  if (_this.closest('.selection').hasClass('drag_move')) {
                      _listDrag.removeClass('type_drag').addClass('drag');
                      orderList.compareOff();

                  } else if (_this.closest('.selection').hasClass('button_move')) {
                      _listDrag.removeClass('drag').addClass('type_drag');
                      orderList.init('orderSet');
                      $('body,html').animate({ scrollTop: _st }, 0);
                  }
              });
          }
      }
      /* [Biz-007] 계좌순서 변경 기능 개선e */

      // 스크롤바 이동속도 제어 구현 SPA ::: 공통
      // 호출시 durationScrollTo(현재위치, 시간)
      const durationScrollTo = (y, duration = 1000) => {
          const stepY = (y - window.scrollY) / duration;
          const currentY = window.scrollY;
          const startTime = new Date().getTime();
          const scrollerInterval = setInterval(() => {
              const now = new Date().getTime() - startTime;
              window.scrollTo({ top: currentY + (stepY * now) });
              if (duration <= now) {
                  clearInterval(scrollerInterval);
              }
          }, 1);
      }

      /* 아코디온 from accordion.html */
      var accordionButton = {
          init: function () {
              accordionButton.set();
              accordionButton.accordion();
              // 알려드립니다. 상세보기 
              accordionButton.toggle();
              accordionButton.toggler(); // 자금관리 > 다른금융계좌 check와 함께 사용시
              // accordionButton.reminder();
              // accordionButton.slideToggler();
          },
          set: function () {
              $('.js_accordion').each(function () {
                  var $tit = $(this).find('.tit'),
                      $li = $(this).find('> li'),
                      $btn = $tit.find('.btn_acco');
                  
                  // if (!$tit.find('.arrow').length) // async 개발화면 로드 관련 주석 20220916
                  if (!($tit.find('.arrow').length == $li.length)) $tit.append('<span class="arrow"><span class="hidden">열기</span></span>');
                  // 서브 아코디언 화살표 아이콘 수정 0726
                  if ($tit.hasClass('link')) $tit.find('.hidden').remove();

                  if (!$btn.find('.arrow').length) {
                      $btn.append('<span class="arrow"><span class="hidden">열기</span></span>');
                      $btn.siblings('span.arrow').remove();
                  }

                  if ($li.hasClass('on')) {
                      $li.children('a').attr('aria-expanded', true);
                      $li.parents('li').addClass('on').children('a').attr('aria-expanded', true);
                  }
              });
              $('.js_toggle').each(function () {
                  var $this = $(this);
                  if (!$this.find('.arrow').length) $this.append('<span class="arrow"><span class="hidden">열기</span></span>');
              });
          },
          accordion: function () {

              if ($('.js_accordion li').hasClass('on')) {
                  $('.js_accordion li.on').children('.toggle_panel').css('display', 'block');
              }
              var $trigger = '.js_accordion a.tit, .js_accordion button.tit, .js_accordion .btn_acco';
              $(document).off('click', $trigger).on('click', $trigger, function (e) { //2022-07-20 es
                  e.preventDefault();
                  e.stopPropagation(); // button event stop
                  var _this = $(this),
                      _li = _this.parents('li'),
                      _lipar = _this.parent('li'),
                      _litree = $('.toggle_panel > ul > li'),
                      _parent = _li.parent('.js_accordion'),
                      spd = 300;

                  if (_parent.hasClass('live')) {
                      $(this).next('.toggle_panel').stop().clearQueue().slideToggle(spd, function () {
                          if ($(this).prev('.tit').hasClass('on')) {
                              $(this).prev('.tit').attr({ 'aria-expanded': 'false' }).removeClass('on');
                              $(this).parent('li').removeClass('on');
                              _this.find('.arrow>span.hidden').text('열기');
                          } else {
                              $(this).prev('.tit').attr({ 'aria-expanded': 'true' }).addClass('on');
                              $(this).parent('li').addClass('on');
                              _this.find('.arrow>span.hidden').text('닫기');
                          }
                      });
                  } else if (_parent.hasClass('tree')) {
                      if (_lipar.hasClass('on')) {
                          _this.attr('aria-expanded', 'false').parent('li').removeClass('on').find('.toggle_panel').slideUp(spd);

                          if (_this.parent('li').find('.list_acco li').is('.on')) {
                              _litree.removeClass('on').children('a').attr('aria-expanded', 'false');
                              _this.find('.arrow>span.hidden').text('열기');
                          } else {
                              _this.closest('.js_accordion').find('> li').removeClass('on').children('a').attr('aria-expanded', 'false');
                          }
                      } else {
                          _this.attr('aria-expanded', 'true').parent('li').find('> .toggle_panel').slideDown(spd).parent('li').addClass('on');
                          _lipar.siblings('li').removeClass('on').children('a').attr('aria-expanded', 'false');
                          _lipar.siblings('li').find('> .toggle_panel').slideUp(spd).children('li').removeClass('on');
                          _this.find('.arrow>span.hidden').text('닫기');
                      }
                  } else { // default
                      if (_li.hasClass('on')) {
                          _this.attr('aria-expanded', 'false').parents('li').removeClass('on').find('.toggle_panel').slideUp(spd);
                          _this.find('.arrow>span.hidden').text('열기');
                      } else {
                          _this.attr('aria-expanded', 'true').parents('li').find('.toggle_panel').slideDown(spd).parents('li').addClass('on');
                          if (!_parent.hasClass('toggle')) _li.siblings('li').removeClass('on').find('.btn_acco, .tit').attr('aria-expanded', 'false').next('.toggle_panel').slideUp(spd);
                          _this.find('.arrow>span.hidden').text('닫기');
                      }
                  }

                  if (_this.find('input[type=checkbox]:checked').length) {
                      _this.find('input[type=checkbox]').prop('checked', false).attr('checked', false);
                  } else {
                      _this.find('input[type=checkbox]').prop('checked', true).attr('checked', true).parents('li').siblings().find('input[type=checkbox]').prop('checked', false).attr('checked', false);
                  }

                  UICommon.scTop.topMove(_this);
              });
          },
          toggle: function () {
              if ($('.js_toggle').length > 0) {
                  $('.js_toggle').each(function () {
                      var _this = $(this);
                      var _toggleSmWrap = _this.parents('.toggle_sm_wrap');
                      if (_this.attr('aria-expanded') === 'true') {
                          if (_toggleSmWrap.length) {
                              _toggleSmWrap.addClass('on');
                              _this.find('.arrow>span.hidden').text('닫기');
                          } else if (_toggleSmWrap.length === 0 && _this.attr('aria-controls') !== undefined) {
                              var $panel = $('#' + _this.attr('aria-controls'));
                              _this.addClass('on');
                              _this.find('.arrow>span.hidden').text('닫기');
                              $panel.show();
                          }
                      }
                  });
              };
              $(document).off('click', '.js_toggle').on('click', '.js_toggle', function (e) {
                  e.preventDefault();
                  var _this = $(this),
                      _toggleSmWrap = _this.parents('.toggle_sm_wrap'),
                      _isToggleSmWrap = false;

                  if (_this.hasClass('switch')) { // accordion
                      if (_this.hasClass('on')) {
                          _this.attr('aria-expanded', 'false').removeClass('on').parent('li').siblings('li').children('.js_toggle').removeClass('on').attr('aria-expanded', 'false');
                      } else {
                          _this.attr('aria-expanded', 'true').addClass('on').parent('li').siblings('li').children('.js_toggle').removeClass('on').attr('aria-expanded', 'false');
                      }
                  } else if (_toggleSmWrap.length) {
                      if (_toggleSmWrap.hasClass('on')) {
                          setTimeout(function () {
                              _this.attr('aria-expanded', 'false');
                              _toggleSmWrap.removeClass('on');
                              _this.find('.arrow>span.hidden').text('열기');
                          }, 0);
                      } else {
                          setTimeout(function () {
                              _this.attr('aria-expanded', 'true');
                              _toggleSmWrap.addClass('on');
                              // _toggleSmWrap.find('.toggle_panel').attr('tabindex', '1').focus(); //221011 접근성수정
                              setTimeout(function () { _toggleSmWrap.find('.toggle_panel').removeAttr('tabindex') }, 100);
                              _this.find('.arrow>span.hidden').text('닫기');
                          }, 0);
                      }
                      _isToggleSmWrap = true;
                  } else if (_toggleSmWrap.length === 0 && _this.attr('aria-controls') !== undefined) {
                      var $panel = $('#' + _this.attr('aria-controls'));
                      if (_this.hasClass('on')) {
                          _this.attr('aria-expanded', 'false');
                          _this.removeClass('on');
                          _this.find('.arrow>span.hidden').text('열기');
                          $panel.hide();
                      } else {
                          _this.attr('aria-expanded', 'true');
                          _this.addClass('on');
                          _this.find('.arrow>span.hidden').text('닫기');
                          $panel.show();
                      }
                  } else { // default   
                      var _st = $(window).scrollTop();
                      var _gap = 400;
                      _this.parents('.js_toggle').toggleClass('on');

                      if (_this.hasClass('on')) {
                          _this.attr('aria-expanded', 'false').removeClass("on").next('.toggle_panel').slideUp(300);
                          var _st = $(window).scrollTop() - _gap;
                      } else {
                          // 2022-05-13 수정 ::: slideDown시 durationScrollTo 호출
                          _this.attr('aria-expanded', 'true').addClass("on").next('.toggle_panel').slideDown(300, () => {
                              if (_this.parents('.inform_btm_wrap').length > 0) {
                                  durationScrollTo(_this.parents('.inform_btm_wrap')[0].offsetTop - 32, 300)
                              }
                          });
                          // [Biz-007] 계좌순서 변경 기능 개선
                          if (_this.next().children().hasClass('type_drag')) {
                              orderList.compareOn('type_drag', _this);
                          }
                      }
                  }
                  if (_isToggleSmWrap) {
                      (_toggleSmWrap.hasClass('exchange')) ? UICommon.scTop.topMove(_this.closest('.acc_pannel')) : UICommon.scTop.topMove(_toggleSmWrap);
                  } else {
                      UICommon.scTop.topMove(_this);
                  }
                  if (_this.closest('.ui_swiper').length) setTimeout(function () { UICommon.uiSwiper.update(_this.closest('.ui_swiper')) }, 100);
                  if (_this.closest('.tab_swipe').length) setTimeout(function () { UICommon.tabMenu.tabSlider.update() }, 100);
              });
          },
          // 자금관리 > 다른금융등록관리 : check와 함께 사용시
          toggler: function () {
              $(document).off('click', '.js_toggler').on('click', '.js_toggler', function (e) {
                  var toggler = $(this),
                      target = $('#' + toggler.attr('aria-controls')),
                      isActive = toggler.attr('aria-expanded') == 'true' ? true : false,
                      isReminder = toggler.closest('.reminder').length > 0;

                  if (isReminder) return;

                  if (isActive) {
                      toggler.attr('aria-expanded', 'false');
                      toggler.parent('.tit').removeClass('active');
                      target.removeClass('active');
                  } else {
                      toggler.attr('aria-expanded', 'true');
                      toggler.parent('.tit').addClass('active');
                      target.addClass('active');
                  }

                  e.preventDefault();
              });
          },
          // slideToggler: function() {
          //     $(document).off('click', '.js_slide_toggler').on('click', '.js_slide_toggler', function(e){
          //         var toggler = $(this),
          //             target = $('#' + toggler.attr('aria-controls')),
          //             isActive = toggler.attr('aria-expanded') == 'true' ? true : false,
          //             speed = 400,
          //             isReminder = toggler.closest('.reminder').length > 0;

          //         if (isReminder) return;

          //         if(isActive){
          //             toggler.attr('aria-expanded', 'false');
          //             target.slideUp(speed);
          //         } else {
          //             toggler.attr('aria-expanded', 'true');
          //             target.slideDown(speed);
          //         }

          //         e.preventDefault();
          //     });
          // },
          // reminder: function() { //자산관리용 (toggle + checkbox)
          //     $(document).off('click', '.reminder > .selection input').on('click', '.reminder > .selection input', function(e) {
          //         var cTarget = $(e.currentTarget),
          //             reminder = cTarget.closest('.reminder'),
          //             tit = reminder.find('.tit'),
          //             panel = reminder.find('.panel'),
          //             isActive = cTarget.prop('checked'),
          //             isSync = reminder.hasClass('sync'),
          //             isNoSync = reminder.hasClass('nosync'),
          //             isSlide = tit.hasClass('js_slide_toggler'),
          //             speed = 400;

          //         if (!isNoSync) {
          //             if (isActive) {
          //                 tit.attr('aria-expanded', 'true');

          //                 if (isSlide) {
          //                     panel.slideDown(speed);
          //                 } else {
          //                     panel.addClass('active');
          //                 }
          //             } else if (isSync) {
          //                 tit.attr('aria-expanded', 'false');

          //                 if (isSlide) {
          //                     panel.slideUp(speed);
          //                 } else {
          //                     panel.removeClass('active');
          //                 }
          //             }
          //         }
          //     });

          //     $(document).off('click', '.reminder > .tit').on('click', '.reminder > .tit', function(e) {
          //         var cTarget = $(e.currentTarget),
          //             reminder = cTarget.closest('.reminder'),
          //             isActive = cTarget.attr('aria-expanded') == 'false' ? true : false,
          //             selection = reminder.find('input'),
          //             tit = reminder.find('.tit'),
          //             panel = reminder.find('.panel'),
          //             isSync = reminder.hasClass('sync'),
          //             isNoSync = reminder.hasClass('nosync'),
          //             isSlide = tit.hasClass('js_slide_toggler'),
          //             speed = 400;

          //         if (isActive) {
          //             if (!isNoSync) { selection.prop('checked', true).attr('checked', true); }

          //             tit.attr('aria-expanded', 'true');

          //             if (isSlide) {
          //                 panel.slideDown(speed);
          //             } else {
          //                 panel.addClass('active');
          //             }
          //         } else {
          //             if (isSync) { selection.prop('checked', false).attr('checked', false); }

          //             tit.attr('aria-expanded', 'false');

          //             if (isSlide) {
          //                 panel.slideUp(speed);
          //             } else {
          //                 panel.removeClass('active');
          //             }
          //         }
          //     });
          // }
      }

      /* 텝메뉴 from tab.html */
      var tabMenu = {
          init: function () {
              tabMenu.tabMove();
              tabMenu.tab();
              tabMenu.tabSwipe();
              tabMenu.tabRadio();
              tabMenu.tabBar();
              tabMenu.toggleBtnSet();
          },
          tab: function () {
              $('.tab_wrap .tab_list a.active').attr('title', '선택됨');
              $(document).on('click', '.tab_wrap [role=tab]', function (e) {
                  e.preventDefault();
                  var _this = $(this),
                      _tabWrap = _this.closest('.tab_wrap'),
                      _thisPannel = _tabWrap.children('.tab_panel');
                  if (_tabWrap.find('.ly_cnt').length) _thisPannel = _tabWrap.children('.ly_cnt').children('.tab_panel');
                  if (_tabWrap.find('.tab_scroller').length) _thisPannel = _tabWrap.children('.tab_scroller').children('.tab_panel');
                  var _thisControls = _thisPannel.filter('#' + _this.attr('aria-controls'));

                  _this.attr('aria-selected', 'true').siblings('[role=tab]').attr('aria-selected', 'false');

                  if (_thisPannel.length) {
                      _thisControls.addClass('active').siblings('.tab_panel').removeClass('active');
                      if (_thisControls.find('.ui_swiper').length) uiSwiper.update(_thisControls.find('.ui_swiper'));
                  };
                  if (_this.closest('.pop_body').length) {
                      _this.closest('.pop_body').stop().scrollTop(0);
                  }
                  tabMenu.tabScroll(_this);
                  tabMenu.tabBar();
              });
              $(document).on('click', '.tab_list a', function (e) {
                  var _this = $(this);
                  _this.addClass('active').attr('title', '선택됨').siblings('a').removeClass('active').removeAttr('title');
                  tabMenu.tabScroll(_this);
              });
          },
          tabMove: function (el) {
              if (el === undefined) {
                  $('.tab_list').each(function () {
                      $this = $(this);
                      ($this.find('[aria-selected=true]').length) ? el = $this.find('[aria-selected=true]') : el = $this.find('a.active');
                      var $tabWrap = el.closest('.tab_wrap'),
                          $lyCnt = $tabWrap.children('.ly_cnt'),
                          $tabScroller = $tabWrap.children('.tab_scroller'),
                          $thisPannel = $tabWrap.children('.tab_panel'),
                          index = el.index();
                      if ($this.find('.tab_bar').length) index = index - 1;
                      if ($lyCnt.length) $thisPannel = $lyCnt.children('.tab_panel');
                      if ($tabScroller.length) $thisPannel = $tabScroller.children('.tab_panel');
                      $thisPannel.eq(index).addClass('active');
                      tabMenu.tabScroll(el);
                  });
                  return false;
              }
          },
          tabScroll: function (el) {
              var $parent = el.closest('.tab_wrap').find('.tab_list'),
                  $parentWidth = $parent.outerWidth(),
                  $parentScrollW = $parent.get(0).scrollWidth,
                  sb = Number(el.css('margin-left').replace('px', '')),
                  $thisLeft = el.position().left + sb,
                  $thisWidth = el.outerWidth() + sb,
                  $scrollLeft = $thisLeft - ($parentWidth / 2) + ($thisWidth / 2),
                  $speed = Math.max(300, Math.abs($scrollLeft * 2)),
                  $line = $parent.find('.tab_bar');
              if ($parentWidth < $parentScrollW) $parent.animate({ scrollLeft: $scrollLeft }, $speed);
          },
          tabBar: function () {
              $('.tab_wrap').each(function () {
                  var $this = $(this),
                      $bar = $this.find('.tab_bar');
                  if ($bar.length) {
                      var $btn = $this.find('[role=tab]'),
                          $tabWrap = $this.closest('.tab_wrap'),
                          $active = $tabWrap.find('[aria-selected=true]'),
                          $list = $btn.parent();
                      ($tabWrap.hasClass('box')) ? $tabWrap.addClass('bar') : $tabWrap.addClass('line');
                      setTimeout(function () {
                          var $tabWidth = $active.outerWidth(),
                              $listLeft = parseInt($list.css('margin-left')),
                              sb = Number($active.css('margin-left').replace('px', '')),
                              sp = ($this.hasClass('box')) ? 0 : 24,
                              $tabLeft = $listLeft + $active.position().left + $btn.position().left + sb + sp;
                          $bar.css({ 'width': $tabWidth, 'left': $tabLeft });
                      }, 150);
                  }
              });
          },

          tabSwipeArray: [], //2202-08-24 추가
          tabSlider: null,
          tabSwipe: function () {
              if ($('.tab_swipe').length) {
                  $('.tab_swipe').each(function () {
                      var $this = $(this),
                          $btn = $this.closest('.tab_wrap').find('.tab_list').find('button'),
                          $active = $this.closest('.tab_wrap').find('.tab_list').find('[aria-selected=true]'),
                          $panel = $this.find('.tab_panel'),
                          _tabFix = 0,
                          _headH = ($('#header').length>0) ? $('#header').outerHeight() : 0,
                          isFixed = false;
                      $(window).on('scroll', function () {
                          if($this.closest('.tab_wrap').find('.tab_list_wrap.fixed').length) {
                              isFixed = true;
                              _tabFix = $this.closest('.tab_wrap').offset().top - _headH;
                          } else {
                              isFixed = false;
                              _tabFix = 0;
                          }
                      });
                      if (!$this.find('swiper-wrapper').length) {
                          $this.wrapInner('<div class="swiper-wrapper"></div>');
                          $panel.addClass('swiper-slide').attr('aria-hidden', true);
                      }
                      var opt = {
                          slidesPerView: 1,
                          speed: 300,
                          autoHeight: true,
                          touchRatio: 0.1,
                          resistance: true,
                          resistanceRatio: 0.5,
                          initialScroll: 0,
                          on: {
                              slideChangeTransitionEnd: function (e) {
                                  // [S] main tab 스와이퍼 개발 callback 추가
                                  this.$el.find('.swiper-slide').each(function () {
                                      var _this = $(this);
                                      if (_this.closest('.m_service_tab').length && _this.is('.swiper-slide-active')) {
                                          if (window.SPA_COMMON) {
                                              window.SPA_COMMON.callbackWithSPA('onMainSubSwiperChange', _this);
                                              window.SPA_COMMON.callbackWithSPA('onMainSub2SwiperChange', _this);
                                          }
                                      }
                                  });
                                  // [E] main tab 스와이퍼 개발 callback 추가
                              }
                          }
                      };
                      if ($this.hasClass('swiper-initialized')) {
                          if (tabMenu.tabSlider !== undefined) tabMenu.tabSlider.update();
                      } else {
                          tabMenu.tabSlider = new Swiper(this, opt);
                      }
                      var current = $active.index();
                      tabMenu.tabSlider.slideTo(current);
                      $panel.eq(current).attr('aria-hidden', false);
                      $btn.on('click', function () {
                          var $this = $(this), 
                              tabIndex = $this.index(),
                              tabIndex = ($this.parent('.scroll_wrap').length) ? tabIndex : tabIndex - 1;
                          tabMenu.tabSlider.slideTo(tabIndex);
                          $panel.eq(tabIndex).attr('aria-hidden', false).siblings('.tab_panel').attr('aria-hidden', true);
                          if(isFixed) $('html, body').animate({scrollTop:_tabFix}, 300);
                      });
                      tabMenu.tabSlider.on('slideChangeTransitionStart', function () {

                          var tabIndex = $this.find('.tab_panel.swiper-slide.swiper-slide-active').index(),
                              thisSlide = $this.find('.tab_panel.swiper-slide.swiper-slide-active'),
                              $tabActive = $btn.eq(tabIndex);
                          $tabActive.attr('aria-selected', 'true').siblings('[role="tab"]').attr('aria-selected', 'false');
                          $panel.eq(tabIndex).attr('aria-hidden', false).siblings('.tab_panel').attr('aria-hidden', true);
                          tabMenu.tabScroll($tabActive);
                          tabMenu.tabBar();
                          if(isFixed) $('html, body').animate({scrollTop:_tabFix}, 300);
                          aniAdd('.m_ani');
                          if($this.find('.chart').length) UICommon._front.chartClear('.chart .bar.in'); //차트 애니메이션 리셋
                          // console.log(thisSlide);
                          // if (window.SPA_COMMON) {
                          //     console.log(thisSlide);
                          //     window.SPA_COMMON.callbackWithSPA('onSwiperChange', thisSlide);
                              
                          // }
                      });
                      tabMenu.tabSlider.on('slideChangeTransitionEnd', function () {
                          if($this.find('.chart').length) UICommon._front.chart('.chart .bar.in'); //차트 애니메이션 실행
                      });

                      var aniAdd = function(tar){
                          if($this.find(tar).length) $this.find(tar).removeClass('on').addClass('on');
                      };
                      aniAdd('.m_ani');

                      //2202-08-24 추가
                      tabMenu.tabSwipeArray.push(tabMenu.tabSlider);
                      $this.on('touchstart', function (e) {
                          if (!$(e.target).parents("[data-bubble='false']").length) {
                              tabMenu.tabSlider.allowTouchMove = true;
                          }
                      });
                  });
              }
          },
          tabRadio: function () {
              $('.tab_radio').each(function () {
                  var $tabRadio = $(this),
                      $rdo = $tabRadio.find('input'),
                      $current = $tabRadio.find('input:checked'),
                      $tar = $tabRadio.attr('data-show'),
                      $panel = $tabRadio.closest('.tab_wrap').find('.tab_panel');
                  $panel.eq($current.parent().index()).addClass('active');
                  $rdo.on('change', function () {
                      var $this = $(this), tabIndex = $this.parent().index();
                      $panel.eq(tabIndex).addClass('active').siblings('.tab_panel').removeClass('active');
                  });
              });
          },
          toggleBtnSet: function () {
              $('.toggle_btn_set').each(function () {
                  var $toggleBtnSet = $(this),
                      $btn = $toggleBtnSet.find('button'),
                      $btnActive = $toggleBtnSet.find('button.active');
                  if ($btnActive) {
                      $btnActive.attr('aria-selected', true);
                      $('#' + $btnActive.attr('aria-controls')).show();
                  }
              });
              var $toggleBtn = '.toggle_btn_set button',
                  $togglePanel = '.toggle_btn_panel';
              $($toggleBtn).off('click').on('click', function (e) {
                  var _this = $(this);
                  if (_this.hasClass('active')) {
                      $($toggleBtn).removeClass('active').attr('aria-selected', false).removeAttr('title');
                      $($togglePanel).hide();
                  } else {
                      _this.attr({'aria-selected': true, 'title': '선택됨'}).addClass('active').closest('li').siblings('li').find('button').attr('aria-selected', false).removeAttr('title').removeClass('active');
                      $('#' + _this.attr('aria-controls')).show().siblings($togglePanel).hide();
                  }
              });
          }
      }

      /* 프로그래스바 from etc.html */
      function updateProgressBar(value) {
          var value;
          value ? value = Math.round(value) : value = 100;
          var i = 0;
          if (i == 0) {
              i = 1;
              var el = $('.progressbar .pbar'),
                  w = 1,
                  id = setInterval(frame, 10);
              function frame() {
                  if (w >= value) {
                      clearInterval(id);
                      i = 0;
                  } else {
                      w++;
                      el.css('width', w + '%');
                      el.siblings('.ptext').text(w + '%');
                  }
              }
          }
      }

      /* 스텝 div 프로그래스 스텝 from etc.html */
      var progressDiv = {
          init: function (status) {
              status > 0 ? status = status : status = $('.progress.div').attr('data-value');
              $('.progress.div').attr({ 'aria-live': 'polite', 'aria-label': status + '% 진행중' });
              $('.progress.div .progress_div').attr('style', 'width:' + status + '%;')
          }
      }

      /* Count Number from etc.html */
      var countNumber = {
          init: function () {
              // if ($('.numberCountCon').length>0){
              var numberCountConTxt = $('.numberCountCon').attr('data-value');
              $({ val: 0 }).animate({ val: numberCountConTxt }, {
                  duration: 2000,
                  step: function () {
                      var num = numberWithComas(Math.floor(this.val));
                      $('.numberCountCon').text(num);
                  },
                  complete: function () {
                      var num = numberWithComas(Math.floor(this.val));
                      $('.numberCountCon').text(num);
                  }
              });
              function numberWithComas(x) {
                  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
              }
              // }
          }
      }

      /* 툴팁 from tooltip.html */
      var tooltipButton = {
          init: function () {
              $('.js_tooltip').off('click').on('click', function (e) {
                  e.preventDefault();
                  e.stopPropagation();
                  _this = $(this);
                  var _winW = $('body').width(),
                      _tooltipWrap = _this.parents('.tooltip_limited').find('.tooltip_wrap'),
                      _tooltipWrapL = _this.offset().left - 24,
                      _tooltipWrapR = _winW - (_this.offset().left + 44);

                  if (_tooltipWrap.css('display') == 'block') {
                      _tooltipWrap.removeClass('show');
                      setTimeout(function () {
                          _tooltipWrap.hide().removeClass('top').attr('aria-hidden', 'true').closest('.tooltip_limited').parent().css('z-index', '').parent().css('z-index', '');
                      }, 300);
                  } else {
                      $('.tooltip_wrap').hide().removeClass('top').attr('aria-hidden', 'true').closest('.tooltip_limited').parent().css('z-index', '').parent().css('z-index', '');
                      tooltipButton.position(_this, _tooltipWrap);
                      _this.closest('.tooltip_limited').parent().css('z-index', '101').parent().css('z-index', '101');
                      _tooltipWrap.show().attr('aria-hidden', 'false');
                      _tooltipWrap.parents('.acc_pannel').parents('div').hasClass('section_f') ? _tooltipWrap.css({ 'left': -_tooltipWrapL - 8, 'right': -_tooltipWrapR - 8 }) : _tooltipWrap.css({ 'left': -_tooltipWrapL, 'right': -_tooltipWrapR });
                      setTimeout(function () {
                          _tooltipWrap.addClass('show');
                      }, 100);
                  }

                  var close = function () {
                      _tooltipWrap.removeClass('show');
                      setTimeout(function () {
                          _tooltipWrap.hide().removeClass('top').attr('aria-hidden', 'true').closest('.tooltip_limited').parent().css('z-index', '').parent().css('z-index', '');
                      }, 300);
                      setTimeout(function () { _this.focus(); }, 100);
                  };

                  $('.btn_tooltip_x').off('click').on('click', function (e) {
                      e.preventDefault();
                      e.stopPropagation();
                      close();
                  });

                  $(document).on('click', function (e) {
                      if ($(e.target).closest('.tooltip_limited').length === 0) {
                          _tooltipWrap.removeClass('show');
                          setTimeout(function () {
                              _tooltipWrap.hide().removeClass('top').attr('aria-hidden', 'true').closest('.tooltip_limited').parent().css('z-index', '').parent().css('z-index', '');
                          }, 300);
                      }
                  });
              });
          },
          position: function (t, e) {
              $(window).scroll(function () {
                  var deviceH = screen.height,
                      offsetT = t.offset().top,
                      scrollT = $(document).scrollTop(),
                      tipWrapT = offsetT - scrollT,
                      tipWrapD = deviceH - (offsetT - scrollT);
                  (tipWrapT > tipWrapD) ? e.addClass('top') : e.removeClass('top');
              });
              $(window).scroll();
          }
      }

      /* 토글 버튼 */
      var toggleButton = {
          init: function () {
              $(document).on('click', '.toggle', function () {
                  $(this).toggleClass('active');
                  $(this).hasClass('active') ? $(this).attr('aria-pressed', 'true') : $(this).attr('aria-pressed', 'false');
              });
          }
      }

      var selectItem = {
          init: function () {
              if ($('.item_area').hasClass('active')) {
                  $('.item_area.active').find('.item').append('<span class="hidden">선택</span>');
              }
              $(document).on('click', '.js_list_item .item ', function () {
                  $('.item_area').removeClass('active');
                  $('.item').find('.hidden').remove();
                  $(this).closest('.item_area').addClass('active');
                  $(this).append('<span class="hidden">선택</span>');
              });
          }
      }

      /* 권유희망직원 선택 */
      var staffHopeSelect = {
          init: function () {
              this.staffHopeShowHide();
          },
          staffHopeShowHide: function () {
              $(document).on('click', '.staff_hope .staff_hope_sel .rdoChk_box .selection input', function (e) {
                  var radioIndex = $(this).parent().index();
                  $('.staff_hope .staff_hope_cts').each(function (index) {
                      $(this).removeClass('on').attr({ 'aria-hidden': 'true' });
                      if (radioIndex === index) {
                          $(this).addClass('on').attr({ 'aria-hidden': 'false' });
                      }
                  })

              });
          }
      }

      /* 이체 금액 입력폼 */
      var transferMoney = {
          init: function () {
              $.fn.setCursorPosition = function (pos) {
                  console.log('won');
                  this.each(function (index, elem) {
                      if (elem.setSelectionRange) {
                          elem.setSelectionRange(pos, pos);
                      } else if (elem.createTextRange) {
                          var range = elem.createTextRange();
                          range.collapse(true);
                          range.moveEnd('character', pos);
                          range.moveStart('character', pos);
                          range.select();
                      }
                  });
                  return this;
              };
              $(document).on('keyup', '.js_money', function () {
                  if ($(this).val().length < $(this).attr('maxlength') + 2) {
                      var _this = $(this),
                          _value = _this.val(),
                          _valueLength = _value.length,
                          _unit = _this.data('unit');

                      if (_value.indexOf(_unit) !== -1) {
                          _this.val(_value);
                      } else {
                          _this.val(_value + ' ' + _unit);
                          _this.focus().setCursorPosition(_valueLength);
                      }
                  }
              });
          }
      }

      //디데이
      var dDay = {
          init: function () {
              var day = $('.acc_day_info').find('.d-day');
              var graphW = $('.graph_area').find('.default').outerWidth();
              var graphA = $('.graph_area').find('.active').outerWidth();

              if (graphA < (graphW * 0.1)) {
                  day.css({ 'left': '0', 'transform': 'none' });
              } else if (graphA > (graphW * 0.9)) {
                  day.css({ 'left': 'auto', 'right': '0', 'transform': 'none' });
              }
          }
      }

      var _front = {
          init: function () {
              var $dragUse = ($(".list_drag").length > 0) ? true : false;
              _front.$deviceH = $(window).height();
              _front.$deviceV = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--sab"));
              _front.$deviceS = (isNaN(_front.$deviceV)) ? 0 : _front.$deviceV;
              let $header = $("#header").eq(0);
              _front.$hdH = ($header != undefined) ? (parseInt($header.outerHeight(true) + ($header.innerHeight() - $header.height()))) : 0;
              // view 영역사이즈 
              if (originalPotion === false) originalPotion = $(window).width() + $(window).height();

              _front.form();
              _front.scroll();
              _front.slider();
              _front.result();
              //_front.accAccoTipPos(); 아코디언 버튼안에 tooltip 포지션값(추후반영예정) 221026
              // main
              _front.rdoFunc();
              console.log('_front.init 체크')
              $(window).on('resize orientationchange', function () {
                  clearTimeout(time);
                  var time = setTimeout(function(){
                      _front.keypadDetect();
                  },10);
              });

              if ($dragUse) _front.drag();
              $(document).on("click", "a[href='#'], a[href='#none']", function (e) { e.preventDefault(); });

              // Content 여백(cmd 버튼)
              !$(".btn_confirm_wrap").length > 0 ? $('#content').addClass('type2') : $('#content').removeClass('type2');

              //hr aria-hidden 추가 : 접근성
              $('hr').attr('aria-hidden', 'true');
          },
          keypadDetect: function () {
              var $exceptEl = '.m_new_guide';
              if ($('html').hasClass('android') && !$($exceptEl).length) {
                  if (originalPotion !== false) {
                      var wasWithKeyboard = $('html').hasClass('keypad_open');
                      var nowWithKeyboard = false;
                      if (originalPotion !== $(window).width() + $(window).height()) nowWithKeyboard = true;
                      $('html').toggleClass('keypad_open', nowWithKeyboard);
                  }
              }
          },
          scroll: function () {
              var _isStep = ($targetPage().find(".js_step").length > 0) ? true : false;
              if (_isStep) {
                  _front.step();
              } else {
                  $(document).off('scroll');
              }
          },
          step: function () {
              var _step = $targetPage().find(".js_step");
              var _stepH = parseInt(_step.outerHeight());
              var _hdH = $targetPage().find("#header").outerHeight() == undefined ? 0 : parseInt($targetPage().find("#header").outerHeight());
              var _aniVal = _stepH + _hdH + 20;
/*                 var _aniVal = 20; */

              $(window).on('scroll', function () {
                  var _st = $(this).scrollTop();
                  if (_st > _aniVal) {
                      if (!$('.js_step').hasClass('on')) _step.clone().prependTo('#content').addClass("on");
                  } else {
                      $('.js_step.on').remove();
                  }

                  /* (_st > _aniVal) ? _step.addClass("on") : _step.removeClass("on"); */
              });
          },
          drag: function () {
              $(".js_drag_set .ico_set").on("click", function () {
                  var _this = $(this).closest(".js_drag_set").addClass("on");
                  $('.sel_drag_sort .drag_move input[type=radio]').prop('checked', true);
                  orderList.compareOff('re');
              });
          },
          fixed: function (target) {
              var $target = $(target);
              $target.each(function () {
                  var $this = $(this);
                  var $top = $this.offset().top;
                  $(window).on('scroll', function () {
                      var $scrollTop = $(this).scrollTop();
                      ($scrollTop >= $top) ? $this.addClass('fixed') : $this.removeClass('fixed');
                  });
                  $(window).scroll();
              });
          },
          //switch radio //main
          rdoFunc : function() {
              $('.rdo_swipe input').each(function () {
                  var $this = $(this),
                      $rdoSwipe = $this.closest('.rdo_swipe'),
                      rdoNum = $this.closest('ul').find('li').length;
                  function cssSet() {
                      if ($this.prop('checked')) {
                          $this.closest('li').addClass('active').siblings('li').removeClass('active');
                          var $bar = $this.closest('.rdo_swipe').find('.bar'),
                              _w = $this.closest('ul').width(),
                              _x = $this.closest('li').position().left;
                          $bar.css({ 'width': _w / rdoNum, 'left': _x, 'opacity': 1, 'transform': 'scale(1)' });
                      }
                  }
                  cssSet();
              });
          },
          btnClearSet: function (tar) { //input clear button set
              var _this = tar;
              var _parent = _this.parent(".input");
              var _langRem = 10;
              if (!_this.parents('.form_group').is('.between') && !_this.parents('.form_row').is('.col') && !_parent.is('.outline') && _this.is(':not([type=tel], [type=hidden])') && !_this.is('[readonly], [disabled]') && !_this.parents('.unit').is('.decimal') && !_parent.is('.date')) {
                  var _inpBtn = _parent.find('.btn.point.round');
                  var _inpBtnW = Math.round(_inpBtn.outerWidth()) / _langRem;

                  _parent.find('.btn_clear').remove();
                  _this.css('padding-right', 3.6 + 'rem').siblings(".btn_clear").css('right', 0.6 + 'rem');
                  _parent.append('<button type="button" class="btn_clear"><span class="hidden">입력내용 초기화</span></button>');

                  _this.val() == '' ? _parent.find('.btn_clear').hide() : _parent.find('.btn_clear').show();

                  if (_this.is('[type=password]')) _this.css('padding-right', 3.6 + 'rem');
                  if (_this.siblings('.btn_sch')) _this.css('padding-right', (Math.round(_this.siblings('.btn_sch').outerWidth()) / _langRem) + 3.6 + 'rem').siblings('.btn_clear').css('right', _this.siblings('.btn_sch').outerWidth() / _langRem + 'rem');
              };
          },
          form: function () {
              var _doc = $(document);
              var _langRem = 10;

              //textarea init
              $(".textarea").each(function () {
                  var _this = $(this);
                  var _textarea = _this.find("textarea");
                  var _numInfo = _this.find(".num_info");
                  var _numInfoLen = _numInfo.length;

                  if (_this.hasClass('auto_height')) {
                      _textarea.on('focusin', function () {
                          _this.closest('.textarea').addClass('focus');
                      }).on('blur', function () {
                          _this.closest('.textarea').removeClass('focus');
                      });
                  }

                  if (_numInfoLen > 0) { _this.addClass("textarea_count") }
                  if (_textarea.is('[readonly]')) {
                      _this.closest('.textarea').addClass("textarea_readonly");
                  } else if (_textarea.is('[disabled]')) {
                      _this.closest('.textarea').addClass("textarea_disabled");
                  }

                  if (_textarea) {
                      _textarea.on('focus', function () {
                          $(this).closest('.textarea').addClass('focus');
                      }).on('focusout', function () {
                          $(this).closest('.textarea').removeClass('focus');
                      });
                  }
              });

              //input init
              $(".input input").each(function (e) {
                  var _this = $(this);
                  var _parent = _this.parent(".input");
                  var _valueL = _this.val().length;
                  //UICommon._front.btnClearSet(_this); //input clear 추가
                  //_this.val().length > 0 ? _this.addClass('finished') :  _this.removeClass('finished');
                  if (!_this.is('[readonly]') && !_this.is('[disabled]')) {
                      _this.on('focusin', function () {
                          _this.parent(".input").addClass('focus');
                          if (_this.closest('.form_date_term')) _this.closest('.form_date_term').addClass('focus');
                      }).on('blur', function () {
                          _this.parent(".input").removeClass('focus');
                          if (_this.closest('.form_date_term')) _this.closest('.form_date_term').removeClass('focus');
                      });
                  } else {
                      _this.next('.btn_clear').remove();
                  }

                  // 단위 추가
                  if (_this.data('unit') && _this.is(':not(.js_money)') && _this.is(':not([type=hidden])')) {
                      var _dataUnit = _this.data('unit');

                      _this.siblings('.unit').remove();
                      _this.after('<span class="unit">' + _dataUnit + '</span>');

                      var _unit = _this.siblings('.unit'),
                          _unitTxt = _unit.text(),
                          _unitGwalho = _unitTxt.match(/[()]/gi),
                          _unitBlk = _unitTxt.match(' '),
                          _unitBlkL = _unitTxt.replace(' ', '').length;

                      if (/[a-z]/.test(_unitTxt)) {
                          if ((/[cm%]/gi).test(_unitTxt)) {
                              _unitW = _unitBlkL * 1 + (_unitBlk ? 1 : 1.2);
                          } else {
                              _unitW = _unitBlkL * 1 + (_unitBlk ? 1 : 0.5);
                          }
                          if (_unitGwalho) _unitW = _unitW - 0.8;
                      } else {
                          _unitW = _unitBlkL * 1.641 + (_unitBlk ? 1 : 0.4);
                          if (_unitGwalho) _unitW = _unitW - 1.8;
                      }

                      _this.css('padding-right', _unitW + (_parent.is('.outline') ? 0.6 : 0) + 'rem');
                      if (_valueL) _this.siblings('.unit').addClass('on');
                  }

                  if (_this.closest('.input').hasClass('js_global_unit')) {
                      if (_valueL) _this.closest('.input').addClass('active').find('span.txt_unit').addClass('on');
                  }

                  _doc.off("keyup", ".input input").on("keyup", ".input input", function () {
                      var _this = $(this);
                      var _parent = _this.parent(".input");
                      var _valueL = _this.val().length;
                      var _btn = _this.siblings(".btn_clear");

                      //_this.val().length > 0 ? _this.addClass('finished') :  _this.removeClass('finished');

                      _this.next('.unit').addClass('on');
                      if (!_valueL) _this.next('.unit').removeClass('on');

                      if (_this.closest('.input').hasClass('js_global_unit')) {
                          _this.closest('.input').addClass('active').find('span.txt_unit').addClass('on');
                          if (!_valueL) _this.closest('.input').removeClass('active').find('span.txt_unit').removeClass('on');
                      }

                      _btn.toggle(Boolean(_this.val()));
                      if (_parent.is('.int_pencil')) {
                          _parent.find('.btn_pencil').hide().siblings(".btn_clear").css('right', 0.6 + 'rem');
                      }

                      UICommon._front.btnClearSet(_this); //input clear 추가

                      //input 버튼 여백
                      if (_parent.find('.btn.point.round').length) {
                          var _inpBtn = $(this).parent().find('.btn.point.round');
                          var _inpBtnW = Math.round(_inpBtn.outerWidth()) / _langRem;

                          if (!_this.is('[type=tel]')) {
                              _this.css('padding-right', _inpBtnW + 3.6 + 'rem').siblings(".btn_clear").css('right', _inpBtnW + 0.6 + 'rem');
                          } else {
                              _this.css('padding-right', _inpBtnW + 0.6 + 'rem');
                          }
                      };
                  }).off("focusout").on("focusout", function () {
                      var _this = $(this);
                      var _parent = _this.parent(".input");
                      var _valueL = _this.val().length;
                      if (!_valueL) _parent.find('.unit').removeClass('on');

                  }).off('click', '.input .btn_clear').on("click", ".input .btn_clear", function () {
                      var _this = $(this);
                      var _parent = _this.parent(".input");

                      _this.removeAttr('style').hide().siblings('input').val('').focus();
                      _parent.find('.unit').removeClass('on');

                      if (_parent.is('.int_pencil')) _parent.find('.btn_clear').hide().siblings(".btn_pencil").show();
                      if (_parent.find('.btn.point.round').length && !_this.is('[type=tel]')) {
                          var _inpBtn = _parent.find('.btn.point.round');
                          var _inpBtnW = Math.round(_inpBtn.outerWidth()) / 10;

                          _this.css('right', _inpBtnW + 0.6 + 'rem').hide();
                      };
                  });
              });

              $(".selection input[type=radio]").each(function (e) {
                  var $rdo = $(this);
                  $rdo.attr('aria-hidden', true);
                  if ($rdo.prop('checked') && $rdo.attr('aria-controls')) {
                      $('#' + $rdo.attr('aria-controls')).show();
                      $rdo.attr('aria-expanded', true);
                  }

                  // 접근성_221006
                  var $rdoLabel = $rdo.next('label');
                  if($rdoLabel.length){
                      $rdoLabel.attr({'role' : 'radio', 'aria-checked' : false});
                      if ($rdo.prop('checked')) {
                          $rdoLabel.attr('aria-checked', true);
                      }
                  }
                  
                  $rdo.on('change', function () {
                      var $this = $(this),
                          $panel = $this.parent('.selection').parent().siblings('.rdo_panel');
                      if ($this.closest('.rdoChk_group').length) $panel = $this.parent('.selection').siblings('.rdo_panel');
                      $panel.hide();
                      if ($this.parent('.selection').find('[aria-controls]')) {
                          var $rdo = $this.closest('.form_row').find('[aria-controls]');
                          if ($this.closest('.rdoChk_group').length) $rdo = $this.closest('.rdoChk_group').find('[aria-controls]');
                          $rdo.attr('aria-expanded', false);
                      }
                      if ($this.prop('checked') && $this.attr('aria-controls')) {
                          var $tar = $('#' + $this.attr('aria-controls'));
                          $tar.show();
                          $this.attr('aria-expanded', true);
                      }

                      // 접근성_221006
                      var $thisLabel = $this.next('label');
                      if($thisLabel.length){
                          $(`.selection input[type=radio][name=${$this.attr('name')}]`).next('label').attr('aria-checked', false);
                          $thisLabel.attr('aria-checked', true);
                      }

                  });
              });
              $(".selection input[type=checkbox]").each(function (e) {
                  var $chk = $(this);
                  $chk.attr('aria-hidden', true);
                  if ($chk.prop('checked') && $chk.attr('aria-controls')) {
                      $('#' + $chk.attr('aria-controls')).show();
                      $chk.attr('aria-expanded', true);
                  }
                  $chk.on('change', function () {
                      var $this = $(this);
                      if ($this.attr('aria-controls')) {
                          $panel = $('#' + $this.attr('aria-controls'));
                          if ($this.prop('checked')) {
                              $panel.show();
                              $this.attr('aria-expanded', true);
                          } else {
                              $panel.hide();
                              $this.attr('aria-expanded', false);
                          }
                      }
                  });
              });
              //접근성 (220930 추가)
              $("input[type=checkbox], input[type=radio]").each(function (e) {
                  var $chk = $(this);
                  var $label = $chk.next('label');

                  $chk.attr('aria-hidden', true);

                  if($chk.attr('type') == 'checkbox') $chk.next('label').attr('role', 'checkbox');
                  if($chk.attr('type') == 'radio') {
                      $chk.next('label').attr('role', 'radio').parents('.rdoChk_group, .rdoChk_box, ul, .rdoChk_box_hor, .rdoChk_box_hor_gap').attr('role', 'radiogroup');
                  }
                  $chk.prop('checked') ? $label.attr('aria-checked', true) : $label.attr('aria-checked', false);

                  $chk.on('change', function () {
                      if ($chk.prop('checked')) {
                          $label.attr('aria-checked', true);
                          if ($("input[type=radio]")) $chk.parents('.selection, li').siblings().find('input[type=radio]').next('label').attr('aria-checked', false);
                      } else {
                          $label.attr('aria-checked', false);
                      }
                  });
              });

              //select init
              $(".select").each(function () {
                  var _this = $(this);
                  var _select = _this.find("select");
                  var _btn = _this.find("button");
                  var _val = _select.children("option[value='none']").index();
                  var _selected = _select.children("option:selected").index();

                  //_select.text().length > 0 ? _select.addClass('finished') :  _select.removeClass('finished');

                  if (!_btn.is('[disabled], .readonly')) {
                      _btn.on('focusin', function () {
                          $(this).parent(".select").addClass('focus');
                      }).on('blur', function () {
                          $(this).parent(".select").removeClass('focus');
                      });
                  }

                  if (_btn.is('.readonly')) _btn.attr('disabled', 'disabled');

                  if (_val == 0 && _selected == 0) {
                      _this.addClass("placeholder");
                  } else {
                      _this.removeClass("placeholder");
                  }
                  // _select.on("change", function () {
                  //     var _val = _select.children("option:selected").index();
                  //     (_val !== 0) ? _this.removeClass("placeholder") : _this.addClass("placeholder");
                  // });
                  if (_select) {
                      _select.each(function () {
                          const $sel = $(this);
                          let $selId = $sel.attr('id');
                          let $title = $sel.attr('title');

                          if ($selId == undefined) $selId = 'none';
                          if ($title == undefined) $title = '선택';
                          const $btnTitle = '팝업으로 ' + $title;
                          const $btnHtml = '<a href="#' + $selId + '" class="btn_select ui_select_open" title="' + $btnTitle + '" role="button"><span class="btn_select_val"></span></a>';

                          if (!$sel.siblings('.btn_select').length) {
                              $sel.hide().after($btnHtml);
                              const $forLbl = $('label[for="' + $selId + '"]');
                              if ($forLbl.length) {
                                  $forLbl.addClass('ui-select-lbl').attr('title', $btnTitle);
                              }

                              $sel.change(function () {
                                  const $val = $(this).val();
                                  let $selectTxt = $(this).find(':selected').text();
                                  if ($selectTxt == '') $selectTxt = '선택';
                                  $(this).siblings('.btn_select').find('.btn_select_val').html($selectTxt);
                                  if ($val == '') {
                                      $(this).siblings('.btn_select').addClass('off');
                                  } else {
                                      $(this).siblings('.btn_select').removeClass('off');
                                  }
                              });
                              $sel.change();
                          }
                      });
                  }
              });

              //링크없는 a태그 role=button 추가
              $('a').each(function (e) {
                  const $href = $(this).attr('href');
                  const $role = $(this).attr('role');
                  if ($href == undefined || $href == '#' || $href == '#none') {
                      if ($href == undefined || $href == '#') $(this).attr({ href: '#none' });
                      $(this).removeAttr('target');
                      if ($role == undefined) $(this).attr('role', 'button');
                  } else {
                      if (($href.startsWith('#') || $href.startsWith('javascript')) && $role == undefined) $(this).attr('role', 'button');
                  }
              });

              //select
              _doc.on("click touchstart mousedown", ".select_btn .btn_txt", function () {
                  $(this).closest(".select_btn").addClass("active");
              }).on("touchend mouseup", ".select_btn .btn_txt", function () {
                  $(this).closest(".select_btn").removeClass("active");
              });

              //switch
              $(".switch.rate").change(function () {
                  var _chk = $(this).find('input');
                  var _labelChild = _chk.next('label').children('span');

                  _chk.is(':checked') ? _labelChild.text('하락') : _labelChild.text('상승');
              });

              // main switch

              $(document).on('change', '.rdo_swipe input[type=radio]', function (e) {
                  var $this = $(this),
                      rdoNum = $this.closest('ul').find('li').length,
                      $bar = $this.closest('.rdo_swipe').find('.bar');
                  $bar.removeClass('off');
                  $this.closest('li').addClass('active').siblings('li').removeClass('active');
                  if ($this.closest('.product_item').length) $this.closest('.product_item').find('>.checkbox>input').prop('checked', true);
                  var _w = $this.closest('ul').width(),
                      _x = $this.closest('li').position().left;
                  $bar.css({ 'width': _w / rdoNum, 'left': _x, 'opacity': 1, 'transform': 'scale(1)' });
              });

          },
          slider: function () {
              if ($('.slider_select').length) {
                  $('.slider_select').each(function () {
                      var $slider = $(this).find('.slider'),
                          $list = $(this).find('.list'),
                          $inp = $(this).find('input[type=hidden]'),
                          $unit = $list.data('unit'),
                          $title = $list.attr('title'),
                          //$sel = $(this).find('.i_val'),
                          $min = parseInt($slider.data('min')),
                          $max = parseInt($slider.data('max')),
                          $val = parseInt($slider.data('value')),
                          $step = parseInt($slider.data('step')),
                          $d = parseInt($slider.data('drainage')),
                          $sync = $slider.data('sync');

                      if (!$min) $min = 0;
                      if (!$max) $max = 5;
                      if (!$step) $step = 1;
                      if (!$val) $val = $min;

                      if ($list.length) {
                          $list.empty();
                          if (!!$title) $list.removeAttr('title').append('<strong class="hidden">' + $title + '</strong>');
                          var _total = ($max - $min) / $step;
                          var _stepLeft = 100 / _total;
                          var _w = 100 / _total - 1;
                          $list.append('<ul></ul>');
                          for (var i = $min; i <= ($max / $step); i++) {
                              var _setLeft = _stepLeft * i;
                              if ($d != NaN && i % $d === 0) {
                                  $list.find('ul').append('<li style="left:' + _setLeft + '%;width:' + _w + '%"><a href="#" class="number n">' + i * $step + '<span class="hidden">' + $unit + '</span></a></li>');
                              } else {
                                  $list.find('ul').append('<li style="left:' + _setLeft + '%;width:' + _w + '%"><a href="#" class="number">' + i * $step + '<span class="hidden">' + $unit + '</span></a></li>');
                              }

                          }
                      }

                      if ($inp.length) $inp.val($val);
                      var range = $slider.slider({
                          min: $min,
                          max: $max,
                          value: $val,
                          step: $step,
                          range: 'min',
                          create: function (e) {
                              $slider.find('.ui-slider-handle').attr({ 'tabindex': -1 }).html('<span class="offscreen">선택한 값은</span><i>' + $val + '</i><span class="offscreen">' + $unit + '입니다.</span>');
                              $list.find('li').eq($val / $step).addClass('on').find('a').attr('title', '현재선택');
                          },
                          stop: function (event, ui) {
                              $(ui.handle).find('i').html(ui.value);
                              if ($inp.length) $inp.val(ui.value).change();
                              $slider.data('value', ui.value);
                              $list.find('li').eq(ui.value / $step).siblings().removeClass('on').removeAttr('title');
                              $list.find('li').eq(ui.value / $step).addClass('on').find('a').attr('title', '현재선택');
                          },
                          slide: function (event, ui) {
                              if ($sync !== undefined) $($sync).val(ui.value).change();
                          }
                      });

                      $list.find('a').click(function (e) {
                          e.preventDefault();
                          var $txt = parseInt($(this).text());
                          range.slider('value', $txt);
                          $slider.find('.ui-slider-handle i').text($txt);
                          if ($inp.length) $inp.val($txt).change();
                          if ($sync !== undefined) $($sync).val($txt).change();
                          $(this).parent().addClass('on').attr('title', '현재선택').siblings().removeClass('on').removeAttr('title');
                      });

                      if ($sync !== undefined) {
                          $($sync).on("change", function () {
                              range.slider('value', this.value);
                          });
                      }

                  });
              }
          },
          result: function () {
              $('.result').each(function () {
                  $result = $(this);
                  if ($result.find('.result_ico').length) return false;
                  if ($result.hasClass('success')) {
                      var $icon = '<div class="result_ico">';
                      $icon += '<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60">';
                      $icon += '<circle class="circle" cx="30" cy="30" r="28" stroke-dasharray="180" stroke-dashoffset="180" />';
                      $icon += '<path class="check" d="M18,28l8,8L41,20" stroke-dasharray="70" stroke-dashoffset="70" />';
                      $icon += '</svg>';
                      $icon += '</div>';
                      $result.prepend($icon);
                  } else if ($result.hasClass('fail')) {
                      var $icon = '<div class="result_ico">';
                      $icon += '<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60">';
                      $icon += '<circle class="circle" cx="30" cy="30" r="28" stroke-dasharray="180" stroke-dashoffset="180"/>';
                      $icon += '<circle class="ex_mark2" cx="30" cy="41" r="3"/>';
                      $icon += '<path class="ex_mark1" d="M30.3,17V33"/>';
                      $icon += '</svg>';
                      $icon += '</div>';
                      $result.prepend($icon);
                  } else if ($result.hasClass('info')) {
                      var $icon = '<div class="result_ico">';
                      $icon += '<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60">';
                      $icon += '<circle class="circle" cx="30" cy="30" r="28" stroke-dasharray="180" stroke-dashoffset="180"/>';
                      $icon += '<circle class="guide1" cx="30" cy="20" r="3"/>';
                      $icon += '<path class="guide2" d="M30.3,28V44"/>';
                      $icon += '</svg>';
                      $icon += '</div>';
                      $result.prepend($icon);
                  }
              });
          },
          chart: function (target) {
              $(target).each(function () {
                  var $target = $(this);
                  $target.data('first', true);
                  if($target.closest('.tab_swipe').length>0) isSwipe = false;
                  $(window).scroll(function () {
                      if($target.closest('.swiper-slide-active').length) isSwipe = true;
                      if (UICommon.isScreenIn($target) && $target.data('first') == true && isSwipe) {
                          $target.data('first', false);
                          if ($target.hasClass('chart_pie')) {
                              var per = $target.find('.progress').attr('data-chart-per');
                              var val = parseInt(per) / 2;
                              var $circle = $target.find('.bar');
                              var $dot = $target.find('.dot');
                              var r = $circle.attr('r'), c = Math.PI * (r * 2);
                              if (val < 0) { val = 0 }
                              if (val > 100) { val = 100 }
                              var pct = ((100 - val) / 100) * c;
                              var rot = parseInt((180 / 100) * per);
                              $circle.css({ strokeDashoffset: pct });
                              $dot.css({ 'transform': 'rotate(' + rot + 'deg)' });
                          } else {
                              if($target.attr('data-chart-per') > 0) $target.addClass('min');
                              $target.css({ 'width': + $target.attr('data-chart-per') + '%' });
                          }
                      }
                  });
              });
              $(window).scroll();
          },
          chartClear: function (target) {
              $(target).each(function () {
                  var $target = $(this);
                  $target.data('first', true);
                  $target.css({'width': '0%'});
              });
          },
          animateNumber: function(target,speed,isComma,useScroll,setTime){
              return $(target).each(function(){
                  var $this = $(this);
                  var $number = onlyNumber($this.text());
                  if(speed == undefined)speed = 500;
                  if(isComma == undefined)isComma = false;
                  if(useScroll == undefined)useScroll = false;
                  if(setTime == undefined)setTime = false;
                  var animateInit = function(){
                      $({now:0}).stop(true,false).animate({now:$number},{
                          duration: speed,
                          step: function(now,e){
                              if(isComma){
                                  $this.text(addComma(Math.floor(now)));
                              }else{
                                  $this.text(Math.floor(now));
                              }
                          }
                      });
                      $this.data('first',false);
                  }
                  if(useScroll){
                      $this.data('first',true);
                      $(window).scroll(function(){
                          if($this.data('first') && isScreenIn($this) && setTime>0){
                              $this.data('first',false);
                              setTimeout(function(){
                                  animateInit();
                              },setTime);
                          } else if($this.data('first') && isScreenIn($this)){
                              animateInit();
                          }
                      });
                      $(window).scroll();
                  }else{
                      animateInit();
                  }
              });
          },
          preLoad: function(imgArray){
              var imgNo = imgArray.length;
              for (let i=0; i<imgNo; i++){
                  let img = new Image();
                  img.src = imgArray[i];
              }
          },
          accAccoTipPos: function () {
              var $accAccoTip = $('.acc_acco_list .toggle_panel').children('.tooltip_limited');
              if($accAccoTip.length) {
                  setTimeout(function () {
                      $('.acc_acco_list').each(function () {
                          var $this = $(this);
                          var $tip = $this.find('.toggle_panel').children('.tooltip_limited');
                          if($tip.length) {
                              var _cw = $this.find('.tit_area .cate').outerWidth();
                              $tip.css('left', Math.floor(_cw)+26);
                          }
                      });
                  }, 100);
              }
          }
      };

      var Morphing = {
          open: function (btn, tar, callback) {
              const $btn = $(btn);
              const $pop = $(tar);
              const $currentTarget = $(btn);
              Body.lock();
              let $bgEl;
              let $toMin;
              let $width;
              let $height;
              let $left;
              let $top;
              let $radius;
              let $scale;
              let $wrapTop;
              let $setTop;
              const $getScaleValue = function (topValue, leftValue, radiusValue) {
                  const windowW = $(window).width();
                  const windowH = $(window).height();
                  const maxDistHor = leftValue > windowW / 2 ? leftValue : windowW - leftValue;
                  const maxDistVert = topValue > windowH / 2 ? topValue : windowH - topValue;
                  return Math.ceil(Math.sqrt(Math.pow(maxDistHor, 2) + Math.pow(maxDistVert, 2)) / radiusValue);
              };

              const $wrap = $('#wrap').length ? $('#wrap') : $('body');
              const $position = function () {
                  const $popId = $pop.attr('id');
                  $width = $btn.outerWidth();
                  $height = $btn.outerHeight();
                  const $offset = $btn.offset();
                  $wrapTop = $('#wrap').length ? $wrap.offset().top : 0;
                  $setTop = window.pageYOffset * -1 + $wrapTop;
                  $top = $offset.top - $wrap.offset().top + $setTop;
                  $left = $offset.left - $wrap.offset().left;
                  const $bg = $btn.css('background-color');
                  const $border = $btn.css('border');
                  const $borderWidth = parseInt($btn.css('border-width'));
                  const $borderRadius = parseInt($btn.css('border-radius'));
                  const $shadow = $btn.css('box-shadow');
                  let $style = '';
                  $style += 'left:' + $left + 'px;';
                  $style += 'top:' + $top + 'px;';
                  $style += 'width:' + $width + 'px;';
                  $style += 'height:' + $height + 'px;';
                  $style += 'border-radius:' + $borderRadius + 'px;';
                  if ($bg !== 'rgba(0,0,0,0)') $style += 'background:' + $bg + ';';
                  if ($borderWidth) $style += 'border:' + $border + ';';
                  if ($shadow !== 'none') $style += 'box-shadow:' + $shadow + ';';
                  $bgEl = '.morphing-bg[data-pop="#' + $popId + '"]';
                  if (!$($bgEl).length) {
                      const $html = '<div class="morphing-bg" data-pop="#' + $popId + '" style="' + $style + '"></div>';
                      $($pop).before($html);
                      $btn.addClass('morphing-btn-hidden');
                  } else {
                      $($bgEl).removeAttr('style').attr('style', $style);
                  }
                  $($bgEl).data('left', $left);
                  $($bgEl).data('top', $top);
                  $($bgEl).data('width', $width);
                  $($bgEl).data('height', $height);
                  $($bgEl).data('border-radius', $borderRadius);
                  $toMin = $width < $height ? $width : $height;
                  $radius = $toMin / 2;
                  $scale = $getScaleValue($left, $top, $radius);
                  $($bgEl).delay(300).queue(function(){
                      $(this).css({
                          left: $left + ($width - $toMin) / 2 + 'px',
                          top: $top + ($height - $toMin) / 2 + 'px',
                          width: $toMin + 'px',
                          height: $toMin + 'px',
                          borderRadius: $radius + 'px',
                          transitionTimingFunction: 'ease-out'
                      });
                      $(this).dequeue();
                  }).delay(500).queue(function(){
                      $(this).css({
                          transform: 'scale(' + $scale + ')',
                          transitionDuration: '.8s',
                          transitionTimingFunction: 'cubic-bezier(.9, 0, .33, 1)'
                      });
                      $(this).dequeue();
                  }).delay(400).queue(function(){
                      UICommon.Layer.open($pop, function () {
                          $($pop).data('returnFocus', $currentTarget);
                          if (!!callback) callback();
                      });
                      if ($('.m_app_bar_wrap').length) $('.m_app_bar_wrap').hide();
                      $(this).dequeue();
                  });
              };
              $position();
          },
          close: function (target, callback) {
              const $pop = $(target);
              const $btn = $pop.data('returnFocus');
              const $wrap = $('#wrap').length ? $('#wrap') : $('body');
              $pop.addClass('morphing-close');
              if ($('.m_app_bar_wrap').length) $('.m_app_bar_wrap').show();
              const $popClose = function () {
                  const $popId = $pop.attr('id');
                  const $bgEl = '.morphing-bg[data-pop="#' + $popId + '"]';
                  const $left = $($bgEl).data('left');
                  const $top = $($bgEl).data('top');
                  const $width = $($bgEl).data('width');
                  const $height = $($bgEl).data('height');
                  const $radius = $($bgEl).data('border-radius');
                  $($bgEl).delay(10).queue(function(){
                      $(this).css({
                          transform: 'scale(1)',
                          transitionDuration: '.6s',
                          transitionTimingFunction: 'cubic-bezier(.22, 0, .11, 1)'
                      });
                      $(this).dequeue();
                  }).delay(500).queue(function(){
                      $(this).css({
                          left: $left,
                          top: $top,
                          width: $width,
                          height: $height,
                          borderRadius: $radius,
                          opacity: 1,
                          transitionTimingFunction: 'ease-in'
                      });
                      $(this).dequeue();
                  }).delay(500).queue(function(){
                      $(this).css('opacity', 0);
                      $btn.removeClass('morphing-btn-hidden');
                      Morphing.is = false;
                      $(this).dequeue();
                  }).delay(500).queue(function(){
                      $(this).remove();
                      Body.unlock();
                      $(this).dequeue();
                  });
              };
              UICommon.Layer.close(target, function () {
                  $pop.removeClass('morphing-close');
                  $popClose();
                  if (!!callback) callback();
              });
          }
      }

      var uiMain = {
          init: function () {
              uiMain.appBar();
              uiMain.btnTop();
              uiMain.trigger();
              uiMain.nowListPos();
              UICommon._front.fixed('.m_service_tab .tab_wrap .tab_list_wrap');
              UICommon.accordionButton.toggle();
              if($('.tab_swipe.swiper-initialized').length) UICommon.tabMenu.tabSlider.update();
              
          },
          btnTop: function () {
              if(!$('.m_btn_top').length) $('#content').append('<button type="button" class="m_btn_top"><span class="hidden">화면최상단으로 이동</span></button>');
              var $appBar = $('.m_app_bar'),
                  $btnTop = $('.m_btn_top');
              ($appBar.length) ? $btnTop.css('bottom', $appBar.outerHeight()+20) : $btnTop.css('bottom', 20);
              $(window).on('scroll', function () {
                  var $scrollTop = $(this).scrollTop();
                  ($scrollTop > 100) ? $btnTop.addClass('show') : $btnTop.removeClass('show');
              });
              $(window).scroll();
              $(document).on('click', '.m_btn_top', function (e) {
                  e.preventDefault();
                  $('html,body').animate({ 'scrollTop': 0 }, 300);
              });
          },
          appBar: function () {
              setTimeout(function () {
                  $('.m_app_bar_wrap').addClass('show');
              }, 1000);
          },
          nowListPos: function () {
              var $mNowList = $('.m_now_list');
              if(!$mNowList.length) return false;
              var _areaH = $('.m_head_util').outerHeight() + 216;
              var _top = $mNowList.offset().top;
              (_areaH > _top) ? $('.m_now_list').addClass('reverse') : $('.m_now_list').removeClass('reverse');
          },
          numCopy: function () {
              if($('.acc_num_copy').length) {
                  setTimeout(function () {
                      $('.main_account').each(function () {
                          const $this = $(this);
                          const $copy = $this.find('.acc_num_copy');
                          $copy.removeAttr('style');
                          const _nW = $this.find('.acc_num').outerWidth();
                          const _mgl = 7;
                          $this.removeClass('set').addClass('set');
                          $copy.css('left', Math.floor(_nW));
                          if($this.find('.btn_balance_hide').length) {
                              const $hide = $this.find('.btn_balance_hide');
                              let $num = $this.find('.main_account_amount .num');
                              if(!$num.is(':visible')) {
                                  $num = $this.find('.g_txt');
                                  $hide.addClass('gt');
                              } else {
                                  $hide.removeClass('gt');
                              }
                              const _bT = $num.position().top;
                              const _bW = ($num.outerWidth()/2) - ($hide.outerWidth()/2) + _mgl;
                              $hide.css({'top': Math.floor(_bT), 'margin-left': Math.floor(_bW)});
                          } else {
                              $this.addClass('no_hide');
                          }
                      });
                  }, 100);
              }
          },
          trigger: function () {
              ($('.main_account_alert_set input').prop('checked')) ? $('.main_account_alert_set label').attr('aria-checked', true) : $('.main_account_alert_set label').attr('aria-checked', false);
              $(document).on('focusin','.main_account_alert_set input',function(){
                  $(this).closest('.main_account_alert_set').addClass('focus');
              }).on('blur','.main_account_alert_set input',function(){
                  $(this).closest('.main_account_alert_set').removeClass('focus');
              });
              $(document).on('change','.main_account_alert_set input',function(){
                  var $this = $(this),
                      $txt = $this.closest('.main_account_alert_set').find('.hidden'),
                      txt = $this.closest('.main_account_alert_set').find('.hidden').text();
                  if($this.prop('checked')){
                      $txt.text('알림끄기');
                      $this.closest('.main_account_alert_set').find('label').attr('aria-checked', true);
                  } else {
                      $txt.text('알림켜기');
                      $this.closest('.main_account_alert_set').find('label').attr('aria-checked', false);
                  }
              });
          }
      }

      /* 하단스크롤  */
      var anckorScroll = {
          init: function () {
              $(document).on('click', '.btn_anckor', function (e) {
                  var $html = $('html, body'),
                      $this = $(this);
                  $index = $this.index();
                  $thisID = $($this.attr('href'));
                  $anckorFix = parseInt($('.anckor_fix').outerHeight()) + 48;
                  $offsetTop = $thisID.offset().top - $anckorFix;

                  $('.btn_anckor').removeClass('active');
                  $this.addClass('active');

                  if ($index > 0) {
                      $html.animate({
                          scrollTop: $offsetTop
                      }, 400);
                  } else {
                      $html.animate({
                          scrollTop: 0
                      }, 400);
                  }
                  e.preventDefault();
              });

          }
      }
      var scTop = {
          init: function () {
              scTop.btnSctop();
          },
          btnSctop: function () {
              $(document).on('click', '.btn_sctop', function (e) {
                  var $html = $('html, body');
                  $this = $(this);
                  $offsetTop = $this.offset().top - 70;
                  if (!$('.sctop_fix').hasClass('on')) {
                      $html.animate({ scrollTop: $offsetTop }, 400);
                  }
                  e.preventDefault();
              });
          },
          topMove: function (e) {
              var $tar = $(e),
                  $pBody = $tar.closest('.pop_body'),
                  $header = $tar.closest('#wrap').find('.m_head_util'),
                  $tabFixed = $tar.closest('#wrap').find('.tab_list_wrap.fixed'),
                  _hH = $header.length > 0 ? $header.outerHeight() + 10 : 10,
                  _tH = $tabFixed.length > 0 ? $tabFixed.outerHeight() : 10,
                  $notMoveEl = '.main_account';
              $html = $('html, body');

              if ($tar.is('.tit') && $tar.parents().is('.js_accordion') || $tar.parents().is($notMoveEl)) {
                  return false;
              } else {
                  ($pBody.length) ? $pBody.animate({ 'scrollTop': $tar.position().top }, 400) : $html.animate({ 'scrollTop': $tar.offset().top - (_hH+_tH) }, 400);
              }
              $tar.attr('tabindex', '1').focus();
              setTimeout(function () { $tar.removeAttr('tabindex') }, 100);
          }
      }

      //레이어팝업(Layer): 레이어 팝업은 #container 밖에 위치해야함
      var Layer = {
          id: 'uiLayer',
          popClass: 'popup',
          pageClass: 'page',
          wrapClass: 'pop_wrap',
          sclWrapClass: 'pop_scl_wrap',
          headClass: 'pop_head',
          bodyClass: 'pop_body',
          contClass: 'pop_section',
          tabClass: 'tab_scroller',
          footClass: 'pop_foot',
          innerClass: 'section',
          showClass: 'show',
          loadClass: 'load_show',
          etcCont: '#header,#gnb,#container,#footer',
          focusedClass: 'pop__focused',
          focusInClass: 'ui_focus_in',
          removePopClass: 'ui_pop_remove',
          closeRemoveClass: 'ui_pop_close_remove',
          alertClass: 'ui_pop_alert',
          lastPopClass: 'ui_pop_last',
          bgNoCloseClass: 'bg_no_click',
          noDimmedClass: 'no_dimmed',
          beforeCont: [],
          content: '',
          overlapChk: function () {
              //focus 이벤트 시 중복열림 방지
              const $focus = $(':focus');
              if (!!event) {
                  if (event.type === 'focus' && $($focus).hasClass(Layer.focusedClass)) {
                      return false;
                  }
              }
              //같은 내용 중복열림 방지
              if (Layer.beforeCont.indexOf(Layer.content) >= 0) {
                  return false;
              } else {
                  Layer.beforeCont.push(Layer.content);
              }
              return true;
          },
          alertHtml: function (type, popId, btnActionId, btnCancelId) {
              let $html = '<div id="' + popId + '" class="' + Layer.popClass + ' modal alert ' + Layer.alertClass + '" role="dialog" aria-hidden="true">';
              $html += '<article class="' + Layer.wrapClass + '">';
              $html += '<div class="' + Layer.headClass + '"><div><h1>알림</h1></div></div>';
              $html += '<div class="' + Layer.bodyClass + '">';
              $html += '<div class="' + Layer.innerClass + '">';
              if (type === 'prompt') {
                  $html += '<div class="form-lbl mt-0">';
                  $html += '<label for="inpPrompt" role="alert" aria-live="assertive"></label>';
                  $html += '</div>';
                  $html += '<div class="form-item">';
                  $html += '<div class="input"><input type="text" id="inpPrompt" placeholder="입력해주세요."></div>';
                  $html += '</div>';
              } else {
                  $html += '<div class="message">';
                  $html += '<div role="alert" aria-live="assertive"></div>';
                  $html += '</div>';
              }
              $html += '</div>';
              $html += '</div>';
              $html += '<div class="' + Layer.footClass + '">';
              $html += '<div class="btn_area">';
              if (type === 'confirm' || type === 'prompt') {
                  $html += '<span><button type="button" id="' + btnCancelId + '" class="btn secondary lg">취소</button></span>';
              }
              $html += '<span><button type="button" id="' + btnActionId + '" class="btn primary lg">확인</button></span>';
              $html += '</div>';
              $html += '</div>';
              $html += '</article>';
              $html += '</div>';

              $('body').append($html);
          },
          alertEvt: function (type, option, callback, callback2, callback3, callback4) {
              const $length = $('.' + Layer.alertClass).length;
              const $popId = Layer.id + 'Alert' + $length;
              const $actionId = $popId + 'ActionBtn';
              const $cancelId = $popId + 'CancelBtn';

              if (typeof option === 'object') {
                  Layer.content = option.content;
              } else if (typeof option == 'string') {
                  //약식 설절
                  Layer.content = option;
              }

              //텍스트가 아닌 배열이나 객체일때 텍스트 변환
              if (typeof Layer.content !== 'string') Layer.content = JSON.stringify(Layer.content);

              //내용있는지 체크
              if ($.trim(Layer.content) == '' || Layer.content == undefined) return false;

              //중복팝업 체크
              if (Layer.overlapChk() === false) return false;

              //팝업그리기
              Layer.alertHtml(type, $popId, $actionId, $cancelId);
              if (!!option.title || (typeof callback === 'string' && callback !== '')) {
                  const $insertTit = typeof callback === 'string' && callback !== '' ? callback : option.title;
                  console.log($insertTit);
                  ($insertTit === 'noTitle') ? $('#' + $popId).find('.' + Layer.wrapClass + ' h1').remove() : $('#' + $popId).find('.' + Layer.wrapClass + ' h1').html($insertTit);
              }
              let $actionTxt;
              if (!!option.actionTxt) $actionTxt = option.actionTxt;
              if (typeof callback2 === 'string' && callback2 !== '') $actionTxt = callback2;
              if ($actionTxt) $('#' + $actionId).text($actionTxt);

              let $cancelTxt;
              if (!!option.cancelTxt) $cancelTxt = option.cancelTxt;
              if (typeof callback3 === 'string' && callback3 !== '') $cancelTxt = callback3;
              if ($cancelTxt) $('#' + $cancelId).text($cancelTxt);

              const $htmlContent = Layer.content;
              if (type === 'prompt') {
                  $('#' + $popId)
                      .find('.form-lbl label')
                      .html($htmlContent);
              } else {
                  const $textAry = $htmlContent.split(' '),
                      $textLengthAry = [];
                  for (let i = 0; i < $textAry.length; i++) {
                      $textLengthAry.push($textAry[i].length);
                  }
                  const $maxTxtLength = Math.max.apply(null, $textLengthAry);
                  if ($maxTxtLength > 20)
                      $('#' + $popId)
                          .find('.message>div')
                          .addClass('breakall');
                  $('#' + $popId)
                      .find('.message>div')
                      .html($htmlContent);
              }
              Layer.open('#' + $popId);

              //click
              let $result = '';
              const $actionBtn = $('#' + $actionId);
              const $cancelBtn = $('#' + $cancelId);
              let $inpVal = '';
              $actionBtn.on('click', function () {
                  $result = true;
                  $inpVal = $('#' + $popId)
                      .find('.input input')
                      .val();

                  const $actionEvt = function () {
                      if (type === 'prompt') {
                          if (!!option.action) option.action($result, $inpVal);
                          if (!!option.callback) option.callback($result, $inpVal);
                          if (typeof callback === 'function') callback($result, $inpVal);
                          if (typeof callback2 === 'function') callback2($result, $inpVal);
                          if (typeof callback3 === 'function') callback3($result, $inpVal);
                          if (typeof callback4 === 'function') callback4($result, $inpVal);
                      } else {
                          if (!!option.action) option.action($result);
                          if (!!option.callback) option.callback($result);
                          if (typeof callback === 'function') callback($result);
                          if (typeof callback2 === 'function') callback2($result);
                          if (typeof callback3 === 'function') callback3($result);
                          if (typeof callback4 === 'function') callback4($result);
                      }
                  };
                  Layer.close('#' + $popId, $actionEvt);
              });
              $cancelBtn.on('click', function () {
                  $result = false;
                  const $cancelEvt = function () {
                      if (!!option.cancel) option.cancel();
                      if (!!option.callback) option.callback($result);
                      if (typeof callback === 'function') callback($result);
                      if (typeof callback2 === 'function') callback2($result);
                      if (typeof callback3 === 'function') callback3($result);
                      if (typeof callback4 === 'function') callback4($result);
                  };
                  Layer.close('#' + $popId, $cancelEvt);
              });
          },
          alert: function (option, callback, callback2, callback3) {
              Layer.alertEvt('alert', option, callback, callback2, callback3);
          },
          confirm: function (option, callback, callback2, callback3, callback4) {
              Layer.alertEvt('confirm', option, callback, callback2, callback3, callback4);
          },
          prompt: function (option, callback, callback2, callback3, callback4) {
              Layer.alertEvt('prompt', option, callback, callback2, callback3, callback4);
          },
          keyEvt: function () {
              //컨펌팝업 버튼 좌우 방할기로 포거스 이동
              $(document).on('keydown', '.' + Layer.alertClass + ' .pop_btn .button', function (e) {
                  const $keyCode = e.keyCode ? e.keyCode : e.which;
                  let $tar = '';
                  if ($keyCode == 37) $tar = $(this).prev();
                  if ($keyCode == 39) $tar = $(this).next();
                  if (!!$tar) $tar.focus();
              });
          },
          selectId: 'uiSelectLayer',
          selectIdx: 0,
          selectClass: 'ui_pop_select',
          select: function (target, col) {
              const $target = $(target);
              const $targetVal = $target.val();
              const $addClass = $target.data('class');
              const $type = $target.data('type');
              let $title = $target.attr('title');
              const $popId = Layer.selectId + Layer.selectIdx;
              const $length = $target.children().length;
              let $option = '';
              let $opDisabled = '';
              let $opTxt = '';
              let $opVal = '';
              let $popHtml = '';
              const $isTouch = $target.hasClass('is_swipe') ? true : false;
              const $isTouchMove = $target.hasClass('is_swipe_move') ? true : false;
              let $isFullPop = false;

              Layer.selectIdx++;
              if ($title == undefined) $title = '선택';

              $popHtml +=
                  '<div id="' +
                  $popId +
                  '" class="' +
                  Layer.popClass +
                  ' ' +
                  ($isFullPop ? 'full' : 'bottom') +
                  ($isTouch || $isTouchMove ? ' is_swipe' : '') +
                  ($isTouchMove ? ' touch_move' : '') +
                  ' ' +
                  Layer.selectClass +
                  '" role="dialog" aria-hidden="true">';
              $popHtml += '<article class="' + Layer.wrapClass + '">';
              $popHtml += '<div class="' + Layer.headClass + '">';
              $popHtml += '<div>';
              $popHtml += '<h1>' + $title + '</h1>';
              $popHtml += '<a href="#" class="pop_close ui_pop_close" role="button" aria-label="팝업창 닫기"></a>';
              $popHtml += '</div>';
              $popHtml += '</div>';
              $popHtml += '<div class="' + Layer.bodyClass + '">';

              $popHtml += '<ul class="select_item_wrap';
              if (!!col) $popHtml += ' col' + col;
              if ($addClass) $popHtml += ' ' + $addClass;
              $popHtml += '">';
              for (let i = 0; i < $length; i++) {
                  $option = $target.children().eq(i);
                  $opDisabled = $option.prop('disabled');
                  $opTxt = $option.data('txt') ? $option.data('txt') : $option.text();
                  $opSub = $option.data('sub');
                  $opVal = $option.attr('value');
                  if ($opVal != '') {
                      $popHtml += '<li>';
                      $popHtml += '<div class="select_item' + ($targetVal == $opVal ? ' selected' : '') + '">';
                      $popHtml += '<a href="#" class="ui_pop_select_btn' + ($opDisabled ? ' disabled' : '') + '" role="button" data-value="' + $opVal + '"';
                      if ($targetVal == $opVal) $popHtml += ' title="' + ($opTxt.length > 20 ? $opTxt.substring(20, $opTxt.lastIndexOf('(')) : $opTxt) + ' 선택됨"';
                      $popHtml += '>';
                      $popHtml += '<div class="select_item_txt">' + $opTxt + '</div>';
                      $popHtml += '</a>';
                      $popHtml += '</div>';
                      $popHtml += '</li>';
                  }
              }
              $popHtml += '</ul>';
              $popHtml += '</div>';
              $popHtml += '</article>';
              $popHtml += '</div>';

              ($('#wrap').length) ? $('#wrap').append($popHtml) : $('body').append($popHtml);

              $target.data('popup', '#' + $popId);

              $('#' + $popId).on('click', '.ui_pop_select_btn', function (e) {
                  e.preventDefault();
                  if (!$(this).hasClass('disabled')) {
                      const $btnVal = $(this).data('value');
                      const $btnTxt = $(this).text();
                      $(this).parent().addClass('selected').closest('li').siblings().find('.selected').removeClass('selected');
                      $target.val($btnVal).change();
                      Layer.close('#' + $popId);
                  }
              });
          },
          isSelectOpen: false,
          selectOpen: function (select, e) {
              const $select = $(select);
              const $txtLengthArry = [];
              if ($select.prop('disabled')) return false;
              if ($select.find('option').length < 1) return console.log('select에 option 없음');
              if ($select.find('option').length == 1 && $select.find('option').val() == '') return console.log('select에 option의 value가 0이라 리턴');
              Layer.isSelectOpen = true;
              $select.find('option').each(function () {
                  const $optVal = $(this).val();
                  const $optTxt = $(this).text();
                  if ($optVal != '') {
                      $txtLengthArry.push($optTxt.length);
                  }
              });

              Layer.select($select);

              const $pop = $select.data('popup');
              Layer.open($pop, function () {
                  //if(!!e)$($pop).data('returnFocus',$currentTarget);
              });
          },
          selectUI: function () {
              //셀렉트 팝업
              $(document).on('click', '.ui_select_open', function (e) {
                  e.preventDefault();
                  let $select = '';
                  if (Layer.isSelectOpen == false) {
                      $select = $($(this).attr('href'));
                      if (!$select.length) $select = $(this).prev('select');
                      Layer.selectOpen($select, e);
                  }
              });
              $(document).on('click', '.ui-select-lbl', function (e) {
                  e.preventDefault();
                  const $tar = $(this).is('a') ? $(this).attr('href') : '#' + $(this).attr('for');
                  $($tar).next('.ui_select_open').focus().click();
              });
          },
          bottomTouch: function (tar) {
              const $popup = $(tar);
              const $wrap = $popup.find('.' + Layer.wrapClass);
              const $head = $popup.find('.' + Layer.headClass);
              const _headH = $head.outerHeight();
              const $body = $popup.find('.' + Layer.bodyClass);
              const $tabScroller = $body.find('.' + Layer.tabClass);
              const $foot = $popup.find('.' + Layer.footClass);
              const $trigger = $popup.hasClass('body_swipe') ? Layer.tabClass : Layer.headClass;
              let _footH = 0;
              if ($foot.length) _footH = $foot.outerHeight();
              //swipe 영역 추가
              if ($popup.hasClass('is_swipe') && !$head.find('span.swipe').length) $head.prepend('<span class="swipe"></span>');
              const $bodyMinHeight = $popup.find('span.swipe').outerHeight();

              let isMove = false;
              const $animateSpeed = 300;
              let $startH = 0;
              let $startX = 0;
              let $startY = 0;
              let $distanceX = 0;
              let $distanceY = 0;
              let $directionX = false;
              let $directionY = false;
              let $duration = 0;
              let $durationTimer;

              $(tar)
                  .find('.' + $trigger)
                  .on('touchstart mousedown', function (e) {
                      isMove = true;
                      const $this = $(this);
                      const $clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
                      const $clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
                      $startX = $clientX;
                      $startY = $clientY;
                      $startH = $this.closest('.' + Layer.wrapClass).outerHeight();
                      $distanceX = 0;
                      $distanceY = 0;
                      $directionX = false;
                      $directionY = false;
                      if ($this.data('first-height') === undefined) $this.data('first-height', $startH);
                      if ($this.data('is-full') === undefined) $this.data('is-full', false);
                      $duration = 0;
                      $durationTimer = setInterval(function () {
                          $duration += 10;
                      }, 10);
                      $wrap.stop(false, true);
                      if ($(tar).hasClass('touch_move')) $(tar).addClass('touch-moving');
                      if($tabScroller.hasClass('scroll')) $tabScroller.css('overflow-y','hidden');
                      
                  });

              $(tar)
                  .find('.' + $trigger)
                  .on('touchmove mousemove', function (e) {
                      if (!isMove) return false;
                      const $this = $(this);
                      const $clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
                      const $clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
                      $distanceX = $clientX - $startX;
                      $distanceY = $clientY - $startY;

                      const $min = $bodyMinHeight;
                      const $max = $(tar).hasClass('touch_move') ? $popup.height() : $popup.outerHeight();
                      const $height = Math.max($min, Math.min($max, $startH - $distanceY));
                      const _bodyH = $height - _headH - _footH;

                      $wrap.css('height', $height);
                      $body.css('max-height', _bodyH);
                      if (_bodyH <= 0) {
                          $popup.removeClass('foot');
                          $wrap.css('padding-bottom', 0);
                      } else {
                          $popup.addClass('foot');
                          $wrap.css('padding-bottom', _footH);
                      }
                  });

              $(tar)
                  .find('.' + $trigger)
                  .on('touchend mouseup mouseleave', function (e) {
                      if (!isMove) return false;
                      isMove = false;
                      const $this = $(this);
                      const $isFull = $this.data('is-full');
                      const $clientX = e.type === 'touchend' ? e.changedTouches[0].clientX : e.clientX;
                      const $clientY = e.type === 'touchend' ? e.changedTouches[0].clientY : e.clientY;
                      $distanceX = $clientX - $startX;
                      $distanceY = $clientY - $startY;
                      if ($distanceX !== 0) $directionX = $distanceX > 0 ? 'right' : 'left';
                      if ($distanceY !== 0) $directionY = $distanceY > 0 ? 'down' : 'up';
                      const $firstHeight = $this.data('first-height');
                      const $min = $bodyMinHeight;
                      const $max = $(tar).hasClass('touch_move') ? $popup.height() : $popup.outerHeight();

                      clearInterval($durationTimer);
                      const $powerRatio = $duration === 0 || $distanceY === 0 ? 0 : Math.abs($distanceY) / $duration;
                      const $power = (1 + Math.round($powerRatio * 3)) * Math.round($powerRatio * 30);
                      const $powerDistance = Math.round((($distanceY * -1) / $duration) * $power);
                      if ($(tar).hasClass('touch_move')) {
                          $(tar).removeClass('touch-moving');
                          const $wrapHeight = $wrap.outerHeight();
                          const $endHeight = Math.max($min, Math.min($max, $wrapHeight + $powerDistance));
                          const $endSpeed = Math.min(2000, Math.abs($powerDistance * 10));
                          $wrap.animate({ height: $endHeight }, $endSpeed, 'easeOutQuint');
                          $body.css('max-height', $endHeight - _headH - _footH);
                      } else if ($(tar).hasClass('body_swipe')) {
                          const _tabS = $tabScroller.scrollTop();
                          const _tabH = $body.find('.tab_list').outerHeight();
                          const popMaxH = $(window).height() - 30;
                          (_tabS <= 0) ? $tabScroller.removeClass('on').addClass('scroll') : $tabScroller.removeClass('scroll').addClass('on');
                          if (Math.abs($distanceY) > 25) {
                              if ($popup.hasClass('bottom') && !$isFull) {
                                  //if ($directionY === 'up' && $this.hasScroll()) {
                                  if ($directionY === 'up') {
                                      $wrap.animate({ height: '100%' }, $animateSpeed);
                                      $tabScroller.css('max-height', parseInt(popMaxH - _headH - _footH - _tabH));
                                      $tabScroller.removeClass('scroll').addClass('on');
                                      $tabScroller.css('overflow-y','');
                                  } else if ($directionY === 'down' && $tabScroller.hasClass('scroll')) {
                                      $wrap.animate({ height: $popup.data('isWrapH') }, $animateSpeed);
                                      const _popH = parseInt(($(window).height() / 3) * 2);
                                      setTimeout(function(){
                                          if ($popup.hasClass('transfer') || $popup.hasClass('half') || $popup.hasClass('default')) {
                                              $tabScroller.css('max-height', parseInt($popup.data('isBodyH') - _tabH));
                                          } else {
                                              $tabScroller.css('max-height', parseInt(_popH - _headH - _footH - _tabH));
                                          }
                                      }, 300);
                                  }
                              }
                          }
                      } else {
                          if (Math.abs($distanceY) > 25) {
                              if ($popup.hasClass('bottom') && !$isFull) {
                                  if ($directionY === 'up') {
                                      $wrap.animate({ height: '100%' }, $animateSpeed);
                                  } else if ($directionY === 'down') {
                                      Layer.close(tar);
                                  }
                              }
                          } else {
                              $wrap.animate({ height: $firstHeight }, $animateSpeed, function () {
                                  $this.removeData('first-height');
                              });
                          }
                      }

                      $this.removeData('is-full');
                  });
          },
          toast: function (txt, fn, type, delayTime) {
              if (type === undefined) type = 'toast';
              const $isAlarm = type === 'alarm';
              const $isFn = !!fn;
              const $className = '.' + type + '_box';

              if (delayTime == undefined) delayTime = 2000;

              let $boxHtml = '<div class="' + $className.substring(1) + '">';
              $boxHtml += '<div>';
              if ($isFn) {
                  $boxHtml += '<a href="#" role="button" class="txt">' + txt + '</a>';
              } else {
                  $boxHtml += '<div class="txt">' + txt + '</div>';
              }
              if ($isAlarm) {
                  $boxHtml += '<button type="button" class="close">닫기</button>';
              }
              $boxHtml += '</div>';
              $boxHtml += '</div>';
              $('#wrap').before($boxHtml);
              const $toast = $($className).last();
              const $toastClose = function () {
                  $toast.removeClass('on');
                  $toast.one('transitionend', function () {
                      $(this).remove();
                  });
              };
              const $spaceH = $('.bottom_fixed-space').outerHeight();
              if ($spaceH) {
                  $toast.css('bottom', $spaceH);
              }
              setTimeout(function () { $toast.addClass('on') }, 10);
              let $closeTime;
              if (!$isAlarm) {
                  $closeTime = setTimeout($toastClose, delayTime);
              }
              if ($isFn) {
                  $toast.find('a.txt').one('click', function (e) {
                      e.preventDefault();
                      fn();
                      // 이벤트 실행시 바로 닫기
                      clearTimeout($closeTime);
                      $toastClose();
                  });
              }
          },
          alarm: function (txt, fn, delayTime) {
              Layer.toast(txt, fn, 'alarm', delayTime);
          },
          reOpen: false,
          openEl: '',
          openPop: [],
          opening: 0,
          open: function (tar, popTitle, popClose, callback) {
              const $popup = $(tar);
              const $popWrap = $popup.find('.' + Layer.wrapClass);
              const $popBody = $popup.find('.' + Layer.bodyClass);
              const $btnPopClose = $popup.find('.pop_wrap .pop_close');
              const $tabScroller = $popup.find('.' + Layer.tabClass);
              const popMaxH = $(window).height() - 30;
              $('html').removeClass('keypad_open');
              if($popup.closest('#wrap').length && $popup.find($inputEl).length || $popup.hasClass('more')){
                  $('#wrap').after($popup);
              }
              if ($('#wrap').length && !$popup.hasClass('no_dimmed')) $('#wrap').attr('aria-hidden', true);
              if ($('#content').length && !$popup.hasClass('no_dimmed')) $('#content').attr('aria-hidden', true);
              if ($tabScroller.length) $tabScroller.removeClass('on').addClass('scroll');
              if ($popup.length && $popWrap.length) {
                  Layer.opening++;
                  const $idx = $popup.index('.' + Layer.popClass);
                  const $show = $('.' + Layer.popClass + '.' + Layer.showClass).not('.' + Layer.alertClass).length;
                  const $alertShow = $('.' + Layer.popClass + '.' + Layer.showClass + '.' + Layer.alertClass).length;
                  let $id = $popup.attr('id');
                  let $lastPop = '';

                  if (Layer.openPop.length) $lastPop = Layer.openPop[Layer.openPop.length - 1];
                  if ($popup.hasClass(Layer.alertClass && !$alertShow)) {
                      $popup.css('z-index', '+=' + $alertShow);
                  } else if ($show) {
                      $popup.css('z-index', '+=' + $show);
                  }
                  if ($id == undefined) {
                      $id = Layer.id + $idx;
                      $popup.attr('id', $id);
                  }
                  if ($btnPopClose.length) $btnPopClose.attr('id', $id + '_dev');
                  if (popTitle != undefined && popTitle != null && popTitle != '') $popup.find('.pop_head h1').text(popTitle);
                  if (popTitle === 'noTitle' && popTitle != '') $popup.find('.pop_head h1').empty();
                  if ($btnPopClose.length && popClose === 'noClose') $btnPopClose.remove();
                  if (!$popup.hasClass(Layer.alertClass)) {
                      if (Layer.openPop.length) {
                          let $last;
                          $.each(Layer.openPop, function () {
                              const $this = '' + this;
                              if (!$($this).hasClass(Layer.alertClass)) $last = $this;
                          });
                          $($last).removeClass(Layer.lastPopClass);
                      }
                      $popup.addClass(Layer.lastPopClass);
                  }
                  if (Layer.openPop.indexOf('#' + $id) < 0) Layer.openPop.push('#' + $id);

                  // bg close
                  if (!$popup.hasClass(Layer.alertClass) && !$popup.hasClass(Layer.bgNoCloseClass)) {
                      const $bgClick = '<div class="pop_bg_close ui_pop_close" role="button" aria-label="팝업창 닫기"></div>';
                      if (!$popup.find('.pop_bg_close').length) $popup.prepend($bgClick);
                  }

                  const $openDelay = 100 * Layer.opening;
                  const $callbackDelay = 450;

                  if ($popup.hasClass('bottom')) $popup.find('.pop_body').addClass('scroll');
                  if ($popup.hasClass('bottom') && $popup.find('.tab_wrap:not(.box)').length) {
                      $popup.find('.pop_body').addClass('is_tab');
                      if(!$popup.find('.tab_scroller').length) $popup.find('.tab_wrap:not(.box)').contents().not('.tab_list').wrapAll('<div class="tab_scroller scroll"></div>');
                  }

                  //tab 메뉴 체크
                  if ($popup.find('.tab_wrap').length && $popup.hasClass('bottom')) {
                      $popup.hasClass('transfer') ? $popup.addClass('body_swipe') : $popup.addClass('body_swipe default');
                  }

                  $popup.attr('aria-hidden', false);

                  if ($popup.hasClass('modal')) {
                      $popup.css('display', 'flex');
                  } else {
                      $popup.show();
                  }

                  const $FocusEvt = function () {
                      //리턴 포커스
                      let $focusEl = '';
                      try {
                          if (event.currentTarget != document) {
                              $focusEl = $(event.currentTarget);
                          } else {
                              $focusEl = $(document.activeElement);
                          }
                      } catch (error) {
                          $focusEl = $(document.activeElement);
                      }
                      if (Layer.openEl != '' && !$focusEl.is($focusableEl)) $focusEl = $(Layer.openEl);
                      if ($($lastPop).data('returnFocus') == $focusEl) $focusEl = $(Layer.openEl);
                      if ($($focusEl).is($focusableEl)) {
                          $popup.data('returnFocus', $focusEl);
                          $focusEl.addClass(Layer.focusedClass);
                          if ($focusEl.hasClass('btn_select')) $focusEl.closest('.select').addClass('focused');
                      }
                      //팝업 in 포커스
                      $popup.attr({ tabindex: 0 }).focus();
                  };

                  setTimeout(function () {
                      $(Layer.etcCont).attr('aria-hidden', true);

                      //열려있는 팝업
                      if (Layer.openPop.length && $lastPop) $($lastPop).attr('aria-hidden', true);

                      //웹접근성
                      const $tit = $popup.find('.' + Layer.headClass + ' h1');
                      if ($tit.length) {
                          if ($tit.attr('id') == undefined) {
                              $tit.attr('id', $id + 'Label');
                              $popup.attr('aria-labelledby', $id + 'Label');
                          } else {
                              $popup.attr('aria-labelledby', $tit.attr('id'));
                          }
                      }

                      //팝업안 고정탭
                      if ($popup.find('.tab_wrap').length) tabMenu.init();

                      //팝업안 swiper
                      if ($popup.find('.ui_swiper').length) uiSwiper.update($popup.find('.ui_swiper'));

                      //열기
                      if (!$('html').hasClass('lock') && !$popup.hasClass('no_dimmed')) Body.lock();
                      $popWrap.scrollTop(0);
                      $popup.addClass(Layer.showClass);

                      //타이틀 유무 체크
                      if ($popup.find('.pop_head h1').length == 0) $popup.addClass('no_title');

                      //iframe
                      if ($('iframe.load-height').length) ui.Util.iframe();
                      if (!uiMobile.any()) Layer.focusMove(tar);
                      Layer.position(tar);

                      setTimeout(function () {
                          Layer.resize();
                          if ($popup.hasClass('bottom') || $popup.hasClass('modal')) {
                              var $height = $(window).height() - 60;
                              const $wrap = $popup.find('.' + Layer.wrapClass);
                              const $head = $wrap.find('.' + Layer.headClass);
                              const _headH = $head.outerHeight();
                              const $foot = $wrap.find('.' + Layer.footClass);
                              const $body = $wrap.find('.' + Layer.bodyClass);
                              const _contH = $wrap.find('.' + Layer.contClass).height();
                              const $tabScroller = $body.find('.tab_scroller');
                              let _footH = 0;
                              let _popH = 0;
                              let isScroll = false;
                              if ($foot.length) {
                                  _footH = $foot.outerHeight();
                                  $popup.addClass('foot');
                                  $wrap.css('padding-bottom', _footH);
                              }
                              $wrap.css('max-height', popMaxH);
                              $body.css('max-height', popMaxH - _headH - _footH);
                              if ($popup.hasClass('transfer')) {
                                  var $popMark = $('.pop_mark');
                                  if ($popMark.length) {
                                      var _tH = parseInt($(window).height() - ($popMark.offset().top + $popMark.height() + 24));
                                      _popH = (230 > _tH) ? 230 : _tH;
                                  } else {
                                      _popH = parseInt(($(window).height() / 3) * 2);
                                  }
                              } else if ($popup.hasClass('half')) {
                                  _popH = parseInt($(window).height() / 2);
                              } else if ($popup.hasClass('default')) {
                                  _popH = parseInt(($(window).height() / 3) * 2);
                              }
                              let _bodyH = _popH - _headH - _footH;
                              (_bodyH < _contH || $popup.find('.tab_wrap').length) ? isScroll = true : $body.removeClass('scroll').addClass('no_scroll');
                              if ($popup.hasClass('transfer') || $popup.hasClass('half') || $popup.hasClass('default')) {
                                  if (isScroll) {
                                      $wrap.css('height', _popH);
                                      $popup.data('isWrapH', _popH);
                                      $popup.data('isBodyH', _bodyH);
                                  }
                              }
                              //탭 컨텐츠 스크롤이 필요할때
                              if($tabScroller.length) {
                                  const _tabH = $body.find('.tab_list').outerHeight();
                                  $tabScroller.css('max-height', parseInt(_bodyH - _tabH));
                              }
                              //swipe 기능
                              if ($popup.hasClass('is_swipe') && !$popup.hasClass('is_swipe__init') || $popup.hasClass('body_swipe')) {
                                  $popup.addClass('is_swipe__init');
                                  if (!$popBody.hasClass('no_scroll')) Layer.bottomTouch(tar);
                              }
                          }
                      }, 100);

                      setTimeout(function () {
                          if (!$popup.hasClass('no_dimmed')) $FocusEvt();
                          if (!!callback) callback();
                          $popup.trigger('Layer.show');

                          // 20220826: 좌우분할 스크롤 목록 초기값 처리용(개발요청)
                          Layer.setScrollBetweenTop();
                      }, $callbackDelay);
                      Layer.opening--;
                  }, $openDelay);
              } else {
                  //팝업 없을때
                  if (!Layer.reOpen) {
                      Layer.reOpen = true;
                      console.log(tar, '팝업없음, 0.5초 후 open 재시도');
                      setTimeout(function () {
                          Layer.open(tar, callback);
                      }, 500);
                  } else {
                      Layer.reOpen = false;
                      console.log(tar, '재시도해도 팝업없음');
                  }
              }
          },
          close: function (tar, callback) {
              const $popup = $(tar);
              if (!$popup.hasClass(Layer.showClass)) return console.log(tar, '해당팝업 안열려있음');
              const $id = $popup.attr('id');
              let $closeDelay = 510;
              let $callbackDelay = ($popup.hasClass('morphing')) ? 0 : 510;
              let $lastPop = '';
              const $visible = $('.' + Layer.popClass + '.' + Layer.showClass).length;

              if ($('#wrap').length) $('#wrap').removeAttr('aria-hidden');
              if ($('#content').length) $('#content').removeAttr('aria-hidden');

              Layer.openPop.splice(Layer.openPop.indexOf('#' + $id), 1);
              if (Layer.openPop.length) $lastPop = Layer.openPop[Layer.openPop.length - 1];
              if (!$popup.hasClass(Layer.alertClass)) {
                  if (Layer.openPop.length) {
                      let $last;
                      $.each(Layer.openPop, function () {
                          const $this = '' + this;
                          if (!$($this).hasClass(Layer.alertClass)) $last = $this;
                      });
                      $($last).addClass(Layer.lastPopClass);
                  }
                  $popup.removeClass(Layer.lastPopClass);
              }
              if ($visible == 1) {
                  if (!$popup.hasClass('morphing')) Body.unlock();
                  $(Layer.etcCont).removeAttr('aria-hidden');
              }
              if ($lastPop != '') $($lastPop).attr('aria-hidden', false);

              //포커스
              const $focusEvt = function () {
                  const $returnFocus = $popup.data('returnFocus');
                  if ($returnFocus != undefined) {
                      $returnFocus.removeClass(Layer.focusedClass).focus();
                      if ($returnFocus.hasClass('btn_select')) $returnFocus.closest('.select').removeClass('focused');
                  } else {
                      //리턴 포커스가 없을때
                      if ($('#header').length) {
                          if ($('.head-back').length) {
                              $('.head-back').focus();
                          } else {
                              $('#header').attr({ tabindex: 0 }).focus();
                          }
                      } else {
                          $('#container').find($focusableEl).first().focus();
                      }
                  }
              };
              setTimeout(function () {
                  $focusEvt();
              }, 100);

              //닫기
              $popup.removeClass(Layer.showClass).data('focusMove', false).data('popPosition', false);
              $popup.attr('aria-hidden', 'true').removeAttr('tabindex aria-labelledby');
              if ($popup.hasClass('no_motion')) $closeDelay = 10;

              const $closeAfter = function () {
                  $popup.removeAttr('style');
                  if ($popup.hasClass('is_swipe')) {
                      $popup.find('.' + Layer.wrapClass).removeAttr('style');
                      if ($popup.hasClass('full')) $popup.removeClass('full').addClass('bottom');
                  }
                  $popup
                      .find('.' + Layer.headClass)
                      .removeAttr('style')
                      .removeClass('shadow')
                      .find('h1')
                      .removeAttr('tabindex');
                  $popup.find('.' + Layer.bodyClass).removeAttr('tabindex style');
                  $popup.find('.' + Layer.focusInClass).removeAttr('tabindex');
                  if ($popup.find('.pop_close.last_focus').length) $popup.find('.pop_close.last_focus').remove();

                  // 닫을 때 없어져야하는 요소
                  if ($popup.find('.' + Layer.closeRemoveClass).length) $popup.find('.' + Layer.closeRemoveClass).remove();

                  // 닫기 후 팝업 자체가 없어지는 케이스
                  if ($popup.hasClass(Layer.alertClass) || $popup.hasClass(Layer.selectClass) || $popup.hasClass(Layer.removePopClass)) {
                      if ($popup.hasClass(Layer.selectClass)) Layer.isSelectOpen = false;
                      if ($popup.hasClass(Layer.alertClass)) {
                          const $content = $popup.find('.message>div').html();
                          Layer.beforeCont.splice(Layer.beforeCont.indexOf($content), 1);
                      }
                      $popup.remove();
                  }
              };
              setTimeout(function () {
                  $closeAfter();
              }, $closeDelay);

              setTimeout(function () {
                  //callback
                  if (!!callback) callback();

                  $popup.trigger('Layer.hide');
              }, $callbackDelay);
          },
          resize: function () {
              const $popup = $('.' + Layer.popClass + '.' + Layer.showClass);
              if (!$popup.length) return;
              const headHeight = function (headCont, contentCont) {
                  const $headH = headCont.children().outerHeight();
                  const $position = headCont.css('position');
                  const $padTop = parseInt(contentCont.css('padding-top'));
                  if ($headH > $padTop) {
                      contentCont.css('padding-top', $headH);
                  }
              };
              const footHeight = function (footCont, contentCont) {
                  const $footH = footCont.children().outerHeight();
                  const $padBottom = parseInt(contentCont.css('padding-bottom'));
                  if ($footH > $padBottom) {
                      contentCont.css('padding-bottom', $footH);
                  }
              };
              $popup.each(function () {
                  const $this = $(this);
                  const $wrap = $this.find('.' + Layer.wrapClass);
                  const $head = $wrap.find('.' + Layer.headClass);
                  const _headH = $head.length ? $head.outerHeight() : 0;
                  const $tit = $head.find('h1');
                  const $foot = $wrap.find('.' + Layer.footClass);
                  const $body = $wrap.find('.' + Layer.bodyClass);
                  const _bodyH = $body.find('.pop_section').outerHeight();
                  let _footH = 0;

                  $head.removeAttr('style').removeClass('shadow');
                  $body.removeAttr('tabindex style');

                  //바텀시트 선택요소로 스크롤
                  if ($this.hasClass(Layer.selectClass) && $this.find('.selected').length && !$wrap.hasClass('scrolling')) {
                      const $headH = $head.outerHeight();
                      const $wrapH = $wrap.outerHeight();
                      const $wrapH2 = $wrap.get(0).scrollHeight;
                      const $selected = $wrap.find('.selected');
                      const $selectedH = $selected.outerHeight();
                      const $selectedTop = $selected.position().top;

                      if ($wrapH < $wrapH2) {
                          $wrap.addClass('scrolling');
                          const $sclTop = $selectedTop - $wrapH + $wrapH / 2 - $selectedH / 2 + $headH / 2;
                          $wrap.animate({ scrollTop: $sclTop }, 300, function () {
                              $wrap.removeClass('scrolling');
                          });
                      }
                  }
              });
          },
          fixed: function (el) {
              //  pop fixed
              const $wrap = $(el).hasClass(Layer.wrapClass) ? $(el) : $(el).closest('.' + Layer.wrapClass);
              const $head = $wrap.find('.' + Layer.headClass);
              const $foot = $wrap.find('.' + Layer.footClass);
              const $scrollTop = $wrap.hasClass(Layer.pageClass) ? $(window).scrollTop() : $wrap.scrollTop();
              const $scrollHeight = $wrap.hasClass(Layer.pageClass) ? $('body').get(0).scrollHeight : $wrap[0].scrollHeight;
              const $wrapHeight = $wrap.hasClass(Layer.pageClass) ? $(window).height() : $wrap.outerHeight();
              const $topClassName = 'pop-top-fixed';
              const $bottomClassName = 'pop-bottom_fixed';
              if ($head.length) {
                  if ($scrollTop > 0) {
                      $head.addClass($topClassName);
                  } else {
                      $head.removeClass($topClassName);
                  }
              }

              if ($foot.length) {
                  if ($scrollTop + $wrapHeight >= $scrollHeight - 10) {
                      $foot.removeClass($bottomClassName);
                  } else {
                      $foot.addClass($bottomClassName);
                  }
              }
              const $fixed = $wrap.find('.pop-fixed');
              const $wrapTop = $wrap.position().top;
              if ($fixed.length) {
                  $fixed.each(function () {
                      const $this = $(this);
                      const $offsetTop = $this.data('top') !== undefined ? $this.data('top') : Math.max(0, getOffset(this).top);
                      const $topMargin = ui.Common.getTopFixedHeight($this, $topClassName);
                      let $topEl = $this;
                      const $top = $offsetTop - $wrapTop;
                      if ($scrollTop + $topMargin > $top) {
                          $this.data('top', $offsetTop);
                          $this.addClass($topClassName);
                          if ($topEl.css('position') !== 'fixed' && $topEl.css('position') !== 'sticky') $topEl = $topEl.children();
                          if ($topMargin !== parseInt($topEl.css('top')) && $topEl.css('position') === 'fixed') $topEl.css('top', $topMargin);
                          if ($head.hasClass($topClassName)) $head.addClass('no-shadow');
                      } else {
                          $this.removeData('top');
                          if ($topEl.css('position') !== 'fixed' && $topEl.css('position') !== 'sticky') $topEl = $topEl.children();
                          $topEl.removeAttr('style');
                          $this.removeClass($topClassName);
                          if (($head.hasClass($topClassName) && $wrap.find('.' + $topClassName).length === 1) || !$wrap.find('.' + $topClassName).length) $head.removeClass('no-shadow');
                      }
                  });
              }
          },
          position: function (tar) {
              const $popup = $(tar);
              if (!$popup.hasClass(Layer.showClass)) return false;
              if ($popup.data('popPosition') == true) return false;
              $popup.data('popPosition', true);
              let $wrap = $popup.find('.' + Layer.wrapClass);
              let $wrapH = $wrap.outerHeight();
              let $wrapSclH = $wrap[0].scrollHeight;
              const $head = $popup.find('.' + Layer.headClass);
              const $body = $popup.find('.' + Layer.bodyClass);
              const $foot = $popup.find('.' + Layer.footClass);
              const $footBtn = $foot.find('.button');
              Layer.fixed($wrap);
          },
          focusMove: function (tar) {
              if (!$(tar).hasClass(Layer.showClass)) return false;
              if ($(tar).data('focusMove') == true) return false;
              $(tar).data('focusMove', true);
              const $tar = $(tar);
              const $focusaEls = $tar.find($focusableEl);
              let $isFirstBackTab = false;

              $focusaEls.on('keydown', function (e) {
                  const $keyCode = e.keyCode ? e.keyCode : e.which;
                  const $focusable = $tar.find($focusableEl).not('.last_focus');
                  const $focusLength = $focusable.length;
                  const $firstFocus = $focusable.first();
                  const $lastFocus = $focusable.last();
                  const $index = $focusable.index(this);

                  $isFirstBackTab = false;
                  if ($index == $focusLength - 1) {
                      //last
                      if ($keyCode == 9) {
                          if (!e.shiftKey) {
                              $firstFocus.focus();
                              e.preventDefault();
                          }
                      }
                  } else if ($index == 0) {
                      //first
                      if ($keyCode == 9) {
                          if (e.shiftKey) {
                              $isFirstBackTab = true;
                              $lastFocus.focus();
                              e.preventDefault();
                          }
                      }
                  }
              });

              $tar.on('keydown', function (e) {
                  const $keyCode = e.keyCode ? e.keyCode : e.which;
                  const $focusable = $tar.find($focusableEl).not('.last_focus');
                  const $lastFocus = $focusable.last();

                  if (e.target == this && $keyCode == 9) {
                      if (e.shiftKey) {
                          $lastFocus.focus();
                          e.preventDefault();
                      }
                  }
              });

              $(document).on('focusin', $tar.selector + ' .last_focus', function (e) {
                  const $focusable = $tar.find($focusableEl).not('.last_focus');
                  const $firstFocus = $focusable.first();
                  const $lastFocus = $focusable.last();
                  if ($isFirstBackTab) {
                      $lastFocus.focus();
                  } else {
                      $firstFocus.focus();
                  }
              });
          },
          init: function () {
              if ($('.' + Layer.popClass + '.' + Layer.showClass + '[aria-hidden="true"]').length) {
                  Layer.open('.' + Layer.popClass + '.' + Layer.showClass + '[aria-hidden="true"]');
              }
              const $winpop = $('.' + Layer.wrapClass + '.' + Layer.pageClass);
              if ($winpop.length) {
                  Layer.page($winpop);
              }

              $(document).on('click', $focusableEl, function (e) {
                  Layer.openEl = e.currentTarget;
              });
              setTimeout(function () {
                  Layer.openEl = '';
              }, 100);

              //열기
              $(document).on('click', '.ui_pop_open', function (e) {
                  e.preventDefault();
                  const $pop = $(this).attr('href');
                  const $currentTarget = $(e.currentTarget);
                  if ($pop.length) {
                      Layer.open($pop, function () {
                          $($pop).data('returnFocus', $currentTarget);
                      });
                  }
              });

              //닫기
              $(document).on('click', '.ui_pop_close', function (e) {
                  e.preventDefault();
                  let $pop = $(this).attr('href');
                  if ($pop == '#' || $pop == '#none' || $pop == undefined) $pop = $(this).closest('.' + Layer.popClass);
                  if ($pop.length) Layer.close($pop);
              });

              Layer.keyEvt();
              Layer.selectUI();

              $(document).on('click', '[data-popup]', function (e) {
                  e.preventDefault();
                  const $popup = $(this).data('popup');
                  Layer.load($popup, 'full');
              });
              $(document).on('click', '[data-popup-full]', function (e) {
                  e.preventDefault();
                  const $popup = $(this).data('popup-full');
                  Layer.load($popup, 'full');
              });
              $(document).on('click', '[data-popup-modal]', function (e) {
                  e.preventDefault();
                  const $popup = $(this).data('popup-modal');
                  Layer.load($popup, 'modal');
              });
              $(document).on('click', '[data-popup-bottom]', function (e) {
                  e.preventDefault();
                  const $popup = $(this).data('popup-bottom');
                  Layer.load($popup, 'bottom');
              });
              $(document).on('click', '[data-popup-left]', function (e) {
                  e.preventDefault();
                  const $popup = $(this).data('popup-left');
                  Layer.load($popup, 'side-left');
              });
              $(document).on('click', '[data-popup-right]', function (e) {
                  e.preventDefault();
                  const $popup = $(this).data('popup-right');
                  Layer.load($popup, 'side-right');
              });

              // 알람박스 닫기
              $(document).on('click', '.alarm_box .close', function (e) {
                  e.preventDefault();
                  const $box = $(this).closest('.alarm_box');
                  $box.removeClass('on');
                  $box.on('transitionend', function () {
                      $(this).remove();
                  });
              });
          },
          /*  setScrollBetweenTop
          *   20220826: 좌우 분할 목록에 선택값이 있는 경우 해당 요소까지 자동 스크롤 처리
          */
          setScrollBetweenTop: function () {
              if ($('.scroll_between_wrap').length > 0) {
                  $(".scroll_between_wrap ul.list").each(function () {
                      var selectedElem = $(this).find('.sel');
                      // 20220831: 스크롤 위치 보정
                      var scrollTo = $(this).scrollTop() + selectedElem.position().top;
                      if (selectedElem.length === 1) {
                          // 1개 요소만 선택되어 있다면
                          $(this).animate({ scrollTop: scrollTo }, 300);
                      }
                  });
              }
          }
          // setScrollBetweenTop -->
      };

      var uiSwiper = {
          base: function (tar, changeEvt) {
              $(tar).each(function () {
                  const $this = $(this);
                  const $swiper = $this.find('.swiper');
                  const $pagination = $this.find('.swiper-pagination');

                  // 2022-08-19 커스텀 이벤트 상속
                  let $events = {};
                  if ($this.data('events')) {
                      var funcName = $this.data('events');
                      try {
                          $events = eval(`${funcName}();`);
                      } catch (e) {
                          // console.log("", funcName, " 함수를 찾을 수 없습니다.");
                          $events = {};
                      }
                  }
                  // console.log("custom events -->", $events);

                  let $paginationType = 'bullets';
                  if ($this.hasClass('_fraction')) $paginationType = 'fraction';

                  let $navigation = false;
                  if ($this.hasClass('_nav')) {
                      let $btnHtml = '';
                      $btnHtml += '<button type="button" aria-label="이전 슬라이드" class="swiper-button-prev swiper-button"><span class="hidden">이전 슬라이드</span></button>';
                      $btnHtml += '<button type="button" aria-label="다음 슬라이드" class="swiper-button-next swiper-button"><span class="hidden">다음 슬라이드</span></button>';
                      $swiper.append($btnHtml);
                      $navigation = {
                          prevEl: $this.find('.swiper-button-prev')[0],
                          nextEl: $this.find('.swiper-button-next')[0]
                      };
                  }

                  let $slidesPerView = 'auto';
                  if ($this.data('view') !== undefined) {
                      $slidesPerView = $this.data('view');
                      $this.removeAttr('data-view');
                  }

                  let $spaceBetween = 0;
                  if ($this.data('space') !== undefined) {
                      $spaceBetween = $this.data('space');
                      $this.removeAttr('data-space');
                  }

                  let $loop = $this.hasClass('_loop') ? true : false;
                  let $autoHeight = $this.hasClass('_autoHeight') ? true : false;
                  let $centeredSlides = $this.hasClass('_center') ? true : false;

                  let $auto = false;

                  if ($this.data('auto') !== undefined) {
                      $auto = {
                          delay: $this.data('auto'),
                          disableOnInteraction: false
                      };
                      $this.removeAttr('data-auto');
                      if (!$this.find('.swiper-auto-ctl').length) {
                          if (!$this.find('.swiper-pagination-wrap').length) $pagination.wrap('<div class="swiper-pagination-wrap"></div>');
                          $pagination.after('<button type="button" class="swiper-auto-ctl" aria-label="슬라이드 자동롤링 중지"></button>');
                      }
                  }
                  let $parallax = false;
                  if (
                      $this.find('[data-swiper-parallax]').length ||
                      $this.find('[data-swiper-parallax-x]').length ||
                      $this.find('[data-swiper-parallax-y]').length ||
                      $this.find('[data-swiper-parallax-scale]').length ||
                      $this.find('[data-swiper-parallax-opacity]').length
                  ) {
                      $parallax = true;
                  }

                  // 2022-08-19: 슬라이드 오프셋 추가
                  let $slidesOffset = $this.data('offset') ? $this.data('offset') : 0;
                  $this.removeAttr('data-offset');

                  let baseSwiper;
                  let newGuideTime;
                  if($this.find('.swiper-slide').length == 1 && $this.hasClass('img_banner')) {
                      $this.addClass('no_swiper');
                  } else if($swiper.hasClass('swiper-initialized')) {
                      baseSwiper = $this.data('swiper');
                      if (baseSwiper !== undefined) baseSwiper.update();
                  } else {
                      let _title = $this.data('title');
                      baseSwiper = new Swiper($swiper[0], {
                          pagination: {
                              el: '.swiper-pagination',
                              type: $paginationType,
                              clickable: true,
                              renderBullet: function (index, className) {
                                  return '<button type="button" class="' + className + '"><span class="hidden">' + ((_title !== undefined) ? _title + ' ' : '') + (index + 1) + '번째 슬라이드</span></button>';
                              }
                          },
                          navigation: $navigation,
                          slidesPerView: $slidesPerView,
                          spaceBetween: $spaceBetween,
                          // 2022-08-19: 슬라이드 오프셋 추가
                          slidesOffsetBefore: $slidesOffset,
                          slidesOffsetAfter: $slidesOffset,
                          loop: $loop,
                          autoHeight: $autoHeight,
                          centeredSlides: $centeredSlides,
                          autoplay: $auto,
                          parallax: $parallax,
                          noSwipingClass: 'no_swiping',
                          on: {
                              slideChangeTransitionEnd: function (e) {
                                  // [S] main 계좌 스와이퍼 개발 callback 추가
                                  this.$el.find('.swiper-slide').each(function () {
                                      var _this = $(this);
                                      if (_this.parents().hasClass('main_account_section') && _this.is('.swiper-slide-active')) {
                                          if (window.SPA_COMMON) {
                                              window.SPA_COMMON.callbackWithSPA('onMainSwiperChange', _this);                                                
                                          }
                                      }
                                      if (_this.closest('.m_kb_youtube').length) {
                                          if (window.SPA_COMMON) {
                                              window.SPA_COMMON.callbackWithSPA('onMainSub2SwiperChange', _this);
                                          }
                                      }
                                  });
                                  // [E] main 계좌 스와이퍼 개발 callback 추가

                                  // 접근성 로직
                                  $(e.slides).attr({'tabindex':'-1', 'aria-hidden':'true'}).filter('.swiper-slide-active').removeAttr('tabindex aria-hidden');
                                  this.$el.find('.swiper-pagination-bullet').removeAttr('title');
                                  this.$el.find('.swiper-pagination-bullet').eq(e.realIndex).attr('title','선택됨');

                                  if (!!changeEvt) changeEvt(e);
                              },
                              afterInit : function(e){
                                  // 접근성 로직
                                  $(e.slides).removeAttr('aria-label').not('.swiper-slide-active').attr({'tabindex':'-1', 'aria-hidden':'true'});
                                  this.$el.find('.swiper-pagination-bullet').eq(e.realIndex).attr('title','선택됨');
                              },
                              ...$events
                          }
                      });
                      $this.data('swiper', baseSwiper);

                      //2202-08-24 추가
                      if ($(baseSwiper.wrapperEl).filter("[data-bubble='false']").length) {
                          $this.on('touchstart', function (e) {
                              UICommon.tabMenu.tabSwipeArray[0].allowTouchMove = false;
                              baseSwiper.allowTouchMove = true;
                          });
                      }
                  }
              });
          },
          ready: function (tar) {
              const $target = $(tar);
              $target.each(function () {
                  const $this = $(this);
                  if (!$this.find('.swiper-slide').length) {
                      let $children = $this.children();
                      while ($children.hasClass('swiper') || $children.hasClass('swiper-wrapper')) {
                          $children = $children.children();
                      }
                      $children.addClass('swiper-slide');
                  }

                  if (!$this.find('.swiper-wrapper').length) {
                      if (!$this.find('.swiper').length) {
                          $this.wrapInner('<div class="swiper-wrapper"></div>');
                          $this.wrapInner('<div class="swiper"></div>');
                      } else {
                          $this.find('.swiper').wrapInner('<div class="swiper-wrapper"></div>');
                      }
                  } else if (!$this.find('.swiper').length) {
                      $this.find('.swiper-wrapper').parent().wrapInner('<div class="swiper"></div>');
                  }
                  if (!$this.find('.swiper-pagination').length) {
                      $this.append('<div class="swiper-pagination"></div>');
                  }
              });
          },
          UI: function () {
              $(document).off('click', '.ui_swiper .swiper-auto-ctl').on('click', '.ui_swiper .swiper-auto-ctl', function (e) {
                  e.preventDefault();
                  const $this = $(this);
                  const $closest = $this.closest('.ui_swiper');
                  const $swiper = $closest.data('swiper');
                  if ($(this).hasClass('play')) {
                      $swiper.autoplay.start();
                      $(this).removeClass('play').changeAriaLabel('시작', '중지');
                  } else {
                      $swiper.autoplay.stop();
                      $(this).addClass('play').changeAriaLabel('중지', '시작');
                  }
              });
          },
          update: function (target) {
              $(target).each(function () {
                  const $this = $(this);
                  const $swiper = $this.data('swiper');
                  if ($swiper !== undefined) $swiper.update();
              });
          },
          destroy: function (target) {
              $(target).each(function () {
                  const $this = $(this);
                  const $swiper = $this.data('swiper');
                  if ($swiper !== undefined) $swiper.destroy();
              });
          },
          init: function (target) {
              if (target !== undefined) {
                  uiSwiper.ready(target);
                  uiSwiper.base(target);
                  uiSwiper.UI();
              } else if ($('.ui_swiper').length) {
                  uiSwiper.ready('.ui_swiper');
                  uiSwiper.base('.ui_swiper');
                  uiSwiper.UI();
              }
          }
      };

      var uiEffect = {
          button: function () {
              var btnList = 'a.btn:not(.btn_link), button.btn:not(.btn_link)';
              $(document).on('click', btnList, function (e) {
                  var $btnEl = $(this),
                      $delay = 650;

                  if (!$btnEl.is('.disabled')) {
                      if (!$btnEl.find('.btn_click_in').length) $btnEl.append('<em class="btn_click_in"></em>');
                      var $btnIn = $btnEl.find('.btn_click_in'),
                          $btnMax = Math.max($btnEl.outerWidth(), $btnEl.outerHeight()),
                          $btnX = e.pageX - $btnEl.offset().left - $btnMax / 2,
                          $btnY = e.pageY - $btnEl.offset().top - $btnMax / 2;
                      $btnIn.css({
                          'left': $btnX,
                          'top': $btnY,
                          'width': $btnMax,
                          'height': $btnMax
                      }).addClass('animate').delay($delay).queue(function (next) {
                          $btnIn.remove();
                          next();
                      });
                  }
              });
          },
          init: function (target) {
              uiEffect.button();
          }
      };

      //body scroll lock
      var Body = {
          scrollTop: '',
          lock: function () {
              if (!$('html').hasClass('lock')) {
                  Body.scrollTop = window.pageYOffset;
                  const $wrap = $('#wrap');
                  const $wrapTop = $('#wrap').length ? $wrap.offset().top : 0;
                  const $setTop = Body.scrollTop * -1 + $wrapTop;
                  $wrap.css('top', $setTop);
                  $('html').addClass('lock');
              }
          },
          unlock: function () {
              if ($('html').hasClass('lock')) {
                  $('html').removeClass('lock');
                  $('#wrap').removeAttr('style');
                  window.scrollTo(0, Body.scrollTop);
                  window.setTimeout(function () {
                      Body.scrollTop = '';
                  }, 0);
              }
          }
      };

      // [전담반 Biz-069] : return scroll position 2022-04-12
      function getScrollpos() {
          var top = $(window).scrollTop();
          return top;
      }

      $.fn.changeTxt = function (beforeTxt, afterTxt) {
          return this.each(function () {
              const element = $(this);
              const $html = element.html();
              if ($html != undefined && $html != '') {
                  element.html($html.split(beforeTxt).join(afterTxt));
              }
          });
      };

      $.fn.changeAriaLabel = function (beforeTxt, afterTxt) {
          return this.each(function () {
              const element = $(this);
              const $ariaLabel = element.attr('aria-label');
              if ($ariaLabel != undefined) {
                  const $ariaLabel2 = $ariaLabel.split(beforeTxt).join(afterTxt);
                  element.attr('aria-label', $ariaLabel2);
              }
          });
      };

      $.fn.hasScroll = function() {
          return (this.prop('scrollHeight') == 0 && this.prop('clientHeight') == 0) || (this.prop('scrollHeight') > this.prop('clientHeight'));
      }

      //숫자만
      var onlyNumber = function(num){
          return num.toString().replace(/[^0-9]/g,'');
      };

      //콤마넣기
      var addComma = function(num){
          return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');
      };

      //콤마빼기
      var removeComma = function(num){
          return num.toString().replace(/,/gi,'');
      };

      

      
      return {
          init,
          $targetPage,
          isScreenIn,
          onlyNumber,
          orderList,
          orderDragBtn,
          accordionButton,
          tabMenu,
          updateProgressBar,
          progressDiv,
          countNumber,
          tooltipButton,
          toggleButton,
          selectItem,
          staffHopeSelect,
          transferMoney,
          dDay,
          _front,
          uiMain,
          Morphing,
          anckorScroll,
          scTop,
          Layer,
          uiSwiper,
          uiEffect,
          getScrollpos
      }

  }

  window.UICommon = new UICommon();

  $(window).on('load', function () {
      if (!window.SPA) window.UICommon.init();
      if (!window.SPA) (localStorage.lightMode == "dark") ? $('html').addClass('dark') : $('html').removeClass('dark');

      //lottie animation image (비노출 : off 추가)
      if ($(document).find('.loading').length) {
          var loading = lottie.loadAnimation({
              container: document.getElementById('loadingAni'),
              renderer: 'svg',
              loop: true,
              autoplay: true,
              path: '/msbiz/app/js/json/loadingAni.json'
          });
      }
  });
}