'use client';

import { Button } from '@/components/ui/button';
import { Heart, ThumbsUp } from 'lucide-react';

type ReactionType = 'like' | 'dislike' | 'heart';

interface ReactionButtonProps {
  type: ReactionType;
  count: number;
  active: boolean;
  onClick: () => void;
}

const ReactionButton = ({ type, count, active, onClick }: ReactionButtonProps) => {
  const Icon = type === 'heart' ? Heart : ThumbsUp;

  const colorClass =
    type === 'like'
      ? active
        ? 'text-blue-500'
        : 'text-gray-400'
      : type === 'dislike'
        ? active
          ? 'text-red-500'
          : 'text-gray-400'
        : active
          ? 'text-red-500'
          : 'text-gray-400';

  const rotateClass = type === 'dislike' ? 'rotate-180' : '';

  return (
    <Button variant="secondary" size="sm" onClick={onClick}>
      <Icon className={`h-4 w-4 transition-colors duration-200 ${colorClass} ${rotateClass}`} />{' '}
      {count}
    </Button>
  );
};

export default ReactionButton;
