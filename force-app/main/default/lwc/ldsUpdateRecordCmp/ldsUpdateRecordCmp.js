import { LightningElement,track,wire } from 'lwc';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { updateRecord } from "lightning/uiRecordApi";
import { refreshApex } from "@salesforce/apex";
import { getRecord } from "lightning/uiRecordApi";
import FIRSTNAME_FIELD from "@salesforce/schema/Contact.FirstName";
import LASTNAME_FIELD from "@salesforce/schema/Contact.LastName";
import ID_FIELD from "@salesforce/schema/Contact.Id";

export default class LdsUpdateRecordCmp extends LightningElement {disabled = false;
    @track error;
  
    @wire(getRecord, {
        recordId: "0035j00000TgT6yAAF",
        fields: [FIRSTNAME_FIELD,LASTNAME_FIELD]
      })
      contactRec;
    
  
    handleChange(event) {
      // Display field-level errors and disable button if a name field is empty.
      if (!event.target.value) {
        event.target.reportValidity();
        this.disabled = true;
      } else {
        this.disabled = false;
      }
    }
  
    updateContact() {
        console.log('contact data '+JSON.stringify(this.contactRec.data));
        // Create the recordInput object
        const fields = {};
        fields[ID_FIELD.fieldApiName] = this.contactRec.data.id;
        fields[FIRSTNAME_FIELD.fieldApiName] = this.template.querySelector(
          "[data-field='FirstName']",
        ).value;
        fields[LASTNAME_FIELD.fieldApiName] =
          this.template.querySelector("[data-field='LastName']").value;
  
        const recordInput = { fields };
  
        updateRecord(recordInput)
          .then(() => {
            this.dispatchEvent(
              new ShowToastEvent({
                title: "Success",
                message: "Contact updated",
                variant: "success",
              }),
            );
            // Display fresh data in the form
            return refreshApex(this.contact);
          })
          .catch((error) => {
            this.dispatchEvent(
              new ShowToastEvent({
                title: "Error creating record",
                message: error.body.message,
                variant: "error",
              }),
            );
          });

    }
  }