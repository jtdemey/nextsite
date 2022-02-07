import Head from 'next/head';
import PropTypes from 'prop-types';

const PageHead = props => (
  <Head>
    <title>{props.title}</title>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=1"
    />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link rel="icon" type="image/x-icon" href="favicon.ico" />
    {props.styleLinks &&
      props.styleLinks.map((href, i) => (
        <link
          key={i}
          rel="stylesheet"
          type="text/css"
          media="screen"
          href={href}
        />
      ))}
  </Head>
);

PageHead.propTypes = {
  styleLinks: PropTypes.array,
  title: PropTypes.string
};

export default PageHead;