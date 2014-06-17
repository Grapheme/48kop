var App = (function(){
	var $top = $('.top');

	var alignBg = function(){
		$top.height( $(window).width() / 1.634 );
	};

	alignBg();

	$('.overlay.no-fix').height( $(document).height() );

	$(window).resize( function(){
		alignBg();
	});

	$(document).on('click', '#login', function(e){
		e.preventDefault();
		$('.overlay').removeClass('hidden');
		$('[data-item="auth"]').removeClass('hidden');
	});
	$(document).on('click', '.to-bot .button', function(e){
		$('html,body').animate({
			scrollTop: $(".mid-cont").offset().top
		}, 800);
	});
	$(document).on('click', '#feedback', function(e){
		e.preventDefault();
		$('.overlay').removeClass('hidden');
		$('[data-item="feedback"]').removeClass('hidden');
	});
	$(document).on('click', '.popup-close', function(e){
		e.preventDefault();
		$('.overlay').addClass('hidden');
		$('.popup').addClass('hidden');
	});

	$(document).on('click', '.send-email', function(e){
		e.preventDefault();
		var form = $(this).next();

		if(form.css('display') == 'none') {
			form.show();
		}
		else {
			form.hide();
		}
	});
	$(document).on('click', '#sendEmailSubmit', function(e){
		e.preventDefault();
		$(this).parent().html('<span class="success">Ваша рекомендация успешно<br>отправлена вашему другу</span>');
	});
	$(document).on('click', '.places-link, .events-link, .advices-head > a', function(e){
		e.preventDefault();
		$('.overlay').removeClass('hidden');
		$('.popup.rec').removeClass('hidden');
	});
})();