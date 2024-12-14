import { isZodErrorLike, fromZodError } from 'zod-validation-error';

/**
 * Method that handles exception in client-side with this behaviour, 
 * 
 * - When application run in `production`, error message will be logged in browser console
 * - When application run in `!production` environment, both error message and error will be logged in browser console
 * - When environment variable `NEXT_PUBLIC_THIRDPARTY_LOG` values are truthy, error will sended to third party service
 * 
 * This method will generate error message that easier to read for end users using {@link https://github.com/causaly/zod-validation-error?tab=readme-ov-file#input-from-zod zod-validation-error}
 * when error are instance of `zodError`
 * 
 * @param {string} prefix Prefix to logged in browser console along with error message that can be an event, method name or error type. Also used as zod-validation-error {@link https://github.com/causaly/zod-validation-error?tab=readme-ov-file#fromzoderror prefix options} when error are `zodError`
 * @param {any} error Any error object or instance
 * @example 
 * ```js
 * const getResource = () => {
 *      try { } // doSomething 
 *      catch(error) {
 *          // assume error.message = 'internal server error'
 *          handleClientError('Failed to get resource', error)
 *          // logged in browser 'Failed to get resource: internal server error'
 *      }
 * }
 * ```
 */
const handleClientError = (prefix, error) => {
    const isProduction = process.env.NODE_ENV === 'production';
    const thirdPartyLog = !!process.env.NEXT_PUBLIC_THIRDPARTY_LOG;

    var message;

    if (isZodErrorLike(error)) {
        message = fromZodError(error, { prefix }).toString();
    } else {
        message = `${prefix}: ${error?.message ?? 'unknown error'}`
    }

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