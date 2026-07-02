export function publicUser(user) {
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        birthDate: user.birthDate,
        createdAt: user.createdAt,
    };
}