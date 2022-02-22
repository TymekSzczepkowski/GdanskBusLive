import React from "react";
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Paper,
  MenuList,
  Fab,
} from "@mui/material";
export default function Dropdown(props) {
  return (
    <Paper
      sx={{
        m: 2,
        borderRadius: 2,
        position: "absolute",
        zIndex: 5,
        right: 0,
        left: 0,
      }}>
      <FormControl
        sx={{
          borderRadius: 2,
        }}
        variant='filled'
        fullWidth>
        <InputLabel>
          {props.state == undefined
            ? "Search for route You want to track"
            : props.state.Line}
        </InputLabel>
        <Select>
          <MenuList
            sx={{
              height: 150,
            }}>
            {props.lineData.map((line, index) => (
              <MenuItem
                value={line.routeShortName}
                key={index}
                onClick={(e) => {
                  props.handleClick(e);
                }}>
                {line.routeShortName} - {line.routeLongName}
              </MenuItem>
            ))}
          </MenuList>
        </Select>
      </FormControl>
    </Paper>
  );
}
