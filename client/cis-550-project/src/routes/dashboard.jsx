// import { Zoom } from 'react-awesome-reveal';

import { Box, DataTable, PageHeader, Spinner } from 'grommet';
import { songs_by_artist_1weekbillboard } from '../network.js';
import { useState, useEffect } from 'react';

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

export default function Dashboard() {
  const [songs, setSongs] = useState([
    {
      song_name: <Spinner size="medium" />,
      song_id: 0,
      peak_rank: <Spinner size="medium" />,
      album: <Spinner size="medium" />,
      explicit: 1,
      duration_ms: 0,
      time: <Spinner size="medium" />,
      song_year: <Spinner size="medium" />,
      artist: <Spinner size="medium" />,
    },
  ]);

  useEffect(() => {
    const fechData = async () => {
      console.log('useEffectCalled');
      let temp_1 = await songs_by_artist_1weekbillboard('Dua Lipa');
      temp_1 = temp_1.map((elem) => {
        let ret = elem;
        ret.artist = 'Dua Lipa';
        ret.time = millisToMinutesAndSeconds(ret.duration_ms);
        return ret;
      });

      let temp_2 = await songs_by_artist_1weekbillboard('Harry Styles');
      temp_2 = temp_2.map((elem) => {
        let ret = elem;
        ret.artist = 'Harry Styles';
        ret.time = millisToMinutesAndSeconds(ret.duration_ms);
        return ret;
      });

      let temp_3 = await songs_by_artist_1weekbillboard('Michael Jackson');
      temp_3 = temp_3.map((elem) => {
        let ret = elem;
        ret.artist = 'Michael Jackson';
        ret.time = millisToMinutesAndSeconds(ret.duration_ms);
        return ret;
      });

      let temp_4 = await songs_by_artist_1weekbillboard('Lizzo');
      temp_4 = temp_4.map((elem) => {
        let ret = elem;
        ret.artist = 'Lizzo';
        ret.time = millisToMinutesAndSeconds(ret.duration_ms);
        return ret;
      });

      let temp_5 = await songs_by_artist_1weekbillboard('Ed Sheeran');
      temp_5 = temp_5.map((elem) => {
        let ret = elem;
        ret.artist = 'Ed Sheeran';
        ret.time = millisToMinutesAndSeconds(ret.duration_ms);
        return ret;
      });

      let temp_6 = await songs_by_artist_1weekbillboard('BTS');
      temp_6 = temp_6.map((elem) => {
        let ret = elem;
        ret.artist = 'BTS';
        ret.time = millisToMinutesAndSeconds(ret.duration_ms);
        return ret;
      });

      let temp_7 = await songs_by_artist_1weekbillboard('Adele');
      temp_7 = temp_7.map((elem) => {
        let ret = elem;
        ret.artist = 'Adele';
        ret.time = millisToMinutesAndSeconds(ret.duration_ms);
        return ret;
      });

      const data = [].concat(
        temp_1,
        temp_2,
        temp_3,
        temp_4,
        temp_5,
        temp_6,
        temp_7
      );

      setSongs(data);
    };
    fechData();
  }, []);

  return (
    <Box
      fill
      align="center"
      justify="start"
      pad="large"
      gap="medium"
      animation="fadeIn"
    >
      <PageHeader
        title="Trending Songs"
        subtitle="Browse through song data from top trending artists."
      />
      <DataTable
        sort={{ property: 'song_name' }}
        sortable={true}
        size="medium"
        columns={[
          {
            property: 'song_name',
            header: 'Name',
            primary: true,
            pin: true,
          },
          {
            property: 'artist',
            header: 'Artist',
          },
          {
            property: 'peak_rank',
            header: 'Peak Rank',
          },
          {
            property: 'album',
            header: 'Album',
          },
          {
            property: 'time',
            header: 'Durration',
          },
          {
            property: 'song_year',
            header: 'Year',
          },
        ]}
        data={songs}
      />
    </Box>
  );
}
