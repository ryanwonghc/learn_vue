<template>
    <h1>Job Details Page</h1>
    <p>The Job ID is {{ id }}</p>
    <button @click="redirectHome">Go Home</button>
    <button @click="back">Go Back</button>
</template>

<script>
export default {
    props: {
        id: Number
    }, 
    // data() {
    //     return {
    //         id: this.$route.params.id
    //     }
    // }
    methods: {
        redirectHome() {
            this.$router.push({ name: 'Home' })
        },
        back() {
            this.$router.go(-1)
        }
    }
}
</script>

<style>

</style>