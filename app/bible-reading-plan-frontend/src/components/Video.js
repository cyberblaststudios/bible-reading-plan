import * as React from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027'
    }),
  }));

export default function Video({embedId}) {
    return (
        <Item>
            <div>
                <iframe
                    width="100%"
                    height="300px"         
                    src={`https://www.youtube.com/embed/${embedId}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
                />
            </div>
        </Item>
    );
}