const gm = (display, description, stackable = false) =>
	({ display, description, stackable });

const itemMetadata = {
  //Consumables
  handwarmers: gm('Handwarmers',
		'Small packets that disperse a modest amount of heat when activated',
		true),

  //Tools
  flashlight: gm('Flashlight',
		'A meager black torch powered by batteries',
		false),

  //Weapons

  //Writing
  welcome_note: gm('Note',
		'An old, dingy slip of paper with a note',
		false)
};

export default itemMetadata;
