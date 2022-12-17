import {
  Grommet,
  Box,
  Button,
  PageHeader,
  Sidebar,
  Grid,
  Nav,
  Layer,
  Text,
  Card,
  CardFooter,
  CardBody,
  CardHeader,
  Heading,
  Form,
  FormField,
  TextInput,
} from 'grommet';

import { Outlet, useNavigate } from 'react-router-dom';

import { Microphone, Music, Gamepad, Sign, Analytics } from 'grommet-icons';

import { useEffect, useState } from 'react';

import { login, create_user } from '../network.js';

// import { Slide } from 'react-awesome-reveal';

export default function Root() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: null,
    userid: '',
    favSongs: '',
  });
  const [functCount, setFunctCount] = useState(0);

  useEffect(() => {
    if (functCount === 0) {
      navigate('dashboard');
      setFunctCount(functCount + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [show, setShow] = useState(true);
  const [value, setValue] = useState({ username: '', password: '' });

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
        {show && (
          <Box>
            <Layer
              onEsc={() => setShow(false)}
              onClickOutside={() => setShow(false)}
            >
              <Card height="large" width="large" background="light-1">
                <CardHeader pad="medium">
                  <Heading>Welcome to Melody Match!</Heading>
                </CardHeader>
                <CardBody pad="medium">
                  <Text>
                    Our site aggregates and analyzes music data in order to
                    provide tailored recommendations based on user currrent
                    preferences.
                  </Text>
                  <br></br>

                  <Form
                    value={value}
                    onChange={(nextValue) => setValue(nextValue)}
                    onSubmit={async ({ value }) => {
                      // TODO: login
                      console.log('login button clicked');
                      const user = await login(value.username, value.password);
                      if (user.username) {
                        setUser(user);
                        setShow(false);
                        localStorage.setItem('userid', user.userid);
                      }
                    }}
                  >
                    <FormField name="username" label="Username">
                      <TextInput name="username" plain />
                    </FormField>
                    <br></br>
                    <FormField name="password" label="Password">
                      <TextInput name="password" plain />
                    </FormField>
                    <Box direction="row" gap="medium">
                      <Button type="submit" primary label="Login" />
                      <Button
                        primary
                        label="Sign Up"
                        onClick={async (e) => {
                          console.log('sign up clicked');
                          const newUser = await create_user(
                            value.username,
                            value.password
                          );
                          console.log('NEW USER SIGN UP');
                          console.log(newUser);
                          setUser(newUser);
                          setShow(false);
                          localStorage.setItem('userid', user.userid);
                        }}
                      />
                      {/* <Button type="reset" label="Reset" /> */}
                    </Box>
                  </Form>
                </CardBody>
                <CardFooter pad="small">
                  <Box alignContent="center" flex>
                    <Button
                      primary
                      label="Continue as guest"
                      onClick={() => setShow(false)}
                    />
                  </Box>
                </CardFooter>
              </Card>
            </Layer>
          </Box>
        )}
        <Box>
          <Grid
            // fill='vertical'
            rows={['xsmall', 'large']}
            columns={['medium', 'xlarge']}
            gap="small"
            areas={[
              { name: 'header', start: [0, 0], end: [1, 0] },
              { name: 'nav', start: [0, 1], end: [0, 1] },
              { name: 'main', start: [1, 1], end: [1, 1] },
            ]}
            // border={{
            //   color: 'purple',
            //   size: 'medium',
            //   style: 'solid',
            //   side: 'top',
            // }}
          >
            {/* <Box gridArea="header" background="brand">
          </Box> */}
            <Box gridArea="header">
              <PageHeader
                title="Melody Match"
                subtitle={
                  user.username ? (
                    <Text>
                      Welcome {user.username}!
                      {/* Your favorite songs are{' '} {user.favSongs}{' '} */}
                    </Text>
                  ) : (
                    <Text>For all your music related needs.</Text>
                  )
                }
                // gridArea="header"
                size="small"
              />
            </Box>

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
        </Box>
      </Grommet>
    </div>
  );
}
