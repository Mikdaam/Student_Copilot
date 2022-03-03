export const validateEnv = (env: string): boolean => {
    if (!process.env[env]) {
        console.warn(`${env} is not defined in .env file`);
        return false;
    }
    return true;
}