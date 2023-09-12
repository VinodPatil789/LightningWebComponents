import { LightningElement, track } from 'lwc';

export default class AccountManagerLdsForms extends LightningElement {
    @track recordId;

    successHandler(event){
        this.recordId = event.detail.id;   // Always remember we use detail properyt ..given in salesforce Docuementaion
        
        console.log('Record id>>'+this.recordId);
    }
}