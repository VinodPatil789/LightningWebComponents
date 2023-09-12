import { LightningElement, api , track} from 'lwc';

export default class CheckboxGroupBasic extends LightningElement {
    @track value = ['red'];

    options=[
        { label: 'Red checkbox', value: 'red' },
        { label: 'Blue checkbox', value: 'blue' },
        { label: 'Black checkbox', value: 'black' },
    ]; 

    @api 
    selectedValues(checkboxValue) {
        const  selectedCheckbox = this.options.find(checkbox =>{
            //Here we are using find methdod which return value of the first element which pass the test, and test condition is below which is checking input value with arrays value
            return checkboxValue === checkbox.value;
        })
        if(selectedCheckbox){
            // this.value = selectedCheckbox.value;      //Line 19 and 20 both will work 
            this.value = checkboxValue;
            return 'Successfully Checked';
        }
        return 'No match found';
    }

}