import { Box, Grid, Typography, Card, CardContent } from '@mui/material'
import Icon from 'src/@core/components/icon'

const ServiceList = ({ services }) => {
  return (
    <Box sx={{ mb: 8 }}>
      <Typography
        variant='h2'
        sx={{
          textAlign: 'center',
          fontFamily: 'Readexpro, sans-serif !important',
          letterSpacing: '-.1rem',
          fontWeight: 600,
          maxWidth: 680,
          fontSize: {
            sm: '2.5rem',
            xs: '1.2rem'
          },
          mx: 'auto',
          mb: 10
        }}
      >نسعى في مديرية بلدية الكوت إلى تحقيق بيئة حضرية متميزة ومستدامة تلبي احتياجات وتطلعات سكان مدينتنا</Typography>
      <Typography variant='h1' sx={{ textAlign: 'center', mx: 'auto', fontSize: '4rem' }}>
        خدماتنا
      </Typography>
      <Grid container spacing={6}>
        {services.map((service, idx) => (
          <Grid key={idx} item md={4} sm={6} xs={12}>
            <Card sx={{ minHeight: 220, borderRadius: 0, boxShadow: 'none' }}>
              <CardContent>
                <Typography variant='h3' sx={{ mb: 4 }}>
                  {service.title}
                </Typography>
                <Box>
                  {service.description.split(/\r*\n/).map((item, idx) => (
                    <Typography
                      key={idx}
                      variant='h5'
                      sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 3, fontWeight: 'normal' }}
                    >
                      <Icon icon='mdi:tick' />
                      <Box component='span'>{item}</Box>
                    </Typography>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default ServiceList
