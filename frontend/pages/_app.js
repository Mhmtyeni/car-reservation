import { Suspense, useEffect } from "react";
import Head from "next/head";
import "../styles/globals.css";
import RootLayout from "./layout";
import Loading from "../components/layout/Loading";
import { Provider } from "react-redux";
import store from "./store";

const App = ({ Component, pageProps }) => {
  useEffect(() => {
    const baslik = "X | İdari İsler Portalı";
    const yeniBaslik = "Hoop! Beni Unutma :)";

    const handleBlur = () => {
      document.title = yeniBaslik;
    };

    const handleFocus = () => {
      document.title = baslik;
    };

    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  return (
    <Provider store={store}>
      <RootLayout>
        <Head>
          <title>X| İdari İsler Portalı</title>

          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta
            name="description"
            content="Bu sayfa idari işler portalı hakkında bilgi verir."
          />
        </Head>

        <Suspense fallback={<Loading />}>
          <Component {...pageProps} />
        </Suspense>
      </RootLayout>
    </Provider>
  );
};

export default App;
