const url = process.env.SERVER_URL;

export const getSongs = async () => {
    return fetch(`${url}/songs/all-songs`)
        .then((res) => res.json())
        .then((data) => (data = data));
};
