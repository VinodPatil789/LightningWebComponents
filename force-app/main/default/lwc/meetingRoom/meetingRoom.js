import { LightningElement, api} from 'lwc';

export default class MeetingRoom extends LightningElement {

    @api meetingRoom;//This will be object whose value is passed from parent component 
                    // Value it will hold like {roomName:'A-01', roomCapacity:'23'}
                    //It is read only property, we can not assign the property from component where it is declare(from child component) 
                    //@api decorator means this public property is going to accept the value from other component.

    //When handle declaratively or through child markup               
    tileClickHandle(){
        console.log('i am in child comp');
        const tileclicked = new CustomEvent('tileclick',{detail : this.meetingRoom});
        //remember the custom event is costructor which pass event name and payload (event name should be self explanatory[easy to understand] and when we call this event in parent component into the child markup then prepend the "on" keyword before the event for ex. in our case it should be 'ontileclick')
        this.dispatchEvent(tileclicked);
    }

    //When handle programatically 
    tileClickHandle(){
        console.log('i am in child comp');
        const tileclicked = new CustomEvent('tileclick',{detail : this.meetingRoom, bubbles: true});
        this.dispatchEvent(tileclicked);
    }

   /*  Note : we are passing custom event tileclick with some payload to parent component 
    There are 2 ways parent component handle this event 
        1)Through child markup itself (declaratively)
        2)Through Programatically

        //Note: When we follow 2nd approach add bubbles property to the child detail json to allow this event to bubble in the parent component
    */

}