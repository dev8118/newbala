import UserLayout from "src/layouts/UserLayout";
import { Box, Card, CardContent, Typography } from '@mui/material'
import Icon from 'src/@core/components/icon'

const Confirmation = () => {
    return <Box sx={{ minHeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Card sx={{ borderRadius: 0, boxShadow: 'none', p: 3 }}>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 5 }}>
                    <Box sx={{ borderRadius: 8, backgroundColor: '#e9f9f0', width: 65, height: 65, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon icon='mdi:tick' color='#74bf2a' fontSize={40}/>
                    </Box>
                </Box>
                <Typography variant='h3' sx={{ textAlign: 'center', mb: 5 }}>تم استلام رسالتك بنجاح</Typography>
                <Typography sx={{ textAlign: 'center', maxWidth: 320, mb: 3 }}>سنقوم بالرد على طلبك في أقرب وقت ممكن، عادةً خلال 24 ساعة.</Typography>
            </CardContent>
        </Card>        
    </Box>
}

Confirmation.getLayout = page => <UserLayout>{page}</UserLayout>
Confirmation.guestGuard = true;

export default Confirmation;