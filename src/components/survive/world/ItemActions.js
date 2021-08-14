const g = (name, action) => ({ name, action });

const itemActions = {
	//Consumables
  handwarmers: [
    g('Consume', () => console.log('oi'))
  ],
	//Tools
  //Weapons
  crowbar: [
    g('Use', () => console.log('oi'))
  ]
	//Writing
};

export default itemActions;
