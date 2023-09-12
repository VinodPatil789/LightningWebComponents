import { LightningElement, track } from 'lwc';
//It is always good to give hard reference to your field so saleforce will aware about the reference and will not allow to make any changes to the fields in saleforce
import NAME_FIELD from '@salesforce/schema/Account.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';

/* Note: we are importing the fields from schema that means we are giving the hard core reference to the fields
so Whenever any user will try to delete any of the field listed above, it will throw error that field are referred in component (by showing component name). 
for delete first remove the refernce from component then you can delete...some kind of message user will get*/


export default class AccountManageRecordFormLds extends LightningElement {
    @track recordId;
    fieldArray =[NAME_FIELD, PHONE_FIELD, INDUSTRY_FIELD];

    onsuccessHandler(event){
        console.log('Event', event);
        this.recordId = event.detail.id;
    }
}