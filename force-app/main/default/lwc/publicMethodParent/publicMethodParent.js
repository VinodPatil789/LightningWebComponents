import { LightningElement, track } from 'lwc';

export default class PublicMethodParent extends LightningElement {
    @track value;

    checkboxSelectedHandler(){
        const childComponent = this.template.querySelector('c-public-method-child');
        //below we are referring child cmp method and passing some params
        const returnMessage = childComponent.selectedValues(this.value);
    };

    CheckboxSeachHandler(event){
        this.value = event.target.value;
    }
}