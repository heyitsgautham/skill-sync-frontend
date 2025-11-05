import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Box,
    Typography,
    Paper,
    Grid,
    Card,
    CardContent,
    Button,
    Chip,
} from '@mui/material';
import {
    AccountCircle as AccountCircleIcon,
    Upload as UploadIcon,
    Work as WorkIcon,
    AutoAwesome as AIIcon,
    Business as BusinessIcon,
    PostAdd as PostAddIcon,
    People as PeopleIcon,
    AdminPanelSettings as AdminIcon,
    Analytics as AnalyticsIcon,
    ManageAccounts as ManageAccountsIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import authService from '../services/authService';
import Layout from '../components/Layout';

const Dashboard = () => {
    const navigate = useNavigate();
    const user = authService.getCurrentUser();
    const role = user?.role?.toLowerCase();

    // Role-specific dashboard content
    const renderStudentDashboard = () => {
        const cardVariants = {
            hidden: { opacity: 0, y: 50 },
            visible: (i) => ({
                opacity: 1,
                y: 0,
                transition: {
                    delay: i * 0.15,
                    duration: 0.5,
                    ease: "easeOut"
                }
            })
        };

        return (
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <motion.div
                        custom={0}
                        initial="hidden"
                        animate="visible"
                        variants={cardVariants}
                        style={{ height: '100%' }}
                    >
                        <Card
                            elevation={0}
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                borderRadius: 4,
                                background: 'rgba(255, 255, 255, 0.95)',
                                backdropFilter: 'blur(20px)',
                                boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                                border: '1px solid rgba(255,255,255,0.3)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: '0 16px 48px rgba(0,0,0,0.12)',
                                }
                            }}
                        >
                            <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                <motion.div
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 20,
                                        delay: 0.2
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 64,
                                            height: 64,
                                            borderRadius: 3,
                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            mb: 3,
                                            boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)',
                                        }}
                                    >
                                        <UploadIcon sx={{ fontSize: 32, color: 'white' }} />
                                    </Box>
                                </motion.div>
                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                                    Resume Management
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.7 }}>
                                    Upload and manage your resume for better internship matching powered by AI.
                                </Typography>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={() => navigate('/upload-resume')}
                                    sx={{
                                        py: 1.5,
                                        borderRadius: 2,
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        fontWeight: 700,
                                        textTransform: 'none',
                                        fontSize: '0.95rem',
                                        boxShadow: '0 4px 16px rgba(102, 126, 234, 0.3)',
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
                                        },
                                    }}
                                >
                                    Manage Resume
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <motion.div
                        custom={1}
                        initial="hidden"
                        animate="visible"
                        variants={cardVariants}
                        style={{ height: '100%' }}
                    >
                        <Card
                            elevation={0}
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                borderRadius: 4,
                                background: 'rgba(255, 255, 255, 0.95)',
                                backdropFilter: 'blur(20px)',
                                boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                                border: '1px solid rgba(255,255,255,0.3)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: '0 16px 48px rgba(0,0,0,0.12)',
                                }
                            }}
                        >
                            <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                <Box
                                    sx={{
                                        width: 64,
                                        height: 64,
                                        borderRadius: 3,
                                        background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        mb: 3,
                                        boxShadow: '0 8px 24px rgba(17, 153, 142, 0.3)',
                                    }}
                                >
                                    <WorkIcon sx={{ fontSize: 32, color: 'white' }} />
                                </Box>
                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                                    Browse Internships
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.7 }}>
                                    Search and browse available internship opportunities that match your skills.
                                </Typography>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={() => navigate('/internships')}
                                    sx={{
                                        py: 1.5,
                                        borderRadius: 2,
                                        background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                                        fontWeight: 700,
                                        textTransform: 'none',
                                        fontSize: '0.95rem',
                                        boxShadow: '0 4px 16px rgba(17, 153, 142, 0.3)',
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 8px 24px rgba(17, 153, 142, 0.4)',
                                        },
                                    }}
                                >
                                    View All Internships
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <motion.div
                        custom={2}
                        initial="hidden"
                        animate="visible"
                        variants={cardVariants}
                        style={{ height: '100%' }}
                    >
                        <Card
                            elevation={0}
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                borderRadius: 4,
                                background: 'rgba(255, 255, 255, 0.95)',
                                backdropFilter: 'blur(20px)',
                                boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                                border: '1px solid rgba(255,255,255,0.3)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: '0 16px 48px rgba(0,0,0,0.12)',
                                }
                            }}
                        >
                            <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                <Box
                                    sx={{
                                        width: 64,
                                        height: 64,
                                        borderRadius: 3,
                                        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        mb: 3,
                                        boxShadow: '0 8px 24px rgba(240, 147, 251, 0.3)',
                                    }}
                                >
                                    <AIIcon sx={{ fontSize: 32, color: 'white' }} />
                                </Box>
                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                                    AI Recommendations
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.7 }}>
                                    Get personalized internship recommendations based on your skills and resume.
                                </Typography>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={() => navigate('/recommendations')}
                                    sx={{
                                        py: 1.5,
                                        borderRadius: 2,
                                        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                                        fontWeight: 700,
                                        textTransform: 'none',
                                        fontSize: '0.95rem',
                                        boxShadow: '0 4px 16px rgba(240, 147, 251, 0.3)',
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 8px 24px rgba(240, 147, 251, 0.4)',
                                        },
                                    }}
                                >
                                    View Recommendations
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                </Grid>
            </Grid>
        );
    };

    const renderCompanyDashboard = () => (
        <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 4 }}>
                <Card
                    elevation={0}
                    sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: 4,
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(20px)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                        border: '1px solid rgba(255,255,255,0.3)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'translateY(-8px)',
                            boxShadow: '0 16px 48px rgba(0,0,0,0.12)',
                        }
                    }}
                >
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                        <Box
                            sx={{
                                width: 64,
                                height: 64,
                                borderRadius: 3,
                                background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mb: 3,
                                boxShadow: '0 8px 24px rgba(67, 233, 123, 0.3)',
                            }}
                        >
                            <PostAddIcon sx={{ fontSize: 32, color: 'white' }} />
                        </Box>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                            Post Internship
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.7 }}>
                            Create and publish new internship opportunities for talented students.
                        </Typography>
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={() => navigate('/internships/create')}
                            sx={{
                                py: 1.5,
                                borderRadius: 2,
                                background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                                fontWeight: 700,
                                textTransform: 'none',
                                fontSize: '0.95rem',
                                boxShadow: '0 4px 16px rgba(67, 233, 123, 0.3)',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 8px 24px rgba(67, 233, 123, 0.4)',
                                },
                            }}
                        >
                            Post New Internship
                        </Button>
                    </CardContent>
                </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
                <Card
                    elevation={0}
                    sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: 4,
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(20px)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                        border: '1px solid rgba(255,255,255,0.3)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'translateY(-8px)',
                            boxShadow: '0 16px 48px rgba(0,0,0,0.12)',
                        }
                    }}
                >
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                        <Box
                            sx={{
                                width: 64,
                                height: 64,
                                borderRadius: 3,
                                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mb: 3,
                                boxShadow: '0 8px 24px rgba(79, 172, 254, 0.3)',
                            }}
                        >
                            <WorkIcon sx={{ fontSize: 32, color: 'white' }} />
                        </Box>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                            Manage Listings
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.7 }}>
                            View, edit, and manage your posted internship listings with ease.
                        </Typography>
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={() => navigate('/internships')}
                            sx={{
                                py: 1.5,
                                borderRadius: 2,
                                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                                fontWeight: 700,
                                textTransform: 'none',
                                fontSize: '0.95rem',
                                boxShadow: '0 4px 16px rgba(79, 172, 254, 0.3)',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 8px 24px rgba(79, 172, 254, 0.4)',
                                },
                            }}
                        >
                            View My Internships
                        </Button>
                    </CardContent>
                </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
                <Card
                    elevation={0}
                    sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: 4,
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(20px)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                        border: '1px solid rgba(255,255,255,0.3)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'translateY(-8px)',
                            boxShadow: '0 16px 48px rgba(0,0,0,0.12)',
                        }
                    }}
                >
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                        <Box
                            sx={{
                                width: 64,
                                height: 64,
                                borderRadius: 3,
                                background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mb: 3,
                                boxShadow: '0 8px 24px rgba(250, 112, 154, 0.3)',
                            }}
                        >
                            <PeopleIcon sx={{ fontSize: 32, color: 'white' }} />
                        </Box>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                            AI-Matched Candidates
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.7 }}>
                            View AI-recommended students that best match your requirements.
                        </Typography>
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={() => navigate('/company/matches')}
                            sx={{
                                py: 1.5,
                                borderRadius: 2,
                                background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                                fontWeight: 700,
                                textTransform: 'none',
                                fontSize: '0.95rem',
                                boxShadow: '0 4px 16px rgba(250, 112, 154, 0.3)',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 8px 24px rgba(250, 112, 154, 0.4)',
                                },
                            }}
                        >
                            View Matches
                        </Button>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );

    const renderAdminDashboard = () => (
        <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 4 }}>
                <Card
                    elevation={0}
                    sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: 4,
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(20px)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                        border: '1px solid rgba(255,255,255,0.3)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'translateY(-8px)',
                            boxShadow: '0 16px 48px rgba(0,0,0,0.12)',
                        }
                    }}
                >
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                        <Box
                            sx={{
                                width: 64,
                                height: 64,
                                borderRadius: 3,
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mb: 3,
                                boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)',
                            }}
                        >
                            <ManageAccountsIcon sx={{ fontSize: 32, color: 'white' }} />
                        </Box>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                            User Management
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.7 }}>
                            Manage students, companies, and other admin accounts in the system.
                        </Typography>
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={() => navigate('/admin/users')}
                            sx={{
                                py: 1.5,
                                borderRadius: 2,
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                fontWeight: 700,
                                textTransform: 'none',
                                fontSize: '0.95rem',
                                boxShadow: '0 4px 16px rgba(102, 126, 234, 0.3)',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
                                },
                            }}
                        >
                            Manage Users
                        </Button>
                    </CardContent>
                </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
                <Card
                    elevation={0}
                    sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: 4,
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(20px)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                        border: '1px solid rgba(255,255,255,0.3)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'translateY(-8px)',
                            boxShadow: '0 16px 48px rgba(0,0,0,0.12)',
                        }
                    }}
                >
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                        <Box
                            sx={{
                                width: 64,
                                height: 64,
                                borderRadius: 3,
                                background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mb: 3,
                                boxShadow: '0 8px 24px rgba(17, 153, 142, 0.3)',
                            }}
                        >
                            <WorkIcon sx={{ fontSize: 32, color: 'white' }} />
                        </Box>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                            Internship Oversight
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.7 }}>
                            Monitor and manage all internship listings and applications platform-wide.
                        </Typography>
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={() => navigate('/internships')}
                            sx={{
                                py: 1.5,
                                borderRadius: 2,
                                background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                                fontWeight: 700,
                                textTransform: 'none',
                                fontSize: '0.95rem',
                                boxShadow: '0 4px 16px rgba(17, 153, 142, 0.3)',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 8px 24px rgba(17, 153, 142, 0.4)',
                                },
                            }}
                        >
                            View All Internships
                        </Button>
                    </CardContent>
                </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
                <Card
                    elevation={0}
                    sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: 4,
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(20px)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                        border: '1px solid rgba(255,255,255,0.3)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'translateY(-8px)',
                            boxShadow: '0 16px 48px rgba(0,0,0,0.12)',
                        }
                    }}
                >
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                        <Box
                            sx={{
                                width: 64,
                                height: 64,
                                borderRadius: 3,
                                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mb: 3,
                                boxShadow: '0 8px 24px rgba(240, 147, 251, 0.3)',
                            }}
                        >
                            <AnalyticsIcon sx={{ fontSize: 32, color: 'white' }} />
                        </Box>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                            Analytics Dashboard
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.7 }}>
                            View system statistics, match rates, and engagement metrics.
                        </Typography>
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={() => navigate('/admin/analytics')}
                            sx={{
                                py: 1.5,
                                borderRadius: 2,
                                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                                fontWeight: 700,
                                textTransform: 'none',
                                fontSize: '0.95rem',
                                boxShadow: '0 4px 16px rgba(240, 147, 251, 0.3)',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 8px 24px rgba(240, 147, 251, 0.4)',
                                },
                            }}
                        >
                            View Analytics
                        </Button>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );

    const getRoleIcon = () => {
        switch (role) {
            case 'student':
                return <AccountCircleIcon sx={{ fontSize: 60, mr: 2, color: 'primary.main' }} />;
            case 'company':
                return <BusinessIcon sx={{ fontSize: 60, mr: 2, color: 'primary.main' }} />;
            case 'admin':
                return <AdminIcon sx={{ fontSize: 60, mr: 2, color: 'primary.main' }} />;
            default:
                return <AccountCircleIcon sx={{ fontSize: 60, mr: 2, color: 'primary.main' }} />;
        }
    };

    const getRoleColor = () => {
        switch (role) {
            case 'student':
                return 'primary';
            case 'company':
                return 'success';
            case 'admin':
                return 'error';
            default:
                return 'default';
        }
    };

    return (
        <Layout>
            <Container maxWidth="lg">
                <Paper
                    elevation={0}
                    sx={{
                        p: 4,
                        mb: 4,
                        borderRadius: 4,
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(20px)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                        border: '1px solid rgba(255,255,255,0.3)',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box
                            sx={{
                                width: 80,
                                height: 80,
                                borderRadius: 3,
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mr: 3,
                                boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)',
                            }}
                        >
                            {React.cloneElement(getRoleIcon(), {
                                sx: { fontSize: 48, color: 'white', m: 0 }
                            })}
                        </Box>
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: 800,
                                    color: '#1a1a1a',
                                    mb: 1,
                                    letterSpacing: '-0.5px',
                                }}
                            >
                                Welcome back, {user?.full_name || 'User'}!
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: '#666',
                                    mb: 1.5,
                                    fontWeight: 500,
                                }}
                            >
                                {user?.email || 'N/A'}
                            </Typography>
                            <Chip
                                label={user?.role || 'N/A'}
                                sx={{
                                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%)',
                                    border: '1px solid rgba(102, 126, 234, 0.3)',
                                    color: '#667eea',
                                    fontWeight: 700,
                                    textTransform: 'capitalize',
                                    px: 2,
                                    py: 0.5,
                                }}
                            />
                        </Box>
                    </Box>
                </Paper>

                {role === 'student' && renderStudentDashboard()}
                {role === 'company' && renderCompanyDashboard()}
                {role === 'admin' && renderAdminDashboard()}

                {!['student', 'company', 'admin'].includes(role) && (
                    <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
                        <Typography variant="h6" color="error">
                            Invalid role detected. Please contact support.
                        </Typography>
                    </Paper>
                )}
            </Container>
        </Layout>
    );
};

export default Dashboard;
