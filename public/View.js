/* 
In this file, there are functions to create views like a question view, a response view, etc.
This file exists so that we can reuse views that we create.
*/

// Each function in this file will be created off of the View object.
var View = {};

View.createQuestionView = function(question){
    var messageContainer = document.createElement("DIV");
    var header = document.createElement("DIV");
    
    // messageContainer.className = "questionContainer container card w-75";
    messageContainer.className = "questionContainer card";
    // p.className = "card-text";
    header.className = "card-header";
    header.innerHTML = question.message;

    messageContainer.appendChild(header);

    return messageContainer;
};

View.createAnswerView = function(answer){
    var li = document.createElement("LI");

    li.className = "list-group-item";
    li.innerHTML = answer.message;
    
    return li;
};

View.createAnswerListView = function(answers){
    var ul = document.createElement("UL");
    ul.className = "list-group list-group-flush";

    for (var answer of answers){
        var li = View.createAnswerView(answer);
        ul.appendChild(li);
    }

    if (answers.length == 0){
        answer = new Answer(0,0,0,"There are no answers yet");
        var li = View.createAnswerView(answer);
        li.className += " unansweredQuestion";
        ul.appendChild(li);
    }

    return ul;
};

View.createPost = function (question, answers){
    var container = document.createElement("DIV");
    var questionView = View.createQuestionView(question);
    var answerListView = View.createAnswerListView(answers);

    questionView.appendChild(answerListView);
    container.appendChild(questionView);
    return container;
};
