var getBrowserWidth = function () {
    if (window.innerWidth < 768) {
        return "xs";
    } else if (window.innerWidth < 991) {
        return "sm"
    } else if (window.innerWidth < 1199) {
        return "md"
    } else {
        return "lg"
    }
};

// if( getBrowserWidth() == "xs" ){
//     $(".page-content").remove();
// };

//disable scrolling in start
// document.body.style.overflow = "hidden";


// document.addEventListener("readystatechange", (event) => {
//   if (event.target.readyState === "interactive") {

//   } else if (event.target.readyState === "complete") {
//    $(".preloader-show").removeClass("preloader-show");
//   }
// });


// window.addEventListener('resize', function(){
//   $(".has-scroll-smooth [data-scroll-container]").css("min-height", $("main").height()+"px");
// });


jQuery(document).ready(function () {
// setTimeout(() => {
    $('main').imagesLoaded()
        .done(function (instance) {

            if ($("#sectionPin video").length) {
                var bound = document.querySelector("#sectionPin");
                var video = document.querySelector("#sectionPin video");
                const distanceFromTop = bound.getBoundingClientRect().top;
                const distanseBottom = distanceFromTop + bound.scrollHeight;
                var lastDeltaY = 0;
                var playVideo = false;
                var lastTop = 0;
                var scrollDirectionDown = true;
                var intervalRewind;

                video.addEventListener("click", function (event) {
                    if (video.paused == true) {
                        video.play();
                    } else {
                        video.pause();
                    }
                });

                video.onplay = function () {
                    video.playbackRate = 1.0;
                    clearInterval(intervalRewind);
                };
                video.onended = function () {
                    // video.currentTime = 0;
                    rewind(1.0);
                };

                const registerVideo = (video) => {
                    const scrollVideo = () => {
                        // if( video.duration && document.documentElement.scrollTop != lastDeltaY) {
                        lastDeltaY = deltaY;

                        if ((deltaY - lastTop) >= 0)
                            scrollDirectionDown = true;
                        else
                            scrollDirectionDown = false;

                        lastTop = deltaY;

                        const percentScrolled = (deltaY - distanceFromTop) / (distanseBottom - distanceFromTop);
                        // console.log(percentScrolled, deltaY  , distanseBottom,  scrollDirectionDown);
                        if ((percentScrolled > 0 && percentScrolled < 0.5 && !playVideo && scrollDirectionDown) || (percentScrolled > -1 && percentScrolled < 0 && !playVideo && !scrollDirectionDown)) {
                            playVideo = true;
                            video.currentTime = 4;
                            video.play();
                        }

                        if (percentScrolled > 2.8 && playVideo) {
                            playVideo = false;
                            video.pause();
                            video.currentTime = 4;
                        }
                        // video.currentTime = 5 + (video.duration * (percentScrolled / 2));
                        // }
                        requestAnimationFrame(scrollVideo);
                    }
                    requestAnimationFrame(scrollVideo);
                }

                registerVideo(video);
            }


            function rewind(rewindSpeed) {
                clearInterval(intervalRewind);
                var startSystemTime = new Date().getTime();
                var startVideoTime = video.currentTime;

                intervalRewind = setInterval(function () {
                    video.playbackRate = 1.0;
                    if (video.currentTime == 0) {
                        clearInterval(intervalRewind);
                        video.play();
                    } else {
                        var elapsed = new Date().getTime() - startSystemTime;
                        video.currentTime = Math.max(startVideoTime - elapsed * rewindSpeed / 1000.0, 0);
                    }
                }, 10);
            }


            /* MAGNETS */
            var magnets = document.querySelectorAll('.magnetic')
            var strength = 50

            magnets.forEach((magnet) => {
                magnet.addEventListener('mousemove', moveMagnet);
                magnet.addEventListener('mouseout', function (event) {
                    TweenMax.to(event.currentTarget, 2, {x: 0, y: 0, ease: Power4.easeOut})
                });
            });

            function moveMagnet(event) {
                var magnetButton = event.currentTarget
                var bounding = magnetButton.getBoundingClientRect()

                TweenMax.to(magnetButton, 1, {
                    x: (((event.clientX - bounding.left) / magnetButton.offsetWidth) - 0.5) * strength,
                    y: (((event.clientY - bounding.top) / magnetButton.offsetHeight) - 0.5) * strength,
                    ease: Power4.easeOut
                })
            };


            history.scrollRestoration = 'manual';
            window.scrollTo(0, 0);


            /* LOCOMOTIVE */
            const scroll = new LocomotiveScroll({
                el: document.querySelector('[data-scroll-container]'),
                smooth: true,
                // lerp: 0.075,
                // firefoxMultiplier: 100,
                resetNativeScroll: false,
                // firefoxMultiplier: 50,
                touchMultiplier: 2,
                reloadOnContextChange: true,
                // resetNativeScroll: true,
                multiplier: 0.5,
                tablet: {
                    smooth: true,
                    resetNativeScroll: false,
                    multiplier: .7,
                },
                smartphone: {
                    breakpoint: 500,
                    smooth: true,
                    // smooth: false,
                    // resetNativeScroll: false,
                    // multiplier: 1,
                    // resetNativeScroll: false
                },
            });

            var deltaY = 0;
            var header = document.getElementsByClassName("header")[0];

            scroll.on('scroll', (args) => {
                if (args.delta) {
                    deltaY = args.delta.y;
                    if (args.delta.y > 100) {
                        header.classList.add("sticky");
                    } else {
                        header.classList.remove("sticky");
                    }
                }
            });

            window.addEventListener("scroll", bringmenu);

            function bringmenu() {
                var header = document.getElementsByClassName("header")[0];
                if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                    header.classList.add("sticky");
                } else {
                    header.classList.remove("sticky");
                }
                deltaY = document.documentElement.scrollTop;
                console.log(document.body.scrollTop);
            }

            /* firefox costyl*/
            if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
                setInterval(() => {
                    $(".sidebar-content").css("padding", 0);
                }, 10);
            }


            /* popup */
            if ($(".pin-wrap").length) {
                gsap.registerPlugin(ScrollTrigger);

                const pageContainer = document.querySelector("#sectionPin");
                ScrollTrigger.scrollerProxy(pageContainer, {
                    scrollTop(value) {
                        return arguments.length
                            ? scroll.scrollTo(value, 0, 0)
                            : scroll.scroll.instance.scroll.y;
                    },
                    getBoundingClientRect() {
                        return {
                            left: 0,
                            top: 0,
                            width: window.innerWidth,
                            height: window.innerHeight
                        };
                    },
                    // pinType: pageContainer.style.transform ? "transform" : "fixed"
                });


                if (getBrowserWidth() == "xs" || getBrowserWidth() == "sm") {
                    gsap.to(".pin-wrap", {
                        scrollTrigger:
                            {
                                toggleActions: 'play none none none',
                                scroller: pageContainer,
                                trigger: pageContainer,
                                start: "top -1200",
                                scrub: 1,
                                snap: 1,
                                end: "bottom top"
                            },
                        xPercent: -100,
                        ease: "none"
                    });
                } else {
                    gsap.to(".pin-wrap", {
                        scrollTrigger:
                            {
                                toggleActions: 'play none none none',
                                scroller: pageContainer,
                                trigger: pageContainer,
                                pin: true,
                                // pinSpacing: true,
                                // invalidateOnRefresh: true,
                                // markers: true,
                                // onEnter: () => {},
                                // onLeave: () => {},
                                // onLeaveBack
                                start: "top top",
                                scrub: 1,
                                snap: 1,
                                // end: "bottom top"
                                end: "+=2500"
                            },
                        xPercent: -420,
                        // opacity: 0,
                        // duration: 1,
                        ease: "none"
                    });
                }

                scroll.on("scroll", ScrollTrigger.update);

                ScrollTrigger.defaults({scroller: scroll});
                ScrollTrigger.addEventListener("refresh", () => scroll.update());
                ScrollTrigger.refresh();
            }


            $(".nft_scroll").on("click", function () {
                scroll.scrollTo("section.slider", {duration: 3000});
            });


            /* PRELOADER */

            function initPreloader() {
                var tl = gsap.timeline();

                tl.set(".loading-screen", {
                    top: "0",
                });
                tl.set("html", {
                    cursor: "wait"
                });
                // tl.set(".loading-screen h1", {
                //   x: "50%",
                //   y: "50%",
                //   translate: "-50%"
                // });

                tl.to(".loading-screen", {
                    duration: 1.6,
                    top: 0,
                }, "0");

                // tl.to(".logo", {
                //   duration: 1.4,
                //   rotation: 0,
                //   ease: "Power4.easeOut",
                //   delay: .4
                // });

                // tl.to(".bg", {
                //   duration: 3.1,
                //   top: "50%",
                //   left:"60%",
                // },"=-2.6");
                // tl.set(".bg2", {
                //   duration: 4.6,
                //   top: "0%",
                //   left:"30%",
                // },"=-4.2");
                // tl.to(".loading-screen h1", {
                //   duration: 3.6,
                //   top: "0",
                // },"=-1.2");


                tl.to(".loading-screen", {
                    duration: 1.6,
                    opacity: "0",
                }, "=-.2");
                tl.to(".loading-screen", {
                    duration: .6,
                    top: "-200%",
                    ease: "Power2.easeOut"
                });

                tl.set("html", {
                    cursor: "auto",
                });
            }

            initPreloader();


            // /** circle **/
            // var $circle = $('.circle');

            // function moveCursor(e) {
            //   TweenLite.to($circle, 0.3, {
            //   css: {
            //     left: e.clientX,
            //     top: e.clientY + scrolArgs.delta.y
            //   }
            // });
            // }
            // $(window).on('mousemove', moveCursor);


            /* LIST */

            gsap.registerPlugin(TweenLite);

            if (getBrowserWidth() == "xs" || getBrowserWidth() == "sm") {
                function moveCircle(e) {
                    TweenLite.to($('.cube'), 0.05, {
                        css: {
                            top: e.pageY - $(e.currentTarget).parent().offset().top,
                        }
                    });
                }
            } else {
                function moveCircle(e) {
                    TweenLite.to($('.cube'), .2, {
                        css: {
                            top: e.pageY - $(e.currentTarget).parent().offset().top,
                            left: e.pageX - $(e.currentTarget).parent().offset().left,
                        }
                    });
                }
            }

            $(".list-content").on('mousemove', moveCircle);
            $(".list-item, .cube").on('mouseenter', (e) => {
                if ($(e.currentTarget).data("item-text") != $(e.currentTarget).closest(".row").find('.cube .list-item-hidden-content').text())
                    $(e.currentTarget).closest(".row").find('.cube .list-item-hidden-content').text($(e.currentTarget).data("item-text"));
            });

            const zeroPad = (num, places) => String(num).padStart(places, '0');

            function setPages(section, swip) {
                var active = 1;
                try {
                    active = swip.realIndex + 1
                } catch {
                }

                $("." + section + " .pages>.current").text(zeroPad(active, 2));
                if ($("body.nft").length) {
                    $("body.nft .current_slide").text(zeroPad(active, 2));
                }

                var total = $("section." + section + ' .swiper-slide').length - $("section." + section + ' .swiper-slide-duplicate').length;
                $("section." + section + " .total").text("/" + zeroPad(total, 2));

                // $("body.nft .total").text("/"+zeroPad(total, 2));
            }

            /* FIRST SLIDER */
            var swiper = new Swiper(".mySwiper", {
                effect: "creative",
                // loop: true,
                initialSlide: 1,
                speed: 1400,
                spaceBetween: 300,
                creativeEffect: {
                    prev: {
                        translate: [$(".swiper-wrapper").width() * -1 + 30, -100, -700],
                    },
                    next: {
                        translate: [-300, -100, -1300],
                        scale: .7,
                        opacity: 0,
                    },
                    // progressMultiplier: 2,
                },
                grabCursor: true,
                preloadImages: false,
                lazy: true,

                navigation: {
                    nextEl: ".s1n",
                    prevEl: ".s1p",
                },
                pagination: {
                    el: ".s1progres",
                    type: "progressbar",
                },
                on: {
                    init: function () {
                        setPages("second", swiper);
                    },
                },
            });

            swiper.on('transitionStart', function () {
                $(".second>.container").addClass("transition");
                setPages("second", swiper);
            });
            swiper.on('transitionEnd', function () {
                $(".second>.container").removeClass("transition");
            });

            var wid = $(".swiper-slide-active").css('transform');
            if (wid) {
                const regex = /matrix\(1, 0, 0, 1,(.*), 0\)/gm;
                let m = regex.exec(wid);
                $(".second").css("--slider-border-m-left", (Math.abs(m[1]) - 20) + "px");
            }

            window.addEventListener('resize', function () {

                wid = $(".swiper-slide-active").css('transform');
                if (wid) {
                    const regex = /matrix\(1, 0, 0, 1,(.*), 0\)/gm;
                    let m = regex.exec(wid);
                    $(".second").css("--slider-border-m-left", (Math.abs(m[1]) - 20) + "px");
                }

            });


            /* VIDEO SLIDER */
            var swiper2 = new Swiper(".nextSwiper", {
                effect: "cube",
                // loop: true,
                // initialSlide: 0,
                speed: 1000,
                grabCursor: true,
                preloadImages: true,
                preload: 'auto',
                lazy: true,
                // loopedSlides:13,
                observer: true,

                cubeEffect: {
                    shadow: false,
                    slideShadows: false,
                    shadowOffset: 40,
                    shadowScale: 0.94,
                },

                navigation: {
                    nextEl: ".s2n",
                    prevEl: ".s2p",
                },
                pagination: {
                    el: ".s2progres",
                    type: "progressbar",
                },
                on: {
                    init: function () {
                        setPages("sliderNfts", swiper2);
                    },
                },
            });

            swiper2.on('transitionStart', function () {
                $(".sliderNfts>.container").addClass("transition");
                setPages("sliderNfts", swiper2);

                setTimeout(function () {
                    $(".sliderNfts>.container").css("--data-first", $(".nextSwiper .swiper-slide-active").data("color-1"));
                    $(".sliderNfts>.container").css("--data-second", $(".nextSwiper .swiper-slide-active").data("color-2"));
                }, 1000);
                $(".nextSwiper ").find("video").trigger('pause');
                $(".nextSwiper .swiper-slide-active").find("video").trigger('play');
            });
            swiper2.on('transitionEnd', function () {
                $(".sliderNfts>.container").removeClass("transition");

                $("#slide-title").text(
                    $(".nextSwiper .swiper-slide-active").data("slide-title")
                );
                $("#slide-text").text(
                    $(".nextSwiper .swiper-slide-active").data("slide-text")
                );
                $("#slide-about-title").text(
                    $(".nextSwiper .swiper-slide-active").data("slide-about-title")
                );
                $("#slide-about-text-1").text(
                    $(".nextSwiper .swiper-slide-active").data("slide-about-text-1")
                );
                $("#slide-about-text-2").text(
                    $(".nextSwiper .swiper-slide-active").data("slide-about-text-2")
                );

            });

            /***** */

            $(".accardion-item").click(function () {
                if (!$(this).hasClass('active')) {
                    $(".accardion-item.active").removeClass('active');
                    $(this).addClass('active');
                }
            });

            $(".accardion")
                .on('mouseleave', (e) => {
                    $(e.currentTarget).find(".accardion-item").removeClass('active');
                });

            /***** */
            var targetTime = new Date(2022, 10, 28, 10, 00, 00).getTime();

            value = Math.abs(targetTime - (new Date()).getTime());

            function addTime() {
                value -= 1000 * 60;
                timeToView(value);
            }

            function timeToView(time) {

                var minutes = Math.floor((time / 1000) / 60) % 60;
                var hours = (Math.floor((time / 1000) / 60 / 60) % 24);
                var days = Math.floor((time / 1000) / 60 / 60 / 24) % 7;
                var weeks = Math.floor((time / 1000) / 60 / 60 / 24) / 7;

                $('#minutes').text(zeroPad(minutes, 2));
                $('#hours').text(zeroPad(hours, 2));
                $('#days').text(zeroPad(days, 2));
                $('#week').text(zeroPad(Math.floor(weeks), 2));
            }

            // timeToView(value);
            // setInterval(addTime, 1000 * 60);


            /******** */

            if (getBrowserWidth() == "xs" || getBrowserWidth() == "sm") {
                $(".team-member-picture")
                    .on('click', (e) => {
                        $(e.currentTarget).parent().parent().toggleClass("hover");
                    });
            } else {
                $(".team-member-picture")
                    .on('mouseenter', (e) => {
                        $(e.currentTarget).parent().parent().addClass("hover");
                    })
                    .on('mouseleave', (e) => {
                        $(e.currentTarget).parent().parent().removeClass("hover");
                    });
            }


        });

// } , 10);

});

