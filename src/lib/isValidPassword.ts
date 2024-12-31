export async function isValidPassword(password: string, hashed_password: string) {
    return (await hashPassword(password) === hashed_password)
}

async function hashPassword(password: string) {
    const arrayBuffer = await crypto.subtle.digest("SHA-512", new TextEncoder().encode(password))
    return Buffer.from(arrayBuffer).toString("base64")
}