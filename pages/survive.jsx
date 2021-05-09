import { Provider } from 'react-redux';
import PageHead from "../components/PageHead";
import SurviveApp from "../components/survive/SurviveApp";
import store from '../components/survive/redux/store';

const SurvivePage = () => (
  <div>
    <PageHead title="Survive." styleLinks={['https://fonts.googleapis.com/css2?family=DM+Sans&family=DM+Serif+Display&display=swap']} />
    <Provider store={store}>
      <SurviveApp />
    </Provider>
  </div>
);

export default SurvivePage;