function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    
    const tabs = document.querySelectorAll(tabsSelector),
          tabsContent = document.querySelectorAll(tabsContentSelector),
          tabsParent = document.querySelector(tabsParentSelector);

    function hideTabContent() { 
    tabsContent.forEach(item => {  // Cкрыть ненужные табы
        // item.style.display = "none";
        item.classList.add('hide'); // добавляем css класс hide {display = "none"}
        item.classList.remove('show', 'fade'); // удаляем css класс show {display = "block"}
    });

    tabs.forEach (item => {  // удаляем у всех элементов класс акивности
        item.classList.remove(activeClass);  
    });
    }

    function showTabContent (i = 0) { // Если ф-я вызовется без аргумента, то по умолчанию будет 0
    tabsContent[i].classList.add('show', 'fade'); // выводим нужный элемент
    tabsContent[i].classList.remove('hide'); // удаляем  ненужный элемент
    tabs[i].classList.add(activeClass);  // присваеваем класс активности
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => { // ставим обработчик событий на клик
    const target = event.target;

    if(target && target.classList.contains(tabsSelector.slice(1))) { // Проверяем что мы попали именно в нужное место, а не в родителя
        tabs.forEach((item, i) => {   // перебираем все табы
            if(target == item) {       // если таб и элемент в который кликнули совпали,
                hideTabContent();     // то выводим наши ф-ции
                showTabContent(i);
            }
        });
    }
    });
}

export default tabs;