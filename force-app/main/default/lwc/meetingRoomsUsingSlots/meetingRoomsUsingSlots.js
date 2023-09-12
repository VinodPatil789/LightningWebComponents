import { LightningElement, track} from 'lwc';

export default class MeetingRooms extends LightningElement {
    @track selectedMeetingRoom;

    @track meetingRooms=[
        {RoomNumber : 'A-01',RoomCapacity: '12'},
        {RoomNumber : 'B-01',RoomCapacity: '17'},
        {RoomNumber : 'C-01',RoomCapacity: '13'},
        {RoomNumber : 'D-01',RoomCapacity: '10'},
    ];

/*     onTileSelectHandler(event){
        console.log('i am in onTileSelectHandler');
        this.selectedMeetingRoom = event.detail.RoomNumber;
    }

    constructor(){
        super();
        this.template.addEventListener('tileclick', this.onTileSelectHandler.bind(this));
    } */
    
}