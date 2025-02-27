import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";

const App = () => {
	const [isMuted, setIsMuted] = useState(true);
	const [isPlaying, setIsPlaying] = useState(false);
	const audioRef = useRef<HTMLAudioElement>(null);

	useEffect(() => {
		const handleUserGesture = () => {
			if (audioRef.current) {
				audioRef.current.muted = false;
				setIsMuted(false);
				audioRef.current
					.play()
					.then(() => {
						setIsPlaying(true);
						document.removeEventListener("click", handleUserGesture);
					})
					.catch((err) => console.log("Playback prevented:", err));
			}
		};

		document.addEventListener("click", handleUserGesture);

		return () => {
			document.removeEventListener("click", handleUserGesture);
		};
	}, []);

	const toggleMute = () => {
		if (audioRef.current) {
			audioRef.current.muted = !audioRef.current.muted;
			setIsMuted(!isMuted);

			if (!isPlaying) {
				audioRef.current
					.play()
					.then(() => setIsPlaying(true))
					.catch((err) => console.log("Playback prevented:", err));
			}
		}
	};

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route
						path='/showroom'
						element={
							<LandingPage
								toggleMute={toggleMute}
								isMuted={isMuted}
								audioRef={audioRef}
							/>
						}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
