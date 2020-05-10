//testing partials
//1 way of using partials
Handlebars.registerPartial(
    'navbarTemplate',
    '{{language}} is {{adjective}}. This is an example of a {{website}}.'
);

//2. way of using partials
Handlebars.registerPartial("navbarPartial",$("#navbar-partial").html());

//loading the template 
$(document).ready(function(){
    var source = $("#template").html();

    var context = {
        language: "handlebars",
        adjective: "awesome",
        requirements: [
            {
                subtitle: "4 FOUNDATIONS",
                classes: [
                {title: "Communications Lab"}, 
                {title: "Introduction to Interactive Media"},
                {title: "Understanding Interactive Media"},
                {title: "Communication and Technology"},
                ]    
            },
            {
                subtitle: "6 ELECTIVES",
                classes: [
                {title: "Elective 1"}, 
                {title: "Elective 2"},
                {title: "Elective 3"},
                {title: "Elective 4"},
                ]    
            },
            {
                subtitle: "2 CAPSTONE COMPONENTS",
                classes: [
                {title: "Capstone Seminar"}, 
                {title: "Capstone Project"}
                ]    
            }
        ],
        facilities: [
            {
                name:"Fabrication Area",
                description: "Lorem ipsum dolor sit amet alsdkfalsfjasldkfa alkdfasf adlfj"
            },        
            {
                name:"Soldering Station",
                description: "Lorem ipsum dolor sit amet alsdkfalsfjasldkfa alkdfasf adlfj"
            },       
            {
                name:"Kitchen",
                description: "Lorem ipsum dolor sit amet alsdkfalsfjasldkfa alkdfasf adlfj"
            },
        ],     
    };

    var template = Handlebars.compile(source);
    var html = template(context); //adding the data
    var destination = document.querySelector(".body"); //or:$(document.body).append(html);
    destination.innerHTML = html; //changing the html

    //obtaining partial from html and appending to index.html (doesn't work??)
    // $.ajax("./navbar-partial.html").done(function(data){
    //     console.log(data);
    //     Handlebars.registerPartial("navbarPartial",$("#navbar-partial").html());
    // });
});




