import { User } from '../models/users';


export function getUsers(): Promise<User[]> {
    return fetch(`/api/v1/users`)
        .then(res => res.json())
        .catch(err => {
            console.error(err);
            throw err;
        });
}
