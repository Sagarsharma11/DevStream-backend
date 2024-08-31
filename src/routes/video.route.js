import {Router} from "express";
const router = Router();

import {fetchAllYoutubeData} from "../controllers/video.controller.js";

router.route("/fetch-all-data").get(fetchAllYoutubeData);

export default router;