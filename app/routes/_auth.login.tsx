import type { V2_MetaFunction } from '@remix-run/node';
import { Form, Link } from '@remix-run/react';
import { Button, Input, Label } from '~/components/ui';

export const meta: V2_MetaFunction = () => {
    return [{ title: 'Login' }, { name: 'description', content: 'Sign In to your account' }];
};

export default function Login() {
    return (
        <main className='w-screen h-screen grid place-items-center'>
            <Form className='grid gap-4 w-96 p-8 border rounded-md shadow-md'>
                <h1 className='text-xl font-semibold text-center mb-4'>Sign in to your account</h1>
                <Label htmlFor='email'>Email</Label>
                <Input type='email' id='email' name='email'></Input>
                <Label htmlFor='password'>Password</Label>
                <Input type='password' id='password' name='password'></Input>
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
