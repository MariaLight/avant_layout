
document.addEventListener('DOMContentLoaded', function () {

    const catBtns = document.querySelectorAll('.filter__category-btn');
    catBtns.forEach(function (catBtn) {
        const catList = catBtn.nextElementSibling;
        catBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            catBtn.classList.toggle('active');
            catList.style.display = catList.style.display === 'block' ? 'none' : 'block';
        });

        catList.querySelectorAll('.filter__subcategory-btn').forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                const subList = btn.nextElementSibling;
                btn.classList.toggle('active');
                if (subList) {
                    subList.style.display = subList.style.display === 'block' ? 'none' : 'block';
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

});