export const handleAuthErrors = (error) => {
    if (error.code === 'auth/user-not-found') {
        return 'Account with this email does not exist.';
    } else if (error.code === 'auth/wrong-password') {
        return 'Incorrect password.';
    } else {
        return 'Failed to sign in. Please try again later.';
    }
};