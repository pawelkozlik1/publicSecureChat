/* eslint-disable camelcase */
import ApiService from './api';

class TopicsService extends ApiService {
  async Index() {
    return this.get('/api/2');
  }

  async addTopic(addTopic) {
    return this.post('/api/2', addTopic);
  }

  async getTopics() {
    return this.get('/api/2');
  }

  async getTopicByUserId(user_id) {
    return this.get(`/api/2/users/${user_id}`);
  }

  async getTopicById(topic_id) {
    return this.get(`/api/2/${topic_id}`);
  }

  async getTopicByTitle(title) {
    return this.get(`/api/2/${title}`);
  }

  async editTopic(editTopicConfig) {
    return this.put(`/api/2/${editTopicConfig.topic_id}`, editTopicConfig );
  }

  async deleteTopicById(topic_id) {
    return this.delete(`/api/2/${topic_id}`);
  }

  async deleteTopicByTitle(title) {
    return this.delete(`/api/2/${title}`);
  }
}

const TopicsApi = new TopicsService();

export default TopicsApi;