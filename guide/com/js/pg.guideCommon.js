/* GUIDE HEADER */
var $headerHtml = ''
$headerHtml += '<h1><span class="hide">PUBLISHING WorkSheet</span></h1>';
$headerHtml += '<button type="button" class="btn_util"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="65px" height="50px" viewBox="0 0 65 65" xml:space="preserve"><path class="bar b1" d="M20,23.912h23.997c0,0,16.004-0.501,16.004,13.416 S46.75,47.912,41.834,42.995S22.668,23.412,22.668,23.412"/><path class="bar b2" d="M24.751,41.995H44c0,0,16.001,1.167,16.001-12.25 c0-13.417-9.508-15.157-18.004-6.745S22.001,42.995,22.001,42.995"/><line class="bar b3" x1="30.125" y1="32.999" x2="43.997" y2="32.999"/></svg><span class="hide">메뉴열기</span></span></button>';
$headerHtml += '<div class="pg_util">';
$headerHtml += '  <div class="switch">';
$headerHtml += '    <span class="bar"></span>';
$headerHtml += '    <ul>';
$headerHtml += '      <li><a href="./workSheet.html" target="_blank">Worksheet</a></li>';
$headerHtml += '      <li><a href="./component.html" target="_blank">Component</a></li>';
$headerHtml += '      <li><a href="./document.html" target="_blank">Document</a></li>';
$headerHtml += '    </ul>';
$headerHtml += '  </div>';
$headerHtml += '</div>';

$(function () {
  if (localStorage.lightMode == "dark") $('html').attr("light-mode", "dark");
  guide.header();  
  makeBoard();

  $(window).resize();
});
var makeBoard = function () {  
  var $slide = $('.pg_board_tab .swiper-slide');
  var $lenth = $slide.length;
  var htmlBoard = function (data) {
    var html = '<div id="pg-container" class="pg-contentWrap">';
    html += ' <ul class="component-lst">';
    html += data;
    html += ' </ul>';
    html += '</div>';
    $('.pg_content').append(html);
  };
  
  var htmlUl = function (data) {
    var $data = data;
    var ulHtml = '';
    var urlLink = '';
    var createLi = function (obj) {
      var liHtml = '';
      if (obj.directory !== undefined && obj.directory !== '') {
        urlLink = obj.directory;
      } else {
        liHtml += '<li id="' + obj.id + '" class="component-wrap">';
        liHtml += '    <div class="split col2">';
        liHtml += '        <h2 class="cp-tit dep02">' + obj.name + '</h2>';
        liHtml += '        <div class="value r btnWrap">';
        liHtml += '            <a href="' + urlLink + '/' + obj.id + '.html" class="btn btn-line  ico-gopage" target="_blank">';
        liHtml += '                새창열기';
        liHtml += '            </a>';
        liHtml += '        </div>';
        liHtml += '    </div>';        
        liHtml += '        <div class="tblWrap">';
        liHtml += '            <table class="tbl">';
        liHtml += '                <caption>' + obj.name + ' component info</caption>';
        liHtml += '                <colgroup>';
        liHtml += '                    <col style="width:30%">';
        liHtml += '                    <col style="width:*">';
        liHtml += '                </colgroup>';
        liHtml += '                <tbody>';
        liHtml += '                    <tr>';
        liHtml += '                        <th scope="row">PATH</th>';
        liHtml += '                        <td>' + urlLink + '/' + obj.id + '.html</td>';
        liHtml += '                    </tr>';
        liHtml += '                </tbody>';
        liHtml += '            </table>';
        liHtml += '        </div>';
        liHtml += '        <iframe src="' + urlLink + '/' + obj.id + '.html" frameborder="0" scrolling=""></iframe>';
        liHtml += '    </li>';
      }
      return liHtml;
    };
    $.each($data, function () {
      ulHtml += createLi(this);
    });
    return ulHtml;
  };
  var LoadCount = 0;
  var $body = $("body");
  var $json = $body.data('json');
  var $dataHtml = '';

  jQuery.ajax({
    type: 'GET',
    url: $json,
    dataType: 'JSON',
    success: function (data) {
      if (data.length) $dataHtml = htmlUl(data);
    },
    complete: function (data) {
      
      htmlBoard($dataHtml);

      if (LoadCount === $lenth) {
        setTimeout(function () {
          guide.init();
          setTimeout(function () {
            $(window).resize();
          }, 100);
        }, 100);
      }
    },
    error: function (xhr, status, error) {
      // console.error('에러발생', xhr, status, error);
    }
  });

  $slide.each(function (i) {
    LoadCount += 1;    
  });
};

var tabSwiper = '';
var targetSwiper = [];
var guide = {
  header: function (title) {
    var $pathname = location.pathname;
    var $urlName = $pathname.split('/').pop();
    if ($('#pgHeader').length) $('#pgHeader').html($headerHtml);
    $('.pg_nav a').each(function () {
      var $this = $(this);
      var $href = $this.attr('href').split('/').pop();
      if ($urlName == $href) $(this).parents('li').addClass('active');
    });
    if ($('.pg_content>h2').length && $('.pg_content>h2').text() != '') {
      var $title = document.title;
      document.title = $('.pg_content>h2').text() + ' | ' + $title;
    }
    $('.btn_util').on('click', function () {
      $('html').toggleClass('util_show');
    });
  },
  switchSet: function (e) {
    var $util = $('body').attr('data-util');
    
    $('.switch li').each(function () {
      var $this = $(this);
      if ($util.charAt(0).toUpperCase() + $util.slice(1) === $this.text()) $this.addClass('active');
    });
    $(window).resize(function () {
      var $active = (e !== undefined) ? e : $('.switch').find('li.active'),
        $li = $active.closest('ul').find('li'),
        $bar = $active.closest('.switch').find('.bar'),
        _w = $active.closest('ul').width(),
        _x = $active.closest('li').position().left;
      $bar.css({ 'width': _w / $li.length - 2, 'left': _x, 'opacity': 1, 'transform': 'scale(1)' });
    });
    $(window).resize();
  },
  switch: function () {
    if ($('.switch').length) {
      $('.switch>ul>li>a').on('mouseover focusin', function (e) {
        var $this = $(this);
        guide.switchSet($this);
      }).on('mouseout focusout', function (e) {
        guide.switchSet();
      });
    }
  },
  tab: function () {
    var $tab = $('.pg_board_tab ul li');
    var $tabCurrent = $('.pg_board_tab ul li.active');
    $tab.on('click', function () {
      var $this = $(this);
      $this.addClass('active').siblings('li').removeClass('active');
      
    });
    $tab.eq(0).addClass('active');
  },
  UI: function () {
    var $document = $(document),
      $currentName = $('nav a[href^="' + location.pathname.split("/")[5] + '"]'),
      $currentTile = $currentName.text();
    $currentName.closest('li').addClass('active').parents('li').addClass('active'); // 현재 메뉴 활성화
    if (!$('.btm_btn_set').length) $('body').append('<div class="btm_btn_set"><button type="button" class="btn_guide_top"><span class="hide">TOP</span></button><button type="button" class="btn_light_mode"><i></i><i></i><i></i><i></i><span class="hide">다크모드</span></button></div>');
  },
  slide: function () {
    var $tab = $('.pg_board_tab');
    if ($tab.length > 0) {
      tabSwiper = new Swiper('.pg_board_tab', {
        slidesPerView: 'auto',
        freeMode: true
      });
      $('.pg_board_tab .swiper-slide').on('click', function (e) {
        var $this = $(this);
        var gnbWidth = $tab.width();
        var offset = $this.width() + $this.offset().left + $this.width();
        var myIndex = $this.index();
        (gnbWidth < offset) ? tabSwiper.slideNext() : tabSwiper.slideTo(myIndex - 1);
      });
    }
  },
  scroll: function () {
    $(window).scroll(function () {
      guide.btnSet();
      guide.headFixed();      
    });
    $(window).scroll();
  },
  btnSet: function () {
    var $window = $(window), $btmBtnSet = $('.btm_btn_set'), $btnTop = $('.btn_guide_top'), $btnLightMode = $('.btn_light_mode');
    ($(window).scrollTop() > 100) ? $btmBtnSet.addClass('active') : $btmBtnSet.removeClass('active');
    $btnTop.on('click', function () {
      $tabLiOn = $('.pg_board_tab .swiper-slide');
      $(window).scrollTop(0);
      $tabLiOn.removeClass('active').eq(0).addClass('active');
    });
    $btnLightMode.off('click').on('click', function () {
      guide.toggle_light_mode();
    });
  },
  headFixed: function () {
    var $window = $(window), $wrap = $('#pgWrap'), $gHeader = $('#pgHeader'), $gTitle = $('.pg_titles');
    ($(window).scrollTop() > $gTitle.height() && $(window).width() > 1024) ? $wrap.addClass('fixed') : $wrap.removeClass('fixed');
  },
  toggle_light_mode: function () {
    var app = $('html');
    if (localStorage.lightMode == "dark") {
      localStorage.lightMode = "light";
      app.attr("light-mode", "light");
      $(".component-wrap > iframe").contents().find("html").attr("light-mode", "light");
    } else {
      localStorage.lightMode = "dark";
      app.attr("light-mode", "dark");
      $(".component-wrap > iframe").contents().find("html").attr("light-mode", "dark");
    }
  },
  init: function () {
    guide.UI();
    guide.slide();
    guide.switchSet();
    guide.switch();
    guide.scroll();
    guide.tab();
  }
};