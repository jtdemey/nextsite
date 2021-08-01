import PageHead from "../components/PageHead";
import HeaderContainer from "../components/projects/HeaderContainer";

const ProjectsPage = () => (
  <div>
    <PageHead title="JTD // Projects" styleLinks={[
			'https://fonts.googleapis.com/css?family=Abel|Ubuntu|Vollkorn&display=swap',
			'styles/projects.css'
		]} />
		<HeaderContainer />
  </div>
);

export default ProjectsPage;