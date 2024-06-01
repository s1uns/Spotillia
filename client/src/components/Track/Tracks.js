import { useState, useEffect } from "react";
import TableHeader from "./TableHeader";
import Track from "./Track";
import { getSongs } from "../../api/api";

export default function Tracks({
    playing,
    setPlaying,
    selectedHowl,
    setSelectedHowl,
}) {
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        (async () => {
            const data = await getSongs();
            setTracks(data);
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
