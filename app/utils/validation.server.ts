import bcrypt from 'bcryptjs';

export function validateUsername(username: unknown): username is string {
    return typeof username === 'string' && username.length > 2;
}

export function validateEmail(email: unknown): email is string {
    return typeof email === 'string' && email.includes('@');
}

export function validatePassword(password: unknown): password is string {
    return typeof password === 'string' && password.length > 7;
}

export function verifyPassword(password: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(password, hashedPassword);
}
