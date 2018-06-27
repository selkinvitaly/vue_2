<template>
    <div>
        <UserDetails
            v-if="isUserDetailsPage"
            :user-id="currentUserId"
            @goToUserListPage="goToUserListPage"
        />
        <UserList
            v-else-if="isUserListPage"
            @viewUser="goToDetailsForUser"
        />
        <div v-else>not found page!</div>
    </div>
</template>

<script lang="ts">
    import * as qs from 'qs';
    import Vue from 'vue';
    import { Component } from 'vue-property-decorator';

    import UserList from './UserList/index.vue';
    import UserDetails from './UserDetails/index.vue';


    @Component({
        components: {
            UserList, UserDetails
        }
    })
    export default class App extends Vue {

        currentUserId: string | null = null;
        
        get isUserListPage(): boolean {
            return !this.currentUserId;
        }

        get isUserDetailsPage(): boolean {
            return !!this.currentUserId;
        }

        constructor() {
            super();
            const query = qs.parse(location.hash.slice(1));
            this.currentUserId = query.user || null;
        }

        goToDetailsForUser(userId: string): void {
            this.setPageHash(`user=${userId}`);
            this.currentUserId = userId;
        }

        goToUserListPage(): void {
            this.setPageHash('');
            this.currentUserId = null;
        }

        private setPageHash(hash: string): void {
            location.hash = hash;
        }

    }

</script>

