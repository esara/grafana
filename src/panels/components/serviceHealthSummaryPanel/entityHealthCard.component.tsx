import React, { FC, ReactElement } from 'react';
import { Card } from '@grafana/ui';

import './entityHealthCard.scss'

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

    return (
    <div className={'entity-health-card'}>
        <Card href={hrefLink} id="causely-entity-health-card"
            // @ts-ignore : open link in separate tab
              target="_blank"
              rel="noopener noreferrer">
            <Card.Heading>

                {title}
            </Card.Heading>
            <Card.Description>
                <p className={'content'}>
                    <span className={`severity-${severity.toLowerCase()} count`}>{count}</span>
                    <span className={'percentage'}>({percentage})</span>
                    <span className={'total'}>{`out of ${total} ${label.toLowerCase()}.`}</span>
                </p>
                {rootCauseCount > 0 && (
                        <p className={'rootcause-summary'}>{`Caused by ${rootCauseCount} root cause(s).`}</p>
                )}
            </Card.Description>
        </Card>
    </div>
  );
}
