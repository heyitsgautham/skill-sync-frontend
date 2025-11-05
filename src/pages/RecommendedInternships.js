import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Box,
    Typography,
    Paper,
    Card,
    CardContent,
    CardActions,
    Button,
    Alert,
    Grid,
    Divider,
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import apiClient from '../services/api';
import Layout from '../components/Layout';
import AnimatedMatchScore from '../components/AnimatedMatchScore';
import SkillsCloud from '../components/SkillsCloud';
import { InternshipListSkeleton } from '../components/SkeletonLoader';

const RecommendedInternships = () => {
    const navigate = useNavigate();
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const hasFetchedRef = useRef(false);

    useEffect(() => {
        // Prevent double fetch in React StrictMode (development)
        if (!hasFetchedRef.current) {
            hasFetchedRef.current = true;
            fetchRecommendations();
        }
    }, []);

    const fetchRecommendations = async () => {
        try {
            setLoading(true);
            setError(null);

            console.log('Fetching recommendations from /internship/match with top_k=15');

            // Call the /internship/match endpoint
            const response = await apiClient.get('/internship/match', {
                params: { top_k: 15 }
            });

            console.log('Recommendations response:', response.data);
            console.log('Number of recommendations:', response.data?.length);
            setRecommendations(response.data);

            if (response.data.length === 0) {
                toast('No recommendations found. Try uploading your resume first!', {
                    icon: 'ℹ️',
                    duration: 4000,
                });
            } else {
                toast.success(`Found ${response.data.length} personalized recommendations!`);
            }
        } catch (err) {
            console.error('Error fetching recommendations:', err);
            console.error('Error response:', err.response);
            console.error('Error status:', err.response?.status);
            console.error('Error data:', err.response?.data);

            // Handle different error response formats
            let errorMessage = 'Failed to fetch recommendations';

            if (err.response?.data?.detail) {
                // If detail is an array (validation errors), format it
                if (Array.isArray(err.response.data.detail)) {
                    errorMessage = err.response.data.detail
                        .map(e => e.msg || e.message || JSON.stringify(e))
                        .join(', ');
                } else if (typeof err.response.data.detail === 'string') {
                    errorMessage = err.response.data.detail;
                } else {
                    errorMessage = JSON.stringify(err.response.data.detail);
                }
            }

            console.log('Processed error message:', errorMessage);
            setError(errorMessage);

            if (err.response?.status === 404) {
                toast.error('Please upload your resume first to get recommendations');
            } else if (err.response?.status === 403) {
                toast.error('You must be logged in as a student to view recommendations');
            } else {
                toast.error(errorMessage);
            }
        } finally {
            setLoading(false);
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
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box
                            sx={{
                                width: 80,
                                height: 80,
                                borderRadius: 3,
                                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mr: 3,
                                boxShadow: '0 8px 24px rgba(240, 147, 251, 0.3)',
                            }}
                        >
                            <TrendingUpIcon sx={{ fontSize: 48, color: 'white' }} />
                        </Box>
                        <Box>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: 800,
                                    color: '#1a1a1a',
                                    mb: 1,
                                    letterSpacing: '-0.5px',
                                }}
                            >
                                AI-Powered Recommendations
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
                                Personalized internship matches based on your skills and experience
                            </Typography>
                        </Box>
                    </Box>
                </Paper>

                {loading && (
                    <Box>
                        <InternshipListSkeleton count={6} />
                    </Box>
                )}

                {!loading && error && (
                    <Alert
                        severity="error"
                        sx={{ mb: 3 }}
                        action={
                            error.includes('resume') ? (
                                <Button color="inherit" size="small" onClick={() => navigate('/upload-resume')}>
                                    Upload Resume
                                </Button>
                            ) : (
                                <Button color="inherit" size="small" onClick={fetchRecommendations}>
                                    Retry
                                </Button>
                            )
                        }
                    >
                        {error}
                    </Alert>
                )}

                {!loading && !error && recommendations.length === 0 && (
                    <Paper
                        elevation={0}
                        sx={{
                            p: 6,
                            textAlign: 'center',
                            borderRadius: 4,
                            background: 'rgba(255, 255, 255, 0.95)',
                            backdropFilter: 'blur(20px)',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                        }}
                    >
                        <Box
                            sx={{
                                width: 120,
                                height: 120,
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 24px',
                            }}
                        >
                            <WorkIcon sx={{ fontSize: 60, color: '#667eea' }} />
                        </Box>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
                            No Recommendations Yet
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 500, mx: 'auto' }}>
                            Upload your resume to get AI-powered internship recommendations tailored to your skills and experience.
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => navigate('/upload-resume')}
                            sx={{
                                py: 1.5,
                                px: 4,
                                borderRadius: 2,
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                fontWeight: 700,
                                textTransform: 'none',
                                fontSize: '1rem',
                                boxShadow: '0 4px 16px rgba(102, 126, 234, 0.3)',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
                                },
                            }}
                        >
                            Upload Resume
                        </Button>
                    </Paper>
                )}

                {!loading && !error && recommendations.length > 0 && (
                    <Grid container spacing={3}>
                        {recommendations.map((internship, index) => (
                            <Grid size={{ xs: 12 }} key={internship.id} sx={{ display: 'flex' }}>
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1,
                                        ease: "easeOut"
                                    }}
                                    style={{ width: '100%' }}
                                >
                                    <Card
                                        elevation={0}
                                        sx={{
                                            width: '100%',
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
                                        <CardContent sx={{ p: 4 }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3, gap: 3 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                                                    <Box
                                                        sx={{
                                                            width: 56,
                                                            height: 56,
                                                            borderRadius: 2,
                                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            mr: 2,
                                                            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                                                        }}
                                                    >
                                                        <WorkIcon sx={{ color: 'white', fontSize: 32 }} />
                                                    </Box>
                                                    <Box>
                                                        <Typography
                                                            variant="h5"
                                                            component="div"
                                                            sx={{
                                                                fontWeight: 700,
                                                                color: '#1a1a1a',
                                                                mb: 0.5,
                                                            }}
                                                        >
                                                            {internship.title}
                                                        </Typography>
                                                        {internship.company_name && (
                                                            <Typography
                                                                variant="subtitle1"
                                                                sx={{
                                                                    fontWeight: 600,
                                                                    color: '#667eea',
                                                                }}
                                                            >
                                                                {internship.company_name}
                                                            </Typography>
                                                        )}
                                                    </Box>
                                                </Box>
                                                <Box sx={{ minWidth: 120 }}>
                                                    <AnimatedMatchScore
                                                        score={internship.match_score}
                                                        size={100}
                                                        showLabel={false}
                                                    />
                                                </Box>
                                            </Box>

                                            <Typography
                                                variant="body1"
                                                color="text.secondary"
                                                sx={{
                                                    mb: 3,
                                                    lineHeight: 1.7,
                                                }}
                                            >
                                                {internship.description}
                                            </Typography>

                                            <Divider sx={{ my: 3, borderColor: 'rgba(0,0,0,0.08)' }} />

                                            <Grid container spacing={2} sx={{ mb: 2 }}>
                                                {internship.location && (
                                                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                            <LocationOnIcon sx={{ mr: 1, color: 'action.active' }} />
                                                            <Typography variant="body2">
                                                                {internship.location}
                                                            </Typography>
                                                        </Box>
                                                    </Grid>
                                                )}
                                                {internship.duration && (
                                                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                            <AccessTimeIcon sx={{ mr: 1, color: 'action.active' }} />
                                                            <Typography variant="body2">
                                                                {internship.duration}
                                                            </Typography>
                                                        </Box>
                                                    </Grid>
                                                )}
                                                {internship.stipend && (
                                                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                            <AttachMoneyIcon sx={{ mr: 1, color: 'action.active' }} />
                                                            <Typography variant="body2">
                                                                {internship.stipend}
                                                            </Typography>
                                                        </Box>
                                                    </Grid>
                                                )}
                                            </Grid>

                                            {internship.required_skills && internship.required_skills.length > 0 && (
                                                <Box sx={{ mt: 3 }}>
                                                    <Typography
                                                        variant="subtitle2"
                                                        gutterBottom
                                                        sx={{
                                                            fontWeight: 700,
                                                            color: '#1a1a1a',
                                                            mb: 1.5,
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '0.5px',
                                                            fontSize: '0.75rem',
                                                        }}
                                                    >
                                                        Required Skills
                                                    </Typography>
                                                    <SkillsCloud
                                                        skills={internship.required_skills}
                                                        matchedSkills={[]}
                                                    />
                                                </Box>
                                            )}
                                        </CardContent>

                                        <CardActions sx={{ p: 4, pt: 0 }}>
                                            <Button
                                                variant="contained"
                                                fullWidth
                                                onClick={() => toast.success('Application feature coming soon!')}
                                                sx={{
                                                    py: 1.5,
                                                    borderRadius: 2,
                                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                    fontWeight: 700,
                                                    textTransform: 'none',
                                                    fontSize: '1rem',
                                                    boxShadow: '0 4px 16px rgba(102, 126, 234, 0.3)',
                                                    transition: 'all 0.3s ease',
                                                    '&:hover': {
                                                        transform: 'translateY(-2px)',
                                                        boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
                                                        background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                                                    },
                                                }}
                                            >
                                                Apply Now
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                )}

                {!loading && !error && recommendations.length > 0 && (
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            mt: 4,
                            borderRadius: 4,
                            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                            border: '1px solid rgba(102, 126, 234, 0.2)',
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box
                                sx={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: 2,
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mr: 2,
                                    flexShrink: 0,
                                }}
                            >
                                <Typography variant="h5" sx={{ color: 'white' }}>💡</Typography>
                            </Box>
                            <Typography variant="body1" sx={{ color: '#1a1a1a', fontWeight: 500 }}>
                                <strong>Pro Tip:</strong> Keep your resume updated to get better recommendations.
                                The more detailed your skills and experience, the better we can match you!
                            </Typography>
                        </Box>
                    </Paper>
                )}
            </Container>
        </Layout>
    );
};

export default RecommendedInternships;
