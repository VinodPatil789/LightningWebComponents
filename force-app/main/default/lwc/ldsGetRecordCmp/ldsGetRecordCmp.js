import { LightningElement, wire } from 'lwc';
import { getRecord, getFieldValue } from "lightning/uiRecordApi";

//using hard reference
import NAME_FIELD from "@salesforce/schema/opportunity.Account.Name";
import OWNER_NAME_FIELD from "@salesforce/schema/opportunity.Account.Owner.Name";
import PHONE_FIELD from "@salesforce/schema/opportunity.Account.Phone";
import INDUSTRY_FIELD from "@salesforce/schema/opportunity.Account.Industry";

export default class LdsGetRecordCmp extends LightningElement {

  @wire(getRecord, {
    recordId: "0065j00001QobRhAAJ",
    fields: ['Opportunity.Name']
  })
  opportunityRec;

  //using getter function

  @wire(getRecord, {
    recordId: "0065j00001QobRhAAJ",
    fields: ['Opportunity.Name', 'Opportunity.Account.Name']
  })
  opportunityRecData;


  get oppourtunityName() {
    if (this.opportunityRecData.data) {
      return this.opportunityRecData.data.fields.Name.value;
    }
    return undefined;

  }

  get oppourtunityAccountName() {
    if (this.opportunityRecData.data) {
      console.log('data' + JSON.stringify(this.opportunityRecData.data.fields.Account));
      return this.opportunityRecData.data.fields.Account.value.fields.Name.value;
    }
    return undefined;

  }


  //using hard reference of field thorugh schema liabrary
  @wire(getRecord, {
    recordId: "0065j00001QobRhAAJ",
    fields: [NAME_FIELD, INDUSTRY_FIELD],
    optionalFields: [PHONE_FIELD, OWNER_NAME_FIELD],
  })
  oppAcctData;

  get name() {
    if (this.opportunityRecData.data) {
      console.log('account data' + JSON.stringify(this.oppAcctData.data));
      return this.oppAcctData.data.fields.Account.value.fields.Name.value;
    }
    return undefined;
  }

  get phone() {
    return this.oppAcctData.data.fields.Account.value.fields.Phone.value;
  }

  get industry() {
    return this.oppAcctData.data.fields.Account.value.fields.Industry.value;
  }

  get owner() {
    return this.oppAcctData.data.fields.Account.value.fields.Owner.value.fields.Name.value;
  }

  //using getFieldValue function

  @wire(getRecord, {
    recordId: "0065j00001QobRhAAJ",
    fields: [NAME_FIELD, INDUSTRY_FIELD],
  })
  oppAcctRecData;

  get acctName() {
    return getFieldValue(this.oppAcctRecData.data, NAME_FIELD);
  }

  get acctIndustry() {
    return getFieldValue(this.oppAcctRecData.data, INDUSTRY_FIELD);
  }

}