var FamilyForm = (function(){

	var selectBox = new SelectBox($('.inters-select'));
	$('.city-select').selectBox();

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
		$(this).parent().parent().attr('data-age', $(this).val());
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

	var step = 0;
	$(document).on('click', '.cal-left', function(){
		if(step == 0) return;
		step--;
		$('.calendar-in').attr('style', '-webkit-transform: translateX(-' + step * 384 + 'px); transform: translateX(' + step * 384 + 'px);');
		$('.one-month[data-month=07]').removeClass('active');
		$('.one-month[data-month=06]').addClass('active');
	});

	$(document).on('click', '.cal-right', function(){
		if(step == $('.one-month').length - 1) return;
		step++;
		$('.calendar-in').attr('style', '-webkit-transform: translateX(-' + step * 384 + 'px); transform: translateX(' + step * 384 + 'px);');
		$('.one-month[data-month=07]').addClass('active');
		$('.one-month[data-month=06]').removeClass('active');
	});

	$(document).on('focus', 'input[name=date]', function(){
		$('.calendar').removeClass('closed');
	});

	$(document).on('change', '.inters-select', function(){
		if($(this).val() == '0') {
			return;
		}
		if($('.inters-clicked').length >= 5) {
			return;
		}
		$('.form-error[data-block=inters]').removeClass('showed');
		var text = $('.inters-select option[value="' + $(this).val() + '"]').text();
		$('.inters-cont').append('<div class="inters-clicked" data-value="' + $(this).val() + '">' + text + '<span class="int-cross">&#10005;</span></div>');
		$(this).find('option[value="' + $(this).val() + '"]').remove();
		selectBox.destroy();
		selectBox.init();
		if($('.inters-clicked').length == 5) {
			$('a.inters-select').hide();
		}
	});

	$(document).on('click', '.int-cross', function(){
		var value = $(this).parent().attr('data-value');
		var pre_text = $(this).parent().text();
		var text = pre_text.substr(0,(pre_text.length -1));
		$('.inters-select').append('<option value="' + value + '">' + text + '</option>');
		var pre_text = $(this).parent().remove();
		selectBox.destroy();
		selectBox.init();
		$('a.inters-select').show();
	});

	$(document).on('click', '.day.click-allow', function(){
		$('input[name=date]').val($(this).text() + ' ' + $(this).parent().parent().attr('data-month-cyr'));
		$('.calendar').addClass('closed').attr('data-date', $(this).attr('data-date') + '.' + $(this).parent().parent().attr('data-month') + '.2014');
		$('.form-error[data-block=calendar]').removeClass('showed');
	});

	$(document).on('click', '.family-btn', function(){
		var interests = []; 
		$('.inters-clicked').each(function(){
			interests.push('"' + $(this).attr('data-value') + '"');
		});

		var mother = 0,
			father = 0,
			children = [0, 0, 0];

		if($('.family-after .family-item[data-person=father]').length != 0) {
			father = 1;
		}
		if($('.family-after .family-item[data-person=mother]').length != 0) {
			mother = 1;
		}

		var i = 0;
		if($('.family-after .family-item[data-person=boy]').length != 0 || $('.family-after .family-item[data-person=girl]').length != 0) {
			$('.family-after .family-item[data-person=boy]').each(function(){
				children[i] = $(this).attr('data-age');
				i++;
			});
			$('.family-after .family-item[data-person=girl]').each(function(){
				children[i] = $(this).attr('data-age');
				i++;
			});
		}

		var family = '{"father": ' + father + ', "mother": ' + mother + ', "children": [' + children + ']}';
		var json_str = '{"date": "' + $('.calendar').attr('data-date') + '", "interests": [' + interests + '], "family": ' + family + ', "city": "' + $('.city-select').val() + '"}';
		var form_val = true;
		if(!$('.calendar').attr('data-date')) {
			$('.form-error[data-block=calendar]').addClass('showed');
			form_val = false;
		} else {
			$('.form-error[data-block=calendar]').removeClass('showed');
		}
		if(!interests[0]) {
			$('.form-error[data-block=inters]').addClass('showed');
			form_val = false;
		} else {
			$('.form-error[data-block=inters]').removeClass('showed');
		}
		if(!father && !mother) {
			if(children[0] == 0) {
				$('.form-error[data-block=family] span').text('Вы не указали состав семьи');
			} else {
				$('.form-error[data-block=family] span').text('Добавьте хотя бы одного взрослого');
			}
			$('.form-error[data-block=family]').addClass('showed');
			form_val = false;
		} else {
			$('.form-error[data-block=family]').removeClass('showed');
		}
		if(form_val) {
			//alert(json_str);
            $("input[name=line]").val(json_str).parents("form").submit();
		}
		return false;
	});

})();

var Family = (function(){

	var str = [];

	str['father'] = '<a href="#" class="family-item active focused" data-person="father"><span class="pers-img"></span></a>';
	str['mother'] = '<a href="#" class="family-item active focused" data-person="mother"><span class="pers-img"></span></a>';
	str['boy'] = '<a href="#" class="family-item active focused" data-person="boy" data-age="0"><span class="pers-img"></span><span class="age"><input name="age" maxlength="2" type="text"><label class="fill-age">Укажите возраст сына</label></span></a>';
	str['girl'] = '<a href="#" class="family-item active focused" data-person="girl" data-age="0"><span class="pers-img"></span><span class="age"><input name="age" maxlength="2" type="text"><label class="fill-age">Укажите возраст дочери</label></span></a>';

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

			$('.form-error[data-block=family]').removeClass('showed');
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