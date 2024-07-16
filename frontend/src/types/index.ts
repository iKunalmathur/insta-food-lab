export type T_Post<T_Image = FileList> = {
  uuid?: string;
  title: string;
  images: T_Image;
  description: string;
  price_and_quantity: string;
  location: string;
  tags: string;
  rating: number;
  created_at: string;
  is_comment_disabled: boolean;
  user?: T_User;
};

export type T_Image = {
  uuid: string;
  original_url: string;
  extension: string;
  size: number;
  order: number;
};

export type T_User = {
  uuid: string;
  avatar: string;
  name: string;
  email: string;
  created_at: string;
};

export type T_REQ_METHOD = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
