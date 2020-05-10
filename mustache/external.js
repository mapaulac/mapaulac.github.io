var context = {
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


var template = $('#template').html();
var output = Mustache.render(template, context);
var partials = {
    people: "<p>{{name}}</p>{{position}}"
};
// $(".body").html(output);
// console.log(output);
$('body').append(Mustache.render(output,context,partials));
