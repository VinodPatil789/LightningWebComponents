import { LightningElement, wire } from 'lwc';
import {
    subscribe,
    unsubscribe,
    APPLICATION_SCOPE,
    MessageContext,
} from "lightning/messageService";
import dataSelected from "@salesforce/messageChannel/lwc__c";


export default class SubscribeMsgLwc extends LightningElement {
    recordDataVar;

    @wire(MessageContext) wiredContextMsg;

    connectedCallback() {
        this.subscribeToMessageChannel();
    }
    subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.dataSelected,
                dataSelected,
                (message) => this.handleMessage(message),
                { scope: APPLICATION_SCOPE },
            );
        }
    }

    handleMessage(msg) {
        this.recordDataVar = msg.recordName + ' ' + msg.recordData;
        console.log('This is subscriber ' + msg.recordName + ' ' + msg.recordData);
    }


}