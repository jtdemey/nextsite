import 'regenerator-runtime/runtime';
import React from 'react';
import { Provider } from 'react-redux';
import PageHead from '../components/PageHead';
import imposterStore from '../components/imposter/redux/imposterStore';
import ImposterApp from '../components/imposter/ImposterApp';
import initImposter from '../components/imposter/socket/socketClient';

const ImposterPage = () => {
  return (
    <>
      <PageHead
        title="Imposter!"
        styleLinks={[
          'https://fonts.googleapis.com/css2?family=Oleo+Script&family=Source+Sans+Pro:wght@600&display=swap'
        ]}
      />
      <Provider store={imposterStore}>
				<ImposterApp initImposter={initImposter} />
			</Provider>
    </>
  );
};

export default ImposterPage;