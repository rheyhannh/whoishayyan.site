/**
 * Method that handles exception in client-side with this behaviour, 
 * 
 * - When application run in `production`, message will be logged in browser console
 * - When application run in `!production` environment, both message and error will be logged in browser console
 * - When environment variable `NEXT_PUBLIC_THIRDPARTY_LOG` values are truthy, error will sended to third party service
 *  
 * Knowing `message` will exposed to client browser, make sure to sanitize any sensitive information before passing to this handler.
 * 
 * @param {string} message Sanitized error message
 * @param {any} error Error details
 */
const handleClientError = (message, error) => {
    const isProduction = process.env.NODE_ENV === 'production';
    const thirdPartyLog = !!process.env.NEXT_PUBLIC_THIRDPARTY_LOG;

    if (isProduction) console.error(message);
    if (!isProduction) {
        console.error(message);
        console.error(error);
    }
    if (thirdPartyLog) {
        // Should report error to third party services like Sentry
    }
}

export default handleClientError;