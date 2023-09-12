import { LightningElement , track} from 'lwc';
import  accountsList  from '@salesforce/apex/AccountManagerImperativeController.getAccounts';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class AccountManagerApexImperative extends LightningElement {

    @track noOfRecs;
    @track acctList;

    get responseRecieved(){
        if(this.acctList){          
            return true;
        }
        return false;
    }

    noOfAcctsChangeHandler(evt){
        this.noOfRecs = evt.target.value;   
    }

    getAcctHandler(){
         // Always pass the value in Json format. Remember this response will be handled by then and catch

        accountsList({numOfRecords : this.noOfRecs}).then(resp=>{
            this.acctList = resp;
            const toastmessg = new ShowToastEvent({
                title : 'Get Accounts successfully!',
                message: this.noOfRecs + ' Accounts fetched from server',
                variant: 'success'
            }); 
            this.dispatchEvent(toastmessg);
        }).catch(error=>{
            console.log('Error in getting the Accounts '+ error.body.message);
            const toastmessg = new ShowToastEvent({
                title : 'Unable to get Recods!',
                message: error.body.message,
                variant: 'error'
            }); 
            this.dispatchEvent(toastmessg);
        })
    }
}