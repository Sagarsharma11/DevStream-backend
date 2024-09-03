import {Router} from "express";
const router = Router();

import {fetchAllYoutubeData, getAllData} from "../controllers/video.controller.js";

router.route("/fetch-all-data").get(fetchAllYoutubeData);
router.route("/get-all-data").get(getAllData)

export default router;