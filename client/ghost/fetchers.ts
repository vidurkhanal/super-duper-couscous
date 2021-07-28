import { ghost } from "./setup";

export async function getAllPosts() {
  return ghost.posts
    .browse({
      include: ["authors", "tags"],
      limit: "15",
    })
    .catch((err) => {
      console.error(err);
    });
}

export async function getSinglePost(postSlug: string) {
  return ghost.posts
    .read(
      {
        slug: postSlug,
      },
      { include: ["authors", "tags"] }
    )
    .catch((err) => {
      console.error(err);
    });
}
