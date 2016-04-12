"use strict";

$(document).ready(function() {

    function handleError(message) {
		console.log(message);
        $("#errorMessage").text(message);
    }
    
    function sendAjax(action, data) {
        $.ajax({
            cache: false,
            type: "POST",
            url: action,
            data: data,
            dataType: "json",
            success: function(result, status, xhr) {

                window.location = result.redirect;
            },
            error: function(xhr, status, error) {
                var messageObj = JSON.parse(xhr.responseText);
				console.log(messageObj.error);
                handleError(messageObj.error);
            }
        });        
    }
    
    $("#makeListSubmit").on("click", function(e) {
        e.preventDefault();
    
        if($("#ListName").val() == '' || $("#ListItemOne").val() == '' || $("#ListItemTwo").val() == '') {
            handleError("Please provide a name and two items");
			console.log("Please provide a name and two items");
            return false;
        }

        sendAjax($("#ListForm").attr("action"), $("#ListForm").serialize());
        
        return false;
    });
    
});