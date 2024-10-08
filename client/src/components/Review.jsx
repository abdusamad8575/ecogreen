// import React, { useState } from 'react';
// import { Button, Card, Col, Form, Modal, Row } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './Review.css';
// import { FaStar, FaUserCircle } from 'react-icons/fa';

// function Review() {
//   const [showReviewModal, setShowReviewModal] = useState(false);
//   const [newReview, setNewReview] = useState({
//     name: '',
//     rating: 0,
//     review: '',
//   });
//   const [showAllReviews, setShowAllReviews] = useState(false);


//   const [reviews, setReviews] = useState([
//     {
//       id: 1,
//       name: 'John Doe',
//       rating: 5,
//       review: 'This product is amazing! Highly recommended.',
//       date: '2023-04-25',
//     },
//     {
//       id: 2,
//       name: 'Jane Smith',
//       rating: 4,
//       review: 'Good product, but could be better in terms of durability.',
//       date: '2023-04-20',
//     },
//     {
//       id: 3,
//       name: 'Bob Johnson',
//       rating: 3,
//       review: 'Average product, nothing special.',
//       date: '2023-04-15',
//     },
//     {
//       id: 4,
//       name: 'Alice Brown',
//       rating: 5,
//       review: 'Excellent product! Would buy again.',
//       date: '2023-04-10',
//     },
//     {
//       id: 5,
//       name: 'Chris Evans',
//       rating: 2,
//       review: 'Disappointing quality, not worth the price.',
//       date: '2023-04-05',
//     },
//     {
//       id: 6,
//       name: 'Emily White',
//       rating: 4,
//       review: 'Impressed with the performance.',
//       date: '2023-04-01',
//     },
//   ]);

//   const handleOpenReviewModal = () => setShowReviewModal(true);
//   const handleCloseReviewModal = () => setShowReviewModal(false);

//   const handleReviewChange = (e) => {
//     setNewReview({ ...newReview, [e.target.name]: e.target.value });
//   };

//   const handleSubmitReview = () => {
//     const newReviewData = {
//       id: reviews.length + 1,
//       name: newReview.name,
//       rating: parseInt(newReview.rating, 10),
//       review: newReview.review,
//       date: new Date().toISOString().split('T')[0],
//     };

//     setReviews([newReviewData, ...reviews]);
//     setNewReview({ name: '', rating: 0, review: '' });
//     handleCloseReviewModal();
//   };

//   const handleReadMore = () => {
//     setShowAllReviews(true);
//   };

//   const totalReviews = reviews.length;
//   const ratingCounts = [0, 0, 0, 0, 0];
//   reviews.forEach((review) => {
//     ratingCounts[review.rating - 1]++;
//   });

//   const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
//   const averageRating = (totalRating / totalReviews).toFixed(1);

//   const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 4);

//   return (
//     <div className="review-section my-5">
//       <h2 className="text-center mb-4 fw-bold text-primary">Customer Reviews</h2>
//       <Row className="g-4">
//         <Col lg={4}>
//           <Card className="rating-summary-card h-100 border-0 shadow">
//             <Card.Body>
//               <Card.Title className="fw-bold mb-4 text-primary">Ratings Overview</Card.Title>
//               <div className="text-center mb-4">
//                 <h1 className="display-4 fw-bold text-primary">{averageRating}</h1>
//                 <div className="star-rating mb-2">
//                   {[...Array(5)].map((_, index) => (
//                     <FaStar
//                       key={index}
//                       className={index < Math.floor(averageRating) ? 'text-warning' : 'text-muted'}
//                     />
//                   ))}
//                 </div>
//                 <p className="text-muted">{totalReviews} ratings</p>
//               </div>
//               <div className="rating-bars">
//                 {[5, 4, 3, 2, 1].map((rating) => (
//                   <div key={rating} className="d-flex align-items-center mb-3">
//                     <span className="text-muted me-2">{rating}</span>
//                     <div className="rating-bar-container flex-grow-1 mx-2">
//                       <div 
//                         className="rating-bar bg-primary"
//                         style={{width: `${(ratingCounts[rating - 1] / totalReviews) * 100}%`}}
//                       ></div>
//                     </div>
//                     <span className="text-muted ms-2 rating-percentage">
//                       {((ratingCounts[rating - 1] / totalReviews) * 100).toFixed(0)}%
//                     </span>
//                   </div>
//                 ))}
//               </div>
//               <div className="mt-4">
//                 <h5 className="fw-bold text-primary mb-2">Review this product</h5>
//                 <p className="text-muted">Share your thoughts with other customers</p>
//                 <Button
//                   variant="outline-primary"
//                   className="w-100 py-2 mt-2"
//                   onClick={handleOpenReviewModal}
//                 >
//                   Write a Review
//                 </Button>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col lg={8}>
//           <Card className="border-0 shadow">
//             <Card.Body>
//               <Card.Title className="fw-bold text-primary mb-4">Customer Reviews</Card.Title>
//               {displayedReviews.map((review) => (
//                 <div key={review.id} className="mb-4 pb-4 border-bottom">
//                   <div className="d-flex justify-content-between align-items-center mb-2">
//                     <div className="d-flex align-items-center">
//                       <FaUserCircle className="text-primary me-2" size={24} />
//                       <span className="fw-bold text-primary">{review.name}</span>
//                     </div>
//                     <small className="text-muted">{review.date}</small>
//                   </div>
//                   <div className="star-rating mb-2">
//                     {[...Array(5)].map((_, index) => (
//                       <FaStar
//                         key={index}
//                         className={index < review.rating ? 'text-warning' : 'text-muted'}
//                       />
//                     ))}
//                   </div>
//                   <p className="mb-0 text-secondary">{review.review}</p>
//                 </div>
//               ))}
//               {!showAllReviews && (
//                 <div className="text-center mt-4">
//                   <Button variant="outline-primary" onClick={handleReadMore}>
//                     Load More Reviews
//                   </Button>
//                 </div>
//               )}
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       <Modal show={showReviewModal} onHide={handleCloseReviewModal}>
//         <Modal.Header closeButton>
//           <Modal.Title className="text-primary">Write a Review</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="formName">
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="name"
//                 value={newReview.name}
//                 onChange={handleReviewChange}
//                 placeholder="Enter your name"
//               />
//             </Form.Group>
//             <Form.Group controlId="formRating" className="mt-3">
//               <Form.Label>Rating</Form.Label>
//               <div className="star-rating-input">
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <FaStar
//                     key={star}
//                     className={star <= newReview.rating ? 'text-warning' : 'text-muted'}
//                     style={{ cursor: 'pointer' }}
//                     onClick={() => setNewReview({ ...newReview, rating: star })}
//                   />
//                 ))}
//               </div>
//             </Form.Group>
//             <Form.Group controlId="formReview" className="mt-3">
//               <Form.Label>Review</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 name="review"
//                 value={newReview.review}
//                 onChange={handleReviewChange}
//                 rows={3}
//                 placeholder="Write your review"
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseReviewModal}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={handleSubmitReview}>
//             Submit Review
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }

// export default Review;


import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Form, Modal, ProgressBar, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Review.css';
import { useSelector } from 'react-redux';
import axiosInstance from '../axios'

function Review({ productId }) {
  const userDetails = useSelector((state) => state.userDetails);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 0,
    review: '',
  });
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [canWriteReview, setCanWriteReview] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axiosInstance.get(`/reviews/${productId}`);
        setReviews(response?.data?.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    const checkCanWriteReview = async () => {
      try {
        const response = await axiosInstance.get(`/orders/user/${userDetails?._id}/product/${productId}`);
        setCanWriteReview(response?.data?.canWriteReview);
      } catch (error) {
        console.error('Error checking if user can write review:', error);
      }
    };

    fetchReviews();
    if (userDetails) {
      checkCanWriteReview();
    }
  }, [productId, userDetails]);

  const handleOpenReviewModal = () => setShowReviewModal(true);
  const handleCloseReviewModal = () => setShowReviewModal(false);

  const handleReviewChange = (e) => {
    setNewReview({ ...newReview, [e.target.name]: e.target.value });
    setFormError('');
  };

  const handleSubmitReview = async () => {
    if (!newReview.name || newReview.rating === 0 || !newReview.review) {
      setFormError('All fields are required.');
      return;
    }

    try {
      const response = await axiosInstance.post(`/reviews`, {
        productId,
        userId: userDetails?._id,
        ...newReview,
      }, {
        headers: {
          Authorization: `Bearer ${userDetails?.token}`,
        },
      });

      // Add the new review to the beginning of the reviews array
      setReviews([response?.data?.data, ...reviews]);
      setNewReview({ name: '', rating: 0, review: '' });
      handleCloseReviewModal();
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const handleReadMore = () => {
    setShowAllReviews(true);
  };

  const totalReviews = reviews?.length;
  const ratingCounts = [0, 0, 0, 0, 0];
  reviews?.forEach((review) => {
    ratingCounts[review?.rating - 1]++;
  });

  const totalRating = reviews?.reduce((sum, review) => sum + review?.rating, 0);
  const averageRating = (totalRating / totalReviews).toFixed(1);

  const displayedReviews = showAllReviews ? reviews : reviews?.slice(0, 4);

  return (
    <div className="review-section mt-5">
      <h1 className="text-center mb-4 fw-bold">Customer Reviews</h1>
      <Row className="mb-4">
        <Col md={4}>
          <Card className="rating-summary-card">
            <Card.Body>
              <Card.Title className="fw-bold mb-3">Ratings & Reviews</Card.Title>
              <Row>
                <Col  className="text-center">
                  <div className="rating-summary">
                    <h1>{totalReviews > 0 ? averageRating : '0'}</h1>
                    <div>
                      {[...Array(5)].map((_, index) => (
                        <i
                          key={index}
                          className={`fas fa-star ${index < Math.floor(averageRating) ? 'text-success' : 'text-muted'}`}
                        />
                      ))}
                    </div>
                    <small>{totalReviews} ratings</small>
                  </div>
                </Col>
                {/* <Col lg={8}>
                  <div className="rating-bars">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="d-flex align-items-center mb-2  individualbars">
                        <span className="text-muted me-2 d-flex">
                          <span className="fw-bold">{rating}</span> <i className="fas fa-star" />
                        </span>
                        <div className="progress-container flex-grow-1 mx-2">
                          <ProgressBar
                            now={(ratingCounts[rating - 1] / totalReviews) * 100}
                            variant="success"
                            className="progress-bar-custom"
                          />
                        </div>
                        <span>
                          {totalReviews > 0 ? `${((ratingCounts[rating - 1] / totalReviews) * 100).toFixed(0)}%` : '0%'}
                        </span>
                      </div>
                    ))}
                  </div>
                </Col> */}
              </Row>
              <Row>
              <Col >
                  <div className="rating-bars mt-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="d-flex align-items-center mb-2  individualbars">
                        <span className="text-muted me-2 d-flex">
                          <span className="fw-bold">{rating}</span> <i className="fas fa-star" />
                        </span>
                        <div className="progress-container flex-grow-1 mx-2">
                          <ProgressBar
                            now={(ratingCounts[rating - 1] / totalReviews) * 100}
                            variant="success"
                            className="progress-bar-custom"
                          />
                        </div>
                        <span>
                          {totalReviews > 0 ? `${((ratingCounts[rating - 1] / totalReviews) * 100).toFixed(0)}%` : '0%'}
                        </span>
                      </div>
                    ))}
                  </div>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col>
                  <div>
                    <h5 className="fw-bold">Review this product</h5>
                    <p className="text-muted">Help others make an informed decision</p>
                  </div>
                  <Button
                    variant="outline-success"
                    className="rounded-pill w-100 p-2 mt-2"
                    onClick={handleOpenReviewModal}
                    disabled={!canWriteReview}
                  >
                    Write a Review
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title>Reviews from customers</Card.Title>
              {displayedReviews?.map((review) => (
                <div key={review?._id} className="mb-4">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <div>
                      <div>
                        {[...Array(5)].map((_, index) => (
                          <i
                            key={index}
                            className={`fas fa-star ${index < review?.rating ? 'text-success' : 'text-muted'}`}
                          />
                        ))}
                      </div>
                      <span className="me-2 fw-bold">{review?.name}</span>
                    </div>
                    <div>
                      <small className="me-auto">{new Date(review.date).toLocaleString()}</small>
                    </div>
                  </div>
                  <p>{review?.review}</p>
                </div>
              ))}
              {!showAllReviews && (
                <div className="text-center">
                  <Button variant="outline-success" onClick={handleReadMore}>
                    Read More Reviews
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showReviewModal} onHide={handleCloseReviewModal}>
        <Modal.Header closeButton>
          <Modal.Title>Write a Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newReview?.name}
                onChange={handleReviewChange}
                placeholder="Enter your name"
              />
            </Form.Group>
            <Form.Group controlId="formRating" className="mt-3">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                as="select"
                name="rating"
                value={newReview?.rating}
                onChange={handleReviewChange}
              >
                <option value={0}>Select rating</option>
                <option value={1}>1 star</option>
                <option value={2}>2 stars</option>
                <option value={3}>3 stars</option>
                <option value={4}>4 stars</option>
                <option value={5}>5 stars</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formReview" className="mt-3">
              <Form.Label>Review</Form.Label>
              <Form.Control
                as="textarea"
                name="review"
                value={newReview?.review}
                onChange={handleReviewChange}
                rows={3}
                placeholder="Write your review"
              />
            </Form.Group>
            {formError && <p className="text-danger mt-3">{formError}</p>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseReviewModal}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSubmitReview}>
            Submit Review
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Review;
