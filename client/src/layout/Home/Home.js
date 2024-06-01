
import "react-toastify/dist/ReactToastify.css";
import Tracks from "../../components/Track/Tracks";

const Home = ({ playing, setPlaying, selectedHowl, setSelectedHowl }) => {
    return (
        <Tracks
            playing={playing}
            setPlaying={setPlaying}
            selectedHowl={selectedHowl}
            setSelectedHowl={setSelectedHowl}
        />
    );
};

export default Home;
