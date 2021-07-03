function landingPageIndex() {
	window.addEventListener('scroll', (event) => {
		console.log(window.scrollY);
	let opacityPercentage = window.scrollY / window.innerHeight;
	console.log(opacityPercentage);
	$('#navbar-background').css('opacity', opacityPercentage);
	});

	$('#banner-background').css({
		'width': window.innerWidth,
		'height': window.innerHeight
	});
}