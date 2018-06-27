export interface User {
    uuid: string;
    avatarUrl: string | null;
    firstName: string;
    lastName: string;
    phone: string;
    titleName: string;
}

export enum LoadingStatus {
    Initial,
    Loading,
    Success,
    Failed
}
