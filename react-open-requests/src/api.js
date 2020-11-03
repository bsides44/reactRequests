const { USER_NAME, TOKEN } = process.env


export function getAllReactData(onSuccess = () => null) {
    return fetch("https://api.github.com/repos/facebook/react/pulls", {
        headers: new Headers({
            'Authorization': USER_NAME + ':' + TOKEN,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
        })
    })
        .then(response => response.json())
        .then(data => {
            onSuccess(data)
        })
        .catch(error => console.error(error))
}

