contentContainer = document.getElementById("mainContent");

var testQuestion = new Question(1,1,"Message");
contentContainer.appendChild(View.createQuestionView(testQuestion));

testQuestion = new Question(1,1,"Message");
contentContainer.appendChild(View.createQuestionView(testQuestion));

