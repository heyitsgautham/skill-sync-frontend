import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Box,
    Typography,
    Paper,
    Button,
    AppBar,
    Toolbar,
    Alert,
    CircularProgress,
    Chip,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import apiClient from '../services/api';

const UploadResume = () => {
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [myResumes, setMyResumes] = useState([]);

    useEffect(() => {
        fetchMyResumes();
    }, []);

    const fetchMyResumes = async () => {
        setLoading(true);
        try {
            const response = await apiClient.get('/resume/my-resumes');
            setMyResumes(response.data);
        } catch (err) {
            console.error('Error fetching resumes:', err);
            setError('Failed to load your resumes');
        } finally {
            setLoading(false);
        }
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            const allowedTypes = [
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            ];
            
            if (!allowedTypes.includes(file.type)) {
                setError('Please select a PDF or Word document');
                setSelectedFile(null);
                return;
            }

            if (file.size > 10 * 1024 * 1024) { // 10MB limit
                setError('File size must be less than 10MB');
                setSelectedFile(null);
                return;
            }

            setSelectedFile(file);
            setError('');
            setSuccess('');
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setError('Please select a file first');
            return;
        }

        setUploading(true);
        setError('');
        setSuccess('');

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            await apiClient.post('/resume/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setSuccess('Resume uploaded and parsed successfully!');
            setSelectedFile(null);
            // Reset file input
            document.getElementById('resume-file-input').value = '';
            // Refresh the resumes list
            fetchMyResumes();
        } catch (err) {
            console.error('Upload error:', err);
            setError(err.response?.data?.detail || 'Failed to upload resume');
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (resumeId) => {
        if (!window.confirm('Are you sure you want to delete this resume?')) {
            return;
        }

        try {
            await apiClient.delete(`/resume/${resumeId}`);
            setSuccess('Resume deleted successfully');
            fetchMyResumes();
        } catch (err) {
            console.error('Delete error:', err);
            setError(err.response?.data?.detail || 'Failed to delete resume');
        }
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
                        Resume Management
                    </Typography>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                {/* Upload Section */}
                <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                    <Typography variant="h5" gutterBottom>
                        Upload Your Resume
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        Upload your resume (PDF or Word document) to get personalized internship recommendations
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
                            {error}
                        </Alert>
                    )}

                    {success && (
                        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>
                            {success}
                        </Alert>
                    )}

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <input
                            id="resume-file-input"
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileSelect}
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="resume-file-input">
                            <Button
                                variant="outlined"
                                component="span"
                                startIcon={<CloudUploadIcon />}
                                disabled={uploading}
                            >
                                Choose File
                            </Button>
                        </label>

                        {selectedFile && (
                            <Typography variant="body2">
                                {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
                            </Typography>
                        )}

                        <Button
                            variant="contained"
                            onClick={handleUpload}
                            disabled={!selectedFile || uploading}
                            startIcon={uploading ? <CircularProgress size={20} /> : <CloudUploadIcon />}
                        >
                            {uploading ? 'Uploading...' : 'Upload Resume'}
                        </Button>
                    </Box>
                </Paper>

                {/* My Resumes Section */}
                <Paper elevation={3} sx={{ p: 3 }}>
                    <Typography variant="h5" gutterBottom>
                        My Resumes
                    </Typography>

                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                            <CircularProgress />
                        </Box>
                    ) : myResumes.length === 0 ? (
                        <Alert severity="info">
                            You haven't uploaded any resumes yet. Upload one to get started!
                        </Alert>
                    ) : (
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>File Name</TableCell>
                                        <TableCell>Extracted Skills</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell align="right">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {myResumes.map((resume) => (
                                        <TableRow key={resume.id}>
                                            <TableCell>{resume.file_name}</TableCell>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                    {resume.extracted_skills?.slice(0, 5).map((skill, idx) => (
                                                        <Chip
                                                            key={idx}
                                                            label={skill}
                                                            size="small"
                                                            color="primary"
                                                            variant="outlined"
                                                        />
                                                    ))}
                                                    {resume.extracted_skills?.length > 5 && (
                                                        <Chip
                                                            label={`+${resume.extracted_skills.length - 5} more`}
                                                            size="small"
                                                            variant="outlined"
                                                        />
                                                    )}
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                {resume.is_active === 1 ? (
                                                    <Chip
                                                        icon={<CheckCircleIcon />}
                                                        label="Active"
                                                        color="success"
                                                        size="small"
                                                    />
                                                ) : (
                                                    <Chip label="Inactive" size="small" />
                                                )}
                                            </TableCell>
                                            <TableCell align="right">
                                                <IconButton
                                                    color="error"
                                                    onClick={() => handleDelete(resume.id)}
                                                    size="small"
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Paper>
            </Container>
        </Box>
    );
};

export default UploadResume;
