// src/components/SignInForm.jsx
import { useState, useContext, ChangeEvent, FormEvent  } from 'react';
import { useNavigate, Link } from 'react-router';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { signIn } from '../../services/authService'
import { UserContext } from '../../contexts/UserContext'

interface FormData {
  username: string;
  password: string;
}

const SignInForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
  });
  
   const { username, password } = formData;


  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    console.log("hello")
    evt.preventDefault();
    // console.log(formData); // this line will print the form data to the console
    try {
      const currentUser = await signIn({
        username: formData.username,
        password: formData.password,
      });
      // const currentUser = await signIn(formData);
      console.log(currentUser);
    // Call the setUser function to update the user state, just like normal.
      setUser(currentUser);
      // Take the user to the (non-existent) home page after they sign up.
      // We'll get to this shortly!
      navigate('/');
    } catch (err: any) {
      setMessage(err.message);
    }
  };

  const isFormInvalid = () => {
    return !(username && password);
  };

  return (
    <>
      <div className="flex min-h-svh flex-col items-center justify-center">
        <Card className="w-full max-w-sm bg-neutral-200/90">
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
              <CardAction>
                <Button variant="link">
                  <Link to='/signup'>
                    No account Yet? <br/>Sign Up!
                  </Link>
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      name="username"
                      value={username}
                      placeholder="m@example.com"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      {/* <a
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </a> */}
                    </div>
                    <Input 
                    id="password" 
                    type="password" 
                    name="password"
                    value={password}
                    onChange={handleChange}
                    required />
                  </div>
                    <CardFooter className="flex-col gap-2">
                    <Button 
                    type="submit" 
                    className="w-full bg-neutral-700 rounded-full"
                    disabled={isFormInvalid()}>
                        Login
                    </Button>
                    <Button variant="outline" className="w-full rounded-full">
                        Login with Google
                    </Button>
                    </CardFooter>
                </div>
              </form>
            </CardContent>

          </Card>
      </div>
      {/* <main>
        <h1>Landing Page</h1>
        <p><button onClick={(() => navigate('/appointment/form'))}>Appointment Form</button></p>
        <p><button onClick={(() => navigate('/appointment'))}>Appointment List</button></p>
      </main> */}
      

    </>

  );
};

export default SignInForm;

