document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.hero__card');
    const heroDescription = document.querySelector('.hero__description');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {

            cards.forEach(c => {
                if (c === card) {
                    c.classList.add('_active');
                    c.classList.remove('_shrink');
                    heroDescription.textContent = card.dataset.description;

                } else {
                    c.classList.add('_shrink');
                    c.classList.remove('_active');

                }
            });
        });
        card.addEventListener('mouseleave', () => {
            cards.forEach(c => {
                c.classList.remove('_active');
                c.classList.remove('_shrink');
            });
            heroDescription.textContent = heroDescription.dataset.description;

        });
    });
});