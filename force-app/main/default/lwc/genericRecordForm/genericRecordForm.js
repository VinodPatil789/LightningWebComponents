import { LightningElement, api } from 'lwc';

export default class GetRecIdandobjectApiName extends LightningElement {
    @api recordId;
    @api objectApiName;


    onSuccessHandler(event){
        this.recordId = event.detail.id;
    }   
}