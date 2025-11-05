var musicSlider = new Swiper('.music-slider', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    slidesPerView: 'auto',

    coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2.5,
    },

    /* PAGINATION  */
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    /* NAVIGATION - arrow buttons */
    navigation: {
        nextEl: '.nav-next',
        prevEl: '.nav-prev',
    },

    /* AUTOPLAY - advances automatically */
    autoplay: {
        delay: 3500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },

    /* KEYBOARD - arrow keys */
    keyboard: {
        enabled: true,
        onlyInViewport: true,
    },

    /* SPEED - transition speed */
    speed: 600,

    /*
       CRITICAL FIX: Allow click events through
       This ensures Spotify links work
    */
    simulateTouch: true,           // Enable touch simulation
    allowTouchMove: true,          // Allow swiping
    touchRatio: 1,                 // Normal swipe sensitivity
    touchAngle: 45,                // Angle threshold for swipe
    longSwipesRatio: 0.5,          // Distance for swipe to register
    followFinger: true,            // Slide follows finger

    /*
       PREVENT ACCIDENTAL CLICKS DURING DRAG
       Only block clicks if user actually dragged
    */
    touchEventsTarget: 'container', // Where to attach events
    preventClicks: false,           // Don't prevent all clicks
    preventClicksPropagation: false, // Don't stop click bubbling
});

// Variables to track user interaction
let touchStartX = 0;
let touchStartY = 0;
let touchStartTime = 0;
let isDragging = false;

// Get all slide links
const slideLinks = document.querySelectorAll('.music-slide');

// Add click handling to each slide
slideLinks.forEach(link => {

    // Track touch/mouse start
    link.addEventListener('mousedown', function (e) {
        touchStartX = e.clientX;
        touchStartY = e.clientY;
        touchStartTime = Date.now();
        isDragging = false;
    });

    link.addEventListener('touchstart', function (e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchStartTime = Date.now();
        isDragging = false;
    }, { passive: true });

    // Track movement
    link.addEventListener('mousemove', function (e) {
        if (touchStartX) {
            const diffX = Math.abs(e.clientX - touchStartX);
            const diffY = Math.abs(e.clientY - touchStartY);
            // If moved more than 10px, it's a drag
            if (diffX > 10 || diffY > 10) {
                isDragging = true;
            }
        }
    });

    link.addEventListener('touchmove', function (e) {
        if (touchStartX) {
            const diffX = Math.abs(e.touches[0].clientX - touchStartX);
            const diffY = Math.abs(e.touches[0].clientY - touchStartY);
            // If moved more than 10px, it's a drag
            if (diffX > 10 || diffY > 10) {
                isDragging = true;
            }
        }
    }, { passive: true });

    // Handle click
    link.addEventListener('click', function (e) {
        const clickDuration = Date.now() - touchStartTime;

        // If dragging or took too long, prevent navigation
        if (isDragging || clickDuration > 300) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }

        // Otherwise, let the Spotify link work!
        // Link will open naturally
    });
});

document.querySelector('.music-slider').addEventListener('mouseenter', function () {
    musicSlider.autoplay.stop();
});

document.querySelector('.music-slider').addEventListener('mouseleave', function () {
    musicSlider.autoplay.start();
});