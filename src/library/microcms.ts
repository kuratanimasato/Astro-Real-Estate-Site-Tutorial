import type { MicroCMSQueries } from "microcms-js-sdk";
import { createClient } from "microcms-js-sdk";
import type { Blog } from "@/types/blog";

const serviceDomain = import.meta.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = import.meta.env.MICROCMS_API_KEY;

// 環境変数が未設定、またはダミー値の場合はダミーデータを使用する
const isDummy = !serviceDomain || !apiKey || serviceDomain === "dummy" || apiKey === "dummy" || serviceDomain.includes("ABC") || apiKey.includes("ABC");

export const client = isDummy ? null : createClient({
  serviceDomain,
  apiKey,
});

const mockBlogs: any[] = [
  {
    id: "dummy-post-1",
    title: "テスト用ダミー記事 1",
    slug: "dummy-post-1",
    description: "これは GitHub Actions などの CI/CD ビルド検証用のダミー記事です。",
    content: "<p>ダミーの本文コンテンツです。ダミー環境変数を使用してビルドされています。</p>",
    eyecatch: {
      url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80",
      height: 600,
      width: 800,
    },
    category: {
      id: "dummy-cat",
      name: "お知らせ",
      slug: "news",
    },
    categories: [
      {
        id: "dummy-cat",
        name: "お知らせ",
        slug: "news",
      }
    ],
    createdAt: "2026-07-14T12:00:00Z",
    updatedAt: "2026-07-14T12:00:00Z",
    publishedAt: "2026-07-14T12:00:00Z",
    revisedAt: "2026-07-14T12:00:00Z",
  }
];

// ブログ一覧を取得
export const getBlogList = async (queries?: MicroCMSQueries) => {
  if (isDummy || !client) {
    return {
      contents: mockBlogs,
      totalCount: mockBlogs.length,
      offset: 0,
      limit: 10,
    };
  }
  try {
    return await client.getList<Blog>({
      endpoint: "blogs",
      queries,
    });
  } catch (error) {
    console.warn("microCMS getList failed. Using mock data.", error);
    return {
      contents: mockBlogs,
      totalCount: mockBlogs.length,
      offset: 0,
      limit: 10,
    };
  }
};

// ブログ詳細を取得
export const getBlogDetail = async (
  contentId: string,
  queries?: MicroCMSQueries,
) => {
  if (isDummy || !client) {
    const blog = mockBlogs.find(b => b.id === contentId) || mockBlogs[0];
    return blog;
  }
  try {
    return await client.getListDetail<Blog>({
      endpoint: "blogs",
      contentId,
      queries,
    });
  } catch (error) {
    console.warn(`microCMS getListDetail for ${contentId} failed. Using mock data.`, error);
    const blog = mockBlogs.find(b => b.id === contentId) || mockBlogs[0];
    return blog;
  }
};

