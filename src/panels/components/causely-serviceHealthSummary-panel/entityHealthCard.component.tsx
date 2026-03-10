import React, { FC, ReactElement } from 'react';
import { Card } from '@grafana/ui';
import { RouteUtil } from 'utils/route/route.util';
import { useOpenNewTab } from 'hooks/useOpenNewTab.hook';
import { SdkUtil } from 'sdk/sdk.util';

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
    
    const openNewTab = useOpenNewTab();
    
    const handleOnClick = () => {
        openNewTab(RouteUtil.getServicesRoute());
    };

    return (
    <div className={SdkUtil.withPrefix('entity-health-card')}>
        <Card id="causely-entity-health-card"
                onClick={handleOnClick}>
            <Card.Heading>
                {title}
            </Card.Heading>
            <Card.Description>
                <p className={SdkUtil.withPrefix('entity-health-card__content')}>
                    <span
                      className={`${SdkUtil.withPrefix(`entity-health-card__severity-${severity.toLowerCase()}`)} ${SdkUtil.withPrefix('entity-health-card__count')}`}
                    >
                      {count}
                    </span>
                    <span className={SdkUtil.withPrefix('entity-health-card__percentage')}>({percentage})</span>
                    <span className={SdkUtil.withPrefix('entity-health-card__total')}>{`out of ${total} ${label.toLowerCase()}.`}</span>
                </p>
                {rootCauseCount > 0 && (
                        <p className={SdkUtil.withPrefix('entity-health-card__rootcause-summary')}>{`Caused by ${rootCauseCount} root cause(s).`}</p>
                )}
            </Card.Description>
        </Card>
    </div>
  );
}
