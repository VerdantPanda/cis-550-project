import { Grommet, Box, Button, PageHeader, Sidebar, Grid, Nav } from 'grommet';

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

  const SidebarButton = ({ icon, label, click }) => (
    <Box pad="medium" fill={true}>
      <Button
        primary
        gap="medium"
        alignSelf="start"
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
      />
      <SidebarButton
        click={() => navigate('songs')}
        icon={<Music />}
        label="Search for a Song"
      />
      <SidebarButton
        click={() => navigate('artists')}
        icon={<Microphone />}
        label="Seach for an Artist"
      />
      <SidebarButton
        click={() => navigate('recommendations')}
        icon={<Sign />}
        label="Recommendations"
      />
      <SidebarButton
        click={() => navigate('trivia')}
        icon={<Gamepad />}
        label="Trivia"
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
            title="Song & Movie Recommendations Project"
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
