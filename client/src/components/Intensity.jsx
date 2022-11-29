import { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import { Paper, Typography, Select, FormControl, MenuItem, InputLabel } from '@mui/material';
import axios from 'axios';
import { ResponsiveContainer, LineChart, Line, Tooltip, YAxis, XAxis } from 'recharts';

const API = axios.create({baseURL: "https://dynamic-dashboard1.herokuapp.com/"});

export default function Intensity () {
    const [filter, setFilter] = useState('');
    const [intensity, setIntensity] = useState([]);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('Intensity')

    const fetchData = async (url) => {
        try {
            setLoading(true);
            await API.get(`/api/${url}`)
                .then((res) => {
                setIntensity(res.data.data.map((elem) => ({
                        name: elem._id.name,
                        value: elem.total
                    }))
                )
            })
            setLoading(false);
        } catch (error) {
            if(error) {
                alert(error.response.data.message)
            }
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData('intensity');
      }, [])


    const handleChange = (e) => {
        setFilter(e.target.value)
        fetchData(e.target.value)
    }
    
    return (
        <>
            <Box display="flex" width="100%" m="0 auto" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" color="gray" fontFamily="verdana">{!filter && title}</Typography>
            <FormControl sx={{minWidth: 200, backgroundColor: 'white'}}>
              <InputLabel id="select-label">Filter</InputLabel>
              <Select
                label="Filter"
                value={filter}
                onChange={(e) => handleChange(e)}
              >
                <MenuItem value="" sx={{color: 'gray'}}>None</MenuItem>
                <MenuItem value="end_year">End Year</MenuItem>
                <MenuItem value="topic" custom-name="Topics">Topics</MenuItem>
                <MenuItem value="sector">Sector</MenuItem>
                <MenuItem value="region">Region</MenuItem>
                <MenuItem value="pestle">PEST</MenuItem>
                <MenuItem value="source">Source</MenuItem>
                <MenuItem value="country">Country</MenuItem>
                <MenuItem value="city">City</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box component={Paper} elevation={6} width="100%" height="400px" m=".3rem auto 5rem">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart 
                    width={500}
                    height={400}   
                    data={intensity}
                    margin={{
                        top: 30,
                        right: 10,
                        left: 0,
                        bottom: 10,
                    }} 
                >
                    <Tooltip />
                    <XAxis dataKey="name" angle={0} axisLine={false} minTickGap={0} tickLine={false}/>
                    <YAxis axisLine={false} tickLine={false}/>
                    <Line type="monotone" stroke="#8884d8" fill="#8884d8" dataKey="value" strokeWidth={2} activeDot={{ r: 8 }}/>
                </LineChart>
            </ResponsiveContainer>
          </Box>
        </>
    )
}