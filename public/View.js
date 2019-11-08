/* 
In this file, there are functions to create views like a question view, a response view, etc.
This file exists so that we can reuse views that we create.
*/

// Each function in this file will be created off of the View object.
var View = {};

View.createQuestionView = function(question){
    var messageContainer = document.createElement("DIV");
    var p = document.createElement("P");
    
    messageContainer.className = "questionContainer card";
    p.className = "cardbody";
    
    p.innerHTML = question.message;

    messageContainer.appendChild(p);

    return messageContainer;
};

