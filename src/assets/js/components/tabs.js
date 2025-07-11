document.addEventListener('DOMContentLoaded', function() {
    const btns = document.querySelectorAll('.tabs__btn');
    const tabs = document.querySelectorAll('.tabs__tab');
    btns.forEach(btn => {
        btn.addEventListener('click', function() {
            btns.forEach(b => b.classList.remove('active'));
            tabs.forEach(tab => tab.classList.remove('active'));
            btn.classList.add('active');
            const tabName = btn.getAttribute('data-tab');
            document.querySelector('.tabs__tab[data-tab-content="' + tabName + '"]').classList.add('active');
        });
    });
});