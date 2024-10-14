import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../slices/authSlice";
import { useRouter } from "next/navigation";
import { getUser } from "../slices/authUserSlice";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";

const Index = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading: authLoading } = useSelector(
    (state) => state.auth
  );
  const {
    foundUser,
    users,
    isLoading: userLoading,
    error: userError,
  } = useSelector((state) => state.user);

  const [isim, setIsim] = useState("");
  const [psw, setPsw] = useState("");

  const handleLogin = async () => {
    try {
      const result = await dispatch(
        loginUser({ usernameOrEmail: isim, password: psw })
      );

      if (result.type === "auth/login/fulfilled") {
        console.log("Giriş başarılı:", result.payload);
        // Token ile kullanıcı verilerini çekiyoruz
        await dispatch(
          getUser({ token: result.payload.accessToken, userName: isim })
        );
      } else {
        console.error("Giriş başarısız:", result.error);
      }
      //Cookie veriyi eklemek
      Cookies.set("accessToken", result.payload.accessToken, { secure: true });
      Cookies.set("refreshToken", result.payload.refreshToken, {
        secure: true,
      });
      Cookies.set("expiration", result.payload.expiration, { secure: true });
    } catch (error) {}
  };

  useEffect(() => {
    if (users.length > 0) {
      router.push("/home");
      Cookies.set("roles", users[0].userRoles, { secure: true });
      Cookies.set("userId", users[0].id, { secure: true });
      //cookie içinde alınan user roles.
    }
  }, [users]);

  return (
    <div className="relative justify-center items-center flex flex-col mt-40 h-[55vh]">
      <div className=" absolute h-[700px] w-[700px]">
        <Image src="images/ShapeLogin.svg" alt="" fill objectFit="" />
      </div>
      <div className=" justify-center flex flex-col h-[250px] w-[700px] gap-4 items-center p-10 bg-white backdrop-blur-[1px] bg-opacity-50 rounded-xl ">
        <input
          placeholder="isim"
          value={isim}
          onChange={(e) => setIsim(e.target.value)}
          type="text"
        />
        <input
          placeholder="şifre"
          value={psw}
          onChange={(e) => setPsw(e.target.value)}
          type="password"
        />
        <button onClick={handleLogin} disabled={authLoading || userLoading}>
          {authLoading || userLoading ? "Giriş Yapılıyor..." : "Giriş Yap"}
        </button>
        <Link
          href="/register"
          className=" sm:text-md text-xs font-medium text-darkColor underline"
        >
          Hesabınız yoksa kaydolun.
        </Link>
      </div>
      {isAuthenticated && foundUser && (
        <p>Giriş Başarılı! Kullanıcı ID: {foundUser?.id}</p>
      )}
      {userError && <p>Hata: {userError}</p>}
    </div>
  );
};

export default Index;

// {isAuthenticated && userId && <RoleFetcher userId={userId} />}
