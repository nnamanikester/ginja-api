/* eslint-disable prettier/prettier */
import crypto from 'crypto';
import Validator from 'validatorjs';
import url from 'url';
import BadRequestError from '../errors/badRequestError';
import models from '../models';

const { URL } = url;

/**
 * Generate Random Safe Bytes
 * @param length;
 */
export const safeRandomBytes = (length: number): any => {
    try {
        return crypto.randomBytes(length);
    } catch (e) {
        return '';
    }
};

/**
 * Generate Random string (alphanumeric, numeric, alphabetic, hex)
 * @param length;
 * @param type;
 */
export const getRandomString = (_length: number = 15, type: string = 'alphanumeric'): string => {
    let chars;
    let string = '';

    const numbers = '0123456789';
    const charsLower = 'abcdefghijklmnopqrstuvwxyz';
    const charsUpper = charsLower.toUpperCase();
    const hexChars = 'abcdef';

    if (type === 'alphanumeric') {
        chars = numbers + charsLower + charsUpper;
    } else if (type === 'numeric') {
        chars = numbers;
    } else if (type === 'alphabetic') {
        chars = charsLower + charsUpper;
    } else if (type === 'hex') {
        chars = numbers + hexChars;
    } else {
        chars = type;
    }

    const unreadableChars = /[0OIl]/g;
    chars = chars.replace(unreadableChars, '');

    // Generate the string
    const charsLen = chars.length;
    const maxByte = 256 - (256 % charsLen);
    let length = _length;
    while (length > 0) {
        const buf = safeRandomBytes(Math.ceil((length * 256) / maxByte));
        for (let i = 0; i < buf.length && length > 0; i += 1) {
            const randomByte = buf.readUInt8(i);
            if (randomByte < maxByte) {
                string += chars.charAt(randomByte % charsLen);
                length -= 1;
            }
        }
    }

    return string;
};

/**
 * Also generates Random strings but makes sure they are unique in comparison to a field on a table
 * @param table;
 * @param field;
 * @param length;
 * @param type;
 */
export const getUniqueRandom = async (table: string, field: string, length: number = 15, type: string = 'alphanumeric'): Promise<any> => {
    // Get random string
    const randomString = getRandomString(length, type);

    // Verify uniqueness
    const sql = `select ${field} from ${table} where ${field} = :needle`;
    const rows = await models.sequelize.query(sql, {
        raw: true,
        type: models.Sequelize.QueryTypes.SELECT,
        replacements: {
            needle: randomString
        }
    });

    if (rows.length > 0) {
        await getUniqueRandom(table, field, length, type);
    }
    return randomString;
};

/**
 * Validate provided data with provided rules
 * @param data;
 * @param rules;
 */
export const validate = (data: any, rules: any): any => {
    const validation = new Validator(data, rules);

    return new Promise((resolve, reject): void => {
        if (validation.fails()) {
            const error = new BadRequestError('invalid request data', undefined, validation.errors.all());
            reject(error);
        }

        const sanitizedData: any = {};

        // Return only data in rules

        // const sanitizedData = Object.keys(rules).reduce((results, currentValue) => {
        //     if (Object.hasOwnProperty.call(data, currentValue)) {
        //         results[currentValue] = data[currentValue];
        //     }
        //     return results;
        // }, {});

        Object.keys(rules).forEach((rule): void => {
            // Todo add validation for nested fields;
            // const length: number = rule.split('.').length;

            if (data[rule] !== undefined) {
                sanitizedData[rule] = data[rule];
            }
        });

        resolve(sanitizedData);
    });
};

/**
 * Prepares Single data for response
 * @param payload;
 */
export const itemResponse = (payload: any, message: string = 'success'): any => ({
    status: true,
    message,
    data: payload
});

/**
 * Prepares an array of data for response
 * @param payload;
 */
export const itemsResponse = (payload: any, message: string = 'success'): any => ({
    status: true,
    message,
    data: payload
});

/**
 * Prepare Pagin Response
 * @param payload;
 * @param total;
 * @param page;
 * @param limit;
 * @param url;
 */
export const pagingReponse = (payload: any, total: number, page: number, limit: number, _url: string): any => {
    const pageUrl = new URL(_url);

    let next;
    if (Math.ceil(total / limit) > page) {
        next = page + 1;
    }

    let previous;
    if (page > 1) {
        previous = page - 1;
    }

    // for data
    const data: any[] = payload === undefined || payload.length === 0 ? [] : payload;

    // for paging
    const paging: any = {};
    paging.total_items = total;
    paging.page_size = limit;
    paging.current = page;
    paging.count = data.length;
    paging.next = next;
    paging.previous = previous;

    // for links
    // --previous
    const links = [];
    if (previous !== undefined) {
        const prevUrl = pageUrl;
        prevUrl.searchParams.set('page', previous.toString());
        const prev = {
            href: prevUrl.href,
            rel: 'prev',
            method: 'GET'
        };
        links.push(prev);
    }

    // --current
    const currentUrl = pageUrl;
    currentUrl.searchParams.set('page', page.toString());
    const current = {
        href: currentUrl.href,
        rel: 'current',
        method: 'GET'
    };
    links.push(current);

    // --next
    if (next !== undefined) {
        const nextUrl = pageUrl;
        nextUrl.searchParams.set('page', next.toString());
        const nextPage = {
            href: nextUrl.href,
            rel: 'next',
            method: 'GET'
        };
        links.push(nextPage);
    }

    return {
        data,
        paging,
        links
    };
};

export const formatDate = (date: any): string => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return `${day} ${monthNames[monthIndex]}, ${year}`;
};

export const currentDateTime = (): any => {
    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    const dateTime = `${date} ${time}`;
    return dateTime;
};

export const maskCreditCardNumber = (cardNumber: any): any => {
    const first4 = cardNumber.substring(0, 4);
    const last6 = cardNumber.substring(cardNumber.length - 5);

    const mask = cardNumber.substring(4, cardNumber.length - 5).replace(/\d/g, '*');
    return first4 + mask + last6;
};

// this method helps to overcome numeric precision issues
export const computeNumbers = (operand1: any, operand2: any = 0, operator: any = null): number => {
    let result = 0;
    for (let i = 10; i <= i * 100; i *= 10) {
        if (Number.isInteger(+operand1 * i) && Number.isInteger(+operand2 * i)) {
            if (operator === 'add') {
                result = (+operand1 * i + +operand2 * i) / i;
            } else if (operator === 'subtract') {
                result = (+operand1 * i - +operand2 * i) / i;
            } else if (operator === 'multiply') {
                result = (+operand1 * i * (+operand2 * i)) / (i *= i);
            } else if (operator === 'divide') {
                result = (+operand1 * i) / (+operand2 * i);
            } else {
                result = +operand1;
            }
            break;
        }
    }
    return +result.toFixed(2);
};

export const checkUserExist = (payload: any, type: string, value: string): any => {
    return payload[type][value];
};

export const formatPhoneNumberToInternational = (phone: string, suffix: string) => {
    if (phone.startsWith(suffix)) {
        return phone;
    }
    if (phone.startsWith(suffix.replace(/\+/g, ''))) {
        return phone.replace(/ |\+|\-|\(|\)/g, '').replace(`/^${suffix}/`, suffix);
    }
    return phone.replace(/ |\+|\-|\(|\)/g, '').replace(/^0/, suffix);
};
