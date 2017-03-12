(function($) {
  "use strict"; // Start of use strict

  $(window).load(function(){
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
      $('body').addClass('ios');
    };
    $('body').removeClass('loaded'); 
  });

  // Old browser notification
  $(function() { 
    $.reject({
      reject: {
        msie: 9
      },
      imagePath: 'img/icons/jReject/',
      display: [ 'chrome','firefox','safari','opera' ],
      closeCookie: true,
      cookieSettings: {
        expires: 60*60*24*365
      },
      header: 'Ваш браузер устарел!',
      paragraph1: 'Вы пользуетесь устаревшим браузером, который не поддерживает современные веб-стандарты и представляет угрозу вашей безопасности.',
      paragraph2: 'Пожалуйста, установите современный браузер:',
      closeMessage: 'Закрывая это уведомление вы соглашаетесь с тем, что сайт в вашем браузере может отображаться некорректно.',
      closeLink: 'Закрыть это уведомление',
    });
  });

  // Equal height plugin
  $.fn.equialHeight = (function() {
    var $tallestcolumn = 0;
    var $currentHeight = 0;
    $.each($(this), function (index, value) {
      $currentHeight = $(this).height();
      if($currentHeight > $tallestcolumn)
      {
        $tallestcolumn = $currentHeight;
      }
    });
    $(this).height($tallestcolumn);
    return $(this);
  });
  // Equial Height
  $(window).on('resize', function(){
    // Only 768+
    if( $( window ).width() >= 768 ) {
      $('.benefit__item').equialHeight();
      $('.review__name').equialHeight();
      $('.review__item').equialHeight();
    }
  }).trigger('resize');

  /* placeholder*/     
  $('input, textarea').each(function(){
    var placeholder = $(this).attr('placeholder');
    $(this).focus(function() { $(this).attr('placeholder', '');});
    $(this).focusout(function() {       
      $(this).attr('placeholder', placeholder);       
    });
  });

  // jQuery for page scrolling feature - requires jQuery Easing plugin
  $('a.page-scroll').on('click', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top - $('.navbar').height())
    }, 1250);
    event.preventDefault();
  });

  // Closes the Responsive Menu on Menu Item Click
  $('.navbar-collapse ul li a').click(function(){ 
    $('.navbar-toggle:visible').click();
  });

  // Highlight the top nav as scrolling occurs
  if(!($('.navbar-toggle').is(':visible'))) {
    $('body').scrollspy({
      target: '.affix',
      offset: 100
    });

    // Offset for Main Navigation
    $('.navbar').affix({
      offset: {
        top: 200
      }
    })
  }

  // Masked phone
  $(function($){
    $("[name=phone]").mask("+ 7 (999) 999-99-99");
  });

  // Audio player
  //$('audio').audioPlayer();

  // Play audio
  $('.review__link').on('click', function(e) {
    $(this).parent().find('.audioplayer-playpause').click();
    e.preventDefault();
  });

  // Spoiler
  $('.search__btn[data-target]').on('click', function(e) {
    var $this = $(this),
        $spoiler = $($this.data('target'));
        
    $this.hide();
    $spoiler.addClass('in')
    e.preventDefault();
  });

  // Init slick slider
  $('#carousel').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    swipeToSlide: '15',
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
        {
        breakpoint: 767,
        settings: {
          dots: true,
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

})(jQuery); // End of use strict