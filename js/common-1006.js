// 禁用雙指縮放
document.documentElement.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
}, false);

// 禁用手指雙擊縮放
var lastTouchEnd = 0;
document.documentElement.addEventListener('touchend', function (event) {
    var now = Date.now();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// 關閉START按鈕
$('#goStart').click(function(){
    $(this).addClass('hide');
    $('.stop').removeClass('hide');
    $(".mask").addClass("show");
});

// 遊戲說明
$('.exp_btn').click(function(){
    $("#explain_content .packet-dialog").addClass("open");
    $("#explain_content").addClass("open");
});
$('.close').click(function(){
    $("#explain_content .packet-dialog").removeClass("open");
    $("#explain_content").removeClass("open");
});