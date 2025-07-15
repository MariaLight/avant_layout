document.addEventListener('DOMContentLoaded', () => {
    const textBlockButton = document.querySelector('.text-block__button');
    if (textBlockButton) {
        textBlockButton.addEventListener('click', () => {
            textBlockButton.nextElementSibling.classList.toggle('hidden');
            textBlockButton.classList.toggle('active');
        });
    }

    var details = document.querySelectorAll("details");
    for (let i = 0; i < details.length; i++) {
        details[i].addEventListener("toggle", accordion);
    }
    function accordion(event) {
        if (!event.target.open) return;
        var details = event.target.parentNode.children;
        for (let i = 0; i < details.length; i++) {
            if (details[i].tagName != "DETAILS" ||
                !details[i].hasAttribute('open') ||
                event.target == details[i]) {
                continue;
            }
            details[i].removeAttribute("open");
        }
    }
});