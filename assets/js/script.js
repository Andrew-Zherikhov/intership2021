(function () {
    const header = document.querySelector('.header')
    const firstSection = document.querySelector('.first-screen')
    let headerHeight = firstSection.clientHeight

    if (header && headerHeight) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > headerHeight) {
            header.classList.add('second')
        } else {
            header.classList.remove('second')
        }
    })
}
window.addEventListener('resize', () => {
    headerHeight = firstSection.clientHeight
})
})();

let slideNow = 1;
let slideCount = $('#slidewrapper').children().length;
let slideInterval = 3000;
let navBtnId = 0;
let translateWidth = 0;

$(document).ready(function() {
    let switchInterval = setInterval(nextSlide, slideInterval);

    $('#viewport').hover(function() {
        clearInterval(switchInterval);
    }, function() {
        switchInterval = setInterval(nextSlide, slideInterval);
    });

    $('#next-btn').click(function() {
        nextSlide();
    });

    $('#prev-btn').click(function() {
        prevSlide();
    });

    $('.slide-nav-btn').click(function() {
        navBtnId = $(this).index();

        if (navBtnId + 1 != slideNow) {
            translateWidth = -$('#viewport').width() * (navBtnId);
            $('#slidewrapper').css({
                'transform': 'translate(' + translateWidth + 'px, 0)',
                '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
                '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
            });
            slideNow = navBtnId + 1;
        }
    });
});


function nextSlide() {
    if (slideNow == slideCount || slideNow <= 0 || slideNow > slideCount) {
        $('#slidewrapper').css('transform', 'translate(0, 0)');
        slideNow = 1;
    } else {
        translateWidth = -$('#viewport').width() * (slideNow);
        $('#slidewrapper').css({
            'transform': 'translate(' + translateWidth + 'px, 0)',
            '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
            '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
        });
        slideNow++;
    }
}

function prevSlide() {
    if (slideNow == 1 || slideNow <= 0 || slideNow > slideCount) {
        translateWidth = -$('#viewport').width() * (slideCount - 1);
        $('#slidewrapper').css({
            'transform': 'translate(' + translateWidth + 'px, 0)',
            '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
            '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
        });
        slideNow = slideCount;
    } else {
        translateWidth = -$('#viewport').width() * (slideNow - 2);
        $('#slidewrapper').css({
            'transform': 'translate(' + translateWidth + 'px, 0)',
            '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
            '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
        });
        slideNow--;
    }
}

const circles = document.querySelectorAll('.js-circle')
const contents = document.querySelectorAll('.js-content')

if(circles.length && contents.length && (circles.length === contents.length)){
    function removeActive(){
        circles.forEach((item, index) => {
            item.classList.remove('active')
            contents[index].classList.remove('active')
        })
    }

    circles.forEach((item, index) => {
        item.addEventListener('click', ()=>{
            removeActive()
            item.classList.add('active')
            contents[index].classList.add('active')
        })
    })
}

$(function() {
    $("#phone").mask("+7(999)999-99-99");
});


//Получаем форму
const form = document.querySelector('.request__section-form')

//Получаем массив инпутов
const inputs = form?.querySelectorAll('input')

//Выделяем классы в константы для удобства
const ERROR_TEXT_CLASS = 'error-text'
const ERROR_INPUT_CLASS = 'error-input'

//Настройки формы
const formOptions = {
    name: {
        message: 'Поле должно быть заполнено',
        isValid: function (input) {
            return input.value.trim().length > 0
        }
    },
    telephone: {
        message: 'Введите свой номер телефона',
        isValid: function (input) {
            return input.value.trim().length === 16
        }
    },
    email: {
        message: 'Поле должно быть заполнено',
        isValid: function (input) {
            return input.value.trim().length > 0
        }
    },
    agree: {
        message: 'Требуется согласие',
        isValid: function (input) {
            return (input.checked);
        }
    },
}

if (form && inputs.length) {
    //Убираем html5 валидацию
    form.setAttribute('novalidate', 'novalidate')
    //Создаем моковую функцию, которая отправит данные на сервер
    function sendForm() {
        alert('form is sent!')
    }
    //Основная функция валидации
    function validate() {
        //Устанавливаем, что форма валидна. Если переменная не изменится, то так и вернем true
        let formIsValid = true
        inputs.forEach(item => {
            if (!formOptions[item.name].isValid(item)) {
                //Если функция из настроек формы вернула false, форма невалидна
                formIsValid = false
                //И если до этого мы не добавляли класс ошибки и сообщение, то добавляем
                if (!item.parentNode.querySelector(`.${ERROR_TEXT_CLASS}`)) {
                    item.classList.add(ERROR_INPUT_CLASS)
                    const errorBlock = document.createElement('div')
                    errorBlock.classList.add(ERROR_TEXT_CLASS)
                    //Текст сообщения тоже берем из настроек формы
                    errorBlock.textContent = formOptions[item.name].message
                    item.parentNode.appendChild(errorBlock)
                }
            } else {
                item.classList.remove(ERROR_INPUT_CLASS)
                const errorBlock = item.parentNode.querySelector(`.${ERROR_TEXT_CLASS}`)
                //Если блок ошибки есть, удаляем его.
                if (errorBlock) {
                    item.parentNode.removeChild(errorBlock)
                }

            }
        })
        return formIsValid
    }
    //Функция для обнуления формы. Убираем ошибки, чистим инпуты и убираем лишний обработчик на форме.
    function clearErrors() {
        inputs.forEach(item => {
            item.value = ''
            const errorBlock = item.parentNode.querySelector(`.${ERROR_TEXT_CLASS}`)
            if (errorBlock) {
                item.parentNode.removeChild(errorBlock)
            }

        })
        form.oninput = null
    }
    //Функция, которая вызывается непосредственно перед отправкой формы
    form.onsubmit = function (e) {
        //Отменяем поведение браузера по умолчанию (перезагрузка страницы)
        e.preventDefault()
        if (validate()) {
            //Если все в порядке, очищаем ошибки и отправляем форму AJAX
            clearErrors()
            sendForm()
        } else {
            //Если валидация не пройдена - навешиваем ее уже на каждое событие ввода в форму, чтобы пользователь мог отследить исчезновение ошибок.
            form.oninput = function () {
                validate()
            }
        }
    }
}

const modal = document.querySelector('.js-modal')
const openBtn = document.querySelector('.js-open-modal')
const closeBtn = document.querySelector('.js-close-modal')

if(modal && openBtn && closeBtn){
    modal.addEventListener('click', (e)=>{
        const target = e.target
        if(target === modal || target === closeBtn){
            modal.classList.remove('active-modal')
        }
    })
    openBtn.addEventListener('click', ()=>{
        modal.classList.add('active-modal')
    })

}