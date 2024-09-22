import {Router} from "express";
const router = Router();

import {clearQueue, fetchAllYoutubeData, getAllData, getLatestResult} from "../controllers/video.controller.js";

router.route("/fetch-all-data").get(fetchAllYoutubeData);
router.route("/get-all-data").get(getAllData);
router.route("/get-latest-result").get(getLatestResult);
router.route("/clear-queue").get(clearQueue)

export default router;