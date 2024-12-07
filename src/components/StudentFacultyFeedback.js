import React, { useState, useEffect } from 'react';
import './StudentFacultyFeedback.css';

function FacultyFeedback() {
    const [courses, setCourses] = useState([]);
    const [selectedInstructor, setSelectedInstructor] = useState(null);
    const [instructorFeedbackData, setInstructorFeedbackData] = useState({
        courseId: '',
        instructorId: '',
        materialExplanationRating: '',
        objectivesClarityRating: '',
        contentRelevanceRating: '',
        assignmentClarityRating: '',
        gradingCriteriaRating: '',
        additionalComments: '',
    });

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('/api/courses');
                const data = await response.json();
                setCourses(data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    const handleInstructorSelect = (course) => {
        setSelectedInstructor({
            name: course.instructor,
            courseId: course.id,
        });
        setInstructorFeedbackData((prev) => ({
            ...prev,
            courseId: course.id,
            instructorId: course.instructor,
        }));
    };

    const handleFeedbackChange = (e) => {
        const { name, value } = e.target;
        setInstructorFeedbackData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const submitInstructorFeedback = async (e) => {
        e.preventDefault();
        try {
            const ratings = [
                instructorFeedbackData.materialExplanationRating,
                instructorFeedbackData.objectivesClarityRating,
                instructorFeedbackData.contentRelevanceRating,
                instructorFeedbackData.assignmentClarityRating,
                instructorFeedbackData.gradingCriteriaRating
            ];
            
            const validRatings = ratings.filter(r => r && parseInt(r) > 0);
            const overallRating = validRatings.length > 0 
                ? Math.round(validRatings.reduce((a, b) => parseInt(a) + parseInt(b), 0) / validRatings.length)
                : 0;
    
            const feedbackData = {
                courseId: instructorFeedbackData.courseId,
                instructorId: selectedInstructor.name,
                rating: overallRating,
                materialExplanationRating: parseInt(instructorFeedbackData.materialExplanationRating) || 0,
                objectivesClarityRating: parseInt(instructorFeedbackData.objectivesClarityRating) || 0,
                contentRelevanceRating: parseInt(instructorFeedbackData.contentRelevanceRating) || 0,
                assignmentClarityRating: parseInt(instructorFeedbackData.assignmentClarityRating) || 0,
                gradingCriteriaRating: parseInt(instructorFeedbackData.gradingCriteriaRating) || 0,
                comment: instructorFeedbackData.additionalComments || '',
                additionalComments: instructorFeedbackData.additionalComments || ''
            };
    
            const response = await fetch('/api/instructor-feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(feedbackData),
            });
    
            if (response.ok) {
                alert('Instructor Feedback Submitted Successfully');
                setSelectedInstructor(null);
                setInstructorFeedbackData({
                    courseId: '',
                    instructorId: '',
                    materialExplanationRating: '',
                    objectivesClarityRating: '',
                    contentRelevanceRating: '',
                    assignmentClarityRating: '',
                    gradingCriteriaRating: '',
                    additionalComments: '',
                });
            } else {
                const errorText = await response.text();
                alert(`Failed to Submit Instructor Feedback: ${errorText}`);
            }
        } catch (error) {
            console.error('Error submitting instructor feedback:', error);
            alert('An error occurred while submitting feedback');
        }
    };

    const closeModal = () => {
        setSelectedInstructor(null);
    };

    const renderRatingDropdown = (name, label) => (
        <div className="form-group">
            <label>{label}</label>
            <div className="select-wrapper">
                <select
                    name={name}
                    value={instructorFeedbackData[name]}
                    onChange={handleFeedbackChange}
                    required
                >
                    <option value="">Select Rating</option>
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Average</option>
                    <option value="4">4 - Good</option>
                    <option value="5">5 - Excellent</option>
                </select>
            </div>
        </div>
    );

    return (
        <div className="faculty-feedback-container">
            <div className="feedback-wrapper">
                <h1>Course Instructor Feedback</h1>
                <div className="courses-grid">
                    {Array.isArray(courses) && courses.length > 0 ? (
                        courses.map((course) => (
                            <div
                                key={course.id}
                                className="course-card"
                                onClick={() => handleInstructorSelect(course)}
                            >
                                <div className="course-header">
                                    <h3>{course.courseName}</h3>
                                    <span className="course-code">{course.courseCode}</span>
                                </div>
                                <div className="course-details">
                                    <p className="instructor-name">{course.instructor}</p>
                                    <p className="department">{course.department}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="no-courses">No courses available</p>
                    )}
                </div>

                {selectedInstructor && (
                    <div className="feedback-modal">
                        <div className="feedback-content">
                            <button 
                                className="close-modal-btn" 
                                onClick={closeModal}
                                aria-label="Close Feedback Modal"
                            >
                                &times;
                            </button>
                            <h2>Instructor Feedback Form</h2>
                            <form onSubmit={submitInstructorFeedback}>
                                <div className="instructor-info">
                                    <div className="form-group">
                                        <label>Instructor</label>
                                        <input
                                            type="text"
                                            value={selectedInstructor.name}
                                            disabled
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Course</label>
                                        <input
                                            type="text"
                                            value={courses.find(c => c.id === selectedInstructor.courseId)?.courseName}
                                            disabled
                                        />
                                    </div>
                                </div>

                                {renderRatingDropdown(
                                    'materialExplanationRating', 
                                    'Course Material Explanation'
                                )}

                                {renderRatingDropdown(
                                    'objectivesClarityRating', 
                                    'Course Objectives Clarity'
                                )}

                                {renderRatingDropdown(
                                    'contentRelevanceRating', 
                                    'Content Relevance'
                                )}

                                {renderRatingDropdown(
                                    'assignmentClarityRating', 
                                    'Assignment Clarity'
                                )}

                                {renderRatingDropdown(
                                    'gradingCriteriaRating', 
                                    'Grading Transparency'
                                )}

                                <div className="form-group comments-group">
                                    <label>Additional Comments</label>
                                    <textarea
                                        name="additionalComments"
                                        value={instructorFeedbackData.additionalComments}
                                        onChange={handleFeedbackChange}
                                        placeholder="Share your detailed feedback..."
                                        rows="4"
                                    />
                                </div>

                                <div className="form-actions">
                                    <button 
                                        type="submit" 
                                        className="submit-feedback-btn"
                                    >
                                        Submit Feedback
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default FacultyFeedback;