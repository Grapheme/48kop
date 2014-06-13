$(document).on('focus', '.age input', function(){
	$(this).parent().addClass('active');
});
$(document).on('focusout', '.age input', function(){
	$(this).parent().removeClass('active');
});


$(document).on('mouseover', '.pers-img', function(){
	$(this).parent().find('.person').fadeIn(100);
});
$(document).on('mouseleave', '.pers-img', function(){
	$(this).parent().find('.person').fadeOut(100);
});

var Family = (function(){
	var count = 0;

	var str = [];

	str['father'] = '';
	str['mother'] = '';
	str['boy'] = '<span class="age"><span class="pers-img"></span><input name="age" maxlength="2" type="text"><label class="fill-age">Укажите возраст сына</label></span>';
	str['girl'] = '<span class="age"><span class="pers-img"></span><input name="age" maxlength="2" type="text"><label class="fill-age">Укажите возраст дочери</label></span>';

	var item = {
		Click: function(that) {
			var html = that.html();
			that.clone().appendTo($('.family'));
		}
	}

	$(document).on('click', '.f-step', function(){
		item.Click($(this));
	});
})();