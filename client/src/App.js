import { useState } from 'react';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import Intensity from './components/Intensity';
import Likelihood from './components/Likelihood';
import Relevance from './components/Relevance';
import Year from './components/Year';
import Topics from './components/Topics';
import Country from './components/Country';
import Region from './components/Region';
import Impact from './components/Impact';


function App() {

  return (
    <Box display="flex" justifyContent="space-between" flexDirection="column">
      <Typography align="center" variant="h4" m="1rem auto 2rem">React Visulization Chart</Typography>

      <Box display="flex" width="100%" flexWrap="wrap" justifyContent="space-evenly">
        <Box width="45%" mt={3}>
          <Intensity />
        </Box>

        <Box width="45%" mt={3}>
         <Likelihood />
        </Box>

      </Box>

      <Box display="flex" width="100%" flexWrap="wrap" justifyContent="space-evenly">
        <Box width="45%" mt={3}>
         <Relevance />
        </Box>

        <Box width="45%" mt={3}>
         <Year />
        </Box>
      </Box>

      <Box display="flex" width="100%" flexWrap="wrap" justifyContent="space-evenly">
        <Box width="45%" mt={3}>
         <Topics />
        </Box>

        <Box width="45%" mt={3}>
         <Country />
        </Box>
      </Box>

      <Box display="flex" width="100%" flexWrap="wrap" justifyContent="space-evenly">
        <Box width="45%" mt={3}>
         <Region />
        </Box>

        <Box width="45%" mt={3}>
         <Impact />
        </Box>
      </Box>

    </Box>
  );
}


export default App;
