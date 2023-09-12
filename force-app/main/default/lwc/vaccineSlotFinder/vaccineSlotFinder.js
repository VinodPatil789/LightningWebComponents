import { LightningElement } from 'lwc';

export default class VaccineSlotFinder extends LightningElement {
    dates = [];
    centers = [];

   /*  connectedCallback() {     
        this.fetchVaccineSlots();      //Note: fot testing purpose we wrote connected callback method but we want the fetchVaccineSlots method to be called on the basis of pincode change
        
    } */

    pincodeChangeHandler(evt){
        const pinCode = evt.target.value;
        const isEnterKey = evt.keyCode === 13;

        if(pinCode.length === 6 && isEnterKey){
            const today = new Date();
            const formattedDate = `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`;   // we are using template litteral to get value dynamic and in getMonth function adding 1 because bydefault months start from 0 index that is for jan it takes 0 and for feb 1 and same goes on
            console.log('Formatted Date is '+ formattedDate);
            const endPoint = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pinCode}&date=${formattedDate}`;    // we are using template litteral to make it dynamic , we can use string also see below

            //const endPoint = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode="+pinCode+"&date="+formattedDate;     //this is also valid
             
            this.fetchVaccineSlots(endPoint);      

        }

    }

    //cowin api's are open api so we donot need to post any herader information and optional data (like http method)
    // fetch method is assynchronous method so use await keyword and method should be async annotated

    async fetchVaccineSlots(endPointUrl) {
        // const vaccineSlotsRes = await fetch("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=425405&date=03-07-2022");     // here we are hardcoding the endpoint url below we are doing dynamic

        const vaccineSlotsRes = await fetch(endPointUrl);

        //print the response since we know response will be json format(will contain all metadata about pages that is header and security info but we are intersted in json data )
        const slotData = await vaccineSlotsRes.json();  //It will only fetch the json data from the response and make sure add the await keyword as it is asynchronous resp

        // console.log(slotData);

        this.buildColumsAndRows(slotData.centers);

    }

    //Costruct data for data table
    buildColumsAndRows(data) {
        //we need to data as per the coWin portal, they have dates in columns format and first column is of center(hospital) name
        //Rows will consist the data for hostpital

        //build columns/dates
        const dates = new Map();
        dates.set("name", {
            label: "Center Name",
            fieldName: "name",
            type: "text",
            wrapText: true,

        });

        //build rows/centers
        const centers = new Map();

        for (const center of data) {
            !centers.has(center.center_id) && centers.set(center.center_id, { name: center.name });

            for (const session of center.sessions) {
                //destructuring syntax(ECMA -6 )
                const { date, min_age_limit, available_capacity } = session;
                //add date as column in dates map
                dates.set(date, {
                                    label: date,
                                    fieldName: date,
                                    type: "text",
                                    wrapText: true,
                                    cellAttributes: {
                                        class: { fieldName: "className" },
                                }
                });

                //add column value for row
                centers.get(center.center_id)[date] = `Available capacity : ${available_capacity} 
                Min Age: ${min_age_limit}`;

                centers.get(center.center_id).className = available_capacity > 0 ? "slds-text-color_success" : "slds-text-color_error";
            }
        }

        this.dates = Array.from(dates.values());
        this.centers = Array.from(centers.values());
        console.log("centers are : " + this.centers);
    }

    get hideMessage() {
        console.log('centers available are : ' + this.centers.length);
        return this.centers.length > 0;
    }
}