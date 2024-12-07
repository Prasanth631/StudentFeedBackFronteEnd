import React, { useState, useRef } from 'react';
import './AdminCourseFeedback.css';

function CreateCourse() {
    const [courseData, setCourseData] = useState({
        courseName: '',
        courseCode: '',
        description: '',
        department: '',
        credits: '',
        instructor: ''
    });

    const [formStatus, setFormStatus] = useState({
        isSubmitting: false,
        message: '',
        type: ''
    });

    const formRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCourseData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCreateCourse = async (e) => {
        e.preventDefault();
        
        // Reset previous messages
        setFormStatus({ isSubmitting: true, message: '', type: '' });

        try {
            const response = await fetch('/api/courses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(courseData)
            });

            if (response.ok) {
                // Success animation and message
                setFormStatus({
                    isSubmitting: false,
                    message: 'Course Created Successfully!',
                    type: 'success'
                });

                // Reset form
                setCourseData({
                    courseName: '',
                    courseCode: '',
                    description: '',
                    department: '',
                    credits: '',
                    instructor: ''
                });

                // Trigger form reset animation
                formRef.current.classList.add('form-reset');
                setTimeout(() => {
                    formRef.current.classList.remove('form-reset');
                }, 1000);
            } else {
                // Error handling
                const errorData = await response.json();
                setFormStatus({
                    isSubmitting: false,
                    message: errorData.message || 'Failed to Create Course',
                    type: 'error'
                });
            }
        } catch (error) {
            console.error('Error creating course:', error);
            setFormStatus({
                isSubmitting: false,
                message: 'Network Error. Please try again.',
                type: 'error'
            });
        }
    };

    const departments = [
        { value: 'computer-science', label: 'Computer Science' },
        { value: 'csit', label: 'CSIT' },
        { value: 'aids', label: 'AIDS' },
        { value: 'ece', label: 'ECE' }
    ];

    return (
        <div className="course-creation-container">
            <div className="course-creation-wrapper">
                <form 
                    ref={formRef}
                    onSubmit={handleCreateCourse} 
                    className="course-form"
                >
                    <h2 className="form-title">Create New Course</h2>
                    
                    {formStatus.message && (
                        <div className={`form-message ${formStatus.type}`}>
                            {formStatus.message}
                        </div>
                    )}

                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="courseName">Course Name</label>
                            <input
                                id="courseName"
                                type="text"
                                name="courseName"
                                value={courseData.courseName}
                                onChange={handleInputChange}
                                required
                                placeholder="Enter course name"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="courseCode">Course Code</label>
                            <input
                                id="courseCode"
                                type="text"
                                name="courseCode"
                                value={courseData.courseCode}
                                onChange={handleInputChange}
                                required
                                placeholder="Enter course code"
                            />
                        </div>

                        <div className="form-group full-width">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={courseData.description}
                                onChange={handleInputChange}
                                required
                                placeholder="Enter course description"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="department">Department</label>
                            <select
                                id="department"
                                name="department"
                                value={courseData.department}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select Department</option>
                                {departments.map(dept => (
                                    <option key={dept.value} value={dept.value}>
                                        {dept.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="credits">Credits</label>
                            <input
                                id="credits"
                                type="number"
                                name="credits"
                                value={courseData.credits}
                                onChange={handleInputChange}
                                required
                                min="1"
                                max="10"
                                placeholder="Course credits"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="instructor">Instructor</label>
                            <input
                                id="instructor"
                                type="text"
                                name="instructor"
                                value={courseData.instructor}
                                onChange={handleInputChange}
                                required
                                placeholder="Enter instructor name"
                            />
                        </div>

                        <div className="form-group full-width">
                            <button 
                                type="submit" 
                                className="submit-button"
                                disabled={formStatus.isSubmitting}
                            >
                                {formStatus.isSubmitting ? 'Creating...' : 'Create Course'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateCourse;