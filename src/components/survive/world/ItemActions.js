import { affectPlayerTemperature } from "../redux/playerSlice";

const g = (name, action) => ({ name, action });

const itemActions = {
	//Consumables
  handwarmers: [
    g('Consume', () => affectPlayerTemperature({ temperature: 10 }))
  ],
	//Tools
  //Weapons
  crowbar: [
    g('Use', () => console.log('oi'))
  ]
	//Writing
};

export default itemActions;