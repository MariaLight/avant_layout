document.addEventListener('DOMContentLoaded', function () {

    const btns = document.querySelectorAll('[data-modal]');
    const body = document.querySelector('body');
    const btnClose = document.querySelectorAll('[data-modal-close]');

    btns.forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            const modalId = e.target.closest('[data-modal]').getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('modal--active');
                body.style.overflow = 'hidden';
                addModalEventListeners(modal);
            }
        });
    });

    btnClose.forEach(close => {
        close.addEventListener('click', e => {
            const modal = e.target.closest('.modal');
            if (modal) {
                closeModal(modal);
            }
        });
    });

    function addModalEventListeners(modal) {
        modal.addEventListener('keydown', onModalKeyDown);
        modal.addEventListener('click', onModalClick);
    }

    function removeModalEventListeners(modal) {
        modal.removeEventListener('keydown', onModalKeyDown);
        modal.removeEventListener('click', onModalClick);
    }

    function closeModal(modal) {
        modal.classList.remove('modal--active');
        body.style.overflowY = '';
        removeModalEventListeners(modal);
    }

    function onModalKeyDown(e) {
        const modal = e.currentTarget;
        if (e.key === 'Escape') {
            closeModal(modal);
        }
    }

    function onModalClick(e) {
        const modalContent = e.currentTarget.querySelector('.modal__content');
        if (!modalContent.contains(e.target)) {
            closeModal(e.currentTarget);
        }
    }

    const searchBtn = document.querySelector('.header__search-btn');
    const searchFormWrapper = document.querySelector('.header__search-form');
    const headerSocials = document.querySelector('.header__socials');
    if (searchBtn && searchFormWrapper) {
        searchBtn.onclick = function () {
            searchFormWrapper.classList.add('active');
            searchFormWrapper.style.opacity = '1';
            searchFormWrapper.style.pointerEvents = 'auto';
            searchBtn.style.display = 'none';
            searchFormWrapper.querySelector('input').focus();
            headerSocials.classList.add('hide');
        };

        searchFormWrapper.querySelector('input').addEventListener('blur', function () {
            setTimeout(function () {
                searchFormWrapper.classList.remove('active');
                searchFormWrapper.style.opacity = '0';
                searchFormWrapper.style.pointerEvents = 'none';
                searchBtn.style.display = '';
                headerSocials.classList.remove('hide');
            }, 200);
        });
    }

    // const burgerBtn = document.querySelector('#burger');
    // const burgerMenu = document.querySelector('.header__menu');

    // burgerBtn.addEventListener('click', function () {
    //     burgerMenu.classList.toggle('active');
    //     burgerBtn.classList.toggle('active');
    //     console.log(burgerBtn, burgerMenu);
    // })

    // if (window.matchMedia('(max-width: 640px)')) {
    //     const headerMenu = document.querySelector('.header__menu');
    //     headerMenu.addEventListener('click', (e) => {
    //         const targetElement = e.target;
    //         if (targetElement.classList.contains('header__link') && targetElement.parentNode.querySelector('.header__submenu')) {
    //             e.preventDefault();
    //             targetElement.parentNode.classList.toggle('active');
    //             console.log(targetElement);

    //         }

    //     })
    // }
    const dropdown = document.querySelector('.header__menu__item--dropdown');
    const categories = dropdown.querySelectorAll('.services-dropdown__category');
    const groups = dropdown.querySelectorAll('.services-dropdown__subcategories-group');
    categories.forEach(cat => {
        cat.addEventListener('mouseenter', function () {
            categories.forEach(c => c.classList.remove('services-dropdown__category--active'));
            this.classList.add('services-dropdown__category--active');
            const catName = this.getAttribute('data-category');
            groups.forEach(g => {
                if (g.getAttribute('data-category') === catName) {
                    g.classList.add('active');
                } else {
                    g.classList.remove('active');
                }
            });
        });
        // Для мобильных: клик тоже переключает
        cat.addEventListener('click', function (e) {
            e.preventDefault();
            categories.forEach(c => c.classList.remove('services-dropdown__category--active'));
            this.classList.add('services-dropdown__category--active');
            const catName = this.getAttribute('data-category');
            groups.forEach(g => {
                if (g.getAttribute('data-category') === catName) {
                    g.classList.add('active');
                } else {
                    g.classList.remove('active');
                }
            });
        });
    });

    // Открытие/закрытие дропдауна по ховеру и фокусу
    let closeTimeout = null;
    dropdown.addEventListener('mouseenter', function () {
        clearTimeout(closeTimeout);
        dropdown.classList.add('_open');
    });
    dropdown.addEventListener('mouseleave', function () {
        closeTimeout = setTimeout(() => {
            dropdown.classList.remove('_open');
        }, 120);
    });

    // Для клавиатуры и мобильных: открытие по клику
    const link = dropdown.querySelector('.header__menu__link');
    link.addEventListener('click', function (e) {
        e.preventDefault();
        dropdown.classList.toggle('_open');
    });

    // Клик вне меню закрывает дропдаун
    document.addEventListener('click', function (e) {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('_open');
        }
    });

    // Мобильное меню
    const burgerBtn = document.querySelector('#burger');
    const mobileMenu = document.querySelector('.header__menu__mobile');
    const mobileMenuClose = document.querySelector('.header__menu__mobile__close');

    // Функция для закрытия всех dropdown'ов в мобильном меню
    function closeAllMobileDropdowns() {
        if (mobileMenu) {
            const allDropdowns = mobileMenu.querySelectorAll('.header__menu__item--dropdown');
            
            allDropdowns.forEach((dropdown, index) => {
                dropdown.classList.remove('_open');
                
                // Закрываем все category-item
                const allCategoryItems = dropdown.querySelectorAll('.services-dropdown__category-item');
                allCategoryItems.forEach(categoryItem => {
                    categoryItem.classList.remove('_open');
                });
                
                // Закрываем все subcategories-group
                const allSubcategories = dropdown.querySelectorAll('.services-dropdown__subcategories-group');
                allSubcategories.forEach(subcategory => {
                    subcategory.classList.remove('active');
                });
                
                // Закрываем все column-group-links
                const allColumnGroups = dropdown.querySelectorAll('.services-dropdown__column-group');
                allColumnGroups.forEach(group => {
                    group.classList.remove('_open');
                });
            });
        }
    }

    if (burgerBtn && mobileMenu) {
        burgerBtn.addEventListener('click', function () {
            mobileMenu.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        });
    }

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', function () {
            closeAllMobileDropdowns();
            mobileMenu.style.display = 'none';
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        });
    }

    // Закрытие мобильного меню по клику вне его
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function (e) {
            if (e.target === mobileMenu) {
                closeAllMobileDropdowns();
                mobileMenu.style.display = 'none';
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.width = '';
            }
        });
    }

    // Мобильные services-dropdown
    const mobileDropdowns = document.querySelectorAll('.header__menu__mobile .header__menu__item--dropdown');
    
    mobileDropdowns.forEach((mobileDropdown, dropdownIndex) => {
        const mobileCategoryItems = mobileDropdown.querySelectorAll('.services-dropdown__category-item');
        const mobileLink = mobileDropdown.querySelector('.header__menu__link');

        // Обработка клика по ссылке "Услуги" в мобильном меню
        mobileLink.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Если закрываем dropdown, то закрываем все вложенные элементы
            if (mobileDropdown.classList.contains('_open')) {
                
                // Закрываем все category-item
                const allCategoryItems = mobileDropdown.querySelectorAll('.services-dropdown__category-item');
                allCategoryItems.forEach(categoryItem => {
                    categoryItem.classList.remove('_open');
                });
                
                // Закрываем все subcategories-group
                const allSubcategories = mobileDropdown.querySelectorAll('.services-dropdown__subcategories-group');
                allSubcategories.forEach(subcategory => {
                    subcategory.classList.remove('active');
                });
                
                // Закрываем все column-group-links
                const allColumnGroups = mobileDropdown.querySelectorAll('.services-dropdown__column-group');
                allColumnGroups.forEach(group => {
                    group.classList.remove('_open');
                });
            } else {
                // Если открываем dropdown, то закрываем все остальные dropdown'ы
                mobileDropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== mobileDropdown) {
                        otherDropdown.classList.remove('_open');
                        
                        // Закрываем все вложенные элементы в других dropdown'ах
                        const allCategoryItems = otherDropdown.querySelectorAll('.services-dropdown__category-item');
                        allCategoryItems.forEach(categoryItem => {
                            categoryItem.classList.remove('_open');
                        });
                        
                        const allSubcategories = otherDropdown.querySelectorAll('.services-dropdown__subcategories-group');
                        allSubcategories.forEach(subcategory => {
                            subcategory.classList.remove('active');
                        });
                        
                        const allColumnGroups = otherDropdown.querySelectorAll('.services-dropdown__column-group');
                        allColumnGroups.forEach(group => {
                            group.classList.remove('_open');
                        });
                    }
                });
            }
            
            mobileDropdown.classList.toggle('_open');
        });

        // Обработка клика по кнопкам категорий в мобильном меню
        mobileCategoryItems.forEach((item, index) => {
            const btn = item.querySelector('.services-dropdown__category-btn');
            const subcategories = item.querySelector('.services-dropdown__subcategories-group');
            
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                
                // Если закрываем категорию, то закрываем все вложенные группы
                if (item.classList.contains('_open')) {
                    const allColumnGroups = item.querySelectorAll('.services-dropdown__column-group');
                    allColumnGroups.forEach(group => {
                        group.classList.remove('_open');
                    });
                }
                
                // Закрываем все остальные категории
                mobileCategoryItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('_open');
                    }
                });
                
                // Переключаем текущую категорию
                item.classList.toggle('_open');
            });
        });

        // Обработка клика по кнопкам-триггерам заголовков групп
        const mobileColumnGroups = mobileDropdown.querySelectorAll('.services-dropdown__column-group');
        
        mobileColumnGroups.forEach((group, index) => {
            const btn = group.querySelector('.services-dropdown__column-group-btn');
            const links = group.querySelector('.services-dropdown__column-group-links');
            
            // Обрабатываем только группы, у которых есть контент
            if (btn && links && links.children.length > 0) {
                btn.addEventListener('click', function (e) {
                    e.preventDefault();
                    
                    // Переключаем текущую группу
                    group.classList.toggle('_open');
                });
            }
            // Если у группы нет вложенных ссылок, то это обычная ссылка
            // и не нужно добавлять обработчик событий
        });
    });

    Fancybox.bind('[data-fancybox]', {});

})

