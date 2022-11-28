import {
  Grommet,
  Box,
  Button,
  PageHeader,
  Sidebar,
  Grid,
  Nav,
  Notification,
} from 'grommet';

import { Outlet, useNavigate } from 'react-router-dom';

import { Microphone, Music, Gamepad, Sign, Analytics } from 'grommet-icons';

import { useEffect, useState } from 'react';

// import { Slide } from 'react-awesome-reveal';

export default function Root() {
  const navigate = useNavigate();
  const [functCount, setFunctCount] = useState(0);
  useEffect(() => {
    if (functCount === 0) {
      navigate('dashboard');
      setFunctCount(functCount + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [visible, setVisible] = useState(true);

  const SidebarButton = ({ icon, label, click, tip }) => (
    <Box pad="medium" fill={true}>
      <Button
        primary
        gap="medium"
        alignSelf="start"
        tip={tip}
        // plain
        icon={icon}
        label={label}
        fill={true}
        size="large"
        focusIndicator={true}
        hoverIndicator={{
          background: {
            opacity: 'strong',
            size: 'cover',
          },
          elevation: 'xlarge',
        }}
        onClick={click}
      />
    </Box>
  );

  const MainNavigation = () => (
    <Nav aria-label="main navigation" responsive={false} fill={true}>
      <SidebarButton
        click={() => navigate('dashboard')}
        icon={<Analytics />}
        label="Dashboard"
        tip="View the music data"
      />
      <SidebarButton
        click={() => navigate('songs')}
        icon={<Music />}
        label="Songs"
        tip="Search for a song"
      />
      <SidebarButton
        click={() => navigate('artists')}
        icon={<Microphone />}
        label="Artists"
        tip="Seach for an artist"
      />
      <SidebarButton
        click={() => navigate('recommendations')}
        icon={<Sign />}
        label="Recommendations"
        tip="Get recommendations based on your tastes"
      />
      <SidebarButton
        click={() => navigate('trivia')}
        icon={<Gamepad />}
        label="Trivia"
        tip="Play a music trivia game"
      />
    </Nav>
  );

  return (
    <div>
      <Grommet
        background={'neutral-2'}
        full={true}
        theme={{
          global: {
            colors: {
              custom: '#ff99cc',
              custom1: '#800080',
              custom2: '#D3D3D3',
            },
          },
        }}
      >
        <Notification
          toast={{
            autoClose: true,
            position: 'top-right',
          }}
          title="Welcome to the Music Movie Dashboard"
          message="TODO: add intoduction text. This is an example of a toast notification"
          onClose={() => setVisible(false)}
          status="info"
        />
        <Grid
          fill="vertical"
          rows={['xsmall', 'large']}
          columns={['medium', 'xlarge']}
          gap="small"
          areas={[
            { name: 'header', start: [0, 0], end: [1, 0] },
            { name: 'nav', start: [0, 1], end: [0, 1] },
            { name: 'main', start: [1, 1], end: [1, 1] },
          ]}
          border={{
            color: 'purple',
            size: 'medium',
            style: 'solid',
            side: 'top',
          }}
        >
          {/* <Box gridArea="header" background="brand">
          </Box> */}
          <PageHeader
            title="Movie Music Dashboard"
            subtitle="Please select a page."
            gridArea="header"
            size="small"
          />
          <Box gridArea="nav" background="light-5">
            <Sidebar
              responsive={true}
              background="light-2"
              pad={{ vertical: 'medium' }}
            >
              <MainNavigation />
            </Sidebar>
          </Box>
          <Box gridArea="main" background="light-2">
            <Outlet />
          </Box>
        </Grid>
      </Grommet>
    </div>
  );
}
