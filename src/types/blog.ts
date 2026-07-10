import type { MicroCMSClient } from "microcms-js-sdk";

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Eyecatch {
  url: string;
  height: number;
  width: number;
}

export interface Blog extends MicroCMSClient {
  id: string;
  title: string;
  slug: string;
  content: string;
  eyecatch: Eyecatch;
  categories: Category[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
}
