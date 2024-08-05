export type T_PostCreate<GT_Image = FileList> = {
  title: string;
  description: string;
  price_and_quantity: string;
  location: string;
  tags: string;
  rating: number;
  created_at: string;
  is_comment_disabled: boolean;
  images: GT_Image;
};

export type T_Post = T_PostCreate<T_Image[]> & {
  uuid: string;
  user: T_User;
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

export type T_LoginUser = {
  email: string;
  password: string;
};

export type T_RegUser = T_LoginUser & {
  name: string;
};

export type T_REQ_METHOD = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
