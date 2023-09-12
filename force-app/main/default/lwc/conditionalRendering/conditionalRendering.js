import { LightningElement, track } from 'lwc';

export default class ConditionalRendering extends LightningElement {

    @track displayDiv = false;

    showDivHandler(evt){
        this.displayDiv = evt.target.checked;
        // note: Checkbox has only two values so we used checked instead of value
    }
}