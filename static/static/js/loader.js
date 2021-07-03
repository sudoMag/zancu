
const mainArea = document.getElementById('root');
var pageToLoad = 'chatteringpage';// puedes añadir logica para cambiar entre loginpage
							// y chatteringpage si el usuario esta o no logeado

const scriptsList = 
	{
		'chatteringpage': 
			{
				'rute': 'static/js/chattering/',
				'fileNames': 
				[
					'main',
					'chattering'
				]
			},

		'loginpage': 
			{
				'rute': 'null',
				'filenames':
					[
						'null'
					]
			}
			
	};

const stylesList =
	{
		'chatteringpage': 
			{
				'rute': 'static/css/chattering/',
				'fileNames': 
					[
						'chattering_page'
					]
			},

		'loginpage': 
			{
				'rute': 'null',
				'filenames':
					[
						'null'
					]
			}
			
	};


const moonShadowContainer = document.getElementById('moon-shadow-container');
const moonShadow = document.getElementById('moon-shadow');

const chatPage = document.getElementById('chat-page');
var scriptData = scriptsList[pageToLoad];
var stylesData = stylesList[pageToLoad];
var filesLoaded = 0;
var totalToLoad = (scriptData.fileNames.length) + (stylesData.fileNames.length);

/*crea el porcentaje de carga de la luna*/

function toFall(fractionPercentage ,totalPercentage=totalToLoad) { //por ejemplo 50 de 100.
	percentage = fractionPercentage / totalPercentage * 100;
	let width =  300 - (percentage * 300 / 100) ;//aqui saca el porcentaje y se lo resta a 320px
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

/*levanta la pantalla de carga
y a los 2s borra su condigo html y css
-- SE LLAMA AL CARGAR LA PAGINA INSTANCIADA --*/

function loadConplete() {
	const loadingPage = document.getElementById('loading-page');
	const loadingPageStyle = document.getElementById('loading-page-style');
	 loadingPage.style.transform = `translate(0, ${-window.innerHeight}px)`
	 setTimeout(() => {
	 	loadingPage.remove();
	 	loadingPageStyle.remove();
	 }, 3000);
	
}

function isLoaded() {// verifica si ya se cargaron todos los archivos de la pagina
	if (filesLoaded === totalToLoad) {
		loadConplete();// levantar la pagina de carga
	}
}

/*cuenta todas las scripts de la pagina 
instanciada y va cargando el porcentaje
en la luna*/									//scriptList es la lista de scripts

async function loadRequeriments(afterPage, scriptsList, stylesList) {	//afterPage es el nombre de la pagina que viene(por ejemplo loginpage)
	for (let filename of stylesData.fileNames) {
		filesLoaded++
		styleTag = `
			<link 
				id="${afterPage}-${filename}-style" 
				rel="stylesheet" 
				type="text/css" 
				href="${stylesData.rute}${filename}.css"
			>
		`;
		document.head.innerHTML += await styleTag;// añade la script al div de la pagina
		let styleLink = document.getElementById(`${afterPage}-${filename}-style`);
		styleLink.onload = await toFall(filesLoaded);

	}	
	for (let filename of scriptData.fileNames) {
		filesLoaded++
		scriptTag = `
			<script
				id="${afterPage}-${filename}-script" 
				type="text/javascript" 
				src="${scriptData.rute}${filename}.js"
			>
			</script>
		`;
		mainArea.innerHTML += await scriptTag;// añade la script al div de la pagina
		let script = document.getElementById(`${afterPage}-${filename}-script`);
		script.onload = await toFall(filesLoaded);
		isLoaded();// verificar si esta cargado el documento

	}
}

loadRequeriments(pageToLoad, scriptsList, stylesList);
