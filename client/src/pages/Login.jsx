// import React, { useState } from 'react';
// import { Col, Row, Container, Form, Button, Image } from 'react-bootstrap';
// import { FaLock } from 'react-icons/fa';
// import { Link } from 'react-router-dom';

// const Login = () => {
//   const [showPassword, setShowPassword] = useState(false);

//   const handlePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Implement your login logic here
//     console.log('Logging in...');
//   };

//   return (
//     <>
//       <header className="bg-white shadow-sm">
//         <Container className="py-3">
//           <div className="d-flex justify-content-between align-items-center">
//             <Link to="/" className="text-decoration-none">
//               <Image src="logo.png" fluid alt="Logo" style={{ maxWidth: '120px' }} />
//             </Link>
//             <div className="text-success">
//               <FaLock className="me-2" />
//               <span className="fw-bold">Secure Login</span>
//             </div>
//           </div>
//         </Container>
//       </header>
//       <Container className="my-5 bg-light p-4 rounded">
//         <Row className="justify-content-md-center">
//           <Col md={6}>
//             <div className="shadow p-4 rounded">
//               <h3 className="text-center mb-4">Login</h3>
//               <Form onSubmit={handleSubmit}>
//                 <Form.Group className="mb-3" controlId="formBasicEmail">
//                   <Form.Label>Email address</Form.Label>
//                   <Form.Control type="email" placeholder="Enter email" />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="formBasicPassword">
//                   <Form.Label>Password</Form.Label>
//                   <div className="position-relative">
//                     <Form.Control
//                       type={showPassword ? "text" : "password"}
//                       placeholder="Password"
//                     />
//                     <span
//                       className="position-absolute top-50 end-0 translate-middle-y me-3"
//                       onClick={handlePasswordVisibility}
//                       style={{ cursor: "pointer" }}
//                     >
//                       {showPassword ? '👁️' : '👁️‍🗨️'}
//                     </span>
//                   </div>
//                 </Form.Group>

//                 <div className="d-grid gap-2">
//                   <Button variant="outline-success" type="submit">
//                     Login
//                   </Button>
//                 </div>
//               </Form>

//               <div className="mt-3 text-center">
//                 New here?{' '}
//                 <Link to="/register" className="text-primary">
//                   Create an account
//                 </Link>
//               </div>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// };   

// export default Login;


// import React, { useState, useEffect } from 'react';
// import axiosInstance from '../axios';
// import { useNavigate, Link } from 'react-router-dom';
// import { Container, Row, Col, Form, Button, Card, Navbar, Spinner } from 'react-bootstrap';
// import { motion } from 'framer-motion';
// import { FaEye, FaEyeSlash, FaGoogle, FaLock } from 'react-icons/fa';
// import styled from 'styled-components';
// // import GoogleLoginComponent from './GoogleLoginComponent';

// const StyledCard = styled(Card)`
//   border-radius: 15px;
//   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
//   overflow: hidden;
// `;

// const LogoContainer = styled.div`
//   background: linear-gradient(135deg, #fef1e0, #a777e3);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   height: 100%;
// `;
// const Logo = styled.img`
//   max-width: 80%;
//   max-height: 80%;
// `;

// const FormContainer = styled.div`
//   padding: 3rem;
// `;

// const StyledInput = styled(Form.Control)`
//   border-radius: 30px;
//   padding: 0.75rem 1.5rem;
//   border: 1px solid #e0e0e0;
//   transition: all 0.3s ease;

//   &:focus {
//     box-shadow: 0 0 0 0.2rem rgba(110, 142, 251, 0.25);
//     border-color: #6e8efb;
//   }
// `;

// const StyledButton = styled(Button)`
//   border-radius: 30px;
//   padding: 0.75rem 2rem;
//   font-weight: bold;
//   transition: all 0.3s ease;

//   &:hover {
//     transform: translateY(-2px);
//     box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
//   }
// `;

// const GoogleButton = styled(StyledButton)`
//   background-color: #ffffff;
//   color: #757575;
//   border: 1px solid #e0e0e0;

//   &:hover {
//     background-color: #f5f5f5;
//   }
// `;

// const HeaderContainer = styled(Navbar)`
//   background-color: #f8f9fa;
//   box-shadow: 0 2px 4px rgba(0,0,0,0.1);
// `;

// const HeaderLogo = styled.img`
//   height: 60px;
// `;

// const SecureText = styled.span`
//   font-weight: 600;
//   color: #28a745;
//   display: flex;
//   align-items: center;
// `;

// const EyeIcon = styled.span`
//   position: absolute;
//   right: 10px;
//   cursor: pointer;
//   top: 200px;

//   @media (min-width: 576px) {
//     top: 200px;
//   }
//   @media (min-width: 768px) {
//     top: 205px;
//   }
//   @media (min-width: 992px) {
//     top: 210px;
//   }
// `;

// const Login = () => {
//   const [userDetails, setUserDetails] = useState({ number: '', otp: '' });
//   const [showOtpField, setShowOtpField] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [resendTimer, setResendTimer] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     let timer;
//     if (resendTimer > 0) {
//       timer = setInterval(() => setResendTimer(resendTimer - 1), 1000);
//     }
//     return () => clearInterval(timer);
//   }, [resendTimer]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
//   };

//   const handleSendOtp = async () => {
//     try {
//       if (userDetails.number.length === 10) {
//         setLoading(true);
//         await axiosInstance.post('/auth/send-otp', { number: userDetails.number });
//         setShowOtpField(true);
//         setResendTimer(60);
//       } else {
//         alert('Phone Number Must Be 10 Digits');
//       }
//     } catch (error) {
//       console.error('Error sending OTP: ', error);
//       alert('Failed to send OTP. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResendOtp = async () => {
//     if (resendTimer === 0) {
//       handleSendOtp();
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       const response = await axiosInstance.post('/auth/verify-otp', { number: userDetails.number, otp: userDetails.otp });
//       localStorage.setItem(
//         "Tokens",
//         JSON.stringify({ access: response.data.data.token.accessToken, refresh: response.data.data.token.refreshToken })
//       );

//       if (response.data) {
//         navigate(-1);
//       }
//     } catch (error) {
//       console.error('Error during login: ', error);
//       alert(error?.response?.data?.message ?? 'Invalid OTP. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <HeaderContainer expand="lg">
//         <Container>
//           <Navbar.Brand as={Link} to="/">
//             <HeaderLogo src='logo.png' alt="Company Logo" />
//           </Navbar.Brand>
//           <SecureText>
//             <FaLock className="me-2" /> Secure Registration
//           </SecureText>
//         </Container>
//       </HeaderContainer>
//       <Container className="mt-5">
//         <StyledCard>
//           <Row className="g-0">
//             <Col md={6} className="d-none d-md-block">
//               <LogoContainer>
//                 {/* <HeaderLogo src='logo.png' alt="Company Logo" /> */}
//                 <Logo src='logo.png' alt="Company Logo" />
//               </LogoContainer>
//             </Col>
//             <Col md={6}>
//               <FormContainer>
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   <h2 className="text-center mb-4">Welcome Back</h2>
//                   <Form onSubmit={handleSubmit}>
//                     <Form.Group className="mb-4">
//                       <StyledInput
//                         type="text"
//                         name="number"
//                         placeholder="Enter your mobile number"
//                         value={userDetails.number}
//                         required
//                         onChange={handleChange}
//                       />
//                     </Form.Group>
//                     {showOtpField && (
//                       <>
//                         <Form.Group className="mb-4">
//                           <StyledInput
//                             type='text'
//                             placeholder="Enter OTP"
//                             name="otp"
//                             required
//                             value={userDetails.otp}
//                             onChange={handleChange}
//                           />
//                           {/* <EyeIcon onClick={() => setShowPassword(!showPassword)}>
//                             {showPassword ? <FaEyeSlash /> : <FaEye />}
//                           </EyeIcon> */}
//                         </Form.Group>
//                         <Button variant="link" onClick={handleResendOtp} disabled={resendTimer > 0}>
//                           {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : 'Resend OTP'}
//                         </Button>
//                         <StyledButton variant="primary" type="submit" className="w-100 mb-3" disabled={loading}>
//                           {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Verify OTP'}
//                         </StyledButton>
//                       </>
//                     )}
//                   </Form>
//                   {!showOtpField && (
//                     <StyledButton variant="primary" onClick={handleSendOtp} className="w-100 mb-3" disabled={loading}>
//                       {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Send OTP'}
//                     </StyledButton>
//                   )}
//                   {/* <div className="text-center mb-3">
//                     <span>or</span>
//                   </div> */}
//                   {/* <GoogleButton variant="light" className="w-100 mb-3">
//                     <FaGoogle className="me-2" /> Log in with Google
//                   </GoogleButton> */}
//                   {/* <GoogleLoginComponent /> */}
//                 </motion.div>
//               </FormContainer>
//             </Col>
//           </Row>
//         </StyledCard>
//       </Container>
//     </>
//   );
// };

// export default Login;




import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card, Navbar, Spinner } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash, FaGoogle, FaLock } from 'react-icons/fa';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const LogoContainer = styled.div`
  background: linear-gradient(135deg, #fef1e0, #a777e3);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Logo = styled.img`
  max-width: 80%;
  max-height: 80%;
`;

const FormContainer = styled.div`
  padding: 3rem;
`;

const StyledInput = styled(Form.Control)`
  border-radius: 30px;
  padding: 0.75rem 1.5rem;
  border: 1px solid #e0e0e0;
  transition: all 0.3s ease;

  &:focus {
    box-shadow: 0 0 0 0.2rem rgba(110, 142, 251, 0.25);
    border-color: #6e8efb;
  }
`;

const StyledButton = styled(Button)`
  border-radius: 30px;
  padding: 0.75rem 2rem;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
`;

const GoogleButton = styled(StyledButton)`
  background-color: #ffffff;
  color: #757575;
  border: 1px solid #e0e0e0;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const HeaderContainer = styled(Navbar)`
  background-color: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const HeaderLogo = styled.img`
  height: 60px;
`;

const SecureText = styled.span`
  font-weight: 600;
  color: #28a745;
  display: flex;
  align-items: center;
`;

const Login = () => {
  const [userDetails, setUserDetails] = useState({ number: '', otp: '' });
  const [showOtpField, setShowOtpField] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [loading, setLoading] = useState(false);
  const [numerDisable, setNumerDisable] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check for referral ID in URL and store it in localStorage
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const referrerId = params.get('referrer');

    if (referrerId) {
      localStorage.setItem('referrerId', referrerId);
    }
  }, [location]);

  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setInterval(() => setResendTimer(resendTimer - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [resendTimer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSendOtp = async () => {
    try {
      if (userDetails.number.length === 10) {
        setNumerDisable(true)
        setLoading(true);
        await axiosInstance.post('/auth/send-otp', { number: userDetails.number });
        setShowOtpField(true);
        setResendTimer(60);
      } else {
        alert('Phone Number Must Be 10 Digits');
      }
    } catch (error) {
      console.error('Error sending OTP: ', error);
      alert('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendTimer === 0) {
      handleSendOtp();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const referrerId = localStorage.getItem('referrerId');  

      const response = await axiosInstance.post('/auth/verify-otp', { 
        number: userDetails.number, 
        otp: userDetails.otp, 
        referrerId: referrerId || null 
      });
      
      localStorage.setItem(
        "Tokens",
        JSON.stringify({ access: response.data.data.token.accessToken, refresh: response.data.data.token.refreshToken })
      );

      if (response.data) {
        // navigate(-1);
        navigate('/');
      }
    } catch (error) {
      console.error('Error during login: ', error);
      alert(error?.response?.data?.message ?? 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <HeaderContainer expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <HeaderLogo src='logo.png' alt="Company Logo" />
          </Navbar.Brand>
          <SecureText>
            <FaLock className="me-2" /> Secure Registration
          </SecureText>
        </Container>
      </HeaderContainer>
      <Container className="mt-5">
        <StyledCard>
          <Row className="g-0">
            <Col md={6} className="d-none d-md-block">
              <LogoContainer>
                <Logo src='logo.png' alt="Company Logo" />
              </LogoContainer>
            </Col>
            <Col md={6}>
              <FormContainer>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-center mb-4">Welcome Back</h2>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-4">
                      <StyledInput
                        type="text"
                        name="number"
                        placeholder="Enter your mobile number"
                        value={userDetails.number}
                        required
                        onChange={handleChange}
                        disabled={numerDisable}
                      />
                    </Form.Group>
                    {showOtpField && (
                      <>
                        <Form.Group className="mb-4">
                          <StyledInput
                            type='text'
                            placeholder="Enter OTP"
                            name="otp"
                            required
                            value={userDetails.otp}
                            onChange={handleChange}
                          />
                        </Form.Group>
                        <Button variant="link" onClick={handleResendOtp} disabled={resendTimer > 0}>
                          {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : 'Resend OTP'}
                        </Button>
                        <StyledButton variant="primary" type="submit" className="w-100 mb-3" disabled={loading}>
                          {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Verify OTP'}
                        </StyledButton>
                      </>
                    )}
                  </Form>
                  {!showOtpField && (
                    <StyledButton variant="primary" onClick={handleSendOtp} className="w-100 mb-3" disabled={loading}>
                      {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Send OTP'}
                    </StyledButton>
                  )}
                </motion.div>
              </FormContainer>
            </Col>
          </Row>
        </StyledCard>
      </Container>
    </>
  );
};

export default Login;
