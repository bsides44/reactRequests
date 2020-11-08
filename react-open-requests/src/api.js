const { USER_NAME, TOKEN } = process.env

let dataArray = []
let linkHeader = ""
let nextUrl = null

export function getAllReactData(onSuccess = () => null) {
    const url = nextUrl ? nextUrl : "https://api.github.com/repos/facebook/react/pulls?per_page=100"
    return fetch(url, {
        headers: new Headers({
            'User-Agent': USER_NAME,
            'Authorization': USER_NAME + ':' + TOKEN,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
        })
    })
        .then(response => {
            // Max 100 responses per page
            // get pagination headers
            linkHeader = response.headers.get('Link')
            return response.json()
        })
        .then(response => {
            // concat each page of responses together
            let currentPageRepos = response;
            dataArray = !!dataArray[0] ? dataArray.concat(currentPageRepos) : currentPageRepos
            nextUrl = linkHeader.substring(linkHeader.indexOf("<") + 1, linkHeader.indexOf(">"));

            if (linkHeader.includes("next")) {
                // loop through until last page
                return getAllReactData();
            }
            // send all data
            else return dataArray
        })
        .then(response => onSuccess(dataArray))
        .catch(error => console.error(error))
}