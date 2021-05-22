import * as F from './LocaleFactory';
import { DIRECTIONS, TEMPERATURES, VISIBILITIES } from './LocaleConstants';

const forestLocales = [
  F.createLocale('car', 'Car', 7, 0, 7, {
    containers: [
      F.createContainer('Glovebox', `It's modest glovebox; it seems unlocked.`, [
        F.createLoot(1, 'handwarmers', 1)
      ])
    ],
    exits: [
      F.createExit(DIRECTIONS.OUTSIDE, 1000, 'You exit the vehicle.')
    ],
    items: [
      F.createItem('handwarmers', 1)
    ]
  }),
  F.createLocale('mailbox', 'Roadside', 7, 0, 7, {
    containers: [
      F.createContainer('Mailbox', `There's a simple, dark green mailbox here at the cusp of a driveway.`, [
        F.createLoot(1, 'welcome_note', 1)
      ])
    ],
    exits: [
      F.createExit(DIRECTIONS.INSIDE, 1500, 'You open the car door, duck, and step inside.')
    ],
    items: [
      F.createItem('handwarmers', 1)
    ]
  })
];

const forest = {};
forestLocales.forEach(loc => forest[loc.name] = loc);

export default forest;