import { LightningElement, track} from 'lwc';

export default class MeetingRooms extends LightningElement {
    @track selectedMeetingRoom;

    @track meetingRooms=[
        {RoomNumber : 'A-01',RoomCapacity: '12'},
        {RoomNumber : 'B-01',RoomCapacity: '17'},
        {RoomNumber : 'C-01',RoomCapacity: '13'},
        {RoomNumber : 'D-01',RoomCapacity: '10'},
    ];

    tileSelectHandler(event){
        console.log('i am in onTileSelectHandler');
        console.log(event.detail); //it will get all payload which is being passed from child component.
        this.selectedMeetingRoom = event.detail.RoomNumber;  // we are interested to show only the room number on clicking on tile, we can show any details within the payload
    }

    constructor(){
        super();   //It is madatory keyword in constructor
        this.template.addEventListener('tileclick', this.tileSelectHandler.bind(this)); // we are here adding this listerner to the html file on the component initialization but we can add it on the basis of some logic too

        //Note: add bubbles property to the child detail json to allow this event to bubble up here in the parent component
    }
    
}