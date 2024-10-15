# pub-guide
프로젝트를 위한 퍼블리싱 가이드
2024.10.15 update
-------------------------------------------------------------------------
- 기본적으로 웹접근성을 준수하고 있으나 실제 테스트시 결함 발생될 수 있으므로 해당 결함은 상황에 맞춰 커스텀 해야 함
- 추가된 옵션/함수 등은 각 컴포넌트 페이지 및 js에 선언된 내용을 참고할 것

## 업데이트 내용
### 작업목록 관련
1. 작업목록 반응형 적용(모바일, 760px, PC)
2. 이슈태그 추가(디자인, 기획, 이슈, 일정확인, 접근성, 기타)
3. sort 추가/수정
4. WBS 항목 추가
5. 상태 - 작업일 미기재시 자동으로 [대기중]으로 표시됨

### 컴포넌트 관련
1. 폴더구조 변경
 -asset : asset 폴더 내 com 폴더에 있던 폴더들을 com을 삭제하고 바로 하위로 이동함
  - css, font(Pretendard 추가), img, js, scss
2. _mixin.scss 간결화
3. SVG url-encoder 추가 : 오프라인에서도 svg path css background 용으로 변환할 수 있는 페이지 추가
4. loading 추가
 - COMPONENT_UI.loading.loadingInit(); : 로딩 실행
   - loadingInit(); 기본형
   - loadingInit('circle'); 기본형과 다른 제시된 클래스로 구성되는 타입의 로딩을 작성하여 실행
   - loadingInit('', '로딩중입니다'); 기본형에 텍스트 추가 형태로 제공됨. 텍스트가 길어질 경우 위치 조정은 수동으로 적용
 - COMPONENT_UI.loading.loadingRemove(); : 로딩 제거
5. 버튼 로딩 / 활성 / 비활성 상태 변경 추가 : 콜백함수를 통해 COMPONENT_UI.btnFn.btnStatus(); 호출하여 상태 변경 (페이지 내 예시 참고)
6. input 수정
 - clear btn 동적 추가/삭제 부분 삭제하고, 페이지 시작시 input이 존재하면 clear btn 동적 추가후 유지하는 걸로 변경함
 - PLACEHODER TYPE 부분 수정
 - input에 별도 id가 없는 경우 임의 id를 생성하여 label for과 매핑
 - .field-outline에 여러개의 input가 존재하는 경우 label for는 첫번째 input의 id와 매핑됨
7. INPUT RANGE / INPUT RANGE DOUBLE 오류 수정
8. select, 모달팝
 - dimmed 처리 방식 변경
 - 이중 모달팝 처리 추가(모달팝 중첩은 2개까지만 지원함)
 - 토스트 팝업 동적 생성에서 페이지 토스트 컨텐츠 show/hide 방식으로 변경
9. ToolTip
 - 페이지/모달팝에서 툴팁이 뜨는 경우 위치 오류 수정 : 모달팝 안에서 툴팁이 뜨는 경우 ._inModal 클래스 동적 추가됨
 - 모달팝 [.modal-header]에서 툴팁 적용이 필요한 경우 .tooltipWrap[tip-pos="fixed"]으로 위치 기준 적용
 - .ico-tooltip에 [tip-maxWidth] data-roll을 추가하여 .tooltip의 width를 적용할수 있도록 함. 제공하지 않는 경우 기본값 적용됨(_cp.popup.scss 참고)
10. Swiper v8.4.7 예제 추가
 - data-roll을 이용한 옵션 적용을 통해 스와이퍼의 동작이 달라짐
   : 해당 스와이퍼 옵션은 js 참고할 것
11. 페이지 go to top 추가
 - 일정 부분 스크롤시 상단 이동 버튼이 보이게 됨. body[quick-topBtn="false"]로 선언되면 퀵버튼이 생성되지 않음


-------------------------------------------------------------------------
# pub-guide
프로젝트를 위한 퍼블리싱 가이드

## guide
- 퍼블리싱 프로젝트 산출물 대응 통합 가이드입니다.
- 퍼블리싱 프로젝트 작업 리스트 및 프로젝트를 위한 공통 컴퍼넌트를 확인 할 수 있습니다.

#### SCSS
- SCSS는 컴포넌트별로 분리되어 작성되어 있습니다.
- 파일 이름에 언더바(_)가 있는 scss는 독립적인 css 파일을 만들지 않습니다.(기존에 작성된 파일명 참고)
- 따라서 컴포넌트로 적용할 scss 는 파일 이름에 언더바(_)를 붙여서 해당 컴퍼넌트에 사용될 부분만 작성해야 됩니다.

#### JS
- pg.workSheet.js : 작업목록 Layout UI.js
- pg.guideCommon.js : 작업목록을 제외한 가이드 Layout UI.js
- ui.component.js : 컴포넌트에 사용되는 js

#### data
- json 파일을 이용해서 작업목록 파일과 컴포넌트 가이드 목록을 생성하고 있습니다.
작성된 규칙에 맞게 추가/수정 하시면 됩니다.
- menu.common.json : 작업목록 data.json
- componentTile.json : 컴포넌트 목록 data.json

-------------------------------------------------------------------------

## simple_guide
- 간단하게 퍼블리싱 작업리스트만 작성된 심플버전입니다.
