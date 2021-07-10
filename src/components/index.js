

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
    	} else {
    		
    		return console.error(
    				`MainLabel object: "${objectReferenceName}" is not valid
    				 valides values: ('.className' or '#idName')`
    			);
    	}
	}

	style(objectReferenceName, ruleCssToChange, ruleValue) {
		const objectReferenced = this.object(objectReferenceName);

		if (objectReferenced) {
			if (ruleCssToChange === 'transform') {
				return objectReferenced.style.transform = ruleValue;
			}
		}
	}
}	

rootLabel = new MainLabel(labelReference);