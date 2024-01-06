import { Link, Form, redirect, useNavigate } from 'react-router-dom';
import { FormRow, SubmitBtn, NavBar } from '../components/Index.js';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import styled from 'styled-components';

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.post('/auth/login', data);
      queryClient.invalidateQueries();
      toast.success('Login successful');
      return redirect('/');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

const Login = () => {
  const navigate = useNavigate();

  const loginDemoUser = async () => {
    const data = {
      email: 'test@test.com',
      password: 'secret123',
    };
    try {
      await customFetch.post('/auth/login', data);
      toast.success('Take a test drive');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };
  return (
    <Wrapper>
      <div className='grid-item'>
        <NavBar />
      </div>
      <div className='grid-item'>
        <Form method='post' className='form'>
          <h4>Login</h4>
          <FormRow type='email' name='email' />
          <FormRow type='password' name='password' />
          <SubmitBtn />
          <button type='button' className='btn btn-block' onClick={loginDemoUser}>
            explore the app
          </button>
          <p>
            Not a member yet?
            <Link to='/register' className='member-btn'>
              Register
            </Link>
          </p>
        </Form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
background: linear-gradient(#3c4c5a, #0a1924);
min-height: 100vh;
display: grid;
align-items: center;
grid-template-rows: 20% 80%;
.logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
}
.form {
    display:grid;
    align-items: center;
    margin-bottom: 175px;
    max-width: 400px;
    border-top: 5px solid var(--primary-500);

}

.grid-item{
  display: grid;
}
h4 {
    text-align: center;
    margin-bottom: 1.38rem;
}
p {
    margin-top: 1rem;
    text-align: center;
    line-height: 1.5;
}
.btn {
    margin-top: 1rem;
}
.member-btn {
    color: var(--primary-500);
    letter-spacing: var(--letter-spacing);
    margin-left: 0.25rem;
}
`;
export default Login