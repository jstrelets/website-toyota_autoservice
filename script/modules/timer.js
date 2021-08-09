function timer(id, deadline) {
    
    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()), // Кол-во мсек, которые остались до конца таймера
              days = Math.floor(t / (1000 * 60 * 60 * 24)),  // конвертация оставшихся мсек в дни
              hours = Math.floor((t / (1000 * 60 * 60) % 24)),
              minutes = Math.floor((t / 1000 / 60 ) % 60),
              seconds = Math.floor((t / 1000) % 60);

        return {   // возвращаем значения в виде объекта
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds 
        };
    }

    function getZero(num) {
        if(num >= 0 && num < 10) {
            return `0${num}`; // добавляем к единичному значению ноль
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {         // получение всех элемонтов со страницы
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000); // обновление результатов каждую секунду

        updateClock ();    // при обновлении стр не видно моргания таймера со стандартными значениями

        function updateClock () {
            const t = getTimeRemaining(endtime); // расчет оставшегося времени

            days.innerHTML = getZero(t.days);   // передача результатов на страницу
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if(t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    
    setClock(id, deadline);
}

export default timer;