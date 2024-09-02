import { Helmet } from "react-helmet-async";

const HelmetTags = (props: {
	roomName: string;
	userName: string;
}): JSX.Element => {
	const { roomName, userName } = props;

	const joinTitle = `Join ${userName}'s shared Timer`;
	const joinDescription = `Join the ${roomName} timer and study with your team or friends!`;
	const logo =
		"https://raw.githubusercontent.com/CommunityFocus/cf-frontend/main/public/images/communityFocus-icon-meta.png";
	return (
		<>
			<Helmet>
				<meta name="description" content={joinDescription} />
				<meta name="title" content={joinTitle} />
				/* OG Tags */
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://communityfocus.app" />
				<meta property="og:title" content={joinTitle} />
				<meta property="og:description" content={joinDescription} />
				<meta property="og:image" content={logo} />
				<meta property="og:image:width" content="38" />
				<meta property="og:image:height" content="40" />
				/* Twitter Card Meta Tags */
				<meta property="twitter:card" content="summary_large_image" />
				<meta
					property="twitter:url"
					content="https://communityfocus.app/"
				/>
				<meta property="twitter:title" content={joinTitle} />
				<meta
					property="twitter:description"
					content={joinDescription}
				/>
				<meta property="twitter:image" content={logo} />
			</Helmet>
		</>
	);
};
export default HelmetTags;
