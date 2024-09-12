export const handleAuthErrors = (error) => {
    if (error.message === 'User is blocked and cannot sign in.') {
        return 'Your account has been blocked. Please contact support.';
    } else if (error.code === 'auth/user-not-found') {
        return 'Account with this email does not exist.';
    } else if (error.code === 'auth/wrong-password') {
        return 'Incorrect password.';
    } else {
        return 'Failed to sign in. Please try again later.';
    }
};

export const handlRegisterErrors = (error) => {
    if (error.code === 'auth/email-already-in-use') {
        return 'There is already a user with this email address';
    } else if (error.code === 'auth/wrong-password') {
        return 'Incorrect password.';
    } else {
        return 'Failed to sign up. Please try again later.';
    }
};