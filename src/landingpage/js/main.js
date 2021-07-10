async function indexMain () {

	rootLabel.insertContentInside(`
	    <banner-section id="banner-body">
            <banner-text id="banner-text">
                MAS DE TRES <span>DESEOS</span>
            </banner-text>
        </banner-section>
	    <div id="presentation-section">
	    </div>
	    <nav id="navbar">
	        <navbar-fx id="navbar-background"></navbar-fx>
    	  	<menu-button id="menu-button"></menu-button>
            <title-text id="name-text">
    	  		ZANCU
    	  	</title-text>
            <cards-container id="cards-container">
                <card-text id="contact-text" class="navbar-card">
                    Inicio
                </card-text>
                <card-text id="contact-text" class="navbar-card">
                    Productos
                </card-text>
        	  	<card-text id="contact-text" class="navbar-card">
        	  		Contacto
        	  	</card-text>
            </cards-container>
	    </nav>
        <menu-moviles id="menu-moviles">
            <menu-content id="menu-content">
                <card-text id="contact-text" class="menu-card">
                    Inicio
                </card-text>
                <card-text id="contact-text" class="menu-card">
                    Productos
                </card-text>
                <card-text id="contact-text" class="menu-card">
                    Contacto
                </card-text>
            <menu-content>
        </menu-moviles>
	 `);

    await insertSVG();

    class MenuMoviles extends HTMLElement {
        constructor() {
            super();
            var k = false;

            $('#menu-moviles').css('transform',`translate(-100%)`);

            function menuButtonClick () {
                if (k == true) {
                    $('body').css('overflow-y', 'scroll');
                    $('#menu-button').css('transform', 'rotate(0deg)');
                    $('#menu-moviles').css('transform', `translate(-100%)`);
                    k = false;
                } else if (k == false) {
                    $('body').css('overflow-y', 'hidden');
                    $('#menu-button').css('transform', 'rotate(180deg)');
                    $('#menu-moviles').css('transform', `translate(0)`);
                    k = true;
                }
            }

            $('#menu-button').on('click', menuButtonClick);
        }
    }
    window.customElements.define('menu-moviles', MenuMoviles);
}

