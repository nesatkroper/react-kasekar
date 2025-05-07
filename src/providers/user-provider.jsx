import { decrypt, encrypt } from "@/utils/cryption";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const USER_COOKIE = "encryptedUserData";

export const setAuthData = (userData) => {
  try {
    const encryptedData = encrypt(
      {
        authId: userData.authId,
        email: userData.email,
        employeeId: userData?.employeeId,
        role: userData.role,
        status: userData.status,
      },
      import.meta.env.VITE_KEY
    );

    cookies.set(USER_COOKIE, encryptedData, {
      path: "/",
      secure: import.meta.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60,
    });
  } catch (error) {
    console.error("Failed to set auth data:", error);
  }
};

export const getAuthData = () => {
  try {
    const encryptedData = cookies.get(USER_COOKIE);
    if (!encryptedData) return null;

    return decrypt(encryptedData, import.meta.env.VITE_KEY);
  } catch (error) {
    console.error("Failed to get auth data:", error);
    return null;
  }
};

export const clearAuthData = () => {
  cookies.remove(USER_COOKIE, { path: "/" });
};
