import dynamic from 'next/dynamic';
import PageHead from "../components/PageHead";

const DynamicCanvas = dynamic(() => import('../components/homepage/RoomCanvas'), {
  loading: () => <h1 style={{width: '100%', height: '100%'}}>Loading</h1>
});

const RoomPage = () => (
  <div>
    <PageHead title="JT | Room" styleLinks={['homepage/homepage.css']} />
    <DynamicCanvas />
  </div>
);

export default RoomPage;