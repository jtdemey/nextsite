const gm = (display, description, stackable = false, equipable = false) =>
	({ display, description, stackable, equipable });

const itemMetadata = {
  //Consumables
  handwarmers: gm('Handwarmers',
		'Small packets that disperse a modest amount of heat when activated',
		true),

  //Tools
  flashlight: gm('Flashlight',
		'A meager black torch powered by batteries',
		false, true),

  //Weapons
  crowbar: gm('Crowbar',
    'A metal tool that can be used for many purposes, some more blunt than others.',
    false, true),

  //Writing
  welcome_note: gm('Note',
		'An old, dingy slip of paper with a note scribbled upon it',
		false)
};
export default itemMetadata;

export const getItemDisplayName = name => itemMetadata[name].display;

export const getItemDescription = name => itemMetadata[name].description;

const flag = (itemName, prop) => itemMetadata[itemName] && itemMetadata[itemName][prop] === true;

export const isEquipable = name => flag(name, 'equipable');

export const isStackable = name => flag(name, 'stackable');
