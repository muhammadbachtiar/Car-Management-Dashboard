import { type Knex } from 'knex'

export async function seed (knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('cars').del()

  // Inserts seed entries
  await knex('cars').insert([
    {
      name: 'Ford Mustang 5.0 V8 GT',
      plate: 'DBH-3491',
      manufacture: 'Ford',
      model: 'F150',
      image_url: 'https://tse2.mm.bing.net/th?id=OIP.vsW0wL6wZ9fy-lzQsnUjsgHaEK&pid=Api&P=0&h=220',
      rent_per_day: 200000,
      capacity: 2,
      description: 'Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter.',
      transmission: 'Automatic',
      type: 'Sedan',
      year: '2022',
      options: JSON.stringify(['Cruise Control', 'Tinted Glass', 'Tinted Glass', 'Tinted Glass', 'AM/FM Stereo']),
      specs: JSON.stringify(['Brake assist', 'Leather-wrapped shift knob', 'Glove box lamp', 'Air conditioning w/in-cabin microfilter', 'Body color folding remote-controlled pwr mirrors', 'Dual-stage front airbags w/occupant classification system']),
      available_at: '2022-03-23T15:49:05.563Z'
    },
    {
      name: 'BMW Resurrects The 8-Series',
      plate: 'WXB-3984',
      manufacture: 'BMW',
      model: 'X5',
      image_url: 'https://www.dmarge.com/wp-content/uploads/2017/05/bmw1.jpg',
      rent_per_day: 800000,
      capacity: 6,
      description:
        'Rear passenger map pockets. Electrochromic rearview mirror. Dual chrome exhaust tips. Locking glove box.',
      available_at: '2022-03-23T15:49:05.563Z',
      transmission: 'Automatic',
      type: 'Convertible',
      year: 2019,
      options: JSON.stringify([
        'Keyless Entry',
        'Power Windows',
        'MP3 (Single Disc)',
        'CD (Multi Disc)',
        'Navigation'
      ]),
      specs: JSON.stringify([
        'Rear passenger map pockets',
        'Electrochromic rearview mirror',
        'Dual chrome exhaust tips',
        'Locking glove box',
        'Pwr front vented disc/rear drum brakes'
      ])
    },
    {
      name: 'Lincoln MKZ Sedan',
      plate: 'OSL-4224',
      manufacture: 'Lincoln',
      model: 'MKZ',
      image_url: 'https://www.automobilemag.com/uploads/sites/5/2016/11/2017-Lincoln-MKZ-30T-AWD-lead-e1580405641532.jpg',
      rent_per_day: 900000,
      capacity: 6,
      description:
        'Driver & front passenger map pockets. Direct-type tire pressure monitor system. Cargo area lamp. Glove box lamp.',
      available_at: '2022-03-23T15:49:05.563Z',
      transmission: 'Automanual',
      type: 'Sedan',
      year: 2021,
      options: JSON.stringify([
        'Bucket Seats',
        'Airbag: Passenger',
        'Airbag: Driver',
        'Power Seats',
        'Airbag: Side',
        'Antilock Brakes',
        'CD (Multi Disc)'
      ]),
      specs: JSON.stringify([
        'Driver & front passenger map pockets',
        'Direct-type tire pressure monitor system',
        'Cargo area lamp',
        'Glove box lamp',
        'Silver finish interior door handles',
        'Driver & front passenger advanced multistage airbags w/occupant sensors',
        'Silver accent IP trim finisher -inc: silver shifter finisher',
        'Fasten seat belt warning light/chime'
      ])
    },
    {
      name: 'BMW M5 Competition First Drive',
      plate: 'VPT-9753',
      manufacture: 'BMW',
      model: 'M5',
      image_url: 'http://cdn.carbuzz.com/gallery-images/1600/446000/0/446098.jpg',
      rent_per_day: 900000,
      capacity: 6,
      description: '6.1L SRT V8 "Hemi" engine.',
      available_at: '2022-03-23T15:49:05.563Z',
      transmission: 'Manual',
      type: 'Hatchback',
      year: 2018,
      options: JSON.stringify([
        'Alloy Wheels',
        'Power Locks',
        'A/C: Rear',
        'MP3 (Single Disc)',
        'Airbag: Driver',
        'A/C: Front',
        'Tinted Glass',
        'Alloy Wheels',
        'Alarm'
      ]),
      specs: JSON.stringify([
        '6.1L SRT V8 "Hemi" engine',
        'Multi-info display -inc: driving range, average MPG, current MPG, average speed, outside temp, elapsed time, maintenance & diagnostic messages',
        'Front & rear passenger folding assist grips',
        'Electronic throttle control system w/intelligence (ETCS-i)',
        'Pwr tilt/slide moonroof -inc: 1-touch open/close',
        'Acoustic glass windshield'
      ])
    },
    {
      name: 'Lincoln Aviator',
      plate: 'BHD-3923',
      manufacture: 'Lincoln',
      model: 'Navigator',
      image_url: 'https://images.cars.com/cldstatic/wp-content/uploads/lincoln-aviator-2020-01-angle--exterior--front--grey.jpg',
      rent_per_day: 200000,
      capacity: 2,
      description:
        'Body color sill extension. Torsion beam rear suspension w/stabilizer bar. Front & rear passenger folding assist grips.',
      available_at: '2022-03-23T15:49:05.563Z',
      transmission: 'Automatic',
      type: 'Minivan',
      year: 2020,
      options: JSON.stringify([
        'CD (Multi Disc)',
        'Cruise Control',
        'Power Locks',
        'Alloy Wheels',
        'Tow Package'
      ]),
      specs: JSON.stringify([
        'Body color sill extension',
        'Torsion beam rear suspension w/stabilizer bar',
        'Front & rear passenger folding assist grips',
        'Electronic control braking (ECB)',
        'Black windshield molding'
      ])
    }
  ])
}
