function closeModal (modalSelector) {        // ф-я закрытия модального окна
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function openModal(modalSelector, modalTimerId) {      // ф-я окрытия модального окна
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show'); 
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    if(modalTimerId) {
        clearInterval(modalTimerId);  // setTimeout отменяется после открытия модального окна
    }
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    
    const btnModal = document.querySelectorAll(triggerSelector), // получение всех элементов со страницы
          modal = document.querySelector(modalSelector);

    
    btnModal.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId)); // перебираем каждую кнопку
    });

    modal.addEventListener('click', (e) => {  // закрытие модального окна при клике на подушку
        if(e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {     // закрытие модального окна при нажатии Escape
        if(e.code === 'Escape' && modal.classList.contains('show')) {   
            closeModal(modalSelector);
        }
    });

    


    function showModalByScroll() {   // вызываем модальное окно когда скролим страницу до конца 
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll); // вызываем это событие один раз
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {openModal};
export {closeModal};