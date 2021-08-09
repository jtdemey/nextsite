import * as F from './LocaleFactory';
import { DIRECTIONS, TEMPERATURES, VISIBILITIES } from './LocaleConstants';

const forestLocales = [

  F.createLocale('car', 'Car', 7, 0, 7, {
    enterPhrase: `You sit in the driver's seat.`,
    examinePhrase: 'Your typically reliable Audi 5000CS Turbo Quattro provides meager solace from the bitter cold.',
    containers: [
      F.createContainer('Glovebox', `It's modest glovebox; it seems unlocked.`, [
        F.createLoot(1, 'handwarmers', 1),
        F.createLoot(1, 'flashlight', 1)
      ])
    ],
    exits: [
      F.createExit(DIRECTIONS.OUTSIDE, 'mailbox', 1000, 'You exit the vehicle.')
    ],
    items: [
      F.createItem('handwarmers', 1)
    ]
  }),

  F.createLocale('mailbox', 'Roadside', 7, 0, 7, {
    enterPhrase: `The cold, still air bites at your face. You stand in
			the center of a jagged, neglected road twisting through dark trees
			and heavy undergrowth. There is a mailbox here at the mouth of a driveway.`,
    containers: [
      F.createContainer('Car trunk', `The trunk to your sedan.`, [
        F.createLoot(1, 'crowbar', 1)
      ]),
      F.createContainer('Mailbox', `There's a simple, dark green mailbox here at the cusp of a driveway.`, [
        F.createLoot(1, 'welcome_note', 1)
      ])
    ],
    exits: [
      F.createExit(DIRECTIONS.SOUTH, 'farm_front_driveway', 1000, 'You march through the decrepit entrance to the driveway.'),
      F.createExit(DIRECTIONS.INSIDE, 'car', 1500, 'You open the car door, duck, and step inside.')
    ],
    items: [
      F.createItem('handwarmers', 1)
    ],
    temperature: TEMPERATURES.COLD
  }),

  F.createLocale('farm_front_driveway', 'Front Driveway', 7, 0, 6, {
    exits: [
      F.createExit(DIRECTIONS.NORTH, 'mailbox', 1000, 'You exit the mouth of the driveway, arriving back at the main road.')
    ],
    items: [
      F.createItem('handwarmers', 1)
    ],
    temperature: TEMPERATURES.COLD
  })
];

const forest = {};
forestLocales.forEach(loc => forest[loc.name] = loc);

export default forest;
