$(function() {
  $('.calendar_area').datepicker({
    showMonthAfterYear: true
    , dateFormat: "yy-mm-dd"
    , yearSuffix: "년"
    , monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 텍스트
    , monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 Tooltip
    , dayNamesMin: ['일','월','화','수','목','금','토'] //달력의 요일 텍스트
    , dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'] //달력의 요일 Tooltip
    , minDate: '-1M'
    , maxDate: '1M'
    , onSelect: function(dateText) {
      $('#reserve_date').text(dateText + ' ' + getDayOfWeek(dateText));
    }
  });

  // 기본 날짜 표시
  const defaultDate = $.datepicker.formatDate('yy-mm-dd', $('.calendar_area').datepicker('getDate'));
  $('#reserve_date').text(defaultDate + ' ' + getDayOfWeek(defaultDate));

  // 요일 구하기
  function getDayOfWeek(dateText) {
    const date = new Date(dateText);
    const week = ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'];

    $('.timetable_round > div > .selectBtn').removeClass('on');
    
    return week[date.getDay()];
  }

  // 예약하기
  $('.selectBtn').on('click', function() {
    $('.timetable_round > div > .selectBtn').removeClass('on');
    $(this).addClass('on');

    const reserveDate = $('#reserve_date').text();
    const idx = reserveDate.indexOf('요');
    const reserveRound = $(this).parent().siblings('div:eq(0)').text() + '회차 ';
    const reserveTime = $(this).parent().siblings('div:eq(1)').text();
  
    $('#reserve_date').text(reserveDate.substring(0, idx + 2) + ' ' + '(' + reserveRound + reserveTime + ')');
  });
});