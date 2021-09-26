import React from "react";
import "./footer.css";
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function Footer(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        Smart Farming
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default Footer;
