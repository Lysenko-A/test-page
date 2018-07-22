import $ from 'jquery';
import Swiper from 'swiper/dist/js/swiper.min'
import validate from 'jquery-validation'

$(document).ready(function () {

////////////// mobile menu
    $('.mobile_menu').click(function () {
        $('.wrap_nav').toggleClass('active');
        $('.mobile_menu').toggleClass('active');
    });


////////////////////// slider
    let testimonial = new Swiper('.swiper-container', {
        direction: 'horizontal',
        loop: true,
        navigation: {
            nextEl: '.swiper-arrow-next',
            prevEl: '.swiper-arrow-prev',
        },
    });
//////////////////////// form validate
    $('.form').validate({
        rules: {
            email: {
                required: true,
                email: true
            }
        }
    });

    new WOW().init();

});