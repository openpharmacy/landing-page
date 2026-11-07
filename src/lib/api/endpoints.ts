/** Single source of truth for backend paths (relative to the API base URL). */
export const endpoints = {
  auth: {
    signup: "/auth/signup",
    signin: "/auth/signin",
    google: "/auth/google",
    me: "/auth/me",
  },
  products: {
    list: "/api/v1/products",
    detail: (id: string) => `/api/v1/products/${id}`,
    byBarcode: (barcode: string) => `/api/v1/products/by-barcode/${barcode}`,
    byScid: (scid: string) => `/api/v1/products/by-scid/${scid}`,
  },
  pharmacies: {
    list: "/api/v1/pharmacies",
    detail: (id: string) => `/api/v1/pharmacies/${id}`,
    inventory: (id: string) => `/api/v1/pharmacies/${id}/inventory`,
  },
} as const;
