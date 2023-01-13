import { HttpClient } from "./HttpClient";

class Api {

  constructor() {
    this.httpClient = new HttpClient();
  }

  // USER
  async register(data) {
    return this.httpClient.post('/auth/register', data)
  }

  async signin(data) {
    return this.httpClient.post('/auth/signin', data)
  }

  async updateUserInfo(data) {
    return this.httpClient.patch(`/auth/update`, data)
  }

  async getCurrentuser() {
    return this.httpClient.get('/auth/whoami')
  }

  async signout() {
    return this.httpClient.post('/auth/signout')
  }

  async findAllUsers() {
    return this.httpClient.get('/auth/allUsers')
  }

  async findAllAdmins() {
    return this.httpClient.get('/auth/allAdmins')
  }

  // DEVICES
  async getDevices() {
    return this.httpClient.get(`/devices`)
  }

  async createDevice(data) {
    return this.httpClient.post('/devices/create', data)
  }

  async getDevice(id) {
    return this.httpClient.get(`/devices/${id}`)
  }

  async removeDevice(id) {
    return this.httpClient.delete(`/devices/${id}`)
  }

  async updateDevice(data) {
    return this.httpClient.patch(`/devices/${data.id}`, data)
  }
}

export const api = new Api()