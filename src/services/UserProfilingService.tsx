const getLocation = async () => {
  const retObj = { latitude: 0, longitude: 0, accuracy: 0 };
  if (!navigator.geolocation) {
    console.log("Geolocation is not supported by this browser.");
    return retObj;
  }
  navigator.geolocation.getCurrentPosition(function (location) {
    retObj.latitude = location.coords.latitude;
    retObj.longitude = location.coords.longitude;
    retObj.accuracy = location.coords.accuracy;
  });
  return retObj;
}

export {
  getLocation
}