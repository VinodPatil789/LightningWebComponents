<<<<<<< HEAD ******Assumptions ******************

1.You are using windows system 2.You installed Salesforce CLI too and have set the PROXIES 3.You use visual studio code IDE for development and installed below code extenstions. a. Salesforce Extensions pack b. Lightning web components c. ESLint

***************** One-Time insallations to run Javascript unit tests *******

Install Nodejs from the URL below : only use long term support (LTG) https://nodejs.org/en/

Run these Commands from tool/root directory of your project.

 npm install @salesforce/lwc-jest --save-dev
 npm install eslint @salesforce/eslint-config-lwc --save-dev
******** Check Out ********

GitHub setup -From browser, login to.... github.com/ -Make sure follow below step if you want to keep security in place -nav to Settings->Developer Settings -> Personal Access Tokens -Click "Generate a new Token" (assuming you don't already have token) -Should a token is already defined but lost or expired.. --Click on tokne link (in the list of tokens) and then click "generate new token". -Cut/Paste token to safe place (i.e. Keygen, Vault)

$ git clone https://github.com/VinodPatil789/LightningWebComponents.git    //for example purpose

userName : Github userName
password : Github password 


branching.....
-Create branch from command line....
$ git checkout -b CLO-0001  //It checkouts and crate new branch
$ git add.
$ git commit
$ git push origin CLO-0001 //Push branch against master/orgin

-Create Pull request
    -With Browser, login to github at https://github.com
    -Search for project
    -Click on "Branches"
    -Click on you branch created above with git commands.
    -Click on button to create pull request.

-Approve Pull request
    -With Browser, login to github at https://github.com
    -Search for project
    -Click on Pull requests.
    -Open the pull requests.
    -Review the code changes.
    -Approve the changes.
    
-Merge Pull request
    -With Browser, login to github at https://github.com
    -Search for project
    -Click on Pull requests.
    -Open the pull requests.
    -Click Merge button to merge.
****** IMPORTANT ********

Run all the commands from project's root directory.
Make sure you have the hidden files ".forceignore" and ".eslintrc.json" under your project's root directory
Make sure that the .forceignore file must contain the below lines: **/jsconfig.json **/.eslintrc.json /test/
****** NOTES: Lightning Web Components ********

To identify stylistic errors and erroneous construct in your LWC-Javascript code npx eslint /lwc//*.js

To run LWC Javascript unit tests with code lightning and code coverage npm run test

****** Setup instructions to get you started for salesforce app development ********

1. Authenticate with your dev hub org with an alias Here DevHubOrg is provided as an alias, and its value can be configured as needed.

    sfdx force:auth:web:login -d -a DevHubOrg 

2. Create a Scratch org valid for 30 days and provide it with an alias (LWC_Dev)

    sfdx force:org:create -s -f config/project-scratch-def.json -a LWC_Dev -d 30

3. Set defatult userName. Replace xxx with the username shown in the output of the pevious command

    sfdx force:config:set defaultusername=xxx`

4. List all the salesforce (Devhub and Scratch) orgs you are connected to:

    sfdx force:org:list --all

5. Push the app to your scratch org:

    sfdx force:source:push

6. Optional - Want to assign any default permission set

    sfdx force:user:permset:assign -n <permissionSet Name>

7. Optinal - Load a sample data(if exist- run from your project room directory).

    ./scripts/setupConfigurationData.sh -f data -p *****

8. Open the scratch org:

    sfdx force:org:open

9. Display org info:

    sf org display

10. Create password for scratch org

    sf org generate password --target-org <username-or-alias>

***** Enjoy Your Coding *****