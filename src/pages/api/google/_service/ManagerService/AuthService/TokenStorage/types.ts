import { UserToken } from "../types";

interface StoredToken extends UserToken {
    userId: number;
}

/**
 * Structure representing exactly the content of the file (to which we refer to as `store`)
 * It is a key-value pair where:
 *      - key is domain name (e.g. digipath.gr or kopanitsanos.gr)
 *      - value is an array of StoredTokens
 */
type Store = { [domain: string]: StoredToken[] };

export type { StoredToken, Store };
