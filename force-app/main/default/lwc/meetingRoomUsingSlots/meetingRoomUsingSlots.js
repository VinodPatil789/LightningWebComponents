import { LightningElement, api} from 'lwc';

export default class MeetingRoom extends LightningElement {

    //Below proprty we are passing from parent component with the help of slot
    // @api meetingRoom;


    @api showRoomInfo = false ;  // This is public boolean property , we set value as false in child and as we refer this in it parent component then it value automatically set as true
}