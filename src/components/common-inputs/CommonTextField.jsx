import { TextField } from '@mui/material'
import { useFormContext } from 'react-hook-form'

export const CommonTextField = ({ name, label, ...props }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <TextField
      {...register(name)}
      label={label}
      error={!!errors[name]}
      helperText={errors[name]?.message}
      {...props}
    />
  )
}
