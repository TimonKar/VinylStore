$(document).ready(function() {
    let $carouselItems = $('.carousel-item');
    let currentIndex = 0;
    
    // Function to go to next slide
    function showNextSlide() {
        $carouselItems.eq(currentIndex).removeClass('active');
        currentIndex = (currentIndex + 1) % $carouselItems.length;
        $carouselItems.eq(currentIndex).addClass('active');
    }

    // Function to go to previous slide
    function showPrevSlide() {
        $carouselItems.eq(currentIndex).removeClass('active');
        currentIndex = (currentIndex - 1 + $carouselItems.length) % $carouselItems.length;
        $carouselItems.eq(currentIndex).addClass('active');
    }

    // Next button click
    $('.carousel-control-next').click(function() {
        showNextSlide();
    });

    // Prev button click
    $('.carousel-control-prev').click(function() {
        showPrevSlide();
    });
});
