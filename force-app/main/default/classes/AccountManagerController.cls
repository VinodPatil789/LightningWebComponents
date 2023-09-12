public with sharing class AccountManagerController {

    @AuraEnabled (cacheable= true)
    public static List<Account> getAccounts() {
        return [SELECT Id, Name, Phone, Industry FROM Account limit 5];
    }
}