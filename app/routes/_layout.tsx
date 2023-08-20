import { Link, Outlet } from '@remix-run/react';
import { ModeToggle } from '~/components/mode-toggle';
export default function HomeLayout() {
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
            <Outlet />
        </>
    );
}
