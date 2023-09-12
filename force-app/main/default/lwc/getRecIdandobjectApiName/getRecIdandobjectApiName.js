import { LightningElement, api } from 'lwc';
/* import NAME_FIELD from '@salesforce/schema/Account.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry'; */

export default class GetRecIdandobjectApiName extends LightningElement {

    @api recordId;
    @api objectApiName;    // as both the property we made as public so lightning component will provide the value to them when we put the component on record page but those values would be null if we put the component on home page

    // fieldArray =[NAME_FIELD, PHONE_FIELD, INDUSTRY_FIELD ];

    onSuccessHandler(event){
        this.recordId = event.detail.id;
    }   
}