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

#### Custom Events
- While props are for passing data from parent to child, custom events are used for passing data from child to parent
- Define event keyword using `this.$emit('keyword')`
- Accept argument in parent class
- Example: Modal class (child) inside App class (parent)

In `Modal.vue`
```javascript
<template>
    <div class="backdrop" @click="closeModal">
        <div class="modal"></div>
    </div>
</template>

<script>
export default {
    methods: {
        closeModal() {
            this.$emit('close')
        }
    }
}
</script>
```
- when backdrop is clicked, method closeModal() is called and a custom event 'close' is emitted

In `App.vue`
```javascript
<template>
    <Modal @close="toggleModal"></Modal>
</template>

<script>
import Modal from './components/Modal.vue'
export default {
  components: { Modal },
  data() {
    return {
      showModal: false
    }
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal
    }
  }
}
</script>
```
- Modal element takes a 'close' parameter which runs toggleModal() function when the custom event is emitted

**Adding arguments to emit**
Child - `$emit('add', Math.random(), 44, 50)`
Parent - `@add="custom_function(i, j, k)"`
- passes 3 arguments into custom_function in parent which takes 3 arguments i, j, k.

#### Click Event Modifiers
- Attach modifier to click event: .<event_name> after click
- Example: `<button @click.right="toggleModal">Show Modal</button>`
    - modifies so only triggers on right click
- Example: `<div class="backdrop" @click.self="closeModal">`
    - only applies if you click on the class, not elements inside/outside
- [documentation](https://devdocs.io/vue~3/guide/essentials/event-handling#event-modifiers)


#### Slots
- Used to pass templates into components
- Pass more complex data than props
- Pass template between the component tags, then within the component file define where you want the template to go using `<slot></slot>`

Example
In `App.vue`
```javascript
<Modal
    @close="toggleModal"
>
    <h1>Header Here</h1>
    <p>Para, para, paragraph</p>
</Modal>
```
- the h1, p makes up the template
- If you use another Modal template somewhere else, you can pass in a different template and it will be rendered where the slot tag is

In `Modal.vue`
```javascript
<div class="modal">
    <h2>Some info here</h2>
    <h3>blah blah</h3>
    <slot></slot>
</div>
```
- Causes the h1 and p template to appear under the h3 in the modal component

**Named Slot**
- If you want some elements from the passed in template at a different location from the rest of the template
- `<template v-slot:name>`

In `App.vue`
```javascript
<Modal
    @close="toggleModal"
>
    <template v-slot:link>
        <a href="www.google.com">google link</a>
    </template>
    <h1>Header Here</h1>
    <p>Para, para, paragraph</p>
</Modal>
```
- default template outside named template always gets populated at `<slot>`
- named template (`link` in this case) gets populated

In `Modal.vue`
```javascript
<div class="modal">
    <h2>Some info here</h2>
    <h3>blah blah</h3>
    <slot></slot>
    <div class="namedSlot">
        <slot name="link"></slot>
    </div>
</div>
```
- Causes the h1 and p template to appear under the h3 in the modal component

**Default Content**
- If you put content between the `<slot></slot>` tags, it becomes default content that only populates if you don't pass anything through the default slot of the component (eg. `<Modal></Modal>`)
    - eg. `<slot>Default Content</slot>`
- Applies even if a named slot is passed as long as nothing is passed through the default slot.
    - eg. you would still see default content here since there is no default slot:
```javascript
<Modal
    @close="toggleModal"
>
    <template v-slot:link>
        <a href="www.google.com">google link</a>
    </template>
</Modal>
```

#### Teleport
- Lets us send template code to places in the DOM outside our view app
- Enables independent rendering of components so it does not have to depend on styling from parent 
Example
```javascript
<teleport to="#target">
    <!--template you want to send goes here-->
</teleport>
```
- sends template to a div with class target outside of `<div id="app"></div>` in `index.html`
- also works with ids: `to=".target"` sends it to a div with id=target
- can also just send to `body` with `to="body"`