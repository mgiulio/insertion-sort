var ol;

run();

function run() {
	var values = shuffle(range(1, 11));
	
	ol = document.querySelector('ol');
	values.map(toDOMNode).forEach(ol.appendChild.bind(ol));
	
	var nextSwap = flatArrayIterator(
		sort(values)
			.map(function(swap) { return [swap[0] + 1, swap[1] + 1]; })
	);
	
	document.getElementsByTagName('button')[0].addEventListener(
		'click', 
		function (e) { 
			e.preventDefault(); 
			e.stopPropagation(); 
		
			var swap = nextSwap();
			if (!swap) {
				this.disabled = true;
				this.innerHTML = 'Finished';
			}
			else
				renderSwap(swap[0], swap[1]);
		}, 
		false
	);
	
	ol.addEventListener('transitionend', function(e) {
		e.stopPropagation();
		e.target.classList.remove('moving');
	}, false);
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

function renderSwap(i, j) {
	var 
		class_i = 'pos-' + i
		class_j = 'pos-' + j
	;
	
	var itemAti = ol.getElementsByClassName(class_i)[0];
	var itemAtj = ol.getElementsByClassName(class_j)[0];
	
	itemAti.className = class_j;
	itemAti.classList.add('moving');
	itemAtj.className = class_i;
	itemAtj.classList.add('moving');
}
