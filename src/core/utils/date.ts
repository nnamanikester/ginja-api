import moment from 'moment';

export const getHumanTime = () => {
    return `${moment().format('LL')} ${moment().format('LT')}`;
};
