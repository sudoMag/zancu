
const mainArea = document.querySelector('#root');

var filesLoaded = 0;
const syringeMovil = document.getElementById('syringe-movil');
/*crea el porcentaje de carga de la barra*/

async function toFall(event ,syringeMovil, fractionPercentage=++filesLoaded) { //por ejemplo 50 de 100.
	const totalToLoad = document.getElementsByClassName('landingpage-node').length;
	let percentage = fractionPercentage / totalToLoad;
	syringeMovil.style.transform = `translate(0px,${9.26042 - (percentage * 16.52084)}px)`;
//	console.log(fractionPercentage, totalToLoad);

	
	if (fractionPercentage === totalToLoad) {
		await indexMain();
		await landingPageIndex();
		await loadConplete();
	}
}

/*levanta la pantalla de carga
y a los 2s borra su condigo html y css
-- SE LLAMA AL CARGAR LOS ARCHiVOS DE LA PAGINA INSTANCIADA --*/

function loadConplete() {
	const loadingPage = document.getElementById('loading-page');
	const loadingPageStyle = document.getElementById('loading-page-style');
	 loadingPage.style.transform = `translate(0, ${-window.innerHeight}px)`;
	 setTimeout(() => {
	 	loadingPage.remove();
	 	loadingPageStyle.remove();
	 	document.body.style.overflowY = 'scroll';
	 }, 3000);
	
}