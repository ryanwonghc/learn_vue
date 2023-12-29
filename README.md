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
            - `scoped` keyword allows styling to only apply to html elements within the same module/script.
            - ```html
                <style scoped>
                    .h1 {}
                </style>

starts off as blank html, then vue components are injected as necessary

### Programming Elements

#### Variables (data)

- defined in `js` within `data()` in root component object
- to reference in `html`, use `{{ variable_name }}`
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
        - Conditionally adding class
            - pass object with key value pair `{classname: condition}`
            - if condition is true, class will be added to component
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
    - `computed`:
        - ```javascript
            filteredTeams(){
                // filter is javascript built in method
                return this.teams.filter((team) => team.isFav) // filters out non fav teams
            }
            ```

#### Template Refs
- Used to provide direct access to underlying DOM (html) elements after they are mounted
```html
    <input ref="input">
```
- Gives access to `<input>` element
- Access in methods using `this.$refs.<ref_name>`
    - ref_name is `input` in this example
- Can then apply [html DOM element functions](https://www.w3schools.com/jsref/dom_obj_all.asp)
    - [devdocs documentation](https://devdocs.io/dom/htmlelement)
    - Eg. `this.$refs.input.focus()`

#### Components
- imported and declared in `<script>` section
```javascript
<script>
import HelloWorld from './components/HelloWorld.vue'
export default {
    components: { HelloWorld }
}
</script>
```
- can be used in html `<template>` section
```html
<template>
    <HelloWorld />
</template>
```

#### Props
- Enables passing data to child components using custom attributes
- A component can have unlimited # of prop
- By default, any value can be passed to any prop

**Registering Props**
- declared in `<script>` section with keyword `props`
- Array of strings or dict
```javascript
<script>
    export default {
        props: ['title', 'likes', 'isPublished', 'commentIds', 'author']
    }
</script>
```
or
```javascript
<script>
    export default {
        props: {
            title: String,
            likes: Number,
            isPublished: Boolean,
            commentIds: Array,
            author: Object,
            callback: Function,
            contactsPromise: Promise // or any other constructor
        }
    }
</script>
```

**Passing Data**

*Static*
```html
<blog-post title="My journey with Vue"></blog-post>
```
- Passing prop `title` with value "My journey with Vue" to blog-post component
- prop must be declared

*Dynamic*
```html
<template>
    <blog-post 
        v-for="post in posts" 
        v-bind:cover="post.title + ' by ' + post.author"
        v-bind:id="post.id"
    ></blog-post>
</template>
<script>
import blog-post from './components/blog-post.vue'
export default {
    components: { blog-post },
    props: { cover: String, id: Number },
    data() {
        posts: [
            {'id':1, 'author': 'RW', 'title': 'my first post'},
            {'id':2, 'author': 'WR', 'title': 'my second post'}
        ]
    }
}
</script>
```
- need to v-bind (or just `:` for short) to pass values other than strings (eg. post id in example above)