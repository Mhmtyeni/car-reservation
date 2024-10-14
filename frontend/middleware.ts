import Cookies from "js-cookie";

const tokenHasExpired = () => {
  const expirationTime = new Date(Cookies.get("expiration")); // Expiration alanını Date objesine çevir
  const currentTime = new Date(); // Mevcut zamanı al

  return expirationTime < currentTime; // Eğer expiration süresi geçmişse true döner
};
const fetchWithAuth = async (url, options = {}) => {
  let token = Cookies.get("accessToken");
  if (!token || tokenHasExpired()) {
    // Token yenileme işlemi
    const refreshToken = Cookies.get("refreshToken");
    const newTokenResponse = await fetch(
      "http://10.108.206.9:83/api/Auth/RefreshTokenLogin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
        body: JSON.stringify({ refreshToken }),
      }
    );
    const newTokenData = await newTokenResponse.json();
    Cookies.set("accessToken", newTokenData?.token?.accessToken, {
      secure: true,
    });
    Cookies.set("expiration", newTokenData?.token?.expiration, {
      secure: true,
    });
  }
  return token;
};
export default fetchWithAuth;
