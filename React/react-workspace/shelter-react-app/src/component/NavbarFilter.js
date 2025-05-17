import React from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import WhatshotIcon from '@mui/icons-material/Whatshot'; // 🔥
import AcUnitIcon from '@mui/icons-material/AcUnit';     // ❄️
import WarningIcon from '@mui/icons-material/Warning';   // ⚠️
import PublicIcon from '@mui/icons-material/Public';     // 전체

const NavbarFilter = ({ selected, onChange }) => {
  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation value={selected} onChange={(e, newValue) => onChange(newValue)} showLabels>
        <BottomNavigationAction label="전체" value="ALL" icon={<PublicIcon />} />
        <BottomNavigationAction label="더위쉼터" value="HEAT" icon={<WhatshotIcon />} />
        <BottomNavigationAction label="한파쉼터" value="COLD" icon={<AcUnitIcon />} />
        <BottomNavigationAction label="대피소" value="SHELTER" icon={<WarningIcon />} />
      </BottomNavigation>
    </Paper>
  );
};

export default NavbarFilter;
