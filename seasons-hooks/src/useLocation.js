import { useState, useEffect } from "react";

const useLocation = () => {
  const [lat, setLat] = useState(null);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(
      position => setLat(position.coords.latitude),
      err => setErrMsg(err.message)
    );
  }, []);
  //这里确定位置的请求只调用一次，所以这里放一个空数组

  return [lat, errMsg];
};

export default useLocation;
