import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyscHandler } from "../utils/asyncHandler.js";

const verifyJWT = asyscHandler(async (req, res, next) => {
    try {
        // Extract token from cookies or Authorization header
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        console.log("Token received in request: Bismillah!", token);

        // const decoded = jwt.decode(token, { complete: true });
        // console.log("Decoded Token:", decoded);

        if (!token) {
            throw new ApiError(401, "Unauthorized request: Token missing");
        }
        const decoded = jwt.decode(token, { complete: true });
        console.log("Decoded Token Without Verification:KKK", decoded);

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        console.log("Decoded Token: Bismillah!", decodedToken);

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
        console.log("User:", user);

        // Verify the token
        // let decodedToken;
        // try {
        //     decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // } catch (error) {
        //     console.error("JWT verification error:", error.message);
        //     throw new ApiError(403, "Invalid or expired token");
        // }

        console.log("Decoded token:", decodedToken);

        // Fetch the user based on the decoded token
        if (!user) {
            throw new ApiError(404, "Invalid Access Token: User not found");
        }

        // Attach user information to the request object
        req.user = user;
        next();
    } catch (error) {
        console.error("Error in verifyJWT middleware:", error.message);
        throw new ApiError(error.statusCode || 401, error?.message || "Unauthorized request");
    }
});

export { verifyJWT };