/*-----------------------------------------------------------------------------------

    Theme Name: Tommy
    Theme URI: http://
    Description: The Multi-Purpose Onepage Template
    Author: UI-ThemeZ
    Author URI: http://themeforest.net/user/UI-ThemeZ
    Version: 1.0

-----------------------------------------------------------------------------------*/


$(function() {

    "use strict";

    var wind = $(window);



    // scrollIt
    $.scrollIt({
        upKey: 38, // key code to navigate to the next section
        downKey: 40, // key code to navigate to the previous section
        easing: 'swing', // the easing function for animation
        scrollTime: 600, // how long (in ms) the animation takes
        activeClass: 'active', // class given to the active nav element
        onPageChange: null, // function(pageIndex) that is called when page is changed
        topOffset: -80 // offste (in px) for fixed top navigation
    });



    // navbar scrolling background
    wind.on("scroll", function() {

        var bodyScroll = wind.scrollTop(),
            navbar = $(".navbar"),
            logo = $(".navbar .logo> img"),
            logoDark = $(".navbar-dark .logo> img");

        if (bodyScroll > 100) {

            navbar.addClass("nav-scroll");
            logo.attr('src', 'img/logo-dark.png');
            logoDark.attr('src', 'img/logo-light.png');

        } else {

            navbar.removeClass("nav-scroll");
            logo.attr('src', 'img/logo-light.png');
            logoDark.attr('src', 'img/logo-light.png');
        }
    });


    // close navbar-collapse when a  clicked
    $(".navbar-nav a").on('click', function() {
        $(".navbar-collapse").removeClass("show");
    });



    // progress bar
    wind.on('scroll', function() {
        $(".progress-item span").each(function() {
            var bottom_of_object =
                $(this).offset().top + $(this).outerHeight();
            var bottom_of_window =
                $(window).scrollTop() + $(window).height();
            var myVal = $(this).attr('data-value');
            if (bottom_of_window > bottom_of_object) {
                $(this).css({
                    width: myVal
                });
            }
        });
    });



    // sections background image from data background
    var pageSection = $(".bg-img, section");
    pageSection.each(function(indx) {

        if ($(this).attr("data-background")) {
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });



    // === owl-carousel === //

    // Hero owlCarousel
    $('.carousel-single .owl-carousel').owlCarousel({
        items: 1,
        loop: true,
        margin: 10,
        mouseDrag: false,
        autoplay: false,
        smartSpeed: 500
    });



    // magnificPopup
    $('.gallery').magnificPopup({
        delegate: '.popimg',
        type: 'image',
        gallery: {
            enabled: true
        }
    });


    // countUp
    $('.numbers .numb').countUp({
        delay: 1,
        time: 1500
    });


});


// === window When Loading === //

$(window).on("load", function() {

    var wind = $(window);

    // Preloader
    $(".loading").fadeOut(500);


    // stellar
    wind.stellar();


    // isotope
    $('.gallery').isotope({
        // options
        itemSelector: '.items'
    });

    var $gallery = $('.gallery').isotope({
        // options
    });

    // filter items on button click
    $('.filtering').on('click', 'span', function() {

        var filterValue = $(this).attr('data-filter');

        $gallery.isotope({
            filter: filterValue
        });

    });

    $('.filtering').on('click', 'span', function() {

        $(this).addClass('active').siblings().removeClass('active');

    });


    // contact form validator
    $('#contact-form').validator();

    $('#contact-form').on('submit', function(e) {
        if (!e.isDefaultPrevented()) {
            var url = "contact.php";

            $.ajax({
                type: "POST",
                url: url,
                data: $(this).serialize(),
                success: function(data) {
                    var messageAlert = 'alert-' + data.type;
                    var messageText = data.message;

                    var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                    if (messageAlert && messageText) {
                        $('#contact-form').find('.messages').html(alertBox);
                        $('#contact-form')[0].reset();
                    }
                }
            });
            return false;
        }
    });

});