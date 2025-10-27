import DoubleStore from "@/pages/api/google/_service/ManagerService/AuthService/DoubleStore";
import { UserToken } from "@/pages/api/google/_service/ManagerService/AuthService/types";

class TestDoubleStore extends DoubleStore {
    public setWorkspaceDomain(domain: string) {
        this.WORKSPACE_DOMAIN = domain;
    }

    public getWorkspaceDomain() {
        return this.WORKSPACE_DOMAIN;
    }

    // Expose protected methods for testing
    public async testInitialize() {
        return this.DOUBLE_initialise();
    }

    public async testSet(userId: number, token: UserToken) {
        return this.DOUBLE_set(userId, token);
    }

    public async testDelete(userId: number) {
        return this.DOUBLE_delete(userId);
    }

    public async testDeleteAll() {
        return this.DOUBLE_deleteAllTokens();
    }

    public testGet(userId: number) {
        return this.DOUBLE_get(userId);
    }

    public testGetAll() {
        return this.DOUBLE_getAll();
    }
}

export default TestDoubleStore;
