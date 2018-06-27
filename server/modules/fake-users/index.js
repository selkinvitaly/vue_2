let users = [{
    uuid: '9d4b3485-f663-4323-9a30-dc970f07dcaa',
    titleName: 'miss',
    firstName: 'Lucy',
    lastName: 'Simons',
    phone: '(904)-886-6860',
    avatarUrl: 'https://randomuser.me/api/portraits/med/women/2.jpg'
}, {
    uuid: '128a2d2f-e239-4142-a578-069cd8ac54cb',
    titleName: 'mrs',
    firstName: 'Peppi',
    lastName: 'Salo',
    phone: '04-994-092',
    avatarUrl: 'https://randomuser.me/api/portraits/med/women/28.jpg'
}, {
    uuid: '1f8a66e4-c005-444f-b60e-34de9f4f025b',
    titleName: 'ms',
    firstName: 'Sophie',
    lastName: 'Kim',
    phone: '02-1202-5143',
    avatarUrl: 'https://randomuser.me/api/portraits/med/women/43.jpg'
}, {
    uuid: 'e7e9f6f3-879c-45fc-84ea-9ad074241392',
    titleName: 'ms',
    firstName: 'فاطمه',
    lastName: 'محمدخان',
    phone: '091-53432658',
    avatarUrl: null
}, {
    uuid: 'ef1f6cec-0c74-4a57-bac3-af98d2140158',
    titleName: 'miss',
    firstName: 'Erin',
    lastName: 'Perkins',
    phone: '061-482-9000',
    avatarUrl: 'https://randomuser.me/api/portraits/med/women/67.jpg'
}];


exports.getAll = function() {
    return users;
}

exports.getByUuid = function(uuid) {
    return users.find(u => u.uuid === uuid);
}

exports.replaceByUuid = function(uuid, newUser) {
    const indexForFoundUser = users.findIndex(u => u.uuid === uuid);

    if (indexForFoundUser === -1) {
        return;
    }

    users.splice(indexForFoundUser, 1, newUser);
    return users;
}

exports.removeByUuid = function(uuid) {
    return (
        users = users.filter(u => u.uuid !== uuid)
    );
}