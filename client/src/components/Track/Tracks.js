import React, { useState, useEffect } from "react";
import TableHeader from "./TableHeader";
import Track from "./Track";
import { getSongs } from "../../api/api";

// tracks = [
//     {
//         id: 1,
//         src: "https://spaces.im/music/download/ms00/music/m/027020036211102025074219138019189102159151198186145220185019/1716391952/97086067/0/32fe6b6d69d411fc35bf2c36c0f042a6/Queen-Bohemian_Rhapsody-world76.spcs.bio.mp3",
//         title: "Smells Like Teen Spirit",
//         artist: "Nirvana",
//         album: "Neverliuk",
//         imgSrc: "https://unsplash.it/40/40",
//         duration: "3:03",
//         isLiked: true,
//     },
//     {
//         id: 2,
//         src: "track2.mp3",
//         title: "Smoother AF",
//         artist: "Edd",
//         album: "Edd's Album",
//         imgSrc: "https://unsplash.it/40/40",
//         duration: "3:52",
//         isLiked: false,
//     },
//     {
//         id: 3,
//         src: "track3.mp3",
//         title: "Smoothest AF",
//         artist: "Eddy",
//         album: "Eddy's Album",
//         imgSrc: "https://unsplash.it/40/40",
//         duration: "2:31",
//         isLiked: true,
//     },
//     {
//         id: 4,
//         src: "track3.mp3",
//         title: "Smoothest AF",
//         artist: "Eddy",
//         album: "Eddy's Album",
//         imgSrc: "https://unsplash.it/40/40",
//         duration: "2:31",
//         isLiked: false,
//     },
//     {
//         id: 5,
//         src: "track3.mp3",
//         title: "Smoothest AF",
//         artist: "Eddy",
//         album: "Eddy's Album",
//         imgSrc: "https://unsplash.it/40/40",
//         duration: "2:31",
//         isLiked: false,
//     },
//     {
//         id: 6,
//         src: "track3.mp3",
//         title: "Smoothest AF",
//         artist: "Eddy",
//         album: "Eddy's Album",
//         imgSrc: "https://unsplash.it/40/40",
//         duration: "2:31",
//         isLiked: true,
//     },
//     {
//         id: 7,
//         src: "track3.mp3",
//         title: "Smoothest AF",
//         artist: "Eddy",
//         album: "Eddy's Album",
//         imgSrc: "https://unsplash.it/40/40",
//         duration: "2:31",
//         isLiked: false,
//     },
// ];

export default function Tracks({
    playing,
    setPlaying,
    selectedHowl,
    setSelectedHowl,
}) {
    const { tracks, setTracks } = useState([]);

    useEffect(() => {
        (async () => {
            alert("asdadasd")
            const data = await getSongs();
            console.log(data);
        })();
    }, []);

    return (
        <div className="w-full mx-auto px-4 py-2">
            <TableHeader />

            {tracks.map((track, idx) => {
                return (
                    <Track
                        key={track.id}
                        track={track}
                        selectedHowl={selectedHowl}
                        setSelectedHowl={setSelectedHowl}
                        playing={playing}
                        setPlaying={setPlaying}
                        isFirstTrack={idx === 0}
                        isLiked={track.isLiked}
                    />
                );
            })}
        </div>
    );
}
