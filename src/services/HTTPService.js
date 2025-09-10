
// just for example 
export class HttpService {
  constructor(client) {
    this.client = client;
  }

  async post(url, body, config = {}) {
    try {
      const { data } = await this.client.post(url, body, config);
      return data;
    } catch (error) {                                            
      console.log(error);
      throw error;
    }
  }
}
