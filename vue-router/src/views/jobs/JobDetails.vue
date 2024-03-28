<template>
    <div v-if="job">
        <h1>Job Details Page</h1>
        <p>The Job ID is {{ id }}, details are {{ job.details }}</p>
        <button @click="redirectHome">Go Home</button>
        <button @click="back">Go Back</button>
    </div>
    <div v-else>
        <p>Loading job details...</p>
    </div>
</template>

<script>
export default {
    props: {
        id: Number
    }, 
    data() {
        return {
            // id: this.$route.params.id
            job: null
        }
    },
    mounted() {
        fetch('http://localhost:3000/jobs/' + this.id)
            .then((res) => res.json())
            .then((data) => this.job = data)
            .catch((err) => console.log(err.message))
    },
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