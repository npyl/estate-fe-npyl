class MockXMLHttpRequest {
    public upload = {
        onprogress: null as ((event: any) => void) | null,
        onload: null as VoidFunction | null,
        onerror: null as VoidFunction | null,
    };

    public onload: VoidFunction | null = null;
    public onerror: VoidFunction | null = null;
    public ontimeout: VoidFunction | null = null;
    public onabort: VoidFunction | null = null;

    public readyState = 0;
    public status = 0;
    public response = "";

    private _url = "";
    private _method = "";
    private _aborted = false;
    private readonly _isOnlineRef: { current: boolean };

    static readonly DONE = 4;

    constructor(isOnlineRef: { current: boolean }) {
        this._isOnlineRef = isOnlineRef;
    }

    open(method: string, url: string, async: boolean = true) {
        this._method = method;
        this._url = url;
        this.readyState = 1;
    }

    setRequestHeader(header: string, value: string) {
        // Mock implementation - do nothing
    }

    send(data?: any) {
        if (this._aborted) return;

        this.readyState = 2;

        // Simulate upload progress
        setTimeout(() => {
            if (this._aborted || !this._isOnlineRef.current) {
                this.readyState = MockXMLHttpRequest.DONE;
                this.status = 0;
                this.onabort?.();
                return;
            }

            // Simulate progress events
            const progressSteps = [
                { loaded: 10, total: 100 },
                { loaded: 30, total: 100 },
                { loaded: 60, total: 100 },
                { loaded: 90, total: 100 },
                { loaded: 100, total: 100 },
            ];

            let stepIndex = 0;
            const progressInterval = setInterval(() => {
                if (this._aborted || !this._isOnlineRef.current) {
                    clearInterval(progressInterval);
                    this.readyState = MockXMLHttpRequest.DONE;
                    this.status = 0;
                    this.onabort?.();
                    return;
                }

                if (stepIndex < progressSteps.length) {
                    const step = progressSteps[stepIndex];
                    this.upload.onprogress?.({
                        loaded: step.loaded,
                        total: step.total,
                        lengthComputable: true,
                    });
                    stepIndex++;
                } else {
                    // Upload complete
                    clearInterval(progressInterval);
                    this.readyState = MockXMLHttpRequest.DONE;

                    // Check if URL indicates it should fail
                    if (this._url.includes("shouldFail=1")) {
                        this.status = 500;
                        this.response = "Server Error";
                    } else {
                        this.status = 200;
                        this.response = "Upload successful";
                    }

                    this.onload?.();
                }
            }, 50); // 50ms between progress updates
        }, 10);
    }

    abort() {
        this._aborted = true;
        this.readyState = MockXMLHttpRequest.DONE;
        this.status = 0;
        setTimeout(() => this.onabort?.(), 0);
    }
}

const getXMLHttpRequestMock = (isOnlineRef: { current: boolean }) => {
    return class extends MockXMLHttpRequest {
        constructor() {
            super(isOnlineRef);
        }
    } as any;
};

export default getXMLHttpRequestMock;
