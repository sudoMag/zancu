function importStyleSheet(filename, idName){

	let styleLink = `<link 
						id='${ idName }'
						rel="stylesheet"
						type="text/css" 
						href='/static/css/${ filename }'>`;

	$('head').append(styleLink);
	return true;
}

var id = sessionStorage.getItem('sessionID');

function isSessionId(id) {
	let usernameText = document.getElementById('username-text');
	if (id && !usernameText){
		rute = "/username/" + id;
		fetch(rute)
			.then(async response => {
				const user = await response.json();
				const content = `
						<div id='username-text'>
							${user.username}
						</div>
				`;
				$('#image-container').append(content);
				getAllFolders();
			});
			return true;
	} else {
		return false;
	}
}


var Rutes = [];
var actualRute = "";

function getAllFolders(){
	const ID = sessionStorage.getItem('sessionID');

	rute = "/folder/" + ID;
	fetch(rute)
		.then(async response => {
			const userFolder = await response.json();	
			actualRute = "/";
			Rutes[0] = actualRute;	
			$('#rute-viewer').html(`<div id='rute-text'>${actualRute}</div>`);;
			if(userFolder.files == 'null'){
				$('#folders-container').text("Carpeta Vacia");
			} else {
				$('#folders-container').text("");
				for (let file in userFolder.files){

					fileData = userFolder.files[file];

					const content = `
								<a class='file-card' href="javascript:getFolder('${actualRute}${file}')">
									<div class='type-file-icon ${fileData.type}'>
									</div>
										<div class='filename-text'>
											${file}
										</div>
									</div>
								</a>
					`;
					$('#folders-container').append(content);
				}
			}
			$('#return-folder-button').css('display', 'none');
		});
}


//--------------------------------------------------
//function for get files from a subfolder 
//--------------------------------------------------


function getFolder(folderRute) {
	console.log(`rutes = ${ Rutes.length }`);
	if (!folderRute) {
		console.log("folder rute undefined");
	} else if (folderRute) {
		const ID = sessionStorage.getItem('sessionID');

		rute = `/getfolder/${ID}?folder=${folderRute}`;
		fetch(rute, {
			method: 'POST'
		})
			.then(async response => {
				const userFolder = await response.json();
				actualRute = folderRute;											
				$('#rute-viewer').html(`<div id='rute-text'>${actualRute}</div>`);
				if(userFolder.files == 'null'){
					$('#folders-container').text("Carpeta Vacia");
				} else {
					$('#folders-container').text("");
					for (let file in userFolder.files){

						fileData = userFolder.files[file];

						getFolderFunction = `javascript:getFolder('${actualRute}/${file}')`;
						downloadFileLink = `/getfile/${ID}/${file}?folder=${actualRute}`;


						const content = `
									<a class='file-card' href="${fileData.type == 'file' ? 
																			downloadFileLink :
																			getFolderFunction}" download>
										<div class='type-file-icon ${fileData.type}'>
										</div>
											<div class='filename-text'>
												${file}
											</div>
										</div>
									</a>
						`;
						$('#folders-container').append(content);
					}
					Rutes[Rutes.length - 1] = actualRute;
				}
				$('#return-folder-button').css('display', 'block');
				$('.filecard').click((e) => e.preventDefault());;
			});
	}
}

function downloadFile(folderRute, filename) {
	const ID = sessionStorage.getItem('sessionID');

	rute = `/getfile/${ID}/${filename}?folder=${folderRute}`;
	fetch(rute, {
		method: 'GET'
	})
		.then(async response => {
			let userFile = await response;
			console.log(userFile);
			//location.href = userFile;
		});
}

function previousFolder() {
	console.log(`rutes = ${ Rutes.length }`);
	if (Rutes.length > 2) {
		getFolder(Rutes[Rutes.length - 2] , true);
		Rutes.pop();
	} else {
		getAllFolders();
		Rutes.pop();
	}
}

function showOrHideMenu(
							container,
							trigger,
							displayState,
							backButton=null
						){
	showMenuEvent(container, trigger, displayState);

	function hideMenuEvent(c, t, d, b) {
		$(c).css('display', 'none');
		$('#pop-ups-section').css('display', 'none');
		$(t).off('click');
		$(t).click(() => userConfig());
		//if (!backButton) {
		//	$(t).off('click');
		//} else {
		//	$(b).click(() => {showMenuEvent(c, t);});
		//}
	}

	function showMenuEvent(c, t, d, b) {
		console.log(`c showMenuEvent = ${$(c).attr('id')}`);
		$('#pop-ups-section').css('display', 'flex');
		$(c).css('display', d);
		$(t).off('click');
		$(t).click(() => hideMenuEvent(c, t));
		
		$(c).mouseout(() => {
			$('#pop-ups-section').off('click');
			$('#pop-ups-section').click(() => {
					hideMenuEvent(c, t, d);
				}
			);
		});

		$(c).mouseover(() => {
			$('#pop-ups-section').off('click');
		});
	}

	function hideJustContainer(container) {
		$(container).css('display', 'none');
	}
}

function userConfig() {
	showOrHideMenu('#user-options-container', '#login-button', 'block');
	const user_config = document.getElementById('user_config-script');
	if (!user_config) {
		$('#user-options-window').html("<div id='loading-text'>Loading...</div>");
		getScript('user_config');
	}
}

$('#login-button').click(userConfig);

function getScript(scriptName) {
	script = document.getElementById(scriptName);
	if (!script) {
		let script = `
						<script   
							id='${scriptName}-script'
							type='text/javascript' 
							src='/static/js/${scriptName}.js'>
						</script>
					`;
		$('body').append(script);
	}
}