import Auth from './auth';

export default class AuthService {
    public auth: Auth;

    public constructor() {
        this.auth = new Auth();
    }
}
