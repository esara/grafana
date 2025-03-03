import { SceneAppPage } from '@grafana/scenes';
import { prefixRoute } from '../../utils/utils.routing';
import { ROUTES } from '../../constants';
import { humidityOverviewScene } from './humidityOverviewScene';
import { loginAuth } from 'components/App/App';

export function humidityOverviewPage(roomName: string) {
  loginAuth();
  return new SceneAppPage({
    title: 'Humidity',
    url: `${prefixRoute(ROUTES.WithDrilldown)}/room/${roomName}/humidity`,
    getScene: () => humidityOverviewScene(roomName),
  });
}
