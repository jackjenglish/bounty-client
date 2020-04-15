import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const AboutPageContainer = styled.div`
  height: 100%;
  width: 100%;
`;

const Background = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`;

const DarkSection = styled.div`
  position: absolute;
  width: 100%;
  height: 650px;
  -webkit-transform: skewY(12deg);
  transform: skewY(12deg);
  -webkit-transform-origin: 130%;
  transform-origin: 130%;
  background: -o-linear-gradient(240deg, #222222 15%, #373737 70%, #3c4859 94%);
  background: linear-gradient(-150deg, #222222 15%, #373737 70%, #3c4859 94%);
`;

class AboutPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    // const { } = this.props;

    // if (loading) {
    //   return <FeedPageContainer>Loading...</FeedPageContainer>;
    // }

    return (
      <AboutPageContainer className="">
        <Background>
          <DarkSection />
        </Background>
      </AboutPageContainer>
    );
  }
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AboutPage);
