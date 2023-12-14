function parseUrl(urlFormat, urlInstance) {

    const resultObj = {};
    const urlFormatArr = urlFormat.split('/');

    urlFormatArr.map((item, index) => {
        // check if the item is a variable
        if (item[0] === ':') {
            // get the value of the variable from the urlInstance
            const variableValue = urlInstance.split('/')[index];
            // add the variable and its value to the resultObj, we remove the : character and use it as key
            resultObj[item.substring(1)] = variableValue;

            if (variableValue.includes('?')) {
                resultObj[item.substring(1)] = variableValue.split('?')[0];
                // we take advantage of obj and arrays being passed by reference, the side effect is expected and desired
                processQueryParams(resultObj, variableValue);
            }
        }
    });

    return resultObj;
}

function processQueryParams(resultObj, urlInstance) {
    const params = new URL(urlInstance, 'https://example.com').searchParams;
    params.forEach((value, key) => {
        resultObj[key] = value;
    });
}

// Example
const urlFormat = '/:version/api/:collection/:id';
const urlInstance = '/6/api/listings/3?sort=desc&limit=10';

const parsedUrl = parseUrl(urlFormat, urlInstance);
console.log(parsedUrl);