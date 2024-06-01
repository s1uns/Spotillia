const url = process.env.VITE_ASPNETCORE_HTTPS_PORT
    ? process.env.VITE_ASPNETCORE_HTTPS_PORT
    : "http://localhost:5000/";
export const getSongs = async () => {
    return fetch(`${url}songs/all-songs`)
        .then((res) => res.json())
        .then((data) => (data = data));
};
