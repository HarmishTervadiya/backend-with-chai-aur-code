import { Router } from "express";
import {changeCurrentPassword, getCurrentUser, getUserChannelProfile, getUserWatchHistory, loginUser, logoutUser, refreshAccessToken, registerUser, updateAccountDetails, updateCoverImage, updateUserAvatar } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import multer from "multer";

const router= Router()

router.route('/register').post(
    upload.fields([
        {
            name: "avatar",
            maxCount:1
        },
        {
            name: "coverImage",
            naxCount: 1
        }
    ]),
    registerUser
)

router.route('/login').post(loginUser)


// secured routes
router.route('/logout').post(
// middleware
    verifyJWT,
// next() will run the next method    
    logoutUser
)

router.route('/refreshToken').post(refreshAccessToken)

router.route('/change-password').post(verifyJWT, changeCurrentPassword)
router.route('/current-user').get(verifyJWT, getCurrentUser)
router.route('/update-account').patch(verifyJWT, updateAccountDetails)
router.route('/update-avatar').patch(verifyJWT, upload.single("avatar"), updateUserAvatar)
router.route('/update-coverImage').patch(verifyJWT, upload.single("coverImage"), updateCoverImage)
router.route('/c/:username').get(verifyJWT, getUserChannelProfile)
router.route('/history').get(verifyJWT, getUserWatchHistory)

export default router