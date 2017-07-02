import React from 'react';
import { Segment, Container, Header, Button, Icon } from 'semantic-ui-react';
import { css } from 'aphrodite-jss';
import styles from './styles';
import PublicNav from '../PublicNav';

function PublicHomeHero() {
  return (
    <Segment className={css(styles.hero)} textAlign="center" inverted vertical>
      <PublicNav />

      <Container text>
        <Header as="h1" inverted>Mercenary</Header>

        <h2>Do whatever you want when you want to.</h2>

        <Button size="huge" primary>
          Get Started <Icon name="arrow right" />
        </Button>
      </Container>
    </Segment>
  );
}

export default PublicHomeHero;
