import React from 'react';
import { PanelProps } from '@grafana/data';
import { RenderWhenAuthenticated } from 'components/sdk/renderWhenAuthenticated/renderWhenAuthenticated.component';
import { ServiceHealthSummaryContent } from './serveHealthSummaryContent.component';
interface Props extends PanelProps<void> { }

const ServiceHealthSummaryPanel: React.FC<Props> = () => {
  return (
    <RenderWhenAuthenticated>
      <ServiceHealthSummaryContent/>
    </RenderWhenAuthenticated>
  );
};

export default ServiceHealthSummaryPanel;
