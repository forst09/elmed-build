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
});