var COMPONENT_UI = (function (cp, $) {

    /* COMMON UI */
    cp.form = {
        constEl: {
            inputDiv: $("._input"),
            inputSelector: "._input > input:not([type='radio']):not([type='checkbox']):not(.exp input)",
            clearSelector: "._input-clear",
            clearBtnEl: $('<button type="button" class="field-btn _input-clear _active"><span class="hide">입력값삭제</span></button>')
        },
        
        init: function() {
            this.input();
            this.inpClearBtn();
            this.secureTxt();
        },

        // input Btn Clear
        input: function () {
            const inputSelector = this.constEl.inputSelector,
                clearSelector = this.constEl.clearSelector,
                clearBtnEl = this.constEl.clearBtnEl;

            $(inputSelector).each(function () {
                const $inputTxt = $(this);

                if ($inputTxt.prop("readonly") || $inputTxt.prop("disabled")) {
                    return;
                }

                function activateClearBtn() {
                    const $clearBtn = $inputTxt.parent().find(clearSelector);
                
                    if ($inputTxt.val()) {
                        $clearBtn.addClass("_active");
                        if (!$inputTxt.parent().find(clearSelector + "._active").length) {
                            $inputTxt.css({width:"calc(100% - 2.4rem)"}).parent().append(clearBtnEl);
                        }
                    } else {
                        $clearBtn.removeClass("_active");
                        $inputTxt.css({width:""}).parent().find(clearSelector).remove();
                    }
                }
                

                $inputTxt
                .on("keyup focus input", function () {
                    activateClearBtn();
                })
                .on("blur", function () {
                    setTimeout(function() {
                        $inputTxt.css({width:""}).parent().find(clearSelector).remove();
                    }, 1000);
                });

                activateClearBtn();
            });
        },
        inpClearBtn: function () {
            const inputSelector = this.constEl.inputSelector,
                clearSelector = this.constEl.clearSelector;

            $(document).on("mousedown touchstart keydown", clearSelector + "._active", function (e) {
                if (e.type === "keydown" && e.which !== 13) return;
                e.preventDefault();
                var clearBtn = $(this),
                    inputTxt = clearBtn.siblings(inputSelector);
                inputTxt.css({width:"calc(100% - 2.4rem)"}).val('').focus();
                setTimeout(function() {
                    clearBtn.remove();
                    inputTxt.css({width:""});
                }, 1000);
            });

        },
        
        // 비밀번호 특수문자 모양
        secureTxt: function() {
            $('._secureTxt').each(function() {
                function handleInputFocus(event) {
                    var secureField = $(event.target).closest("._secureTxt");
                    var inputField = secureField.find("input");
                    secureField.find("i._line").css({ opacity: ".5" }).removeClass("_is-active");
                    var value = inputField.val();
                    var activeLines = secureField
                                    .find("i._line")
                                    .removeClass("_is-active")
                                    .css({ opacity: ".5" });

                    for (var i = 0; i < value.length && i < secureLine; i++) {
                        activeLines.eq(i).addClass("_is-active").css({ opacity: "" });
                    }
                }

                function handleInputChange(event) {
                    var secureField = $(event.target).closest("._secureTxt");
                    var inputField = secureField.find("input");
                    var value = inputField.val();
                    var activeLines = secureField.find("i._line").removeClass("_is-active").css({ opacity: ".5" });

                    for (var i = 0; i < value.length && i < secureLine; i++) {
                        activeLines.eq(i).addClass("_is-active").css({ opacity: "" });
                    }
                
                    if (secureField.hasClass("_num")) {
                        secureField.find("i._is-active, i._line")[value ? "hide" : "show"]();
                    }
                }
                
                function handleInputKeyUp(event) {
                    if (event.keyCode === 8) {
                        var secureField = $(event.target).closest("._secureTxt");
                        secureField.find("i._line").eq(event.target.value.length).removeClass("_is-active");
                    }
                }
                
                var secureLine = parseInt($(this).attr("data-secureLine"));
                var length = parseInt($(this).attr("data-length"));
                var secureField = $(this);
                var iTag = "";
                
                for (var i = 0; i < length; i++) {
                    iTag += '<i aria-hidden="true"></i>';
                }
                secureField.append(iTag);
                
                var left = 0;
                var space = 13;
                var inputField = secureField.find("input");
                
                secureField.find("i").each(function (index) {
                var $this = $(this);
                $this.width($this.height());
                $this.css("left", left + "px");
                
                if (index < secureLine) {
                    $this.addClass("_line");
                }
                
                left += space;
                space = 16;
                });
                
                if (secureField.hasClass("_num")) {
                    inputField.attr("type", "tel");
                }
                
                inputField.on("focus", handleInputFocus)
                    .on("input", handleInputChange)
                    .on("keyup", handleInputKeyUp)
                    .on("blur", function () {
                    if (!inputField.val()) {
                            secureField.find("i._line").css({ opacity: "" }).removeClass("_is-active");
                    }
                });
            });
        },
        
    },

    cp.selectPop = {
        constEl: {
            btnSelect: "._selectBtn",
            dimmedEl: $('<div class="dimmed" aria-hidden="true"></div>')
        },
        init: function() {       
            this.openSelect();
            this.optSelect();
        },
    
        openSelect: function () {
            const self = this,
                btnSelect = this.constEl.btnSelect;                
            $(document).on('click', btnSelect, function() {
                const $btn = $(this);
                const target = $btn.attr('data-select');
                const $select = $('.modalPop[select-target="' + target + '"]');
                const $selectWrap = $select.find("> .modalWrap");
                
                const $activeOption = $select.find('.select-lst > li._is-active');
                if ($activeOption.length === 0) {
                    const btnText = $btn.text();
                    $select.find('.select-lst > li:eq(0)').before('<li class="_is-active"><a href="javascript:;" class="sel-opt _defaultTxt">' + btnText + '</a></li>');
                } else {
                    const btnText = $btn.text();
                    if ($activeOption.find('a').text() !== btnText) {
                        $activeOption.removeClass('_is-active');
                        const $newActiveOption = $select.find('.select-lst > li > a').filter(function() {
                            return $(this).text() === btnText;
                        }).parent();
                        $newActiveOption.addClass('_is-active');
                    } else {
                        $activeOption.addClass('_is-active');
                    }
                }
                
                self.showSelect($(this));
                $btn.addClass('_selectTxt');
            });
        },
        
    
        showSelect: function ($btn) {
            const self = this,
                dimmedEl = this.constEl.dimmedEl;
            var target = $btn.attr('data-select');
            var $select = $('.modalPop[select-target="' + target + '"]');
            var $selectWrap = $select.find("> .modalWrap");
            var selectWidth = '';
            var selectHeight = '';
    
            $select.addClass('_is-active').show();
    
            selectWidth = $select.outerWidth();
            selectHeight = $selectWrap.outerHeight();                
            winHeight = $(window).height();
    
            selectTitHeight = $selectWrap.find(" > .modal-header").outerHeight();
            selectConHeight = $selectWrap.find(" > .modal-container").outerHeight();
            selectBtnHeight = $selectWrap.find(" > .modal-footer").outerHeight();

            if (selectHeight > winHeight) {
                $select
                .addClass('_scroll').css({
                    'max-height':winHeight - 100 + 'px',
                    'height':''
                })
                .animate({bottom: '0'}, 300).show();
                $selectWrap
                .css({'max-height':winHeight - 100 + 'px'})
                .find(" > .modal-container").css({'max-height':winHeight - (selectTitHeight + selectBtnHeight) - 160 + 'px'});
            } else {
                $select
                .css({'height': selectHeight + 'px'})
                .animate({bottom: '0'}, 300).show();
            }

            dimmedEl.remove(); 
            $('body').addClass('no-scroll').append(dimmedEl);

            $btn.addClass('_selectTxt');
        },
    
        optSelect: function () {
            const self = this;
            $(document).on('click', '.select-lst > li > a.sel-opt', function () {
                $(this).parent('li').addClass('_is-active').siblings().removeClass('_is-active');
            });
            
            $(document).on('click', '.btn-selChoice', function () {
                $('.modalPop .btn-close-pop').trigger('click');
                const selectedOption = $('.select-lst > li._is-active > a.sel-opt');
                const selectedText = selectedOption.text();
                const selectTxtElement = $('._selectTxt');
                selectTxtElement.text(selectedText).removeClass('_selectTxt');
                selectedOption.addClass('sel-opt');
            });
        }
    },

    cp.modalPop = {
        constEl: {
            btnModal: "._modalBtn",
            dimmedEl: $('<div class="dimmed" aria-hidden="true"></div>')
        },
        init: function() {       

            this.openPop();
            this.closePop();
            this.toastPop();
        },
        
        openPop: function () {
            const self = this,
                btnModal = this.constEl.btnModal;
            $(document).on('click', btnModal, function() {
                $(this).addClass('_rtFocus');
                self.showModal($(this));
                self.layerFocusControl($(this));
            });
        },
        
        showModal: function ($btn) {
            const self = this,
                dimmedEl = this.constEl.dimmedEl;
            const target = $btn.attr('data-modal');
            const $modal = $('.modalPop[modal-target="' + target + '"]');
            var $modalWrap = $modal.find("> .modalWrap");
            var modalWrapClass = $modal.attr('class');
            var modalWidth = '';
            var modalHeight = '';

            modalWidth = $modal.outerWidth();              
            winHeight = $(window).height();
        
            if (modalWrapClass.indexOf('_top') !== -1) {

                $modal.addClass('_is-active');
                modalHeight = $modalWrap.outerHeight();

                $modalWrap.css({
                    'height': modalHeight + 'px',
                    'transition': 'opacity 250ms cubic-bezier(.86, 0, .07, 1)'
                });
                $modal.animate({
                    top: '0'
                }, 300).show();
            } else if (modalWrapClass.indexOf('_left') !== -1) {
                $modal.addClass('_is-active');

                modalTitHeight = $modalWrap.find(" > .modal-header").outerHeight();
                modalConHeight = $modalWrap.find(" > .modal-container").outerHeight();
                modalBtnHeight = $modalWrap.find(" > .modal-footer").outerHeight();

                modalConMaxHeight = winHeight - modalTitHeight - modalBtnHeight - 40                

                if (modalConHeight > winHeight) {
                    $modalWrap.css({
                        'height': 100 + 'vh',
                        'transition': 'opacity 250ms cubic-bezier(.86, 0, .07, 1)'
                    }).find('> .modal-container').css({
                        'height': modalConMaxHeight + 'px',
                    }).attr("tabindex","0");
                    $modal.addClass("_scroll").animate({
                        left: '0',
                    }, 300).show();
                } else {
                    // $modalWrap.css({'height': 100 + '%'});
                    $modal.animate({
                        left: '0',
                        height:'100%',
                    }, 300).show();
                }

                
            } else if (modalWrapClass.indexOf('_center') !== -1) {
                $modal.addClass('_is-active');

                modalHeight = $modalWrap.outerHeight();

                modalTitHeight = $modalWrap.find(" > .modal-header").outerHeight();
                modalConHeight = $modalWrap.find(" > .modal-container").outerHeight();
                modalBtnHeight = $modalWrap.find(" > .modal-footer").outerHeight();
                
                // 팝업 요소의 위치를 조정한다.
                if (modalHeight > winHeight) {
                    $modal.addClass('_scroll').css({
                        'margin-left': -modalWidth/2 + 'px',
                        'margin-top': -(winHeight - 100)/2 + 'px',
                        'max-height':winHeight - 100 + 'px',
                        'height':''
                    }, 100).show();
                    $modalWrap
                    .css({
                        'max-height':winHeight - 100 + 'px',
                    })
                    .find(" > .modal-container").css({
                        'max-height':winHeight - (modalTitHeight + modalBtnHeight) - 160 + 'px'
                    }).attr("tabindex","0");
                } else {
                    $modal.css({
                        'margin-left': -modalWidth/2 + 'px',
                        'margin-top': -modalHeight/2 + 'px',
                        'height': modalHeight + 'px',
                    }, 100).show();
                }
                
            } else if (modalWrapClass.indexOf('_bottom') !== -1) {
                $modal.addClass('_is-active');
                modalHeight = $modalWrap.outerHeight();

                modalTitHeight = $modalWrap.find(" > .modal-header").outerHeight();
                modalConHeight = $modalWrap.find(" > .modal-container").outerHeight();
                modalBtnHeight = $modalWrap.find(" > .modal-footer").outerHeight();

                console.log(modalTitHeight, modalConHeight, modalBtnHeight);
                // 팝업 요소의 위치를 조정한다.
                if (modalHeight > winHeight) {
                    $modal.addClass('_scroll').css({
                        'max-height':winHeight - 100 + 'px',
                        'height':''
                    })
                    .animate({
                        'bottom': '0',
                        'transition': 'opacity 250ms cubic-bezier(.86, 0, .07, 1)'
                    }, 300).show();
                    $modalWrap
                    .css({
                        'max-height':winHeight - 100 + 'px',
                    })
                    .find(" > .modal-container").css({
                        'max-height':winHeight - (modalTitHeight + modalBtnHeight) - 160 + 'px'
                    }).attr("tabindex","0");;
                } else {
                    $modal.css({
                        'height': modalHeight + 'px',
                    })
                    .animate({
                        'bottom': '0',
                        'transition': 'opacity 250ms cubic-bezier(.86, 0, .07, 1)'
                    }, 300).show();
                }

            } 

            $modal.attr({'aria-hidden': 'false', 'tabindex':'0'}).focus();
            $modalWrap.attr({'role': 'dialog', 'aria-modal': 'true'})
                    .find('h1, h2, h3, h4, h5, h6').first().attr('tabindex', '0');
            // 생성된 $dimmed 제거 후 다시 추가
            dimmedEl.remove(); 
            $('body').addClass('no-scroll').append(dimmedEl);

            
        },

        // 탭으로 포커스 이동 시 팝업이 열린상태에서 팝업 내부해서만 돌도록 제어하는 함수
        layerFocusControl: function ($btn) {
            var target = $btn.attr('data-modal');
            var $modal = $('.modalPop[modal-target="' + target + '"]');
            var $modalWrap = $modal.find("> .modalWrap");
            
            var $firstEl = $modalWrap.find('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])').first();
            var $lastEl = $modalWrap.find('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])').last();
            
            $modalWrap.on("keydown", function (e) {
                if (e.keyCode == 9) {
                if (e.shiftKey) { // shift + tab
                    if ($(e.target).is($firstEl)) {
                        $lastEl.focus();
                        e.preventDefault();
                        }
                    } else { // tab
                        if ($(e.target).is($lastEl)) {
                        $firstEl.focus();
                        e.preventDefault();
                        }
                    }
                }
            });
        },

        
        closePop: function() {
            const self = this;
            $(document).on('click', '.modalPop .btn-close-pop', function() {
                var $modal = $(this).closest('.modalPop');
                var $modalWrap = $modal.find("> .modalWrap");
                var modalWrapClass = $modal.attr('class');
                if (modalWrapClass.indexOf('_top') !== -1) {
                    $modal.animate({
                        top: '-100%'
                    }, 300, function() {
                        $modal.removeClass('_is-active').hide();
                    });
                } else if (modalWrapClass.indexOf('_left') !== -1) {
                    $modal.animate({
                        left: '-100%'
                    }, 300, function() {
                        $modal.removeClass('_is-active').hide();
                    });
                    $modalWrap
                    .css({
                        'max-height':'','height':'','transition':''
                    })
                    .find(" > .modal-container").css({
                        'height':''
                    }).removeAttr("tabindex");
                } else if (modalWrapClass.indexOf('_center') !== -1) {
                    $modal
                    .removeClass('is-active')
                    .css({
                        'height':'',
                        'max-height':''
                    })
                    .hide();
                    $modalWrap
                    .css({
                        'max-height':'',
                    })
                    .find(" > .modal-container").css({
                        'max-height':''
                    }).removeAttr("tabindex");
                } else if (modalWrapClass.indexOf('_bottom') !== -1) {
                    $modal.animate({
                        bottom: '-100%'
                    }, 300, function() {
                        $modal
                        .removeClass('_is-active')
                        .css({
                            'height':'',
                            'max-height':''
                        })
                        .hide();
                        $modalWrap
                        .css({
                            'max-height':'',
                        })
                        .find(" > .modal-container").css({
                            'max-height':''
                        }).removeAttr("tabindex");
                    });
                }
                
                self.rtFocus($(this));

                $modal.attr({'aria-hidden': 'true'}).removeAttr('tabindex').focus();
                $modalWrap.attr({'aria-modal': 'false'})
                    .find('h1, h2, h3, h4, h5, h6').first().removeAttr('tabindex');

                $('body').removeClass('no-scroll');
                $(this).closest('.modalPop').prev().focus();
                $('.dimmed').remove();
            });
        },

        rtFocus: function(){
            $('._rtFocus').focus();
            setTimeout(function() {
                $('._rtFocus').removeClass('_rtFocus');
            }, 1000);
        },

        // toast pop
        toastPop: function() {
            const self = this;
            
            // 토스트 팝업 생성 함수
            function createToast(toastMsg) {
                const toastWrapTemplate = $('<div>', {
                'class': 'toastWrap',
                'role': 'alert',
                'aria-live': 'assertive',
                'tabindex': '0'
                }).append(
                    $('<div>', {'class': 'toast-msg'}).html(toastMsg),
                    $('<a>', {
                        'class': 'btn ico-close',
                        'href': '#',
                        'aria-label': 'Close'
                    }).attr("tabindex", "-1").append(
                        $('<span>', {'class': 'hide'}).text('토스트팝업닫기')
                    )
                );
            
                $('body').append(toastWrapTemplate);
            
                const toast = $('.toastWrap');
                const $icoClose = $('.ico-close');
                
                toast.on('keydown', function(event) {
                    toast.addClass('_is-keyEvent');                
                    $icoClose.addClass('_is-active').attr("tabindex", "0");
                    if (event.key === 'Escape') {
                        $icoClose.click();
                    } else if (event.key === 'Tab') {
                        event.preventDefault();
                        const focusableElements = toast.find('.ico-close._is-active, [tabindex]');
                        const $firstElement = focusableElements.first();
                        const $lastElement = focusableElements.last();
                        if (event.shiftKey) {
                            $lastElement.focus();
                        } else {
                            $firstElement.focus();
                        }
                    }
                });
                
                const closeClickHandler = function() {
                    toast.removeClass('_is-keyEvent');
                    
                    toast.fadeOut(function() {
                    if (toast.hasClass('toastWrap')) {
                        toast.remove();
                    }
                    $('._toastBtn._rtFocus').focus().removeClass('_rtFocus');
                    });
                };
                
                $icoClose.on('click', closeClickHandler);
                
                const focusableElements = toast.find('.ico-close._is-active, [tabindex]');
                focusableElements.first().focus();
                
                const timer = setTimeout(function() {
                    if (toast.hasClass('_is-keyEvent')) {
                        return;
                    }
                    closeClickHandler();
                }, 3000);
            }
            
            $('._toastBtn').on('click', function() {
                $('._toastBtn._rtFocus').removeClass('_rtFocus');
                $(this).addClass('_rtFocus');
            
                const toastMsg = $(this).attr('data-toast');
                createToast(toastMsg);
            });
        }
        
    };

    cp.init = function () {
        // cp.frontUI.init();
        cp.form.init();
        cp.selectPop.init(); // 바텀시트 select
        cp.modalPop.init();
    };

    cp.init();
    return cp;
}(window.COMPONENT_UI || {}, jQuery));
