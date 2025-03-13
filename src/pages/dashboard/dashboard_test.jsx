import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SettingsIcon from '@mui/icons-material/Settings';
import { Controller, useForm } from 'react-hook-form';
import { Edit as EditIcon, Save as SaveIcon } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const user = {
  name: 'Tomasz',
  surname: 'Skiers',
  email: 'tomasz.skiers@gmail.com',
  phoneNumber: '555 454 999',
};

export const Dashboard = () => {
  const [view, setView] = useState('settings'); // 'settings' lub 'orders'
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));

  const { control, handleSubmit, getValues } = useForm({ defaultValues: user });
  const [editingField, setEditingField] = useState(null);

  const onSubmit = (data) => {
    console.log('Updated Data:', data);
    setEditingField(null);
  };

  //* ANIMACJA PRZEJŚCIA MIĘDZY WIDOKAMI
  const pageVariants = {
    hidden: (direction) => ({
      x: direction === 'orders' ? '100%' : '-100%',
      opacity: 0,
    }),
    visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
    exit: (direction) => ({
      x: direction === 'orders' ? '-100%' : '100%',
      opacity: 0,
      transition: { duration: 0.4, ease: 'easeIn' },
    }),
  };

  //* MOBILE VIEW
  if (isXs)
    return (
      <Box
        sx={{
          width: '100%',
          height: 'calc(100vh - 80px)',
          mt: '80px',
          position: 'relative',
          overflow: 'hidden', // Zapobiega przewijaniu przy animacji
        }}
      >
        <AnimatePresence mode="wait" custom={view}>
          {view === 'settings' && (
            <motion.div
              key="settings"
              variants={pageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              custom="settings"
              style={{ position: 'absolute', width: '100%' }}
            >
              <Card sx={{ p: 2 }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    User Information
                  </Typography>
                  {Object.keys(user).map((field) => (
                    <div
                      key={field}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: 8,
                      }}
                    >
                      {editingField === field ? (
                        <Controller
                          name={field}
                          control={control}
                          render={({ field }) => (
                            <TextField {...field} size="small" fullWidth />
                          )}
                        />
                      ) : (
                        <Typography variant="body1" style={{ flexGrow: 1 }}>
                          {getValues(field)}
                        </Typography>
                      )}
                      <IconButton
                        onClick={() =>
                          setEditingField(editingField === field ? null : field)
                        }
                        size="small"
                      >
                        {editingField === field ? <SaveIcon /> : <EditIcon />}
                      </IconButton>
                    </div>
                  ))}
                  {editingField && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit(onSubmit)}
                      fullWidth
                    >
                      Save Changes
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {view === 'orders' && (
            <motion.div
              key="orders"
              variants={pageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              custom="orders"
              style={{ position: 'absolute', width: '100%' }}
            >
              <Card sx={{ p: 2 }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Your Orders
                  </Typography>
                  <Typography variant="body1">
                    Lista zamówień będzie tutaj...
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dolne menu */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-around',
            borderTop: '1px solid lightgray',
            py: 1,
            backgroundColor: theme.palette.background.default,
          }}
        >
          <IconButton sx={{ display: 'flex', flexDirection: 'column' }}>
            <LogoutIcon fontSize="large" />
            <Typography>Log out</Typography>
          </IconButton>

          <IconButton
            onClick={() => setView('orders')}
            sx={{ display: 'flex', flexDirection: 'column' }}
          >
            <ShoppingCartIcon fontSize="large" />
            <Typography>Orders</Typography>
          </IconButton>

          <IconButton
            color="primary"
            onClick={() => setView('settings')}
            sx={{ display: 'flex', flexDirection: 'column' }}
          >
            <SettingsIcon fontSize="large" />
            <Typography>Settings</Typography>
          </IconButton>
        </Box>
      </Box>
    );

  //* NORMAL VIEW
  return <Typography sx={{ mt: 10 }}>Widok normalny</Typography>;
};
