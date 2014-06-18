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
			scrollTop: $("#places_anch").offset().top - 29
		}, 400);
	});
	$(document).on('click', '.an_events', function(e){
		$('html,body').animate({
			scrollTop: $("#events_anch").offset().top - 29
		}, 400);
	});
	$(document).on('click', '.an_advices', function(e){
		$('html,body').animate({
			scrollTop: $("#advices_anch").offset().top - 29
		}, 400);
	});
	$(document).on('click', '.an_where2b', function(e){
		$('html,body').animate({
			scrollTop: $("#where2b_anch").offset().top - 29
		}, 400);
	});
	$(document).on('click', '.i-will', function(e){
		$(this).toggleClass('active');
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

function validateEmail(x) {
    var atpos = x.indexOf("@");
    var dotpos = x.lastIndexOf(".");
    if (atpos< 1 || dotpos<atpos+2 || dotpos+2>=x.length) {
        return false;
    } else {
    	return true;
    }
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
	if(!validateEmail(email.val())) {
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

    ///////////////////////////////////////////////////////
    // AJAX form submit request
    ///////////////////////////////////////////////////////
    $.ajax({
        url : $(this).attr("action"),
        type: "POST",
        data: $(this).serializeArray(),
        success: function(data, textStatus, jqXHR) {
            //data: return data from server
        },
        error: function(jqXHR, textStatus, errorThrown) {
            //if fails
        }
    });
    e.preventDefault(); //STOP default action
    e.unbind(); //unbind. to stop multiple form submit.
    ///////////////////////////////////////////////////////

});

if($('.scroll-top').length) {
	var scroll_allow = true;
	$(window).on('scroll', function(){
		if($(window).scrollTop() > $(window).height() / 2) {
			if(scroll_allow) {
				$('.scroll-top').addClass('showed');
			}
		} else {
			scroll_allow = false;
			$('.scroll-top').removeClass('showed');
			setTimeout(function() {
				scroll_allow = true;
			}, 500);
		}
	});

	$(document).on('click', '.scroll-top', function(){
		$('.scroll-top').removeClass('showed');
		$('html, body').animate({ scrollTop: 0 }, 250);
	});
}
