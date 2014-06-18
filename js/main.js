var App = (function(){
	var $top = $('.top');

	var alignBg = function(){
		$top.height( $(window).width() / 1.634 );
	};

	alignBg();

	$('.overlay.no-fix').height( $(document).height() );

	$(window).resize( function(){
		if($(window).width() > 1044) { $top.height( $(window).width() / 1.834 ); }
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

	/* Recomendations anchors */

	$(document).on('click', '.an_places', function(e){
		$('html,body').animate({
			scrollTop: $(".places-ul").offset().top
		}, 400);
	});
	$(document).on('click', '.an_events', function(e){
		$('html,body').animate({
			scrollTop: $(".events-ul").offset().top
		}, 400);
	});
	$(document).on('click', '.an_advices', function(e){
		$('html,body').animate({
			scrollTop: $(".advices-ul").offset().top
		}, 400);
	});
	$(document).on('click', '.an_where2b', function(e){
		$('html,body').animate({
			scrollTop: $(".wtb-ul").offset().top
		}, 400);
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

function validateEmail(email) { 
    var re = /^(([^<>()[]\.,;:s@"]+(.[^<>()[]\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/igm;
    return re.test(email);
} 

$(document).on('submit', '.feedback-form', function(){
	var name = $(this).find('input[name=name]');
	var email = $(this).find('input[name=email]');
	var message = $(this).find('textarea[name=message]');
	var form_val = true;

	if(name.val() == '') {
		name.parent().addClass('error');
		form_val = false;
	} else {
		name.parent().removeClass('error');
	}
	if(validateEmail(email.val())) {
		email.parent().addClass('error');
		form_val = false;
	} else {
		email.parent().removeClass('error');
	}
	if(message.val() == '') {
		message.parent().addClass('error');
		form_val = false;
	} else {
		message.parent().removeClass('error');
	}
	if(!form_val) {
		return false;
	}
});