#!groovy

import groovy.json.JsonSlurperClassic

node {
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
					rc = bat returnStatus:true , script : "sfdx force:auth:jwt:grant --instance-url ${SFDC_HOST} --client-id ${CONNECTED_APP_CONSUMER_KEY} --username ${HUB_ORG_USERNAME} --jwt-key-file '-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCypQuPcFxOP/tO
sROrRD+oaKyMlyJ09cbZcazDpfxFHGsiZXPepc4kQBA43tudtGvd3OEkBVl4/L9k
RgP8GAEp1Ch7ONZHfoAruEqZnHWdr/5EHKpjbDxo7TdHiPyw4YeyPihFU28gpZ1w
WS3eEn1pKh69kIcV04TwjlJcJxv1el9GIDxUxUP+1Ccao2JwbVthGszkn09Jqb9p
xAFyOUmkIwjE8gBtDF98jizAhPJkUIs8WtLqwJJG5lrF2jGoeZiBpJOE3UDhzdVC
lPI4lb6H10GWLD6dsKEh3U9duFDGLEjSGML1Kr4RcbDA/lMqaTDrcwBJsBgwrmHp
M8TlMfsTAgMBAAECggEASRswoWkOZTlauwfNMEvULzNy1W/t+mYwE4Eo/cHZ/GBW
WXOiGM3Kj9wlp1hQEHgqolcHTYng5RmtqzfZ3prmMvtu+4o1anmSsxGOedFk8nx4
td/zPI+pIxlcg2pEWpBYyzETotczhW0xAi6EjjoL13MUtGfGWEDAyP69JpgcoXZb
fHltL5RW8Oi1odqJoLpJutHHCoMT/y73aaZ7dgp6rQoasD6oSfAE8FUOPvlhCh2Q
t1ccdJFXGOlPQy5SMmLUnqz/79iKGxEFI6j2LJfOyU3BN5e4ZkcEIgktGTiUDdPv
N7rsu4VUZofc7LvlscMv9vael8POYrbzTS/eAJlFGQKBgQD1lD1BmFoDjn1ZH1/I
/LT3KqtFSz7I/eGTDV17hhc4kyr0WzJ3/Hrzv0OkxCcnPls3rKV9mRvHQFL9orA/
dwsjklZLsk1tbicSHzxeIjxmKJG03DbUxYObR9qtiVBivdY2E325kiFKB+0DgCeB
ZAOuUxAFAyB3gdllzDiR8YlzewKBgQC6ObA4hwR/FkSsRY2vdgCdx37TzRyE4X2b
+4RKAGhonFs3CQlnVyt7qsrbfN0qctNXjVyhfRiJqDinOl9X9oloaUsiYe/nk7Z9
rhX8wDx+5pIwTP/te81WQEj/r053EgoEES0CKCWKghUVSpFHIzr70uYDlzcIFj9L
nVl54OAXSQKBgEHHLQku151wQx7mCm/5UDeMFEgBOZX4er06rTly1zFuKek9rCz7
UauMJYAykhIu35vwAHu90PTzw8bwFqlJJ5Cll7u6zIZtJMXz2+WS4f6zCyQYgA9J
wFCNVIN67i8kjgX5/okAHS6JJPD1GJ/NvDarRPUyuzWHcEWWB+j/e0OVAoGABYHD
Nki311I/QaDk6bVhm0jU9Upxd3R7lGtBpDaS39UP1XbM8mNfg86vJQJyP9kZatNh
U90xJpD06+0L+LvvoEjM0f13bK+vi9PkDo9Yup/y3r7IKquojM5l2jnC5j6AUVJ4
tEGfqpLiMLj9xs7B5cR8zMph9DlEMeY7SSFfPxECgYEAgDFCVmOO2NvUKPYKgnkV
dTSQSYTK1XrPDQvzAFkxWkfpxRRsEVH+Ht85gTgk3jxUPzOOREiMrJMIHqg9ZPv2
T4Zufa7sus0U0pO/8R4sokBFLzNaFmAR0Hda/iSp1JgIXjVXlbqYXMmRYvxWF+0z
NfyBISmn/LtYT4l9zhuorFI=
-----END PRIVATE KEY-----' --setdefaultdevhubusername"
					if (rc != 0) {
						error 'Dev hub org authorization failed.'
					}
				

					rmsg = bat returnStatus:true , script : "sfdx force:org:create --definitionfile config/project-scratch-def.json --json --setdefaultusername -d 30"
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

				/*stage('Display Scratch Org Info') {
					password = sh returnStdout : true, script :"sfdx force:user:password:generate --targetusername ${SF_USERNAME}"
					passwordOutput = sh returnStdout : true, script : "sf org display --targetusername ${SF_USERNAME}"
					
					echo passwordOutput

				}*/
		
		}

	
}

    def command(script) {
    if (isUnix()) {
        return sh(returnStatus: true, script: script);
    } else {
		return bat(returnStatus: true, script: script);
    }
}
