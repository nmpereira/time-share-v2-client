import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import socket from "./components/Socket/socket";
import Room from "./components/Room/Room";
import DefaultRoom from "./components/DefaultRoom/DefaultRoom";
import LandingPage from "./components/LandingPage/LandingPage";
import { ThemeType } from "../common/theme";
import "reactjs-popup/dist/index.css";

const App = (): JSX.Element => {
	const [globalUsersConnected, setGlobalUsersConnected] = useState<number>(0);
	const [isConnected, setIsConnected] = useState<boolean>(false);
	const [isBreak, setIsBreak] = useState<boolean>(false);
	const [themeGroup, setThemeGroup] = useState<keyof typeof ThemeType>(
		(localStorage.getItem("themeGroup") as keyof typeof ThemeType) in
			ThemeType
			? (localStorage.getItem("themeGroup") as keyof typeof ThemeType)
			: "original"
	);

	const onGlobalUsers = ({
		globalUsersCount,
	}: {
		globalUsersCount: number;
	}): void => {
		setGlobalUsersConnected(globalUsersCount);
	};

	const onConnect = (): void => {
		setIsConnected(true);
	};

	const onDisconnect = (): void => {
		setIsConnected(false);
	};

	useEffect(() => {
		socket.on("globalUsers", onGlobalUsers);
		socket.on("connect", onConnect);
		socket.on("disconnect", onDisconnect);

		return () => {
			socket.off("globalUsers", onGlobalUsers);
			socket.off("connect", onConnect);
			socket.off("disconnect", onDisconnect);
		};
	}, []);

	return (
		<ThemeProvider theme={{ themeGroup, setThemeGroup }}>
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={
							<LandingPage
								globalUsersConnected={globalUsersConnected}
								isBreak={isBreak}
								isConnected={isConnected}
							/>
						}
					/>
					<Route
						path="/:room"
						element={
							<Room
								globalUsersConnected={globalUsersConnected}
								isBreak={isBreak}
								setIsBreak={setIsBreak}
								isConnected={isConnected}
								setIsConnected={setIsConnected}
							/>
						}
					/>
					<Route
						path="/default"
						element={
							<DefaultRoom
								globalUsersConnected={globalUsersConnected}
								isBreak={isBreak}
								isConnected={isConnected}
							/>
						}
					/>
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
};

export default App;
