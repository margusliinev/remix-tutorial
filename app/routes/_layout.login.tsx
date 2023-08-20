import { json, type ActionArgs, type V2_MetaFunction } from '@remix-run/node';
import { Form, Link, useActionData } from '@remix-run/react';
import { useRef } from 'react';
import { Button, Input, Label } from '~/components/ui';
import { getUserByEmail } from '~/models/user.server';
import { createUserSession } from '~/utils/session.server';
import { verifyPassword } from '~/utils/validation.server';

export const meta: V2_MetaFunction = () => {
    return [{ title: 'Login' }, { name: 'description', content: 'Sign In to your account' }];
};

export const action = async ({ request }: ActionArgs) => {
    const formData = await request.formData();
    const email = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();

    if (!email || !password) {
        return json({ message: 'Please fill all the fields', status: 400, error: 'fields' });
    }

    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
        return json({ message: 'Incorrect email or password', status: 400, error: 'login' });
    }

    const isPasswordValid = verifyPassword(password, existingUser.password);
    if (!isPasswordValid) {
        return json({ message: 'Incorrect email or password', status: 400, error: 'login' });
    }

    return createUserSession({
        redirectTo: '/posts',
        request,
        userId: existingUser.id,
    });
};

export default function Login() {
    const actionData = useActionData<typeof action>();
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    return (
        <main className='w-screen h-screen grid place-items-center'>
            <Form method='post' className='grid gap-4 w-96 p-8 border rounded-md shadow-md bg-card text-card-foreground'>
                <h1 className='text-xl font-semibold text-center mb-2'>Sign in to your account</h1>
                {actionData?.error === 'login' ? (
                    <div className='text-destructive text-sm text-center h-2' id='password-error'>
                        {actionData.message}
                    </div>
                ) : null}
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
                </div>
                <Button type='submit' size={'sm'} className='mt-2'>
                    Sign In
                </Button>
                <div className='mt-2'>
                    <p className='text-sm text-center'>
                        Don&apos;t have an account?{' '}
                        <Link to='/register' className='text-primary hover:text-primary/90 transition-colors font-medium'>
                            Sign up
                        </Link>
                    </p>
                </div>
            </Form>
        </main>
    );
}
