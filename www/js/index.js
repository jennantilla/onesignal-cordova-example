/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}

// Add to index.js or the first page that loads with your app.
document.addEventListener('deviceready', OneSignalInit, false);
function OneSignalInit() {
    // Set OneSignal device logging to VERBOSE  
    window.plugins.OneSignal.Debug.setLogLevel(6);

    // Set OneSignal visual logging  
    window.plugins.OneSignal.Debug.setAlertLevel(0);
    
    // Uncomment to require privacy consent before OneSignal init
    // window.plugins.OneSignal.setRequiresPrivacyConsent(true);

    // NOTE: Update the "setAppId" value below with your OneSignal AppId.
    window.plugins.OneSignal.init("YOUR_APP_ID");

    window.plugins.OneSignal.Notifications.setNotificationOpenedHandler(function(opened) {
        var notificationData = JSON.stringify(opened);
        console.log('notificationOpenedCallback: ' + notificationData);
    });

    //Prompts the user for notification permissions.
    //* Since this shows a generic native prompt, we recommend instead using an In-App Message to prompt for notification permission (See step 6) to better communicate to your users what notifications they will get.
    window.plugins.OneSignal.Notifications.requestPermission(function(accepted) {
        console.log("User accepted notifications: " + accepted);
    });
}

document.getElementById("getPrivacyConsent").addEventListener("click", getPrivacyConsent);
function getPrivacyConsent() {
    window.plugins.OneSignal.getPrivacyConsent((getPrivacyConsent) => {
        console.log("User has provided privacy consent: ", getPrivacyConsent);
    });
}

document.getElementById("getRequiresPrivacyConsent").addEventListener("click", getRequiresPrivacyConsent);
function getRequiresPrivacyConsent() {
    window.plugins.OneSignal.getRequiresPrivacyConsent((getRequiresPrivacyConsent) => {
        console.log("This app requires privacy consent: ", getRequiresPrivacyConsent);
      });
}

document.getElementById("setPrivacyConsent").addEventListener("click", setPrivacyConsent);
function setPrivacyConsent() {
    window.plugins.OneSignal.setPrivacyConsent(true);
}

document.getElementById("login").addEventListener("click", logIn);
function logIn() {
    window.plugins.OneSignal.login("EXTERNAL_ID");
}

document.getElementById("logout").addEventListener("click", logOut);
function logOut() {
    window.plugins.OneSignal.logout();
}

document.getElementById("setLanguage").addEventListener("click", setLanguage);
function setLanguage() {
    window.plugins.OneSignal.User.setLanguage("es");
}

// Aliases
document.getElementById("addAlias").addEventListener("click", addAlias);
function addAlias() {
    window.plugins.OneSignal.User.addAlias(document.getElementById("addAliasLabel").value, document.getElementById("addAliasId").value);
}

document.getElementById("removeAlias").addEventListener("click", removeAlias);
function removeAlias() {
    window.plugins.OneSignal.User.removeAlias(document.getElementById("removeAliasLabel").value);
}

// Email
document.getElementById("addEmail").addEventListener("click", addEmail);
function addEmail() {
    window.plugins.OneSignal.User.addEmail(document.getElementById("addEmailAddress").value);
}

document.getElementById("removeEmail").addEventListener("click", removeEmail);
function removeEmail() {
    window.plugins.OneSignal.User.removeEmail(document.getElementById("removeEmailAddress").value);
}


// SMS
document.getElementById("addSMS").addEventListener("click", addSMSSubscription);
function addSMSSubscription() {
    window.plugins.OneSignal.User.addSms(document.getElementById("sms").value);
}

document.getElementById("removeSMS").addEventListener("click", removeSMSSubscription);
function removeSMSSubscription() {
    window.plugins.OneSignal.User.removeSms(document.getElementById("removeSms").value);
}

// Tagging
document.getElementById("addTag").addEventListener("click", addTag);
function addTag() {
    window.plugins.OneSignal.User.addTag(document.getElementById("addTagKey").value, document.getElementById("addTagValue").value);
}

document.getElementById("removeTag").addEventListener("click", removeTag);
function removeTag() {
    window.plugins.OneSignal.User.removeTag(document.getElementById("removeTagKey").value);
}

// Push Subscription
document.getElementById("getPushId").addEventListener("click", getPushId);
function getPushId() {
    let pushId = window.plugins.OneSignal.User.pushSubscription.id;
    console.log("User push ID: ", pushId);
}

document.getElementById("getPushToken").addEventListener("click", getPushToken);
function getPushToken() {
    let token = window.plugins.OneSignal.User.pushSubscription.token;
    console.log("User push token: ", token);
}

document.getElementById("getOptIn").addEventListener("click", getOptedIn);
function getOptedIn() {
    let optedIn = window.plugins.OneSignal.User.pushSubscription.optedIn;
    console.log("User is opted in: ", optedIn);
}

document.getElementById("optIn").addEventListener("click", optIn);
function optIn() {
    window.plugins.OneSignal.User.pushSubscription.optIn();
}

document.getElementById("optOut").addEventListener("click", optOut);
function optOut() {
    window.plugins.OneSignal.User.pushSubscription.optOut();
}

document.getElementById("addObserver").addEventListener("click", addObserver);
function addObserver() {
    window.plugins.OneSignal.User.pushSubscription.addObserver(function (state){
        console.log("Push Subscription state changed: " + JSON.stringify(state));
    });
}

document.getElementById("removeObserver").addEventListener("click", removeObserver);
function removeObserver() {
    window.plugins.OneSignal.User.pushSubscription.removeObserver(function (state){
          console.log("Push Subscription state changed: " + JSON.stringify(state));
    });
}

// Notificaitons
let observer1 = function(req) {
    console.log('Permission observer with callback ' + (req));
};

document.getElementById("addPermissionObserver1").addEventListener("click", addPermissionObserver1);
function addPermissionObserver1() {
    window.plugins.OneSignal.Notifications.addPermissionObserver(observer1);
}

document.getElementById("removePermissionObserver1").addEventListener("click", removePermissionObserver1);
function removePermissionObserver1() {
    window.plugins.OneSignal.Notifications.removePermissionObserver(observer1);
}

document.getElementById("canRequestPermission").addEventListener("click", canRequestPermission);
function canRequestPermission() {
    window.plugins.OneSignal.Notifications.canRequestPermission(function (canRequestPermission) {
        console.log("Can request permission", canRequestPermission);
    });
}

document.getElementById("getPermission").addEventListener("click", getPermission);
function getPermission() {
    let permission = window.plugins.OneSignal.Notifications.permission;
    console.log("User's current permission status: ", JSON.stringify(permission));
}

document.getElementById("addPermissionObserver").addEventListener("click", addPermissionObserver);
function addPermissionObserver() {
    window.plugins.OneSignal.Notifications.addPermissionObserver(function(state) {
        console.log("User updated permission to: ", JSON.stringify(state));
    });
}

document.getElementById("registerForProvisionalAuthorization").addEventListener("click", registerForProvisionalAuthorization);
function registerForProvisionalAuthorization() {
    window.plugins.OneSignal.Notifications.registerForProvisionalAuthorization(true);
}

document.getElementById("removeNotification").addEventListener("click", remove);
function remove() {
    window.plugins.OneSignal.Notifications.removeNotification();
}

document.getElementById("removeGroupedNotifications").addEventListener("click", removeGroup);
function removeGroup() {
    window.plugins.OneSignal.Notifications.removeGroupedNotifications("abc123");
}

document.getElementById("clearAllNotifications").addEventListener("click", clearAll);
function clearAll() {
    window.plugins.OneSignal.Notifications.clearAll();
}

// Session/Outcomes

document.getElementById("addOutcome").addEventListener("click", addOutcome);
function addOutcome() {
    window.plugins.OneSignal.Session.addOutcome(document.getElementById("addOutcomeInput").value);
}

document.getElementById("addUniqueOutcome").addEventListener("click", addUniqueOutcome);
function addUniqueOutcome() {
    window.plugins.OneSignal.Session.addUniqueOutcome(document.getElementById("addUniqueOutcomeInput").value);
}

document.getElementById("addOutcomeWithValue").addEventListener("click", addOutcomeWithValue);
function addOutcomeWithValue() {
    window.plugins.OneSignal.Session.addOutcomeWithValue(document.getElementById("valueOutcomeName").value, document.getElementById("valueOutcomeValue").value);
}

// In-App Messages
document.getElementById("setClickHandler").addEventListener("click", setClickHandler);
function setClickHandler() {
    window.plugins.OneSignal.InAppMessages.setClickHandler(function(result){
        console.log("Click Handler Callback received: ");
        let firstClick = result.isFirstClick;
        let closesMessage = result.closesMessage;
        let clickUrl = result.clickUrl;
        let clickName = result.clickName;
        console.log("Click handler results: {First Click: ", firstClick, " closesMessage: ", closesMessage, " clickUrl: ", clickUrl, " clickName: ", clickName);
        });
}

document.getElementById("addTrigger").addEventListener("click", addTrigger);
function addTrigger() {
    window.plugins.OneSignal.InAppMessages.addTrigger("testTrigger", "true");
}

document.getElementById("removeTrigger").addEventListener("click", removeTrigger);
function removeTrigger() {
    window.plugins.OneSignal.InAppMessages.removeTrigger("testTrigger");
}

document.getElementById("pauseInAppMessages").addEventListener("click", pauseInAppMessages);
function pauseInAppMessages() {
    window.plugins.OneSignal.InAppMessages.setPaused(true);
    console.log("pause IAM");
}

document.getElementById("resumeInAppMessages").addEventListener("click", resumeInAppMessages);
function resumeInAppMessages() {
    window.plugins.OneSignal.InAppMessages.setPaused(false);
    console.log("resume IAM");
}

document.getElementById("clearTriggers").addEventListener("click", clearTriggers);
function clearTriggers() {
    window.plugins.OneSignal.InAppMessages.clearTriggers();
}


// Location
document.getElementById("requestLocationPermission").addEventListener("click", requestPermission);
function requestPermission() {
    window.plugins.OneSignal.Location.requestPermission();
}

document.getElementById("isLocationShared").addEventListener("click", isLocationShared);
function isLocationShared() {
    window.plugins.OneSignal.Location.isShared(function(shared){
        console.log("Location shared: ", shared);
        console.log(typeof shared);
    });
}

document.getElementById("setLocationShared").addEventListener("click", setLocationShared);
function setLocationShared() {
    window.plugins.OneSignal.Location.setShared(true);
}

// Live Activities

document.getElementById("enterLiveActivity").addEventListener("click", enterLiveActivity);
function enterLiveActivity() {
    window.plugins.OneSignal.enterLiveActivity("0123456789", "9876543210");
}

document.getElementById("exitLiveActivity").addEventListener("click", exitLiveActivity);
function exitLiveActivity() {
    window.plugins.OneSignal.exitLiveActivity("0123456789");
}
