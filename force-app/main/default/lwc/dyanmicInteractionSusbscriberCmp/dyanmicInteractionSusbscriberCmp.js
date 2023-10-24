import { LightningElement } from 'lwc';

export default class DyanmicInteractionSusbscriberCmp extends LightningElement {
    clickHandler(){
        const inpVal = this.template.querySelector('lightning-input').value;

        const myCustomEvent = new CustomEvent('myDynamicInteractionEvent', {detail : {inputData: inpVal}});
        this.dispatchEvent(myCustomEvent);
    }
}