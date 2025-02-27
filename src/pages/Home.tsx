import { useEffect, useMemo, useState } from "react";
import { IoCarSportSharp } from "react-icons/io5";
import HomeBg2 from "../assets/images/home-bg-2.png";
import HomeBg3 from "../assets/images/home-bg-3.png";
import HomeBg4 from "../assets/images/home-bg-4.png";
import HomeBg5 from "../assets/images/home-bg-5.png";
import HomeBg from "../assets/images/home-bg.png";
import Logo from "../assets/images/titan_logo.png";
import { Link } from "react-router-dom";

const Home = () => {
	const homeBackgroundImages = useMemo(
		() => [HomeBg, HomeBg2, HomeBg3, HomeBg4, HomeBg5],
		[]
	);
	const [initialPageLoad, setInitialPageLoad] = useState(true);
	const [homeBackgroundImg, setHomeBackgroundImg] = useState(
		homeBackgroundImages[0]
	);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentImageIndex((prevIndex) =>
				prevIndex === homeBackgroundImages.length - 1 ? 0 : prevIndex + 1
			);
		}, 3000);

		return () => clearInterval(interval);
	}, [homeBackgroundImages.length]);

	useEffect(() => {
		setHomeBackgroundImg(homeBackgroundImages[currentImageIndex]);
	}, [currentImageIndex, homeBackgroundImages]);

	useEffect(() => {
		setTimeout(() => {
			setInitialPageLoad(false);
		}, 500);
	}, []);

	return (
		<main
			style={{ backgroundImage: `url(${homeBackgroundImg})` }}
			className='bg-black text-white min-h-screen h-full overflow-hidden px-5 bg-cover bg-center relative transition-all duration-700 ease-in-out'>
			<div className='z-[2] absolute top-0 left-0 w-full min-h-screen bg-black/80' />
			<div className='max-w-[1440px] mx-auto z-[20] relative'>
				<div
					className={`flex flex-col justify-center items-center min-h-screen transition-all duration-700 ease-in-out ${
						initialPageLoad ? "opacity-0" : "opacity-[1]"
					}`}>
					<div className='flex justify-center items-center py-5 gap-3'>
						<img
							src={Logo}
							alt='Logo'
							className='h-[40px] w-auto border border-white rounded-full'
						/>
						<h1 className='text-3xl'>Titan</h1>
					</div>
					<p className='text-center'>View and Customize your car model.</p>
					<Link
						to='/showroom'
						className='flex justify-center items-center px-6 py-4 bg-transparent border border-white rounded-md gap-4 mt-5 w-[80%] md:w-[40%] lg:w-[30%] xl:w-[20%] hover:bg-gray-200 hover:text-black transition-all duration-500 ease-in-out'>
						<IoCarSportSharp className='text-[1.5rem] md:text-[2rem] lg:text-[2.5rem]' />
						<span className='font-medium'>Start Now</span>
					</Link>
				</div>
			</div>
		</main>
	);
};

export default Home;
