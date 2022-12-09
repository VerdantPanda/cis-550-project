// import { Zoom } from 'react-awesome-reveal';

import { Box, InfiniteScroll, Text, Button, DataTable, Meter} from 'grommet';

// import { search_song_by_name } from '../network.js';
// import { Favorite, ShareOption } from 'grommet-icons';
// import { useState, useEffect } from 'react';

export default function Dashboard() {
  return (
    <Box
      fill
      align="center"
      justify="start"
      pad="large"
      gap="medium"
      animation="fadeIn"
    >
      <DataTable
        columns={[
          {
            property: 'name',
            header: <Text>Name</Text>,
            primary: true,
          },
          {
            property: 'percent',
            header: 'Complete',
            render: (datum) => (
              <Box pad={{ vertical: 'xsmall' }}>
                <Meter
                  values={[{ value: datum.percent }]}
                  thickness="small"
                  size="small"
                />
              </Box>
            ),
          },
        ]}
        data={[
          { name: 'Alan', percent: 20 },
          { name: 'Bryan', percent: 30 },
          { name: 'Chris', percent: 40 },
          { name: 'Eric', percent: 80 },
        ]}
      />
    </Box>
  );
}
