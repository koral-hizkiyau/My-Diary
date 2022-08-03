
export const host = "http://localhost:5000";
export const apiUrl = process.env.REACT_APP_REAL_URL;

export const doApiGet = async (_url) => {
    let resp = await fetch(_url);
    let data = await resp.json();
    return data;
}

export const doApiPost = async (_url, _body) => {
    let resp = await fetch(_url, {
        method: "POST",
        body: JSON.stringify(_body),
        headers: {
            'content-type': "application/json"
        }
    })
    let data = await resp.json()
    return data;
}





// פוסט עם טוקן
export const doApiPostToken = async (_url, _body) => {
    let resp = await fetch(_url, {
        method: "POST",
        body: JSON.stringify(_body),
        headers: {
            'content-type': "application/json",
            'x-auth-token':localStorage[process.env.REACT_APP_LOCALHOST_KEY]

        }
    })
    let data = await resp.json()
    return data;
}




// גט עם טוקן
export const doApiGetToken = async (_url, _body) => {
    let resp = await fetch(_url, {
        method: "POST",
        body: JSON.stringify(_body),
        headers: {
            'content-type': "application/json",
            

        }
    })
    let data = await resp.json()

    return data;
}
