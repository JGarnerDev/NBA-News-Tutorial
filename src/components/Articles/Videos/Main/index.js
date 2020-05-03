// Modules
import React from "react";

// Components

import VideosList from "../../../widgets/VideosList/VideosList";

// Config

// Styling

// Logic

const VideosMain = () => (
	<VideosList type="card" title={false} loadMore={true} start={0} amount={10} />
);

export default VideosMain;
