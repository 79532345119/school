window.addEventListener('DOMContentLoaded', function () { //waiting for DOM loaded - ждем, пока загрузится DOM дерево
    'use strict';

    let tab = document.querySelectorAll('.info-header-tab'), // receiving our TABS from html page - получаем наши табы (кнопки) с html странички по классу info-header-tab
        info = document.querySelector('.info-header'), // receiving PARENT of our TABS - получаем родителя (обертку) наших табов по классу info-header
        tabContent = document.querySelectorAll('.info-tabcontent'); // receiving content - получаем содержимое табов по классу info-tabcontent
    function hideTabContent(a) {                                    // hiding all tabs contents exept first one - скрываем содержимое всех табов, кроме первого
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');                    // we use class SHOW in *.css -to show elements - используем класс show в файлике с css для эдементов ,которые хотим показать
            tabContent[i].classList.add('hide');                       // we use class HIDE in *.css -to hide elements 
        }
    }
    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function (event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    // timer / таймер 

    let deadline = '2020-01-01'; // deadline / дата окончания таймера (дедлайн)

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor(t / (1000 * 60 * 60));

        return {
            'total': t,
            'seconds': seconds,
            'minutes': minutes,
            'hours': hours
        };
    }
    function setClock(id, endtime) {                   // receiving fields from html page using class selector / получаем поля, куда надо поместить время из html странички
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {                        // updating fields on html page / обновляем данные таймера на html страничке
            let t = getTimeRemaining(endtime);
            function addZero(num) {
                if (num <= 9) {
                    return '0' + num;
                } else return num;
            };

            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if (t.total <= 0) {                     // cancelling timer when deadline is over / останавливаем таймер при достижении заданной даты(дедлайна)
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }


    }
    setClock('timer', deadline);


    // modal

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

    let modalOpener = function () {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    }

    more.addEventListener('click', modalOpener);

    close.addEventListener('click', function () {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    })

    let descriptionBtn = document.querySelectorAll('.description-btn');
    
    for (let i = 0; i < descriptionBtn.length; i++) {

        descriptionBtn[i].addEventListener('click', modalOpener);
    }

    // Form sender Отправка формы на сайт
    let message = {
        loading: "Загрузка...",
        sucsess: "Спасибо! Скоро мы с Вами свяжемся!",
        failure: "Что-то пошло не так..."
    };
     
    let form = document.querySelector('.main-form'),
        formContact = document.querySelector('#form'),
        input = form.getElementsByTagName ('input'),
        emailInput = document.getElementById('form')[0],
        phoneInput = document.getElementById('form')[1],
        statusMessage = document.createElement('div');
         
     
        statusMessage.classList.add('status');
     
    function sendForm(elem){
     
        elem.addEventListener('submit', function (event) {
            event.preventDefault();
            elem.appendChild(statusMessage);
        
            let formData = new FormData(elem);
            let obj = {};                               //превращаем объект formData в обычный объект
            formData.forEach(function (value, key) {
            obj[key] = value;
        });
        let json = JSON.stringify(obj); // превратили обычный объект в JSON
        
        function postData() {
            return new Promise(function (resolve, reject) {
                let request = new XMLHttpRequest();
                request.open('POST', 'server.php');
                request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
                request.onreadystatechange = function () {
                    if(request.readyState < 4) {
                        resolve();
                    } else if (request.readyState === 4) {
                        if (request.status == 200 && request.status < 300) {
                            resolve();
                        } else {
                            reject();
                        }
                    }
                };
                request.send(json); 
            });
        }
            function clearInput() {
            for (let i = 0; i < input.length; i++) {
                input[i].value = '';
            }
            emailInput.value = ""; // очистил форму
            phoneInput.value = ""; // очистил форму

        }
        postData (formData)
            .then (() => statusMessage.innerHTML = message.loading)
            .then (() => statusMessage.innerHTML = message.sucsess)
            .catch (() => statusMessage.innerHTML = message.failure)
            .then (clearInput);
        });
    }
    sendForm(form);
    sendForm(formContact);

});