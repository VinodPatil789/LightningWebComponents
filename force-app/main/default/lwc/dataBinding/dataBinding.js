import { LightningElement, track } from 'lwc';

export default class DataBinding extends LightningElement {
    @track greetMessage = 'World!';

    greetingChangeHandler(evt) {
        this.greetMessage = evt.target.value;
        console.log(`Greeting message : ${this.greetMessage}`);
    }

}