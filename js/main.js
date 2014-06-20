var App = (function(){
	var $top = $('.top');
	var $sendEmailForm = $('.send-email-form');
	var $sendEmailCont = $sendEmailForm.html();
	var $winOffset = $('html').offset().top;

	$(document).on('click', '.feedback-form button', function(e){
		e.preventDefault();
		$(this).parent()
			   .parent()
			   .hide()
			   .parent()
			   .parent()
			   .find('.popup-desc').html('Ваше сообщение успешно отправлено.<br>Спасибо за внимание к нашему проекту.')
			   .prev()
			   .css('padding', '10% 0 1%');
	});
	$(document).on('click', '.to-bot .button', function(e){
		$('html,body').animate({
			scrollTop: $(".mid-cont").offset().top
		}, 800);
	});

	$(document).click( function(){
		console.log('click');
		if($sendEmailForm.is(':visible')) {
			$sendEmailForm.hide().html($sendEmailCont);
		}
	});
	$(document).on('click', '.send-email-form, #send-email', function(e){
		e.stopPropagation();
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

	/* i will go btn */

	$(document).on('click', '.i-will', function(e){
		$(this).toggleClass('active');
	});

	/* popups */
	function alignPopup(popup) {
		var $overlay = $('.overlay');
		var $wrapper = $('.outer-wrapper');

		if( popup.height() > $(window).height() + 60 ){
			$overlay.addClass('not-fixed').height(popup.height() + 60);
			$wrapper.height(popup.height() + 60).scrollTop(0).css({ 'overflow': 'hidden'});
			popup.css({ 'top': '30px'});
		}
		else {
			popup.css({ 'top': ( $overlay.height() - popup.height() ) / 2 });
		}
	}

	$(document).on('click', '.popup', function(e){
		e.stopPropagation();
	});

    $(document).on('click', '.places-link', function(e){
    	$winOffset = $(this).parent().parent().offset().top;;
    	console.log($winOffset);
        e.preventDefault();
        //Привязывается к id, который указан в data-place ссылки
        var num = $(this).data('place');
        //Задаем нужный шаблон
        var source  = $("#rec-template").html();
        var template = Handlebars.compile(source);
        //Выбираем нужный ключ из объекта мероприятий, мест и советов
        var context = popup__data.places[num];
        var html = template(context);
        $('#rec').html(html);
        $('.overlay').removeClass('hidden');
		$('#rec').removeClass('hidden');
        setTimeout( function(){
			alignPopup( $('#rec') );
        }, 4);
    });
    $(document).on('click', '.events-link', function(e){
    	$winOffset = $(this).parent().parent().offset().top;
    	console.log($winOffset);
        e.preventDefault();
        var num = $(this).data('place');
        var source  = $("#event-template").html();
        var template = Handlebars.compile(source);
        var context = popup__data.events[num];
        var html = template(context);
        $('#rec').html(html);
        alignPopup($('#rec'));
        $('.overlay').removeClass('hidden');
        $('#rec').removeClass('hidden');
        setTimeout( function(){
			alignPopup( $('#rec') );
        }, 4);
    });
    $(document).on('click', '.advices-head > a', function(e){
    	$winOffset = $(this).parent().parent().offset().top;
    	console.log($winOffset);
        e.preventDefault();
        var num = $(this).data('place');
        var source  = $("#advice-template").html();
        var template = Handlebars.compile(source);
        var context = popup__data.advices[num];
        var html = template(context);
        alignPopup($('#advice'));
        $('#advice').html(html);
        $('.overlay').removeClass('hidden');
        $('#advice').removeClass('hidden');
        setTimeout( function(){
			alignPopup( $('#advice') );
        }, 4);
    });
	$(document).on('click', '#login', function(e){
		e.preventDefault();
		$('.overlay').removeClass('hidden');
		$('[data-item="auth"]').removeClass('hidden');
		alignPopup($('[data-item="auth"]'));
	});
	$(document).on('click', '#feedback', function(e){
		e.preventDefault();
		$('.overlay').removeClass('hidden');
		$('[data-item="feedback"]').removeClass('hidden');
		alignPopup($('[data-item="feedback"]'));
	});
	$(document).on('click', '.popup-close, .overlay', function(e){
		e.preventDefault();
		$('.overlay').addClass('hidden').removeClass('not-fixed');
		$('.popup').addClass('hidden').removeAttr('style');
		$('.outer-wrapper').removeAttr('style');
		setTimeout(function(){$(document).scrollTop($winOffset);}, 100);
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

$(document).on('submit', '.feedback-form', function(e){
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
    $(".form-error").removeClass("showed");
    var btn = $(this).find("button");
    $(btn).hide();
    $.ajax({
        url : $(this).attr("action"),
        data: $(this).serializeArray(),
        type:    "POST",
        dataType: "json",
        success: function(response, textStatus, jqXHR) {
            //response: return JSON data from server
            console.log(response);
            if (response.status == true) {
                //alert("ALL OK!");
                $(".popup.feedback .popup-desc").html("<br/><p>Ваше сообщение успешно отправлено.</p><p>Спасибо за внимание к нашему проекту.</p><br/><br/>");
                $(".feedback-form").hide();
            }
            return false;
        },
        error: function(jqXHR, textStatus, errorThrown) {
            //if fails
            //alert("ERROR: " + jqXHR);
            console.log(jqXHR);
            $(".form-error").addClass("showed");
            $(btn).show();
            return false;
        }
    });
    e.preventDefault(); //STOP default action
    //e.unbind(); //unbind. to stop multiple form submit.
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
