export interface IUser {
  name: string;
  surname: string;
  login: string;
  password: string;
  id: number;
  picture?: string;
  cover?: string | null;
}

export type NewUser = Omit<IUser, "id">;
export type AuthUser = Pick<IUser, "login" | "password">;
export type UpdateLoginUser = {
  password: string;
  newLogin: string;
};
export type UpdatePasswordUser = {
  oldPassword: string;
  newPassword: string;
};
//export type UpdateLoginUser = Pick<IUser, "login">;
export interface IResponse<T = unknown> {
  status: string;
  message: string;
  payload: T;
}
export interface Icom {
  id: number;
  content: string;
  user: Omit<IUser, "login" | "password">;
  postId: number;
  userId: number;
}
export interface IPost {
  picture: string;
  id: number;
  likes: IUser[];
  comments: Omit<Icom, "postId" | "userId">[];
  userId: number;
  title: string;
}

export type Account = Omit<IUser, "password" | "login"> & {
  posts: IPost[];
  folowers: IUser[];
  folowing: IUser[];
  available: boolean;
  cover: null | IUser;
  isPrivate: number;
};

export interface IPropsIpost {
  post: IPost;
  user: IUser;
  onHandleDelete: (id: number) => void;
}

export interface IContext {
  account: IUser & {
    cover: string | null;
    followers: IUser[];
    following: IUser[];
    isPrivate: number;
  };
  reqCount: number;
  setAccount: (user: IUser) => void;
  setReqCount: (count: number) => void;
}

export interface IComment {
  post: {
    id: number;
    postId: number;
    user: IUser;
  };
}

type ICommUser = Omit<IUser, "password" | "login">;

export interface IComm {
  comments: Omit<IComment, "postId" | "user" | "post"> &
    {
      content: string;
      user: ICommUser;
      id: number;
    }[];
  likes: Omit<IUser, "login" | "password"> &
    {
      cover: string | null;
      id: number;
      isPrivate: number;
    }[];
  id: number;
  picture: string;
  title: string;
  userId: number;
}

export interface IAccountInfo {
  id: number;
  name: string;
  surname: string;
  isPrivate: number;
  cover: null | string;
  picture: null | string;
  available: boolean;
  connection: {
    following: boolean;
    folowsMe: boolean;
    requested: boolean;
    blockedMe: boolean;
    didIBlock: boolean;
  };
  followers: Omit<IUser, "login" | "password"> &
    {
      cover: null | string;
      isPrivate: number;
    }[];
  following: Omit<IUser, "login" | "password"> &
    {
      cover: null | string;
      isPrivate: number;
    }[];
  posts: IPost[];
}
export interface User {
  id: number;
  picture: string;
  cover: null | string;
  isPrivate: number;
  name: string;
  surname: string;
}

export interface IReqUser {
  id: number;
  user: User;
}
