import { Signale } from 'signale';

const logger = new Signale({
    types: {
        info: {
            color: 'grey'
        }
    }
});
logger.config({
    displayTimestamp: true
});

export default logger;
