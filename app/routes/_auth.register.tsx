import type { V2_MetaFunction } from '@remix-run/node';
import { Form, Link } from '@remix-run/react';
import { Button, Input, Label } from '~/components/ui';

export const meta: V2_MetaFunction = () => {
    return [{ title: 'Register' }, { name: 'description', content: 'Sign Up for an account' }];
};

export default function Register() {
    return (
        <main className='w-screen h-screen grid place-items-center'>
            <Form className='grid gap-4 w-96 p-8 border rounded-md shadow-md'>
                <h1 className='text-xl font-semibold text-center mb-4'>Create your account</h1>
                <Label htmlFor='username'>Username</Label>
                <Input type='text' id='username' name='username'></Input>
                <Label htmlFor='email'>Email</Label>
                <Input type='email' id='email' name='email'></Input>
                <Label htmlFor='password'>Password</Label>
                <Input type='password' id='password' name='password'></Input>
                <Button type='submit' className='mt-2'>
                    Sign Up
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
