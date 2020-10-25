export default {

	bind(el, binding, vnode) {
		let current = 0;
		el.addEventListener('dblclick', function() {

			let increment = binding.value;
			let effect = '';

			// if (binding.value) {
			// 	increment = binding.value.increment || increment;
			// 	animate = binding.value.animate;
			// }

			if(!binding.arg || binding.arg == 'rotate') {
				current += increment || 90;
				effect = `rotate(${current}deg)`;
			} else if (binding.arg == 'scale') {
				increment = increment || 1.2;
				effect = `scale(${increment})`;
			}

			el.style.transform = effect;

			if (binding.modifiers.transparency) {
				el.style.opacity = '20%';
			}
		});
	}

}