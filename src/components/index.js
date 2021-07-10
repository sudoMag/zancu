

const labelReference = document.querySelector('#root');


class MainLabel {
    constructor(labelReference) {
    	this.body = labelReference;
    }

    insertContentInside(content) {

        this.body.innerHTML += content;
    }

    object(objectReferenceName) {

    	if (objectReferenceName[0] === '.' || objectReferenceName[0] === '#') {

    		return this.body.querySelector(objectReferenceName);
    	}
	}
}	

rootLabel = new MainLabel(labelReference);