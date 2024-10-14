// pages/_error.js
import Image from "next/image";
import Link from "next/link";

function Error({ statusCode }) {
  return (
    <div className=" fixed top-0 left-0 z-50 w-[100%] h-[100%] flex justify-center items-center">
      <Image
        src={statusCode === 500 ? "/element/505.svg" : "/element/404.svg"}
        alt={statusCode ? `${statusCode} - Sunucu Hatası` : "Tarayıcı Hatası"}
        style={{ objectFit: "cover" }}
        fill
      />

      <Link
        href="/home"
        className={
          statusCode === 500
            ? ` button underline absolute sm:bottom-2 bottom-20`
            : ` button underline absolute sm:bottom-2  bottom-4`
        }
      >
        Anasayfa
      </Link>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
