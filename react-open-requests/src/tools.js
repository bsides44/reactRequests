export const times = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    // second: 1
};

export const checkPlural = (value, singular) => {
    return value >= 2 ? " " + singular + "s" : " " + singular
}

export const checkLast = (items, index) => {
    if (index === items.length - 1) return ""
    return index === items.length - 2 ? " and " : ", "
}

export const calculateTimeToNow = (pastTime) => {
    let openForSeconds = Math.abs((new Date() - pastTime) / 1000)
    let timeBox = {}
    Object.keys(times).forEach(function (key) {
        timeBox[key] = Math.floor(openForSeconds / times[key]);
        openForSeconds -= timeBox[key] * times[key];
    });

    return Object.keys(timeBox).map((key, i) => {
        return `${timeBox[key] ? timeBox[key] + checkPlural(timeBox[key], key) + checkLast(Object.keys(timeBox), i) : ""}`
    }).join("")
}

export const calculateAvOpenTime = (pullsData) => {
    const openTimes = []
    pullsData.map(pull => {
        if (pull.closed_at === null) {
            const event = Math.abs(new Date(pull.created_at))
            openTimes.push(event)
        }
        return pull
    })
    const avSeconds = (openTimes.reduce((a, b) => a + b)) / openTimes.length
    const splitTimeArray = calculateTimeToNow(avSeconds).split(", ")
    return splitTimeArray
}

export const checkDateIsToday = (incoming) => {
    const today = new Date()
    const incomingDate = new Date(incoming)
    return incomingDate.getDate() === today.getDate() && incomingDate.getMonth() === today.getMonth() &&
        incomingDate.getFullYear() === today.getFullYear()
}

export const toggleChevronUp = () => {
    let chevron = document.getElementsByClassName('fe-chevron-down').item(0)
    if (chevron) {
        chevron.classList.remove('fe-chevron-down')
        chevron.classList.add('fe-chevron-up')
    }
}

export const toggleChevronDown = () => {
    let chevron = document.getElementsByClassName('fe-chevron-up').item(0)
    if (chevron) {
        chevron.classList.remove('fe-chevron-up')
        chevron.classList.add('fe-chevron-down')
    }
}