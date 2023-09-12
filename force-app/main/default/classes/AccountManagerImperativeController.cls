public with sharing class AccountManagerImperativeController {
    
    @AuraEnabled
    public static List<Account> getAccounts(Integer numOfRecords) {
        return [SELECT Id, Name, Phone, Industry FROM Account ];
    }
}