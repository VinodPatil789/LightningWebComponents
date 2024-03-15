#!groovy

import groovy.json.JsonSlurperClassic

node {
	try{
		def SF_USERNAME
		def BUILD_NUMBER="${env.BUILD_NUMBER}"
		def RUN_ARTIFACT_DIR 
		def HUB_ORG_USERNAME = "${params.HUB_ORG_USERNAME}"
		def SFDC_HOST = "${params.SFDC_HOST}"
		def JWT_KEY_CRED_ID ="sfserverkey"
		def CONNECTED_APP_CONSUMER_KEY="${params.CONNECTED_APP_CONSUMER_KEY}"

		



		// -------------------------------------------------------------------------
		// Check out code from source control.
		// -------------------------------------------------------------------------

		stage('checkout source') {
			checkout scm
		}


		// -------------------------------------------------------------------------
		// Run all the enclosed stages with access to the Salesforce
		// JWT key credentials.
		// -------------------------------------------------------------------------
		
			
			withCredentials([file(credentialsId: JWT_KEY_CRED_ID, variable: 'server_key_file')]) {
		
			// -------------------------------------------------------------------------
				// Authorize the Dev Hub org with JWT key and create scratch org
				// -------------------------------------------------------------------------

				stage('Authorize DevHub And Create Scratch Org') {
					rc = sh returnStatus:true , script : "sf org login jwt --instance-url ${SFDC_HOST} --client-id ${CONNECTED_APP_CONSUMER_KEY} --username ${HUB_ORG_USERNAME} --jwt-key-file ${server_key_file} --setdefaultdevhubusername"
					if (rc != 0) {
						error 'Dev hub org authorization failed.'
					}
				

					rmsg = sh returnStdout: true , script : "sfdx force:org:create --definitionfile config/project-scratch-def.json --json --setdefaultusername -d 30"
					printf rmsg
					
					def jsonSlurper = new JsonSlurperClassic();
					def robj = jsonSlurper.parseText(rmsg)
					if (robj != 0) {
						error 'Salesforce scratch org creation failed.' + robj.message
					}
					SF_USERNAME = robj.result.uesrname
					robj = null
					
				}
				
				// -------------------------------------------------------------------------
				// Display scratch org info.
				// -------------------------------------------------------------------------

				stage('Display Scratch Org Info') {
					password = sh returnStdout : true, script :"sfdx force:user:password:generate --targetusername ${SF_USERNAME}"
					passwordOutput = sh returnStdout : true, script : "sf org display --targetusername ${SF_USERNAME}"
					
					echo passwordOutput

				}
		
		}
	}
	
	finally{
		emailext (body : "Scratch of was created successfully ${currentBuild.currentResult}: job ${env.JOB_NAME}",
				subject : "Scratch of was created successfully",
				to : "vinod.patil789@gmail.com")
		
	}
}
