
function session(type) { //args: 'login' or 'signin'.
	var type = type;

	function setSessionMessage(text) {
		alert(text);
	}

	async function isUser(response) {
		if (type == 'login') {
			const user = await response.json();
			//console.log(JSON.stringify(user, null, 1));
			//console.log('user.dates: ' + user['dates']);
			if (user['dates']=="incorrect"){
				setSessionMessage("Usuario o Cotraseña incorrectos");
			} else if (user['dates'] == "correct"){
				sessionStorage.setItem("sessionID", user.sessionID);
			} else {
				console.log("ERROR: entrada invalida");
			}
		} else if (type == 'signin') {
			const user = await response.json();
			if (user['dates']=="alreadyExist") {
				setSessionMessage("Usuario ya Existente");
			} else if (user['dates'] == "ok"){
				sessionStorage.setItem("sessionID", user.sessionID);
			}
		}
	}

	function send(username, password){
		console.log(type);
		fetch(type=='signin' ? '/signin' : '/login', {
			method: 'POST',
			headers: {
        	"Content-Type": "application/json",
	        },
	        body: JSON.stringify({
	          username,
	          password
	        })
	    })
		.then(response => isUser(response));
	}

	function createSessionForms(type) {
		let cssReady = importStyleSheet("session.css", "session-form-style");
		if (cssReady){
			let content = `
							<div id='sessionPopUpsContainer'>
								<div id='back-button'></div>
								<form id='session-form'>
									<div id='form-div-content'>
										<div class="input-container">
											<input 
												type='text' 
												id='username-session-input'
												class='form-input'
												name='username'
												placeholder='Username'>
										</div>
										<div class="input-container">
											<input 
												type='password' 
												id='password-session-input'
												class='form-input'
												name='password'
												placeholder='Password'>
										</div>
										<div class="button-container">
											<button 
												id='session-send-button'
												type='submit'>
												Entrar
											</button>
										</div>
									</form>
								</div>
							</div>
						`;
			$('#pop-ups-section').append(content);
			$('#username-session-input').on('change', e => {
				e.preventDefault();
			});
			$('#session-form').on('submit', e => {
				e.preventDefault();
				password = $('#password-session-input').val();
				username = $('#username-session-input').val();
				send(username, password);
				$('#username-session-input').val('');
				$('#password-session-input').val('');
			});
		}
	}
	sessionForm = document.getElementById('session-form');
	if (!sessionForm) {
		createSessionForms(type);
	}
	showOrHideMenu('#sessionPopUpsContainer', '#back-button', 'flex');
}

