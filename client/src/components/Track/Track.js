import React, { useEffect, useState } from "react";
import { BsPlayFill, BsPauseFill } from "react-icons/bs";
import { Howl } from "howler";
import styles from "./Track.module.scss";
import { MdFileDownload } from "react-icons/md";
import { FaRegHeart, FaHeart } from "react-icons/fa";

export default function Track({
    track,
    selectedHowl,
    setSelectedHowl,
    playing,
    setPlaying,
    isFirstTrack,
}) {
    const [howl, setHowl] = useState(null);

    useEffect(() => {
        const newHowl = new Howl({
            src: [track.src],
            loop: true,
            autoplay: false,
        });

        setHowl(newHowl);

        if (isFirstTrack) {
            setSelectedHowl(newHowl);
        }
    }, [track]);

    const togglePlay = () => {
        if (howl.playing()) {
            howl.pause();
            setPlaying(false);
            return;
        }

        selectedHowl.playing() && selectedHowl.pause();

        setPlaying(true);
        howl.play();
        setSelectedHowl(howl);
    };

    return (
        <div onClick={togglePlay} className={styles["track"]}>
            <div className={styles["track-img"]}>
                {selectedHowl === howl && playing ? (
                    <BsPauseFill size="20px" />
                ) : (
                    <BsPlayFill size="20px" />
                )}
                <img src={track.imgSrc} className="w-[40px] h-[40px] ml-2" />
            </div>
            <div className="col-span-5 flex flex-col items-start justify-start">
                <span className="text-white font-semibold">{track.title}</span>
                <span>, {track.artist}</span>
            </div>
            <div className="col-span-5 flex items-center justify-start">
                {track.album}
            </div>
            <div className="col-span-1 flex items-center justify-start">
                {track.duration}
            </div>
            <a href={track.src} download={`${track.title}.mp3`}>
                <MdFileDownload className={styles["download-icon"]} />
            </a>
            {track.isLiked ? (
                <FaHeart className={styles["like-btn"]} />
            ) : (
                <FaRegHeart className={styles["like-btn"]} />
            )}
        </div>
    );
}
