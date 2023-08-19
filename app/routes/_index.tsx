import type { V2_MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { ModeToggle } from '~/components/mode-toggle';

export const meta: V2_MetaFunction = () => {
    return [{ title: 'Remix Tutorial' }, { name: 'description', content: 'Learning Remix' }];
};

export default function Index() {
    return (
        <>
            <nav className='absolute top-0 w-full grid place-items-center'>
                <div className='w-10/12 h-20 flex items-center justify-between'>
                    <Link to={'/'} className='text-2xl font-semibold text-primary'>
                        Remix Tutorial
                    </Link>
                    <ModeToggle />
                </div>
            </nav>
            <main className='h-screen w-screen grid place-items-center'>
                <div className='mx-auto max-w-2xl pb-36 pt-24 md:pb-24 md:pt-28 lg:pb-24 lg:pt-28'>
                    <div className='text-center'>
                        <h1 className='text-3xl sm:text-4xl font-bold tracking-tight text-foreground md:text-6xl mb-2'>
                            Full-Stack Remix with
                            <br />
                        </h1>
                        <h1 className='text-3xl sm:text-4xl font-bold tracking-tight text-foreground md:text-6xl'>Prisma & PostgreSQL</h1>
                        <p className='mt-6 text-lg leading-8 text-secondary-foreground'>
                            This is a practice project to create full stack applications using Remix, Prisma and PostgreSQL. I am also using Tailwind
                            as my framework and Shadcn UI components for styling. Obviously using typescript for the entire project.
                        </p>
                        <div className='mt-6 md:mt-10 flex items-center justify-center gap-x-6'>
                            <Link
                                to={'/register'}
                                className='rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold transition-colors text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
                            >
                                Get started
                            </Link>
                            <Link to={'/login'} className='text-sm font-semibold leading-6 text-foreground group'>
                                Go to login?{' '}
                                <span aria-hidden='true' className='group-hover:text-primary transition-colors'>
                                    →
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
