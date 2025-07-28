document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.hero__card');
    const heroDescription = document.querySelector('.hero__description');
    
    // Функция для активации карточки
    const activateCard = (activeCard) => {
        cards.forEach(c => {
            if (c === activeCard) {
                c.classList.add('_active');
                c.classList.remove('_shrink');
                heroDescription.textContent = activeCard.dataset.description;
            } else {
                c.classList.add('_shrink');
                c.classList.remove('_active');
            }
        });
    };
    
    // Функция для деактивации всех карточек
    const deactivateAllCards = () => {
        cards.forEach(c => {
            c.classList.remove('_active');
            c.classList.remove('_shrink');
        });
        heroDescription.textContent = heroDescription.dataset.description;
    };
    
    cards.forEach(card => {
        // Обработчики для десктопной версии (hover)
        card.addEventListener('mouseenter', () => {
            activateCard(card);
        });
        
        card.addEventListener('mouseleave', () => {
            deactivateAllCards();
        });
        
        // Обработчики для мобильной версии (click)
        card.addEventListener('click', (e) => {
            // Проверяем ширину экрана для мобильной версии
            if (window.innerWidth <= 960) {
                // Если карточка уже активна, позволяем ссылке сработать
                if (card.classList.contains('_active')) {
                    // Не блокируем событие, позволяем ссылке сработать
                    return;
                } else {
                    // Иначе активируем карточку и блокируем переход
                    e.preventDefault();
                    e.stopPropagation();
                    activateCard(card);
                }
            }
        });
    });
});