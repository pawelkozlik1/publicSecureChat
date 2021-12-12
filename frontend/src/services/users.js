/* eslint-disable camelcase */
import ApiService from './api';

class UsersService extends ApiService {
    async getUsers(skip = 0, limit = 100) {
        return this.get(`/api/1/users?skip=${skip}&limit=${limit}`);
    }

    async getUser(userId) {
        return this.get(`/api/1/users/${userId}`);
    }

    async getUserName(userName) {
        return this.get(`/api/1/users/${userName}`);
    }

    async getUsersByTitleId(topic_id) {
        return this.get(`/api/1/users/topic/${topic_id}`);
    }

    async createUser(username, password) {
        return this.post(`/api/1/users`, { username, password });
    }

    async editUserTopic(userName, topic_id) {
        return this.put(`/api/1/users/${userName}`, topic_id);
    }

    async updateUserRole(editUser) {
        return this.put(`/api/1/users/user/${editUser.username}`, editUser);
    }

    async validateUser() {
        return this.post('/api/1/users/validate');
    }

    async loginUser(username, password) {
        return this.post(`/api/1/users/login`, { username, password });
    }

    async logoutUser() {
        return this.post(`/api/1/users/logout`);
    }

    async deleteUser(id) {
        return this.delete(`/api/1/users/${id}`, {id});
    }

}

const UsersAPI = new UsersService();

export default UsersAPI;
