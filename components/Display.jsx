import axios from "axios";
import { useEffect, useState } from "react";

const Display = () => {
	const [geo, setGeo] = useState({});
	const [weather, setWeather] = useState({});

	useEffect(() => {
		if ("geolocation" in navigator) {
			console.log("geolocation is available");
		} else {
			console.warn("geolocation is not available");
		}
	}, []);
	const getWeather = async () => {
		navigator.geolocation.getCurrentPosition((position) => {
			setGeo(() => (geo = position.coords));
		});

		if (geo.latitude != undefined && geo.longitude != undefined) {
			console.log("getingdata");
			const req = await axios.get("http://api.weatherapi.com/v1/current.json", {
				params: {
					key: "ec652dfc4c1e41fb8f063234221108",
					q: `${geo.latitude},${geo.longitude}`,
				},
			});

			const res = req.data;

			// setWeather(res);

			console.log(res);
		} else {
			console.log("please wait");
		}
	};
	return (
		<>
			<div className="">
				<button
					onClick={getWeather}
					className="px-8 py-4 bg-fuchsia-600 text-white text-3xl">
					Click Me
				</button>
			</div>
		</>
	);
};

export default Display;
