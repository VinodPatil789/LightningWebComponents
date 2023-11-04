import { LightningElement, api, track } from "lwc";
import { deleteRecord } from "lightning/uiRecordApi";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { NavigationMixin } from "lightning/navigation";

export default class LdsDeleteRecordCmp extends NavigationMixin(LightningElement) {
  // Flexipage provides recordId and objectApiName
  @api recordId;
  @api objectApiName;

  @track error;
  deleteHandler(event) {
    console.log('delelte handler was called');
    this.dispatchEvent(
      new ShowToastEvent({
        title: "Success",
        message: "Record deleted",
        variant: "success",
      }),
    );
    // Navigate to a record home page after
    // the record is deleted, such as to the
    // contact home page
    this[NavigationMixin.Navigate]({
      type: "standard__objectPage",
      attributes: {
        objectApiName: "Contact",
        actionName: "home",
      },
    });
  
    deleteRecord(this.recordId)
      .then(() => {
      })
      .catch((error) => {
        this.dispatchEvent(
          new ShowToastEvent({
            title: "Error deleting record",
            message: error.body.message,
            variant: "error",
          }),
        );
      });
  }
}