import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';
import top100Films from './top100Films';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';

const SearchContainer = styled('div')({
  height: '15vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  paddingTop: '20vh', // Adjusted to push slightly down
  position: 'relative',
  zIndex: 1,
});

const StyledAutocomplete = styled(Autocomplete)({
  flexGrow: 1,
  backgroundColor: 'rgba(243, 248, 249, 0.6)',
  borderRadius: '8px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    '& fieldset': {
      borderColor: 'rgba(242, 238, 238, 0.91)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(242, 238, 238, 0.91)',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#555',
    '&.Mui-focused': {
      color: '#178bd8',
    },
  },
  '& .MuiAutocomplete-option': {
    color: 'black',
  },
});

export default function SearchBox() {
  return (
    <SearchContainer>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '90%',
          maxWidth: '720px',
        }}
      >
        <StyledAutocomplete
          disablePortal
          options={top100Films}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search Medicines..."
              variant="outlined"
              size="medium"
              fullWidth
            />
          )}
          sx={{
            mr: 4, // spacing between input and icon button
            '& .MuiAutocomplete-popupIndicator': {
              color: '#178bd8',
            },
            '& .MuiAutocomplete-clearIndicator': {
              color: 'red',
            },
          }}
        />
        <IconButton
          sx={{
            backgroundColor: 'rgba(7, 160, 184, 0.6)',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#0d6fb8',
            },
            borderRadius: '8px',
            height: '56px', // match TextField height
            width: '100px',
          }}
        >
          <SearchIcon />
        </IconButton>
      </Box>
    </SearchContainer>
  );
}
