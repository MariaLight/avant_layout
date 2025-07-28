
document.addEventListener('DOMContentLoaded', function () {

    const catBtns = document.querySelectorAll('.filter__category-btn');
    catBtns.forEach(function (catBtn) {
        const catList = catBtn.nextElementSibling;
        catBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            const isOpening = catList.style.display !== 'block';
            
            catBtn.classList.toggle('active');
            catList.style.display = catList.style.display === 'block' ? 'none' : 'block';
            
            // Если закрываем категорию, закрываем все вложенные элементы
            if (!isOpening) {
                // Закрываем все subcategory списки
                catList.querySelectorAll('.filter__subcategory-list').forEach(function (subList) {
                    subList.style.display = 'none';
                });
                
                // Закрываем все subsubcategory списки
                catList.querySelectorAll('.filter__subsubcategory-list').forEach(function (subSubList) {
                    subSubList.style.display = 'none';
                });
                
                // Убираем активные классы у всех вложенных кнопок
                catList.querySelectorAll('.filter__subcategory-btn, .filter__subsubcategory-btn').forEach(function (btn) {
                    btn.classList.remove('active');
                });
            }
        });

        catList.querySelectorAll('.filter__subcategory-btn').forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                const subList = btn.nextElementSibling;
                const isOpening = subList.style.display !== 'block';
                
                btn.classList.toggle('active');
                if (subList) {
                    subList.style.display = subList.style.display === 'block' ? 'none' : 'block';
                }
                
                // Если закрываем subcategory, закрываем все вложенные subsubcategory
                if (!isOpening) {
                    // Закрываем все subsubcategory списки внутри этого subcategory
                    subList.querySelectorAll('.filter__subsubcategory-list').forEach(function (subSubList) {
                        subSubList.style.display = 'none';
                    });
                    
                    // Убираем активные классы у всех вложенных subsubcategory кнопок
                    subList.querySelectorAll('.filter__subsubcategory-btn').forEach(function (subSubBtn) {
                        subSubBtn.classList.remove('active');
                    });
                }
            });
        });

        catList.querySelectorAll('.filter__subsubcategory-btn').forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                const subList = btn.nextElementSibling;
                btn.classList.toggle('active');
                if (subList) {
                    subList.style.display = subList.style.display === 'block' ? 'none' : 'block';
                }
            });
        });

        document.addEventListener('click', function (e) {
            if (!e.target.closest('.filter__category')) {
                catList.style.display = 'none';
                document.querySelectorAll('.filter__subcategory-list, .filter__subsubcategory-list').forEach(function (list) {
                    list.style.display = 'none';
                });
                document.querySelectorAll('.filter__category-btn, .filter__subcategory-btn, .filter__subsubcategory-btn').forEach(function (btn) {
                    btn.classList.remove('active');
                });
            }
        });
    });

    const ranges = document.querySelectorAll('.filter__item__range');

    function setRangeValue(range) {
        const min = parseInt(range.min, 10);
        const max = parseInt(range.max, 10);
        const val = parseInt(range.value, 10);
        const value = range.previousElementSibling;
        value.textContent = val;
        // Вычисляем позицию value над ползунком
        const percent = (val - min) / (max - min);
        const rangeWidth = range.offsetWidth;
        // Смещение для центрирования value над ползунком
        const thumbWidth = 10; // Примерная ширина thumb в px
        const left = percent * (rangeWidth - thumbWidth) + thumbWidth / 2;
        value.style.left = `${left}px`;
    }
    ranges.forEach(function (range) {
        setRangeValue(range);
        range.addEventListener('input', function () {
            setRangeValue(range);
        });
        window.addEventListener('resize', function () {
            setRangeValue(range);
        });
    });

    var filters = document.querySelector('.catalog__filters');
    var toggleBtn = filters.querySelector('.catalog__filters-toggle');
    toggleBtn.addEventListener('click', function () {
        filters.classList.toggle('catalog__filters--open');
    });

});