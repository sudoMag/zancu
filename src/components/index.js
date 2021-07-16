
const labelReference = document.querySelector('#root');


class MainLabel {
    constructor(labelReference) {
    	this.body = labelReference;
    }

    insertContentInside(content) {
        this.body.innerHTML += content;
    }
}


class Thing {
	constructor(objectReferenceName) {
    	this.objectReferenced = document.querySelector(objectReferenceName);    	
	}

	css(ruleCssToChange, ruleValue) {
		if (ruleCssToChange === 'transform') {
			return this.objectReferenced.style.transform = ruleValue;
		} 

		if (ruleCssToChange === 'overflow-y') {
			return this.objectReferenced.style.overflowY = ruleValue;
		}
		
	}

	on(triggerAction, functionToActivate) {
		const firstCaracter = 0;
		return this.objectReferenced
		.addEventListener(`${triggerAction}`, () => {console.log('click');});	
	}

}


class BodyReference extends Thing {
	constructor(){
		super();
		this.objectReferenced = document.body;
	}
}


const rootLabel = new MainLabel(labelReference);
const bodyLabel = new BodyReference();