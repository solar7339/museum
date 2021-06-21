// Main Visual
const mainSwiper = new Swiper('.main-swiper', {
  slidesPerView: 'auto',
  centeredSlides: true,
  loop: true,
  spaceBetween: 30,
  autoplay: {
    delay: 2000,
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    // when window width is >= 640px
    1025: {
      spaceBetween: 45
    }
  }
});

$('.swiper_controller .play_pause_btn > button').on('click', function() {
  if($(this).hasClass('play_btn')) {
    mainSwiper.autoplay.start();
    $(this).removeClass('play_btn').addClass('pause_btn');
  } else {
    mainSwiper.autoplay.stop();
    $(this).removeClass('pause_btn').addClass('play_btn');
  }
});

// Exhibition
const exhibSwiper = new Swiper(".exhib-swiper", {
  slidesPerView: 1,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next-exhib",
    prevEl: ".swiper-button-prev-exhib",
  },
  breakpointsInverse: true,
  breakpoints: {
    // when window width is >= 640px
    767: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
    // when window width is >= 1025px
    1025: {
      slidesPerView: 4,
      spaceBetween: 20,
    }
  }
});

$('.sec_exhib .swiper-slide > a').on('mouseenter', function() {
  $(this).children('div').css('transition', 'all 0.3s');
  $(this).children('div').css('opacity', '1');
}).on('mouseleave', function() {
  $(this).children('div').css('transition', 'all 0.3s');
  $(this).children('div').css('opacity', '0');
});

// Education
const eduSwiper = new Swiper(".edu-swiper", {
  slidesPerView: 1,
  spaceBetween: 40,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next-edu",
    prevEl: ".swiper-button-prev-edu",
  },
  breakpointsInverse: true,
  breakpoints: {
    // when window width is >= 640px
    767: {
      slidesPerView: 2,
    },
    // when window width is >= 947px
    967: {
      slidesPerView: 3,
    },
    // when window width is >= 1024px
    1024: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    // when window width is >= 1262px
    1262: {
      slidesPerView: 3,
      spaceBetween: 20,
    }
  }
});

// Notice
const eventSwiper = new Swiper(".event-swiper", {
  loop: true,
  slidesPerView: 'auto',
  navigation: {
    nextEl: ".swiper-button-next-event",
    prevEl: ".swiper-button-prev-event",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  }
});

const popSwiper = new Swiper(".popup-swiper", {
  watchOverflow: false,
  // loop: true,
  navigation: {
    nextEl: ".swiper-button-next-popup",
    prevEl: ".swiper-button-prev-popup",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  }
});