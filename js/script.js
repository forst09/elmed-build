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
});