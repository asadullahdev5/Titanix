import { useEffect, useState } from "react";
import { GoUnmute } from "react-icons/go";
import { IoVolumeMuteOutline } from "react-icons/io5";
import InteriorShowBgDark from "../assets/images/model-interior-dark.png";
import InteriorShowBgLight from "../assets/images/model-interior-light.png";
import Logo from "../assets/images/titan_logo.png";
import CarModel from "../components/CarModel";
import LandingPageBg from "../assets/images/home-bg-5.png";
import { MdSwipeLeft } from "react-icons/md";
import { IoMdColorPalette } from "react-icons/io";

interface LandingPageProps {
	toggleMute: () => void;
	isMuted: boolean;
	audioRef: React.RefObject<HTMLAudioElement>;
}

const LandingPage = ({ toggleMute, isMuted, audioRef }: LandingPageProps) => {
	const [interiorColor, setInteriorColor] = useState("black");
	const [initialPageLoad, setInitialPageLoad] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setInitialPageLoad(false);
		}, 50);
	}, []);

	const showInteriorImage = () => {
		return interiorColor === "black" ? InteriorShowBgDark : InteriorShowBgLight;
	};

	const exteriorColors = ["#000", "#b91c1c", "#15803d", "#374151", "#fff"];

	const interiorColors = ["black", "white"];

	const [selectedExteriorColor, setSelectedExteriorColor] = useState<string>(
		exteriorColors[0]
	);

	const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement;
		setSelectedExteriorColor(target.value);
	};

	return (
		<main
			style={{ backgroundImage: `url(${LandingPageBg})` }}
			className='bg-black text-white min-h-screen h-full overflow-hidden px-5 bg-cover bg-center'>
			<div className='z-[2] absolute top-0 left-0 w-full min-h-screen bg-black/80' />
			<div
				className={`max-w-[1440px] mx-auto z-[20] relative transition-all duration-700 ease-in-out ${
					initialPageLoad ? "opacity-0" : "opacity-[1]"
				}`}>
				<div className='relative'>
					<div className='flex justify-center items-center py-5 gap-3'>
						<img
							src={Logo}
							alt='Logo'
							className='h-[40px] w-auto border border-white rounded-full'
						/>
						<h1 className='text-3xl'>Titan</h1>
					</div>
					<p className='text-center'>Customize your car to your liking.</p>
					<button
						onClick={toggleMute}
						className='absolute top-5 right-5 p-2 hover:bg-white/10 rounded-full transition-colors'>
						{isMuted ? <IoVolumeMuteOutline /> : <GoUnmute />}
					</button>
				</div>
				<audio ref={audioRef} autoPlay loop preload='auto' muted={isMuted}>
					<source src='/bg-music.mp3' type='audio/mpeg' />
					Your browser does not support the audio element.
				</audio>

				<div className='flex mt-[3rem] lg:mt-[5rem] gap-5 h-[60vh] px-3 overflow-x-auto lg:overflow-x-hidden scrollbar-hide'>
					{/* Card 1 */}
					<div className='flex-1 flex flex-col gap-3 min-w-[100%] lg:min-w-[45%] max-h-[50vh]'>
						<CarModel selectedColor={selectedExteriorColor} />
						<div>
							<h1 className='uppercase mb-4'>Exterior Color</h1>
							<div className='flex gap-5 items-center'>
								{exteriorColors.map((color) => (
									<div
										key={color}
										style={{ backgroundColor: color }}
										onClick={() => setSelectedExteriorColor(color)}
										className={`w-[25px] lg:w-[40px] h-[25px] lg:h-[40px] rounded-full border-2 border-white cursor-pointer transition-all duration-300 ease-in-out hover:scale-[1.3] ${
											selectedExteriorColor === color
												? "scale-[1.3] border-3"
												: "scale-[0.9]"
										}`}
									/>
								))}
								<div className='relative'>
									<label
										htmlFor='palette'
										className='w-[25px] lg:w-[40px] h-[25px] lg:h-[40px] scale-[0.9] hover:scale-[1.3] flex justify-center items-center bg-white text-orange-400 font-medium text-[1.7rem] rounded-full transition-all duration-300 ease-in-out cursor-pointer'>
										<IoMdColorPalette />
									</label>
									<input
										type='color'
										name='palette'
										id='palette'
										className='absolute left-14 top-0'
										style={{ visibility: "hidden", opacity: 0 }}
										onInput={handleColorChange}
									/>
								</div>
							</div>
						</div>
					</div>

					{/* Card 2 */}
					<div className='flex-1 flex flex-col gap-3 min-w-[100%] lg:min-w-[45%] max-h-[50vh]'>
						<div
							className='flex-1 flex justify-center rounded-[2rem] bg-cover bg-center border border-white transition-all duration-500 ease-in-out bg-black'
							style={{ backgroundImage: `url(${showInteriorImage()})` }}></div>
						<div>
							<h1 className='uppercase mb-4'>Interior Color</h1>
							<div className='flex gap-5 items-center'>
								{interiorColors.map((color) => (
									<div
										key={color}
										onClick={() => setInteriorColor(color)}
										style={{ backgroundColor: color }}
										className={`w-[40px] h-[40px] rounded-full border-2 border-white cursor-pointer transition-all duration-300 ease-in-out hover:scale-[1.3] ${
											interiorColor === color
												? "scale-[1.3] border-3"
												: "scale-[0.9]"
										}`}
									/>
								))}
							</div>
						</div>
					</div>
				</div>

				<div className='flex justify-center lg:hidden'>
					<p className='flex items-center '>
						Swipe to see more. <MdSwipeLeft className='ml-3 text-[1.2rem]' />
					</p>
				</div>
			</div>
		</main>
	);
};

export default LandingPage;
