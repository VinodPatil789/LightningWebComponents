import { LightningElement, track, wire } from 'lwc';
import { registerListener, unregisterListener } from 'c/pubSub'; 
import {CurrentPageReference} from 'lightning/navigation';

export default class SelectedMeetingRoomIndependentcmp extends LightningElement {

    @track selectedMeetingRoom ={};

    @wire(CurrentPageReference) pageRef;  // always remember we have to use pageRef var everytime , see pubSub module for more detail.  if we use other var it will throw error

    //register event method subscribe event (handle event fire from other component) so we have inserted in the connected call back when DOM is rendering

    connectedCallback(){
        this.onMeetingRoomSelectHandler;

        registerListener('pubsubTileClick', this.onMeetingRoomSelectHandler, this);

         //Note: registerevent method takes 3 params that are eventanme, callback and thisArg (means current object)
         // In the callback method we are passing below function to be executed when registerevent is called and it should assign the value
    }

    onMeetingRoomSelectHandler(payload){
        console.log('this is payload'+ payload);
        this.selectedMeetingRoom = payload;  // here assigning value to the variable in this component and accepting payload (we can give any name to vairable) from pbulish event component
    }


    //Note: unregister event unsubscribe the event so we have called it in disconnected callback method, as we know disconnected call back is only method which called in the last when use navigate from one tab to other
    disconnectedCallback(){
        unregisterListener(this);

        //Note: unregisterevetn takes only one parameter current object from where we unsubscibe so we passes this here 
    }



}