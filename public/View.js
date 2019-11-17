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

    ul.appendChild(View.createNewAnswerView());

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

View.createNewPost = function(){
    var container = document.createElement("DIV");
    var body = document.createElement("DIV");
    var title = document.createElement("H5");
    var form = document.createElement("DIV");
    var newQuestion = document.createElement("TEXTAREA");
    var postQuestion = document.createElement("BUTTON");

    container.className = "questionContainer card";
    body.className = "card-body";
    title.className = "card-title";
    // form.className = "form-inline";
    newQuestion.className = "form-control w-100";
    postQuestion.className = "btn btn-primary float-right newPostButton";

    newQuestion.setAttribute("type", "text");
    newQuestion.setAttribute("id", "newQuestion");
    newQuestion.setAttribute("placeholder", "Enter a new question");
    postQuestion.setAttribute("id", "postQuestionButton");

    title.innerHTML = "Ask a new question";
    postQuestion.innerHTML = "Post";

    body.appendChild(title);
    form.appendChild(newQuestion);
    form.appendChild(postQuestion);
    body.appendChild(form);
    container.appendChild(body);
    return container;
};

View.createNewAnswerView = function(){
    var li = document.createElement("LI");

    var newAnswer = document.createElement("TEXTAREA");
    var postAnser = document.createElement("BUTTON");

    newAnswer.className = "form-control w-100";
    postAnser.className = "btn btn-primary float-right newPostButton";
    li.className = "list-group-item";

    newAnswer.setAttribute("placeholder", "Answer question...");
    postAnser.innerText = "Post answer";
    
    li.appendChild(newAnswer);
    li.appendChild(postAnser);

    return li;
};

View.createCourseList = function(courses) {
    var ul = document.createElement("UL");
    ul.className ="list-group list-group-flush";

    for (var course of courses){
        var li = document.createElement("LI");
        var div = document.createElement("DIV");
        var text = document.createElement("P");
        var gotoCourseBtn = document.createElement("BUTTON");
        var deleteCourseBtn = document.createElement("BUTTON");

        li.className = "list-group-item";
        div.className = "inline-block";
        gotoCourseBtn.className = "btn btn-primary course-page-item";
        deleteCourseBtn.className = "btn btn-danger course-page-item";

        text.innerText = "Name: " + course.courseName + " · Course ID: " + course.courseID;
        gotoCourseBtn.innerText = "Go to course";
        deleteCourseBtn.innerText = "Delete course";

        div.appendChild(text);
        div.appendChild(gotoCourseBtn);
        div.appendChild(deleteCourseBtn);
        li.appendChild(div);
        ul.appendChild(li);
    }

    var createCourseLi = document.createElement("LI");
    var createCourseDiv = document.createElement("DIV");
    var createCourseName = document.createElement("INPUT");
    var createCourseID = document.createElement("INPUT");
    var createCourseButton = document.createElement("BUTTON");

    createCourseLi.className = "list-group-item";
    createCourseButton.className = "btn btn-primary course-page-item";
    createCourseDiv.className = "form-inline";
    createCourseName.className = "course-page-item form-control";
    createCourseID.className = "course-page-item form-control";

    createCourseButton.innerText = "New Course";
    createCourseName.setAttribute("placeholder", "Course Name");    
    createCourseID.setAttribute("placeholder", "Course ID");

    createCourseDiv.appendChild(createCourseName);
    createCourseDiv.appendChild(createCourseID);
    createCourseDiv.appendChild(createCourseButton);
    createCourseLi.appendChild(createCourseDiv);

    ul.appendChild(createCourseLi);

    return ul;
};