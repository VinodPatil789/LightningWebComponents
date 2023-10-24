import { LightningElement,wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import dataSelected from '@salesforce/messageChannel/lwc__c';

export default class PublisherMsgLwc extends LightningElement {
    @wire(MessageContext) wiredMsgContext;

    publishHandler(){
        publish(this.wiredMsgContext, dataSelected, {recordName : 'This is publish record name', recordData : 'This is publish record data'});
    }
   
}