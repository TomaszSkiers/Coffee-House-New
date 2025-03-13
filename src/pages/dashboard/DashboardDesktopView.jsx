import { Box, Button,  } from "@mui/material";
import { DataFromDatabaseArea } from "./DataFromDatabaseArea";
import { useState } from "react";
import OrdersDesktop from './OrdersDesktop'



export function DashboardDesktopView() {

    const [menu, setMenu] = useState('orders')


    return (
        <Box sx={{mt: 10}}>
            <Button onClick={()=> setMenu('orders')}>Orders</Button>
            <Button onClick={()=> setMenu('settings')}>Settings</Button>
            {menu === 'orders' ? <OrdersDesktop/> : <DataFromDatabaseArea/>}
        </Box>
    )
}

