import type { MicroCMSQueries } from "microcms-js-sdk";
import { createClient } from "microcms-js-sdk";
import type { Blog } from "@/types/blog";

export const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
});
// ブログ一覧を取得
export const getBlogList = async (queries?: MicroCMSQueries) => {
  return await client.getList<Blog>({
    endpoint: "blogs",
    queries,
  });
};

// ブログ詳細を取得
export const getBlogDetail = async (
  contentId: string,
  queries?: MicroCMSQueries,
) => {
  return await client.getListDetail<Blog>({
    endpoint: "blogs",
    contentId,
    queries,
  });
};
