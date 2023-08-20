import { json, type ActionArgs, type V2_MetaFunction } from '@remix-run/node';
import { Form, Link, useActionData, useNavigate } from '@remix-run/react';
import { Button, Input, Label } from '~/components/ui';
import { validateUsername, validateEmail, validatePassword } from '~/utils/validation.server';
import { createUser, getUserByEmail } from '~/models/user.server';
import { useEffect, useRef } from 'react';
import { useToast } from '~/components/ui/use-toast';

export const meta: V2_MetaFunction = () => {
    return [{ title: 'Register' }, { name: 'description', content: 'Sign Up for an account' }];
};

export const action = async ({ request }: ActionArgs) => {
    const formData = await request.formData();
    const username = formData.get('username')?.toString();
    const email = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();

    if (!username || !email || !password) {
        return json({ message: 'Please fill all the fields', status: 400, error: 'validation' });
    }

    if (!validateUsername(username)) {
        return json({ message: 'Invalid username', status: 400, error: 'username' });
    }

    if (!validateEmail(email)) {
        return json({ message: 'Invalid email', status: 400, error: 'email' });
    }

    if (!validatePassword(password)) {
        return json({ message: 'Invalid password', status: 400, error: 'password' });
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        return json({ message: 'Email is already in use', status: 400, error: 'email' });
    }

    const newUser = await createUser(username, email, password);
    if (!newUser) {
        return json({ message: 'Something went wrong', status: 500, error: 'server' });
    }

    return json({ message: 'Account created successfully', status: 201, error: '' });
};

export default function Register() {
    const navigate = useNavigate();
    const actionData = useActionData<typeof action>();
    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    useEffect(() => {
        if (actionData?.error === 'username') {
            usernameRef.current?.focus();
        } else if (actionData?.error === 'email') {
            emailRef.current?.focus();
        } else if (actionData?.error === 'password') {
            passwordRef.current?.focus();
        } else if (actionData?.error === 'validation') {
            toast({
                title: 'Failed creating an account',
                description: `${actionData.message}`,
                variant: 'destructive',
            });
        } else if (actionData?.status === 201) {
            toast({
                title: 'Account created',
                description: 'Your account has been created successfully!',
            });
            navigate('/login');
        }
    }, [actionData, navigate, toast]);

    return (
        <main className='w-screen h-screen grid place-items-center'>
            <Form method='post' className='grid gap-4 w-96 p-8 border rounded-md shadow-md bg-card text-card-foreground'>
                <h1 className='text-xl font-semibold text-center mb-4'>Create your account</h1>
                <div className='grid gap-3'>
                    <Label htmlFor='username'>Username</Label>
                    <Input
                        type='text'
                        id='username'
                        name='username'
                        ref={usernameRef}
                        autoComplete='username'
                        aria-invalid={actionData?.error === 'username' ? true : undefined}
                        aria-describedby='username-error'
                    ></Input>
                    {actionData?.error === 'username' ? (
                        <div className='text-destructive text-sm' id='username-error'>
                            {actionData.message}
                        </div>
                    ) : null}
                </div>
                <div className='grid gap-3'>
                    <Label htmlFor='email'>Email</Label>
                    <Input
                        type='email'
                        id='email'
                        name='email'
                        ref={emailRef}
                        autoComplete='email'
                        aria-invalid={actionData?.error === 'email' ? true : undefined}
                        aria-describedby='email-error'
                    ></Input>
                    {actionData?.error === 'email' ? (
                        <div className='text-destructive text-sm' id='email-error'>
                            {actionData.message}
                        </div>
                    ) : null}
                </div>
                <div className='grid gap-3'>
                    <Label htmlFor='password'>Password</Label>
                    <Input
                        type='password'
                        id='password'
                        name='password'
                        ref={passwordRef}
                        autoComplete='password'
                        aria-invalid={actionData?.error === 'password' ? true : undefined}
                        aria-describedby='password-error'
                    ></Input>
                    {actionData?.error === 'password' ? (
                        <div className='text-destructive text-sm' id='password-error'>
                            {actionData.message}
                        </div>
                    ) : null}
                </div>
                <Button type='submit' size={'sm'} className='mt-2'>
                    Sign up
                </Button>
                <div className='mt-2'>
                    <p className='text-sm text-center'>
                        Already have an account?{' '}
                        <Link to='/login' className='text-primary hover:text-primary/90 transition-colors font-medium'>
                            Sign In
                        </Link>
                    </p>
                </div>
            </Form>
        </main>
    );
}
