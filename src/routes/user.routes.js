import { Router } from "express";
import {
    loginUser,
    loggedOut,
    registerUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateUserAvatar,
    updateUserCoverImage,
    updateUserProfile,
    // getWatchHistory,
    getuserChannelProfile,
    loginAuth0

} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

//sub route folled by controller and may followed by middleware
router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 3
        }
    ]),
    registerUser
)

router.route("/login").post(
    loginUser
)

router.route("/logout").post(
    verifyJWT,
    loggedOut
)

router.route("/refresh-token").post(
    refreshAccessToken
)

router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/update-account").patch(verifyJWT, updateUserProfile)

router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)
router.route("/cover-image").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage)

router.route("/c/:username").get(verifyJWT, getuserChannelProfile)
router.route("/auth0").post(loginAuth0)   //login with auth0  //verifyJWT,    //loginAuth0)
// router.route("/history").get(verifyJWT, getWatchHistory)
export default router