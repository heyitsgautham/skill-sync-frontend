import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Box,
    Typography,
    Paper,
    Button,
    AppBar,
    Toolbar,
    Grid,
    Card,
    CardContent,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import authService from '../services/authService';

const Dashboard = () => {
    const navigate = useNavigate();
    const user = authService.getCurrentUser();

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        SkillSync Dashboard
                    </Typography>
                    <Button color="inherit" startIcon={<LogoutIcon />} onClick={handleLogout}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <AccountCircleIcon sx={{ fontSize: 60, mr: 2, color: 'primary.main' }} />
                        <Box>
                            <Typography variant="h4" gutterBottom>
                                Welcome back, {user?.full_name || 'User'}!
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Email: {user?.email || 'N/A'}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Role: {user?.role || 'N/A'}
                            </Typography>
                        </Box>
                    </Box>
                </Paper>

                <Grid container spacing={3}>
                    <Grid xs={12} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Resume Management
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Upload and manage your resume for better internship matching.
                                </Typography>
                                <Button 
                                    variant="contained" 
                                    sx={{ mt: 2 }}
                                    onClick={() => navigate('/upload-resume')}
                                >
                                    Manage Resume
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid xs={12} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Internship Search
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Browse and search for internship opportunities that match your skills.
                                </Typography>
                                <Button 
                                    variant="contained" 
                                    sx={{ mt: 2 }}
                                    onClick={() => navigate('/internships')}
                                >
                                    Browse Internships
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid xs={12} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    AI Recommendations
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Get personalized internship recommendations powered by AI.
                                </Typography>
                                <Button variant="outlined" sx={{ mt: 2 }} disabled>
                                    Coming Soon
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Paper elevation={2} sx={{ p: 3, mt: 3, bgcolor: 'success.light' }}>
                    <Typography variant="h6" gutterBottom>
                        ✅ Day 4 - Resume Upload & Internship Listing
                    </Typography>
                    <Typography variant="body2">
                        New features now available:
                    </Typography>
                    <ul>
                        <li>✅ Resume upload and parsing with skill extraction</li>
                        <li>✅ Internship listing and search functionality</li>
                        <li>🔄 AI-powered recommendations (Coming in Day 5)</li>
                        <li>🔄 Application tracking (Coming soon)</li>
                    </ul>
                </Paper>
            </Container>
        </Box>
    );
};

export default Dashboard;
