/*
This file contains all of our classes as defined by the design document.
*/

// Will want Methods to return Class data as JSON objects.

var Question = function (authorId, courseId, message){
    this.postId = 0;
    this.authorId = authorId || 0;
    this.courseId = courseId || 0;
    this.message = message || "";this.endorseCount = 0;
    this.endorserIds = [];
};

