import React, { useEffect, useState } from 'react';
import {
    Container,
    Box,
    Typography,
    Paper,
    Card,
    CardContent,
    CircularProgress,
    Alert,
    Grid,
    Button,
    Stack,
    Divider,
} from '@mui/material';
import {
    Person as PersonIcon,
    Email as EmailIcon,
    Work as WorkIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import api from '../services/api';
import AnimatedMatchScore from '../components/AnimatedMatchScore';
import SkillsCloud from '../components/SkillsCloud';
import { CandidateCardSkeleton } from '../components/SkeletonLoader';

const CompanyMatches = () => {
    const [internships, setInternships] = useState([]);
    const [selectedInternship, setSelectedInternship] = useState(null);
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [candidatesLoading, setCandidatesLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchMyInternships();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchMyInternships = async () => {
        try {
            setLoading(true);
            const response = await api.get('/internship/my-posts');
            setInternships(response.data);
            if (response.data.length > 0) {
                selectInternship(response.data[0]);
            }
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to load internships');
        } finally {
            setLoading(false);
        }
    };

    const selectInternship = async (internship) => {
        setSelectedInternship(internship);
        setCandidatesLoading(true);
        try {
            const response = await api.get(`/recommendations/candidates/${internship.id}`);
            setCandidates(response.data);
        } catch (err) {
            console.error('Error fetching candidates:', err);
            setCandidates([]);
        } finally {
            setCandidatesLoading(false);
        }
    };

    if (loading) {
        return (
            <Layout>
                <Container maxWidth="lg">
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                        <CircularProgress size={60} />
                    </Box>
                </Container>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <Container maxWidth="lg">
                    <Alert severity="error" sx={{ mt: 3 }}>
                        {error}
                    </Alert>
                </Container>
            </Layout>
        );
    }

    if (internships.length === 0) {
        return (
            <Layout>
                <Container maxWidth="lg">
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
                        <WorkIcon sx={{ fontSize: 80, color: '#ccc', mb: 2 }} />
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                            No Internships Posted Yet
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                            Post your first internship to start receiving AI-matched candidate recommendations.
                        </Typography>
                        <Button
                            variant="contained"
                            href="/internships/create"
                            sx={{
                                py: 1.5,
                                px: 4,
                                borderRadius: 2,
                                background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                                fontWeight: 700,
                                textTransform: 'none',
                                fontSize: '1rem',
                            }}
                        >
                            Post Internship
                        </Button>
                    </Paper>
                </Container>
            </Layout>
        );
    }

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
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Box
                            sx={{
                                width: 64,
                                height: 64,
                                borderRadius: 3,
                                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mr: 3,
                                boxShadow: '0 8px 24px rgba(240, 147, 251, 0.3)',
                            }}
                        >
                            <PersonIcon sx={{ fontSize: 36, color: 'white' }} />
                        </Box>
                        <Box>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: 800,
                                    color: '#1a1a1a',
                                    letterSpacing: '-0.5px',
                                }}
                            >
                                AI-Matched Candidates
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Find the best candidates for your internship opportunities
                            </Typography>
                        </Box>
                    </Box>
                </Paper>

                <Grid container spacing={3}>
                    {/* Internship List */}
                    <Grid size={{ xs: 12, md: 4 }} sx={{ display: 'flex' }}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 2,
                                borderRadius: 4,
                                background: 'rgba(255, 255, 255, 0.95)',
                                backdropFilter: 'blur(20px)',
                                boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                                width: '100%',
                            }}
                        >
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                                Your Internships
                            </Typography>
                            <Stack spacing={2}>
                                {internships.map((internship) => (
                                    <Card
                                        key={internship.id}
                                        onClick={() => selectInternship(internship)}
                                        sx={{
                                            cursor: 'pointer',
                                            border: selectedInternship?.id === internship.id ? '2px solid #f093fb' : '1px solid #e0e0e0',
                                            borderRadius: 2,
                                            transition: 'all 0.2s',
                                            '&:hover': {
                                                transform: 'translateY(-2px)',
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                            },
                                        }}
                                    >
                                        <CardContent>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
                                                {internship.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" noWrap>
                                                {internship.location || 'Location not specified'}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                ))}
                            </Stack>
                        </Paper>
                    </Grid>

                    {/* Candidates List */}
                    <Grid size={{ xs: 12, md: 8 }} sx={{ display: 'flex' }}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                borderRadius: 4,
                                background: 'rgba(255, 255, 255, 0.95)',
                                backdropFilter: 'blur(20px)',
                                boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                                minHeight: '500px',
                                width: '100%',
                            }}
                        >
                            {selectedInternship && (
                                <>
                                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                                        Candidates for: {selectedInternship.title}
                                    </Typography>
                                    <Divider sx={{ mb: 3 }} />
                                </>
                            )}

                            {candidatesLoading ? (
                                <Box>
                                    <CandidateCardSkeleton />
                                    <CandidateCardSkeleton />
                                    <CandidateCardSkeleton />
                                </Box>
                            ) : candidates.length === 0 ? (
                                <Box sx={{ textAlign: 'center', py: 8 }}>
                                    <PersonIcon sx={{ fontSize: 60, color: '#ccc', mb: 2 }} />
                                    <Typography variant="h6" color="text.secondary">
                                        No matching candidates found
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Students who upload resumes will appear here with match scores
                                    </Typography>
                                </Box>
                            ) : (
                                <Stack spacing={3}>
                                    {candidates.map((candidate, index) => (
                                        <motion.div
                                            key={candidate.student_id}
                                            initial={{ opacity: 0, x: -50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{
                                                duration: 0.4,
                                                delay: index * 0.1,
                                                ease: "easeOut"
                                            }}
                                        >
                                            <Card
                                                elevation={0}
                                                sx={{
                                                    border: '1px solid #e0e0e0',
                                                    borderRadius: 3,
                                                    transition: 'all 0.2s',
                                                    '&:hover': {
                                                        boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                                                        transform: 'translateY(-4px)',
                                                    },
                                                }}
                                            >
                                                <CardContent>
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 3, gap: 2 }}>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                                                            <Box
                                                                sx={{
                                                                    width: 48,
                                                                    height: 48,
                                                                    borderRadius: 2,
                                                                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    mr: 2,
                                                                }}
                                                            >
                                                                <PersonIcon sx={{ color: 'white' }} />
                                                            </Box>
                                                            <Box>
                                                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                                                    {candidate.student_name}
                                                                </Typography>
                                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                                    <EmailIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                                                    <Typography variant="body2" color="text.secondary">
                                                                        {candidate.student_email}
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        </Box>
                                                        <Box sx={{ minWidth: 100 }}>
                                                            <AnimatedMatchScore
                                                                score={candidate.match_score}
                                                                size={90}
                                                                showLabel={false}
                                                            />
                                                        </Box>
                                                    </Box>

                                                    {candidate.matched_skills && candidate.matched_skills.length > 0 && (
                                                        <Box sx={{ mb: 2 }}>
                                                            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
                                                                Matched Skills:
                                                            </Typography>
                                                            <SkillsCloud
                                                                skills={candidate.matched_skills}
                                                                matchedSkills={candidate.matched_skills}
                                                            />
                                                        </Box>
                                                    )}

                                                    {candidate.explanation && (
                                                        <Box>
                                                            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                                                Match Explanation:
                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                {candidate.explanation}
                                                            </Typography>
                                                        </Box>
                                                    )}
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </Stack>
                            )}
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    );
};

export default CompanyMatches;
