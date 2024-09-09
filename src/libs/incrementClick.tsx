export default async function incrementClick(token:string) {
    if (!token) {
        console.log(token);
    }
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/users/click`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',  // Include the HTTP-only cookie in the request
    });

    if (!response.ok) {
        throw new Error('Failed to increment click');
    }

    return await response.json();
}
