document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.hero__card');
    cards.forEach(card => {
        const cardTitle = card.querySelector('.hero__card-title');
        const cardHidden = card.querySelector('.hero__card__hidden');
        card.addEventListener('mouseenter', () => {
            cards.forEach(c => {
                if (c === card) {
                    c.classList.add('_active');
                    c.classList.remove('_shrink');
                    cardTitle.classList.remove('hide');
                    cardHidden.classList.remove('show');
                } else {
                    c.classList.add('_shrink');
                    c.classList.remove('_active');
                    cardTitle.classList.add('hide');
                    cardHidden.classList.add('show');
                }
            });
        });
        card.addEventListener('mouseleave', () => {
            cards.forEach(c => {
                c.classList.remove('_active');
                c.classList.remove('_shrink');
                cardTitle.classList.remove('hide');
                cardHidden.classList.remove('show');
            });
        });
    });
});