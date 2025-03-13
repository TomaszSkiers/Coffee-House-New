import { Edit, Save } from "@mui/icons-material";
import { Box, IconButton, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserField } from "../../redux/userSlice";

export function Row({user, rowKey}) {
    const [activeKey, setActiveKey] = useState(null)
    const [value, setValue] = useState(user[rowKey])
    const dispatch = useDispatch()

    const handleChange = (key, value) => {
        if (key === activeKey) {
          setActiveKey(null)
          console.log(rowKey, value)
          dispatch(updateUserField({key, value}))
          localStorage.setItem(key, value)
        } else {
          setActiveKey(key)
        }
      }

    return(
        <Box 
          sx={{
            display: 'flex',
            alignItems: 'center',
            ml: 1,
            mr: 1,
            gap: 1,
          }}>
          <TextField
            label={rowKey}
            value={value}
            fullWidth
            margin="dense"
            disabled={rowKey === activeKey ? false : true}
            onChange={(e)=> {setValue(e.target.value)}}
            InputLabelProps={{shrink: true}}
          />
          <IconButton 
            color="secondary"
            sx={{
              width: "50px",
              height: '50px',
              border: '1px solid gray'
            }}  
            onClick={()=>handleChange(rowKey, value)}
          >
            {rowKey === activeKey ? <Save/> : <Edit/>  }
          </IconButton>
        </Box>
    )
}