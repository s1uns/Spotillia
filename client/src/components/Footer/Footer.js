import { BsPlay, BsPause } from "react-icons/bs";
import { Howler } from "howler";
import styles from "./Footer.module.scss";

export default function Footer({ selectedHowl, playing, setPlaying }) {
    const handleVolumeChange = (e) => {
        Howler.volume(parseInt(e.target.value, 10) / 100);
    };

    const togglePlay = () => {
        if (!selectedHowl) return;

        if (playing) {
            selectedHowl.pause();
            setPlaying(false);
        } else {
            selectedHowl.play();
            setPlaying(true);
        }
    };

    return (
        <div className={styles["footer"]}>
            <input
                type="range"
                max="100"
                defaultValue="100"
                onChange={handleVolumeChange}
                className={styles["range"]}
            />
            <button
                className="text-textLight bg-brand p-2 rounded-full ml-4"
                onClick={togglePlay}
            >
                {playing ? (
                    <BsPause
                        className={styles["play-btn"]}
                        size="50px"
                    />
                ) : (
                    <BsPlay className={styles["play-btn"]} size="50px" />
                )}
            </button>
        </div>
    );
}
