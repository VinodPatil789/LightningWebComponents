import { LightningElement,api, wire } from 'lwc';
import { fireEvent } from 'c/pubSub';  // we use c as namespace here because for every salesforce org custom namespace is 'c', and this file is on over local project folder from where we are refering it. 
                                        //For more understanding, check below import where we are using navigation service from lightning namespace . same we are doing in above
import {CurrentPageReference} from 'lightning/navigation';

export default class SelectedMeetingRoomChild extends LightningElement {
   //Note: fireevent takes 3 paramertes as descibed in pubsub module and that are pageref, eventName, payload

    @api meetingRoom= {RoomNumber :'A-01',RoomCapacity: '12'};
    
    @wire(CurrentPageReference) pagereference // pagereferece it it a variable which will store current pagereference 
              
    tileClickHandle(){
        console.log('i am in child comp');
        const tileclicked = new CustomEvent('tileclick',{detail : this.meetingRoom});
        this.dispatchEvent(tileclicked);
        fireEvent(this.pagereference, 'pubsubTileClick', this.meetingRoom);

        //we can give any name to event where here we are giving pubsubTileclick and payload we can pass anything which we want to pass, here we are pasing meeting room as complete object beacause we are refering selectedMeetingRoom variable in independent component as json object 
    }


}