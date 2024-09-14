import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import './Register.css';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <div className="login-header">
        <h2>Register</h2>
        <p>Create an account to get started</p>
      </div>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={Yup.object({
          name: Yup.string().required('Required'),
          email: Yup.string().email('Invalid email').required('Required'),
          password: Yup.string()
            .min(6, 'Must be at least 6 characters')
            .required('Required'),
        })}
        onSubmit={(values) => {
          register(values.name, values.email, values.password);
          navigate('/todos');
        }}
      >
        <Form>
          <div>
            <label>Name</label>
            <Field name="name" className="input-field" />
            <ErrorMessage name="name" component="div" className="error-message" />
          </div>
          <div>
            <label>Email</label>
            <Field name="email" type="email" className="input-field" />
            <ErrorMessage name="email" component="div" className="error-message" />
          </div>
          <div>
            <label>Password</label>
            <Field name="password" type="password" className="input-field" />
            <ErrorMessage name="password" component="div" className="error-message" />
          </div>
          <button type="submit" className="submit-button">Register</button>
        </Form>
      </Formik>
      <div className="register-link">
        Already have an account? <a href="/login">Login</a>
      </div>
    </div>
  );
};

export default Register;
