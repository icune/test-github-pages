$(function() {
	var $tpl = $('[tpl]').clone();
	var tplPool = {};
	var stop = false;
	setInterval(function() {
		if (stop) {
			return;
		}
		if(Math.random() < 0.7) {
			return;
		}
		var $cat = $tpl.clone();
		var size = Math.random()*200 + 100;
		var rotate = parseInt(Math.random()*90 - 45);
		var scale = Math.random() < 0.5 ? 1 : -1;
		$cat.css({
			top: window.innerHeight + 100 + 'px',
			left: Math.random()*window.innerWidth + 'px',
			width: size + 'px',
			height: size + 'px',
			transform: 'rotate(' + rotate + 'deg)  scale(' + scale + ')'
		})
		$cat.data('dy', Math.random() * 2 + 1);
		$cat.appendTo('body');
		$cat.show();
		var key = new Date().getTime();
		tplPool[key] = $cat;
	}, 300);
	setInterval(function() {
		if (stop) {
			return;
		}
		for(var k in tplPool) {
			var $cat = tplPool[k];
			
			if (!$cat) {
				return;
			}

			$cat.css({
				top: (parseInt($cat.offset().top) - parseInt($cat.data('dy'))) + 'px'
			})
			
			if ($cat.offset().top + $cat.height < 0) {
				$cat.remove();
				tplPool[k] = null;
			}
		}
		var genCats = 0;
		for(var k in tplPool) {
			if (tplPool[k])
				genCats++;
		}
		console.log(genCats);
	}, 60);
	$('[anim]').click(function() {
		stop = !stop;
		if (stop) {
			$(this).text('Continue animation');
		} else {
			$(this).text('Stop animation');
		}
	})
})