/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./script/modules/cards.js":
/*!*********************************!*\
  !*** ./script/modules/cards.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function cards() {
  class MenuCart {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src, this.alt = alt, this.title = title, this.descr = descr, this.price = price, this.classes = classes, this.parent = document.querySelector(parentSelector), this.transfer = 27, this.changeToUAN();
    }

    changeToUAN() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement('div');

      if (this.classes.length === 0) {
        this.element = 'menu__item';
        element.classList.add(this.element);
      } else {
        this.classes.forEach(className => element.classList.add(className));
      }

      element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн.</div>
                </div>
            `;
      this.parent.append(element);
    }

  }

  const getResource = async url => {
    // создаем ф-ю GET запроса
    const res = await fetch(url);

    if (!res.ok) {
      // new function .OK - когда все хорошо
      throw new Error(`Could not fetch ${url}, status: ${res.status}`); //THROW - выкидывание ошибки. NEW ERROR - сама ошибка
    }

    return await res.json(); // возвращаем результат в формате json
  };

  axios.get('http://localhost:3000/menu') // интеграция библиотеки AXIOS в код, для работы с сервером
  .then(data => {
    data.data.forEach(({
      img,
      altimg,
      title,
      descr,
      price
    }) => {
      // перебераем каждый элемент обьекта из сервера (деструктуризация объекта)
      new MenuCart(img, altimg, title, descr, price, '.menu .menu-container').render();
    });
  });
}

/* harmony default export */ __webpack_exports__["default"] = (cards);

/***/ }),

/***/ "./script/modules/forms.js":
/*!*********************************!*\
  !*** ./script/modules/forms.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./script/modules/modal.js");
/* harmony import */ var _services_sevice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/sevice */ "./script/services/sevice.js");



function forms(formSelector, modalTimerId) {
  const forms = document.querySelectorAll(formSelector); // получаем элемменты со страницы

  const message = {
    loading: "/icons/054 spinner.svg",
    success: "Спасибо! Скоро мы с вами свяжемся",
    failure: "Что-то пошло не так.."
  };
  forms.forEach(item => {
    //перебираем каждый элемент со страницы
    bindPostData(item);
  });

  function bindPostData(form) {
    form.addEventListener('submit', event => {
      //обработчик событий для отправки формы
      event.preventDefault();
      const statusMessage = document.createElement('img'); // создаем ДОМ элемент в виде img

      statusMessage.src = message.loading; // пишем путь к файлу

      statusMessage.classList.add('modal__img_load');
      form.insertAdjacentElement('afterend', statusMessage); // подгружает элемент ПОСЛЕ блока 

      const formData = new FormData(form); // подготовка и отправка данных в виде объекта

      const json = JSON.stringify(Object.fromEntries(formData.entries()));
      (0,_services_sevice__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json).then(data => {
        console.log(data);
        showThanksModal(message.success);
        statusMessage.remove();
      }).catch(() => {
        showThanksModal(message.failure);
      }).finally(() => {
        form.reset();
      });
    });
  }

  function showThanksModal(message) {
    // создаем второе модальное окно с результатом загрузки данных
    const prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.classList.add('hide');
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);
    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
    }, 3000);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./script/modules/modal.js":
/*!*********************************!*\
  !*** ./script/modules/modal.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "openModal": function() { return /* binding */ openModal; },
/* harmony export */   "closeModal": function() { return /* binding */ closeModal; }
/* harmony export */ });
function closeModal(modalSelector) {
  // ф-я закрытия модального окна
  const modal = document.querySelector(modalSelector);
  modal.classList.add('hide');
  modal.classList.remove('show');
  document.body.style.overflow = '';
}

function openModal(modalSelector, modalTimerId) {
  // ф-я окрытия модального окна
  const modal = document.querySelector(modalSelector);
  modal.classList.add('show');
  modal.classList.remove('hide');
  document.body.style.overflow = 'hidden';

  if (modalTimerId) {
    clearInterval(modalTimerId); // setTimeout отменяется после открытия модального окна
  }
}

function modal(triggerSelector, modalSelector, modalTimerId) {
  const btnModal = document.querySelectorAll(triggerSelector),
        // получение всех элементов со страницы
  modal = document.querySelector(modalSelector);
  btnModal.forEach(btn => {
    btn.addEventListener('click', () => openModal(modalSelector, modalTimerId)); // перебираем каждую кнопку
  });
  modal.addEventListener('click', e => {
    // закрытие модального окна при клике на подушку
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      closeModal(modalSelector);
    }
  });
  document.addEventListener('keydown', e => {
    // закрытие модального окна при нажатии Escape
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal(modalSelector);
    }
  });

  function showModalByScroll() {
    // вызываем модальное окно когда скролим страницу до конца 
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal(modalSelector, modalTimerId);
      window.removeEventListener('scroll', showModalByScroll); // вызываем это событие один раз
    }
  }

  window.addEventListener('scroll', showModalByScroll);
}

/* harmony default export */ __webpack_exports__["default"] = (modal);



/***/ }),

/***/ "./script/modules/slider.js":
/*!**********************************!*\
  !*** ./script/modules/slider.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function slider({
  container,
  slidesMany,
  nextArrow,
  prevArrow,
  totalCounter,
  currentCounter,
  wrapper,
  field
}) {
  const slides = document.querySelectorAll(slidesMany),
        //получаем все элементы со страницы
  slider = document.querySelector(container),
        next = document.querySelector(nextArrow),
        //кнопки
  prev = document.querySelector(prevArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        sliderWrapper = document.querySelector(wrapper),
        sliderField = document.querySelector(field),
        width = window.getComputedStyle(sliderWrapper).width;
  let slideIndex = 1; // переменная для понимания какой слайд показывается

  let offset = 0; // переменная для понимания на сколько мы отступили вправо или влево

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }

  sliderField.style.width = 100 * slides.length + '%'; //создание блока на всю ширину слайдов

  sliderField.style.display = 'flex';
  sliderField.style.transition = '0.5s all';
  sliderWrapper.style.overflow = 'hidden'; // прячем элементы, которые не показываются

  slides.forEach(slide => {
    // устанавливаем определенную ширину для каждого слайда
    slide.style.width = width;
  });
  slider.style.position = 'relative';
  const indicators = document.createElement('ol'),
        dots = [];
  indicators.classList.add('carousel-indicators');
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.classList.add('dot');

    if (i == 0) {
      dot.style.opacity = 1;
    }

    indicators.append(dot);
    dots.push(dot);
  }

  function activeSlider() {
    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = 1;
  }

  function addZero() {
    if (slides.length < 10) {
      //добавляем НОЛЬ перед чилом
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  }

  next.addEventListener('click', () => {
    if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
      // уловие, если уперлись в конец
      offset = 0; //то показываем первый слайд
    } else {
      offset += +width.slice(0, width.length - 2);
    }

    sliderField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
      //условие для цифр: если уперлись в конец
      slideIndex = 1; // то показываем первое значение
    } else {
      slideIndex++;
    }

    addZero();
    activeSlider();
  });
  prev.addEventListener('click', () => {
    // уловие, если уперлись в начало
    if (offset == 0) {
      // показываем последний слайд
      offset = +width.slice(0, width.length - 2) * (slides.length - 1);
    } else {
      offset -= +width.slice(0, width.length - 2);
    }

    sliderField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    addZero();
    activeSlider();
  });
  dots.forEach(dot => {
    dot.addEventListener('click', e => {
      const slideTo = e.target.getAttribute('data-slide-to');
      slideIndex = slideTo;
      offset = +width.slice(0, width.length - 2) * (slideTo - 1);
      sliderField.style.transform = `translateX(-${offset}px)`;
      activeSlider();
      addZero();
    });
  });
}

/* harmony default export */ __webpack_exports__["default"] = (slider);

/***/ }),

/***/ "./script/modules/tabs.js":
/*!********************************!*\
  !*** ./script/modules/tabs.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
  const tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector);

  function hideTabContent() {
    tabsContent.forEach(item => {
      // Cкрыть ненужные табы
      // item.style.display = "none";
      item.classList.add('hide'); // добавляем css класс hide {display = "none"}

      item.classList.remove('show', 'fade'); // удаляем css класс show {display = "block"}
    });
    tabs.forEach(item => {
      // удаляем у всех элементов класс акивности
      item.classList.remove(activeClass);
    });
  }

  function showTabContent(i = 0) {
    // Если ф-я вызовется без аргумента, то по умолчанию будет 0
    tabsContent[i].classList.add('show', 'fade'); // выводим нужный элемент

    tabsContent[i].classList.remove('hide'); // удаляем  ненужный элемент

    tabs[i].classList.add(activeClass); // присваеваем класс активности
  }

  hideTabContent();
  showTabContent();
  tabsParent.addEventListener('click', event => {
    // ставим обработчик событий на клик
    const target = event.target;

    if (target && target.classList.contains(tabsSelector.slice(1))) {
      // Проверяем что мы попали именно в нужное место, а не в родителя
      tabs.forEach((item, i) => {
        // перебираем все табы
        if (target == item) {
          // если таб и элемент в который кликнули совпали,
          hideTabContent(); // то выводим наши ф-ции

          showTabContent(i);
        }
      });
    }
  });
}

/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "./script/modules/timer.js":
/*!*********************************!*\
  !*** ./script/modules/timer.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function timer(id, deadline) {
  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
          // Кол-во мсек, которые остались до конца таймера
    days = Math.floor(t / (1000 * 60 * 60 * 24)),
          // конвертация оставшихся мсек в дни
    hours = Math.floor(t / (1000 * 60 * 60) % 24),
          minutes = Math.floor(t / 1000 / 60 % 60),
          seconds = Math.floor(t / 1000 % 60);
    return {
      // возвращаем значения в виде объекта
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`; // добавляем к единичному значению ноль
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    // получение всех элемонтов со страницы
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timeInterval = setInterval(updateClock, 1000); // обновление результатов каждую секунду

    updateClock(); // при обновлении стр не видно моргания таймера со стандартными значениями

    function updateClock() {
      const t = getTimeRemaining(endtime); // расчет оставшегося времени

      days.innerHTML = getZero(t.days); // передача результатов на страницу

      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(id, deadline);
}

/* harmony default export */ __webpack_exports__["default"] = (timer);

/***/ }),

/***/ "./script/services/sevice.js":
/*!***********************************!*\
  !*** ./script/services/sevice.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": function() { return /* binding */ postData; }
/* harmony export */ });
const postData = async (url, data) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: data
  });
  return await res.json();
};



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**************************!*\
  !*** ./script/script.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/cards */ "./script/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/forms */ "./script/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modal */ "./script/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/slider */ "./script/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/tabs */ "./script/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/timer */ "./script/modules/timer.js");









window.addEventListener('DOMContentLoaded', () => {
  const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__.openModal)('.modal', modalTimerId), 5000000);
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_0__.default)();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_1__.default)('form', modalTimerId);
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__.default)('[data-modal]', '.modal', modalTimerId);
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_4__.default)('.tabheader__item', '.tab-content', '.tabheader__items', 'tabheader__item_active');
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_5__.default)('.timer', '2021-09-14');
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_3__.default)({
    container: '.offer__slider',
    slidesMany: '.offer__slide',
    nextArrow: '.offer__slider-next',
    prevArrow: '.offer__slider-prev',
    totalCounter: '#total',
    currentCounter: '#current',
    wrapper: '.offer__slider-wrapper',
    field: '.offer__slider-inner'
  });
});
}();
/******/ })()
;
//# sourceMappingURL=bundle.js.map