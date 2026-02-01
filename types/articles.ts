export type ReactionType = 'like' | 'heart' | 'dislike';

export interface ReactionState {
  liked: boolean;
  hearted: boolean;
  disliked: boolean;
}

export interface ArticleWithReactions {
  id: number;
  title: string;
  content: string;
  authorId: number;
  likes: number;
  hearts: number;
  dislikes: number;
  reactions: ReactionState;
}
