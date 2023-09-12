import { LightningElement, track } from 'lwc';
import { getBMI } from 'c/jSCodeSharingBetweenComp';   // Here we are importing function from our module that is jSCodeSharingBetweenComp

export default class BmiCalculator extends LightningElement {

 
    weight;
    height;

    @track bmi;   

    onWeightChangeHandler(evt){
        this.weight = parseFloat(evt.target.value);
    }

    onHeightChangeHandler(evt){
        this.height = parseFloat(evt.target.value);
    }

    calculateBmiHandler(){
        this.bmi = getBMI(this.weight, this.height);
    }

    get bmiValue(){
        return `Your BMI is ${this.bmi}`;
    }

    
}