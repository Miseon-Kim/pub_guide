var COMPONENT_UI = (function (cp, $) {

    /* 브라우저 & 디바이스버전 체크 */
    cp.uaCheck = {
        init: function () {
            this.addChkClass();
        },
        browserCheck: function () {
            var user = window.navigator.userAgent.toLowerCase();
            var isIE = user.indexOf("trident") > -1 || user.indexOf("msie") > -1;

            if (isIE) {
                var ieVersion = this.getIEVersion();
                var browser = "ie";

                if (ieVersion > 0 && ieVersion <= 8) {
                    browser += " ie" + ieVersion;
                }
            } else {
                var browser = user.indexOf("edge") > -1 ? "edge"
                    : user.indexOf("edg/") > -1 ? "edge(chromium based)"
                        : user.indexOf("opr") > -1 ? "opera"
                            : user.indexOf("chrome") > -1 ? "chrome"
                                : user.indexOf("firefox") > -1 ? "firefox"
                                    : user.indexOf("safari") > -1 ? "safari"
                                        : user.indexOf("whale") > -1 ? "whale"
                                            : "other_browser";
            }

            return browser;
        },
        getIEVersion: function () {
            var ua = window.navigator.userAgent;
            var msie = ua.indexOf("MSIE ");
            if (msie > 0) {
                return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
            }

            var trident = ua.indexOf("Trident/");
            if (trident > 0) {
                var rv = ua.indexOf("rv:");
                return parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10);
            }

            var edge = ua.indexOf("Edge/");
            if (edge > 0) {
                return parseInt(ua.substring(edge + 5, ua.indexOf(".", edge)), 10);
            }
            return -1;
        },
        mobileCheck: function () {
            var user = navigator.userAgent;
            var mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            var versionAos = this.getAOSVersion();
            var versionIos = this.getIOSVersion();

            if (mobile) {
                mobile = user.match(/lg/i) != null ? "lg"
                    : user.match(/iphone|ipad|ipod/i) != null ? "ios"
                        : user.match(/iphone.*mini|ipad.*mini/i) != null ? "ios_mini"
                            : user.match(/android/i) != null ? "aos"
                                : "other_mobile";

                if (mobile === "aos") {
                    if (versionAos > 0 && versionAos <= 7) {
                        mobile += "_old";
                    }
                    console.log('AOS ver : ', versionAos);
                } else if (mobile === "ios") {
                    if (versionIos) {
                        var major = versionIos[0];
                        var minor = versionIos[1];
                        console.log('IOS ver : ', major + '.' + minor);
                        if (major < 15 || (major === 15 && minor <= 3)) {
                            mobile += "_old";
                        }
                    }
                }
            } else {
                mobile = this.browserCheck();
            }

            return mobile;
        },
        getAOSVersion: function () {
            var ua = navigator.userAgent;
            var match = ua.match(/Android\s([0-9]+(?:\.[0-9]+)*)/);
            return match ? match[1] : -1;
        },
        getIOSVersion: function () {
            var ua = navigator.userAgent;
            var match = ua.match(/OS (\d+)_(\d+)_?(\d+)?/);
            if (match) {
                return [parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3] || 0, 10)];
            }
            return null;
        },
        addChkClass: function () {
            var browser = this.browserCheck();
            var device = this.mobileCheck();

            $('html').addClass(browser).addClass(device);
        },
    },

    /* COMMON UI */
    cp.btnFn = {
        init: function () {
            this.btnStatus();
        },
        btnStatus: function(callback) {
            $(".btn").each(function() {
                const _this = $(this);
                const _btnUseChk = _this.attr("btn-active");
                const _loadingCont = $('<div class="loadingData"><i></i><i></i><i></i></div>');
    
                if (_btnUseChk === false || _btnUseChk === "false") {
                    _this.addClass("disabled").removeClass("loading").find(".loadingData").remove();
                } else if (_btnUseChk === "loading") {
                    _this.addClass("loading").removeClass("disabled").append(_loadingCont);
                } else {
                    _this.removeClass("disabled loading").find(".loadingData").remove();
                }
            });
    
            // 콜백 함수를 호출하여 btn-active의 상태를 변경
            if (callback && typeof callback === "function") {
                callback();
            }
        },
    },
    cp.tblCaption = {
        init: function () {
            this.tblSetting();
            this.tblCellsUpdate();
        },
        tblSetting: function () {
            $('table').each(function () {
                $(this).removeAttr('summary');

                var hasHeader = $(this).find('th').length > 0;

                if (!hasHeader) {
                    $(this).find('caption').remove();
                } else {
                    cp.tblCaption.processCaption.call(this);
                }
            });
        },
        tblCellsUpdate: function () {
            var theadCells = $('thead th');
            var tbodyCells = $('tbody th, tfoot th');
            var tdCells = $('tbody td, tfoot td');

            function updateCells(cells, scopeType) {
                cells.each(function () {
                    $(this).removeAttr('scope');

                    if ($(this).is('th:not([scope])')) {
                        $(this).attr('scope', scopeType);
                    }
                    var colSpanGroup = $(this).attr('colspan');
                    if (colSpanGroup !== undefined && colSpanGroup > 1) {
                        $(this).attr('scope', 'colgroup');
                    }
                    var rowSpanGroup = $(this).attr('rowspan');
                    if (rowSpanGroup !== undefined && rowSpanGroup > 1) {
                        $(this).attr('scope', 'rowgroup');
                    }
                });
            }

            updateCells(theadCells, 'col');
            updateCells(tbodyCells, 'row');
            updateCells(tdCells, '');
        },

        processCaption: function () {
            var captionType = $(this).data('caption');
            var dataTblTit = $(this).data('tbl');
            var tblCaption = $(this).find('caption');

            if (tblCaption.hasClass("processedCaption") && captionType !== "innerTbl") {
                return;
            }

            if (captionType === 'basic') {
                // basic 타입인 경우
                tblCaption.remove();

                $(this).find('th').each(function () {
                    var thHTML = $(this).html();
                    $(this).replaceWith('<td>' + thHTML + '</td>');
                });
            } else if (captionType === 'keep') {
                // keep 타입인 경우 기존 caption 정보를 유지함
            } else {
                cp.tblCaption.handleRegularTbl.call(this);
            }
        },


        handleRegularTbl: function () {
            var tblCaption = $(this).find('caption');
            var currentCaptionTit = $(this).data('tbl') || tblCaption.text().trim();
            var tblColgroup = $(this).find('colgroup');
            var captionText = $(this).find('> thead > tr > th, > tbody > tr > th').map(function () {
                return $(this).text();
            }).get().join(', ');

            tblCaption.remove();

            if (tblColgroup.length > 0) {
                var captionHtml = cp.tblCaption.getCaptionHtml(currentCaptionTit, captionText);
                tblColgroup.before(captionHtml);
            } else {
                cp.tblCaption.insertCaption.call(this, tblCaption, cp.tblCaption.getCaptionHtml(currentCaptionTit, captionText));
            }
        },

        insertCaption: function (tblCaption, captionHtml) {
            var tableThead = $(this).find('thead');
            var tableTbody = $(this).find('tbody');

            if (tableThead.length > 0) {
                tableThead.before(captionHtml);
            } else {
                tableTbody.before(captionHtml);
            }
        },

        getCaptionHtml: function (title, text) {
            return '<caption class="processedCaption"><strong>' + title + '</strong><p>' + text + ' 로 구성된 표' + '</p></caption>';
        },
    },
    cp.form = {
        constEl: {
            inputDiv: $("._input"),
            inputSelector: "._input > input:not([type='radio']):not([type='checkbox']):not(.exp input)",
            inputExpSelector: ".exp input",
            clearSelector: "._input-clear",
            labelDiv: $("._label")
        },

        init: function () {
            this.input(this.inputSetting.bind(this));
            this.inpClearBtn(this.clearBtnCallback);
            this.secureTxt();
            this.inpReadonly();
            this.lbPlaceHolder();
            this.inputRange(this.inputRangeCallback);
            this.inputRangeDouble(this.inputRangeDoubleCallback);
        },

        inputSetting: function () {
            const inputSelector = this.constEl.inputSelector;

            $(inputSelector).each(function () {
                const parentInput = $(this).closest('._input'),
                    labelElOut = parentInput.parent().siblings("label"),
                    labelElIn = parentInput.siblings("label");

                // 현재 input의 id를 가져옵니다.
                let inputId = parentInput.parent().find('._input:first-of-type input').attr('id');

                // id가 없을 경우 임의의 id 생성
                if (!inputId) {
                    inputId = 'input_' + Math.random().toString(36).substr(2, 9); // 랜덤 id 생성
                    $(this).parent().parent().find('._input:first-of-type input').attr('id', inputId); // 생성한 id를 input에 설정
                }

                // data-target을 설정
                parentInput.parent().find('._input:first-of-type').attr('data-target', inputId);

                // label의 for 속성 및 data-name 설정
                labelElOut.attr({ 'for': inputId, 'data-name': inputId });
                labelElIn.attr({ 'for': inputId });

                // placeholder 값을 title 속성으로 설정
                var placeholderValue = $(this).attr('placeholder');
                $(this).attr('title', placeholderValue);
            });

            // data-name이 정의된 경우 해당 값을 for에 적용
            $(inputSelector).each(function () {
                const parentInput = $(this).closest('._input');
                const dataName = parentInput.attr('data-name');

                if (dataName) {
                    parentInput.attr('id', dataName); // data-name 값을 id로 설정
                    parentInput.parent().siblings("label").attr('for', dataName);
                }
            });

            // 콜백 실행
            if (typeof this.inputSettingCallback === "function") {
                this.inputSettingCallback();
            }
        },

        // _label 붙은 input타입 스크립트
        lbPlaceHolder: function (callback) {
            const labelDiv = this.constEl.labelDiv.find(".field-label:not(._address)");

            $(labelDiv).each(function () {
                const $fieldLabel = $(this),
                    $fieldBox = $fieldLabel.parents(".field"),
                    $fieldOutline = $fieldLabel.parents(".field-outline"),
                    $fieldInputs = $fieldBox.find("input"),
                    self = this;

                $fieldLabel.attr({
                    "tabindex": "0", // 키보드 접근을 위한 tabindex 설정
                    "role": "button", // 라벨을 버튼으로 인식하도록 설정
                    "aria-pressed": "false", // 버튼 상태 초기화
                    "aria-label": $fieldLabel.text() // 라벨의 텍스트를 aria-label로 설정
                });

                // '_is-active' 클래스에 따라 '_hasValue' 클래스를 토글하는 함수
                function hasValue() {
                    if ($fieldLabel.hasClass('_is-active')) {
                        $fieldOutline.addClass('_hasValue');
                        $fieldLabel.attr("aria-pressed", "true"); // 라벨이 활성화되면 aria-pressed를 true로 변경
                    } else {
                        $fieldOutline.removeClass('_hasValue');
                        $fieldLabel.attr("aria-pressed", "false"); // 비활성화되면 false로 변경
                    }
                }

                // 라벨 클릭 시 실행되는 함수 (콜백 포함)
                function handleLabelClick() {
                    $(this).addClass('_is-active');
                    $fieldOutline.addClass('_is-active');

                    // '_is-active' 상태에 따라 '_has-value' 클래스를 토글하는 함수 호출
                    hasValue();

                    // input 포커스 시 화면 스크롤 이동
                    const target = $(this),
                        targetOffset = target.offset().top - 120,
                        docH = $(document).height(),
                        winH = $(window).height();

                    if (docH - targetOffset < winH) {
                        $(".containerWrap").addClass("scroll-space");
                    }
                    $("html, body").animate({ scrollTop: targetOffset }, 500);

                    // 콜백 함수가 전달되었을 때 실행
                    if (typeof callback === 'function') {
                        callback(); // 라벨 클릭 시에만 콜백이 실행됨
                    }
                }

                // 포커스 아웃 시 실행되는 함수
                function handleFocusOut() {
                    // 입력값이 없고 포커스가 $fieldOutline 밖으로 나갈 때
                    if ($fieldInputs.val().trim() === "") {
                        $fieldLabel.removeClass('_is-active');
                        hasValue();
                    }
                }

                // 포커스 인 시 실행되는 함수
                function handleFocusIn() {
                    // 입력 필드 간에 포커스 이동 시 _hasValue 유지
                    $fieldLabel.addClass('_is-active');
                    $fieldOutline.addClass('_is-active');
                    hasValue();
                }

                // 문서 클릭 시 실행되는 함수
                function handleDocumentClick(e) {
                    if (!$(e.target).closest($fieldBox).length) {
                        // 입력값이 없을 때 '_is-active' 클래스를 제거
                        if ($fieldInputs.val().trim() === "") {
                            $fieldLabel.removeClass('_is-active');
                            hasValue();
                        }
                    }
                }

                // 키보드 이벤트 핸들러 추가
                function handleKeydown(e) {
                    if (e.key === "Enter" || e.key === " ") { // Enter 또는 Space 키 확인
                        e.preventDefault(); // 기본 동작 방지
                        handleLabelClick.call($fieldLabel); // 클릭 핸들러 호출
                    }
                }

                // 기존 이벤트 핸들러 제거 (중복 방지)
                $fieldLabel.off("click", handleLabelClick);
                $fieldLabel.off("keydown", handleKeydown);
                $(document).off("click", handleDocumentClick);
                $fieldInputs.off("focusout", handleFocusOut);
                $fieldInputs.off("focusin", handleFocusIn);

                // 라벨 클릭 시 이벤트 핸들러 등록
                $fieldLabel.on("click", handleLabelClick);

                // 키보드 이벤트 핸들러 등록
                $fieldLabel.on("keydown", handleKeydown);

                // 문서 클릭 시 이벤트 핸들러 등록
                $(document).on("click", handleDocumentClick);

                // 입력 필드 포커스 아웃 시 이벤트 핸들러 등록
                $fieldInputs.on("focusout", handleFocusOut);

                // 입력 필드 포커스 인 시 이벤트 핸들러 등록
                $fieldInputs.on("focusin", handleFocusIn);
            });

            /*
            // 예시: lbPlaceHolder 호출 및 콜백 함수 정의
            $('.your-selector').lbPlaceHolder(function() {
                // 이곳에 콜백 함수의 내용을 작성합니다.
                console.log('라벨이 클릭되었습니다!');
                // 추가적인 동작을 여기에 구현할 수 있습니다.
                alert('라벨 클릭 콜백 실행');
            });
            */
        },


        input: function (callback) {
            const inputSelector = this.constEl.inputSelector,
                inputExpSelector = this.constEl.inputExpSelector,
                clearSelector = this.constEl.clearSelector;

            $(inputExpSelector).each(function () {
                const $inputTxt = $(this);
                $inputTxt
                    .on("keyup focus input", function () {
                        $inputTxt.parent().parent().addClass("_is-active");
                    })
                    .on("blur focusout", function () {
                        setTimeout(function () {
                            $inputTxt.parent().removeClass('_hasClear');
                            $inputTxt.removeClass('_is-active').parents(".field-outline").removeClass("_is-active");
                        }, 100);
                    });
            });

            $(inputSelector).each(function () {
                const $inputTxt = $(this);
                if ($inputTxt.prop("readonly") || $inputTxt.prop("disabled")) {
                    return;
                }
                $(this).parent().append('<button type="button" class="field-btn _input-clear"><span class="hide">입력값삭제</span></button>');
                function activateClearBtn() {
                    const $clearBtn = $inputTxt.parent().find(clearSelector);

                    if ($(".field-outline").hasClass('_is-active')) {
                        $(this).addClass("_is-active");
                    }

                    if ($('html').hasClass("ios") || $('html').hasClass("ios_old")) {
                        $inputTxt.parent().attr({ "contenteditable": "false" });
                    }

                    if ($inputTxt.val()) {
                        $inputTxt.parent().addClass("_hasClear");
                        $clearBtn.addClass("_active");
                        if ($inputTxt.hasClass('_money')) {
                            $inputTxt.addClass('_is-active');
                        }
                    } else {
                        $inputTxt.parent().removeClass('_hasClear');
                        $clearBtn.removeClass("_active");
                        $inputTxt.removeClass('_is-active');
                    }
                }
                $inputTxt
                    .on("keyup focus-in focus input", function () {
                        setTimeout(function () {
                            $inputTxt.parent().parent().addClass("_is-active");
                            activateClearBtn();
                        }, 100);
                    })
                    .on("blur focusout", function () {
                        setTimeout(function () {
                            $inputTxt.parent().removeClass('_hasClear');

                            if ($inputTxt.hasClass('_money')) {
                                $inputTxt.parents(".field-outline").removeClass("_is-active");
                                $inputTxt.addClass('_is-active');
                            }

                            if (!$inputTxt.val()) {
                                $inputTxt.removeClass('_is-active').parents(".field-outline").removeClass("_is-active");
                                $inputTxt.parent(".field-label").removeClass("_is-active");
                                // $inputTxt.removeClass('_is-active');
                            }
                        }, 100);
                    });
            });

            // 콜백 실행
            if (typeof callback === "function") {
                callback();
            }
        },

        inpClearBtn: function (callback) {
            const inputSelector = this.constEl.inputSelector,
                clearSelector = this.constEl.clearSelector;

            $('body, html').on("mousedown touchstart keydown", clearSelector, function (e) {
                if (e.type === "keydown" && e.which !== 13) return;
                e.preventDefault();
                var clearBtn = $(this),
                    inputTxt = clearBtn.siblings(inputSelector);

                setTimeout(function () {
                    if ($('html').hasClass("ios") || $('html').hasClass("ios_old")) {
                        inputTxt.val('').trigger('input').focus();
                        inputTxt.parent().attr({ "contenteditable": "true" }).focus();

                        setTimeout(function () {
                            inputTxt.focus();
                        }, 100);

                        inputTxt.parent().removeClass('_hasClear').removeAttr('contenteditable');
                    } else {
                        // inputTxt.css({ width: "calc(100% - 3.2rem)" }).val('').focus();
                        inputTxt.val('').focus();

                        setTimeout(function () {
                            inputTxt.focus();
                        }, 100);

                        inputTxt.parent().removeClass('_hasClear');
                    }
                }, 100);
            });

            $(clearSelector).on("focus", function () {
                $(this).addClass("_active");
            }).on("blur", function () {
                $(this).removeClass("_active");
            });

            $("input").on("compositionstart compositionupdate compositioned input", function (event) {
                var $input = $(this);
                if (event.type === 'compositioned') {
                    $input.trigger("input");
                }
            });

            // 콜백 실행
            if (typeof callback === "function") {
                callback();
            }
        },

        // 비밀번호 특수문자 모양
        secureTxt: function (callbacks = {}) {
            $('._secureTxt').each(function () {
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

                    // Call the focus callback if provided
                    if (callbacks.onFocus) {
                        callbacks.onFocus(secureField);
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

                    // Call the change callback if provided
                    if (callbacks.onChange) {
                        callbacks.onChange(secureField, value);
                    }
                }

                function handleInputKeyUp(event) {
                    if (event.keyCode === 8) {
                        var secureField = $(event.target).closest("._secureTxt");
                        secureField.find("i._line").eq(event.target.value.length).removeClass("_is-active");
                    }

                    // Call the keyup callback if provided
                    if (callbacks.onKeyUp) {
                        callbacks.onKeyUp(secureField, event);
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

                // 보안키패드 연동시 아래 키 이벤트 부분 막아야 함
                inputField.on("focus", handleInputFocus)
                    .on("input", handleInputChange)
                    .on("keyup", handleInputKeyUp)
                    .on("blur", function () {
                        if (!inputField.val()) {
                            secureField.find("i._line").css({ opacity: "" }).removeClass("_is-active");
                        }
                    });
            });
            /* 페이지내 콜백호출 예시
            $('.your-selector').secureTxt({
                onFocus: function(secureField) {
                    console.log('Input focused:', secureField);
                },
                onChange: function(secureField, value) {
                    console.log('Input changed:', value);
                },
                onKeyUp: function(secureField, event) {
                    console.log('Key up event:', event);
                }
            });
            */
        },

        // readonly일 경우
        inpReadonly: function () {
            $("input").each(function () {
                var $input = $(this);
                /*
                if ($input.prop("readonly") || $input.prop("disabled")) {
                    $input.parent().addClass("_readonly");
                }
                */
                if ($input.prop("readonly")) {
                    $input.parent().addClass("_readonly");
                } else if ($input.prop("disabled")) {
                    $input.parent().addClass("_disabled");
                }
            });
        },

        // input:range
        inputRange: function (callback) {
            const rangeSelector = $('.range-slider');

            rangeSelector.each(function () {
                const rangeInput = $(this).find('._range');
                const rangeValue = $(this).find('._value');
                const rangeInfo = $(this).find('.range-info');

                rangeValue.each(function () {
                    const defaultvalue = rangeInput.attr('value');
                    const rangeValueText = rangeValue.attr('range-value'); // Get the range-value text
                    const innerValue = rangeValue.attr('inner-value') === "true"; // Check for inner-value attribute

                    // Set the initial value of the span
                    if (!rangeValueText) {
                        // If no range-value, set the span to the default input value
                        rangeValue.text(defaultvalue);
                    } else {
                        // Update span text based on inner-value
                        rangeValue.text(innerValue ? `${rangeValueText} (${defaultvalue})` : rangeValueText);
                    }

                    rangeInfo.css({
                        'left': defaultvalue + '%',
                        'margin-left': `-${rangeInfo.outerWidth() / 2}px`
                    });
                    rangeInput.css('background', `linear-gradient(to right, #333 ${defaultvalue}%, #ccc ${defaultvalue}%)`);
                });

                rangeInput.on('input', function () {
                    const rangeInputValue = Math.floor(this.value);
                    const newValue = Number(($(this).val() - $(this).attr('min')) * 100 / ($(this).attr('max') - $(this).attr('min')));
                    const newPosition = 8 - (newValue * 0.16);

                    rangeInput.attr('value', rangeInputValue);
                    const rangeValueText = rangeValue.attr('range-value'); // Get the range-value text
                    const innerValue = rangeValue.attr('inner-value') === "true"; // Check for inner-value attribute

                    // console.log("newValue:", newValue, "newPosition:", newPosition);

                    // Update span text based on the presence of range-value
                    if (!rangeValueText) {
                        // If no range-value, set the span to the current input value
                        rangeValue.text(rangeInputValue);
                    } else {
                        // Update span text based on inner-value
                        rangeValue.text(innerValue ? `${rangeValueText} (${rangeInputValue})` : rangeValueText);
                    }

                    rangeInfo.css({
                        'left': `calc(${newValue}% + (${newPosition}px))`,
                        'margin-left': `-${rangeInfo.outerWidth() / 2}px`
                    });

                    if (rangeInputValue == $(this).attr('min')) {
                        rangeInfo.addClass('left').removeClass('gap');
                    } else if (newValue <= $(this).attr('arrow-min')) {
                        rangeInfo.addClass('left gap');
                    } else if (rangeInputValue >= $(this).attr('max')) {
                        rangeInfo.addClass('right').removeClass('gap');
                    } else if (newValue >= $(this).attr('arrow-max')) {
                        rangeInfo.addClass('right gap');
                    } else {
                        rangeInfo.removeClass('left');
                        rangeInfo.removeClass('right');
                    }
                    rangeInput.css('background', `linear-gradient(to right, #333 ${newValue}%, #ccc ${newValue}%)`);

                    // Callback function
                    if (typeof callback === "function") {
                        callback(rangeInputValue);
                    }
                });
            });
        },

        // input:doublerange
        inputRangeDouble: function (callback) {
            const doubRangeBg = $(".slider-container .double-slider");
            const doubleInputRange = $(".range-slider.double .field-input input[type=range]");
            const dobuleInputNum = $(".range-slider.double .field-input input[type=number]");
            const minInfo = $('.doublerange-info.min');
            const minInfoValue = $('.doublerange-info ._value-min');
            const maxInfo = $('.doublerange-info.max');
            const maxInfoValue = $('.doublerange-info ._value-max');

            let doubleGap = 500; // 최소 gap(간격)

            // 슬라이더와 정보를 업데이트하는 함수
            function updateRangeInfo(value, infoElement, infoValueElement, isMin) {
                const rangeMessage = infoValueElement.attr('range-value');
                if (rangeMessage && infoValueElement.attr('inner-value') === 'true') {
                    infoValueElement.text(`${rangeMessage}(${value})`);
                } else {
                    infoValueElement.text(value);
                }

                // 슬라이더의 최대값을 기준으로 백분율 계산
                let sliderMaxValue = doubleInputRange.eq(0).attr('max');
                let percentage = (value / sliderMaxValue) * 100;  // 현재 값의 백분율
                let pixelPercentage = (percentage / 100) * window.innerWidth;  // 백분율을 픽셀로 변환
                let elementWidth = infoElement.outerWidth() / 2;  // 요소의 너비를 절반으로 나눈 값
                let parentWidth = infoElement.parent(".field-input").width();  // 부모 요소의 너비

                if (isMin) {
                    infoElement.css({
                        'left': pixelPercentage < elementWidth ? `${percentage * 0}%` : `${percentage}%`,
                        // 만약 백분율에 해당하는 픽셀 값이 요소 너비의 절반보다 작은 경우
                        'margin-left': pixelPercentage < elementWidth ? `0` : `-${elementWidth}px`
                    });
                } else {
                    infoElement.css({
                        'right': (parentWidth - (elementWidth / 2)) < pixelPercentage ? `${elementWidth}px` : `${100 - percentage}%`,
                        // margin-right를 0 또는 elementWidth에 따라 설정
                        'margin-right': (parentWidth + infoElement.outerWidth()) < pixelPercentage ? `0` : `-${elementWidth}px`
                    });
                    // console.log(parentWidth, pixelPercentage, elementWidth);
                }

            }

            // 슬라이더 및 배경 범위를 설정하는 함수
            function rangeInputWidth() {
                let minVal = parseInt(doubleInputRange.eq(0).val());
                let maxVal = parseInt(doubleInputRange.eq(1).val());
                let diff = maxVal - minVal;

                // 최소, 최대값이 설정된 간격(doubleGap)보다 좁을 경우 값 고정
                if (diff < doubleGap) {
                    if ($(this).hasClass("min-range")) {
                        doubleInputRange.eq(0).val(maxVal - doubleGap); // 최소값 슬라이더가 최대값을 넘지 않도록 설정
                    } else {
                        doubleInputRange.eq(1).val(minVal + doubleGap); // 최대값 슬라이더가 최소값 이하로 내려가지 않도록 설정
                    }
                } else {
                    dobuleInputNum.eq(0).val(minVal);
                    dobuleInputNum.eq(1).val(maxVal);

                    updateRangeInfo(minVal, minInfo, minInfoValue, true);
                    updateRangeInfo(maxVal, maxInfo, maxInfoValue, false);

                    doubRangeBg.css("left", `${(minVal / doubleInputRange.eq(0).attr("max")) * 100}%`);
                    doubRangeBg.css("right", `${100 - (maxVal / doubleInputRange.eq(1).attr("max")) * 100}%`);
                }

                // 콜백 함수 호출
                if (typeof callback === "function") {
                    callback(minVal, maxVal);
                }
            }

            rangeInputWidth(); // 초기화 시 실행

            // 숫자 입력 이벤트 처리 (사용자가 숫자를 직접 입력할 때)
            dobuleInputNum.on("input", function () {
                let minp = parseInt(dobuleInputNum.eq(0).val());
                let maxp = parseInt(dobuleInputNum.eq(1).val());
                let diff = maxp - minp;

                // 최소, 최대값이 doubleGap보다 크고 최대값이 max를 초과하지 않는 경우
                if (diff >= doubleGap && maxp <= doubleInputRange.eq(1).attr("max")) {
                    if ($(this).hasClass("min-input")) {
                        doubleInputRange.eq(0).val(minp);
                        let value1 = doubleInputRange.eq(0).attr("max");
                        doubRangeBg.css("left", `${(minp / value1) * 100}%`);
                        updateRangeInfo(minp, minInfo, minInfoValue, true);
                    } else {
                        doubleInputRange.eq(1).val(maxp);
                        let value2 = doubleInputRange.eq(1).attr("max");
                        doubRangeBg.css("right", `${100 - (maxp / value2) * 100}%`);
                        updateRangeInfo(maxp, maxInfo, maxInfoValue, false);
                    }
                }
            });

            // 슬라이더 드래그 이벤트 처리
            doubleInputRange.on("input", function () {
                let minVal = parseInt(doubleInputRange.eq(0).val());
                let maxVal = parseInt(doubleInputRange.eq(1).val());

                // 최소값 슬라이더가 최대값을 넘지 않도록 제한
                if (minVal >= maxVal - doubleGap) {
                    if ($(this).hasClass("min-range")) {
                        doubleInputRange.eq(0).val(maxVal - doubleGap);
                    } else {
                        doubleInputRange.eq(1).val(minVal + doubleGap);
                    }
                }
                rangeInputWidth();
            });
        }

    },
    cp.selectPop = {
        constEl: {
            btnSelect: "._selectBtn",
            // dimmedEl: $('<div class="dimmed" aria-hidden="true"></div>') // 딤 사용하지 않음
        },
        init: function (callbacks = {}) {
            this.callbacks = callbacks; // 콜백을 저장
            this.openSelect();
            this.optSelect();
        },

        openSelect: function () {
            const self = this,
                btnSelect = this.constEl.btnSelect;
            $(document).on('click', btnSelect, function () {
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
                        const $newActiveOption = $select.find('.select-lst > li > a').filter(function () {
                            return $(this).text() === btnText;
                        }).parent();
                        $newActiveOption.addClass('_is-active');
                    } else {
                        $activeOption.addClass('_is-active');
                    }
                }

                $btn.addClass('_selectTxt _rtFocus');
                cp.modalPop.layerFocusControl($(this));
                self.showSelect($(this));

                // 콜백 함수 호출 (선택된 버튼)
                if (self.callbacks.onOpen) {
                    self.callbacks.onOpen($btn);
                }
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
                    .addClass('_scroll')
                    .animate({ bottom: '0' }, 300).show();
                $selectWrap
                    .find(" > .modal-container").css({ 'max-height': winHeight - (selectTitHeight + selectBtnHeight) - 160 + 'px' }).attr("tabindex", "0");
            } else {
                $select
                    .animate({ bottom: '0' }, 300).show();
            }

            $select.attr({ 'aria-hidden': 'false', 'tabindex': '0' }).focus();
            $selectWrap.attr({ 'role': 'dialog', 'aria-modal': 'true' })
                .find('h1, h2, h3, h4, h5, h6').first().attr('tabindex', '0');

            // dimmedEl.remove();
            $('body').addClass('no-scroll');
            // $('body').addClass('no-scroll').append(dimmedEl);

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

                // 콜백 함수 호출 (선택된 옵션)
                if (self.callbacks.onSelect) {
                    self.callbacks.onSelect(selectedText);
                }
            });
        }

        /*
        callbacks 호출예시
        cp.selectPop.init({
            onOpen: function($button) {
                console.log("모달이 열렸습니다: ", $button.text());
            },
            onSelect: function(selectedText) {
                console.log("선택된 옵션: ", selectedText);
            }
        });
        */
    },

    cp.modalPop = {
        constEl: {
            btnModal: "._modalBtn", // 모달 버튼 선택자
            // dimmedEl: $('<div class="dimmed" aria-hidden="true"></div>') // dimmed 배경 요소
        },
        isOpen: false, // 모달 열림 상태를 관리하는 플래그
        init: function () {
            this.openPop(); // 모달 열기 이벤트 초기화
            this.closePop(); // 모달 닫기 이벤트 초기화
            $(".modalPop").attr({ 'aria-hidden': 'true' });
        },

        openPop: function () {
            const self = this,
                btnModal = this.constEl.btnModal;

            $('html, body').on('click', btnModal, function () {

                if (!self.isOpen) { // 모달이 열려 있지 않은 경우에만 실행
                    $(this).addClass('_rtFocus'); // 포커스 클래스 추가
                    self.showModal($(this)); // 모달 표시
                    self.layerFocusControl($(this)); // 포커스 제어
                }

                if ($(this).is(".modalPop._is-active ._modalBtn")) {
                    $(this).removeClass('_rtFocus').addClass('_rtFocus2');
                }
            });
        },

        showModal: function ($btn) {
            const self = this,
                dimmedEl = this.constEl.dimmedEl;
            const target = $btn.attr('data-modal');
            const $modal = $('.modalPop[modal-target="' + target + '"]');
            var $modalWrap = $modal.find("> .modalWrap");

            $modal.addClass('_is-active').attr({ 'aria-hidden': 'false' });
            $modalWrap.attr({ 'role': 'dialog', 'aria-modal': 'true' })
                .find('a, *[role="button"], button, h1, h2, h3, h4, h5, h6').first().each(function () {
                    if ($(this).is('h1, h2, h3, h4, h5, h6')) {
                        $(this).attr('tabindex', '0');
                    }
                });

            if ($(".ico-tooltip._is-active").length) {
                // cp.toolTip.closeTip() 호출
                cp.toolTip.closeTip();
            }
            // $modal 안에 .ico-tooltip 요소가 존재하는지 확인
            if ($modal.find(".ico-tooltip").length) {
                // _inModal 클래스 추가
                $modal.find('.ico-tooltip').addClass('_inModal');
            }

            setTimeout(function () {
                $modalWrap.find(".ico-his-prev").focus()
                var firstFocusable;

                // .modal-header가 있을 경우
                if ($modalWrap.find('.modal-header').length) {
                    firstFocusable = $modalWrap.find('.modal-header').find('a.ico-his-prev, a, *[role="button"], button, h1, h2, h3, h4, h5, h6').first();
                } else {
                    // .modal-header가 없을 경우
                    firstFocusable = $modalWrap.find('a.ico-his-prev, a, *[role="button"], button, h1, h2, h3, h4, h5, h6').first();
                }

                if (firstFocusable.length) {
                    firstFocusable.focus();
                }
            }, 300);
            // dimmedEl.remove(); 
            // $('body').addClass('no-scroll').append(dimmedEl);
            $('body').addClass('no-scroll');

        },

        closePop: function () {
            const self = this;
            $('.modalPop').on('click', '.btn-close-pop', function () {
                var $modal = $(this).closest('.modalPop'); // 닫으려는 모달 선택
                var $modalWrap = $modal.find("> .modalWrap"); // 모달 래퍼 선택
                var modalWrapClass = $modal.attr('class'); // 모달 클래스 가져오기

                if ($modal.hasClass("_scroll")) {
                    $modal.removeClass('_is-active');
                    $modalWrap.css({
                        'max-height': '', 'height': '', 'transition': ''
                    }).find(" > .modal-container").css({
                        'height': ''
                    }).removeAttr("tabindex");
                    self.isOpen = false; // 모달 닫힘 상태로 변경
                } else {
                    $modal.removeClass('_is-active');
                    self.isOpen = false; // 모달 닫힘 상태로 변경
                }

                // _inModal 클래스가 존재할 경우 closeTip() 실행
                if ($('.ico-tooltip').hasClass('_inModal')) {
                    cp.toolTip.closeTip();
                }

                if ($("._modalBtn").hasClass("_rtFocus2")) {
                    setTimeout(function () {
                        $('._rtFocus2').focus();
                        $('._rtFocus2').removeClass('_rtFocus2');
                    }, 300);
                } else {
                    // 포커스 관리
                    self.rtFocus($(this));
                }

                $modal.attr({ 'aria-hidden': 'true' });
                $modalWrap.attr({ 'aria-modal': 'false' }).removeAttr('tabindex')
                    .find('a, button, h1, h2, h3, h4, h5, h6').first().removeAttr('tabindex');

                $(this).closest('.modalPop').prev().focus(); // 이전 요소에 포커스
                // $('.dimmed').remove(); // dimmed 요소 제거
                if ($(".modalPop._is-active").length === 0) {
                    $('body').removeClass('no-scroll'); // 스크롤 활성화
                }
            });
        },

        rtFocus: function () {
            setTimeout(function () {
                $('._rtFocus').focus();
                $('._rtFocus').removeClass('_rtFocus');
            }, 300);
        },

        // 탭으로 포커스 이동 시 팝업이 열린상태에서 팝업 내부해서만 돌도록 제어하는 함수
        layerFocusControl: function ($btn) {
            const target = $btn.attr('data-modal') || $btn.attr('data-select');
            const $modal = $('.modalPop[modal-target="' + target + '"], .modalPop[select-target="' + target + '"]');
            var $modalWrap = $modal.find("> .modalWrap");

            var $firstEl = $modalWrap.find('a, button, h1, h2, h3, h4, h5, h6, input, textarea, select, [tabindex]:not([tabindex="-1"])').first();
            var $lastEl = $modalWrap.find('a, button, h1, h2, h3, h4, h5, h6, input, textarea, select, [tabindex]:not([tabindex="-1"])').last();

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
    },

    cp.toast = {
        init: function () {
            // this.toastPop(); // 토스트 팝업 초기화
        },
        toastPop: function (callback) {
            const self = this;
            const toast = $('.toastWrap');
            const $toastMsg = toast.find(".toast-msg");
            const $icoClose = $('.ico-close');

            const closeClickHandler = function () {
                toast.removeClass('_is-keyEvent _is-active')
                    .attr({ "aria-hidden": "true" })
                    .removeAttr("aria-live tabindex");
                $toastMsg.removeAttr("tabindex");
                $icoClose.removeClass('_is-active')
                    .attr({ "aria-hidden": "true" })
                    .removeAttr("tabindex");

                // 콜백 함수 호출 (포커스를 원하는 곳으로 이동)
                if (typeof callback === 'function') {
                    callback();
                } else {
                    // 콜백이 없을 경우 body로 포커스 이동
                    setTimeout(() => {
                        $('body').attr("tabindex", "0").focus().removeAttr("tabindex");
                    }, 100);
                }
            };

            if (!toast.hasClass('_is-active')) {
                setTimeout(() => {
                    toast.addClass('_is-active')
                        .attr({
                            "aria-hidden": "false",
                            "tabindex": "0",
                        }).focus();
                }, 500);

                const timer = setTimeout(() => {
                    if (!toast.hasClass('_is-keyEvent')) {
                        closeClickHandler();
                    }
                }, 3000);
            }

            toast.off('keydown').on('keydown', function (event) {
                if (toast.attr("aria-hidden") === "true") return; // aria-hidden이 true일 때 포커스 진입 방지
                if (!toast.hasClass('_is-active')) return; // 활성 상태일 때만 동작

                toast.addClass('_is-keyEvent');
                $toastMsg.attr("tabindex", "0").focus();
                $icoClose.addClass('_is-active')
                    .attr({ "aria-hidden": "false", "tabindex": "0" });

                const focusableElements = toast.find('.ico-close._is-active, [tabindex="0"]');
                const $firstElement = focusableElements.first();
                const $lastElement = focusableElements.last();

                if (event.key === 'Escape') {
                    closeClickHandler();
                } else if (event.key === 'Tab') {
                    event.preventDefault();
                    if (event.shiftKey) {
                        if ($(document.activeElement).is($firstElement)) {
                            $lastElement.focus();
                        }
                    } else {
                        if ($(document.activeElement).is($lastElement)) {
                            $firstElement.focus();
                        }
                    }
                }
            });

            // 닫기 버튼 클릭 시 토스트 닫기
            $icoClose.off('click').on('click', closeClickHandler);
            // 엔터 키에 대한 이벤트 핸들러 추가
            $icoClose.off('keydown').on('keydown', function (event) {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    closeClickHandler();
                }
            });

            // 첫 번째 포커스 가능한 요소로 포커스 이동
            setTimeout(function () {
                const focusableElements = toast.find('[tabindex="0"], .ico-close._is-active');
                focusableElements.first().focus();
            }, 600);
        },
        returnToast: function (focusTarget) {
            this.toastPop(function () {
                setTimeout(() => {
                    $(focusTarget).focus();
                }, 100);
            });
        }
    };

    cp.toolTip = {
        constEl: {
            tooltip: '.tooltip',
            content: '.tooltip-content',
            message: '.tooltip-message',
            close: '.tooltip-close',
            icoTip: '.ico-tooltip',
            top: '_top',
            default: '_default',
            bottom: '_bottom',
            left: '_left',
            active: '_is-active',
            duration: '250ms',
            easing: 'cubic-bezier(.86, 0, .07, 1)',
            space: 10,
            padding: 32
        },
        init() {
            this.openTip();
            this.closeTip();
            this.toolIndex();
            $('[data-tooltip]').hover(this.showTip.bind(this), this.openTip.bind(this), this.closeTip.bind(this));
        },
        toolIndex() {
            $('[data-toggle="tooltip"]').each(function (index) {
                const num = index + 1;
                const tooltipId = "toolTip_" + num;

                $(this).attr("aria-describedby", tooltipId);
            });
        },
        openTip: function () {
            const self = this;
            const $tooltipToggle = $('[data-toggle="tooltip"]');
            $tooltipToggle.click(function () {
                const $this = $(this);
                if (!$this.hasClass('_is-active')) {
                    $(".ico-tooltip._is-active").removeClass(cp.toolTip.constEl.active).focus();
                    self.showTip(event);
                    $this.addClass('_is-active');
                }
            });
        },
        closeTip() {
            const $tooltip = $(this.constEl.tooltip);
            if ($tooltip.length) {
                $(".ico-tooltip._is-active").removeClass(cp.toolTip.constEl.active).focus();
                $tooltip.removeClass('_is-active').remove();
            }
            return this;
        },

        focusControl: function () {
            const $tooltip = $(this.constEl.tooltip);

            const $firstEl = $tooltip.find('a, button, [tabindex]:not([tabindex="-1"])').first();
            const $lastEl = $tooltip.find('a, button, [tabindex]:not([tabindex="-1"])').last();

            $tooltip.on("keydown", function (e) {
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
        toolTipHtml(options) {
            const directionClass = this.constEl[options.direction];
            const messageHtml = options.message;

            const tooltipId = options.ariaDescribedBy;

            return `
                <div id="${tooltipId}" class="tooltip ${directionClass}" tabindex="0" role="tooltip">
                    <div class="tooltip-content">
                        <p class="tooltip-message">${messageHtml}</p>
                        <a href="javascript:void(0);" onclick="COMPONENT_UI.toolTip.closeTip()" class="ico-tooltip-close"><span class="hide">툴팁닫기</span></a>
                    </div>
                </div>
            `;
        },

        showTip(event) {
            const self = this;
            const $this = $(event.currentTarget);
            const options = {
                body: "body",
                selector: $this,
                container: $this.parent(),
                direction: $this.data('direction'),
                maxWidth: $this.attr('tip-maxWidth'), // maxWidth 값을 가져옵니다.
                message: $this.data('message'),
                ariaDescribedBy: $this.attr('aria-describedby')
            };
        
            const directionClass = this.constEl[options.direction];
            $this.addClass(`${cp.toolTip.constEl.active} ${directionClass}`);
        
            const $newTooltip = $(this.toolTipHtml(options));
        
            if ($this.hasClass('ico-tooltip') && $this.hasClass('_inModal')) {
                $newTooltip.addClass('_inModal');
            }
        
            if ($(options.body).find('.tooltip').length) {
                this.closeTip();
            }
        
            // tip-pos="modal" 속성 여부에 따라 append 위치를 변경
            const $tooltipWrap = $this.parent('.tooltipWrap');
            const $tooltipPosFixed = $tooltipWrap.is('[tip-pos="fixed"]');
            if ($tooltipPosFixed) {
                $tooltipWrap.after($newTooltip);
            } else {
                $tooltipWrap.append($newTooltip);
            }
        
            self.focusControl($(this));
        
            setTimeout(function () {
                // maxWidth가 존재하고 빈 값이 아닌 경우에만 max-width 스타일을 추가
                if (options.maxWidth && options.maxWidth !== "") {
                    $newTooltip.css({
                        'width':`${options.maxWidth}px`,
                        'max-width':`${options.maxWidth}px`
                    });
                }
        
                let $wrap = $tooltipWrap; // 기본적으로 tooltipWrap을 기준으로
                if ($tooltipPosFixed) {
                    $wrap = $this.closest('.modalWrap'); // tip-pos="modal"일 경우 modalWrap을 기준으로
                }
        
                const winW = $wrap.width();
                const winH = $wrap.outerHeight();
                const tooltipWidth = $newTooltip.outerWidth();
                const tooltipHeight = $newTooltip.outerHeight();
                const elWidth = $this.outerWidth();
                const elHeight = $this.outerHeight();
                const elOffsetT = $this.offset().top - $wrap.offset().top; // 기준 wrap에 대한 상대 위치
                const elOffsetL = $this.offset().left - $wrap.offset().left; // 기준 wrap에 대한 상대 위치
                let thisTooltip = $newTooltip;
        
                $wrap.removeClass('reverse');
        
                if (options.direction === 'default') { // 오른쪽에 노출
                    if ((elOffsetL + 20) >= (winW / 3)) {
                        cp.toolTip.calcRight(tooltipWidth, tooltipHeight, winW, elOffsetT, elOffsetL, thisTooltip);
                    } else {
                        $newTooltip.css({
                            top: elOffsetT - ((tooltipHeight / 2) - 10),
                            left: elOffsetL + 30,
                        });
                    }
                } else if (options.direction === 'left') { // 왼쪽에 노출
                    if ((elOffsetL + 20) >= (winW / 3) * 2) {
                        $newTooltip.css({
                            top: elOffsetT - ((tooltipHeight / 2) - 10),
                            left: elOffsetL - (tooltipWidth + 10),
                        });
                    } else {
                        cp.toolTip.calcLeft(tooltipWidth, tooltipHeight, elOffsetL, elOffsetT, thisTooltip);
                    }
                } else if (options.direction === 'top') { // 위에 노출
                    let thisH = thisTooltip.outerHeight();
                    let bottomPosT = elOffsetT - (thisH + 10);
                    let thisW = thisTooltip.outerWidth();
                    cp.toolTip.calcHorizontal(thisW, elWidth, winW, elOffsetL, thisTooltip, bottomPosT);
                } else if (options.direction === 'bottom') { // 아래 노출
                    let bottomPosT = elOffsetT + 30;
                    cp.toolTip.calcHorizontal(tooltipWidth, elWidth, winW, elOffsetL, thisTooltip, bottomPosT);
                }
        
                $newTooltip.addClass(cp.toolTip.constEl.active).focus();
            }, 100); // 0.1초 뒤에 실행
        },        
        
        calcRight(tooltipWidth, tooltipHeight, winW, elOffsetT, elOffsetL, newTooltip) {
            let $thisTooltip = newTooltip;
            if ((tooltipWidth + 15) >= (winW - (elOffsetL + 20))) {
                $thisTooltip.css({
                    top: elOffsetT - ((tooltipHeight / 2) - 10),
                    left: elOffsetL - (tooltipWidth + 10)
                });
                $(".ico-tooltip._is-active").addClass('reverse')
            } else {
                $thisTooltip.css({
                    top: elOffsetT - ((tooltipHeight / 2) - 10),
                    left: elOffsetL + 30
                });
            }
        },
        calcLeft(tooltipWidth, tooltipHeight, elOffsetL, elOffsetT, thisTooltip) {
            let $thisTooltip = thisTooltip;
            if ((tooltipWidth + 15) >= elOffsetL) {
                $thisTooltip.css({
                    top: elOffsetT - ((tooltipHeight / 2) - 10),
                    left: elOffsetL + 30
                });
                $(".ico-tooltip._is-active").addClass('reverse')
            } else {
                $thisTooltip.css({
                    top: elOffsetT - ((tooltipHeight / 2) - 10),
                    left: elOffsetL - (tooltipWidth + 10)
                });
            }
        },
        calcHorizontal(tooltipWidth, elWidth, winW, elOffsetL, thisTooltip, bottomPosT) {
            let $thisTooltip = thisTooltip,
                $tops = bottomPosT;
            if ((elOffsetL + 20) >= (winW / 3) * 2) {
                console.log('right', winW, tooltipWidth)
                $thisTooltip.css({
                    top: $tops,
                    left: winW - tooltipWidth - 10
                });
            } else if ((elOffsetL + 20) <= (winW / 3)) {
                console.log('left')
                $thisTooltip.css({
                    top: $tops,
                    left: 10
                });
            } else {
                $thisTooltip.css({
                    top: $tops,
                    left: elOffsetL - (tooltipWidth / 2) + (elWidth / 2)
                });
            }
        }
    };

    cp.accordion = {
        constEl: {
            btnToggle: '.btn-toggle',
            btnChk: '.field-checkbox'
        },
        init() {
            this.toggleAccordion();
            this.toggleChk();
            this.allChk('chkAll', 'exChk');
        },
        toggleDown: function ($this, $thisContents, $thisWrap) {
            /**
             * 아코디언 slideDown 함수
             * @this 클릭한 토글 버튼
             * @thisContents 클릭한 버튼에 해당하는 content 박스
             * @thisWrap 해당 아코디언의 wrapper
             */
            if ($thisWrap.attr('data-scroll') === 'top') {
                var offsetTop = $this.parent().offset().top;

                if (!$thisWrap.attr('data-type')) {
                    $thisContents.slideDown();
                    $this.addClass('_is-active').attr('aria-expanded', true).attr('aria-label', '닫기');

                    setTimeout(function () {
                        $('html, body').animate({
                            scrollTop: offsetTop
                        }, 300);
                    }, 200);
                } else {
                    $('html, body').animate({
                        scrollTop: offsetTop
                    }, 300, function () {
                        $thisContents.slideDown(300);
                        $this.addClass('_is-active').attr('aria-expanded', true).attr('aria-label', '닫기');
                    });
                }
            } else {
                $thisContents.slideDown();
                $this.addClass('_is-active').attr('aria-expanded', true).attr('aria-label', '닫기');
            }
        },
        handleAccordion: function ($this, $thisContents, $thisWrap) {
            /**
             * data-type 조건에 따라 아코디언 동작 함수
             * @dataType 해당 아코디언의 data-type
             * @this 클릭한 토글 버튼
             * @thisContents 클릭한 버튼에 해당하는 content 박스
             * @thisWrap 해당 아코디언의 wrapper
             * @btnAll 아코디언 전체 토글 버튼
             */
            const self = this;
            const dataType = $thisWrap.closest('.accordion-wrap').attr('data-type')

            if ($thisContents.is(':hidden')) {
                if (dataType && dataType.indexOf('oneToggle') !== -1) {
                    const $btnAll = $thisWrap.find('.btn-toggle');

                    $btnAll.removeClass('_is-active').attr('aria-expanded', false).attr('aria-label', '열기');
                    $btnAll.parent('.accordion-header').next('.accordion-contents').slideUp();
                    setTimeout(function () {
                        self.toggleDown($this, $thisContents, $thisWrap);
                    }, 300);
                } else {
                    self.toggleDown($this, $thisContents, $thisWrap);
                }
            } else {
                if (dataType && dataType.indexOf('double') !== -1) {
                    $thisContents.find('.accordion-contents').slideUp();
                    $thisContents.find('._is-active').removeClass('_is-active').attr('aria-expanded', false).attr('aria-label', '열기');
                }
                $this.removeClass('_is-active').attr('aria-expanded', false).attr('aria-label', '열기');
                $thisContents.slideUp();
            }
        },
        toggleAccordion: function () {
            /**
             * 아코디언 함수 실행
             * @this 클릭한 토글 버튼
             * @thisContents 클릭한 버튼에 해당하는 content 박스
             * @thisWrap 해당 아코디언의 wrapper
             */
            const self = this;

            $(document).on('click', this.constEl.btnToggle, function (e) {
                e.preventDefault();

                const $this = $(this);
                const $thisContents = $this.parent('.accordion-header').next('.accordion-contents');
                const $thisWrap = $this.closest('.accordion-wrap');

                self.handleAccordion($this, $thisContents, $thisWrap);
            });
        },
        toggleChk: function () {
            /**
             * 체크박스 상태에 따라 아코디언 동작하는 함수
             * @thisLabel 클릭한 label
             * @thisContents 클릭한 레이블에 해당하는 content 박스
             * @thisWrap 해당 아코디언의 wrapper
             * @thisBtn 클릭한 레이블의 형제 토글 버튼
             * @nextAccordion 클릭한 레이블의 다음 contents
             * @dataType 해당 아코디언의 data-type
             */
            const self = this;

            $(document).on('click', this.constEl.btnChk, function (e) {
                e.stopPropagation();

                const $thisLabel = $(this);
                const $thisContents = $thisLabel.closest('.accordion-header').next('.accordion-contents');
                const $thisWrap = $thisLabel.closest('.accordion-wrap');
                const $thisBtn = $thisLabel.siblings('.btn-toggle');
                const $nextAccordion = $thisContents.parent('.accordion').next('.accordion');
                const dataType = $thisWrap.attr('data-type');

                if (dataType && dataType.indexOf('toggleChk') !== -1) {
                    setTimeout(function () {
                        if ($thisContents.is(':visible')) {
                            if ($thisLabel.find('input').prop('checked')) {
                                $thisBtn.removeClass('_is-active').attr('aria-expanded', false).attr('aria-label', '열기');
                                $thisContents.slideUp();

                                if (!$nextAccordion.children('.accordion-header').find('input').prop('checked')) {

                                    $nextAccordion.children('.accordion-contents').slideDown();
                                    $nextAccordion.children('.accordion-header').find('.btn-toggle').addClass('_is-active').attr('aria-expanded', true).attr('aria-label', '닫기');
                                }
                            }
                        } else {
                            if (!$thisLabel.find('input').prop('checked')) {
                                self.toggleDown($thisLabel, $thisContents, $thisWrap);
                            }
                        }
                    });
                }
            });
        },
        allChk: function (chkAllId, chkName) {
            /**
             * @total 개별 input의 전체 갯수
             * @checked 개별 input의 check된 상태
             * @thisContents 클릭한 레이블의 아코디언 contents
             * @thisWrap 해당 아코디언의 wrapper
             * @thisBtn 클릭한 레이블의 형제 토글 버튼
             * @dataType 해당 아코디언의 data-type
             */

            // 전체 체크하는 input 클릭시
            $(document).on('click', '#' + chkAllId, function () {
                if ($(this).is(':checked')) {
                    $('input[name^="' + chkName + '"]').prop('checked', true);
                } else {
                    $('input[name^="' + chkName + '"]').prop('checked', false);
                }
            });

            // 개별 input 클릭시
            $(document).on('click', 'input[name^="' + chkName + '"]', function () {
                const total = $('input[name^="' + chkName + '"]').length;
                const checked = $('input[name^="' + chkName + '"]:checked').length;
                const $thisContents = $(this).closest('.accordion-contents');
                const $thisWrap = $(this).closest('.accordion-wrap');
                const $thisBtn = $(this).closest('.accordion').find('.btn-toggle');
                const dataType = $thisWrap.attr('data-type');

                if (total !== checked) {
                    $('#' + chkAllId).prop('checked', false);
                } else {
                    $('#' + chkAllId).prop('checked', true);
                    if (dataType && dataType.indexOf('toggleChk') !== -1) {
                        $thisContents.slideUp();
                        $thisBtn.removeClass('_is-active').attr('aria-expanded', false).attr('aria-label', '열기');
                    }
                }
            });
        }
    };

    cp.tab = {
        constEl: {
            tab: '.tab > a'
        },
        init() {
            this.tabSetting();
            this.tabClick();
            this.scrollEventHandler();
            this.tabSticky(); // 선언
        },
        tabSetting: function () {
            /**
             * 탭 초기 설정
             * @contentsIdx 클릭한 탭의 index와 같은 index의 content
             */
            const self = this;

            $('.tab-moving .tab-list-wrap').append($('<span class="highlight"></span>'));
            $('.tab-scroll .tab-contents').scrollTop();

            // 접근성
            $('.tab').children('a').attr('aria-selected', 'false');
            $('.tab._is-active').children('a').attr('aria-selected', 'true');
            $('.tab').attr('roll', 'tab');
            $('.tab-list').attr('roll', 'tablist');
            $('.tab-contents').attr('roll', 'tabpanel');

            $(document).ready(function () {
                $('.tab-wrap').each(function () {
                    var $tabWrap = $(this);

                    $tabWrap.find('.tab').each(function (index) {
                        var tabId = $tabWrap.attr('id') + '_' + 'tab' + (index + 1);
                        $(this).attr('aria-controls', tabId);
                    });

                    $tabWrap.find('.tab-contents').each(function (index) {
                        var panelId = $tabWrap.attr('id') + '_' + 'tab' + (index + 1);
                        $(this).attr('id', panelId);
                    });

                    $tabWrap.find('.highlight').each(function () {
                        self.moveHighLight($tabWrap);
                    });
                })
            })

            // resize 체크
            let resizeTimeout;
            $(window).on('resize', function () {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(function () {
                    $('.tab-wrap').each(function () {
                        var $tabWrap = $(this);

                        $tabWrap.find('.highlight').each(function () {
                            self.moveHighLight($tabWrap);
                        });
                    });
                }, 200);
            });

            $('.tab-scroll .tab-contents-wrap').on('scroll', self.scrollEventHandler);

        },
        tabSel: function ($this, $tabWrap) {
            /**
             * 가로/세로 탭 선택 함수
             * @this 클릭한 탭 버튼
             * @tabWrap 클릭한 탭의 wrapper
             * @next 가로/세로 형식으로 바뀌는 컨텐츠 wrapper
             * sel-h-v 클래스 있는 tab 메뉴에서 data-type에 따라 $next highlight 초기화
             */

            if ($tabWrap.hasClass('sel-h-v')) {
                const $next = $tabWrap.next('.tab-wrap'); //실제 tabWrap
                const $activeTab = $next.find('._is-active');
                const newHeight = $next.find('.tab').outerHeight();
                const newWidth = $next.find('.tab').outerWidth();
                const nextHighlight = $next.find('.highlight');
                const newTop = $activeTab.position().top;

                if ($this.attr('data-type') === 'vertical') {
                    //탭메뉴 세로 버전일때
                    $next.addClass('tab-vertical').find('.tab-list').attr('aria-orientation', 'vertical');

                    nextHighlight.css({
                        left: '',
                        width: '',
                        top: newTop + 'px',
                        height: newHeight + 'px'
                    });
                } else {
                    //탭메뉴 가로 버전일때
                    $next.removeClass('tab-vertical').find('.tab-list').removeAttr('aria-orientation');

                    nextHighlight.css({
                        top: '',
                        height: '',
                        width: newWidth + 'px'
                    });
                }

                /* 탭활성화 초기화 */
                $next.find('.tab, .tab-contents').removeClass('_is-active').eq(0).addClass('_is-active');
            }
        },
        moveHighLight: function ($tabWrap, $this, callback) {
            /**
             * 선택된 탭 highlight action 함수
             * @this 클릭한 탭 버튼
             * @tabWrap 클릭한 탭의 wrapper
             * tab-moving 클래스 있는 tab 메뉴에서 tab-vertical 클래스에 따라 highlight 스타일 변화
             */

            if ($tabWrap.hasClass('tab-moving') && $tabWrap.hasClass('tab-vertical')) {
                // 세로 버전일때
                $this = $tabWrap.find('._is-active, .active');
                const $tabLstWrap = $tabWrap.find('.tab-list-wrap');
                const num = $tabLstWrap.offset().top;
                const elemTop = Math.ceil($this.offset().top);
                const scrollTop = $tabLstWrap.scrollTop();
                const thisElem = Math.ceil($this.outerHeight());
                const centerScroll = elemTop + scrollTop - num - $tabLstWrap.height() / 2 + thisElem / 2;

                const $highLight = $tabWrap.find('.highlight');
                const newHeight = $this.outerHeight();

                $highLight.css('left', '');
                $highLight.css('width', '');

                $highLight.stop().animate({
                    height: newHeight,
                    top: elemTop - num + scrollTop
                });
                $tabLstWrap.stop().animate({
                    scrollTop: centerScroll
                }, 500);
            } else if ($tabWrap.hasClass('tab-moving') && !$tabWrap.hasClass('tab-vertical')) {
                // 가로 버전일때
                const $tabLstWrap = $tabWrap.find('.tab-list-wrap');
                const $this = $tabLstWrap.find('._is-active, .active');
                const num = $tabLstWrap.offset().left;
                const elemLeft = Math.ceil($this.offset().left);
                const scrollLeft = $tabLstWrap.scrollLeft();
                const thisElem = Math.ceil($this.outerWidth());
                const centerScroll = elemLeft + scrollLeft - num - $tabLstWrap.width() / 2 + thisElem / 2;

                const $highLight = $tabWrap.find('.highlight');
                const newWidth = Math.floor($this.outerWidth());

                $highLight.css({
                    top: '',
                    height: ''
                }).stop().animate({
                    width: newWidth,
                    left: elemLeft - num + scrollLeft
                });

                $tabLstWrap.stop().animate({
                    scrollLeft: centerScroll
                }, 500);
            }
            if (callback && typeof callback === 'function') {
                callback($tabWrap, $this);
            }
        },
        tabSticky: function () {
            /**
             * tab sticky 이벤트
             * @this 클릭한 탭 버튼
             * @tabWrap 클릭한 탭의 wrapper
             * window 스크롤시 해당 content와 tab 활성화
             */
            const self = this;
            const $tabWrap = $('.tab-sticky');
            let isTabClick; // 중복 호출 방지를 위한 플래그 변수


            $(window).on('scroll', function () {
                if (!isTabClick) {
                    isTabClick = true;

                    // sticky 안에서만 돌게 지정
                    $(".tab-sticky .tab-contents").each(function () {
                        const contentTop = $(this).offset().top;
                        const contentBottom = contentTop + $(this).outerHeight();
                        const tabHeight = $('.tab').outerHeight() + 2;

                        if (!$('html, body').is(':animated')) {
                            if (window.scrollY >= contentTop - tabHeight && window.scrollY <= contentBottom) {
                                const targetId = $(this).attr("id");
                                const targetTab = $('.tab[aria-controls="' + targetId + '"]');

                                targetTab.closest('li').addClass("_is-active").siblings().removeClass("_is-active");
                                targetTab.siblings().find('.tab').children('a').attr('aria-selected', 'false');
                                targetTab.children('a').attr('aria-selected', 'true');
                                $(this).addClass("_is-active").siblings().removeClass("_is-active");

                                self.moveHighLight($tabWrap, targetTab);
                            }
                        }

                        setTimeout(function () {
                            isTabClick = false;
                        }, 10);
                    });
                }
            });
        },
        scrollEventHandler: function () {
            /**
             * tab scroll 이벤트
             * @thisWrap 스크롤 중인 컨텐츠 상위 wrapper
             * 스크롤시 해당 content와 tab 활성화
             */
            const $thisWrap = $(this);

            $thisWrap.children('.tab-contents').each(function () {
                const panelTop = $(this).position().top;
                const $tabWrap = $(this).closest('.tab-scroll');

                if (panelTop <= -20 && panelTop > -$thisWrap.height() / 2) {
                    const tabId = $(this).attr('id');

                    $tabWrap.find('.tab').removeClass('_is-active');
                    $tabWrap.find('.tab').children('a').attr('aria-selected', 'false');
                    $tabWrap.find('.tab[aria-controls="' + tabId + '"]').addClass('_is-active');
                    $tabWrap.find('.tab[aria-controls="' + tabId + '"]').children('a').attr('aria-selected', 'true');
                    $(this).siblings().removeClass('_is-active');
                    $(this).addClass('_is-active');

                    const $this = $tabWrap.find('.tab[aria-controls="' + tabId + '"]');
                    cp.tab.moveHighLight($tabWrap, $this);
                }
            });
        },
        tabClick: function () {
            /**
             * 선택된 탭 _is-active 함수
             * @this 클릭한 탭 버튼
             * @tabWrap 클릭한 탭의 wrapper
             * @contentsIdx 클릭한 탭의 index와 같은 index의 content
             */
            const self = this;

            $(document).on('click', this.constEl.tab, function (e) {
                e.preventDefault();

                const $this = $(this).parent('.tab');
                const $index = $this.index();
                const $tabWrap = $this.closest('.tab-wrap');
                const $contentsWrap = $tabWrap.children('.tab-contents-wrap');
                const $contents = $contentsWrap.children('.tab-contents');
                const $contentsIdx = $contentsWrap.children('.tab-contents').eq($index);

                const tabAttr = function () {
                    // 탭 클릭시 활성화
                    $this.siblings('.tab').removeClass('_is-active');
                    $this.siblings('.tab').children('a').attr('aria-selected', 'false');
                    $this.addClass('_is-active');
                    $this.children('a').attr('aria-selected', 'true');
                    $contents.removeClass('_is-active');
                    $contentsIdx.addClass('_is-active');
                    $contents.removeAttr('tabindex');
                    $contentsIdx.attr('tabindex', '0');
                }

                if ($tabWrap.attr('data-roll') === 'tab' && $tabWrap.hasClass('tab-scroll')) {
                    // tab-scroll 일 경우
                    tabAttr();
                    self.moveHighLight($tabWrap);

                    // tabpanel 영역 안 스크롤 이동
                    $('.tab-scroll .tab-contents-wrap').off('scroll', self.scrollEventHandler); // 스크롤 이벤트 핸들러 제거

                    const $targetHref = $('#' + $this.attr('aria-controls'));
                    const $targetWrap = $targetHref.parent('.tab-contents-wrap');
                    const location = $targetHref.position().top;

                    $targetWrap.stop().animate({
                        scrollTop: $targetWrap.scrollTop() + location
                    }, 300);

                    setTimeout(function () {
                        $('.tab-scroll .tab-contents-wrap').on('scroll', self.scrollEventHandler);
                    }, 400);
                } else if ($tabWrap.attr('data-roll') === 'tab' && $tabWrap.hasClass('tab-sticky')) {
                    // tab-sticky 일 경우
                    isTabClick = false;
                    if (!isTabClick) {
                        isTabClick = true;

                        tabAttr();
                        self.moveHighLight($tabWrap, $this, function () {
                            const target = $this.attr('aria-controls');
                            const $target = $('#' + target);
                            const tabHeight = $this.outerHeight();
                            const targetTop = $target.offset().top - tabHeight;

                            $('html,body').stop().animate({
                                'scrollTop': targetTop
                            }, 600, 'swing', function () {
                                isTabClick = false; // 스크롤이동 끝난 후 false 부여
                            });
                        });
                    }
                } else if ($tabWrap.attr('data-roll') === 'tab' && !$tabWrap.hasClass('tab-sticky')) {
                    tabAttr();
                    $contentsIdx.removeAttr('hidden');
                    self.moveHighLight($tabWrap);
                }

                let newTop = 0;
                self.tabSel($this, $tabWrap);
            });
        }
    };

    cp.tabSwiper = {
        constEl: {},
        init: function () {
            $('.tab-swiper').each(function () {
                const $tabSwiper = $(this);
                const $tabNavWrapper = $tabSwiper.find('.tab-nav');
                const target = $tabNavWrapper.attr('tab-swiper');
                const $tabContentWrapper = $tabSwiper.find('> .tab-content[tab-swiper-target="' + target + '"]');
                const $tabNavSlides = $tabSwiper.find('> .tab-nav[tab-swiper="' + target + '"]').find('.swiper-slide');
                const $activeBar = $('<li class="tab-active-bar"></li>'); // $activeBar 생성 추가
                const $space = 12;
                let barW = $tabNavSlides.eq(0).outerWidth(false);

                if ($tabNavWrapper.hasClass('moveBar')) {
                    $tabNavSlides.last().after($activeBar);
                }

                const tabNavSwiper = new Swiper($tabNavWrapper.get(0), {
                    slidesPerView: 'auto',
                });

                const tabContentSwiperOptions = {
                    onProgress: function (swiper, progress) {
                        const $activeTab = $tabNavSlides.filter('.active');
                        $activeBar.css({
                            'left': $activeTab.position().left - $space,
                            'width': barW
                        });
                    },
                    onSetTransition: function (swiper, duration) {
                        const $activeTab = $tabNavSlides.filter('.active');
                        $activeBar.css({
                            'left': $activeTab.position().left - $space,
                            'width': barW
                        });
                    },
                    onSlideChangeStart: function (swiper) {
                        $tabNavWrapper.find('.active').removeClass('active');
                        const $currentTab = $tabNavSlides.filter('[data-slide-index=' + swiper.activeIndex + ']');
                        $currentTab.addClass('active');
                    },
                    onTransitionStart: function () {
                        const activeSlideIndex = tabContentSwiper.activeIndex;
                        const $activeTab = $tabNavSlides.eq(activeSlideIndex);
                        const updatedBarW = $activeTab.outerWidth(false);
                        barW = updatedBarW;
                        const targetIndex = $activeTab.data('slide-index');
                        const activeTabLeft = $tabNavSlides.eq(activeSlideIndex).position().left - $space;

                        $activeBar.css({
                            'width': barW,
                            'left': activeTabLeft,
                            'transition': 'left .3s ease-in'
                        });

                        tabNavSwiper.slideTo(targetIndex - 1);
                    },
                };

                // .vertical 클래스가 존재하면 세로 방향 옵션 추가
                if ($tabSwiper.hasClass('vertical')) {
                    tabContentSwiperOptions.direction = 'vertical';
                    tabContentSwiperOptions.mousewheelControl = true;
                    tabContentSwiperOptions.watchSlidesProgress = true;
                }

                const tabContentSwiper = new Swiper($tabContentWrapper.get(0), tabContentSwiperOptions);

                $tabNavSlides.on('click', function (event) {
                    const $clickedTab = $(this);
                    const updatedBarW = $clickedTab.outerWidth(false);
                    barW = updatedBarW;
                    const targetIndex = $clickedTab.data('slide-index');

                    tabContentSwiper.slideTo(targetIndex);

                    tabContentSwiper.once('transitionEnd', function () {
                        const clickedTabLeft = $tabNavSlides.eq(targetIndex).position().left - $space;

                        $activeBar.css({
                            'width': barW,
                            'left': clickedTabLeft,
                            'transition': 'left .3s ease-in'
                        });
                    });

                    tabNavSwiper.slideTo(targetIndex - 1);
                });
            });
        },
    };

    cp.swiper = {
        init: function () {
            this.swiperSetting();
            this.swiperControl();
        },

        swiperSetting: function () {
            $('.swip-swiper').each(function () {
                const $thisSwiper = $(this),
                    $swiperContent = $thisSwiper.find('.swip-content'),
                    swiperOptions = cp.swiper.swiperOptions($thisSwiper);

                cp.swiper.appendIndicate($thisSwiper, swiperOptions);

                const swiperInstance = new Swiper($swiperContent, swiperOptions);
                $thisSwiper.data('swiperInstance', swiperInstance);

                cp.swiper.updatePaginationBullets($thisSwiper, swiperInstance);
            });
        },


        swiperOptions: function ($thisSwiper) {
            const swiperType = $thisSwiper.attr('swiper-type');
            const swiperAuto = $thisSwiper.attr('swiper-auto');

            const swiperOptions = {
                loop: true,
                loopAdditionalSlides: 1,
                centeredSlides: true,
                paginationClickable: true,
                a11y: {
                    enabled: true,
                },
                nextButton: this,
                prevButton: this,
                coverflow: {
                    rotate: 0,
                    modifier: 1.5,
                    slideShadows: false,
                },
                pagination: {
                    el: '.swiper-pagination',
                },
            };

            if (swiperType === 'swiper2') {
                Object.assign(swiperOptions, {
                    centeredSlides: false,
                    slidesPerView: 1.2,
                    spaceBetween: 10,
                });
            } else if (swiperType === 'swiper3') {
                Object.assign(swiperOptions, {
                    slidesPerView: 1.4,
                    effect: 'coverflow',
                    spaceBetween: 20,
                });
            } else if (swiperType === 'swiper4') {
                Object.assign(swiperOptions, {
                    autoplay: 2000,
                    slidesPerView: 1.4,
                    effect: 'coverflow',
                });
            }

            if (swiperAuto === 'true') {
                Object.assign(swiperOptions, {
                    autoplay: 2000,
                    coverflow: {
                        rotate: 0,
                        modifier: 1.5,
                        slideShadows: false,
                    },
                });
            }

            return swiperOptions;
        },

        appendIndicate: function ($thisSwiper, swiperOptions) {
            const swiperNav = $thisSwiper.attr('swiper-nav');
            let paginationSelector = '';

            if (swiperNav === 'type1') {
                paginationSelector = '<div class="swiper-pagination"></div>';
            } else if (swiperNav === 'type2') {
                paginationSelector = '<div class="swip-wrap"><div class="play-btn-wrap"><button class="btn pauseBtn"><span>정지</span></button><button class="btn playBtn" style="display: none"><span>재생</span></button></div><div class="swiper-pagination"></div></div>';
            } else if (swiperNav === 'type3') {
                paginationSelector = '<div class="swiper-button-prev"><span>이전 슬라이드로</span></div><div class="swiper-button-next"><span>다음 슬라이드로</span></div><div class="swiper-pagination"></div>';
            } else if (swiperNav === 'type4') {
                paginationSelector = '<div class="swip-wrap"><div class="play-btn-wrap"><button class="btn pauseBtn"><span>정지</span></button></div><div class="swiper-pagination"></div></div><div class="swiper-button-prev"><span>이전 슬라이드로</span></div><div class="swiper-button-next"><span>다음 슬라이드로</span></div>';
            }

            $thisSwiper.append(paginationSelector);
        },

        updatePaginationBullets: function ($thisSwiper, swiperInstance) {
            const $pagination = $thisSwiper.find('.swiper-pagination');
            const slidesCount = swiperInstance.slides.length - swiperInstance.loopedSlides * 2;

            $pagination.empty();
            for (let i = 0; i < slidesCount; i++) {
                $pagination.append('<span class="swiper-pagination-bullet"></span>');
            }
            // Initialize the active bullet class
            const $bullets = $pagination.find('.swiper-pagination-bullet');
            $bullets.eq(0).addClass('swiper-pagination-bullet-active');

            // Update bullet class on slide change start
            swiperInstance.on('onSlideChangeStart', function () {
                const activeIndex = swiperInstance.realIndex;
                $bullets.removeClass('swiper-pagination-bullet-active');
                $bullets.eq(activeIndex).addClass('swiper-pagination-bullet-active');
            });
        },


        swiperControl: function () {
            $('.swip-swiper').each(function () {
                const $thisSwiper = $(this),
                    swiper = $thisSwiper.data('swiperInstance');

                function togglePlayPause($button) {
                    const $span = $button.find('>span');
                    if ($button.hasClass('playBtn')) {
                        if (swiper && swiper.startAutoplay) {
                            swiper.startAutoplay();
                        }
                        $span.text("정지");
                        $button.addClass('pauseBtn').removeClass('playBtn').focus();
                    } else if ($button.hasClass('pauseBtn')) {
                        if (swiper && swiper.stopAutoplay) {
                            swiper.stopAutoplay();
                        }
                        $span.text("재생");
                        $button.addClass('playBtn').removeClass('pauseBtn').focus();
                    }
                }

                $thisSwiper.on('click', '.playBtn, .pauseBtn', function () {
                    togglePlayPause($(this));
                });

                $thisSwiper.on('click', '.swiper-button-prev', function () {
                    swiper.slidePrev();
                });

                $thisSwiper.on('click', '.swiper-button-next', function () {
                    swiper.slideNext();
                });
            });
        }

    };

    cp.swiper8 = {
        init: function () {
            this.swiperSetting();
        },
        swiperSetting: function () {
            $('div.swiper-wrap').each(function () {
                var $this = $(this);
                var swiperType = $this.attr('swiper-type'); // swiper-type 값 가져오기

                if (swiperType === "tab") {
                    cp.swiper8.initTabSwiper($this);
                } else if (!swiperType || swiperType === "visual") {
                    cp.swiper8.initVisualSwiper($this);
                }
            });
        },

        // 탭 스와이퍼 초기화
        initTabSwiper: function ($wrap) {
            const self = this;
            var tabNavSwiper = new Swiper($wrap.find('.swiper-container[swiper-tab]')[0], {
                slidesPerView: 'auto',
                freeMode: true,
                watchSlidesProgress: true,
                a11y: true,
                keyboard: {
                    enabled: true,
                },
            });

            var tabContentSwiper = new Swiper($wrap.find('.swiper-container[swiper-target]')[0], {
                slidesPerView: 1,
                loop: $wrap.attr('swiper-loop') === "true",
                a11y: true,
                keyboard: {
                    enabled: true,
                },
                on: {
                    slideChange: function () {
                        var realIndex = this.realIndex;
                        cp.swiper8.updateActiveTab(realIndex, $wrap);
                        tabNavSwiper.slideTo(realIndex);
                    },
                },
            });

            // swiperControl에 스와이퍼들을 전달
            cp.swiper8.swiperControl(tabNavSwiper, tabContentSwiper, $wrap);
        },

        swiperControl: function (tabNavSwiper, tabContentSwiper, $wrap) {
            // 탭 클릭 이벤트 설정
            $('.tab-nav .swiper-slide', $wrap).on('click', function () {
                var index = $(this).data('slide-index');
                if (tabContentSwiper) { // tabContentSwiper가 정의되어 있는지 확인
                    tabContentSwiper.slideToLoop(index);
                    cp.swiper8.updateActiveTab(index, $wrap);
                }
            });
        },

        // 비주얼 스와이퍼 초기화
        initVisualSwiper: function ($wrap) {
            var slidesPerView = parseFloat($wrap.attr('swiper-view')) || 1;
            var swiperEffect = $wrap.attr('swiper-effect') || null;
            var slidesSpace = parseInt($wrap.attr('swiper-space')) || 0;
            var pagination = $wrap.attr('swiper-paging') === "true";
            var autoplay = $wrap.attr('swiper-play') === "auto";
            var autoplayStop = $wrap.attr('swiper-play') === "stop";
            var hasArrows = $wrap.attr('swiper-arrow') === "true";
            var speed = parseInt($wrap.attr('swiper-speed')) || 3000;
            var autoBtn = $wrap.attr('auto-btn') === "both";
            var autoH = $wrap.attr('auto-height') === "true";

            // 슬라이드 수 설정
            if (slidesPerView === 1 || !slidesPerView) {
                slidesPerView = 1;
            }

            // 슬라이드 뷰 설정
            if (swiperEffect === 'preview') {
                slidesPerView = 1.2;
            } else if (swiperEffect === 'coverflow') {
                slidesPerView = 1.4;
            }

            // pagination 추가
            if (pagination && $wrap.find('.swiper-pagination').length === 0) {
                $wrap.append('<div class="swiper-pagination"></div>');
            }

            // autoplayStop일 때 createPlayPauseControls2가 생성되도록 수정
            if (pagination && autoplay && $wrap.find('.swiper-pagination').length > 0) {
                setTimeout(function () {
                    cp.swiper8.createPlayPauseControls($wrap.find('.swiper-pagination'));
                }, 300);
            } else if (autoplayStop && !pagination) {
                cp.swiper8.createPlayPauseControls2($wrap);
                setTimeout(function () {
                    $wrap.find('.playbtn .stop').addClass("_is-active");
                }, 300);
            }

            // 화살표 버튼 추가
            if (hasArrows && $wrap.find('.swiper-button-next').length === 0 && $wrap.find('.swiper-button-prev').length === 0) {
                $wrap.append('<div class="swiper-button-next" aria-label="다음 슬라이드"></div>');
                $wrap.append('<div class="swiper-button-prev" aria-label="이전 슬라이드"></div>');
            }

            // swiperOptions 설정
            var swiperOptions = {
                slidesPerView: slidesPerView,
                spaceBetween: slidesSpace,
                loop: $wrap.attr('swiper-loop') === "true",
                a11y: true,
                keyboard: {
                    enabled: true,
                },
                pagination: pagination ? {
                    el: $wrap.find('.swiper-pagination')[0],
                    clickable: true,
                } : false,
                navigation: hasArrows ? {
                    nextEl: $wrap.find('.swiper-button-next')[0],
                    prevEl: $wrap.find('.swiper-button-prev')[0],
                } : false,
                centeredSlides: (swiperEffect === 'coverflow'),
                autoHeight: autoH,
            };

            // coverflow 효과일 때 추가 옵션 설정
            if (swiperEffect === 'coverflow') {
                swiperOptions.effect = 'coverflow';
                swiperOptions.coverflowEffect = {
                    rotate: 10,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    scale: 0.8,
                    slideShadows: true,
                };
                swiperOptions.centeredSlides = true;
                swiperOptions.grabCursor = true;
            }

            // autoplay 설정
            if (autoplay) {
                swiperOptions.autoplay = {
                    delay: speed,
                    disableOnInteraction: false,
                };
                // autoplay 버튼 추가
                if (!pagination) {
                    if (autoBtn) {
                        cp.swiper8.createPlayPauseControls2($wrap);
                    } else {
                        cp.swiper8.createPlayPauseControls($wrap);
                    }

                }
            }

            // Swiper 인스턴스 생성
            var visualSwiper = new Swiper($wrap.find('.swiper-container[swiper-name]')[0], swiperOptions);

            // autoplay 관련 버튼 이벤트 핸들링
            if (autoplay && !autoBtn) {
                $wrap.on('click', '.playbtn a', function (e) {
                    e.preventDefault();
                    var $btn = $(this);

                    if ($btn.hasClass("play")) {
                        visualSwiper.autoplay.stop();
                        $btn.removeClass("play").addClass("stop _is-active")
                            .attr("aria-label", "정지").find(" > span").text("정지");
                    } else if ($btn.hasClass("stop")) {
                        visualSwiper.autoplay.start();
                        $btn.removeClass("stop").addClass("play _is-active")
                            .attr("aria-label", "재생").find(" > span").text("재생");
                    }
                });
            } else if (autoplay && autoBtn) {
                $wrap.on('click', '.playbtn a', function (e) {
                    e.preventDefault();
                    var $btn = $(this);

                    if ($btn.hasClass("play")) {
                        visualSwiper.autoplay.start();
                        $(".btn-autoplay").removeClass("_is-active");
                        $btn.addClass("_is-active");
                    } else if ($btn.hasClass("stop")) {
                        visualSwiper.autoplay.stop();
                        $(".btn-autoplay").removeClass("_is-active");
                        $btn.addClass("_is-active");
                    }
                });
            } else // autoplayStop일 때 play/stop 버튼 동작 처리
                if (autoplayStop) {
                    $wrap.on('click', '.playbtn a', function (e) {
                        e.preventDefault();
                        var $btn = $(this);

                        // play 버튼 클릭 시 autoplay 시작
                        if ($btn.hasClass("play")) {
                            visualSwiper.params.autoplay.delay = speed;
                            visualSwiper.autoplay.start();
                            $(".btn-autoplay").removeClass("_is-active");
                            $btn.addClass("_is-active");
                        }
                        // stop 버튼 클릭 시 autoplay 중지
                        else if ($btn.hasClass("stop")) {
                            visualSwiper.autoplay.stop();
                            $(".btn-autoplay").removeClass("_is-active");
                            $btn.addClass("_is-active");
                        }
                    });
                }
        },


        updateActiveTab: function (index, $wrap) {
            $('.tab-nav .swiper-slide', $wrap).removeClass('active');
            $('.tab-nav .swiper-slide[data-slide-index="' + index + '"]', $wrap).addClass('active');
        },

        // autoplay 에서 버튼 하나로만 변경될때
        createPlayPauseControls: function ($wrap) {
            var playPauseHTML = `
                <div class="playbtn">
                  <a href="#none" class="btn-autoplay play" aria-label="재생">
                    <i class="ico-playbtn" aria-hidden="true"></i>
                    <span class="hide">재생</span>
                  </a>
                </div>
            `;
            $wrap.append(playPauseHTML);
        },
        // autoplay 에서 버튼 2개가 모두 보일때 변경될때
        createPlayPauseControls2: function ($wrap) {
            var playPauseHTML = `
                <div class="playbtn">
                  <a href="#none" class="btn-autoplay play" aria-label="재생">
                    <i class="ico-playbtn" aria-hidden="true"></i>
                    <span class="hide">재생</span>
                  </a>
                  <a href="#none" class="btn-autoplay stop" aria-label="정지">
                    <i class="ico-playbtn" aria-hidden="true"></i>
                    <span class="hide">정지</span>
                  </a>
                </div>
            `;
            $wrap.append(playPauseHTML);
        },
    };

    cp.loading = {
        init: function () {
            // this.loadingInit();
        },
        loadingInit: function (_type, _txt, _target) {
            var txt = _txt;
            var type = _type;
            var target = (_target != '' && _target != undefined) ? _target : 'body'; // _target이 있으면 사용, 없으면 'body' 사용

            if (_txt != '' && _txt != undefined) {
                var resultTxt = '<p class="txt">' + txt + '</p>'
                $(target).append('<div class="loadingWrap"><div class="circle"><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div><p class="hide">로딩중</p>' + resultTxt + '</div>');
            } else if (type != '' && type != undefined) {
                $(target).append('<div class="loadingWrap"><div class="loading"><span class=' + type + '><i class="hide">로딩중</i></span></div></div>');
            } else {
                $(target).append('<div class="loadingWrap"><div class="circle"><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div><p class="hide">로딩중</p></div>');
            }
            $('body').addClass('no-scroll')
        },
        loadingRemove: function () {
            $('.loadingWrap').remove();
            $('body').removeClass('no-scroll')
        }
    };

    cp.quick = {
        init: function () {
            // quick-topBtn 속성 확인
            if ($('body').attr('quick-topBtn') === 'false') {
                return; // 속성이 false인 경우 초기화 중단
            }

            this.createQuickElement();
            this.quickShowHide();
            this.quickClk();
            this.quickBindEvent();
        },
        createQuickElement: function () {
            // quick 요소 동적 생성
            if ($('.quick').length === 0) {
                var quickElement = `
                    <aside class="quick">
                        <button type="button" class="quickTopBtn" tabindex="-1" aria-hidden="true">
                            <span class="hide">맨위로</span>
                        </button>
                    </aside>`;
                $('body').append(quickElement);
            }
        },
        quickShowHide: function () {
            if ($(window).scrollTop() > 50) {
                // $(".quick").addClass("topVisible").find(".quickTopBtn").focus();
                $(".quick").addClass("topVisible").find(".quickTopBtn")
                .attr({
                    "tabindex":"0",
                    "aria-hidden":"false",
                });
            } else {
                $(".quick").removeClass("topVisible").find(".quickTopBtn")
                .attr({
                    "tabindex":"-1",
                    "aria-hidden":"true",
                });;
            }
        },
        quickClk: function () {
            $(".quickTopBtn").click(function (e) {
                e.preventDefault();
                $("body, html").animate({ scrollTop: 0 }, 300);
            });
        },
        quickBindEvent: function () {
            var self = this;
            $(window).scroll(function () {
                self.quickShowHide();
            });
        }
    };

    cp.init = function () {
        cp.uaCheck.init();
        cp.btnFn.init();
        cp.tblCaption.init(); // table caption
        cp.form.init();
        cp.selectPop.init(); // 바텀시트 select
        cp.modalPop.init();
        cp.toast.init();
        cp.toolTip.init();
        cp.accordion.init();
        cp.tab.init();
        cp.tabSwiper.init();
        cp.swiper.init();
        cp.swiper8.init();
        cp.loading.init();
        cp.quick.init();
    };

    cp.init();
    return cp;
}(window.COMPONENT_UI || {}, jQuery));