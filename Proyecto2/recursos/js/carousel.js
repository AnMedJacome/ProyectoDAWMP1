var carousel = $('.owl-carousel')
const TIMELAPSE = 5000

carousel.owlCarousel({
    items: 1,
    center: false,
    loop: true,
    margin: 10,
    autoplay: true,
    autoplayTimeout: TIMELAPSE,
    nav: false,
    touchDrag: false,
    mouseDrag: false,
})

carousel.on('mouseover', function(e) {
    carousel.trigger('stop.owl.autoplay')
});

carousel.on('mouseleave', function(e) {
    carousel.trigger('play.owl.autoplay',[TIMELAPSE])
});