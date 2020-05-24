//registering navigation bar partial
Handlebars.registerPartial("navbarPartial",$("#navbar-partial").html());

//loading the template 
$(document).ready(function(){
    var source = $("#template").html();

    var context = {
        sectionTitles: ["RESOURCES", "IM LAB", "EVENTS", "WANT TO RECEIVE WEEKLY UPDATES?"],
        sectionDescriptions: ["Lab information, forms, and useful resources", "C3-026 | 9am - 9pm"],
        subscribeLink: "people.html",
        subscribeTitle: "subscribe to our newsletter",
        labInfoSections: [
            {
                subtitle:"ABOUT THE LAB",
                description:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
                links:[]
            },
            {
                subtitle:"RESOURCES",
                description:["Laser cutting templates", "Workshops/events archive", "Lab tutorial resources"], 
                links: ["people.html","home.html","gallery.html"]
            },
            {
                subtitle:"BOOKINGS",
                description:["Room access form", "Workshops/events archive", "Lab tutorial resources"], 
                links: ["#","#","#"]
            }
        ], 
        events:[
            {
                name: "Event Name 1",
                description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
                date:"May 27",
                link:"#"
            },
            {
                name: "Event Name 2",
                description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
                date:"August 3",
                link:"#"
            },
            {
                name: "Event Name 3",
                description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
                date:"September 21",
                link:"#"
            }
        ]
    };

    var template = Handlebars.compile(source);
    var html = template(context); //adding the data
    $(document.body).append(html);
});