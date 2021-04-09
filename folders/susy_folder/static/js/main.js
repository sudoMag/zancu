
var darkModeStatus = false;
const skywalkersNave = document.getElementById("skywalkers-nave");
const vadersNave = document.getElementById("vaders-nave");


function darkModeActivate (){

	const modeNameDark = document.getElementById("mode-name-dark");
	const modeNameLight = document.getElementById("mode-name-light");
	const container = document.getElementById("text-mode-container");
	const profileColor = document.getElementById("color-profile");
	const modeAxis = document.getElementById("text-mode-axis");
	const faceImage = document.getElementById("face-image");
	var windowWidth = window.innerWidth;
	var skywalkerAnimation = false;
	var vaderAnimation = false;

	if (darkModeStatus == false) {
		if (!modeNameDark) {
			const cssFileLink = document.createElement("link");
			cssFileLink.href = "/api/darkModeStyles.css";
			cssFileLink.rel = "stylesheet";
			cssFileLink.type = "text/css";
			const modeText = document.createElement("div");
			const vadersNave = document.createElement("div");
			modeText.id = "mode-name-dark";
			modeText.className = "mode-name";
			modeText.style.opacity = "0";
			modeText.innerHTML = "DARK MODE";
			modeText.style.transform = "rotate(-180deg)";
			vadersNave.id = "vaders-nave";
			container.appendChild(modeText);
			document.body.insertBefore(vadersNave, skywalkersNave);

			if (document.getElementById("vaders-nave")) {document.head.appendChild(cssFileLink);}
			darkModeActivate();

		} else if (modeNameDark) {
			const vadersNave = document.getElementById("vaders-nave");
			faceImage.style.backgroundImage = "url('/static/img/darth_vader_head.png')";
			vadersNave.style.transform = "translate(" + (windowWidth - 250 ) + "px)";
			skywalkersNave.style.transform = "translate(" + (-200) + "px)";
			faceImage.style.transform = "rotate(360deg)";
			modeAxis.style.transform = "rotate(-180deg)";
			modeNameDark.style.opacity = "100%";
			modeNameLight.style.opacity = "0";
			profileColor.href = "/api/dark_color_profile.css";

			if (vaderAnimation == false) {
				levitateAnimation(vadersNave);

			}
		}
	
		darkModeStatus = true;

	} else if (darkModeStatus == true){
		if (modeNameDark) {
			vadersNave.style.transform = "translate(" + (windowWidth + 205 ) + "px)";
			skywalkersNave.style.transform = "translate(" + 50 + "px)";
			faceImage.style.backgroundImage = "url('/static/img/skywalker_head.png')";
			faceImage.style.transform = "rotate(0deg)";
			modeAxis.style.transform = "rotate(0deg)";			
			modeNameDark.style.opacity = "0";
			modeNameLight.style.opacity = "100%";
			
		}
		const profileColor = document.getElementById("color-profile");
		profileColor.href = "/static/css/light_color_profile.css";

		if (skywalkerAnimation == false) {
			levitateAnimation(skywalkersNave);
		}

		darkModeStatus = false;

	}
}

var yAxis = true;

function levitateAnimation (naveObject) {
	t = setInterval((naveObject) => {

		if (yAxis == true) {
			naveObject.style.transform = "translate(0px, 10px)";
			yAxis = false;
		} else {
			naveObject.style.transform = "translate(0px, -10px)";
			yAxis = true;
		}
	}, 6000);
}