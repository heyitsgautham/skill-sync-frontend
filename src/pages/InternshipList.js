import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Box,
    Typography,
    Paper,
    AppBar,
    Toolbar,
    Alert,
    CircularProgress,
    Card,
    CardContent,
    CardActions,
    Button,
    Grid,
    Chip,
    IconButton,
    TextField,
    InputAdornment,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TimerIcon from '@mui/icons-material/Timer';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import WorkIcon from '@mui/icons-material/Work';
import apiClient from '../services/api';

const InternshipList = () => {
    const navigate = useNavigate();
    const [internships, setInternships] = useState([]);
    const [filteredInternships, setFilteredInternships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchInternships();
    }, []);

    useEffect(() => {
        // Filter internships based on search query
        if (searchQuery.trim() === '') {
            setFilteredInternships(internships);
        } else {
            const query = searchQuery.toLowerCase();
            const filtered = internships.filter(
                (internship) =>
                    internship.title.toLowerCase().includes(query) ||
                    internship.description.toLowerCase().includes(query) ||
                    internship.location?.toLowerCase().includes(query) ||
                    internship.required_skills?.some(skill => 
                        skill.toLowerCase().includes(query)
                    )
            );
            setFilteredInternships(filtered);
        }
    }, [searchQuery, internships]);

    const fetchInternships = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await apiClient.get('/internship/list');
            setInternships(response.data);
            setFilteredInternships(response.data);
        } catch (err) {
            console.error('Error fetching internships:', err);
            setError(err.response?.data?.detail || 'Failed to load internships');
        } finally {
            setLoading(false);
        }
    };

    const handleApply = (internshipId) => {
        // TODO: Implement apply functionality in future days
        alert(`Apply to internship #${internshipId} - Coming soon!`);
    };

    return (
        <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: 'background.default' }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={() => navigate('/dashboard')}
                        sx={{ mr: 2 }}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Browse Internships
                    </Typography>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                {/* Search Section */}
                <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                    <TextField
                        fullWidth
                        placeholder="Search by title, skills, location..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Paper>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
                        {error}
                    </Alert>
                )}

                {/* Internships List */}
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
                        <CircularProgress />
                    </Box>
                ) : filteredInternships.length === 0 ? (
                    <Alert severity="info">
                        {searchQuery
                            ? 'No internships found matching your search.'
                            : 'No internships available at the moment. Check back later!'}
                    </Alert>
                ) : (
                    <>
                        <Typography variant="h6" gutterBottom>
                            {filteredInternships.length} {filteredInternships.length === 1 ? 'Internship' : 'Internships'} Found
                        </Typography>
                        <Grid container spacing={3}>
                            {filteredInternships.map((internship) => (
                                <Grid xs={12} md={6} key={internship.id}>
                                    <Card elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                <WorkIcon color="primary" sx={{ mr: 1 }} />
                                                <Typography variant="h6" component="div">
                                                    {internship.title}
                                                </Typography>
                                            </Box>

                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{
                                                    mb: 2,
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 3,
                                                    WebkitBoxOrient: 'vertical',
                                                }}
                                            >
                                                {internship.description}
                                            </Typography>

                                            {/* Location */}
                                            {internship.location && (
                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                    <LocationOnIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                                                    <Typography variant="body2" color="text.secondary">
                                                        {internship.location}
                                                    </Typography>
                                                </Box>
                                            )}

                                            {/* Duration */}
                                            {internship.duration && (
                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                    <TimerIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                                                    <Typography variant="body2" color="text.secondary">
                                                        {internship.duration}
                                                    </Typography>
                                                </Box>
                                            )}

                                            {/* Stipend */}
                                            {internship.stipend && (
                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                    <MonetizationOnIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                                                    <Typography variant="body2" color="text.secondary">
                                                        {internship.stipend}
                                                    </Typography>
                                                </Box>
                                            )}

                                            {/* Required Skills */}
                                            {internship.required_skills && internship.required_skills.length > 0 && (
                                                <Box>
                                                    <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
                                                        Required Skills:
                                                    </Typography>
                                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                        {internship.required_skills.map((skill, idx) => (
                                                            <Chip
                                                                key={idx}
                                                                label={skill}
                                                                size="small"
                                                                color="primary"
                                                                variant="outlined"
                                                            />
                                                        ))}
                                                    </Box>
                                                </Box>
                                            )}
                                        </CardContent>

                                        <CardActions sx={{ p: 2, pt: 0 }}>
                                            <Button
                                                variant="contained"
                                                fullWidth
                                                onClick={() => handleApply(internship.id)}
                                            >
                                                Apply Now
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </>
                )}
            </Container>
        </Box>
    );
};

export default InternshipList;
