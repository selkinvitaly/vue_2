<template>
    <div
        class="progress-bar progress-bar-striped progress-bar-animated"
        role="progressbar"
        :aria-valuenow="progress"
        aria-valuemin="0"
        aria-valuemax="100"
        style="width: 100%; height: 20px;"
    ></div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { Component, Prop } from 'vue-property-decorator';


    @Component
    export default class ProgressLoader extends Vue {
        
        @Prop()
        progress!: number;

    }

</script>
