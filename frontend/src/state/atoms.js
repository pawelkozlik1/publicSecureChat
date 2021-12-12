import { atom } from 'recoil';

export const userState = atom({
    key: 'userState',
    default: {
        id: null,
        username: null,
        roleId: null,
        topic_id: null,
    },
});
