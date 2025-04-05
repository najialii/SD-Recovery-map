const states = {
  Khartoum: {
    boundary: [
      [33.56927465829123, 
        15.455505451105264],
      [15.62, 32.73],
      [15.75, 32.61],
      [15.55, 32.38],
    ],
    status: "peaceful",
    cities: {
      Khartoum: { coordinates: [33.56927465829123,15.455505451105264], status: "peaceful", services: { electricity: true, water: true, hospitals: true, markets: true } },
      Omdurman: { coordinates: [15.6465, 32.8013], status: "peaceful", services: { electricity: true, water: true, hospitals: true, markets: true } }
    }
  },
  Darfur: {
    boundary: [
      [12.4, 23.0],
      [12.5, 23.1],
      [12.6, 23.2],
      [12.5, 23.3],
    ],
    status: "conflict",
    cities: {
      ElFasher: { coordinates: [12.457, 23.658], status: "conflict", services: { electricity: false, water: false, hospitals: true, markets: false } }
    }
  }
};
export default states;