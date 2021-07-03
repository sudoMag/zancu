/*class NameText extends HTMLElement {
	constructor() {
		super();
		let k = true;
		setInterval(() => {
			if (k === false) {
				this.style.color = '#464c5d';
				k = true;
			} else {
				this.style.color = '#60677d';
				k = false;
			}
		}, 3000);
	}
}

window.customElements.define('name-text', NameText);

class Moon extends HTMLElement {
	constructor() {
		super();
		let k = true;
		setInterval(() => {
			if (k === false) {
				this.style.boxShadow = '0px 1px 25px 5px #b9b9b9';
				k = true;
			} else {
				this.style.boxShadow = '0px 1px 15px 5px #b9b9b9';
				k = false;
			}
		}, 3000);
	}
}

window.customElements.define('moon-body', Moon);

class Star extends HTMLElement {
	constructor() {
		super();
		var size = Math.floor(Math.random() * (7 - 2)) + 2;
		var position = {
			y: Math.floor(Math.random() * (window.innerWidth - 10)) + 10,
			x: Math.floor(Math.random() * (window.innerHeight - 10)) + 10
		}
		//console.log(`x= ${position.x}, y= ${position.y}`);
		this.style.width = `${size}px`;
		this.style.height = `${size}px`;
		this.style.transform = `translate(${position.y}px, ${position.x}px)`;
		let k = true;
		setInterval(() => {
			if (k === false) {
				this.style.backgroundColor= '#a2a2a2';
				k = true;
			} else {
				this.style.backgroundColor = 'white';
				k = false;
			}
		}, 3000);
	}
}

window.customElements.define('star-body', Star);
starsContainer = document.getElementById('stars-container');

for (let i=0; i<40; i++) {
	starsContainer.innerHTML += '<star-body></star-body>';
}


var moonShadowContainer = document.getElementById('moon-shadow-container');
var moonShadow = document.getElementById('moon-shadow');

function toFall(fractionPercentage ,totalPercentage) { //por ejemplo 50 de 100.
	percentage = fractionPercentage / totalPercentage * 100;
	let width =  320 - (percentage * 300 / 100) ;
	moonShadowContainer.style.transform = `rotate(315deg) translate(${percentage}%, 0)`;
	moonShadow.style.width = `${width}px`;
}

class CuriosityText extends HTMLElement {
	constructor() {
		super();
		const text = "sabias que 3 hombres han pagado 55 millones para viajar a la EEI?";
		this.innerHTML = text;
	}
}
window.customElements.define('curiosity-text', CuriosityText);

function loadConplete() {
	const loadingPage = document.getElementById('loading-page');
	const loadingPageStyle = document.getElementById('loading-page-style');
	 loadingPage.style.transform = `translate(0, ${-window.innerHeight}px)`
	 setTimeout(() => {
	 	loadingPage.remove();
	 	loadingPageStyle.remove();
	 }, 1500);
	
}*/
