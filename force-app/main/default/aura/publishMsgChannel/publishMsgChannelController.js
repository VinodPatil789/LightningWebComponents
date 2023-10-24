({
    handleClick: function (cmp, event, helper) {
        var payload = {
            recordName: {value : "This is lightning message channel"},
            recordData: {
                value: "This is record data value"
            }
        };

        cmp.find("sampleMessageChannel").publish(payload);
    }
})
