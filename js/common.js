// popup
function showPopup() {
  const pathNm = $(location).attr('pathname');
  const idx = pathNm.lastIndexOf('/');
  const pathNmStr = pathNm.substring(idx);

  if(pathNmStr === '/' || pathNmStr === '/index.html') {
    $('.layer_popup').show();
    $('.dim').addClass('popup');
  }
}

$('#popup_close_btn').on('click', function(e) {
  e.preventDefault();
  $('.layer_popup').hide();
  $('.dim').removeClass('popup');
});



// media query
const checkMobile = window.matchMedia('screen and (max-width: 767px)');
const checkTablet = window.matchMedia('screen and (min-width: 768px) and (max-width: 1024px)');
const checkDesktop = window.matchMedia('screen and (min-width: 1025px)');
let deviceType = '';

// Init
if(checkDesktop.matches) {
  showPopup();
  handleDesktopChange(checkDesktop);
} else {
  handleMobileChange(checkMobile);
}

// desktop
checkDesktop.addEventListener('change', handleDesktopChange);
function handleDesktopChange(mql) {
  if(mql.matches) {
    deviceType = 'pc';
    displayDesktop();
  } else {
    deviceType = 'tablet';
    displayMobile();
  }
  changeImgSrc();
  console.log(deviceType);
}

// mobile
checkMobile.addEventListener('change', handleMobileChange);
function handleMobileChange(mql) {
  if(mql.matches) {
    deviceType = 'mobile';

    // 알림 탭만 보이도록 설정
    $('.notice_list > li:first-child > h2 > a').trigger('click');
  } else {
    deviceType = 'tablet';
  }
  changeImgSrc();
  console.log(deviceType);
}

function displayDesktop() {
  $('.util').show();
  $('.gnb_sec nav').show();

  $('.icon_menu').hide();
  $('.sub_menu').hide();
  $('.gnb_sec nav .gnb > li > a').removeClass('on');
  $('.m_language').hide();
  if(!$('.dim').hasClass('popup')) {
    $('.dim').hide();
  }

  // search
  $('.search_box .search_field').attr('placeholder', '')

  // gnb
  $('nav').on('mouseenter', function() {
    $('.sub_menu').show();
    $(this).addClass('on');
  }).on('mouseleave', function() {
    $('.sub_menu').hide();
    $(this).removeClass('on');
  });
}

function displayMobile() {
  if($('.m_menu_btn').hasClass('active')) {
      $('.icon_menu').show();
      $('.m_language').show();
      $('.dim').show();
    } else {
      $('.util').hide();
      $('.gnb_sec nav').hide();
    }

  // search
  $('.search_box .search_field').attr('placeholder', '검색어를 입력해주세요.');

  if('block' == $('.search_box').css('display')) {
    $('.dim').show();
  }

  // gnb
  $('nav').off('mouseenter').off('mouseleave');
}



// Header
// - language
$('.language_box').on('click', function(e) {
  e.preventDefault();
  $(this).children().toggleClass('on');
});

// search
$('.search_btn > button').on('click', function() {
  $('.search_box').show();
});

$('.m_search_btn > button').on('click', function() {
  $('.search_box').show();
  $('.dim').show();
  $('.util_sec h1').css('zIndex', 10);
});

$('.search_close_btn').on('click', function() {
  $(this).parent().hide();
  $('.dim').hide();
});

// gnb
// - mobile
$('.m_menu_btn').on('click', function() {
  $('.util').show();
  $('.icon_menu').show();
  $('.gnb_sec nav').show();
  $('.m_language').show();
  $(this).addClass('active');
  $('.dim').show();
  $('.util_sec h1').css('zIndex', 0);

  $('.m_util').hide();
});

$('.menu_close_btn').on('click', function(e) {
  e.preventDefault();

  $('.util').hide();
  $('.icon_menu').hide();
  $('.gnb_sec nav').hide();
  $('.m_language').hide();
  $('.m_menu_btn').removeClass('active');
  $('.dim').hide();

  $('.m_util').show();
});

// - sub menu
$('.gnb_sec nav .gnb > li > a').on('click', function(e) {
  e.preventDefault();
  if('pc' === deviceType) return;
  $(this).siblings().slideToggle();
  $(this).toggleClass('on');
});



// Main Visual
function changeImgSrc() {
  const imgEl = $('.main-swiper .swiper-slide a img');
  $.each(imgEl, function(idx, item) {
    const imgSrc = item.src;
    const ExType = imgSrc.substring(imgSrc.lastIndexOf('_')+1, imgSrc.lastIndexOf('.'));

    item.src = imgSrc.replace(ExType, deviceType);
  });
}



// Notice
$('.notice_list h2').on('click', function(e) {
  e.preventDefault();
  $(this).parent('li').addClass('on');
  $(this).parent('li').siblings().removeClass('on');
});

$('.notice_list ul li a').on('mouseenter', function() {
  $(this).children().css('text-decoration', 'underline');
}).on('mouseleave', function() {
  $(this).children().css('text-decoration', 'none');
});



// Footer
$('footer .link_list').on('click', 'div > button', function() {
  $(this).parent().toggleClass('on');
  $(this).parent().children('ul').toggleClass('on');

  $(this).parent().siblings().removeClass('on');
  $(this).parent().siblings().children('ul').removeClass('on');
});

$('#top_btn').on('click', function() {
  $('html').animate({scrollTop: 0}, 400);
});



// Member
function getParameter() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const memberType = urlParams.get('memberType');

  console.log(memberType);

  return memberType;
}

// 만 14세 미만
if('kid' == getParameter()) {
  $('.guardian_agree').show();
}

// - 자세히 보기 버튼
$('.view_detail').on('click', function() {
  $(this).toggleClass('on');
  $(this).siblings($('.detail_contents')).toggleClass('active');
});

// - 전체 동의
$('#chk_all').on('click', function() {
  handleCheckbox.toggleCheckAll($(this), '');
});

// - 메일링 (전체)
$('#chk_all_mailing').on('click', function() {
  handleCheckbox.toggleCheckAll($(this), '.mailing_sub');
});

// - 박물관 소식지
$('#chk_all_museum_news').on('click', function() {
  handleCheckbox.toggleCheckAll($(this), '.museum_news_list');
});

const chkBoxes = $('input[type="checkbox');
$(chkBoxes).each(function(idx, item) {
  $(item).on('click', function() {
    handleCheckbox.toggleCheck($(item));
  })
});

const handleCheckbox = {
  toggleCheck : (el) => {
    if('chk_all' === el.attr('id').substring(0, 7)) return;

    if(el.hasClass('on')) {
      el.removeClass('on');
      $('input[id^="chk_all"]').removeClass('on');
      console.log('uncheck');
    } else {
      el.addClass('on');
      console.log('check');
    }
  },
  toggleCheckAll : (el, subEl) => {
    if(el.hasClass('on')) {
      el.removeClass('on');
      $(subEl + ' input[type="checkbox"]').removeClass('on');
      console.log('remove all');
    } else {
      el.addClass('on');
      $(subEl + ' input[type="checkbox"]').addClass('on');
      console.log('check all');
    }
  }
}