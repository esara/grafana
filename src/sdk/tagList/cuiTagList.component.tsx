import React from 'react';
import { CuiTag } from '../tag/cuiTag.component';
import './cuiTagList.scss';
import { SdkUtil } from 'sdk/sdk.util';

interface TagListProps {
  tags: string[];
  className?: string;
}

export const CuiTagList: React.FC<TagListProps> = ({ tags, className = '' }) => {
  return (
    <div className={SdkUtil.withPrefix('tag-list') + ' ' + className}>
      {tags.map((tag) => (
        <CuiTag key={tag}>{tag}</CuiTag>
      ))}
    </div>
  );
};
