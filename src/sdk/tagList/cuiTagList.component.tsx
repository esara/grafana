import React from 'react';
import { css } from '@emotion/css';
import { useStyles2 } from '@grafana/ui';
import clsx from 'clsx';
import { CuiTag } from '../tag/cuiTag.component';

interface TagListProps {
  tags: string[];
  className?: string;
}

export const CuiTagList: React.FC<TagListProps> = ({ tags, className = '' }) => {
  const styles = useStyles2((theme) =>
    css({
      display: 'flex',
      flexDirection: 'row-reverse',
      alignItems: 'center',
      gap: theme.spacing(1),
    }),
  );
  return (
    <div className={clsx(styles, className)}>
      {tags.map((tag) => (
        <CuiTag key={tag}>{tag}</CuiTag>
      ))}
    </div>
  );
};
