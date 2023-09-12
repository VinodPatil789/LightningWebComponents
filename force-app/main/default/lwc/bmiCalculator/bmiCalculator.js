import { LightningElement, track } from 'lwc';

export default class BmiCalculator extends LightningElement {

 /*    Remeber all Properties are reactive in nature 
    *When to use track decorator ?
    For nonprimitive datatype we will have to use track decorator
    Non primitive datatype propety is not going to work as reactive without the use of track decorator */

    weight;
    height;

    @track bmi;  // if we remove track property still it will work as reactive as said above

    onWeightChangeHandler(evt){
        this.weight = parseFloat(evt.target.value);
    }

    onHeightChangeHandler(evt){
        this.height = parseFloat(evt.target.value);
    }

    calculateBmiHandler(){
        try{
            this.bmi = this.weight/(this.height*this.height);
        }catch(error){
            this.bmi = undefined;
        }
    }

    get bmiValue(){
        return `Your BMI is ${this.bmi}`;
    }
        

/* 
        bmi = {
            weight: 0,
            height: 0,
            result: 0
        }
    
        //If we use refere above value it wont show any result so in this nonprimitive data type we have to add track decorator

        onWeightChangeHandler(evt){
            this.bmi.weight = parseFloat(evt.target.value);
        }
    
        onHeightChangeHandler(evt){
            this.bmi.height = parseFloat(evt.target.value);
        }
    
        calculateBmiHandler(){
            try{
                this.bmi.result = this.weight/(this.height*this.height);
            }catch(error){
                this.bmi.result = undefined;
            }
            
        } */
    
}