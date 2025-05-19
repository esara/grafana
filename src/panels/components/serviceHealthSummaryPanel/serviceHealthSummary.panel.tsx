import React from 'react';
import { PanelProps } from '@grafana/data';
import { CuiRenderWhenAuthenticated } from 'sdk/renderWhenAuthenticated/cuiRenderWhenAuthenticated.component';
import { ServiceHealthSummaryContent } from './serveHealthSummaryContent.component';
interface Props extends PanelProps<void> { }

const ServiceHealthSummaryPanel: React.FC<Props> = () => {
  return (
    <CuiRenderWhenAuthenticated>
      <ServiceHealthSummaryContent/>
    </CuiRenderWhenAuthenticated>
  );
};

export default ServiceHealthSummaryPanel;
