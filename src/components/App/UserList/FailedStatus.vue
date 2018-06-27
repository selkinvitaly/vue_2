<template>
    <div class="alert alert-danger" role="alert">
        {{message}}
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { Component, Prop } from 'vue-property-decorator';


    @Component
    export default class FailedStatus extends Vue {
        
        @Prop()
        message!: number;

    }

</script>

