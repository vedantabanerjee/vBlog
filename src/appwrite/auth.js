import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    //vendor specific configurations
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    //signup functionality
    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique, email, password, name);
            if (userAccount) {
                return this.login({email, password});
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    //signin functionality
    async login({email, password}) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    //check user functionality
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log ("Appwrite service error :: getCurrentUser :: error", error);
        }
        return null;
    }

    //logout functionality
    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log ("Appwrite service error :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService;
