function initCommonSwiper(selector) {
    return new Swiper(selector, {
        loop: false,
        slidesPerView: 4,
        spaceBetween: 40,
        navigation: {
            nextEl: selector + ' .swiper-button-next',
            prevEl: selector + ' .swiper-button-prev',
        },
        on: {
            slideChange: updateVisibleSlides,
            init: updateVisibleSlides
        }
    });
}

const licenceSwiper = initCommonSwiper('.licence__swiper');
const cheersSwiper = initCommonSwiper('.gratitude__swiper');
const worksSwiper = initCommonSwiper('.works__swiper');
const addonsSwiper = initCommonSwiper('.addons__swiper');

function updateVisibleSlides() {
    this.slides.forEach(slide => {
        slide.classList.remove('swiper-slide-visible');
    });
    for (let i = this.activeIndex; i < this.activeIndex + this.params.slidesPerView; i++) {
        if (this.slides[i]) this.slides[i].classList.add('swiper-slide-visible');
    }
}

const feedbackSwiper = new Swiper('.feedback__swiper', {
    loop: false,
    slidesPerView: 3,
    spaceBetween: 40,
    navigation: {
        nextEl: '.swiper__btns .swiper-button-next',
        prevEl: '.swiper__btns .swiper-button-prev',
    },
    on: {
        slideChange: updateVisibleSlides,
        init: updateVisibleSlides
    }
});