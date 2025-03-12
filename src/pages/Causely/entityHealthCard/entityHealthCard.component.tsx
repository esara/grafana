import React, { FC, ReactElement } from 'react';
import { ClickableTile, Heading, Section} from '@carbon/react';

import ('./entityHealthCard.scss');

export type EntityHealthCardData = {
    title: string;
    percentage: string;
    severity: string;
    count: number;
    rootCauseCount: number;
    total: number;
};

type EntityHealthCardProps = {
  data: EntityHealthCardData;
  label: string;
};

export const EntityHealthCard: FC<EntityHealthCardProps> = (
  props: EntityHealthCardProps,
): ReactElement => {
  const { data, label } = props;
  const { severity, count, total, percentage, rootCauseCount, title } = data;

  const hrefLink = 'https://portal.causely.app/observe/services'
  // @ts-ignore
    return (
    <div className={'entity-health-card'}>
      <ClickableTile href={hrefLink} id="clickable-tile-1"
                     target="_blank" //open link in separate tab
                     rel="noopener noreferrer">
        <Section level={5}>
          <Heading>{title}</Heading>
          <Section>
            <p className={'content'}>
              <span className={`severity-${severity.toLowerCase()} count`}>{count}</span>
              <span className={'percentage'}>({percentage})</span>
              <span className={'total'}>{`out of ${total} ${label.toLowerCase()}.`}</span>
            </p>
          </Section>
            {rootCauseCount > 0 && (
                <Section>
                    <p className={'rootcause-summary'}>{`Caused by ${rootCauseCount} root cause(s).`}</p>
                </Section>
            )}
        </Section>
      </ClickableTile>
    </div>
  );
}
