import { LightningElement, track , wire} from 'lwc';
import {createRecord, getRecord} from 'lightning/uiRecordApi'  // we are importing from UIRecordApi, as we kmnow that LDS is based on UserInterface Api

/* Key Points: create record method takes recordInput as parameter and retrun promise which is asynchronous transaction and we handle it by then and catch keyword in js 
                -Also for more information check the salesforce documentation, How to construct recordInput parameter and How it work in the backend in the full description 
                
                GetRecrod - It is wire property used to get record also get recrodtype ( As we know we use wire property to read the data and wire property is based on the LDS)
                        - All wire properties are reactive in nature so we can directly use it in the HTML (templates)
                */

const fields =['Account.Name', 'Account.Phone', 'Account.Website'];
export default class AccountManagerLDS extends LightningElement {
    @track accountName;
    @track accountPhone;
    @track accountWebsite;
    @track AccountExist = false;
    @track acctRec;

    @track recordId;
    //below we can pass recordId = this.recordId as well but it will not make the property dynmaic means there is changed in record id then it will not fetch record data so we used it in below way.

  //  @wire(getRecord, {recordId : '$recordId', fields: fields})  
  //  Account;   // what we are doing here, we are passing record id and fields which we have to retrieve and store the response in Account variable(We can give any variable name as per our convinience)

  @wire(getRecord, {recordId : '$recordId', fields: fields})  
    Account({data, error}){
        if(data){
            this.AccountExist = true;
            this.acctRec = data;
        }
    } 

    nameChangeHandler(event){
        this.accountName = event.target.value;
    }

    phoneChangeHandler(event){
        this.accountPhone = event.target.value;
    }

    websiteChangeHandler(event){
        this.accountWebsite = event.target.value;
    }

    createAccountHandler(){
        //remeber name, phone, website are the api name of the fields on account, make sure ues the api name for custom object as well
        const fields ={ 'Name': this.accountName, 'Phone': this.accountPhone, 'Website': this.accountWebsite };
        const recordObject ={ apiName : 'Account', fields};

        createRecord(recordObject).then(response =>{
            console.log('Successfully created Account Id >>'+ response.id);
            
            this.recordId = response.id;
            //this.AccountExist = true;   ...this is also correct but we are trying to add using wire function
            
        }).catch(error =>{
            console.log('Reason: '+ error.body.message)
        });
    }
 
    get retAccountName(){
        if(this.Account.data){
            return this.Account.data.fields.Name.value;  // This is the way by which we can retrieve the field from wire properties response variable, we can use directly this way in template (html) file as well
        }
        return undefined;
    }

    get retAccountPhone(){
        if(this.Account.data){
            return this.Account.data.fields.Phone.value;
        }
        return undefined;
    }

    get retAccountWebsite(){
        if(this.Account.data){
            return this.Account.data.fields.Website.value;
        }
        return undefined;
    }

}