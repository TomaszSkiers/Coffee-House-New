import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box } from '@mui/material'

export const FormContextProvider = ({
  children,
  schema,
  onSubmit,
  ...props
}) => {
  const methods = useForm({
    resolver: zodResolver(schema),
  })

const handleFormSubmit = async (data) => {
  await onSubmit(data) //wykonujemy on submita z komponentu
  methods.reset() //resetujemy formularz
}

  return (
    <FormProvider {...methods}>
      <Box onSubmit={methods.handleSubmit(handleFormSubmit)} {...props}>
        {children}
      </Box>
    </FormProvider>
  )
}
