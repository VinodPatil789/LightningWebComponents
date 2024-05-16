#!groovy

import groovy.json.JsonSlurperClassic

node {

  try {

    def BUILD_NUMBER = "${env.BUILD_NUMBER}"
    def RUN_ARTIFACT_DIR = "${WORKSPACE}/${JOB_NAME}/test/&{BUILD_NUMBER}"
    def HUB_ORG_USERNAME = "${params.HUB_ORG_USERNAME}"
    def SFDC_HOST = "${params.SFDC_HOST}"
    def JWT_KEY_CRED_ID = "sfserverkey"
    def CONNECTED_APP_CONSUMER_KEY = "${params.CONNECTED_APP_CONSUMER_KEY}"
    def SCRATCH_ORG_USERNAME = "${params.SCRATCH_ORG_USERNAME}"

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

    withCredentials([file(credentialsId: JWT_KEY_CRED_ID, variable: 'jwt_key_file')]) {

      // -------------------------------------------------------------------------
      // Push to scratch org
      // -------------------------------------------------------------------------

      stage('Push To Scratch Org') {
        rc = bat returnStatus: true, script: "sfdx force:auth:jwt:grant --instance-url ${SFDC_HOST} --client-id ${CONNECTED_APP_CONSUMER_KEY} --username ${HUB_ORG_USERNAME} --jwt-key-file ${jwt_key_file} --setdefaultdevhubusername"
        if (rc != 0) {
          error 'Dev hub org authorization failed.'
        }

        rc = bat returnStatus: true, script: "sfdx force:source:push -f --targetusername ${SCRATCH_ORG_USERNAME}"
        if (rc != 0) {
          error 'Push failed.'
        }

        /* if permission set assignment is there
        	rc = bat returnStatus:true ,script : "sfdx force:user:permset:assign -f --targetusername ${SCRATCH_ORG_USERNAME} --permsetname <Enter the name of permission set>"
        	if (rc != 0) {
        		error 'permission set assignment failed.'
        	}
        
        */

      }

      // -------------------------------------------------------------------------
      // Mdapi Deployment.
      // -------------------------------------------------------------------------

      stage('mdapi deploy') {

        rmsg = bat returnStdout: true, script: "sfdx force:mdapi:deploy -d ${WORKSPACE}/manifest --verbose --json -u ${SCRATCH_ORG_USERNAME} -w -1 -l NoTestRun"

        println rmsg

        robj = readJSON text: rmsg
        if (robj.status != 0) {
          error 'mdapi deploy: ' + robj
        }

        robj = null

      }

    }
  } catch (exception) {

    currentBuild.result = 'FAILURE'
    println exception.toString()
  } finally {
    emailext(body: "${currentBuild.currentResult}: job ${env.JOB_NAME} build ${env.BUILD_NUMBER}\n More info at: ${env.BUILD_URL}",
      to: "vinod.patil789@gmail.com",
      subject: "jenkins Build ${currentBuild.currentResult}: Job ${env.JOB_NAME}")
  }

}

def command(script) {
  if (isUnix()) {
    return sh(returnStatus: true, script: script);
  } else {
    return bat(returnStatus: true, script: script);
  }
}
