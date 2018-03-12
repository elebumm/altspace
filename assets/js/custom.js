////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// jQuery
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var resizeId;
$(document).ready(function($) {
    "use strict";

    sliderHeight();

    if ($(".read-more").length > 0) {
        $(".read-more").each(function() {

            var collapseHeight = parseInt( $(this).attr("data-read-more-collapse-height"), 10);
            if( !collapseHeight ) collapseHeight = 200;

            var moreLink = $(this).attr("data-read-more-more-link");
            if( !moreLink ) moreLink = "Read more";

            var lessLink = $(this).attr("data-read-more-less-link");
            if( !lessLink ) lessLink = "Read less";

            $(this).readmore({
                speed: 500,
                collapsedHeight: collapseHeight,
                moreLink: '<div class="read-more-btn"><a href="#" class="btn btn-framed btn-primary btn-light-frame btn-rounded">' + moreLink + '</a></div>',
                lessLink: '<div class="read-more-btn"><a href="#" class="btn btn-framed btn-primary btn-light-frame btn-rounded">' + lessLink + '</a></div>'
            });
        });
    }

//  Smooth Scroll

    $('.main-nav a[href^="#"], a[href^="#"].scroll').on('click',function (e) {
        e.preventDefault();
        var target = this.hash,
            $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 2000, 'swing', function () {
            window.location.hash = target;
        });
    });

    $(".nav-btn").on("click", function(){
        $(".page-wrapper").toggleClass("show-navigation");
    });
    $(".navigation-links, .hero-section, #page-content, #page-footer").on("click", function(){
        $(".page-wrapper").removeClass("show-navigation");
    });

    $(window).scroll(function () {
        if ($(window).scrollTop() > 1 ) {
            $(".navigation").addClass("show-background");
        } else {
            $(".navigation").removeClass("show-background");
        }
    });

//  Responsive Video Scaling

    if ($(".video").length > 0) {
        $(this).fitVids();
    }

//  Magnific Popup

    if ($('.image-popup').length > 0) {
        $('.image-popup').magnificPopup({
            type:'image',
            removalDelay: 300,
            mainClass: 'mfp-fade',
            overflowY: 'scroll'
        });
    }

    if ($('.video-popup').length > 0) {
        $('.video-popup').magnificPopup({
            type:'iframe',
            removalDelay: 300,
            mainClass: 'mfp-fade',
            overflowY: 'scroll',
            iframe: {
                markup: '<div class="mfp-iframe-scaler">'+
                    '<div class="mfp-close"></div>'+
                    '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
                    '</div>',
                patterns: {
                    youtube: {
                        index: 'youtube.com/',
                        id: 'v=',
                        src: '//www.youtube.com/embed/%id%?autoplay=1'
                    },
                    vimeo: {
                        index: 'vimeo.com/',
                        id: '/',
                        src: '//player.vimeo.com/video/%id%?autoplay=1'
                    },
                    gmaps: {
                        index: '//maps.google.',
                        src: '%id%&output=embed'
                    }
                },
                srcAction: 'iframe_src'
            }
        });
    }

    //  Scroll Reveal

    if ( $(window).width() > 768 && $("[data-scroll-reveal]").length ) {
        window.scrollReveal = new scrollReveal();
    }

    //bigGalleryWidth();

    if( $(".count-down").length ){
        var year = parseInt( $(".count-down").attr("data-countdown-year"), 10 );
        var month = parseInt( $(".count-down").attr("data-countdown-month"), 10 ) - 1;
        var day = parseInt( $(".count-down").attr("data-countdown-day"), 10 );
        $(".count-down").countdown({until: new Date(year, month, day), padZeroes: true});
    }

//  Form Validation

  

    $("[data-background-color-custom]").each(function() {
        $(this).css( "background-color", $(this).attr("data-background-color-custom") );
    });


    if( $("body").hasClass("links-hover-effect") ){
        $("a, button").each(function() {
            if( !$(this).hasClass("image-popup") && !$(this).hasClass("video-popup") && !$(this).hasClass("arrow-up") && !$(this).hasClass("image") && !$(this).hasClass("no-hover-effect") ){
                $(this).addClass("hover-effect");
                var htmlContent = $(this).html();
                $(this).text("");
                $(this).append("<span><div class='hover-element'>" + htmlContent + "</div><div class='hover-element'>" + htmlContent + "</div></span>");
            }
        });
    }

    if( $("body").hasClass("has-loading-screen") ){
        Pace.on("done", function() {
            $(".page-wrapper").addClass("loading-done");
            setTimeout(function() {
                $(".page-wrapper").addClass("hide-loading-screen");
            }, 500);
            $.each( $("#page-header .animate"), function (i) {
                var $this = $(this);
                setTimeout(function(){
                    $this.addClass("show");
                }, i * 150);
            });
        });
    }
    else {
        $.each( $("#page-header .animate"), function (i) {
            var $this = $(this);
            setTimeout(function(){
                $this.addClass("show");
            }, i * 150);
        });
    }

    $(".bg-transfer").each(function() {
        $(this).css("background-image", "url("+ $(this).find("img").attr("src") +")" );
    });

    $('.modal-body a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var element = $( $(this).attr("href") ).find(".one-item-carousel");
        if( !element.hasClass("owl-carousel") ){
            $(element).owlCarousel({
                autoheight: 1,
                loop: 0,
                margin: 0,
                items: 1,
                nav: 0,
                dots: 1,
                autoHeight: true,
                navText: []
            });
        }
    });

});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// On Load
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(window).load(function(){
    if ( $(document).width() > 768) {
        var $equalHeight = $('.container');
        for( var i=0; i<$equalHeight.length; i++ ){
            equalHeight( $equalHeight );
        }
    }
    initializeOwl();
    centerVerticalNavigation();
});

$(window).resize(function(){
    clearTimeout(resizeId);
    resizeId = setTimeout(doneResizing, 250);

});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Do after resize

function doneResizing(){
    //bigGalleryWidth();
    sliderHeight();
    centerVerticalNavigation();
}

function centerVerticalNavigation(){
    if ( $(document).width() > 768) {
        $(".nav-btn-only .navigation-links").css("padding-top", ($(window).height()/2 - $(".navigation .container").height()) - ($(".nav-btn-only .navigation-links").height()/2) - 40 );
    }
}

function sliderHeight() {

    if( $(".hero-section").find(".container").height() > $(window).height() ){
        var paddingTop = $("nav.navigation").height();
        $(".hero-section .wrapper .hero-title").css("padding-top", paddingTop + "px");
        $(".hero-section").height( $(".hero-section").find(".container").height() + paddingTop );
        $(".hero-section .owl-stage-outer").height( $(".hero-section").children(".wrapper").height() + paddingTop );
        console.log("bigger");
    }
    else {
        $(".hero-section").height( $(window).height() );
        $(".hero-section .owl-stage-outer").height( $(window).height() );
        console.log("smaller");
    }



	//$(".hero-section").css( "min-height", $(window).height() + "px" );
	//$(".hero-section .owl-stage-outer").css( "min-height", $(window).height() + "px" );
}

function bigGalleryWidth(){
    if ( $(document).width() < 768) {
        $(".big-gallery .slide .container").width( $(document).width() );
    }
}

function initializeOwl(){
    if( $(".owl-carousel").length ){
        $(".owl-carousel").each(function() {

            var items = parseInt( $(this).attr("data-owl-items"), 10);
            if( !items ) items = 1;

            var nav = parseInt( $(this).attr("data-owl-nav"), 2);
            if( !nav ) nav = 0;

            var dots = parseInt( $(this).attr("data-owl-dots"), 2);
            if( !dots ) dots = 0;

            var center = parseInt( $(this).attr("data-owl-center"), 2);
            if( !center ) center = 0;

            var loop = parseInt( $(this).attr("data-owl-loop"), 2);
            if( !loop ) loop = 0;

            var margin = parseInt( $(this).attr("data-owl-margin"), 2);
            if( !margin ) margin = 0;

            var autoWidth = parseInt( $(this).attr("data-owl-auto-width"), 2);
            if( !autoWidth ) autoWidth = 0;

            var navContainer = $(this).attr("data-owl-nav-container");
            if( !navContainer ) navContainer = 0;

            var autoplay = $(this).attr("data-owl-autoplay");
            if( !autoplay ) autoplay = 0;

            var fadeOut = $(this).attr("data-owl-fadeout");
            if( !fadeOut ) fadeOut = 0;
            else fadeOut = "fadeOut";

            $(this).owlCarousel({
                navContainer: navContainer,
                animateOut: fadeOut,
                autoplaySpeed: 2000,
                autoplay: autoplay,
                autoheight: 1,
                autoWidth: autoWidth,
                items: items,
                center: center,
                loop: loop,
                margin: margin,
                nav: nav,
                dots: dots,
                autoHeight: true,
                navText: [],
                responsive: {
                    0 : {
                        items: 1,
                        autoWidth: false,
                        center: false
                    },
                    768 : {
                        autoWidth: autoWidth,
                        items: items,
                        center: center
                    }
                }
            });
        });

    }
}


function simpleMap(latitude, longitude, markerImage, mapTheme){
    var element = "map";
    if ( mapTheme == "light" ){
        var mapStyles = [{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#d3d3d3"}]},{"featureType":"transit","stylers":[{"color":"#808080"},{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#b3b3b3"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"weight":1.8}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"color":"#d7d7d7"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ebebeb"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"color":"#a7a7a7"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#efefef"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#696969"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"color":"#737373"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#d6d6d6"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#dadada"}]}];
    }
    else if ( mapTheme == "dark" ){
        mapStyles = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]
    }
    var mapCenter = new google.maps.LatLng(latitude,longitude);
    var mapOptions = {
        zoom: 13,
        center: mapCenter,
        disableDefaultUI: true,
        scrollwheel: false,
        styles: mapStyles
    };
    var mapElement = document.getElementById(element);
    var map = new google.maps.Map(mapElement, mapOptions);
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(latitude,longitude),
        map: map,
        icon: markerImage
    });
}

function equalHeight(container){
    var currentTallest = 0,
        currentRowStart = 0,
        rowDivs = new Array(),
        $el,
        topPosition = 0;

    $(container).find(".equal-height").each(function() {
        $el = $(this);
        $($el).height('auto');
        topPostion = $el.position().top;
        if (currentRowStart != topPostion) {
            for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                rowDivs[currentDiv].height(currentTallest);
            }
            rowDivs.length = 0; // empty the array
            currentRowStart = topPostion;
            currentTallest = $el.height();
            rowDivs.push($el);
        } else {
            rowDivs.push($el);
            currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
        }
        for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
            rowDivs[currentDiv].height(currentTallest);
        }
    });
}
