function slider({container, slidesMany, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    
    const slides = document.querySelectorAll(slidesMany),   //получаем все элементы со страницы
          slider = document.querySelector(container),
          next = document.querySelector(nextArrow),  //кнопки
          prev = document.querySelector(prevArrow),
          total = document.querySelector(totalCounter),
          current = document.querySelector(currentCounter),
          sliderWrapper = document.querySelector(wrapper),
          sliderField = document.querySelector(field),
          width = window.getComputedStyle(sliderWrapper).width;  
          

    let slideIndex = 1;   // переменная для понимания какой слайд показывается
    let offset = 0;    // переменная для понимания на сколько мы отступили вправо или влево

    if(slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    sliderField.style.width = 100 * slides.length + '%';  //создание блока на всю ширину слайдов
    sliderField.style.display = 'flex';
    sliderField.style.transition = '0.5s all';

    sliderWrapper.style.overflow = 'hidden';     // прячем элементы, которые не показываются

    slides.forEach(slide => {    // устанавливаем определенную ширину для каждого слайда
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
          dots = [];

    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for(let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');

        if(i == 0) {
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
        if(slides.length < 10) {       //добавляем НОЛЬ перед чилом
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    next.addEventListener('click', () => {
        if(offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {   // уловие, если уперлись в конец
            offset = 0;                                                         //то показываем первый слайд
        } else {
            offset += +width.slice(0, width.length - 2);
        }

        sliderField.style.transform = `translateX(-${offset}px)`;

        if(slideIndex == slides.length) {  //условие для цифр: если уперлись в конец
            slideIndex = 1;                 // то показываем первое значение
        } else {
            slideIndex++;
        }

        addZero();
        
        activeSlider();
    });

    prev.addEventListener('click', () => {    // уловие, если уперлись в начало
        if(offset == 0) {                       // показываем последний слайд
            offset = +width.slice(0, width.length - 2) * (slides.length - 1)
        } else {
            offset -= +width.slice(0, width.length - 2);
        }

        sliderField.style.transform = `translateX(-${offset}px)`;

        if(slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        
        addZero();
      
        activeSlider();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;

            offset = +width.slice(0, width.length - 2) * (slideTo - 1);

            sliderField.style.transform = `translateX(-${offset}px)`;

            activeSlider();
            
            addZero();
        });
    });
}

export default slider;