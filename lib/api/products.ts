import axios from "axios";
import apiClient from "./client";
import { Product } from "@/lib/types/products";

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface GetProductsParams {
  limit?: number;
  skip?: number;
  search?: string;
  category?: string;
}

export const getProducts = async (
  params?: GetProductsParams
): Promise<ProductsResponse> => {
  const response = await apiClient.get<ProductsResponse>("/products", {
    params,
  });
  return response.data;
};

export const getProductById = async (id: number | string): Promise<Product> => {
  const response = await apiClient.get<Product>(`/products/${id}`);
  return response.data;
};

export const getProductsByCategory = async (
  category: string
): Promise<ProductsResponse> => {
  const response = await apiClient.get<ProductsResponse>(
    `/products/category/${category}`
  );
  return response.data;
};

export const searchProducts = async (
  query: string
): Promise<ProductsResponse> => {
  const response = await apiClient.get<ProductsResponse>("/products/search", {
    params: { q: query },
  });
  return response.data;
};

export const getFeaturedProducts = async (): Promise<ProductsResponse> => {
  return getProducts({ limit: 8 });
};
