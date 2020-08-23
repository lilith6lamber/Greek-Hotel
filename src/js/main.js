$(function () {
    let lazyLoadInstance = new LazyLoad();

    $('input, select').styler();

    let hotelSlider = $('#hotels').bxSlider({
        pager: false,
        keyboardEnabled: true,
        controls: false,
        auto: true,
        speed: 2000,
        mode: 'fade'
    });

    $('#prev').click(function (e) {
        e.preventDefault();
        hotelSlider.goToPrevSlide();
    });
    $('#next').click(function (e) {
        e.preventDefault();
        hotelSlider.goToNextSlide();
    });

/*     $('#feed').bxSlider({
        pager: false,
        keyboardEnabled: true,
        minSlides: 2,
        maxSlides: 8,
        controls: false
    }); */

    $('#review').bxSlider({
        pager: false,
        keyboardEnabled: true,
        slideWidth: 714,
        auto: true,
        speed: 2000,
        controls: false,
        mode: 'fade'
    });


    drawMap();
});



function drawMap() {
    let map = L.map('map', {
        scrollWheelZoom: false
    }).setView([37.945603, 23.647238], 16);

    let myFilter = [
        'grayscale:90%',
        'contrast:70%',
        'brightness:110%'
    ];

    L.tileLayer = L.tileLayer.colorFilter('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        filter: myFilter
    }).addTo(map);

    let mapIcon = L.icon({
        iconUrl: './img/marker-icon.png',
        shadowUrl: './img/marker-shadow.png',

        iconSize: [49, 49], // size of the icon
        shadowSize: [181, 181], // size of the shadow
        iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
        shadowAnchor: [70, 70], // the same for the shadow
        popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    L.marker([37.945603, 23.647238], {
        icon: mapIcon
    }).addTo(map);

}