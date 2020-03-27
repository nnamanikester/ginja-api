import logger from '../../core/utils/logger';

const logResult = async (resolve: (arg0: any, arg1: any, arg2: any, arg3: any) => any, root: any, args: any, context: any, info: any) => {
    logger.info(`2. logResult`);
    const result = await resolve(root, args, context, info);
    logger.info(`4. logResult: ${JSON.stringify(result)}`);
    return result;
};

export default logResult;
