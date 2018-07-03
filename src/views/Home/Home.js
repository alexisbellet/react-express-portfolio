import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import axios from 'axios';
import styles from './Home.css';
import RootWrapper from '../../shared/hoc/rootWrapper';
import Layout from '../Layout/Layout';
import mainPhoto from '../../shared/images/alexis-bellet.png';
import AnimatedScrollList from '../../components/AnimatedScrollList/AnimatedScrollList';
import SocialMediaIconList from '../../components/SocialMediaIconList/SocialMediaIconList';
import SocialMediaIconHelper from '../../components/SocialMediaIconList/SocialMediaIconHelper';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      projects: []
    }
  }
  
  componentDidMount() {
    axios.get('/api/projects').then((response) => {
      if (response.data && Array.isArray(response.data))
        this.setState({ projects: response.data, isLoading: false});
    }).catch((err) => {
      alert(err);
    });
  }

  render() {
    const leftContainerContent = (
      <AnimatedScrollList isLoading={this.state.isLoading} projects={this.state.projects} />
    );
    const rightContainerContent = (
      <RootWrapper>
        <img src={mainPhoto} className={styles.Portrait} alt="Alexis Bellet" />
        <div className={styles.Title}>Hi, my name is Alexis Bellet!<br />I am a Web Developer, based in Toronto, Canada</div>
        <div className={styles.Subtitle}>Check out my projects and get in touch!</div>
        <div className={styles.LinkContainer}>
          <SocialMediaIconList icons={[SocialMediaIconHelper.twitter, SocialMediaIconHelper.linkedin, SocialMediaIconHelper.github]}/>
        </div>
      </RootWrapper>
    );
    return (
      <Layout leftContainerContent={leftContainerContent} rightContainerContent={rightContainerContent} />
    )
  }
}

export default CSSModules(Home);