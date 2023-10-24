({
    handleChanged: function (cmp, message, helper) {
        // Read the message argument to get the values in the message payload
        if (message != null && message.getParam("recordData") != null) {
            cmp.set("v.recDataValue", message.getParam("recordData").value);
            cmp.set("v.recNameValue", message.getParam("recordName").value);
        }
    }

})
