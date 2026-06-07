'use client';

import { useState, useCallback } from 'react';
import { articles as articlesData } from '@/data/articles';
import { authors } from '@/data/authors';
import ArticleCard from './ArticleCard';
import { ArticleWithReactions, ReactionType, ReactionState } from '@/types/articles';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const authorsMap = Object.fromEntries(authors.map((a) => [a.id, a]));

const DEFAULT_REACTION: ReactionState = { liked: false, hearted: false, disliked: false };

export default function ArticlesSection() {
  const [savedReactions, setSavedReactions] = useLocalStorage<Record<number, ReactionState>>(
    'article-reactions',
    {}
  );

  const [articles, setArticles] = useState<ArticleWithReactions[]>(() =>
    articlesData.map((a) => {
      const reactions = savedReactions[a.id] ?? DEFAULT_REACTION;
      return {
        ...a,
        likes: (a.likes ?? 0) + (reactions.liked ? 1 : 0),
        dislikes: (a.dislikes ?? 0) + (reactions.disliked ? 1 : 0),
        hearts: (a.hearts ?? 0) + (reactions.hearted ? 1 : 0),
        reactions,
      };
    })
  );

  const handleReaction = useCallback(
    (id: number, type: ReactionType) => {
      setArticles((prev) =>
        prev.map((article) => {
          if (article.id !== id) return article;

          const prev_r = article.reactions;
          const key = type === 'like' ? 'liked' : type === 'heart' ? 'hearted' : 'disliked';
          const next_r: ReactionState = { liked: false, hearted: false, disliked: false };
          next_r[key] = !prev_r[key];

          const likes = article.likes + (next_r.liked ? 1 : 0) - (prev_r.liked ? 1 : 0);
          const hearts = article.hearts + (next_r.hearted ? 1 : 0) - (prev_r.hearted ? 1 : 0);
          const dislikes = article.dislikes + (next_r.disliked ? 1 : 0) - (prev_r.disliked ? 1 : 0);

          return { ...article, likes, hearts, dislikes, reactions: next_r };
        })
      );

      setSavedReactions((prev) => {
        const article = articles.find((a) => a.id === id);
        if (!article) return prev;

        const prev_r = article.reactions;
        const key = type === 'like' ? 'liked' : type === 'heart' ? 'hearted' : 'disliked';
        const next_r: ReactionState = { liked: false, hearted: false, disliked: false };
        next_r[key] = !prev_r[key];

        return { ...prev, [id]: next_r };
      });
    },
    [articles, setSavedReactions]
  );

  return (
    <section className="bg-card rounded-xl p-5 shadow-sm space-y-4">
      <h2 className="text-xl font-bold text-primary">📖 مقالات دينية مختارة</h2>
      <div className="space-y-4">
        {articles.map((article) => {
          const author = authorsMap[article.authorId];
          return (
            <ArticleCard
              key={article.id}
              article={article}
              onReact={handleReaction}
              authorName={author?.name}
              authorAvatar={author?.avatar}
            />
          );
        })}
      </div>
    </section>
  );
}
