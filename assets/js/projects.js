document.addEventListener("DOMContentLoaded", () => {

    new Swiper(".projectSwiper", {

        effect: "coverflow",

        centeredSlides: true,

        initialSlide: 1,

        slidesPerView: 3,

        breakpoints: {

            0: {
                slidesPerView: 1.3,
                spaceBetween: 14
            },

            576: {
                slidesPerView: 1.5
            },

            768: {
                slidesPerView: 2
            },

            992: {
                slidesPerView: 3
            }

        },

        loop: false,

        loopedSlides: 3,

        loopAdditionalSlides: 3,

        grabCursor: true,

        watchSlidesProgress: true,

        coverflowEffect: {

            rotate: window.innerWidth < 768 ? 0 : 18,

            depth: window.innerWidth < 768 ? 0 : 250,

            scale: window.innerWidth < 768 ? 1 : 0.82,

            slideShadows: false

        },

        pagination: {

            el: ".swiper-pagination",

            clickable: true

        },

        navigation: {

            nextEl: ".swiper-button-next",

            prevEl: ".swiper-button-prev"

        }

    });

});