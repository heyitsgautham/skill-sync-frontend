import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Paper,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Card,
    CardContent,
    Chip,
    Grid,
    LinearProgress,
    Divider,
    Alert,
    CircularProgress,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PsychologyIcon from '@mui/icons-material/Psychology';
import Layout from '../components/Layout';
import axios from 'axios';
import toast from 'react-hot-toast';

const IntelligentRanking = () => {
    const [internships, setInternships] = useState([]);
    const [selectedInternship, setSelectedInternship] = useState('');
    const [selectedInternshipData, setSelectedInternshipData] = useState(null);
    const [rankedCandidates, setRankedCandidates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingInternships, setLoadingInternships] = useState(true);
    const [scoringInfo, setScoringInfo] = useState(null);

    useEffect(() => {
        fetchInternships();
    }, []);

    const fetchInternships = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8000/api/internship/my-posts', {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Ensure internship_id exists, otherwise use id as fallback
            const processedInternships = (response.data || []).map(internship => ({
                ...internship,
                internship_id: internship.internship_id || internship.id
            }));
            setInternships(processedInternships);
        } catch (error) {
            console.error('Error fetching internships:', error);
            toast.error('Failed to load internships');
        } finally {
            setLoadingInternships(false);
        }
    };

    const handleRankCandidates = async () => {
        if (!selectedInternship) {
            toast.error('Please select an internship');
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            console.log('🚀 Calling rank-candidates API with internship ID:', selectedInternship);
            const response = await axios.post(
                `http://localhost:8000/api/filter/rank-candidates/${selectedInternship}?limit=50`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            console.log('📊 Rank candidates response:', response.data);
            console.log('👥 Total candidates:', response.data.total_candidates);
            console.log('🏆 Ranked candidates count:', response.data.ranked_candidates?.length);

            setRankedCandidates(response.data.ranked_candidates || []);
            setScoringInfo(response.data.scoring_info || null);

            if (response.data.ranked_candidates?.length > 0) {
                toast.success(`✨ Ranked ${response.data.ranked_candidates.length} candidates successfully!`);
            } else {
                const message = response.data.total_candidates === 0
                    ? 'No candidates found with uploaded resumes'
                    : 'No matching candidates found for this internship';
                toast(message, { icon: 'ℹ️' });
            }
        } catch (error) {
            console.error('Error ranking candidates:', error);
            toast.error(error.response?.data?.detail || 'Failed to rank candidates');
        } finally {
            setLoading(false);
        }
    };

    const getScoreColor = (score) => {
        if (score >= 80) return '#4caf50'; // Green
        if (score >= 60) return '#ff9800'; // Orange
        return '#f44336'; // Red
    };

    const getMatchLabel = (score) => {
        if (score >= 80) return 'Strong Match';
        if (score >= 60) return 'Moderate Match';
        return 'Weak Match';
    };

    return (
        <Layout>
            <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                {/* Header */}
                <Box sx={{ mb: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <PsychologyIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
                        <Typography variant="h4" component="h1" fontWeight="bold">
                            AI-Powered Candidate Ranking
                        </Typography>
                    </Box>
                    <Typography variant="body1" color="text.secondary">
                        Intelligent resume filtering system powered by Google Gemini AI and semantic matching
                    </Typography>
                </Box>

                {/* Internship Selector */}
                <Paper sx={{ p: 3, mb: 4 }}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid size={{ xs: 12, md: 8 }}>
                            <FormControl fullWidth>
                                <InputLabel>Select Internship</InputLabel>
                                <Select
                                    value={selectedInternship || ''}
                                    label="Select Internship"
                                    onChange={(e) => {
                                        const value = e.target.value || '';
                                        setSelectedInternship(value);
                                        // Store the full internship data for later use
                                        const internshipData = internships.find(i => i.internship_id === value);
                                        setSelectedInternshipData(internshipData);
                                    }}
                                    disabled={loadingInternships}
                                >
                                    {internships.map((internship) => (
                                        <MenuItem key={internship.internship_id} value={internship.internship_id}>
                                            {internship.title} - {internship.location || 'Remote'}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Button
                                variant="contained"
                                size="large"
                                fullWidth
                                onClick={handleRankCandidates}
                                disabled={!selectedInternship || loading}
                                startIcon={loading ? <CircularProgress size={20} /> : <TrendingUpIcon />}
                                sx={{ height: 56 }}
                            >
                                {loading ? 'Analyzing...' : 'Rank Candidates'}
                            </Button>
                        </Grid>
                    </Grid>

                    {/* Scoring Methodology Info */}
                    {scoringInfo && (
                        <Alert severity="info" sx={{ mt: 2 }}>
                            <Typography variant="body2" fontWeight="bold" gutterBottom>
                                Scoring Methodology: {scoringInfo.methodology}
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                                {Object.entries(scoringInfo.components).map(([key, value]) => (
                                    <Chip
                                        key={key}
                                        label={`${key.replace(/_/g, ' ')}: ${value}`}
                                        size="small"
                                        variant="outlined"
                                    />
                                ))}
                            </Box>
                        </Alert>
                    )}
                </Paper>

                {/* Ranked Candidates List */}
                {rankedCandidates.length > 0 && (
                    <Box>
                        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                            <EmojiEventsIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                            Top Candidates ({rankedCandidates.length})
                        </Typography>

                        {rankedCandidates.map((candidate, index) => (
                            <Card
                                key={candidate.candidate_id}
                                sx={{
                                    mb: 3,
                                    transition: 'all 0.3s',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: 6,
                                    },
                                }}
                            >
                                <CardContent>
                                    {/* Header with Rank and Score */}
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <Box
                                            sx={{
                                                width: 50,
                                                height: 50,
                                                borderRadius: '50%',
                                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                color: 'white',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontWeight: 'bold',
                                                fontSize: '1.5rem',
                                                mr: 2,
                                            }}
                                        >
                                            #{index + 1}
                                        </Box>
                                        <Box sx={{ flex: 1 }}>
                                            <Typography variant="h6" fontWeight="bold">
                                                {candidate.candidate_name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                ID: {candidate.candidate_id}
                                            </Typography>
                                        </Box>
                                        <Chip
                                            label={`${candidate.match_score.toFixed(1)}% Match`}
                                            sx={{
                                                backgroundColor: getScoreColor(candidate.match_score),
                                                color: 'white',
                                                fontWeight: 'bold',
                                                fontSize: '1rem',
                                                px: 2,
                                            }}
                                        />
                                    </Box>

                                    {/* Match Label */}
                                    <Alert
                                        severity={candidate.match_score >= 80 ? 'success' : candidate.match_score >= 60 ? 'warning' : 'error'}
                                        sx={{ mb: 2 }}
                                    >
                                        <Typography variant="subtitle2" fontWeight="bold">
                                            {getMatchLabel(candidate.match_score)}
                                        </Typography>
                                    </Alert>

                                    {/* Component Scores */}
                                    <Accordion defaultExpanded={index === 0}>
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                            <Typography variant="subtitle1" fontWeight="bold">
                                                📊 Score Breakdown
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Grid container spacing={2}>
                                                {Object.entries(candidate.component_scores).map(([key, value]) => (
                                                    <Grid size={12} key={key}>
                                                        <Box sx={{ mb: 1 }}>
                                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                                                <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                                                                    {key.replace(/_/g, ' ')}
                                                                </Typography>
                                                                <Typography variant="body2" fontWeight="bold">
                                                                    {value.toFixed(1)}%
                                                                </Typography>
                                                            </Box>
                                                            <LinearProgress
                                                                variant="determinate"
                                                                value={value}
                                                                sx={{
                                                                    height: 8,
                                                                    borderRadius: 5,
                                                                    backgroundColor: 'rgba(0,0,0,0.1)',
                                                                    '& .MuiLinearProgress-bar': {
                                                                        background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                                                                    },
                                                                }}
                                                            />
                                                        </Box>
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </AccordionDetails>
                                    </Accordion>

                                    {/* Skills Match Details */}
                                    <Accordion>
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                            <Typography variant="subtitle1" fontWeight="bold">
                                                💼 Skills Analysis
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            {/* Matched Skills */}
                                            {candidate.match_details.matched_skills?.length > 0 && (
                                                <Box sx={{ mb: 2 }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                        <CheckCircleIcon sx={{ color: 'success.main', mr: 1 }} />
                                                        <Typography variant="subtitle2" fontWeight="bold">
                                                            Matched Skills ({candidate.match_details.matched_skills.length})
                                                        </Typography>
                                                    </Box>
                                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                                        {candidate.match_details.matched_skills.map((skill) => (
                                                            <Chip
                                                                key={skill}
                                                                label={skill}
                                                                size="small"
                                                                sx={{ backgroundColor: '#dcfce7', color: '#166534' }}
                                                            />
                                                        ))}
                                                    </Box>
                                                </Box>
                                            )}

                                            {/* Missing Skills */}
                                            {candidate.match_details.missing_skills?.length > 0 && (
                                                <Box>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                        <CancelIcon sx={{ color: 'error.main', mr: 1 }} />
                                                        <Typography variant="subtitle2" fontWeight="bold">
                                                            Missing Skills ({candidate.match_details.missing_skills.length})
                                                        </Typography>
                                                    </Box>
                                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                                        {candidate.match_details.missing_skills.map((skill) => (
                                                            <Chip
                                                                key={skill}
                                                                label={skill}
                                                                size="small"
                                                                sx={{ backgroundColor: '#fee2e2', color: '#991b1b' }}
                                                            />
                                                        ))}
                                                    </Box>
                                                </Box>
                                            )}
                                        </AccordionDetails>
                                    </Accordion>

                                    {/* AI Explanation */}
                                    <Accordion>
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                            <Typography variant="subtitle1" fontWeight="bold">
                                                🤖 AI Analysis & Recommendation
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Paper
                                                sx={{
                                                    p: 2,
                                                    backgroundColor: '#f9fafb',
                                                    borderLeft: '4px solid #667eea',
                                                }}
                                            >
                                                <Typography variant="body2" sx={{ whiteSpace: 'pre-line', lineHeight: 1.8 }}>
                                                    {candidate.explanation}
                                                </Typography>
                                            </Paper>
                                        </AccordionDetails>
                                    </Accordion>

                                    <Divider sx={{ my: 2 }} />

                                    {/* Action Buttons */}
                                    <Grid container spacing={2}>
                                        <Grid size={{ xs: 12, sm: 4 }}>
                                            <Button
                                                variant="outlined"
                                                fullWidth
                                                onClick={() => toast.info('View profile feature coming soon!')}
                                            >
                                                View Full Profile
                                            </Button>
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 4 }}>
                                            <Button
                                                variant="contained"
                                                fullWidth
                                                color="primary"
                                                onClick={() => toast.success('Candidate shortlisted!')}
                                            >
                                                Shortlist
                                            </Button>
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 4 }}>
                                            <Button
                                                variant="contained"
                                                fullWidth
                                                color="success"
                                                onClick={() => toast.success('Interview scheduling feature coming soon!')}
                                            >
                                                Schedule Interview
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                )}

                {/* Empty State */}
                {!loading && rankedCandidates.length === 0 && selectedInternship && (
                    <Paper sx={{ p: 6, textAlign: 'center' }}>
                        <PsychologyIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            No candidates ranked yet
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Click "Rank Candidates" to see AI-powered intelligent rankings
                        </Typography>
                    </Paper>
                )}
            </Container>
        </Layout>
    );
};

export default IntelligentRanking;
