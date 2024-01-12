<template>
    <div class="backdrop" @click.self="closeModal">
        <div class="modal" :class="{ emphasize: theme === 'emphasize'}">
            <h1>{{ header }}</h1>
            <p>{{ desc }}</p>
            <slot></slot>
            <div class="actions">
                <slot name="links"></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['header','desc','theme'],
    methods: {
        closeModal() {
            this.$emit('close')
        }
    }
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
    .modal .actions a {
        color: green;
        font-size: 32px;
    }
    .modal.emphasize .actions a {
        color: white;
        font-size: 32px;
    }
</style>