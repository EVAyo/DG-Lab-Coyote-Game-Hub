export class OnExit {
    private static callbacks: Array<() => void> = [];

    public static init() {
        process.on('SIGINT', async () => {
            await OnExit.run();
        });

        process.on('SIGTERM', async () => {
            await OnExit.run();
        });
    }

    public static register(callback: () => void) {
        OnExit.callbacks.push(callback);
    }

    public static async run() {
        for (const callback of OnExit.callbacks) {
            await callback();
        }

        process.exit(0);
    }
}

OnExit.init();