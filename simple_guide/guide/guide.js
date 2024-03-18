const guideUi = {
  basePath: 'guide/data',
  dataListContainer: document.querySelector('.guide-dataList'),

  init: function () {
    const self = this;
    const menuLinks = document.querySelectorAll('.gnbLst li a');

    const initiallyActiveLink = document.querySelector('.gnbLst li.is-active a');
    if (initiallyActiveLink) {
      const jsonDataFile = self.basePath + '/' + initiallyActiveLink.getAttribute('data-json');

      fetch(jsonDataFile)
        .then(response => response.json())
        .then(data => {
          self.displayDataList(data);
          self.settings(data); // Call the settings function after displaying initial data
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }

    menuLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();

        self.clearDataList();

        menuLinks.forEach(function (link) {
          link.parentElement.classList.remove('is-active');
        });
        link.parentElement.classList.add('is-active');

        const jsonDataFile = self.basePath + '/' + link.getAttribute('data-json');

        fetch(jsonDataFile)
          .then(response => response.json())
          .then(data => {
            self.displayDataList(data);
            self.settings(data); // Call the settings function after displaying updated data
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      });
    });


    // GNB
    const mgnbElements = document.getElementsByClassName('mGnb');
    for (let i = 0; i < mgnbElements.length; i++) {
      mgnbElements[i].addEventListener('click', this.mGnb);
    }

    const gnbLstLinks = document.querySelectorAll('.gnbLst > li > a');
    for (let i = 0; i < gnbLstLinks.length; i++) {
      gnbLstLinks[i].addEventListener('click', function (e) {
        const gnbWrap = document.querySelector('.guide-header-gnbWrap');
        const mgnb = document.querySelector('.mGnb');
        gnbWrap.classList.remove('is-active');
        mgnb.classList.remove('is-active');
        const iElement = mgnb.querySelector('i.hide');
        iElement.textContent = '메뉴열기';
      });
    }
  },

  clearDataList: function () {
    const existingDdList = this.dataListContainer.querySelectorAll('dd');
    existingDdList.forEach(dd => dd.remove());
  },

  displayDataList: function (data) {
    const existingDt = this.dataListContainer.querySelector('dt');

    data.workList.forEach(function (item, index) {
      const dd = document.createElement('dd');
      dd.classList.add('work-list');
      dd.innerHTML =
        '<span>' + (index + 1) + '</span>' +
        // '<span class="pageId">' + item.pageId + '</span>' +
        '<span class="depth">' + item.depth + '</span>' +
        // '<span class="pageTitle">' + item['화면명'] + '</span>' +
        '<span class="pageTitle"><a href="' + item.path + '" target="_blank">' + item['화면명']  + '</a></span>' +
        '<span class="state">' + item.state + '</span>' +
        '<span class="date">' + item.작업일 + '</span>' +
        '<span class="worker">' + item.작업자 + '</span>' +
        '<span class="wah">' + item.접근성체크 + '</span>' +
        '<span class="file"><a href="' + item.file + '" target="_blank">' + item.fileName + '</a></span>' +
        '<span class="etc">' + item.비고 + '</span>';

      // this.dataListContainer.insertBefore(dd, existingDt.nextSibling);
      this.dataListContainer.appendChild(dd);
    }, this);

    this.updateWorkProcess();
  },

  updateWorkProcess: function () {
    const totalPage = this.dataListContainer.querySelectorAll('.work-list').length;
    const completedPage = this.dataListContainer.querySelectorAll('.state.completed').length;
    const process = Math.ceil((completedPage / totalPage) * 100);
    document.querySelector('.totalPage').innerText = totalPage;
    document.querySelector('.completedPage').innerText = completedPage;
    document.querySelector('.process').innerText = process;
  },

  settings: function (data) {
    const states = document.querySelectorAll('.state');
    const etcStates = document.querySelectorAll('.etc');
    states.forEach(function (state) {
      if (state.innerText === '완료') {
        state.classList.add('completed');
      } else if (state.innerText === '작업중') {
        state.classList.add('working');
      }
    });
    etcStates.forEach(function (state) {
      if (state.innerText === '') {
        state.classList.add('txtNone');
      }
    });
    
    this.updateWorkProcess();
  },

  mGnb: function (e) {
    e.preventDefault();
    const mgnb = e.currentTarget;
    const gnbWrap = document.querySelector('.guide-header-gnbWrap');
    const iElement = mgnb.querySelector('i.hide');

    if (mgnb.classList.contains('is-active')) {
      mgnb.classList.remove('is-active');
      gnbWrap.classList.remove('is-active');
      iElement.textContent = '메뉴열기';
    } else {
      mgnb.classList.add('is-active');
      gnbWrap.classList.add('is-active');
      iElement.textContent = '메뉴닫기';
    }
  },
};

guideUi.init();
