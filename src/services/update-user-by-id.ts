import { User } from '../models/users';


export class HttpError extends Error {

    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }

}

export function updateUserById(uuid: string, newUser: User): Promise<null> {
    return fetch(`/api/v1/users/${uuid}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })
        .then(res => {
            if (res.status === 204) {
                return null;
            }

            if (res.status === 400) {
                return new Promise<any>((_resolve, reject) => {
                    res.json()
                        .then((data: { error: string }) => {
                            // error with validation server message
                            throw new HttpError(data.error, res.status);
                        })
                        .catch(reject);
                });
            }

            throw new HttpError('an error occurred while updating user', res.status);
        })
        .catch((err: Error) => {
            console.error(err);
            throw err;
        });
}
