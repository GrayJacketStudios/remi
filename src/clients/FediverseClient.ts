export abstract class FediverseClient {
  protected constructor(public baseUrl: string, protected token?: string){}

  abstract getPosts(params?: { page?: number; limit?: number }): Promise<Post[]>;

  async login(username: string, password: string): Promise<{ token: string }>{
    throw new Error('Login system not implemented yet for this platform.');
  }

  protected getAuthHeaders() {
    return this.token ? { Authorization: `Bearer ${this.token}` } : {};
  }

  protected async fetchJson<T>(path: string, options: RequestInit = {}): Promise<T> {
    const headers: HeadersInit = {
      Accept: 'application/json',
      ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
      ...(options.headers || {})
    };

    const res = await fetch(`${this.baseUrl}${path}`, {
      headers,
      ...options
    });

    if (!res.ok) {
      throw new Error(`Request failed: ${res.status}`);
    }

    return res.json();
  }

  votePost?(postId: string, voteType: string): Promise<void>;
  savePost?(postId: string): Promise<void>;
  followCommunity?(follow: boolean): Promise<void>;
  getPost?(postId: string): Promise<Post>;
  getPostComments?(postId: string): Promise<PostComment>;
  hidePost?(postId: string): Promise<void>;
  blockUser?(userId: string): Promise<void>;
  blockCommunity?(communityId: string): Promise<void>;
  unblockUser?(userId: string): Promise<void>;
  unblockCommunity?(communityId: string): Promise<void>;
  getUser?(userId: string): Promise<any>;
  getUserPosts?(userId: string): Promise<Post>;
  getCommunityPosts?(communityId: string): Promise<Post[]>;
  getCommunity?(communityId: string): Promise<Community>;
  getSearch?(type: string, sort: string, listing_type: string, page: number, limit: number): Promise<Post[]>;
  
}

export type PostMeta = {
  id: number;
  title: string;
  body?: string;
  published: string;
  url?: string;
  thumbnail_url?: string;
};

export type PostCounts = {
  comments: number;
  upvotes: number;
  downvotes: number;
  score: number;
};

export type Post = {
  id: number;
  title: string;
  body?: string;
  published: string;
  url?: string;
  thumbnail?: string;
  community: Community;
  creator: Creator;
  counts: PostCounts;
};

export type GetLatestPostsParams = {
  instance: string;
  page?: number;
  limit?: number;
  sort?: 'Active' | 'New' | 'Top' | 'Hot';
  type_?: 'All' | 'Local' | 'Subscribed';
  token?: string;
};

interface Comments {
  comment: Comment;
  creator: Creator;
  post: PostComment;
  community: Community;
  counts: CommentsCounts;
  creator_banned_from_community: boolean;
  banned_from_community: boolean;
  creator_is_moderator: boolean;
  creator_is_admin: boolean;
  subscribed: string;
  saved: boolean;
  activity_alert: boolean;
  creator_blocked: boolean;
  my_vote: number;
}

interface CommentsCounts {
  comment_id: number;
  score: number;
  upvotes: number;
  downvotes: number;
  published: string;
  child_count: number;
}

interface Community {
  actor_id: string;
  ap_domain?: string;
  banned?: boolean;
  banner?: string;
  deleted?: boolean;
  description?: string;
  hidden?: boolean;
  icon?: string;
  id: number;
  instance_id?: number;
  local?: boolean;
  name: string;
  nsfw?: boolean;
  published?: string;
  removed?: boolean;
  restricted_to_mods?: boolean;
  title: string;
  updated?: string;
}

interface PostComment {
  id: number;
  title: string;
  url: string;
  body: string;
  creator_id: number;
  community_id: number;
  removed: boolean;
  locked: boolean;
  published: string;
  updated: string;
  deleted: boolean;
  nsfw: boolean;
  thumbnail_url: string;
  ap_id: string;
  local: boolean;
  language_id: number;
  sticky: boolean;
  alt_text: string;
}

interface Creator {
  actor_id: string;
  avatar?: string;
  banned: boolean;
  banner: string;
  bot: boolean;
  deleted: boolean;
  id: number;
  instance_id: number;
  local: boolean;
  published: string;
  title?: string;
  user_name: string;
}

interface Comment {
  id: number;
  creator_id: number;
  post_id: number;
  content: string;
  removed: boolean;
  published: string;
  updated: string;
  deleted: boolean;
  ap_id: string;
  local: boolean;
  path: string;
  distinguished: boolean;
  language_id: number;
}