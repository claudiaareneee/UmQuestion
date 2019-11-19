/* 
In this file, there are functions to create views like a question view, a response view, etc.
This file exists so that we can reuse views that we create.
*/

// Each function in this file will be created off of the View object.
var View = {};

View.createQuestionView = function(question){
    var messageContainer = document.createElement("DIV");
    var header = document.createElement("DIV");
    var icon = document.createElement("I");
    
    // messageContainer.className = "questionContainer container card w-75";
    messageContainer.className = "questionContainer card";
    icon.className = "fa fa-trash-o float-right color-red";
    // p.className = "card-text";
    header.className = "card-header";
    header.innerHTML = question.message;

    icon.addEventListener('click', () => {
        socket.emit('delete_post', question.postId);
        window.location = "course.html";
    });

    if(sessionStorage.getItem("userType") != 's')
        header.appendChild(icon);
    messageContainer.appendChild(header);

    return messageContainer;
};

View.createAnswerView = function(answer){
    var li = document.createElement("LI");
    var icon = document.createElement("I");

    li.className = "list-group-item";
    icon.className = "fa fa-trash-o float-right color-red";

    li.innerHTML = answer.message;

    icon.addEventListener('click', () => {
        socket.emit('delete_post', answer.postId);
        window.location = "course.html";
    });

    if(sessionStorage.getItem("userType") != 's')
        li.appendChild(icon);
    
    return li;
};

View.createAnswerListView = function(question, answers){
    var ul = document.createElement("UL");
    ul.className = "list-group list-group-flush";

    for (var answer of answers){
        var li = View.createAnswerView(answer);
        ul.appendChild(li);
    }

    if (answers.length == 0){
        var answerLi = document.createElement("LI");
        answerLi.className = "list-group-item unansweredQuestion";
        answerLi.innerHTML = "There are no answers yet";
        
        
        ul.appendChild(answerLi);
    }

    if(sessionStorage.getItem("userType") != 's')
        ul.appendChild(View.createNewAnswerView(question.postId));

    return ul;
};

View.createPost = function (question, answers){
    var container = document.createElement("DIV");
    var questionView = View.createQuestionView(question);
    var answerListView = View.createAnswerListView(question, answers);

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

View.createNewAnswerView = function(questionPostId){
    var li = document.createElement("LI");

    var newAnswer = document.createElement("TEXTAREA");
    var postAnswer = document.createElement("BUTTON");

    newAnswer.className = "form-control w-100";
    postAnswer.className = "btn btn-primary float-right newPostButton";
    li.className = "list-group-item";

    newAnswer.setAttribute("placeholder", "Answer question...");
    postAnswer.innerText = "Post answer";
    
    postAnswer.addEventListener("click", () => {
        var post = new Answer(sessionStorage.getItem("UserID"),sessionStorage.getItem("courseID"),questionPostId,newAnswer.value);
        socket.emit("add_answer", {aID:post.authorId, cID: post.courseId, msg:post.message, qID: post.questionId});
        window.location = "course.html";
    });

    li.appendChild(newAnswer);
    li.appendChild(postAnswer);

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

        text.innerText = "Name: " + course.name + " · Course ID: " + course.cid;
        gotoCourseBtn.innerText = "Go to course";
        deleteCourseBtn.innerText = "Delete course";

        gotoCourseBtn.addEventListener('click', () => {
            sessionStorage.setItem('courseID', course.cid);
            window.location = 'course.html';
        });

        deleteCourseBtn.addEventListener('click', () => {
            socket.emit('delete_course', course.cid);
            window.location = 'courselist.html';
        });

        div.appendChild(text);
        div.appendChild(gotoCourseBtn);
        div.appendChild(deleteCourseBtn);
        li.appendChild(div);
        ul.appendChild(li);
    }

    var createCourseLi = document.createElement("LI");
    var createCourseDiv = document.createElement("DIV");
    var createCourseName = document.createElement("INPUT");
    var createCourseButton = document.createElement("BUTTON");

    createCourseButton.addEventListener("click", () => {
        socket.emit("create_course", {uID: sessionStorage.getItem("UserID"), name: createCourseName.value});
        window.location = 'courselist.html';
    });

    // TODO: handle create Course Button - this might need to be done in courselist.js but you do you

    createCourseLi.className = "list-group-item";
    createCourseButton.className = "btn btn-primary course-page-item";
    createCourseDiv.className = "form-inline";
    createCourseName.className = "course-page-item form-control";

    createCourseButton.innerText = "New Course";
    createCourseName.setAttribute("placeholder", "Course Name");    

    createCourseDiv.appendChild(createCourseName);
    createCourseDiv.appendChild(createCourseButton);
    createCourseLi.appendChild(createCourseDiv);

    ul.appendChild(createCourseLi);

    return ul;
};