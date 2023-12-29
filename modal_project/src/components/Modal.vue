<template>
    <div class="backdrop">
        <div class="modal" :class="{ emphasize: theme === 'emphasize'}">
            <h1>{{ header }}</h1>
            <p>{{ desc }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: ['header','desc','theme']
}
</script>

<style>
    .modal {
        width: 400px;
        padding: 20px;
        margin: 100px auto;
        background: white;
        border-radius: 10px;
    }
    .backdrop {
        top: 0;
        position: fixed;
        background: rgba(0, 0, 0, 0.5);
        width: 100%;
        height: 100%;
    }
    .modal.emphasize {
        background: blue;
        color: yellow;
    }
    .modal.emphasize p {
        font-style: normal;
    }
</style>