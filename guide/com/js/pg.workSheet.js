/* GUIDE HEADER */
var $headerHtml = ''
$headerHtml += '<h1><span class="hide">PUBLISHING WorkSheet</span></h1>';
$headerHtml += '<button type="button" class="btn_util"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="65px" height="50px" viewBox="0 0 65 65" xml:space="preserve"><path class="bar b1" d="M20,23.912h23.997c0,0,16.004-0.501,16.004,13.416 S46.75,47.912,41.834,42.995S22.668,23.412,22.668,23.412"/><path class="bar b2" d="M24.751,41.995H44c0,0,16.001,1.167,16.001-12.25 c0-13.417-9.508-15.157-18.004-6.745S22.001,42.995,22.001,42.995"/><line class="bar b3" x1="30.125" y1="32.999" x2="43.997" y2="32.999"/></svg><span class="hide">메뉴열기</span></span></button>';
$headerHtml += '<div class="pg_util">';
$headerHtml += '<div class="pg_search">';
$headerHtml += '<input type="text" id="pgSearchINP" placeholder="검색어를 입력하세요" />';
$headerHtml += '<button type="button" id="btnPgSearch"><span class="hide">검색하기</span></button>';
$headerHtml += '</div>';
$headerHtml += '<div class="switch">';
$headerHtml += '<span class="bar"></span>';
$headerHtml += '<ul>';
$headerHtml += '  <li><a href="./workSheet.html" target="_blank">Worksheet</a></li>';
$headerHtml += '  <li><a href="./component.html" target="_blank">Component</a></li>';
$headerHtml += '  <li><a href="./document.html" target="_blank">Document</a></li>';
$headerHtml += '</ul>';
$headerHtml += '</div>';
// $headerHtml += '<div class="pg_project">';
// $headerHtml += '<button type="button" class="current" title="프로젝트 목록보기">선택</button>';
// $headerHtml += '<ul class="pg_list">';
// $headerHtml += '  <li><a href="./workSheet.html" target="_blank">Worksheet</a></li>';
// $headerHtml += '  <li><a href="./component.html" target="_blank">Component</a></li>';
// $headerHtml += '  <li><a href="./document.html" target="_blank">Document</a></li>';
// $headerHtml += '</ul>';
// $headerHtml += '</div>';
$headerHtml += '<button type="button" class="btn_responsive"><i><i><i class="hide">모바일 미리보기</i></i></i></button>';
$headerHtml += '</div>';

$(function () {
  if (localStorage.lightMode == "dark") $('html').attr("light-mode", "dark");
  guide.header();  
  makeBoard();
  
  $(window).resize();
});
var makeBoard = function () {  
  var $slide = $('.pg_board_tab .swiper-slide')
  var $lenth = $slide.length;
  var htmlBoard = function (boardid, data) {
    var html = '<div id="' + boardid + '" class="pg_board_panel">';
    html += '<div class="panel_head">';
    html += '<div class="pg_target">';
    html += '<ul class="swiper-wrapper">';
    html += '</ul>';
    html += '</div>';
    html += '<span class="pg_status">';
    html += '<span class="num total">본수 : <strong class="num"></strong></span>';
    html += '<span class="num working">진행본수 : <strong class="num"></strong></span>';
    html += '<span class="num cp_num">완료본수 : <strong class="num"></strong></span>';
    html += '<span class="pg_status_box"> <span class="bar"></span><span class="ing">진행률 : <strong class="num"></strong>%</span></span>';
    html += '</span>';
    html += '</div>';
    html += '<div class="pg_alert_btn_set">';
    html += '</div>';
    html += '<div class="pg_board">';
    html += '<table>';
    html += '<caption>메뉴별 코딩리스트</caption>';
    html += '<colgroup>';
    html += '<col style="width:40px">';
    html += '<col style="width:150px">';
    html += '<col style="width:90px">';
    html += '<col class="d1" style="width:auto">';
    html += '<col class="d2" style="width:auto">';
    html += '<col class="d3" style="width:auto">';
    html += '<col class="d4" style="width:auto">';
    html += '<col style="width:250px">';
    html += '<col style="width:90px">';
    html += '<col style="width:90px">';
    html += '<col style="width:90px">';
    html += '<col style="width:90px">';
    html += '<col style="width:80px">';
    html += '<col style="width:100px">';
    html += '</colgroup>';
    html += '<thead>';
    html += '<tr>';
    html += '<th scope="col">No</th>';
    html += '<th scope="col" class="id">화면id</th>';
    html += '<th scope="col" class="type">화면타입</th>';
    html += '<th scope="col" class="deps d1">1Depth<button type="button" rel="d1"><span class="hide">숨기기</span></button></th>';
    html += '<th scope="col" class="deps d2">2Depth<button type="button" rel="d2"><span class="hide">숨기기</span></button></th>';
    html += '<th scope="col" class="deps d3">3Depth<button type="button" rel="d3"><span class="hide">숨기기</span></button></th>';
    html += '<th scope="col" class="deps d4">4Depth<button type="button" rel="d4"><span class="hide">숨기기</span></button></th>';
    html += '<th scope="col" class="name">화면명</th>';
    html += '<th scope="col" class="worker">작업자</th>';
    // html += '<select>';
    // html += '<option value="">작업자</option>';
    // html += '</select>';
    // html += '</th>';
    // html += '<th scope="col" class="w_date">WBS</th>';
    html += '<th scope="col" class="w_date">';
    html += '<select>';
    html += '<option value="">WBS</option>';
    html += '</select>';
    html += '</th>';
    // html += '<th scope="col" class="c_date">작업일</th>';
    html += '<th scope="col" class="c_date">';
    html += '<select>';
    html += '<option value="">작업일</option>';
    html += '</select>';
    html += '</th>';
    html += '<th scope="col" class="m_date">수정일</th>';
    // html += '<th scope="col" class="complete">상태</th>';
    html += '<th scope="col" class="complete">';
    html += '<select>';
    html += '<option value="">상태</option>';
    html += '</select>';
    html += '</th>';
    html += '<th scope="col" class="etc">비고</th>';
    html += '</tr>';
    html += '</thead>';
    html += '<tbody>';
    html += data;
    html += '</tbody>';
    html += '</table>';
    html += '</div>';
    html += '</div>';
    $('.pg_content').append(html);
  };
  // console.log(htmlBoard);
  var htmlTbody = function (data) {
    var $data = data;
    var tbodyHtml = '';
    var idx = 1;
    var urlLink = '../../v2/html';
    var createTr = function (obj) {
      var trHtml = '';
      if (obj.directory !== undefined && obj.directory !== '') {
        urlLink = obj.directory;
      } else {
        (obj.state) ? trHtml += '<tr class="' + obj.state + '">' : trHtml += '<tr>';
        trHtml += '<td class="no">' + idx + '</td>';
        idx += 1;
        if (obj.id) {
          // trHtml += '<td class="id">' + obj.id + '</td>';
          if (obj.link) {
            trHtml += '<td class="id">' + obj.id + '</td>';
          } else {
            trHtml += '<td class="id"><a href="' + urlLink + '/' +obj.path+ '/' + obj.id + '.html" target="_blank">' + obj.id + '</a></td>';
          }
        } else {
          trHtml += '<td class="id"></td>';
        }
        if (obj.type) {
          trHtml += '<td class="type"><span>' + obj.type + '</span></td>';
        } else {
          trHtml += '<td class="type"><span>페이지</span></td>';
        }
        if (obj.depth1) {
          trHtml += '<td class="depth1">' + obj.depth1 + '</td>';
        } else {
          trHtml += '<td class="depth1"></td>';
        }
        if (obj.depth2) {
          trHtml += '<td class="depth2">' + obj.depth2 + '</td>';
        } else {
          trHtml += '<td class="depth2"></td>';
        }
        if (obj.depth3) {
          trHtml += '<td class="depth3">' + obj.depth3 + '</td>';
        } else {
          trHtml += '<td class="depth3"></td>';
        }
        if (obj.depth4) {
          trHtml += '<td class="depth4">' + obj.depth4 + '</td>';
        } else {
          trHtml += '<td class="depth4"></td>';
        }
        if (obj.name) {
          if (obj.link) {
            trHtml += '<td class="name">' + obj.id + '</td>';
          } else {
            if(obj.path === undefined || obj.path === ''){
              trHtml += '<td class="name"><a href="' + urlLink + '/' + obj.id + '.html" target="_blank">' + obj.name + '</a></td>';
            } else {
              trHtml += '<td class="name"><a href="' + urlLink + '/' + obj.path + '/' + obj.id + '.html" target="_blank">' + obj.name + '</a></td>';
            }            
          }
          //trHtml += '<td class="name">' + obj.name + '</td>';
        } else {
          trHtml += '<td class="name"></td>';
        }
        if (obj.worker) {
          trHtml += '<td class="worker">' + obj.worker + '</td>';
        } else {
          trHtml += '<td class="worker"></td>';
        }
        if (obj.schedule) {
          trHtml += '<td class="w_date"><span class="schedule schedule_s">' + obj.schedule[0].schedule_s + '</span><span class="schedule schedule_e">' + obj.schedule[0].schedule_e +'</span></td>'
        } else {
          trHtml += '<td class="w_date"></td>';
        }
        if (obj.workdate) {
          trHtml += '<td class="c_date">' + obj.workdate + '</td>';
        } else {
          trHtml += '<td class="c_date"></td>';
        }
        if (obj.change) {
          trHtml += '<td class="m_date">' + obj.change + '</td>';
        } else {
          trHtml += '<td class="m_date"></td>';
        }
        // if (obj.complete && obj.state == undefined) {
        if (obj.state == 'msg') {
          trHtml += '<td class="complete"><span class="msg">' + obj.complete + '</span></td>';
        } else if (obj.state === 'done') {
          trHtml += '<td class="complete"><span class="done">완료</span></td>';
        } else if (obj.state === 'del') {
          trHtml += '<td class="complete"><span class="del">삭제</span></td>';
        } else if (obj.state === 'hold') {
          trHtml += '<td class="complete"><span class="hold">보류</span></td>';
        } else if (obj.workdate) {
          trHtml += '<td class="complete"><span class="ing">작업중</span></td>';
        }else if (obj.schedule) {
          trHtml += '<td class="complete"><span class="ready">대기중</span></td>';
        }  else {
          trHtml += '<td class="complete"><span></span></td>';
        }
        if (obj.etc) {
          var remark = '';
          $.each(obj.etc, function () {
            if (this.indexOf('디자인확인') != -1) {
              remark += '<li class="design">' + this + '</li>';
            } else if (this.indexOf('기획확인') != -1) {
              remark += '<li class="plan">' + this + '</li>';
            } else if (this.indexOf('이슈') != -1) {
              remark += '<li class="issue">' + this + '</li>';
            } else if (this.indexOf('지연') != -1) {
              remark += '<li class="schedule">' + this + '</li>';
            } else if (this.indexOf('접근성') != -1) {
              remark += '<li class="wah">' + this + '</li>';
            } else if (this.indexOf('기타') != -1) {
              remark += '<li class="etc">' + this + '</li>';
            } else {
              remark += '<li>' + this + '</li>';
            }
          });
          trHtml += '<td class="etc"><ul class="remark">' + remark + '</ul>';
          // trHtml += '<td class="etc"><ul class="remark">' + remark + '</ul><a href="' + urlLink + '/' + obj.id + '.html" class="btn_hover" target="_blank">' + obj.id + '</a></td>';
        } else {
          // trHtml += '<td class="etc"><a href="' + urlLink + '/' + obj.id + '.html" class="btn_hover" target="_blank">' + obj.id + '</a></td>';
          trHtml += '<td class="etc"></td>';
        }
      }

      trHtml += '</tr>';
      return trHtml;
    };
    $.each($data, function () {
      tbodyHtml += createTr(this);
    });
    return tbodyHtml;
  };
  var LoadCount = 0;
  $slide.each(function (i) {
    var $this = $(this);
    var $rel = 'panel' + i;
    $this.attr('rel', $rel);
    var $json = $this.find('button').data('json');
    var $dataHtml = '';

    if ($json !== undefined) {
      jQuery.ajax({
        type: 'GET',
        url: $json,
        dataType: 'JSON',
        success: function (data) {
          if (data.length) $dataHtml = htmlTbody(data);
        },
        complete: function (data) {
          LoadCount += 1;
          htmlBoard($rel, $dataHtml);

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
          console.error($rel, '에러발생', xhr, status, error);
        }
      });
    }
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
      if ($('html').hasClass('util_show')) {
        $('#pgSearchINP').keydown(function (e) {
          if (e.keyCode == 13) $('html').removeClass('util_show');
        });
        $('#btnPgSearch').on('click', function () {
          $('html').removeClass('util_show');
        });
      };
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
    var $panel = $('.pg_board_panel');
    $('#' + $tabCurrent.attr('rel')).addClass('active');
    $tab.on('click', function (e) {
      e.preventDefault();
      var $this = $(this);
      var panelid = $this.attr('rel');
      var $scrollTop = $(window).scrollTop();
      $this.addClass('active').siblings('li').removeClass('active');
      $('#' + panelid).addClass('active').siblings('.pg_board_panel').removeClass('active');
      $(window).scrollTop($scrollTop);
      $.each(targetSwiper, function (i, item) {
        item.update();
      });
    });
    $tab.eq(0).addClass('active');
    $('#' + $tab.eq(0).attr('rel')).addClass('active');
  },
  board: function () {
    $('.pg_board td.id').each(function () {
      var _a = $(this).find('a');
      var _href = _a.attr('href');
      var _txt = _a.text();

      if (!!_href && _href.indexOf('#') !== 0) {
        if (_href.indexOf(_txt) == -1 && _href.indexOf('.html') == -1) {
          var _setHref = _href + _txt;
          var _file = location.pathname.split('.').pop();
          if (_file) _setHref = _setHref + '.' + _file;
          _a.attr('href', _setHref);
        }
      } else {
        //console.log(_txt);
      }
    });
    $('.pg_board').each(function () {
      var _this = $(this);
      var dayArry = [];
      var dayArry1 = [];
      var dayArry2 = [];
      var dayArry3 = [];
      var dayArry4 = [];
      
      $(this)
        .find('tbody td.c_date')
        .each(function () {
          var _txt = $(this).text();
          if (!!_txt) {
            var _txt2 = parseInt(_txt.split('-').join(''));
            var _class = 'c_' + _txt2;
            $(this).closest('tr').addClass(_class);
            if (dayArry.indexOf(_txt2) == -1) {
              dayArry.push(_txt2);
            }
          }
        });
      dayArry.sort(function (a, b) {
        return a - b;
      });

      $(this)
        .find('tbody td.w_date')
        .each(function () {
          var _txtW = $(this).find(".schedule_s").text();
          if (!!_txtW) {
            var _txtW1 = parseInt(_txtW.split('-').join(''));
            var _classW = 'w_' + _txtW1;
            $(this).closest('tr').addClass(_classW);
            if (dayArry1.indexOf(_txtW1) == -1) {
              dayArry1.push(_txtW1);
            }
          }
        });
      dayArry1.sort(function (a, b) {
        return a - b;
      });

      $(this)
        .find('tbody td.m_date')
        .each(function () {
          var _txt3 = $(this).text();
          // console.log(_txt3);
          if (!!_txt3) {
            var _txt4 = parseInt(_txt3.split('-').join(''));
            var _class2 = 'm_' + _txt4;
            $(this).closest('tr').addClass(_class2);
            if (dayArry2.indexOf(_txt4) == -1) {
              dayArry2.push(_txt4);
            }
          }
        });
      dayArry2.sort(function (a, b) {
        return a - b;
      });

      $(this)
        .find('tbody td.worker')
        .each(function () {
          var _txt5 = $(this).text();
          if (!!_txt5) {
            var _class3 = _txt5;
            switch (_class3) {
              case 'PUB1':
            $wVal = 'tba1'
            break;
          case 'PUB2':
            $wVal = 'tba2'
            break;
            }
            $(this).closest('tr').addClass(_class3);
            if (dayArry3.indexOf(_txt5) == -1) {
              dayArry3.push(_txt5);
            }
          }
        });
      dayArry3.sort(function (a, b) {
        return a - b;
      });

      $(this)
        .find('tbody td.complete')
        .each(function () {
          var _txt6 = $(this).text();
          if (!!_txt6) {
            var _class4 = _txt6;
            // switch (_class4) {
            //   case 'STATUS1':
            // $doneVal = 'STATUS1'
            // break;
            // case 'STATUS2':
            // $doneVal = 'STATUS2'
            // break;
            // }
            $(this).closest('tr').addClass(_class4);
            if (dayArry4.indexOf(_txt6) == -1) {
              dayArry4.push(_txt6);
            }
          }
        });
        dayArry4.sort(function (a, b) {
        return a - b;
      });

      var $select = $(this).find('thead th.c_date select');
      if ($select.length) {
        for (var i in dayArry) {
          var opt = dayArry[i];
          $select.append('<option val="' + opt + '">' + opt + '</option>');
        }
      }
      var $select1 = $(this).find('thead th.w_date select');
      if ($select1.length) {
        for (var j in dayArry1) {
          var optW = dayArry1[j];
          $select1.append('<option val="' + optW + '">' + optW + '</option>');
        }
      }
      var $select2 = $(this).find('thead th.m_date select');
      if ($select2.length) {
        for (var j in dayArry2) {
          var opt2 = dayArry2[j];
          $select2.append('<option val="' + opt2 + '">' + opt2 + '</option>');
        }
      }
      var $select3 = $(this).find('thead th.worker select');
      if ($select3.length) {
        for (var j in dayArry3) {
          var opt3 = dayArry3[j];
          $select3.append('<option val="' + opt3 + '">' + opt3 + '</option>');
        }
      }
      var $select4 = $(this).find('thead th.complete select');
      if ($select4.length) {
        for (var j in dayArry4) {
          var opt4 = dayArry4[j];
          $select4.append('<option val="' + opt4 + '">' + opt4 + '</option>');
        }
      }

      var _isMouseDown = false;
      var _startX = '';
      var _scrollLeft = '';
      var _scrollChkHtml = '<div class="pg_board_scroll"><div></div></div>';
      if (!_this.next('.pg_board_scroll').length) _this.after(_scrollChkHtml);
      _this.on('mousedown', function (e) {
        var _scrollWidth = _this.get(0).scrollWidthl;
        var _thisWidth = _this.width();
        if (_scrollWidth - _thisWidth > 0) {
          _isMouseDown = true;
          _this.addClass('catching');
          _startX = e.pageX - _this.offset().left;
          _scrollLeft = _this.scrollLeft();
        }
      });
      _this.on('mouseup', function (e) {
        _isMouseDown = false;
        _this.removeClass('catching');
      });
      _this.on('mouseeleave', function (e) {
        _isMouseDown = false;
        _this.removeClass('catching');
      });
      _this.on('mousemove', function (e) {
        if (!_isMouseDown) return;
        e.preventDefault();
        var _x = e.pageX - _this.offset().left;
        var _walk = _x - _startX;
        var _scroll = _scrollLeft - _walk;
        _this.scrollLeft(_scroll);
      });

      var catchChk = function () {
        var _sclWid = _this.get(0).scrollWidth - _this.width();
        var _thisLeft = _this.scrollLeft();
        if (_sclWid > 0) {
          _this.addClass('catch');
        } else {
          _this.removeClass('catch');
        }

        return (_thisLeft / _sclWid) * 100;
      };
      catchChk();
      _this.on('scroll resize', function (e) {
        var _tar = _this.next('.pg_board_scroll').find('>div');
        var _per = catchChk();
        _tar.css('width', _per + '%');
      });
    });
    $('.pg_board thead th select').change(function () {
      var $thead = $(this).closest('thead');
      var $cVal = $thead.find('.c_date select').val();
      var $wbsVal = $thead.find('.w_date select').val();
      var $mVal = $thead.find('.m_date select').val();
      var $wVal = $thead.find('.worker select').val();
      var $doneVal = $thead.find('.complete select').val();
      var $tbody = $(this).closest('.pg_board').find('tbody');
     
      if ($wbsVal == '' && $cVal == '' && $mVal == '' && $doneVal == '') {
        $tbody.find('tr').removeAttr('style');
      } else if ($wbsVal != '' && $cVal != '' && $mVal != ''&& $doneVal != '') {
        $tbody.find('tr').not('.hr').hide();
        $tbody.find('.c_' + $cVal + '.m_' + $mVal + $doneVal + '.w_' + $wbsVal).show();
      }  else {
        $tbody.find('tr').not('.hr').hide();
        if ($wbsVal != '') $tbody.find('.w_' + $wbsVal).show();
        if ($cVal != '') $tbody.find('.c_' + $cVal).show();
        if ($mVal != '') $tbody.find('.m_' + $mVal).show();
        // if ($wVal != '') $tbody.find('.' + $wVal).show();
        if ($doneVal != '') $tbody.find('.' + $doneVal).show();
        if ($wbsVal == '' && $cVal == '' && $doneVal == '') $tbody.find('tr').removeAttr('style');
      }
    });
  },
  state: function () {
    $('.pg_content tbody .c_date').each(function () {
      if (!$.trim($(this).html()) == '' || $(this).closest('tbody').find('.done').length) {
        $(this).parent('tr').addClass('working');
      }
    });
    $('.pg_content tbody .m_date').each(function () {
      if (!$.trim($(this).html()) == '' && !$(this).parent('tr').hasClass('del')) {
        $(this).parent('tr').addClass('modify');
      }
    });
    $('.pg_board_panel').each(function () {
      var $this = $(this);
      var $no = $this.find('table .no');
      var pageNum = function () {
        var length = 0;
        $no.each(function () {
          length += 1;
        });
        return length;
      };

      var $noidx = 1;
      $this.find('tbody tr').each(function () {
        if ($(this).hasClass('cms')) {
          $(this).find('.no').text('CMS');
        } else if ($(this).find('.no').length) {
          $(this).find('.no').text($noidx);
          $noidx++;
        }
      });
      var delNum = function () {
        var length = 0;
        $this.find('tbody tr.del').each(function () {
          length += 1;
        });
        return length;
      };
      var ingNum = function () {
        var length = 0;
        $this.find('tbody tr.working').each(function () {
          if (!$(this).hasClass('del')) length += 1;
        });
        return length;
      };
      var completeNum = function () {
        var length = 0;
        $this.find('tbody tr td.complete').each(function () {
          if (!$(this).hasClass('del') && $(this).text() === '완료') length += 1;
        });
        return length;
      };
      var per = pageNum() === 0 ? 0 : Math.round((100 / (pageNum() - delNum())) * completeNum());
      if (per === 100) Math.floor((100 / (pageNum() - delNum())) * completeNum());
      $this.find('.total .num').text(pageNum());
      $this.find('.working .num').text(ingNum());
      $this.find('.cp_num .num').text(completeNum());
      $this.find('.ing .num').text(per);
      $this.find('.bar').css('width', per + '%');
    });

    var totalPageNums = function () {
      var length = 0;
      $('table .no').each(function () {
        // if (!$(this).closest('.del').length) length += 1;
        length += 1;
      });
      return length;
    };
//     console.log(totalPageNum());
    var totalDelPageNum = function () {
      var length = 0;
      $('table .no').each(function () {
        if ($(this).closest('.del').length) length += 1;
      });
      return length;
    };
    //console.log(totalDelPageNum());
    var totalPageNum = function () {
      var _totalPageNums = totalPageNums(),
         _totalDelPageNum = totalDelPageNum();
        
         return _totalPageNums - _totalDelPageNum;
    }
    // console.log(totalPageNum());
    var ingTotalNum = function () {
      var length = 0;
      $('table tr.working').each(function () {
        if (!$(this).hasClass('del')) length += 1;
      });
      return length;
    };
    var completeTotalNum = function () {
      var length = 0;
      $('table td.complete').each(function () {
        if (!$(this).parent('tr').hasClass('del') && $(this).text() === '완료') length += 1;
      });
      return length;
    };
    var perTotal = totalPageNum() === 0 ? 0 : Math.round((100 / totalPageNum()) * completeTotalNum());
    if (perTotal === 100) Math.floor((100 / totalPageNum()) * completeTotalNum());
    $('.pg_project_status .total .num').text(totalPageNums());
    $('.pg_project_status .del .num').text(totalDelPageNum());
    $('.pg_project_status .working .num').text(ingTotalNum());
    $('.pg_project_status .cp_num .num').text(completeTotalNum());
    $('.pg_project_status .ing .num').text(perTotal);
    $('.pg_project_status .bar').css('width', perTotal + '%');
  },
  UI: function () {
    var $thBtn = $('th button'),
      $btnResponsive = $('.btn_responsive'),
      $idLink = $('td.id a'),
      $projectSelect = $('.pg_project .current'),
      $document = $(document),
      $currentName = $('nav a[href^="' + location.pathname.split("/")[5] + '"]'),
      $currentTile = $currentName.text(),
      $codeView = $('.pg_guide_info .code_view'),
      $codeViewTarget = $('.pg_guide_info .code_view h4 a'),
      $remark = $('.pg_board .remark'),
      $project = $('body').attr('data-project');
    $currentName.closest('li').addClass('active').parents('li').addClass('active'); // 현재 메뉴 활성화
    if (!$('.btm_btn_set').length) $('body').append('<div class="btm_btn_set"><button type="button" class="btn_guide_top"><span class="hide">TOP</span></button><button type="button" class="btn_light_mode"><i></i><i></i><i></i><i></i><span class="hide">다크모드</span></button></div>');
    $('.pg_project .pg_list li').each(function () {
      var $this = $(this);
      if ($project.charAt(0).toUpperCase() + $project.slice(1) === $this.text()) {
        $this.addClass('active');
        $projectSelect.text($this.text());
      }
    });
    $projectSelect.on('click', function (e) {
      e.preventDefault();
      $(this).toggleClass('active').next('.pg_list').slideToggle();
    });
    $document.on('click', function (e) {
      var _a = e.target;
      if ($(_a).closest('.pg_project').length === 0) {
        $('.pg_project .current').removeClass('active').next('.pg_list').slideUp();
      }
    });
    if ($('.code').length > 0) {
      SyntaxHighlighter.all();
    }
    $codeViewTarget.on('click', function () {
      var $this = $(this).closest('.code_view');
      if (!$this.hasClass('active')) {
        $codeView.removeClass('active');
        $this.addClass('active');
      } else {
        $this.removeClass('active');
      }
    });
    $thBtn.on('click', function () {
      var $this = $(this);
      var $idx = $this.closest('th').index();
      var $grid = $this.closest('.pg_board');
      $this.closest('th').hide();
      $grid.find('tr').not('.hr').each(function () {
        $(this).find('td').eq($idx).hide();
      });
      $grid.resize();
      var thNum = $grid.find('thead th:not([style*="display: none"])').length;
      $grid.find('.hr th').attr('colspan', thNum);
    });
    $(document).on('click', 'td.id a', function (e) {
      var $this = $(this),
        $btnNewWindow = $('.frame_device .newWindow'),
        pID = $this.text(),
        pName = $this.closest('td').siblings('td.name').text(),
        url = $this.attr('href');
      $this.closest('tr').addClass('active').siblings('tr').removeClass('active');
      $('.frame_device .p_id').text(pID);
      $('.frame_device .p_name').text(pName);
      $('.frame_device .head').addClass('active');
      setTimeout(function () {
        $('.frame_device .head').removeClass('active');
      }, 500);
      $btnNewWindow.attr('href', url);

    });
    $(document).on('mouseover', 'td a.btn_hover', function (e) {
      var url = $(this).attr('href'),
          $device = $('.frame_device iframe'),
          $deviceID = $('.frame_device .p_id'),
          $deviceName = $('.frame_device .p_name'),
          $link = $('.frame_device .newWindow'),
          _screenID = $(this).closest('tr').find('td.id>a').text(),
          _screenName = $(this).closest('tr').find('td.name').text();
      $device.attr('src', url);
      $link.attr('href', url);
      $deviceID.text(_screenID);
      $deviceName.text(_screenName);
    });
    $btnResponsive.on('click', function () {
      guide.mToggle();
      guide.devicePreview();
      var $frameDevice = $('.frame_device');
      if ($frameDevice.hasClass('pop')) {
        $frameDevice.drags('opt', 'destroy');
        $('.pg_project_status').removeAttr('style');
        $frameDevice.removeClass('pop').removeAttr('style');
      }
    });
    $remark.on('click', function (e) {
      e.preventDefault();
      var $clone = $(this).clone(),
        $remarkPop = '<div class="remark_pop"><a href="#" class="btn_search_del" role="button"><span class="hide">창닫기</span></a><h2>History</h2><div class="history"></div>',
        $dimmed = '<div class="dimmed"></div>';
      $('body').append($remarkPop, $dimmed);
      $('html, body').addClass('no_scroll');
      $('.remark_pop .history').append($clone);
    });
    $(document).on('click', '.dimmed, .btn_search_del', function (e) {
      e.preventDefault();
      $('.remark_pop, .dimmed').remove();
      $('html, body').removeClass('no_scroll');
    });
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
      $(window).on('load', function () {
        tabSwiper.update();
      });
    }
  },
  devicePreview: function () {
    var $currentTab = $('.pg_board_tab li.active button').text(),
      $panel = $('.pg_board_panel'),
      $currentPanel = $('.pg_board_panel.active');
    var $firstTr = ($currentTab === '전체보기') ? $panel.eq(0) : $currentPanel;
    var $firstLink = $firstTr.find('tbody a').first(),
      _url = $firstLink.attr('href'),
      _screenID = $firstLink.text(),
      _screenName = $firstLink.closest('tr').find('.name').text();
    if ($('.frame_device').length) {
      var $device = $('.frame_device iframe'),
        $deviceID = $('.frame_device .p_id'),
        $deviceName = $('.frame_device .p_name');
      $device.attr('src', _url);
      $deviceID.text(_screenID);
      $deviceName.text(_screenName);
    } else {
      var $html = '';
      $html += '<div class="frame_device">';
      $html += '<div class="head">';
      $html += '<a href="' + _url + '" class="newWindow" target="_blank"><span class="hide">새창으로</span></a>';
      $html += '<h2><span class="p_id">' + _screenID + '</span><span class="p_name">' + _screenName + '</span></h2>';
      $html += '<button type="button" class="disconnect"><span class="hide">팝업으로 분리</span></button>';
      $html += '</div>';
      $html += '<div class="device">';
      $html += '<div class="btn_size_set">';
      $html += '<button type="button">320</button>';
      $html += '<button type="button">360</button>';
      $html += '<button type="button">375</button>';
      $html += '<button type="button">768</button>';
      $html += '</div>';
      $html += '<iframe src="' + _url + '" frameborder="0" name="device"></iframe>';
      $html += '</div>';
      $html += '</div>';
      $('#pgWrap').append($html);
    }
    var $btnSize = $('.btn_size_set button'),
      $btnPopDevice = $('.frame_device .disconnect');
    $btnSize.off('click').on('click', function (e) {
      e.preventDefault();
      var $this = $(this), $frameDevice = $('.frame_device'), deviceW = $this.text(), frameW = Number(deviceW) + 10, wrapP = Number(deviceW) + 10;
      $frameDevice.css('width', frameW);
      if (!$frameDevice.hasClass('pop')) {
        $('#pgContainer').css('marginRight', wrapP);
        $('.pg_project_status').css('paddingRight', wrapP);
        $('html.m .pg_board_tab').css('right', wrapP);
        $('html.m .panel_head').css('right', wrapP);
        $('html.m .search_title').css('right', wrapP);
      }
    });
    $btnPopDevice.off('click').on('click', function (e) {
      e.preventDefault();
      guide.mToggle();
      var $frameDevice = $('.frame_device'),
        _a = $('.pg_board table tbody td.id a');
      $frameDevice.toggleClass('pop');
      if ($frameDevice.hasClass('pop')) {
        $frameDevice.drags('opt');
        _a.attr('target', 'device');
      } else {
        $frameDevice.drags('opt', 'destroy');
        $('.pg_project_status').removeAttr('style');
        $frameDevice.removeClass('pop').removeAttr('style');
      }
    });
    guide.frameResize();
  },
  searcher: function (target) {
    var $gContent = $('.pg_content'),
      $thead = $('.pg_board_panel thead'),
      $tbody = $('.pg_board_panel tbody');
    $(document).on('keyup focus', target, function () {
      var $this = $(this), $val = $this.val();
      if ($val != '') {
        if (!$this.next('.btn_search_del').length) $this.after('<a href="#" class="btn_search_del" role="button"><span class="hide">입력내용삭제</span></a>');
        $this.next('.btn_search_del').addClass('on');
        $('body').removeHighlight();
        if ($val) $('body').highlight($val);
        $thead.hide();
        $tbody.find('tr').hide();
        $('.highlight').closest('tr').show();
        if (!$gContent.hasClass('searcher')) $gContent.addClass('searcher');
        if ($('.search_title').length == 0) $gContent.prepend('<div class="search_title"><h3>검색결과</h3><button type="button" class="btn_search_cancel">검색취소</button></div>')
        $(document).on('click', '.btn_search_cancel', function () {
          $('body').removeHighlight();
          $thead.show();
          $tbody.find('tr').show();
          $gContent.removeClass('searcher');
          $('#pgSearchINP').val('').change().focus();
        });
      } else {
        if ($this.next('.btn_search_del').length) {
          $('body').removeHighlight();
          $thead.show();
          $tbody.find('tr').show();
          $gContent.removeClass('searcher');
          $('.search_title').remove();
          setTimeout(function () { $this.next('.btn_search_del').remove() }, 400);
        }
      }
    }).on('focusout', target, function () {
      var $this = $(this);
      if ($this.next('.btn_search_del').length) {
        $this.next('.btn_search_del').removeClass('on')
        setTimeout(function () { $this.next('.btn_search_del').remove() }, 400);
      }
    });

    $(document).on('click', '.btn_search_del', function () {
      var $input = $(this).prev('input');
      $('body').removeHighlight();
      $thead.show();
      $tbody.find('tr').show();
      $gContent.removeClass('searcher');
      $input.val('').change().focus();
    });
  },
  frameResize: function () {
    var _wH = $(window).height(),
      _hH = $('#pgHeader').height(),
      _iH = $('.frame_device .head').height(),
      $frame = $('.frame_device iframe');
    $frame.css('height', _wH - _hH - _iH - 65);
  },
  resize: function () {
    $(window).on('resize', function () {
      var $hr = $('tr.hr th'),
        windowWidth = $(window).width(),
        _a = $('.pg_board table tbody td.id a'),
        $device = $('.frame_device');
      if (windowWidth < 1024) {
        $hr.attr('colspan', '2');
        $('html').removeClass('m');
        _a.attr('target', '_blank');
        $device.removeAttr('style');
      } else {
        $hr.attr('colspan', '13');
      }
      guide.frameResize();
    });
  },
  scroll: function () {
    $(window).scroll(function () {
      guide.btnSet();
      guide.headPixed();
    });
    $(window).scroll();
  },
  btnSet: function () {
    var $window = $(window), $btmBtnSet = $('.btm_btn_set'), $btnTop = $('.btn_guide_top'), $btnLightMode = $('.btn_light_mode');
    ($(window).scrollTop() > 100) ? $btmBtnSet.addClass('active') : $btmBtnSet.removeClass('active');
    $btnTop.on('click', function () {
      $(window).scrollTop(0);
    });
    $btnLightMode.off('click').on('click', function () {
      guide.toggle_light_mode();
    });
  },
  headPixed: function () {
    var $window = $(window), $wrap = $('#pgWrap'), $gHeader = $('#pgHeader'), $gTitle = $('.pg_titles');
    ($(window).scrollTop() > $gTitle.height() && $(window).width() > 1024) ? $wrap.addClass('fixed') : $wrap.removeClass('fixed');
  },
  mToggle: function () {
    var _a = $('.pg_board table tbody td.id a'),
      $device = $('.frame_device');
    if ($('html').hasClass('m')) {
      $('html').removeClass('m');
      if (!$device.hasClass('pop')) _a.attr('target', '_blank'), $('#pgContainer, .frame_device').removeAttr('style');
      $('.pg_board_tab').css('right', 0);
      $('.panel_head').css('right', 0);
      $('.search_title').css('right', 0);
    } else {
      $('html').addClass('m')
      _a.attr('target', 'device');
    }
  },
  toggle_light_mode: function () {
    var app = $('html');
    if (localStorage.lightMode == "dark") {
      localStorage.lightMode = "light";
      app.attr("light-mode", "light");
    } else {
      localStorage.lightMode = "dark";
      app.attr("light-mode", "dark");
    }
  },
  shortcut: function () {
    var prevTargetText = null;
    var $gTarget = $('.pg_target');
    $('.pg_content').each(function (index, item) {
      var targets = $(item).find('tbody tr td:nth-child(5)');
      $.each(targets, function (i, target) {
        var area = $(target).closest('.pg_board_panel').find('.pg_target>ul');
        var targetText = $(target).text();
        var row = $(target).parent();
        if (prevTargetText == targetText || targetText == '' || row.hasClass('del')) return;
        row.attr('id', 'target' + i);
        area.append('<li class="swiper-slide"><a href="#target' + i + '" class="go">' + targetText + '</a></li>');
        prevTargetText = $(target).text();
      });
    });
    $gTarget.each(function (i, item) {
      targetSwiper[i] = new Swiper(item, {
        slidesPerView: 'auto',
        freeMode: true
      });
      $(item).find('.swiper-slide>a').on('click', function (e) {
        e.preventDefault();
        var $this = $(this);
        var cWidth = Math.floor($(item).width());
        var offset = Math.floor($this.width() + $this.position().left + $this.width());
        var myIndex = $this.index();
        var targetID = $this.attr('href');
        console.log($this);
        console.log($(targetID));
        $this.addClass('active').parent('li').siblings('li').find('a').removeClass('active');
        (cWidth < offset) ? targetSwiper[i].slideNext() : targetSwiper[i].slideTo(myIndex - 1);
        $(targetID).addClass('focus');
        setTimeout(function () {
          $(targetID).removeClass('focus');
        }, 1000);
        $('html, body').animate({
          scrollTop: ($(targetID).offset().top - 200) + 'px'
        }, 300);
      });
    });
  },
  etcListChk: function () {
    $('.pg_board_panel').each(function () {
      var $this = $(this),
        $design = $this.find('.remark li.design'),
        $plan = $this.find('.remark li.plan');
        $issue = $this.find('.remark li.issue');
        $schedule = $this.find('.remark li.schedule');
        $wah = $this.find('.remark li.wah');
        $etc = $this.find('.remark li.etc');
      if ($design.length) {
        var num = $design.length,
          $btn = $this.find('.btn_design');
        $design.closest('tr').addClass('design');
        if (!$btn.length) $this.find('.pg_alert_btn_set').append('<button type="button" class="btn_design">디자인확인 필요<strong>[' + num + ']</strong></button>');
      }
      if ($plan.length) {
        var num = $plan.length,
          $btn = $this.find('.btn_plan');
        $plan.closest('tr').addClass('plan');
        if (!$btn.length) $this.find('.pg_alert_btn_set').append('<button type="button" class="btn_plan">기획확인 필요<strong>[' + num + ']</strong></button>');
      }
      if ($issue.length) {
        var num = $issue.length,
          $btn = $this.find('.btn_issue');
        $issue.closest('tr').addClass('issue');
        if (!$btn.length) $this.find('.pg_alert_btn_set').append('<button type="button" class="btn_issue">이슈<strong>[' + num + ']</strong></button>');
      }
      if ($schedule.length) {
        var num = $schedule.length,
          $btn = $this.find('.btn_schedule');
        $schedule.closest('tr').addClass('schedule');
        if (!$btn.length) $this.find('.pg_alert_btn_set').append('<button type="button" class="btn_schedule">일정확인 필요<strong>[' + num + ']</strong></button>');
      }
      if ($schedule.length) {
        var num = $schedule.length,
          $btn = $this.find('.btn_wah');
        $schedule.closest('tr').addClass('wah');
        if (!$btn.length) $this.find('.pg_alert_btn_set').append('<button type="button" class="btn_wah">접근성<strong>[' + num + ']</strong></button>');
      }
      if ($etc.length) {
        var num = $etc.length,
          $btn = $this.find('.btn_etc');
        $etc.closest('tr').addClass('etc');
        if (!$btn.length) $this.find('.pg_alert_btn_set').append('<button type="button" class="btn_etc">기타확인 필요 <strong>[' + num + ']</strong></button>');
      }
    });
    $('.pg_alert_btn_set').find('button').on('click', function (e) {
      var $this = $(this),
        $tr = $this.closest('.pg_board_panel').find('.pg_board tbody tr');
      if ($this.hasClass('btn_design')) {
        $this.siblings().removeClass('active');
        if (!$this.hasClass('active')) {
          $this.addClass('active');
          $tr.hide().siblings('tr.design').show().find('.remark>li').show();
        } else {
          $this.removeClass('active');
          $tr.show().siblings('tr.design').find('.remark>li').removeAttr('style');
        }
      }
      if ($this.hasClass('btn_plan')) {
        $this.siblings().removeClass('active');
        if (!$this.hasClass('active')) {
          $this.addClass('active');
          $tr.hide().siblings('tr.plan').show().find('.remark>li').show();
        } else {
          $this.removeClass('active');
          $tr.show().siblings('tr.plan').find('.remark>li').removeAttr('style');
        }
      }
      if ($this.hasClass('btn_issue')) {
        $this.siblings().removeClass('active');
        if (!$this.hasClass('active')) {
          $this.addClass('active');
          $tr.hide().siblings('tr.issue').show().find('.remark>li').show();
        } else {
          $this.removeClass('active');
          $tr.show().siblings('tr.issue').find('.remark>li').removeAttr('style');
        }
      }
      if ($this.hasClass('btn_schedule')) {
        $this.siblings().removeClass('active');
        if (!$this.hasClass('active')) {
          $this.addClass('active');
          $tr.hide().siblings('tr.schedule').show().find('.remark>li').show();
        } else {
          $this.removeClass('active');
          $tr.show().siblings('tr.schedule').find('.remark>li').removeAttr('style');
        }
      }
      if ($this.hasClass('btn_wah')) {
        $this.siblings().removeClass('active');
        if (!$this.hasClass('active')) {
          $this.addClass('active');
          $tr.hide().siblings('tr.wah').show().find('.remark>li').show();
        } else {
          $this.removeClass('active');
          $tr.show().siblings('tr.wah').find('.remark>li').removeAttr('style');
        }
      }
      if ($this.hasClass('btn_etc')) {
        $this.siblings().removeClass('active');
        if (!$this.hasClass('active')) {
          $this.addClass('active');
          $tr.hide().siblings('tr.etc').show().find('.remark>li').show();
        } else {
          $this.removeClass('active');
          $tr.show().siblings('tr.etc').find('.remark>li').removeAttr('style');
        }
      }
    });
    if (localStorage.lightMode == "dark") $('.pg_board table tbody td.id a').addClass('dark');
  },
  init: function () {
    guide.board();
    guide.state();
    guide.UI();
    guide.slide();
    guide.switchSet();
    guide.switch();
    guide.tab();
    guide.devicePreview();
    guide.searcher('#pgSearchINP');
    guide.resize();
    guide.scroll();
    guide.shortcut();
    guide.etcListChk();
  }
};
$.fn.drags = function (opt, destroy) {
  var $el = null;
  opt = $.extend({ handle: ".head", cursor: "move" }, opt);
  if (opt.handle === "") {
    $el = this;
  } else {
    $el = this.find(opt.handle);
  }
  if (destroy === 'destroy') {
    $el.css('cursor', 'auto').off("mousedown");
  } else {
    $el.css('cursor', opt.cursor).on("mousedown", function (e) {
      var $drag = null;
      if (opt.handle === "") {
        $drag = $(this).addClass('draggable');
      } else {
        $drag = $(this).addClass('active-handle').parent().addClass('draggable');
      }
      var z_idx = $drag.css('z-index'),
        drg_h = $drag.outerHeight(),
        drg_w = $drag.outerWidth(),
        pos_y = $drag.offset().top + drg_h - e.pageY,
        pos_x = $drag.offset().left + drg_w - e.pageX;
      $drag.css('z-index', 1000).parents().on("mousemove", function (e) {
        $('.draggable').offset({
          top: e.pageY + pos_y - drg_h,
          left: e.pageX + pos_x - drg_w
        }).on("mouseup", function () {
          $(this).removeClass('draggable').css('z-index', z_idx);
        });
      });
      e.preventDefault(); // disable selection
    }).on("mouseup", function () {
      if (opt.handle === "") {
        $(this).removeClass('draggable');
      } else {
        $(this).removeClass('active-handle').parent().removeClass('draggable');
      }
    });
  }
}
$.fn.highlight = function (pat) {
  function innerHighlight(node, pat) {
    var skip = 0;
    if (node.nodeType == 3) {
      var pos = node.data.toUpperCase().indexOf(pat);
      if (pos >= 0) {
        var spannode = document.createElement('span');
        spannode.className = 'highlight';
        var middlebit = node.splitText(pos);
        var endbit = middlebit.splitText(pat.length);
        var middleclone = middlebit.cloneNode(true);
        spannode.appendChild(middleclone);
        middlebit.parentNode.replaceChild(spannode, middlebit);
        skip = 1;
      }
    }
    else if (node.nodeType == 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
      for (var i = 0; i < node.childNodes.length; ++i) {
        i += innerHighlight(node.childNodes[i], pat);
      }
    }
    return skip;
  }
  return this.each(function () {
    innerHighlight(this, pat.toUpperCase());
  });
};
$.fn.removeHighlight = function () {
  function newNormalize(node) {
    for (var i = 0, children = node.childNodes, nodeCount = children.length; i < nodeCount; i++) {
      var child = children[i];
      if (child.nodeType == 1) {
        newNormalize(child);
        continue;
      }
      if (child.nodeType != 3) { continue; }
      var next = child.nextSibling;
      if (next == null || next.nodeType != 3) { continue; }
      var combined_text = child.nodeValue + next.nodeValue;
      new_node = node.ownerDocument.createTextNode(combined_text);
      node.insertBefore(new_node, child);
      node.removeChild(child);
      node.removeChild(next);
      i--;
      nodeCount--;
    }
  }
  return this.find("span.highlight").each(function () {
    var thisParent = this.parentNode;
    thisParent.replaceChild(this.firstChild, this);
    newNormalize(thisParent);
  }).end();
};