document.addEventListener('DOMContentLoaded', function() {
    const range = document.getElementById('feedback-rating');
    const stars = document.querySelectorAll('.star-rating .star');
    function updateStars(val) {
        stars.forEach((star, idx) => {
            if (idx < val) {
                star.classList.remove('inactive');
            } else {
                star.classList.add('inactive');
            }
        });
    }
    stars.forEach(star => {
        star.addEventListener('mouseenter', function() {
            updateStars(Number(star.dataset.value));
        });
        star.addEventListener('mouseleave', function() {
            updateStars(Number(range.value));
        });
        star.addEventListener('click', function() {
            range.value = star.dataset.value;
            updateStars(Number(range.value));
        });
    });
    updateStars(Number(range.value));
});