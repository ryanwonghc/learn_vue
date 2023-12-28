# Learn Vue
Following Vue tutorials


## Notes

- Live server extension: right click in html file
- See Javascript logs in developer console (command+option+J to open on chrome)

## Vue
### Create new vue project
$ vue create <project_name>

Starter files

- node_modules
    - stores libraries/dependencies for project
- public
    - stores boilerplate index.html
- src
    - source code lives here: components, templates, css
    - main.js
    - App.vue
        - stores vue components
- package.json
    - contains info on dependencies, scripts to serve + build app
    - $ yarn serve
    - $ yarn build

### Package Manager
[npm vs yarn](https://classic.yarnpkg.com/en/docs/migrating-from-npm#toc-cli-commands-comparison)

### Project Structure

- .vue
    - each .vue file defines a single vue component
    - each vue component contains 3 parts
        - html `template`
        - `script`
            - can import elements from components folder
            - ```import HelloWorld from './components/HelloWorld.vue'```
            - stores root component object containing data, methods, computed properties, etc.
        - `style`



starts off as blank html, then vue components are injected as necessary

### Programming Elements

#### Variables

- defined in `js` within `data()` in root component object
- to reference in `html`, use {{ variable_name }}
- Example
    - ```javascript
        data() {
        // can define as many properties in object as you want
            return {
                name: "Ryan Wong",
                job: "Data Analyst",
                age: 23
            }
        }
    ```

#### Directives
Attaches logic/behavior to different html elements
Expects: `<directive>:<event>="<Function(optional argument(s))/ variable/ statment>"`

- example: `<li v-for="team in teams" :class="{ fav: team.isFav }" @click="toggleFavTeam(team)">`

**List of Directives** 

- v-on
    - Allows us to react to events
    - Shorthand: `@`
    - Example: `<button v-on:click="age++">Increase Age</button>`
- v-if
    - Implement if/else if/else logic
    - See also: `v-else-if`, `v-else`
    - Example: 
        - ```html
            <button @click="toggleShowText">
                <span v-if="showText">Hide Text</span>
                <span v-else-if="!showText">Show Text</span>
                <span v-else>Not possible</span>
            </button>
            ```
- v-bind
    - Binds dynamic attribtes (variables) to component
    - Shorthand: `:`
    - Example: `<a v-bind:href="url">linky</a><br>`, where url is variable containing a url
- v-for
    - Implement for loop
    - Example: 
        - ```html
            <li v-for="team in filteredTeams" :class="{ fav: team.isFav }">
                <h3>{{ team.name }}</h3>
                <p>{{ team.color }}</p>
                <a :href="team.url">link</a>
            </li>
            ```

#### Mouse Events

- mouseover
    - Triggers if mouse hovers over component
- mouseleave
    - Triggers if mouse leaves component
- dblclick
    - Triggers if component is double clicked
- mousemove
    - Tracks the position of the mouse; (x,y) coordinates from top left corner

#### Methods

- defined in `js` within `methods` in root component object
- `FunctionName(arg1, arg2, ...)`
- To access global variables (defined in data): `this.variable_name`
- Handling events
    - Function used to define behavior after event occurs
    - Event object is automatically passed as first argument (even if no arguments are passed manually)
        - `index.html`:
            - `<div class="box" @mousemove="handleMousemove">Position: {{x}},{{y}}</div>`
        - `app.js`
            - ```javascript
                handleMousemove(e){
                    this.x = e.offsetX
                    this.y = e.offsetY
                }
                ```
    - If you want to pass arguments, use `$event` keyword
        - `index.html`:
            - `<div class="box" @mouseleave="handleEvent($event, 'word')">Mouseleave</div>`
        - `app.js`
            - ```javascript
                handleEvent(event, data){
                    console.log(event)
                    console.log(event.type)
                    if(data){
                        console.log(data)
                    }
                }
                ```
- Printing/Debugging
    - `console.log()`

#### Computed Properties

- Property that depends on other data
- defined in `js` within `computed` in root component object
- Example
    - `data()`:
        - ```javascript
            teams: [
                {name: "Man Utd", color: "Red", url: "https://www.manutd.com/", isFav:true},
                {name: "Man City", color: "Blue", url:"https://www.mancity.com/", isFav:false},
                {name: "Newcastle", color: "Black", url:"https://www.nufc.co.uk/", isFav:false}
            ]
            ```
    - `computed`:
        - ```javascript
            filteredTeams(){
                // filter is javascript built in method
                return this.teams.filter((team) => team.isFav) // filters out non fav teams
            }
            ```

