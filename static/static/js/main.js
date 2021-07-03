class NameText extends HTMLElement {
	constructor() {
		super();
		let k = true;//switch del color
		setInterval(() => {//el color cambiara cada 3s
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

window.customElements.define('name-text', NameText);//se define etiqueta personalizada

class Moon extends HTMLElement {
	constructor() {
		super();
		let k = true;//switch del color
		setInterval(() => {//el color cambiara cada 3s
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

window.customElements.define('moon-body', Moon);//se define etiqueta personalizada

class Star extends HTMLElement {
	constructor() {
		super();
		var size = Math.floor(Math.random() * (7 - 2)) + 2;//tamaño aleatorio entre 7 y 2 px
		var position = {// cordenadas vectoriales
			y: Math.floor(Math.random() * (window.innerWidth - 10)) + 10,
			x: Math.floor(Math.random() * (window.innerHeight - 10)) + 10
		}
		//console.log(`x= ${position.x}, y= ${position.y}`);
		this.style.width = `${size}px`;
		this.style.height = `${size}px`;
		this.style.transform = `translate(${position.y}px, ${position.x}px)`;
		let k = true;//switch del color
		setInterval(() => {//el color cambiara cada 3s
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

window.customElements.define('star-body', Star);//se define etiqueta personalizada
const starsContainer = document.getElementById('stars-container');

/*aqui se crean añaden 40 estrellas al contenedor*/

for (let i=0; i<40; i++) {
	starsContainer.innerHTML += '<star-body></star-body>';
}