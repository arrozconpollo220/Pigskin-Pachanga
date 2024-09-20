class AuthService {
    async getProfile() {
        const { decode } = await import('jwt-decode');
        return decode(this.getToken());
    }

    async loggedIn() {
        const token = this.getToken();
        if (token) {
            const { decode } = await import('jwt-decode');
            return !this.isTokenExpired(token) ? true : false;
        }
        return false;
    }

    async isTokenExpired(token) {
        const { decode } = await import('jwt-decode');
        const decoded = decode(token);
        if (decoded.exp < Date.now() / 1000 ) {
            localStorage.removeItem('id_token');
            return true;
        }
        return false;
    }

    getToken() {
        return localStorage.getItem('id_token');
    }

    login(idToken) {
        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
    }

    logout() {
        localStorage.removeItem('id_token');
        window.location.reload();
    }
}

export default new AuthService();