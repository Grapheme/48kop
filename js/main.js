$('select').selectBox();

$(document).on('focus', '.age input', function(){
	$(this).parent().addClass('active');
	$('.family-item.focused').removeClass('focused');
	$('.fill-age').hide();
	if($(this).val() == '') {
		$(this).parent().find('.fill-age').show();
		$(this).parent().parent().addClass('focused');
	}
});
$(document).on('focusout', '.age input', function(){
	$(this).parent().removeClass('active');
	if($(this).val() != '') {
		$(this).parent().find('.fill-age').hide();
		$(this).parent().parent().removeClass('focused');
	}
});
$(document).on('input', '.age input', function(){
	$('.family-item.focused').removeClass('focused');
	if($(this).val() != '') {
		$(this).parent().find('.fill-age').hide();
		$(this).parent().parent().removeClass('focused');
	}
	if(parseInt($(this).val()) < 1 || parseInt($(this).val()) > 18 || !parseInt($(this).val())) {
		var inp = $(this);
		setTimeout(function(){
			inp.val('');
		}, 100);
	}
});


$(document).on('mouseover', '.pers-img', function(){
	$(this).parent().find('.person').fadeIn(100);
});
$(document).on('mouseleave', '.pers-img', function(){
	$(this).parent().find('.person').fadeOut(100);
});

var Family = (function(){

	var str = [];

	str['father'] = '<a href="#" class="family-item active focused" data-person="father"><span class="pers-img"></span></a>';
	str['mother'] = '<a href="#" class="family-item active focused" data-person="mother"><span class="pers-img"></span></a>';
	str['boy'] = '<a href="#" class="family-item active focused" data-person="boy"><span class="pers-img"></span><span class="age"><input name="age" maxlength="2" type="text"><label class="fill-age">Укажите возраст сына</label></span></a>';
	str['girl'] = '<a href="#" class="family-item active focused" data-person="girl"><span class="pers-img"></span><span class="age"><input name="age" maxlength="2" type="text"><label class="fill-age">Укажите возраст дочери</label></span></a>';

	var item = {

		add: function(that) {

			function hmuch(type) {
				return type?$('.family-after .family-item[data-person=' + type + ']').length:$('.family-after .family-item').length;
			}
			function gblock(type) {
				return $('.family-after .family-item[data-person=' + type + ']');
			}
			var type = that.data('person');
			var allow = true;

			if(hmuch('girl') + hmuch('boy') >= 3 && ( type == 'girl' || type == 'boy') ) { allow = false; }
			if(hmuch(false) >= 5) { allow = false; }
			if(hmuch('father') == 1 && type == 'father') { allow = false; }
			if(hmuch('mother') == 1 && type == 'mother') { allow = false; }
			$('.age input').each(function(){
				if(allow)
				{
					if($(this).val() == '') {
						$('.fill-age').hide();
						$(this).parent().find('.fill-age').show();
						$('.family-item.focused').removeClass('focused');
						$(this).parent().parent().addClass('focused');
						allow = false;
					}
				}
			});

			if(!allow) return;

			/*============*/

			$('.family-arrow').addClass('active');
			$('.family-item.focused').removeClass('focused');

			if(type == 'father') {
				if(hmuch('mother') != 0) { gblock('mother').before(str[type]); } else if(hmuch('boy') != 0) { gblock('boy').first().before(str[type]); } else if(hmuch('girl') != 0) { gblock('girl').first().before(str[type]); } else {
					$('.family-after').append(str[type]);
				}

			} else if(type == 'mother') {
				if(hmuch('boy') != 0) { gblock('boy').first().before(str[type]); } else if(hmuch('girl') != 0) { gblock('girl').first().before(str[type]); } else {
					$('.family-after').append(str[type]);
				}

			} else if(type == 'boy') {
				if(hmuch('girl') != 0) { gblock('girl').first().before(str[type]); } else {
					$('.family-after').append(str[type]);
				}
				
			} else {
				$('.family-after').append(str[type]);
			}

			if(type == 'boy' || type == 'girl') {
				$('.fill-age').hide();
				$('.family-item.focused .fill-age').show();
			}
		},

		rm: function(that) {
			that.remove();
			if($('.family-after .family-item').length == 0) {
				$('.family-arrow').removeClass('active');
			}
		}
	};

	$(document).on('click', '.f-step', function(){
		item.add($(this));
		return false;
	});
	$(document).on('click', '.family-item.active .pers-img', function(){
		item.rm($(this).parent());
		return false;
	});
})();

var App = (function(){
	var $top = $('.top');

	var alignBg = function(){
		$top.height( $(window).width() / 1.634 );
	};

	alignBg();

	$(window).resize( function(){
		alignBg();
	});

	$(document).on('click', '#login', function(e){
		e.preventDefault();
		$('.overlay').removeClass('hidden');
		$('[data-item="auth"]').removeClass('hidden');
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
})();