<template>
    <div>
        <button
            type="button"
            class="btn btn-outline-secondary"
            @click="goToUserListPage"
        >back</button>

        <ProgressLoader
            v-if="isLoading"
            :progress="100"
        />

        <FailedStatus
            v-else-if="isFailed"
            :message="errorMessage"
        />

        <NotFound
            v-else-if="userNotFound"
            message="no such user found!"
        />

        <EditingForm
            :user="userDetails"
            v-else
        />
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { Component, Prop } from 'vue-property-decorator';

    import FailedStatus from '../UserList/FailedStatus.vue';
    import ProgressLoader from '../UserList/ProgressLoader.vue';
    import NotFound from './NotFound.vue';
    import EditingForm from './EditingForm.vue';
    import { User, LoadingStatus } from '../../../models/users';
    import { getUserById } from '../../../services/get-user-by-id';


    @Component({
        components: {
            FailedStatus, ProgressLoader, NotFound, EditingForm
        }
    })
    export default class UserDetails extends Vue {

        @Prop()
        userId!: string;

        userDetails: User | null = null; 
        loadingStatus = LoadingStatus.Initial;
        errorMessage: string | null = null;

        get isLoading(): boolean {
            return this.loadingStatus === LoadingStatus.Loading;
        }

        get isFailed(): boolean {
            return this.loadingStatus === LoadingStatus.Failed;
        }

        get isSuccessAndUserDetailsExists(): boolean {
            return this.isSuccess && !!this.userDetails;
        }

        get userNotFound(): boolean {
            return this.isSuccess && !this.userDetails;
        }

        private get isSuccess(): boolean {
            return this.loadingStatus === LoadingStatus.Success;
        }

        mounted() {
            this.loadingStatus = LoadingStatus.Loading;
            getUserById(this.userId)
                .then(details => {
                    this.loadingStatus = LoadingStatus.Success;
                    this.userDetails = details;
                })
                .catch(err => {
                    this.loadingStatus = LoadingStatus.Failed;
                    this.errorMessage = err.message;
                });
        }

        goToUserListPage() {
            this.$emit('goToUserListPage');
        }

    }
</script>

