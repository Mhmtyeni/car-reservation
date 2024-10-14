import React, { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

const SignalRComponent = ({ onMessage }) => {
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    // SignalR Hub bağlantısı oluşturma
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("http://10.108.206.9:83/carReservations-hub", {
        withCredentials: true,
      })
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);

    // Cleanup: Sayfa kapatıldığında bağlantıyı kapat
    return () => {
      if (newConnection) {
        newConnection
          .stop()
          .then(() => console.log("SignalR bağlantısı kapatıldı."))
          .catch((error) =>
            console.error("SignalR bağlantısı kapatılamadı:", error)
          );
      }
    };
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          console.log("SignalR Bağlantısı Başarılı!");

          // SignalR Hub'dan mesaj almak
          connection.on("receiveCarReservationAddedMessage", (message) => {
            onMessage(message);
          });
        })
        .catch((error) => console.error("SignalR Bağlantı Hatası:", error));
    }
  }, [connection, onMessage]);

  return <div></div>;
};

export default SignalRComponent;
