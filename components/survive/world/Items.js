const gm = (display, description, stackable, consumable, equipable) => ({ display, description, stackable, consumable, equipable });

const itemMetadata = {
  //Consumables
  handwarmers: gm('Handwarmers', 'Small packets that disperse a modests amount of heat when activated', true, true, false),

  //Tools
  flashlight: gm('Flashlight', 'A meager black torch powered by batteries', false, false, false),

  //Weapons

  //Writing
  welcome_note: gm('Note', 'An old, dingy slip of paper with a note', false, false, false)
};

export default itemMetadata;