import React, { useState, useEffect } from "react";

const initialLocationState = { latitude: null, longitude: null, speed: null };

const AppFunction = () => {
  const [count, setCount] = useState(0);
  const [isOn, setLight] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });
  const [status, setStatus] = useState(navigator.onLine);
  const [{ latitude, longitude, speed }, setLocation] = useState({
    initialLocationState,
  });

  let mounted = true;

  useEffect(() => {
    document.title = `I was clicked ${count} times`;
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    navigator.geolocation.getCurrentPosition(handleGeolocation);
    const watchId = navigator.geolocation.watchPosition(handleGeolocation);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      mounted = false;
      navigator.geolocation.clearWatch(watchId);
    };
  }, [count]);
  const handleGeolocation = (event) => {
    if (mounted) {
      setLocation({
        latitude: event.coords.latitude,
        longitude: event.coords.longitude,
        speed: event.coords.speed,
      });
    }
  };
  const handleOnline = () => {
    setStatus(true);
  };
  const handleOffline = () => {
    setStatus(false);
  };
  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
  };
  const toggleLight = () => {
    setLight((previsOn) => !previsOn);
  };
  const handleMouseMove = (event) => {
    setMousePosition({
      x: event.pageX,
      y: event.pageY,
    });
  };
  return (
    <>
      <h2>A counter</h2>
      <button onClick={incrementCount}>I was clicked {count} times</button>
      <h2>A ligth bulb</h2>
      <img
        src={
          isOn
            ? "https://cdn2.vectorstock.com/i/thumb-large/93/86/doodle-blue-flashlight-vector-20569386.jpg"
            : "https://ak.picdn.net/shutterstock/videos/1031064983/thumb/1.jpg"
        }
        style={{
          height: "100px",
          width: "100px",
        }}
        alt="Flashlight"
        onClick={toggleLight}
      />
      <h2>Mouse Position</h2>
      {JSON.stringify(mousePosition, null, 2)}
      <br />

      <h2>Network Status</h2>
      <p>
        You are <strong>{status ? "Online" : "Offline"}</strong>
      </p>
      <h2>Geolocation</h2>
      <p>Latitude is {latitude}</p>
      <p>longitude is {longitude}</p>
      <p>speed is {speed ? speed : "0"}</p>
    </>
  );
};

export default AppFunction;
