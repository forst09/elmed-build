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
});