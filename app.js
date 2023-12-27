const app = Vue.createApp({
    // data, functions
    data() {
        // can define as many properties in object as you want
        return {
            name: "Ryan Wong",
            job: "Data Analyst",
            age: 23,
            showText: true,
            x:0,
            y:0,
            teams: [
                {name: "Man Utd", color: "Red", url: "https://www.manutd.com/", isFav:true},
                {name: "Man City", color: "Blue", url:"https://www.mancity.com/", isFav:false},
                {name: "Newcastle", color: "Black", url:"https://www.nufc.co.uk/", isFav:false}
            ],
            url: "http://www.gmail.com"
        }
    },
    methods: {
        changeName(name){
            console.log("you clicked me")
            // this keyword references the app component
            this.name = name
        },
        toggleShowText(){
            this.showText = !this.showText
        },
        handleEvent(event, data){
            console.log(event)
            console.log(event.type)
            if(data){
                console.log(data)
            }
        },
        handleMousemove(e){
            this.x = e.offsetX //position relative to top left corner of box
            this.y = e.offsetY
        },
        toggleFavTeam(team){
            console.log("click")
            team.isFav = !team.isFav
        }
    },
    // computed property: property that depends on other data
    computed: {
        filteredTeams(){
            // filter is javascript built in method
            return this.teams.filter((team) => team.isFav) // filters out non fav teams
        }
    }
})

app.mount("#app")