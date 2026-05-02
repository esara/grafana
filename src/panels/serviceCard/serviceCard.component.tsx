import React from 'react';
import { ServiceCardEntity } from 'panels/components/causely-serviceCard-panel/serviceCards/useServiceCardsApi';
import { CUIHeading } from 'sdk/heading/cui-heading.component';
import { CUISection } from 'sdk/section/cuiSection.component';
import { CUISectionDescription } from 'sdk/sectionDescription/cuiSectionDescription.component';
import { CUIText } from 'sdk/text/cui-text.component';
import { RouteUtil } from 'utils/route/route.util';
import { ObjectsUtil } from 'utils/objects/objects.util';
import { DefectsUtil } from 'utils/defects/defects.util';
import { EntityTypeDefs } from 'utils/entityTypeDefs/EntityTypeDefs.singleton';
import { ArraysUtil } from 'utils/arrays/arrays.util';
import { CUIRenderWhen } from 'sdk/cuiRenderWhen/coreRenderWhen.component';
import { SloConnectionComponent } from './sloConnection/sloConnection.component';
import { useOpenNewTab } from 'hooks/useOpenNewTab.hook';
import { Divider, useStyles2 } from '@grafana/ui';
import { EntityUtil } from 'utils/entity/entity.util';
import { ServiceUtil } from 'utils/service/service.util';
import { ApiDefect } from 'api/api.types';
import { css } from '@emotion/css';
import { colorManipulator, GrafanaTheme2 } from '@grafana/data';

interface ServiceCardProps {
  serviceCardEntity: ServiceCardEntity;
}

const getServiceCardStyles = (theme: GrafanaTheme2) => ({
  card: css({
    cursor: 'pointer',
  }),
  rootCauseContainer: css({
    color: colorManipulator.alpha(theme.colors.error.main, 0.85),
  }),
  sloHeading: css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    width: '100%',
  }),
  sloLabel: css({
    flex: 1,
  }),
  budgetLabel: css({
    float: 'right',
  }),
  textUrgent: css({
    color: theme.colors.error.text,
  }),
});

export const ServiceCardComponent: React.FC<ServiceCardProps> = ({ serviceCardEntity }) => {
  const openNewTab = useOpenNewTab();
  const styles = useStyles2(getServiceCardStyles);

  const relatedDefects = serviceCardEntity.relatedDefects;
  const noRootCauses =
    ArraysUtil.isEmpty(relatedDefects?.aggregatingDefects) &&
    ArraysUtil.isEmpty(relatedDefects?.directDefects) &&
    ArraysUtil.isEmpty(relatedDefects?.impactingDefects);

  const sloConnection = serviceCardEntity.sloConnections;

  const entityTypeDefs = EntityTypeDefs.getInstance();
  const activeSymptoms = serviceCardEntity.symptoms.filter((symptom) => symptom.active);

  const rootCauseCount =
    relatedDefects?.aggregatingDefects?.length +
    relatedDefects?.directDefects?.length +
    relatedDefects?.impactingDefects?.length;

  const renderCUISectionDescription = (value: React.ReactNode, extraClass?: string) => {
    return (
      <CUISectionDescription>
        <CUIText variant="secondary" className={extraClass}>
          {value}
        </CUIText>
      </CUISectionDescription>
    );
  };

  const renderCUISectionDescriptionWithUrgentHighlight = (value: React.ReactNode, defect: ApiDefect) => {
    const isUrgent = defect ? DefectsUtil.isUrgent(defect) : false;
    if (isUrgent) {
      return renderCUISectionDescription(value, styles.textUrgent);
    }
    return renderCUISectionDescription(value);
  };

  return (
    <div
      className={styles.card}
      onClick={() => {
        openNewTab(RouteUtil.getSingleTopologyRoutePath(serviceCardEntity.id));
      }}
    >
      <CUIHeading>{EntityUtil.simplifyEntityname(serviceCardEntity)}</CUIHeading>
      <CUISectionDescription>
        <CUIText variant="secondary">{ServiceUtil.getNameSpaceAndClusterNameInfo(serviceCardEntity)}</CUIText>
      </CUISectionDescription>
      <Divider />

      <CUISection>
        <CUIHeading>{rootCauseCount < 2 ? 'Root Cause' : `Root Causes (${rootCauseCount})`}</CUIHeading>
        <CUIRenderWhen condition={ObjectsUtil.isUnset(relatedDefects)}>
          <CUISectionDescription>
            <CUIText variant="secondary">No related defects</CUIText>
          </CUISectionDescription>
        </CUIRenderWhen>

        <CUIRenderWhen condition={noRootCauses}>
          {renderCUISectionDescription('No root cause identified impacting this service')}
        </CUIRenderWhen>

        <CUIRenderWhen condition={!noRootCauses}>
          <div className={styles.rootCauseContainer}>
            <CUIRenderWhen condition={relatedDefects?.aggregatingDefects?.length > 0}>
              {relatedDefects?.aggregatingDefects?.map((defect) =>
                renderCUISectionDescriptionWithUrgentHighlight(DefectsUtil.defectOnEntityDescription(defect), defect),
              )}
            </CUIRenderWhen>
            <CUIRenderWhen condition={relatedDefects?.directDefects?.length > 0}>
              {relatedDefects?.directDefects?.map((defect) =>
                renderCUISectionDescriptionWithUrgentHighlight(DefectsUtil.defectOnEntityDescription(defect), defect),
              )}
            </CUIRenderWhen>
            <CUIRenderWhen condition={relatedDefects?.impactingDefects?.length > 0}>
              {relatedDefects?.impactingDefects?.map((defect) =>
                renderCUISectionDescriptionWithUrgentHighlight(
                  `Cross-Service Root Cause - ${DefectsUtil.defectOnEntityDescription(defect)}`,
                  defect,
                ),
              )}
            </CUIRenderWhen>
          </div>
        </CUIRenderWhen>
      </CUISection>

      <Divider />

      <CUISection>
        <CUIHeading>Symptoms</CUIHeading>
        <CUIRenderWhen condition={ArraysUtil.isEmpty(activeSymptoms)}>
          {renderCUISectionDescription('No active symptoms on this service')}
        </CUIRenderWhen>
        <CUIRenderWhen condition={ArraysUtil.isNotEmpty(activeSymptoms)}>
          {serviceCardEntity.symptoms
            .filter((symptom) => symptom.active)
            .map((symptom) => (
              <div key={symptom.id}>
                {renderCUISectionDescription(
                  entityTypeDefs.getSymptomDef(serviceCardEntity.typeName, symptom.name).displayName,
                )}
              </div>
            ))}
        </CUIRenderWhen>
      </CUISection>

      <Divider />

      <CUISection>
        <CUIHeading className={styles.sloHeading}>
          <span className={styles.sloLabel}>SLO</span>
          <span className={styles.budgetLabel}>Budget</span>
        </CUIHeading>
        <CUIRenderWhen condition={ArraysUtil.isEmpty(sloConnection)}>
          {renderCUISectionDescription('No traffic observed for this service')}
        </CUIRenderWhen>
        <CUIRenderWhen condition={ArraysUtil.isNotEmpty(sloConnection)}>
          {sloConnection?.map((slo) => (
            <div key={slo.id}>{renderCUISectionDescription(<SloConnectionComponent slo={slo} />)}</div>
          ))}
        </CUIRenderWhen>
      </CUISection>
    </div>
  );
};
