<template>
    <div>
        <ProgressLoader
            v-if="isLoading"
            :progress="100"
        />
        <FailedStatus
            v-if="isFailed"
            :message="errorMessage"
        />
        <table v-if="isSuccess" class="table table-sm">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Avatar</th>
                </tr>
            </thead>

            <tbody>
                <tr
                    v-for="(user, index) in users"
                    is="UserItem"
                    :user-id="user.uuid"
                    @viewUser="viewUserDetails"
                    :key="user.uuid"
                    :index="index"
                    :title="user.titleName"
                    :avatar-src="user.avatarUrl"
                    :first-name="user.firstName"
                    :last-name="user.lastName"
                ></tr>
            </tbody>
        </table>
        
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { Component } from 'vue-property-decorator';

    import ProgressLoader from './ProgressLoader.vue';
    import FailedStatus from './FailedStatus.vue';
    import UserItem from './UserItem.vue';
    import { User, LoadingStatus } from '../../../models/users';
    import { getUsers } from '../../../services/get-users';


    @Component({
        components: {
            ProgressLoader, FailedStatus, UserItem
        }
    })
    export default class UserList extends Vue {

        users: User[] = [];
        loadingStatus = LoadingStatus.Initial;
        errorMessage: string | null = null;

        get isLoading(): boolean {
            return this.loadingStatus === LoadingStatus.Loading;
        }

        get isFailed(): boolean {
            return this.loadingStatus === LoadingStatus.Failed;
        }

        get isSuccess(): boolean {
            return this.loadingStatus === LoadingStatus.Success && !!this.users.length;
        }

        mounted() {
            this.loadingStatus = LoadingStatus.Loading;
            getUsers()
                .then(users => {
                    this.loadingStatus = LoadingStatus.Success;
                    this.users = users;
                })
                .catch(err => {
                    this.loadingStatus = LoadingStatus.Failed;
                    this.errorMessage = err.message;
                });
        }

        viewUserDetails(userId: string): void {
            this.$emit('viewUser', userId);
        }

    }
</script>

