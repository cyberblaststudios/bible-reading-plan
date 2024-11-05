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

export default function Reading({reading, bibleLink}) {
    return (
        <Item>
            <a href={bibleLink} target="_blank" rel='noreferrer'>
                <h3>{reading}</h3>
            </a>
        </Item>
    );
}