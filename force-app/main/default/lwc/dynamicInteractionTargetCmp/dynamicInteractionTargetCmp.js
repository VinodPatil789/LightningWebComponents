import { LightningElement, api } from 'lwc';

export default class DynamicInteractionTargetCmp extends LightningElement {
    finalInpData;

    @api get inputDataFromSourceCmp(){
        return this.finalInpData; 
    }

    set inputDataFromSourceCmp(val){
        this.finalInpData = val;
    }
}