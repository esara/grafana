import { EmbeddedScene, SceneFlexLayout, SceneFlexItem, PanelBuilders } from '@grafana/scenes';
import { loginAuth } from 'components/App/App';

export function helloWorldScene() {

  loginAuth();
  return new EmbeddedScene({
    body: new SceneFlexLayout({
      children: [
        new SceneFlexItem({
          width: '100%',
          height: 300,
          body: PanelBuilders.text().setTitle('Hello world panel').setOption('content', 'Hello world!').build(),
        }),
      ],
    }),
  });
}
