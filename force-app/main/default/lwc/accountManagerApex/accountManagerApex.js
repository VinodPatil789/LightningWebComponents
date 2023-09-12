import { LightningElement , wire} from 'lwc';
import  accountsList  from '@salesforce/apex/AccountManagerController.getAccounts';

export default class AccountManagerApex extends LightningElement {
//accountLIst is the wired property and does not take any parmas so we have written this way

    @wire(accountsList)
    acctList; // In this example we are using wire service and it will give the response in acclist.data format so that is why we have used acctList.data in iterator in html

    get responseRecieved(){
        if(this.acctList){          
            return true;
        }
        return false;
    }
}