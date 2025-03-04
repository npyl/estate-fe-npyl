// --------------------------------------------------------------------

const serviceLog = (...s: any) => console.log(`[SSEService]: `, ...s);

// --------------------------------------------------------------------

type TClient = string;

type TClientData = {
    write: (d: string) => void;
    readable: ReadableStream;
};

// --------------------------------------------------------------------

class SSEService {
    private clients: Map<TClient, TClientData>;

    constructor() {
        serviceLog("Creating service...");
        this.clients = new Map();
    }

    add(clientId: string, onConnect?: VoidFunction) {
        serviceLog("Adding client: ", clientId);

        // Always create a new stream for the client, even if it exists
        // This ensures we don't reuse a possibly consumed stream
        this.delete(clientId);

        // Create new stream
        const responseStream = new TransformStream();
        const writer = responseStream.writable.getWriter();
        const encoder = new TextEncoder();

        // Format data according to SSE protocol
        const write = (data: string) => {
            const formattedData = `data: ${data}\n\n`;
            writer.write(encoder.encode(formattedData));
        };

        const readable = responseStream.readable;
        this.clients.set(clientId, { write, readable });

        onConnect?.();
    }

    delete(clientId: TClient) {
        serviceLog("Removing client: ", clientId);
        this.clients.delete(clientId);
    }

    getStream(clientId: TClient) {
        serviceLog("Asking for stream (client: ", clientId, ")");
        return this.clients.get(clientId)?.readable;
    }

    send(clientId: TClient, data: string) {
        serviceLog("Sending: ", data, " to client: ", clientId);
        this.clients.get(clientId)?.write(data);
    }
}

// Singleton implementation
const SSEServiceSingleton = () => {
    return new SSEService();
};

declare global {
    var sseGlobal: undefined | ReturnType<typeof SSEServiceSingleton>;
}

const sseService = globalThis.sseGlobal ?? SSEServiceSingleton();
if (process.env.NODE_ENV !== "production") globalThis.sseGlobal = sseService;

export default sseService;
