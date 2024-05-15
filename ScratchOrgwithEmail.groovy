#!groovy

import groovy.json.JsonSlurperClassic

node {
  try {
    def SF_USERNAME
    def BUILD_NUMBER = "${env.BUILD_NUMBER}"
    def RUN_ARTIFACT_DIR
    def HUB_ORG_USERNAME = "${params.HUB_ORG_USERNAME}"
    def SFDC_HOST = "${params.SFDC_HOST}"
    def JWT_KEY_CRED_ID = "sfserverkey"
    def CONNECTED_APP_CONSUMER_KEY = "${params.CONNECTED_APP_CONSUMER_KEY}"

    println 'KEY IS'
    println JWT_KEY_CRED_ID
    println HUB_ORG_USERNAME
    println SFDC_HOST
    println CONNECTED_APP_CONSUMER_KEY

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
        rc = bat returnStatus: true, script: "sfdx force:auth:jwt:grant --instance-url ${SFDC_HOST} --client-id ${CONNECTED_APP_CONSUMER_KEY} --username ${HUB_ORG_USERNAME} --jwt-key-file ${server_key_file} --setdefaultdevhubusername"
        if (rc != 0) {
          error 'Dev hub org authorization failed.'
        }

        rmsg = bat(returnStdout: true, script: "sfdx force:org:create --definitionfile config/project-scratch-def.json --json --setdefaultusername -d 30").trim()
        rmsg = rmsg.readLines().drop(1).join(" ")

        println rmsg

        def jsonSlurper = new JsonSlurperClassic();
        def robj = jsonSlurper.parseText(rmsg)
        println robj
        if (robj.status != 0) {
          error 'Salesforce scratch org creation failed.' + robj.message
        }
        SF_USERNAME = robj.result.username
        println SF_USERNAME
        println robj.result.uesrname
        robj = null

      }

      // -------------------------------------------------------------------------
      // Display scratch org info.
      // -------------------------------------------------------------------------

      stage('Display Scratch Org Info') {
        password = bat returnStdout: true, script: "sfdx force:user:password:generate --targetusername ${SF_USERNAME}"
        passwordOutput = bat returnStdout: true, script: "sf org display --targetusername ${SF_USERNAME}"

        println passwordOutput

      }

    }

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
