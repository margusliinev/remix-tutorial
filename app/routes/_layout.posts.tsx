import { json, redirect } from '@remix-run/node';
import type { ActionArgs, V2_MetaFunction, LoaderArgs } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, Label, Input, Textarea, Button } from '~/components/ui';

import { createPost, getAllPosts } from '~/models/post.server';
import { requireUserId } from '~/utils/session.server';

export const meta: V2_MetaFunction = () => {
    return [{ title: 'Posts' }, { name: 'description', content: 'Feed of posts' }];
};

export const loader = async ({ request }: LoaderArgs) => {
    await requireUserId(request);
    const posts = await getAllPosts();
    return json({ posts });
};

export const action = async ({ request }: ActionArgs) => {
    const userId = await requireUserId(request);

    const formData = await request.formData();
    const title = formData.get('title');
    const content = formData.get('content');

    if (typeof title !== 'string' || title.length === 0) {
        return json({ message: 'Validation failed', status: 400, error: 'title' });
    }

    if (typeof content !== 'string' || content.length === 0) {
        return json({ message: 'Validation failed', status: 400, error: 'content' });
    }

    const newPost = await createPost({ userId, title, content });
    if (!newPost) {
        return json({ message: 'Failed to create post', status: 500, error: 'server' });
    }

    return redirect('/posts');
};

export default function Posts() {
    const [open, setOpen] = useState(false);
    const data = useLoaderData<typeof loader>();

    useEffect(() => {
        setOpen(false);
    }, [data]);

    return (
        <main className='grid place-items-center'>
            <div className='h-full mt-40 w-10/12 relative grid place-items-center'>
                <div className='absolute right-0 top-0'>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger className='bg-primary p-2 rounded-md hover:bg-primary/90 transition-colors text-primary-foreground'>
                            New Post
                        </DialogTrigger>
                        <DialogContent>
                            <Form method='post' className='grid gap-4'>
                                <h1 className='text-xl font-semibold text-center mb-2'>Create a new post</h1>
                                <div className='grid gap-3'>
                                    <Label htmlFor='title'>Title</Label>
                                    <Input type='title' id='title' name='title' autoComplete='title' aria-describedby='title-error'></Input>
                                </div>
                                <div className='grid gap-3'>
                                    <Label htmlFor='content'>Content</Label>
                                    <Textarea id='content' name='content' autoComplete='content' aria-describedby='content-error'></Textarea>
                                </div>
                                <Button type='submit' size={'sm'} className='mt-2'>
                                    Create Post
                                </Button>
                            </Form>
                        </DialogContent>
                    </Dialog>
                </div>
                {data.posts.map((post) => {
                    return (
                        <article key={post.id} className='max-w-2xl bg-card p-4 rounded-md shadow-post-card w-full'>
                            <div className='flex items-center justify-between mb-2'>
                                <h2 className='text-xl font-medium'>{post.title}</h2>
                                <p className={post.published ? 'text-green-600' : 'text-red-600'}>{post.published ? 'Published' : 'Draft'}</p>
                            </div>
                            <hr className='mb-4 border-primary-foreground'></hr>
                            <p className='text-base leading-6 whitespace-pre-wrap'>{post.content}</p>
                        </article>
                    );
                })}
            </div>
        </main>
    );
}
