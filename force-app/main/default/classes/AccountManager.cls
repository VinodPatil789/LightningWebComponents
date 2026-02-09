@RestResource(urlMapping ='/v1/createAccount/*')
Global with sharing class AccountManager{
	@httpPost
    global static account postAccount(String accName, String Industry, string Description){
        account acctRec = new account(Name = accName, Industry = Industry, Description = Description);
        try{
            insert acctRec;
        }
        catch(exception e){
            system.debug('error '+e.getMessage());
        }
		return acctRec;
    }
    
    /* testing 
     post url :  /services/apexrest/v1/createAccount

        reqeust body : {
          "accName": "Acme Corp",
          "Industry": "Manufacturing",
          "Description": "Sample account description"
        }

	

	xml reuest 

	<request>   
 <accName>Acme Corp 123</accName>
    <Industry>Manufacturing</Industry>
    <Description>Sample account description</Description>
</request>



How to use wrapper class in apex rest
***Use case***
	The requirement is to send 100  fields from the consume(third party). creating 100 parameters inside apex method is not a best practice

@RestResource(urlMapping ='/v1/Account/*)
Global with sharing class AccountManager{
	@httpPost
    global static accountInformation postAccount(accountInformation acctInfo){
        account acctRec = acctInfo.acct;
		inser acctRec;
		contact con = acct.cont;
		con.accountId = acctRec.Id;
		insert con;
		return acctInfo;
    }

    global class accountInformation{
		global account acct {set; get;}
        global contact cont {set; get;}
    }
}

//for testing open workbench.developersforce.com
  |-->Explorer
		|--> Utilites >> rest explorer (select method as post and create json for record insert and change header as application/xml)

<request>
	<accountInformation>
		<acct>
            <Name>Test account</accName>
            <Industry>Banking</Industry>
            <Description>XML record inseting testing was successful</Description>
		</acct>
		<cont>
			<FirstName>Test</FirstName>
			<LastName>Contact</LastName>
			<Phone>23432452</Phone>
		</cont>
	</accountInformation>
</request>


json body

{
  "acct": {
    "Name": "Acme Corp",
    "Phone": "1234567890",
    "Industry": "Manufacturing"
  },
  "cont": {
    "FirstName": "John",
    "LastName": "Doe",
    "Email": "john.doe@example.com",
    "Phone": "9876543210"
  }
}


     */

}