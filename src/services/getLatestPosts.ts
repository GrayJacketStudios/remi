import { GetLatestPostsParams, Post } from "../clients/FediverseClient";

export async function getLatestPosts({
  instance,
  page = 0,
  limit = 10,
  sort = "Active",
  type_ = "All",
  token,
}: GetLatestPostsParams): Promise<Post[]> {
  const url = `https://${instance}/api/alpha/post/list?type_=${type_}&sort=${sort}&page=${page}&limit=${limit}`;

  const headers: Record<string, string> = {
    accept: "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(url, { headers });
  if (!res.ok) {
    throw new Error(`Failed to fetch posts: ${res.statusText}`);
  }

  const json = await res.json();

  return (json.posts ?? []).map((item: any) => ({
    id: item.post.id,
    title: item.post.title,
    body: item.post.body,
    published: item.post.published,
    url: item.post.url || item.post.ap_id,
    thumbnail: item.post.thumbnail_url,
    community: {
      id: item.community.id,
      name: item.community.name,
      title: item.community.title,
      actor_id: item.community.actor_id,
      icon: item.community.icon,
    },
    creator: {
      user_name: item.creator.user_name,
      actor_id: item.creator.actor_id,
      avatar: item.creator.avatar,
      title: item.creator.title,
    },
    counts: {
      comments: item.counts.comments,
      upvotes: item.counts.upvotes,
      downvotes: item.counts.downvotes,
      score: item.counts.score,
    },
  }));
}
