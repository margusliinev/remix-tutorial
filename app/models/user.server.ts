import type { User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { prisma } from '../utils/db.server';

export async function getUserById(id: User['id']) {
    return prisma.user.findUnique({ where: { id } });
}

export async function getUserByEmail(email: User['email']) {
    return prisma.user.findUnique({ where: { email } });
}

export async function createUser(username: User['username'], email: User['email'], password: User['password']) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return prisma.user.create({ data: { username, email, password: hashedPassword } });
}

export async function deleteUserByEmail(email: User['email']) {
    return prisma.user.delete({ where: { email } });
}
