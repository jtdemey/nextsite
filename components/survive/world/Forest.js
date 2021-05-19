import * as Factory from './LocaleFactory';
import { DIRECTIONS, TEMPERATURES, VISIBILITIES } from './LocaleConstants';

const forestLocales = [
  Factory.createLocale('car', 'Car', 7, 0, 7, {
    exits: [
      Factory.createExit(DIRECTIONS.OUTSIDE, 1000, 'You exit the vehicle.')
    ],
    items: [
      Factory.createItem('handwarmers', 'Handwarmers', 'Small packets that disperse a modests amount of heat when activated', true, true, false)
    ]
  })
];

const forest = {};
forestLocales.forEach(loc => forest[loc.name] = loc);
console.log(forestLocales);

export default forest;