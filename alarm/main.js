// we assume that logError(error) is part of a class or prototype, so we can hold some state
// in memory data structure like redis could also be used, this would be helpful for concurrent cases

let errorCount = 0;
let lastNotificationTimeStamp = null;
const errorThresholdPerMinute = 10;

function logError(error) {
    const currentTimeStamp = Date.now();

    // logic to write error to a file

    errorCount++;

    if (shouldNotify(currentTimeStamp)) {
        sendNotification();
        errorCount = 0;
        lastNotificationTimeStamp = currentTimeStamp;
    }
}

function shouldNotify(currentTimeStamp) {
    // check if the error count is above the threshold and if the last notification was sent more than a minute ago
    const isAboveThresholdTime = (currentTimeStamp - lastNotificationTimeStamp) / 1000 >= 60
    return (errorCount >= errorThresholdPerMinute && isAboveThresholdTime)
}

function sendNotification() {
    // logic to send notification
    console.log('sending notification');
}


// small test
for (let i = 0; i < 30; i++) {
    logError('error 1');
}