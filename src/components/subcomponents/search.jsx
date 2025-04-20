import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';
import top100Films from './top100Films';

const SearchContainer = styled('div')({
  height: '20vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  paddingTop: '20vh', // This pushes the content down 25% of the screen height
  position: 'relative',
  zIndex: 1,
});

const StyledAutocomplete = styled(Autocomplete)({
  width: '100%',
  maxWidth: '600px',
  backgroundColor: 'rgba(241, 242, 243, 0.9)',
  borderRadius: '8px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    '& fieldset': {
      borderColor: 'rgba(242, 238, 238, 0.91)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(242, 238, 238, 0.91)', // You can change this manually
    },
  },
  '& .MuiInputLabel-root': {
    color: '#555', // Change this as needed
    '&.Mui-focused': {
      color: '#178bd8', // You can customize this too
    },
  },
  '& .MuiAutocomplete-option': {
    color: 'black', // Set text color of options
  },
});

export default function SearchBox() {
  return (
    <SearchContainer>
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
          />
        )}
        sx={{
          '& .MuiAutocomplete-popupIndicator': {
            color: '#178bd8',
          },
          '& .MuiAutocomplete-clearIndicator': {
            color: 'red',
          },
        }}
      />
    </SearchContainer>
  );
}
