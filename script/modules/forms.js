import {closeModal, openModal} from './modal';
import {postData} from '../services/sevice';

function forms(formSelector, modalTimerId) {
    
    const forms = document.querySelectorAll(formSelector); // получаем элемменты со страницы

    const message = {
        loading: "/icons/054 spinner.svg",
        success: "Спасибо! Скоро мы с вами свяжемся",
        failure: "Что-то пошло не так.."
    };

    forms.forEach(item => {   //перебираем каждый элемент со страницы
        bindPostData(item);
    });

    function bindPostData(form) {
        form.addEventListener('submit', (event) => { //обработчик событий для отправки формы
            event.preventDefault();

            const statusMessage = document.createElement('img');  // создаем ДОМ элемент в виде img
            statusMessage.src = message.loading;   // пишем путь к файлу
            statusMessage.classList.add('modal__img_load');
            form.insertAdjacentElement('afterend', statusMessage);   // подгружает элемент ПОСЛЕ блока 

            const formData = new FormData(form);   // подготовка и отправка данных в виде объекта

            const json = JSON.stringify(Object.fromEntries(formData.entries()))

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            })
            .catch(() => {
                showThanksModal(message.failure);
            })
            .finally(() => {
                form.reset();
            });

        });
    }

    function showThanksModal(message) {   // создаем второе модальное окно с результатом загрузки данных
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal('.modal', modalTimerId);

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
            closeModal('.modal');
        }, 3000);
    }
}

export default forms;