import { create } from "zustand";

export const usePostStyleStore = create(() => ({
  textOnly: false,
  hideThumbnails: false,
  expandImages: false,
  compactView: false,
}));

type PostStyle = {
  hideThumbnails: boolean;
  expandImages: boolean;
  textOnly: boolean;
  compactView: boolean;
};
