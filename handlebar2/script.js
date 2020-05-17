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
        sectionTitles: ["WHAT IS IM?", "IM MAJOR", "FACILITIES & EQUIPMENT", "EVENTS"],
        sectionDescriptions: ["What is IM: Lorem ipsum dolor sit amet alsdkfalsfjasldkfa alkdfasf adlfj Lorem ipsum dolor sit amet alsdkfalsfjasldkfa alkdfasf adlfj", "IM Major: Lorem ipsum dolor sit amet alsdkfalsfjasldkfa alkdfasf adlfj Lorem ipsum dolor sit amet alsdkfalsfjasldkfa alkdfasf adlfj", "Facilities and Equipment: Lorem ipsum dolor sit amet alsdkfalsfjasldkfa alkdfasf adlfj Lorem ipsum dolor sit amet alsdkfalsfjasldkfa alkdfasf adlfj", "Events: Lorem ipsum dolor sit amet alsdkfalsfjasldkfa alkdfasf adlfj Lorem ipsum dolor sit amet alsdkfalsfjasldkfa alkdfasf adlfj"],
        requirements: [
            {
                subtitle: "4 FOUNDATIONS",
                classes: ["Introduction to Interactive Media", "Communications Lab","Communication and Technology", "Understanding Interactive Media"]
            },
            {
                subtitle: "6 ELECTIVES",
                classes: ["Class1", "Class2","Class3"]
            },
            {
                subtitle: "2 CAPSTONE COMPONENTS",
                classes: ["Capstone Seminar", "Capstone Project"]   
            }
        ],
        facilities: [
            {
                name:"FABRICATION AREA",
                description: "Lorem ipsum dolor sit amet alsdkfalsfjasldkfa alkdfasf adlfj"
            },        
            {
                name:"SOLDERING STATION",
                description: "Lorem ipsum dolor sit amet alsdkfalsfjasldkfa alkdfasf adlfj"
            },       
            {
                name:"KITCHEN",
                description: "Lorem ipsum dolor sit amet alsdkfalsfjasldkfa alkdfasf adlfj"
            },
        ],     
    };

    var template = Handlebars.compile(source);
    var html = template(context); //adding the data
    $(document.body).append(html);


    // var destination = document.querySelector(".body"); 
    // destination.innerHTML = html; //changing the html

    //obtaining partial from html and appending to index.html (doesn't work??)
    // $.ajax("./navbar-partial.html").done(function(data){
    //     console.log(data);
    //     Handlebars.registerPartial("navbarPartial",$("#navbar-partial").html());
    // });
});




