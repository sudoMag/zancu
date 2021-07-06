function indexMain() {
	$('#root').append(`
	   <div id="banner-body">
            <div id="banner-text">
                MAS DE TRES <span>DESEOS</span>
            </div>
        </div>
	    <div id="presentation-section">
	    </div>
	    <nav id="navbar">
	           <div id="navbar-background"></div>
    	  	<div id="name-text">
    	  		ZANCU
    	  	</div>
            <div id="cards-container">
                <div id="contact-text" class="navbar-card">
                    Inicio
                </div>
                <div id="contact-text" class="navbar-card">
                    Productos
                </div>
        	  	<div id="contact-text" class="navbar-card">
        	  		Contacto
        	  	</div>
            </div>
	    </nav>
	 `);

    insertSVG();

    function svgResize() {
        $('#smoke-svg-2').css('height', window.innerHeight);
        $('#smoke-svg-2-smartphone').css('height', window.innerHeight);
        $('#smoke-svg-1').css('height', (0.8 * window.innerHeight));
        $('#banner-text').css('margin', `${ [window.innerHeight / 2] - [$('#banner-text').height() / 2]} auto auto 35px`);
    }

    svgResize()
    window.onresize = svgResize;
}

