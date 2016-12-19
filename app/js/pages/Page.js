import React from 'react';
import {
  View,
  NavBar,
} from 'amazeui-touch';
import {
  Link,
} from 'react-router';

import Page1 from './page1/index';
import Page3 from './page3/index';


const pages = {
  Page1,
  Page3,
};

class Page extends React.Component {
  render() {
    let page = this.props.params.page;
    // 使用 query
    console.log(this.props.location.query);

    if (page) {
      page = page.charAt(0).toUpperCase() + page.slice(1);
    }

    const Component = pages[page] || NotFound;
    const backNav = {
      component: Link,
      icon: 'left-nav',
      title: '返回',
      to: '/',
      onlyActiveOnIndex: true,
    };

    return (
      <View>
        <NavBar
          title={page}
          leftNav={[backNav]}
          amStyle="primary"
        />
        <Component scrollable />
      </View>
    );
  }
}

export default Page;
