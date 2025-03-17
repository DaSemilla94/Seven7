document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('nav ul');

    function slideDown(element, duration) {
        element.style.display = 'flex';
        const height = element.scrollHeight;
        element.style.maxHeight = '0';
        element.style.overflow ='hidden';

        let start = null;
        function animate(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const percent = Math.min(progress / duration, 1);
            element.style.maxHeight = `${percent * height}px`;

            if (progress < duration) {
                requestAnimationFrame(animate);
            }
        }
        requestAnimationFrame(animate)
    }

    function slideUp(element, duration) {
        const height = element.scrollHeight;
        element.style.maxHeight = `${height}px`;

        let start = null;
        function animate(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const percent = 1 - Math.min(progress / duration, 1);
            element.style.maxHeight = `${percent * height}px`;

            if (progress < duration) {
                requestAnimationFrame(animate);
            } else {
                element.style.display = 'none';
            } 
        }
        requestAnimationFrame(animate);
    }

    menuToggle.addEventListener('click', function () {
        if (navUl.classList.contains('active')) {
            slideUp(navUl, 300);
            navUl.classList.remove('active');
        } else {
            slideDown(navUl, 300);
            navUl.classList.add('active');
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    let element = document.querySelector(".page");
    element.classList.add("slide-in-right");
});
