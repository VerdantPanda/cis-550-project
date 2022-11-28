import {
  Grommet,
  Anchor,
  Box,
  Button,
  Menu,
  PageHeader,
  Page,
  PageContent,
  ResponsiveContext,
  Sidebar,
  Text,
  Stack,
  Avatar,
  Grid,
  Nav,
} from 'grommet';

import { Microphone, Music, Gamepad, Sign, Home } from 'grommet-icons';

// import { Fade, Slide, AttentionSeeker } from 'react-awesome-reveal';

export default function Root() {
  const SidebarButton = ({ icon, label, onClick }) => (
    <Box pad="medium" fill={true}>
      <Button
        primary
        gap="medium"
        alignSelf="start"
        plain
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
          elevation: 'medium',
        }}
        onClick={onClick}
      />
    </Box>
  );

  const MainNavigation = () => (
    <Nav aria-label="main navigation" responsive={false} fill={true}>
      <SidebarButton icon={<Home />} label="Home" />
      <SidebarButton icon={<Music />} label="Search for a Song" />
      <SidebarButton icon={<Microphone />} label="Seach for an Artist" />
      <SidebarButton icon={<Sign />} label="Recommendations" />
      <SidebarButton icon={<Gamepad />} label="Trivia" />
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
          <Box gridArea="main" background="light-2" />
        </Grid>
      </Grommet>
    </div>
  );
}
