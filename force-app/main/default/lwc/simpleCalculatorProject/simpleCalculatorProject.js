import { LightningElement , track} from 'lwc';

export default class SimpleCalculatorProject extends LightningElement {

    @track currentResult;
    @track previousResult = [];
    @track showPreviousResults = false;

    firstNumber;
    secondNumber;

    numberChangeHandler(evt){
        const inputBoxName = evt.target.name;
        if(inputBoxName == 'FirstNumber'){
            this.firstNumber = evt.target.value;
        }else{
            this.secondNumber = evt.target.value;
        }
    }

    addHandler(){
        const firstNum = parseInt(this.firstNumber);
        const secondNum = parseInt(this.secondNumber);
        this.currentResult = 'Result of '+ firstNum +' and '+ secondNum + ' is '+ (firstNum+secondNum); 
        this.previousResult.push(this.currentResult);

       /*  we can write as per below 
        this.currentResult = `Result of ${firstNum} and ${secondNum} is ${firstNum+secondNum}`; */
    }
    subtractHandler(){
        const firstNum = parseInt(this.firstNumber);
        const secondNum = parseInt(this.secondNumber);
        this.currentResult = 'Result of '+ firstNum +' and '+ secondNum + ' is '+ (firstNum-secondNum); 
        this.previousResult.push(this.currentResult);


       /*  we can write as per below 
        this.currentResult = `Result of ${firstNum} and ${secondNum} is ${firstNum+secondNum}`; */
    }
    multiplyHandler(){
        const firstNum = parseInt(this.firstNumber);
        const secondNum = parseInt(this.secondNumber);
        this.currentResult = 'Result of '+ firstNum +' and '+ secondNum + ' is '+ (firstNum*secondNum); 
        this.previousResult.push(this.currentResult);

       /*  we can write as per below 
        this.currentResult = `Result of ${firstNum} and ${secondNum} is ${firstNum+secondNum}`; */
    }
    divisonHandler(){
        const firstNum = parseInt(this.firstNumber);
        const secondNum = parseInt(this.secondNumber);
        this.currentResult = 'Result of '+ firstNum +' and '+ secondNum + ' is '+ (firstNum/secondNum); 
        this.previousResult.push(this.currentResult);


       /*  we can write as per below 
        this.currentResult = `Result of ${firstNum} and ${secondNum} is ${firstNum+secondNum}`; */
    }

    showPreviousResultToggle(evt){
        this.showPreviousResults = evt.target.checked;
    }
}