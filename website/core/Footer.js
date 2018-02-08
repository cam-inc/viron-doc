/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

class Footer extends React.Component {
  docUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    // TODO: Need localization
    // return baseUrl + 'docs/' + (language ? language + '/' : '') + doc;
    return baseUrl + 'docs/' + doc;
  }

  pageUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + (language ? language + '/' : '') + doc;
  }

  render() {
    const currentYear = new Date().getFullYear();
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <div>
            <h5>Docs</h5>
            <a href={this.docUrl('demo.html', this.props.language)}>
              Demo
            </a>
            <a href={this.docUrl('demo.html', this.props.language)}>
              Getting Started
            </a>
          </div>
          <div>
            <h5>Community</h5>
            <a
              href="https://github.com/cam-inc/viron/issues"
              target="_blank">
              Issues
            </a>
            <a
              href="http://stackoverflow.com/questions/tagged/viron"
              target="_blank">
              Stack Overflow
            </a>
          </div>
          <div>
            <h5>More</h5>
            {/* TODO: Uncomment bellow if writte the blog */}
            {/* <a href={this.props.config.baseUrl + 'blog'}>Blog</a> */}
            <a href="https://github.com/cam-inc/viron">GitHub</a>
            <a
              className="github-button"
              href={this.props.config.repoUrl}
              data-icon="octicon-star">
              Star
            </a>
          </div>
        </section>
        <section className="copyright">
          {this.props.config.copyright}
        </section>
      </footer>
    );
  }
}

module.exports = Footer;
