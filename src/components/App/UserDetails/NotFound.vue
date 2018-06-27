<template>
    <div class="alert alert-warning" role="alert">
        {{message}}
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { Component, Prop } from 'vue-property-decorator';


    @Component
    export default class NotFound extends Vue {
        
        @Prop()
        message!: number;

    }

</script>

