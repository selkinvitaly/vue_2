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

        <form
            v-if="!isFailed"
        >
            <div class="form-group">
                <label for="edit-title-name">Title</label>
                <input
                    v-model="editableData.titleName"
                    :disabled="isLoading"
                    type="text"
                    class="form-control"
                    id="edit-title-name"
                    placeholder="Enter title (mr, ms etc.)"
                >
            </div>
            <div class="form-group">
                <label for="edit-first-name">First name</label>
                <input
                    v-model="editableData.firstName"
                    :disabled="isLoading"
                    type="text"
                    class="form-control"
                    id="edit-first-name"
                    placeholder="Enter your first name"
                >
            </div>

            <div class="form-group">
                <label for="edit-last-name">Last name</label>
                <input
                    v-model="editableData.lastName"
                    :disabled="isLoading"
                    type="text"
                    class="form-control"
                    id="edit-last-name"
                    placeholder="Enter your last name"
                >
            </div>

            <div class="form-group">
                <label for="edit-phone">Phone</label>
                <input
                    v-model="editableData.phone"
                    :disabled="isLoading"
                    type="text"
                    class="form-control"
                    id="edit-phone"
                    placeholder="Enter your phone"
                >
            </div>
            
            <button
                type="button"
                :class="{'btn': true, 'btn-outline-primary': buttonDisabled, 'btn-outline-success': !buttonDisabled}"
                :disabled="buttonDisabled"
                @click="updateUserById"
            >apply changes</button>
        </form>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { Component, Prop } from 'vue-property-decorator';

    import FailedStatus from '../UserList/FailedStatus.vue';
    import ProgressLoader from '../UserList/ProgressLoader.vue';
    import { User, LoadingStatus } from '../../../models/users';
    import { updateUserById } from '../../../services/update-user-by-id';


    @Component({
        components: {
            FailedStatus, ProgressLoader
        }
    })
    export default class EditingForm extends Vue {

        @Prop()
        user!: User;

        editableData: User = {
            ...this.user
        };

        lastSavedData: User = {
            ...this.user
        };

        loadingStatus = LoadingStatus.Initial;
        errorMessage: string | null = null;

        get isLoading(): boolean {
            return this.loadingStatus === LoadingStatus.Loading;
        }

        get isFailed(): boolean {
            return this.loadingStatus === LoadingStatus.Failed;
        }

        get isSuccess(): boolean {
            return this.loadingStatus === LoadingStatus.Success;
        }

        get buttonDisabled(): boolean {
            return this.isLoading || !this.formModified;
        }

        get formModified(): boolean {
            const equalPhones = this.editableData.phone === this.lastSavedData.phone;
            const equalTitles = this.editableData.titleName === this.lastSavedData.titleName;
            const equalFirstNames = this.editableData.firstName === this.lastSavedData.firstName;
            const equalLastNames = this.editableData.lastName === this.lastSavedData.lastName;
            return !equalPhones || !equalTitles || !equalFirstNames || !equalLastNames;
        }

        updateUserById() {
            this.loadingStatus = LoadingStatus.Loading;
            updateUserById(this.user.uuid, this.editableData)
                .then(() => {
                    this.lastSavedData = {
                        ...this.editableData
                    };
                    this.loadingStatus = LoadingStatus.Success;
                })
                .catch(err => {
                    this.loadingStatus = LoadingStatus.Failed;
                    this.errorMessage = err.message;
                });
        }

    }
</script>

