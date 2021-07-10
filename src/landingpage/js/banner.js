
function svgResize() {
        $('#smoke-svg-2').css('height', window.innerHeight);
        $('#smoke-svg-2-smartphone').css('height', (0.9 * window.innerHeight));
        $('#smoke-svg-1-smartphone').css('height', (0.5 * window.innerHeight));
        $('#smoke-svg-1').css('height', (0.8 * window.innerHeight));
        $('#banner-text').css('margin', `${ [window.innerHeight / 2] - [$('#banner-text').height() / 2]} auto auto 35px`);
    }
    
    window.onresize = svgResize;