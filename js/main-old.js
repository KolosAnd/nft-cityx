    var prev_state = null;
    var index_section = -1;

    var winX = null;
    var winY = null;

    var getBrowserWidth = function(){
        if(window.innerWidth < 768){
            return "xs";
        } else if(window.innerWidth < 991){
            return "sm"
        } else if(window.innerWidth < 1199){
            return "md"
        } else {
            return "lg"
        }
    };


jQuery(document).ready(function() {

    var magnets = document.querySelectorAll('.magnetic')
    var strength = 50
    
    magnets.forEach( (magnet) => {
      magnet.addEventListener('mousemove', moveMagnet );
      magnet.addEventListener('mouseout', function(event) {
        TweenMax.to( event.currentTarget, 1, {x: 0, y: 0, ease: Power4.easeOut})
      } );
    });
    
    function moveMagnet(event) {
      var magnetButton = event.currentTarget
      var bounding = magnetButton.getBoundingClientRect()
    
      //console.log(magnetButton, bounding)
    
      TweenMax.to( magnetButton, 1, {
        x: ((( event.clientX - bounding.left)/magnetButton.offsetWidth) - 0.5) * strength,
        y: ((( event.clientY - bounding.top)/magnetButton.offsetHeight) - 0.5) * strength,
        ease: Power4.easeOut
      })
    };


    AOS.init({
        offset: 200,
        duration: 1000,
        easing: 'ease-in-quad',
        delay: 100,
        once: true,
        mobile: true
      });  // AOS initiation

    jQuery('#fullpage').fullpage({
        scrollBar: false,
        keyboardScrolling: true,
        licenseKey: '$ZN&UmV@i7',
        responsiveWidth: 576,    
        autoScrolling: false,
        css3: false,
        lazyLoading: true,
        // anchors: ['main', 'about', 'tv', 'technology', 'principe', 'video', 'services', 'team', 'contacts', 'feedback'],
        // scrollOverflow: true,
        // fitToSection: true,
        easingcss3: 'cubic-bezier(0.175, 0.885, 0.320, 1.275)',
        afterLoad: function(index, nextIndex, direction){

            $('#menu li').attr('class','');
            $('#menu li').eq( nextIndex.index ).attr('class','active');
            
            index_section = nextIndex.index;

            if (nextIndex.index == 0)
                $('.arrow-down').removeClass('hide');
            else
                $('.arrow-down').addClass('hide');


            if(
                getBrowserWidth() == "md" || 
                getBrowserWidth() == "lg"
              ){
                if (nextIndex.item.classList.contains("white")){
                    // $('svg').removeClass('black').addClass('white');
                    $('.page-wrapper').removeClass('black').addClass('white');
                }
                else{
                    // $('svg').removeClass('white').addClass('black');
                    $('.page-wrapper').removeClass('white').addClass('black');
                }
            }


            // if (nextIndex.item.classList.contains("full")){
            //     var btn = $('.full').find(".buton-play");
            //     if(btn)
            //         btn.show();
            // }

            //animate
            $(nextIndex.item).find('.aos-init').addClass('aos-animate'); 
        }

    }); 


    $('.manu-item').on('click', function(){
        // $.fn.fullpage.moveTo( $(this).data('index'), 1 );
        scrollToIndexSection( $(this).data('index') );
    });

    function scrollToIndexSection(index){
        console.log(index);
        var top = $('.section').eq(index-1).offset().top; 
        $('body, html').animate({scrollTop: top}, 1000);
    }
    
    

    /* burger button */

    var barTop = $('#top-bar');
    var barBottom = $('#bottom-bar');

    TweenLite.defaultEase = Expo.easeInOut;

    var tl = new TimelineLite({
        paused:true,
    });

    tl
	.to(barTop, 0.2, {
		y: 5,
        x:25
		})
	.to(barBottom, 0.2, {
		y: -5,
        x:25
		},0)
	.to(barTop, 0.3, {
		rotation:45,
		y:0,
		x:25,
		transformOrigin:"left top",
		},0.15)
	.to(barBottom, 0.3, {
		rotation:-45,
		y:0,
		x:25,
		transformOrigin:"left bottom",
		},0.15);


    $('.menu, #close-btn').click(function(){

        $('.modal.section').toggleClass('hide');

        if ( $('.burger').hasClass('toggled') ) {
            tl.reverse();
            $('.page-wrapper').removeClass('white').removeClass('black').addClass(prev_state);
            $('#menu').show();
            if (index_section == 0)
                $('.arrow-down').removeClass('hide');
            
            $.fn.fullpage.setAllowScrolling(true);
        } 
        else {
            tl.play();
            prev_state = $('.page-wrapper')[0].classList[1];
            $('.page-wrapper').removeClass('white').addClass('black');
            $('#menu').hide();
    
            $('.arrow-down').addClass('hide');
            $.fn.fullpage.setAllowScrolling(false);
        }

        if(getBrowserWidth() == "md" || getBrowserWidth() == "lg")
            if ($('.page-wrapper')[0].classList[1] =="white" ){
                $('svg').removeClass('black').addClass('white');
            }
            else{
                $('svg').removeClass('white').addClass('black');
            }

        $('.burger').toggleClass('toggled');
    });

    /** circle **/
    var $circle = $('.circle');

    function moveCircle(e) {
        TweenLite.to($circle, 0.3, {
        css: {
          left: e.pageX,
          top: e.pageY
        }
      });
    }



    $(window).on('mousemove', moveCircle);
    $(".cursor-x0").on("mouseenter", function() {
        $circle.addClass("cursor-x0");
    });
    $(".cursor-x0").on("mouseleave", function() {
        $circle.removeClass("cursor-x0");
    });
    $(".cursor-x2").on("mouseenter", function() {
        $circle.addClass("cursor-x2");
    });
    $(".cursor-x2").on("mouseleave", function() {
        $circle.removeClass("cursor-x2");
    });
    $(".cursor-x3").on("mouseenter", function() {
        $circle.addClass("cursor-x3");
    });
    $(".cursor-x3").on("mouseleave", function() {
        $circle.removeClass("cursor-x3");
    });
    $(".cursor-x4").on("mouseenter", function() {
        $circle.addClass("cursor-x4");
    });
    $(".cursor-x4").on("mouseleave", function() {
        $circle.removeClass("cursor-x4");
    });

    /**********/

    var textWrapper = document.querySelector('.ml3');
    if(textWrapper){
        textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

        anime.timeline({loop: true})
        .add({
            targets: '.ml3 .letter',
            opacity: [0,1],
            easing: "easeInOutQuad",
            duration: 300,
            delay: (el, i) => 30 * (i+1)
        }).add({
            targets: '.ml3',
            opacity: 0,
            duration: 300,
            easing: "easeOutExpo",
            delay: 1100
        });
    }


    var vid = document.getElementById("video-block");
    function playVid() {
        vid.play();
    }

    $("#video-block").on('click', function(){
        // $(this).hide();
        playVid();
        $('video').addClass('active');
    });

    /* slider */

    const swiper = new Swiper('.swiper-container', {
        loop: true,
        speed: 1500,
        // If we need pagination
        pagination: {
          el: '.swiper-pagination',
        },
      
        navigation: {
          nextEl: '.button-next',
          prevEl: '.button-prev',
        },
      });

    /* mask */
    $("#phone").mask("+7(999) 999-99-99");


    var form = $(".form-container");

    form.on("submit", function (event) {
        event.preventDefault();
        var vanilaForm = this;
        var form = $(vanilaForm);

        var way = form.data('action') || "ajax_order";

        var formData = new FormData(vanilaForm);
        formData.append("action", way);

            $.ajax({
            url: "/wp-admin/admin-ajax.php",
            method: 'post',
            data: formData,
            success: function (response) {
            $('#submit-ajax').html(response);
        }});
    });
    
});