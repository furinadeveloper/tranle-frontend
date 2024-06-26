import { create } from "zustand";
import { PostType, Store } from "./types";
import { instance } from "./config";
import { toast } from "react-toastify";
import { _redirect } from "./action";
interface IUserState {
  user: any;
  loading: boolean;
  logout : () => Promise<void>;
  setUser: () => Promise<void>;
}
interface postsStateProps {
  myPost : [],
  posts : PostType[],
  detailPost : PostType,
  getMyPost : (userId : string) => Promise<void>,
  setPost : () => Promise<void>,
  setDetailPost : (id : any) => Promise<void>
}
interface commentsStateProps {
  comments : [],
  maxCount : number,
  setCommentInpost : (postId :any,page?:number) => Promise<void>,
}
export const store = create<Store>((set) => ({
  isOpen: false,
  isOpenMenu: (option: boolean) => set({ isOpen: option }),
}));
export const userState = create<IUserState>((set) => ({
  user: null,
  loading: false,
  setUser: async () => {
    const res = await instance.get("/account/");
    if (res.data.code === 200) {
      set({ user: res.data.data });
    }
    set({ loading: true });
  },
  logout : async () => {
    await instance.post('/account/logout/');
    set({user : null });
    toast.success('Dang xuat thanh cong');
    _redirect('/')
  }
}));
export const postState = create<postsStateProps>((set) => ({
    posts : [],
    myPost : [],
    detailPost : null,
    getMyPost : async(userId : string) => {
        const res = await instance.post(`/post/me?userId=${userId}`);
        if (res.data.code ===200) {
           set({myPost : res.data.data})
        }
    },
     setPost : async () => {
      const res = await instance.get("/post/");
      if (res.data.code === 200) {
        set({ posts: res.data.data });
      }
    },
    setDetailPost : async (id:any) => {
      const res = await instance.get(`/post?id=${id}`);
      if (res.data.code  ===200) {
        set({detailPost : res.data.data})
      }
    }
 
}))
export const commentStore = create<commentsStateProps>((set) =>({
  comments : [],
  maxCount : 0,
  setCommentInpost : async(postId : any,page ?:number) => {
    const res = await instance.get(`/comment?postId=${postId}&count=${3}&page=${page}`);
    if (res.data.code === 200) {
      set({comments : res.data.data })
      set({maxCount : res.data.count})
    }
  },
}))