import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

export default function BasicMenu({ category }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <p
        className="link mx-2 capitalize"
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {category.name}
      </p>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {category.subCategories.map(subCategory => (
          <Link to={`/categories/${subCategory.slug}`}>
            <MenuItem
              style={{ textTransform: 'capitalize' }}
              onClick={handleClose}
              key={subCategory._id}
            >
              {subCategory.name}
            </MenuItem>
          </Link>
        ))}
      </Menu>
    </div>
  );
}
