$(document).on('focus', '.age input', function(){
	$(this).parent().addClass('active');
});
$(document).on('focusout', '.age input', function(){
	$(this).parent().removeClass('active');
});


$(document).on('mouseover', '.family-item', function(){
	$(this).find('.person').fadeIn();
});
$(document).on('mouseleave', '.family-item', function(){
	$(this).find('.person').fadeOut();
});

var Family = (function(){
	var count = 0;

	var str = [];

	str['father'] = '';
	str['mother'] = '';
	str['boy'] = '<span class="age"><input name="age" maxlength="2" type="text"><label class="fill-age">Укажите возраст сына</label></span>';
	str['gril'] = '<span class="age"><input name="age" maxlength="2" type="text"><label class="fill-age">Укажите возраст дочери</label></span>';
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

})();