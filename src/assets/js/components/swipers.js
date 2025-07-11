const licenceSwiper = new Swiper('.licence__swiper', {
    loop: false,
    slidesPerView: 4,
    spaceBetween: 40,
    // breakpoints: {
    //     768: {
    //         slidesPerView: 2,
    //     },
    // },
    navigation: {
        nextEl: '.licence__swiper .swiper-button-next',
        prevEl: '.licence__swiper .swiper-button-prev',
    },
    // on: {
    //     slideChange: function () {
    //         this.slides.forEach((slide, idx) => {
    //             if (!slide.classList.contains('swiper-slide-visible')) {
    //                 slide.classList.add('my-invisible-slide');
    //             } else {
    //                 slide.classList.remove('my-invisible-slide');
    //             }
    //         });
    //     },
    //     init: function () {
    //         this.slides.forEach((slide, idx) => {
    //             if (!slide.classList.contains('swiper-slide-visible')) {
    //                 slide.classList.add('my-invisible-slide');
    //             } else {
    //                 slide.classList.remove('my-invisible-slide');
    //             }
    //         });
    //     }
    // }
    on: {
        slideChange: updateVisibleSlides,
        init: updateVisibleSlides
    }

});

function updateVisibleSlides() {
    this.slides.forEach(slide => {
        slide.classList.remove('swiper-slide-visible');
    });
    for (let i = this.activeIndex; i < this.activeIndex + this.params.slidesPerView; i++) {
        if (this.slides[i]) this.slides[i].classList.add('swiper-slide-visible');
    }
}