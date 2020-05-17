//2. way of using partials
Handlebars.registerPartial("navbarPartial",$("#navbar-partial").html());

//loading the template 
$(document).ready(function(){
    var source = $("#template").html();

    var context = {
        sectionTitle: "PEOPLE",
        subTitle: ["INSTRUCTORS","STUDENT ASSISTANTS"],
        sections:[
            {
                name: "Aaron Sherwood",
                image: "http://www.nyuadim.com/media/img/people/aaronsherwood.png",
                description: "Aaron Sherwood is a new media artist exploring cause and effect through the mediums of sound and light. This takes the form of large scale audio/visual installations, sound sculptures, guerilla art interventions, and performance. In 2011, along with Kiori Kawai, he founded Purring Tiger, a multi-cultural, multimedia, experimental performance group dedicated to bringing people together in the context of art, in a subtext of wonder."
            },
            {
                name: "Joerg Blumtritt",
                image: "http://www.nyuadim.com/media/img/people/joergblumtritt.jpg",
                description: "Joerg Blumtritt (*1970) is a creative technologist, researcher and professor for interactive media teaching at NYU Abu Dhabi. He founded startups in big data, mobile apps, and open source hardware. He consults businesses and public institutions in technology driven transformation. As political activist and researcher, Joerg works on projects regarding future of democratic participation and media."
            },
            {
                name: "Heather Dewey-Hagborg",
                image: "http://www.nyuadim.com/media/img/people/heatherdeweyhagborg.jpg",
                description: "Dr. Heather Dewey-Hagborg is a transdisciplinary artist and educator who is interested in art as research and critical practice. Her controversial biopolitical art practice includes the project Stranger Visions in which she created portrait sculptures from analyses of genetic material (hair, cigarette butts, chewed up gum) collected in public places."
            },
            {
                name: "Jonny Farrow",
                image: "http://www.nyuadim.com/media/img/people/jonnyfarrow.jpg",
                description: "Jonny Farrow is a multi-disciplinary artist primarily working in cast sculpture, printmaking, sound, and transmission art. His work stems from research into the liminal: from suppressed historical narratives, to popular mythologies, and to the far-reaching registers on the electro-magnetic spectrum. Coming out of New York’s Lower East Side music scene of the 90s, Farrow’s work also questions the narrative of expertise; with nearly every project, he embarks on learning a new skill set in order to disrupt viewer expectations as well as his own. For Farrow, this practice is both political and metaphysical. "
            },
            {
                name: "Ume Hussain",
                image: "http://www.nyuadim.com/media/img/people/umehussain.jpg",
                description: "Sarah Fay Krom is an Assistant Professor of Practice of Interactive Media in the Division of Arts & Humanities at New York University Abu Dhabi. She holds a BFA from Carnegie Mellon University and an MFA from the Digital Arts and New Media program at the University of California, Santa Cruz. Sarah Fay’s work explores visually expressive interactive storyworlds and the underlying computational processes that expand and enrich their artistic palette."
            },
            {
                name: "Jack B. Du",
                image: "http://www.nyuadim.com/media/img/people/jackbdu.jpg",
                description: "Jack gratudated from NYU Shanghai with a degree in Computer Science, but when he studied away at NYU Abu Dhabi in his senior year, he took four Visual Art classes and he loved them. He built Minus E, a robot that creates large scale drawings."
            }            
        ]
        
    };

    var template = Handlebars.compile(source);
    var html = template(context); //adding the data
    $(document.body).append(html);
});




