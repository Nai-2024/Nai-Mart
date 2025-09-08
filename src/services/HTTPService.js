
// just for example 
export class HttpService {
  constructor(client) {
    this.client = client;
  }

  async post(url, body, config = {}) {
    try {
      const { data } = await this.client.post(url, body, config); // ✅ fixed
      return data;
    } catch (error) {                                             // ✅ fixed
      console.log(error);
      throw error;
    }
  }
}
