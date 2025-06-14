import axios from 'axios';
import { FediverseClient, Post } from './FediverseClient';

export class PiefedClient extends FediverseClient {
  constructor(public baseurl: string, protected token?: string) {
    super(baseurl, token);
  }

  async getInstance() {
    const { data } = await axios.get(`${this.baseurl}/instance`);
    return data;
  }

  async login(username: string, password: string): Promise<{ token: string }> {
    const { data } = await axios.post(`${this.baseurl}/api/alpha/user/login`, {
      username,
      password,
    });
    this.token = data.jwt;
    return { token: data.jwt };
  }

  authHeaders() {
    if (!this.token) throw new Error("Not logged in");
    return { Authorization: `Bearer ${this.token}` };
  }

  async getPosts({ page = 0, limit = 10 } = {}): Promise<Post[]> {
    const data = await this.fetchJson<any>(`/api/alpha/post/list?type_=All&sort=Active&page=${page}&limit=${limit}`);
    return data.posts.map((p: any) => ({
      id: p.post.id,
      title: p.post.title,
      body: p.post.body,
      score: p.counts.score,
      comments: p.counts.comments,
      thumbnail: p.post.thumbnail_url,
      community: p.community.title,
      creator: p.creator.user_name
    }));
  }
}