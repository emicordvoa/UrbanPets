import React from 'react';
import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchField = ({ value, onChange, placeholder = 'Buscar servicios...' }) => (
  <TextField
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    fullWidth
    variant="outlined"
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      )
    }}
  />
);

export default SearchField;
