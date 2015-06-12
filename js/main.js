(function() {

var ol;

run();

function run() {
	var values = shuffle(range(1, 11));
	
	ol = document.querySelector('ol');
	values.map(toDOMNode).forEach(ol.appendChild.bind(ol));
	
	var 
		swaps = sort(values).map(function(swap) { return [swap[0] + 1, swap[1] + 1]; }),
		numSwaps = swaps.length,
		swapIt = flatArrayIterator(swaps),
		button = document.getElementsByTagName('button')[0],
		buttonListener = (function() {
			var swaps = 0;
			return function(swap, e) {
				e.preventDefault();
				e.stopPropagation();
				
				swap();
				
				if (++swaps === numSwaps) {
					button.disabled = true;
					button.removeEventListener('click', buttonListener, false);
				}
			}
		})()
	;
	
	button.addEventListener(
		'click', 
		buttonListener = wrap(compose(renderSwap, swapIt), buttonListener), 
		false
	);
}

function toDOMNode(value, i) {
	var li = document.createElement('li'); 
	li.innerHTML = value;
	li.className = 'pos-' + (i+1);
	return li;
}

function sort(a) {
	var
		j, n, i,
		k,
		swaps = []
	;
	
	for (j = 1, n = a.length; j < n; j++) {
		k = a[j];
		i = j - 1;
		while (i >= 0 && k < a[i]) {
			a[i + 1] = a[i];
			swaps.push([i+1, i]);
			i--;
		}
		a[i + 1] = k;
	}
	
	return swaps;
}

function renderSwap(swap) {
	var 
		i = swap[0],
		j = swap[1],
		class_i = 'pos-' + i
		class_j = 'pos-' + j
	;

	var itemAti = ol.getElementsByClassName(class_i)[0];
	var itemAtj = ol.getElementsByClassName(class_j)[0];
	
	itemAti.className = class_j;
	itemAtj.className = class_i;
}

/*
 * Helpers
 */

/*
	From Underscore.js.
	Returns a shuffled copy of <array>.
*/

 // Return a random integer between min and max (inclusive).
 function random(min, max) {
	if (max == null) {
	  max = min;
	  min = 0;
	}
	return min + Math.floor(Math.random() * (max - min + 1));
}

function shuffle(array) {
	var 
		l = array.length,
		shuffled = new Array(l),
		i,
		rand
	;
	
	for (i = 0; i < l; i++) {
		rand = random(0, i);
		if (rand !== i) 
			shuffled[i] = shuffled[rand];
		shuffled[rand] = array[i];
	}
	
	return shuffled;
}

/*
 * From Underscore.js
 */
function range(start, stop, step) {
	if (arguments.length <= 1) {
	  stop = start || 0;
	  start = 0;
	}
	step = step || 1;

	var length = Math.max(Math.ceil((stop - start) / step), 0);
	var range = Array(length);

	for (var idx = 0; idx < length; idx++, start += step) {
	  range[idx] = start;
	}

	return range;
  };
	
function flatArrayIterator(array) {
	var index = 0;
	return function() {
		return array[index++];
	};
}

function wrap(f, w) {
	return w.bind(this, f);
}

function compose() {
	var 
		args = arguments,
		start = args.length - 1
	;
	return function() {
		var 
			i = start,
			result = args[start].apply(this, arguments)
		;
		while (i--) 
			result = args[i].call(this, result);
		return result;
	};
}

})();