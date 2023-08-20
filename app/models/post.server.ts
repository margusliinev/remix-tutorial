import { prisma } from '~/utils/db.server';

export function getAllPosts() {
    return prisma.post.findMany();
}

export function createPost({ title, content, userId }: { title: string; content: string; userId: number }) {
    return prisma.post.create({
        data: {
            title,
            content,
            authorId: userId,
        },
    });
}

export function deletePost({ id, userId }: { id: number; userId: number }) {
    return prisma.post.delete({
        where: {
            id,
            authorId: userId,
        },
    });
}
