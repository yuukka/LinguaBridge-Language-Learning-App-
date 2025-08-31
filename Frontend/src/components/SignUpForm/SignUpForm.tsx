// src/components/SignUpForm.tsx
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

import { signUp } from '../../services/authService'
import { UserContext } from '../../contexts/UserContext'

// Types
interface FormData {
  username: string;
  password: string;
  passwordConf: string;
}

const SignUpForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
    passwordConf: '',
  });

  const { username, password, passwordConf } = formData;

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    // console.log(formData); // this line will print the form data to the console
    try {
      const newUser = await signUp({
        username: formData.username,
        password: formData.password,
      });
      // const newUser = await signUp(formData);
      console.log(newUser);
    // Call the setUser function to update the user state, just like normal.
      setUser(newUser);
      // Take the user to the (non-existent) home page after they sign up.
      // We'll get to this shortly!
      navigate('/profile/create');
    } catch (err: any) {
      // console.error("Unable to Signup:", err.message);
      setMessage(err.message);
    }
  };

  const isFormInvalid = () => {
    return !(username && password && password === passwordConf);
  };

  return (
    <>
      <div className="flex min-h-svh flex-col items-center justify-center">
        <Card className="w-full max-w-sm bg-neutral-200/90">
            <CardHeader>
              <CardTitle>Create account</CardTitle>
              <CardDescription>
                Enter your username below to create your account
              </CardDescription>
              <CardAction>
                <Button variant="link">
                  <Link to='/login'>
                    Sign In
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
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="confirm">Password</Label>
                      {/* <a
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </a> */}
                    </div>
                    <Input 
                    id="confirm" 
                    type="password" 
                    name="passwordConf"
                    value={passwordConf}
                    onChange={handleChange}
                    required />
                  </div>
                    <CardFooter className="flex-col gap-2">
                    <div className='text-red-500/100'>{message}</div>
                    <Button 
                    type="submit" 
                    className="w-full bg-neutral-700"
                    disabled={isFormInvalid()}>
                      Sign Up
                    </Button>
                    <Button variant="outline" className="w-full rounded-full">
                      Sign Up with Google
                    </Button>
                  </CardFooter>
                </div>
              </form>
            </CardContent>
            {/* <CardFooter className="flex-col gap-2">
              <p>{message}</p>
              <Button 
              type="submit" 
              className="w-full bg-neutral-700"
              disabled={isFormInvalid()}>
                Sign Up
              </Button>
              <Button variant="outline" className="w-full">
                Sign Up with Google
              </Button>
            </CardFooter> */}
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

export default SignUpForm;

