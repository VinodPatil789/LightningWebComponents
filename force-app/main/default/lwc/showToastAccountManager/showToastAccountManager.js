import { LightningElement, track} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';

export default class ShowToastAccountManager extends LightningElement {
    @track recordId;
    fieldArray =[NAME_FIELD, PHONE_FIELD, INDUSTRY_FIELD];

    onSuccessHandler(event){
        this.recordId = event.detail.id;
        const toastMessg = new ShowToastEvent({
            title: 'Account Created',
            message: 'Account id :'+ this.recordId,
            variant: 'success'
        });
        this.dispatchEvent(toastMessg);
    }
}