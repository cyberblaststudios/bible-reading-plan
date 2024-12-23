import * as React from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fffff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027'
    }),
  }));

export default function Card({linkText, linkURI}) {
    return (
        <Item>
            <a href={linkURI} target="_blank" rel='noreferrer'>
                <h2>{linkText}</h2>
            </a>
        </Item>
    );
}