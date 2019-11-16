function getPosts(){
    //TODO: Update this to pull from the database
    var posts = [];

	// Left in for now.
    posts[0] = {
        question : new Question(1,1,"How much wood could a wood chuck chuck if a woodchuck could chuck wood?"),
        answers : [new Answer(1,1,1,"42"), new Answer(1,1,1,"Cat"), new Answer(1,1,1,"The quick brown fox jumped over the lazy dog"), new Answer(1,1,1,"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.")]
    };

    posts[1] = {
        question : new Question(1,1,"How many licks does it take to get to the center of a tootsie roll pop?"),
        answers : []
    };

    posts[2] = {
        question : new Question(1,1,"How many dogs is too many dogs?"),
        answers : [new Answer(1,1,1,"The answer is there are never too many")]
    };

    return posts;
}

function addNewQuestion(questionText){
    var post = new Question("authorId", "courseId", questionText);
    //Do something with question

    alert(questionText);
}

contentContainer = document.getElementById("mainContent");
contentContainer.appendChild(View.createNewPost());

var posts = getPosts();
for (var post of posts){
    var view = View.createPost(post.question, post.answers);
    contentContainer.appendChild(view);
}

var newPostButton = document.getElementById("postQuestionButton");
newPostButton.addEventListener("click", () => {
    var questionText = document.getElementById("newQuestion").value;
    addNewQuestion(questionText);
});