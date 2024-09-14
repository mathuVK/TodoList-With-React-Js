import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import './Login.css';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <div className="login-header">
        <h2>Login</h2>
        <p>to get started</p>
      </div>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          email: Yup.string().email('Invalid email').required('Required'),
          password: Yup.string().required('Required'),
        })}
        onSubmit={(values) => {
          const success = login(values.email, values.password);
          if (success) {
            navigate('/todos');
          }
        }}
      >
        <Form>
          <div>
            <label>Email</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" className="error-message" component="div" />
          </div>
          <div>
            <label>Password</label>
            <Field name="password" type="password" />
            <ErrorMessage name="password" className="error-message" component="div" />
          </div>
          <button type="submit">Continue</button>
          <div className="register-link">
            New User? <a href="/register">Register</a>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
