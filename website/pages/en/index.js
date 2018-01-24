/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');
const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const siteConfig = require(process.cwd() + '/siteConfig.js');

function imgUrl(img) {
  return siteConfig.baseUrl + 'img/' + img;
}

function docUrl(doc, language) {
  return siteConfig.baseUrl + 'docs/' + (language ? language + '/' : '') + doc;
}

function pageUrl(page, language) {
  return siteConfig.baseUrl + (language ? language + '/' : '') + page;
}

class Button extends React.Component {
  render() {
    return (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={this.props.href} target={this.props.target}>
          {this.props.children}
        </a>
      </div>
    );
  }
}

Button.defaultProps = {
  target: '_self',
};

const SplashContainer = props => (
  <div className="homeContainer">
    <div className="homeSplashFade">
      <div className="wrapper homeWrapper">{props.children}</div>
    </div>
  </div>
);

const Logo = props => (
  <div className="projectLogo">
    <img src={props.img_src} />
  </div>
);

const ProjectTitle = props => (
  <h2 className="projectTitle">
    {siteConfig.title}
    <small>{siteConfig.tagline}</small>
    <small>All you do is just create a API server and a OAS2.0 json file. Then VIRON admin tool is ready to use.</small>
    <small>You don't need to write frontend code!</small>
  </h2>
);

const PromoSection = props => (
  <div className="section promoSection">
    <div className="promoRow">
      <div className="pluginRowBlock">{props.children}</div>
    </div>
  </div>
);

class HomeSplash extends React.Component {
  render() {
    let language = this.props.language || '';
    return (
      <SplashContainer>
        {/*<Logo img_src={imgUrl('viron.svg')} />*/}
        <div className="inner">
          <ProjectTitle />
          <PromoSection>
            {/*<Button href="#try">Try It Out</Button>*/}
            <Button href={docUrl('demo.html', language)}>ドキュメント</Button>
            <Button href="https://cam-inc.github.io/viron/latest/" target="_blank">VIRON</Button>
            <Button href="https://github.com/cam-inc/viron/" target="_blank">GitHub</Button>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

const Block = props => (
  <Container
    padding={['bottom', 'top']}
    id={props.id}
    background={props.background}>
    <GridBlock align="center" contents={props.children} layout={props.layout} />
  </Container>
);

const Features = props => (
  <Block layout="fourColumn">
    {[
      {
        content: 'HTML、CSS、JavaScript等のフロント用ソースコードを記述する必要はありません。APIサーバのみを用意して下さい。',
        image: imgUrl('frontend.png'),
        imageAlign: 'top',
        title: 'フロントレス',
      },
      {
        content: 'デスクトップ端末とモバイル端末上で画面サイズに応じたレイアウトが設定されます。',
        image: imgUrl('responsive.png'),
        imageAlign: 'top',
        title: 'レスポンシブデザイン',
      },
      {
        content: 'OpenAPI Specification 2.0に準拠。',
        image: imgUrl('oas.png'),
        imageAlign: 'top',
        title: 'OAS駆動',
      },
      {
        content: 'GitHub上でオープンソースとして公開されています。誰でも無料で使用できます。',
        image: imgUrl('oss.png'),
        imageAlign: 'top',
        title: '無料/オープンソース',
      },
    ]}
  </Block>
);

const FeatureCallout = props => (
  <div
    className="productShowcaseSection paddingBottom"
    style={{textAlign: 'center'}}>
    <MarkdownBlock>These are features of this project</MarkdownBlock>
  </div>
);

const Demo = props => (
  <div>
    <img src={imgUrl('demo.gif')} style={{margin:'0 auto', display: 'block', width: '80%'}} />
  </div>
);

const LearnHow = props => (
  <Block background="light">
    {[
      {
        content: 'Talk about learning how to use this',
        image: imgUrl('viron.svg'),
        imageAlign: 'right',
        title: 'Learn How',
      },
    ]}
  </Block>
);

const TryOut = props => (
  <Block id="try">
    {[
      {
        content: 'Talk about trying this out',
        image: imgUrl('viron.svg'),
        imageAlign: 'left',
        title: 'Try it Out',
      },
    ]}
  </Block>
);

const Description = props => (
  <Block>
    {/*<Block background="dark">*/}
    {[
      {
        content: 'This is another description of how this project is useful',
        image: imgUrl('viron.svg'),
        imageAlign: 'right',
        title: 'Description',
      },
    ]}
  </Block>
);

const Showcase = props => {
  if ((siteConfig.users || []).length === 0) {
    return null;
  }
  const showcase = siteConfig.users
    .filter(user => {
      return user.pinned;
    })
    .map((user, i) => {
      return (
        <a href={user.infoLink} key={i}>
          <img src={user.image} title={user.caption} />
        </a>
      );
    });

  return (
    <div className="productShowcaseSection paddingBottom">
      <h2>{"Who's Using This?"}</h2>
      <p>This project is used by all these people</p>
      <div className="logos">{showcase}</div>
      <div className="more-users">
        <a className="button" href={pageUrl('users.html', props.language)}>
          More {siteConfig.title} Users
        </a>
      </div>
    </div>
  );
};

class Index extends React.Component {
  render() {
    let language = this.props.language || '';

    return (
      <div>
        <HomeSplash language={language} />
        <div className="mainContainer">
          <Demo />
          <Features />
          {/*<FeatureCallout />*/}
          {/*<LearnHow />*/}
          {/* <TryOut /> */}
          {/*<Description />*/}
          {/*<Showcase language={language} />*/}
        </div>
      </div>
    );
  }
}

module.exports = Index;
