'use strict';

$(document).ready(function () {
    //ГЛАВНЫЙ ЭКРАН
    const swiperMain = new Swiper('.swiper-main', {
        speed: 700,
        slidesPerView: 1,
        spaceBetween: 8,
        navigation: {
            nextEl: '.swiper-main-next',
            prevEl: '.swiper-main-prev',
        },
        pagination: {
            el: '.swiper-main-pagination',
            type: 'bullets',
        },
    });
    //УБРАТЬ КНОПКУ ПОКАЗАТЬ ПОЛНОСТЬЮ, ЕСЛИ ТЕКСТ ВМЕЩАЕТСЯ В БЛОК
    let jshide = $('.js-hide');
    jshide.each(function () {
        let texthideHeight = $(this).find('.text-hide').height();

        if (texthideHeight <= $(this).height()) {
            $(this).parents('.js-hide__parent').find('.btn-show__wrapper').hide();
            $(this).css('height', texthideHeight);
        }
    });

    // ПОКАЗАТЬ/СКРЫТЬ ТЕКСТ
    $(document).on('click', ".btn-show", function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(this).parents('.js-hide__parent').find(".js-hide").css('height', '');
        }
        else {
            $(this).addClass('active');
            let h = $(this).parents('.js-hide__parent').find(".text-hide").css('height');
            $(this).parents('.js-hide__parent').find(".js-hide").css('height', h);
        }
    });

    //МАСКА НА ИНПУТЫ С ТЕЛЕФОНОМ
    jQuery('.input-phone').inputmask({
        mask: '+7 (999) 999-99-99',
        showMaskOnHover: false
    });

    //ФИКСИРОВАННАЯ ШАПКА НА СКРОЛЛЕ 
    if ($('.header').length !== 0) {
        let header = document.querySelector('.header');
        let headerFix = document.querySelector('.header-fixed');
        let headerHeight = header.clientHeight + 200;
        document.onscroll = function () {
            let scroll = window.scrollY;

            if (scroll > headerHeight) {
                headerFix.classList.add('active');
            }
            else {
                headerFix.classList.remove('active');
            }
        };
    };

    // Anchor
    const anchorScroll = function (e, _this) {
        e.preventDefault();
        let elementClick = _this.attr("href");
        let destination = $(elementClick).offset().top - 200;
        jQuery("html:not(:animated),body:not(:animated)").animate({
            scrollTop: destination
        }, 1000);
        return false;
    };

    $(document).on('click', '.header__menu-link', function (e) {
        anchorScroll(e, $(this));
    });

    // ОТКРЫТЬ МОБ МЕНЮ
    $(document).on('click', '.header__burger', function () {
        if ($(window).width() >= 668) {
            $('.mob-menu__bg').addClass('active');
        }
        $('html').addClass('scroll-hidden');
        $('.mob-menu').addClass('active');
    });

    //ЗАКРЫТЬ МОБ МЕНЮ
    $(document).on('click', '.mob-menu__close', function () {
        if ($(window).width() >= 668) {
            $('.mob-menu__bg').removeClass('active');
        }
        $('html').removeClass('scroll-hidden');
        $('.mob-menu').removeClass('active');
    });

    //ЗАКРЫТЬ МОБ МЕНЮ ПО КЛИКУ НА ФОН
    $(document).on('click', '.mob-menu__bg', function () {
        if ($(window).width() >= 668) {
            $('.mob-menu__bg').removeClass('active');
            $('html').removeClass('scroll-hidden');
            $('.mob-menu').removeClass('active');
        }
    });

    //ПОДКЛЮЧЕНИЕ КАЛЕНДАРЯ
    new AirDatepicker('#firstSessionDate', {
        inline: true,
        navTitles: {
            days: 'MMMM yyyy'
        },
        autoClose: true,
        minDate: new Date(),
    });

    $('.air-datepicker').addClass('hide');

    $(document).mouseup(function (e) { // событие клика по веб-документу
        let div = $(".input-choice__wrapper"); // 
        if (!div.is(e.target) // если клик был не по нашему блоку
            && div.has(e.target).length === 0 && $('.air-datepicker-global-container').has(e.target).length === 0) { // и не по его дочерним элементам
            div.removeClass('active');
            if (div.find('.time-choice__wrapper')) {
                div.find('.time-choice__wrapper').removeClass('active');
            } // скрываем его
            if (div.find('.air-datepicker')) {
                div.find('.air-datepicker').removeClass('active');
            } // скрываем его
        }
    });

    //ИНПУТЫ С ВЫБОРОМ ВРЕМЕНИ И ДАТЫ
    $(document).on('click', '.input-choice__wrapper', function () {
        $('.input-choice__wrapper').removeClass('active');
        $('.time-choice__wrapper').removeClass('active');
        $('.air-datepicker').removeClass('active');
        $(this).addClass('active');
        if ($(this).find($('.input-choice-time'))) {
            $(this).find('.time-choice__wrapper').addClass('active');
        }
        if ($(this).find($('.air-datepicker'))) {
            $(this).find('.air-datepicker').addClass('active');
        }
    });

    //ПЕРЕДАЧА ВРЕМЕНИ С ВЫПАДАШКИ В ИНПУТ
    $(document).on('click', '.time-choice__item', function (e) {
        e.stopPropagation();
        let val = $(this).find('span').text();
        $(this).parents('.input-choice__wrapper').find('.input-choice').val(val);
        $(this).parents('.time-choice__wrapper').removeClass('active');
        $(this).parents('.input-choice__wrapper').removeClass('active');
    });

    //ЗАКРЫТЬ КАЛЕНДАРЬ ПО КЛИКУ НА ЯЧЕЙКУ
    $(document).on('click', '.air-datepicker-cell', function (e) {
        e.stopPropagation();
        if (!($(this).hasClass('-disabled-') || $(this).hasClass('-month-'))) {
            $(this).parents('.air-datepicker').removeClass('active');
            $(this).parents('.input-choice__wrapper').removeClass('active');
        }
    });

    //ЭЛЕМЕНТЫ СПИСКА ВЫЕЗЖАЮТ СЛЕВА НА МОБИЛКЕ
    if ($(window).width() < 668) {
        function onEntry(entry) {
            entry.forEach(change => {
                if (change.isIntersecting) {
                    change.target.classList.add('element-show');
                }
            });
        }

        let options = {
            threshold: [0.3]
        };
        let observer = new IntersectionObserver(onEntry, options);
        let elements = document.querySelectorAll('.advantages__text-item');

        for (let elm of elements) {
            observer.observe(elm);
        }
    };

    //ОТКРЫТИЕ ВИДЕО С СЕКЦИИ О НАС
    $(document).on('click', '.about__video-play', function (e) {
        e.preventDefault();
        let firstString = 'https://www.youtube.com/embed/';
        let link = $(this).attr('href');
        let newLink;
        if (link.indexOf('v=') !== -1) {
            let arrayLinks = link.split('v=');
            let secondString = arrayLinks[arrayLinks.length - 1];
            newLink = firstString + secondString;
        }
        else {
            newLink = link;
        }

        const fancybox = Fancybox.show([
            {
                src: newLink,
                type: 'iframe'
            }
        ])

    });

    // ПОДКЛЮЧЕНИЕ КАРТЫ
    let isMapLoaded = false;
    const jsMap = document.querySelector("#map");
    const renderMap = function (mapId = "map") {
        if ($("#map").length !== 0) {
            ymaps.ready(function () {
                let myMap = new ymaps.Map(`${mapId}`, {
                    center: [$(`#${mapId}`).attr("data-coords").split(",")[0],
                    $(`#${mapId}`).attr("data-coords").split(",")[1]],
                    zoom: $(window).width() > 667 ? 17 : 16,
                    controls: []
                }),

                    // Создаём макет содержимого ГЕОЛОКАЦИЯ.
                    MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                        '<div class="icon-map"></div>'
                    ),
                    myPlacemarkWithContent = new ymaps.Placemark(
                        [$(`#${mapId}`).attr("data-coords").split(",")[0],
                        $(`#${mapId}`).attr("data-coords").split(",")[1]],
                        {},
                        {
                            // Опции.
                            // Необходимо указать данный тип макета.
                            iconLayout: "default#image",
                            // Своё изображение иконки метки.
                            iconImageHref: "../image/map-logo.svg",
                            // Размеры метки.
                            iconImageSize: [71, 47],
                            // Смещение левого верхнего угла иконки относительно
                            // её "ножки" (точки привязки).
                            iconImageOffset: [-10, -80],

                            // Макет содержимого.
                            iconContentLayout: MyIconContentLayout,
                        }
                    );
                myMap.geoObjects
                    .add(myPlacemarkWithContent);

            });

        }
    };

    const creatMapsScript = function (id) {
        let scriptYMAPS = document.createElement("script");
        scriptYMAPS.src =
            "https://api-maps.yandex.ru/2.1/?apikey=e2ae43d9-0c0a-49c7-9736-80d055e3dcf2&lang=ru_RU";
        scriptYMAPS.setAttribute("async", "");
        document
            .querySelector("body")
            .insertAdjacentElement("beforeend", scriptYMAPS);
        scriptYMAPS.onload = function () {
            renderMap(id);
        };
    };

    const revealMapBlock = function (entries, observer) {
        const [entry] = entries;
        if (!entry.isIntersecting) return;


        if (!isMapLoaded) {
            creatMapsScript();
            isMapLoaded = true;
        }
        observer.unobserve(entry.target);
    };

    const mapObserver = new IntersectionObserver(revealMapBlock, {
        root: null,
        threshold: 0.15,
    });

    if (jsMap) mapObserver.observe(jsMap);
});