<template>
    <tr>
        <th scope="row">{{index + 1}}</th>
        <td>
            <span
                @click="onUserNameClick(userId)"
                style="border-bottom:1px dotted;cursor:pointer"
            >{{fullName}}</span>
        </td>
        <td>
            <img
                v-if="hasAvatar"
                :src="avatarSrc"
                alt=""
            />
            <span v-else>default avatar</span>
        </td>
    </tr>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { Component, Prop } from 'vue-property-decorator';


    @Component
    export default class UserItem extends Vue {

        @Prop()
        userId!: string;

        @Prop()
        title!: string;

        @Prop()
        avatarSrc!: string | null;

        @Prop()
        firstName!: string;

        @Prop()
        lastName!: string;

        @Prop()
        index!: number;

        get hasAvatar(): boolean {
            return !!this.avatarSrc;
        }

        get fullName(): string {
            return `${this.title}. ${this.firstName} ${this.lastName}`;
        }

        onUserNameClick(): void {
            this.$emit('viewUser', this.userId);
        }

    }

</script>

