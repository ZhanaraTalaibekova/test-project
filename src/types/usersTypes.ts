export interface Users {
  id: number;
  firstName: string;
  lastName: string;
  country: string;
  isFavorite?: boolean;
  userImage?: File | null | string | undefined;
}

export interface UsersResponse {
  data: Users[];
}

