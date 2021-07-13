import GhostContentAPI from "@tryghost/content-api";
import { BLOG_URL, CONTENT_API } from "../constants";

// Create API instance with site credentials
export const ghost = new GhostContentAPI({
  url: BLOG_URL,
  key: CONTENT_API,
  version: "v3",
});
