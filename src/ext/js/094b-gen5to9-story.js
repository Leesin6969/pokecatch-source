/**
 * gen 5-9 regions, gyms & league — authored extension (gen 5–9 content pack).
 *
 * Fills the five placeholder regions, appends 8 gym chapters + Elite Four + champion per region.
 * Every wild species is placed in an explicit route pool, so all 532 new species are obtainable.
 * Recovered source files (src/js/**) are untouched; the build concatenates src/js and src/ext/js
 * in filename order.
 */
(function () {
  const regions = [
 {
  "key": "unova",
  "name": "Unys",
  "gen": "V",
  "color": "#8a8a8a",
  "open": true,
  "dex": [
   494,
   649
  ],
  "offset": 0,
  "ace": [
   62,
   0
  ],
  "economy": 1,
  "classes": "hoenn",
  "mythical": {
   "id": 649,
   "level": 70
  }
 },
 {
  "key": "kalos",
  "name": "Kalos",
  "gen": "VI",
  "color": "#3b6fe0",
  "open": true,
  "dex": [
   650,
   721
  ],
  "offset": 0,
  "ace": [
   80,
   0
  ],
  "economy": 1,
  "classes": "hoenn",
  "mythical": {
   "id": 721,
   "level": 70
  }
 },
 {
  "key": "alola",
  "name": "Alola",
  "gen": "VII",
  "color": "#ee8130",
  "open": true,
  "dex": [
   722,
   809
  ],
  "offset": 0,
  "ace": [
   95,
   0
  ],
  "economy": 1,
  "classes": "sinnoh",
  "mythical": {
   "id": 807,
   "level": 70
  }
 },
 {
  "key": "galar",
  "name": "Galar",
  "gen": "VIII",
  "color": "#a33ea1",
  "open": true,
  "dex": [
   810,
   905
  ],
  "offset": 0,
  "ace": [
   96,
   0
  ],
  "economy": 1,
  "classes": "sinnoh",
  "mythical": {
   "id": 893,
   "level": 70
  }
 },
 {
  "key": "paldea",
  "name": "Paldea",
  "gen": "IX",
  "color": "#c22e28",
  "open": true,
  "dex": [
   906,
   1025
  ],
  "offset": 0,
  "ace": [
   97,
   0
  ],
  "economy": 1,
  "classes": "sinnoh",
  "mythical": {
   "id": 1025,
   "level": 70
  }
 }
];
  const chapters = [
 {
  "name": "Trio · Forêt d'Oraz",
  "reg": "unova",
  "region": "Forêt d'Oraz → Route 1 d'Unys",
  "ace": 62,
  "capMargin": 3,
  "steps": [
   {
    "kind": "route",
    "name": "Route 1 d'Unys · 1",
    "bg": "prairie",
    "lv": [
     54,
     58
    ],
    "wild": 4,
    "trainers": 1,
    "item": true,
    "species": [
     495,
     496,
     497,
     498,
     499,
     500,
     501,
     502,
     503
    ]
   },
   {
    "kind": "heal",
    "name": "Forêt d'Oraz",
    "bg": "pokecenter"
   },
   {
    "kind": "route",
    "name": "Route 1 d'Unys · 2",
    "bg": "cave",
    "lv": [
     56,
     61
    ],
    "wild": 3,
    "trainers": 2,
    "species": [
     504,
     505,
     506,
     507,
     508,
     509,
     510,
     511,
     512
    ]
   },
   {
    "kind": "gym",
    "name": "Arène de Forêt d'Oraz",
    "bg": "gym-grass",
    "fallback": "mountain",
    "leader": "Omar",
    "sprite": "erika",
    "type": "grass",
    "badge": "Trio (Unys)",
    "color": "#7ac74c",
    "reward": 4340,
    "power": 0.3,
    "ace": 62,
    "team": [
     [
      497,
      60
     ],
     [
      542,
      61
     ],
     [
      512,
      62
     ]
    ]
   }
  ]
 },
 {
  "name": "Basique · Nacrene",
  "reg": "unova",
  "region": "Nacrene → Route 3 d'Unys",
  "ace": 64,
  "capMargin": 3,
  "steps": [
   {
    "kind": "route",
    "name": "Route 3 d'Unys · 1",
    "bg": "forest",
    "lv": [
     56,
     60
    ],
    "wild": 4,
    "trainers": 1,
    "item": false,
    "species": [
     513,
     514,
     515,
     516,
     517,
     518,
     519,
     520,
     521
    ]
   },
   {
    "kind": "heal",
    "name": "Nacrene",
    "bg": "pokecenter"
   },
   {
    "kind": "route",
    "name": "Route 3 d'Unys · 2",
    "bg": "mountain",
    "lv": [
     58,
     63
    ],
    "wild": 3,
    "trainers": 2,
    "species": [
     522,
     523,
     524,
     525,
     526,
     527,
     528,
     529,
     530
    ]
   },
   {
    "kind": "gym",
    "name": "Arène de Nacrene",
    "bg": "town",
    "fallback": "mountain",
    "leader": "Aloé",
    "sprite": "whitney",
    "type": "normal",
    "badge": "Basique (Unys)",
    "color": "#a8a77a",
    "reward": 4480,
    "power": 0.36,
    "ace": 64,
    "team": [
     [
      628,
      62
     ],
     [
      508,
      63
     ],
     [
      626,
      64
     ]
    ]
   }
  ]
 },
 {
  "name": "Insecte · Volucité",
  "reg": "unova",
  "region": "Volucité → Route 4 d'Unys",
  "ace": 66,
  "capMargin": 3,
  "steps": [
   {
    "kind": "route",
    "name": "Route 4 d'Unys · 1",
    "bg": "cave",
    "lv": [
     58,
     62
    ],
    "wild": 4,
    "trainers": 2,
    "item": true,
    "species": [
     531,
     532,
     533,
     534,
     535,
     536,
     537,
     538,
     539
    ]
   },
   {
    "kind": "heal",
    "name": "Volucité",
    "bg": "pokecenter"
   },
   {
    "kind": "route",
    "name": "Route 4 d'Unys · 2",
    "bg": "beach",
    "lv": [
     60,
     65
    ],
    "wild": 3,
    "trainers": 3,
    "species": [
     540,
     541,
     542,
     543,
     544,
     545,
     546,
     547,
     548
    ]
   },
   {
    "kind": "gym",
    "name": "Arène de Volucité",
    "bg": "town",
    "fallback": "mountain",
    "leader": "Artie",
    "sprite": "bugsy",
    "type": "bug",
    "badge": "Insecte (Unys)",
    "color": "#a6b91a",
    "reward": 4620,
    "power": 0.42,
    "ace": 66,
    "team": [
     [
      637,
      64
     ],
     [
      542,
      65
     ],
     [
      589,
      66
     ]
    ]
   }
  ]
 },
 {
  "name": "Volt · Méanville",
  "reg": "unova",
  "region": "Méanville → Route 5 d'Unys",
  "ace": 68,
  "capMargin": 3,
  "steps": [
   {
    "kind": "route",
    "name": "Route 5 d'Unys · 1",
    "bg": "mountain",
    "lv": [
     60,
     64
    ],
    "wild": 4,
    "trainers": 2,
    "item": false,
    "species": [
     549,
     550,
     551,
     552,
     553,
     554,
     555,
     556,
     557
    ]
   },
   {
    "kind": "heal",
    "name": "Méanville",
    "bg": "pokecenter"
   },
   {
    "kind": "route",
    "name": "Route 5 d'Unys · 2",
    "bg": "pier",
    "lv": [
     62,
     67
    ],
    "wild": 3,
    "trainers": 3,
    "species": [
     558,
     559,
     560,
     561,
     562,
     563,
     564,
     565,
     566
    ]
   },
   {
    "kind": "gym",
    "name": "Arène de Méanville",
    "bg": "gym-electric",
    "fallback": "mountain",
    "leader": "Inezia",
    "sprite": "ltsurge",
    "type": "electric",
    "badge": "Volt (Unys)",
    "color": "#f7d02c",
    "reward": 4760,
    "power": 0.48,
    "ace": 68,
    "team": [
     [
      604,
      65
     ],
     [
      523,
      66
     ],
     [
      596,
      67
     ],
     [
      618,
      68
     ]
    ]
   }
  ]
 },
 {
  "name": "Sismique · Port Yonville",
  "reg": "unova",
  "region": "Port Yonville → Route 6 d'Unys",
  "ace": 70,
  "capMargin": 3,
  "steps": [
   {
    "kind": "route",
    "name": "Route 6 d'Unys · 1",
    "bg": "beach",
    "lv": [
     62,
     66
    ],
    "wild": 4,
    "trainers": 2,
    "item": true,
    "species": [
     567,
     568,
     569,
     570,
     571,
     572,
     573,
     574,
     575
    ]
   },
   {
    "kind": "heal",
    "name": "Port Yonville",
    "bg": "pokecenter"
   },
   {
    "kind": "route",
    "name": "Route 6 d'Unys · 2",
    "bg": "lake",
    "lv": [
     64,
     69
    ],
    "wild": 3,
    "trainers": 3,
    "species": [
     576,
     577,
     578,
     579,
     580,
     581,
     582,
     583,
     584
    ]
   },
   {
    "kind": "gym",
    "name": "Arène de Port Yonville",
    "bg": "gym-ground",
    "fallback": "mountain",
    "leader": "Bardane",
    "sprite": "giovanni",
    "type": "ground",
    "badge": "Sismique (Unys)",
    "color": "#e2bf65",
    "reward": 4900,
    "power": 0.54,
    "ace": 70,
    "team": [
     [
      553,
      67
     ],
     [
      537,
      68
     ],
     [
      530,
      69
     ],
     [
      623,
      70
     ]
    ]
   }
  ]
 },
 {
  "name": "Jet · Parsemille",
  "reg": "unova",
  "region": "Parsemille → Route 7 d'Unys",
  "ace": 72,
  "capMargin": 3,
  "steps": [
   {
    "kind": "route",
    "name": "Route 7 d'Unys · 1",
    "bg": "pier",
    "lv": [
     64,
     68
    ],
    "wild": 4,
    "trainers": 2,
    "item": false,
    "species": [
     585,
     586,
     587,
     588,
     589,
     590,
     591,
     592,
     593
    ]
   },
   {
    "kind": "heal",
    "name": "Parsemille",
    "bg": "pokecenter"
   },
   {
    "kind": "route",
    "name": "Route 7 d'Unys · 2",
    "bg": "sea",
    "lv": [
     66,
     71
    ],
    "wild": 3,
    "trainers": 3,
    "species": [
     594,
     595,
     596,
     597,
     598,
     599,
     600,
     601,
     602
    ]
   },
   {
    "kind": "gym",
    "name": "Arène de Parsemille",
    "bg": "town",
    "fallback": "mountain",
    "leader": "Carolina",
    "sprite": "falkner",
    "type": "flying",
    "badge": "Jet (Unys)",
    "color": "#a98ff3",
    "reward": 5040,
    "power": 0.6,
    "ace": 72,
    "team": [
     [
      567,
      69
     ],
     [
      628,
      70
     ],
     [
      630,
      71
     ],
     [
      561,
      72
     ]
    ]
   }
  ]
 },
 {
  "name": "Glaçon · Flocombe",
  "reg": "unova",
  "region": "Flocombe → Route 8 d'Unys",
  "ace": 74,
  "capMargin": 3,
  "steps": [
   {
    "kind": "route",
    "name": "Route 8 d'Unys · 1",
    "bg": "lake",
    "lv": [
     66,
     70
    ],
    "wild": 4,
    "trainers": 2,
    "item": true,
    "species": [
     603,
     604,
     605,
     606,
     607,
     608,
     609,
     610,
     611
    ]
   },
   {
    "kind": "heal",
    "name": "Flocombe",
    "bg": "pokecenter"
   },
   {
    "kind": "route",
    "name": "Route 8 d'Unys · 2",
    "bg": "town",
    "lv": [
     68,
     73
    ],
    "wild": 3,
    "trainers": 3,
    "species": [
     612,
     613,
     614,
     615,
     616,
     617,
     618,
     619,
     620
    ]
   },
   {
    "kind": "gym",
    "name": "Arène de Flocombe",
    "bg": "town",
    "fallback": "mountain",
    "leader": "Zhu",
    "sprite": "pryce",
    "type": "ice",
    "badge": "Glaçon (Unys)",
    "color": "#96d9d6",
    "reward": 5180,
    "power": 0.6599999999999999,
    "ace": 74,
    "team": [
     [
      584,
      70
     ],
     [
      615,
      71
     ],
     [
      614,
      72
     ],
     [
      583,
      73
     ],
     [
      582,
      74
     ]
    ]
   }
  ]
 },
 {
  "name": "Légende · Janusia",
  "reg": "unova",
  "region": "Janusia → Route 9 d'Unys",
  "ace": 76,
  "capMargin": 3,
  "steps": [
   {
    "kind": "route",
    "name": "Route 9 d'Unys · 1",
    "bg": "sea",
    "lv": [
     68,
     72
    ],
    "wild": 4,
    "trainers": 2,
    "item": false,
    "species": [
     621,
     622,
     623,
     624,
     625,
     626,
     627,
     628,
     629,
     638,
     640,
     642,
     644,
     646,
     648
    ]
   },
   {
    "kind": "heal",
    "name": "Janusia",
    "bg": "pokecenter"
   },
   {
    "kind": "route",
    "name": "Route 9 d'Unys · 2",
    "bg": "prairie",
    "lv": [
     70,
     75
    ],
    "wild": 3,
    "trainers": 3,
    "species": [
     630,
     631,
     632,
     633,
     634,
     635,
     636,
     637,
     494,
     639,
     641,
     643,
     645,
     647,
     649
    ]
   },
   {
    "kind": "gym",
    "name": "Arène de Janusia",
    "bg": "town",
    "fallback": "mountain",
    "leader": "Watson",
    "sprite": "clair",
    "type": "dragon",
    "badge": "Légende (Unys)",
    "color": "#6f35fc",
    "reward": 5320,
    "power": 0.72,
    "ace": 76,
    "team": [
     [
      635,
      72
     ],
     [
      612,
      73
     ],
     [
      621,
      74
     ],
     [
      634,
      75
     ],
     [
      611,
      76
     ]
    ]
   }
  ]
 },
 {
  "name": "Conseil 4 : Shauntal",
  "reg": "unova",
  "region": "Ligue de Unys",
  "ace": 79,
  "capMargin": 2,
  "league": true,
  "steps": [
   {
    "kind": "heal",
    "name": "Ligue de Unys",
    "bg": "town"
   },
   {
    "kind": "route",
    "name": "Salle du Conseil",
    "bg": "gym-psychic",
    "fallback": "town",
    "wild": 0,
    "trainers": 4
   },
   {
    "kind": "gym",
    "name": "Salle 4",
    "bg": "gym-psychic",
    "fallback": "town",
    "leader": "Shauntal",
    "sprite": "morty",
    "type": "ghost",
    "badge": null,
    "color": "#735797",
    "reward": 7110,
    "power": 1.1,
    "ace": 79,
    "team": [
     [
      609,
      75
     ],
     [
      563,
      76
     ],
     [
      623,
      77
     ],
     [
      593,
      78
     ],
     [
      608,
      79
     ]
    ]
   }
  ]
 },
 {
  "name": "Conseil 4 : Marshall",
  "reg": "unova",
  "region": "Ligue de Unys",
  "ace": 81,
  "capMargin": 2,
  "league": true,
  "steps": [
   {
    "kind": "heal",
    "name": "Ligue de Unys",
    "bg": "town"
   },
   {
    "kind": "route",
    "name": "Salle du Conseil",
    "bg": "gym-psychic",
    "fallback": "town",
    "wild": 0,
    "trainers": 4
   },
   {
    "kind": "gym",
    "name": "Salle 4",
    "bg": "gym-psychic",
    "fallback": "town",
    "leader": "Marshall",
    "sprite": "brawly",
    "type": "fighting",
    "badge": null,
    "color": "#c22e28",
    "reward": 7290,
    "power": 1.2200000000000002,
    "ace": 81,
    "team": [
     [
      500,
      77
     ],
     [
      620,
      78
     ],
     [
      534,
      79
     ],
     [
      560,
      80
     ],
     [
      538,
      81
     ]
    ]
   }
  ]
 },
 {
  "name": "Conseil 4 : Caitlin",
  "reg": "unova",
  "region": "Ligue de Unys",
  "ace": 83,
  "capMargin": 2,
  "league": true,
  "steps": [
   {
    "kind": "heal",
    "name": "Ligue de Unys",
    "bg": "town"
   },
   {
    "kind": "route",
    "name": "Salle du Conseil",
    "bg": "gym-psychic",
    "fallback": "town",
    "wild": 0,
    "trainers": 4
   },
   {
    "kind": "gym",
    "name": "Salle 4",
    "bg": "gym-psychic",
    "fallback": "town",
    "leader": "Caitlin",
    "sprite": "sabrina",
    "type": "psychic",
    "badge": null,
    "color": "#f95587",
    "reward": 7470,
    "power": 1.34,
    "ace": 83,
    "team": [
     [
      561,
      79
     ],
     [
      576,
      80
     ],
     [
      579,
      81
     ],
     [
      518,
      82
     ],
     [
      606,
      83
     ]
    ]
   }
  ]
 },
 {
  "name": "Conseil 4 : Grimsley",
  "reg": "unova",
  "region": "Ligue de Unys",
  "ace": 85,
  "capMargin": 2,
  "league": true,
  "steps": [
   {
    "kind": "heal",
    "name": "Ligue de Unys",
    "bg": "town"
   },
   {
    "kind": "route",
    "name": "Salle du Conseil",
    "bg": "gym-psychic",
    "fallback": "town",
    "wild": 0,
    "trainers": 4
   },
   {
    "kind": "gym",
    "name": "Salle 4",
    "bg": "gym-psychic",
    "fallback": "town",
    "leader": "Grimsley",
    "sprite": "koga",
    "type": "dark",
    "badge": null,
    "color": "#705746",
    "reward": 7650,
    "power": 1.46,
    "ace": 85,
    "team": [
     [
      635,
      81
     ],
     [
      553,
      82
     ],
     [
      571,
      83
     ],
     [
      630,
      84
     ],
     [
      625,
      85
     ]
    ]
   }
  ]
 },
 {
  "name": "Maître de la Ligue",
  "reg": "unova",
  "region": "Ligue de Unys",
  "ace": 88,
  "capMargin": 4,
  "league": true,
  "steps": [
   {
    "kind": "heal",
    "name": "Ligue de Unys",
    "bg": "town"
   },
   {
    "kind": "route",
    "name": "Salle du Maître",
    "bg": "gym-psychic",
    "fallback": "town",
    "wild": 0,
    "trainers": 4
   },
   {
    "kind": "gym",
    "name": "Salle 4",
    "bg": "gym-psychic",
    "fallback": "town",
    "leader": "Goyah",
    "target": 0.5,
    "sprite": "whitney",
    "type": "normal",
    "badge": "Maître",
    "champion": true,
    "color": "#a8a77a",
    "reward": 12320,
    "power": 1.7,
    "ace": 88,
    "team": [
     [
      628,
      83
     ],
     [
      508,
      84
     ],
     [
      626,
      85
     ],
     [
      521,
      86
     ],
     [
      586,
      87
     ],
     [
      573,
      88
     ]
    ]
   }
  ]
 },
 {
  "name": "Insecte · Neuvartault",
  "reg": "kalos",
  "region": "Neuvartault → Route 1 de Kalos",
  "ace": 80,
  "capMargin": 3,
  "steps": [
   {
    "kind": "route",
    "name": "Route 1 de Kalos · 1",
    "bg": "prairie",
    "lv": [
     72,
     76
    ],
    "wild": 4,
    "trainers": 1,
    "item": true,
    "species": [
     650,
     651,
     652,
     653,
     654
    ]
   },
   {
    "kind": "heal",
    "name": "Neuvartault",
    "bg": "pokecenter"
   },
   {
    "kind": "route",
    "name": "Route 1 de Kalos · 2",
    "bg": "cave",
    "lv": [
     74,
     79
    ],
    "wild": 3,
    "trainers": 2,
    "species": [
     655,
     656,
     657,
     658
    ]
   },
   {
    "kind": "gym",
    "name": "Arène de Neuvartault",
    "bg": "town",
    "fallback": "mountain",
    "leader": "Violette",
    "sprite": "bugsy",
    "type": "bug",
    "badge": "Insecte (Kalos)",
    "color": "#a6b91a",
    "reward": 5600,
    "power": 0.3,
    "ace": 80,
    "team": [
     [
      666,
      78
     ],
     [
      665,
      79
     ],
     [
      664,
      80
     ]
    ]
   }
  ]
 },
 {
  "name": "Roche · Relifac-le-Haut",
  "reg": "kalos",
  "region": "Relifac-le-Haut → Route 2 de Kalos",
  "ace": 82,
  "capMargin": 3,
  "steps": [
   {
    "kind": "route",
    "name": "Route 2 de Kalos · 1",
    "bg": "forest",
    "lv": [
     74,
     78
    ],
    "wild": 4,
    "trainers": 1,
    "item": false,
    "species": [
     659,
     660,
     661,
     662
    ]
   },
   {
    "kind": "heal",
    "name": "Relifac-le-Haut",
    "bg": "pokecenter"
   },
   {
    "kind": "route",
    "name": "Route 2 de Kalos · 2",
    "bg": "mountain",
    "lv": [
     76,
     81
    ],
    "wild": 3,
    "trainers": 2,
    "species": [
     663,
     664,
     665,
     666
    ]
   },
   {
    "kind": "gym",
    "name": "Arène de Relifac-le-Haut",
    "bg": "gym-rock",
    "fallback": "mountain",
    "leader": "Grant",
    "sprite": "brock",
    "type": "rock",
    "badge": "Roche (Kalos)",
    "color": "#b6a136",
    "reward": 5740,
    "power": 0.36,
    "ace": 82,
    "team": [
     [
      697,
      80
     ],
     [
      699,
      81
     ],
     [
      689,
      82
     ]
    ]
   }
  ]
 },
 {
  "name": "Poing · Yantreizh",
  "reg": "kalos",
  "region": "Yantreizh → Route 3 de Kalos",
  "ace": 84,
  "capMargin": 3,
  "steps": [
   {
    "kind": "route",
    "name": "Route 3 de Kalos · 1",
    "bg": "cave",
    "lv": [
     76,
     80
    ],
    "wild": 4,
    "trainers": 2,
    "item": true,
    "species": [
     667,
     668,
     669,
     670
    ]
   },
   {
    "kind": "heal",
    "name": "Yantreizh",
    "bg": "pokecenter"
   },
   {
    "kind": "route",
    "name": "Route 3 de Kalos · 2",
    "bg": "beach",
    "lv": [
     78,
     83
    ],
    "wild": 3,
    "trainers": 3,
    "species": [
     671,
     672,
     673,
     674
    ]
   },
   {
    "kind": "gym",
    "name": "Arène de Yantreizh",
    "bg": "town",
    "fallback": "mountain",
    "leader": "Cornélia",
    "sprite": "brawly",
    "type": "fighting",
    "badge": "Poing (Kalos)",
    "color": "#c22e28",
    "reward": 5880,
    "power": 0.42,
    "ace": 84,
    "team": [
     [
      652,
      82
     ],
     [
      701,
      83
     ],
     [
      675,
      84
     ]
    ]
   }
  ]
 },
 {
  "name": "Plante · Flusselles",
  "reg": "kalos",
  "region": "Flusselles → Route 4 de Kalos",
  "ace": 86,
  "capMargin": 3,
  "steps": [
   {
    "kind": "route",
    "name": "Route 4 de Kalos · 1",
    "bg": "mountain",
    "lv": [
     78,
     82
    ],
    "wild": 4,
    "trainers": 2,
    "item": false,
    "species": [
     675,
     676,
     677,
     678
    ]
   },
   {
    "kind": "heal",
    "name": "Flusselles",
    "bg": "pokecenter"
   },
   {
    "kind": "route",
    "name": "Route 4 de Kalos · 2",
    "bg": "pier",
    "lv": [
     80,
     85
    ],
    "wild": 3,
    "trainers": 3,
    "species": [
     679,
     680,
     681,
     682
    ]
   },
   {
    "kind": "gym",
    "name": "Arène de Flusselles",
    "bg": "gym-grass",
    "fallback": "mountain",
    "leader": "Amaro",
    "sprite": "erika",
    "type": "grass",
    "badge": "Plante (Kalos)",
    "color": "#7ac74c",
    "reward": 6020,
    "power": 0.48,
    "ace": 86,
    "team": [
     [
      673,
      83
     ],
     [
      652,
      84
     ],
     [
      711,
      85
     ],
     [
      709,
      86
     ]
    ]
   }
  ]
 },
 {
  "name": "Tension · Illumis",
  "reg": "kalos",
  "region": "Illumis → Route 5 de Kalos",
  "ace": 88,
  "capMargin": 3,
  "steps": [
   {
    "kind": "route",
    "name": "Route 5 de Kalos · 1",
    "bg": "beach",
    "lv": [
     80,
     84
    ],
    "wild": 4,
    "trainers": 2,
    "item": true,
    "species": [
     683,
     684,
     685,
     686,
     687
    ]
   },
   {
    "kind": "heal",
    "name": "Illumis",
    "bg": "pokecenter"
   },
   {
    "kind": "route",
    "name": "Route 5 de Kalos · 2",
    "bg": "lake",
    "lv": [
     82,
     87
    ],
    "wild": 3,
    "trainers": 3,
    "species": [
     688,
     689,
     690,
     691
    ]
   },
   {
    "kind": "gym",
    "name": "Arène de Illumis",
    "bg": "gym-electric",
    "fallback": "mountain",
    "leader": "Lem",
    "sprite": "ltsurge",
    "type": "electric",
    "badge": "Tension (Kalos)",
    "color": "#f7d02c",
    "reward": 6160,
    "power": 0.54,
    "ace": 88,
    "team": [
     [
      695,
      85
     ],
     [
      702,
      86
     ],
     [
      694,
      87
     ],
     [
      659,
      88
     ]
    ]
   }
  ]
 },
 {
  "name": "Fée · Romantica",
  "reg": "kalos",
  "region": "Romantica → Route 6 de Kalos",
  "ace": 90,
  "capMargin": 3,
  "steps": [
   {
    "kind": "route",
    "name": "Route 6 de Kalos · 1",
    "bg": "pier",
    "lv": [
     82,
     86
    ],
    "wild": 4,
    "trainers": 2,
    "item": false,
    "species": [
     692,
     693,
     694,
     695
    ]
   },
   {
    "kind": "heal",
    "name": "Romantica",
    "bg": "pokecenter"
   },
   {
    "kind": "route",
    "name": "Route 6 de Kalos · 2",
    "bg": "sea",
    "lv": [
     84,
     89
    ],
    "wild": 3,
    "trainers": 3,
    "species": [
     696,
     697,
     698,
     699
    ]
   },
   {
    "kind": "gym",
    "name": "Arène de Romantica",
    "bg": "town",
    "fallback": "mountain",
    "leader": "Valériane",
    "sprite": "erika",
    "type": "fairy",
    "badge": "Fée (Kalos)",
    "color": "#d685ad",
    "reward": 6300,
    "power": 0.6,
    "ace": 90,
    "team": [
     [
      671,
      87
     ],
     [
      700,
      88
     ],
     [
      703,
      89
     ],
     [
      685,
      90
     ]
    ]
   }
  ]
 },
 {
  "name": "Psychisme · Flusselles",
  "reg": "kalos",
  "region": "Flusselles → Route 7 de Kalos",
  "ace": 92,
  "capMargin": 3,
  "steps": [
   {
    "kind": "route",
    "name": "Route 7 de Kalos · 1",
    "bg": "lake",
    "lv": [
     84,
     88
    ],
    "wild": 4,
    "trainers": 2,
    "item": true,
    "species": [
     700,
     701,
     702,
     703
    ]
   },
   {
    "kind": "heal",
    "name": "Flusselles",
    "bg": "pokecenter"
   },
   {
    "kind": "route",
    "name": "Route 7 de Kalos · 2",
    "bg": "town",
    "lv": [
     86,
     91
    ],
    "wild": 3,
    "trainers": 3,
    "species": [
     704,
     705,
     706,
     707
    ]
   },
   {
    "kind": "gym",
    "name": "Arène de Flusselles",
    "bg": "gym-psychic",
    "fallback": "mountain",
    "leader": "Olympia",
    "sprite": "sabrina",
    "type": "psychic",
    "badge": "Psychisme (Kalos)",
    "color": "#f95587",
    "reward": 6440,
    "power": 0.6599999999999999,
    "ace": 92,
    "team": [
     [
      655,
      88
     ],
     [
      687,
      89
     ],
     [
      678,
      90
     ],
     [
      677,
      91
     ],
     [
      686,
      92
     ]
    ]
   }
  ]
 },
 {
  "name": "Iceberg · Mozheim",
  "reg": "kalos",
  "region": "Mozheim → Route 8 de Kalos",
  "ace": 94,
  "capMargin": 3,
  "steps": [
   {
    "kind": "route",
    "name": "Route 8 de Kalos · 1",
    "bg": "sea",
    "lv": [
     86,
     90
    ],
    "wild": 4,
    "trainers": 2,
    "item": false,
    "species": [
     708,
     709,
     710,
     711,
     717,
     719,
     721
    ]
   },
   {
    "kind": "heal",
    "name": "Mozheim",
    "bg": "pokecenter"
   },
   {
    "kind": "route",
    "name": "Route 8 de Kalos · 2",
    "bg": "prairie",
    "lv": [
     88,
     93
    ],
    "wild": 3,
    "trainers": 3,
    "species": [
     712,
     713,
     714,
     715,
     716,
     718,
     720
    ]
   },
   {
    "kind": "gym",
    "name": "Arène de Mozheim",
    "bg": "town",
    "fallback": "mountain",
    "leader": "Urup",
    "sprite": "pryce",
    "type": "ice",
    "badge": "Iceberg (Kalos)",
    "color": "#96d9d6",
    "reward": 6580,
    "power": 0.72,
    "ace": 94,
    "team": [
     [
      699,
      90
     ],
     [
      713,
      91
     ],
     [
      698,
      92
     ],
     [
      712,
      93
     ],
     [
      659,
      94
     ]
    ]
   }
  ]
 },
 {
  "name": "Conseil 4 : Malva",
  "reg": "kalos",
  "region": "Ligue de Kalos",
  "ace": 95,
  "capMargin": 2,
  "league": true,
  "steps": [
   {
    "kind": "heal",
    "name": "Ligue de Kalos",
    "bg": "town"
   },
   {
    "kind": "route",
    "name": "Salle du Conseil",
    "bg": "gym-psychic",
    "fallback": "town",
    "wild": 0,
    "trainers": 4
   },
   {
    "kind": "gym",
    "name": "Salle 4",
    "bg": "gym-fire",
    "fallback": "town",
    "leader": "Malva",
    "sprite": "blaine",
    "type": "fire",
    "badge": null,
    "color": "#ee8130",
    "reward": 8550,
    "power": 1.1,
    "ace": 95,
    "team": [
     [
      655,
      91
     ],
     [
      668,
      92
     ],
     [
      663,
      93
     ],
     [
      654,
      94
     ],
     [
      662,
      95
     ]
    ]
   }
  ]
 },
 {
  "name": "Conseil 4 : Siebold",
  "reg": "kalos",
  "region": "Ligue de Kalos",
  "ace": 96,
  "capMargin": 2,
  "league": true,
  "steps": [
   {
    "kind": "heal",
    "name": "Ligue de Kalos",
    "bg": "town"
   },
   {
    "kind": "route",
    "name": "Salle du Conseil",
    "bg": "gym-psychic",
    "fallback": "town",
    "wild": 0,
    "trainers": 4
   },
   {
    "kind": "gym",
    "name": "Salle 4",
    "bg": "gym-water",
    "fallback": "town",
    "leader": "Siebold",
    "sprite": "misty",
    "type": "water",
    "badge": null,
    "color": "#6390f0",
    "reward": 8640,
    "power": 1.2200000000000002,
    "ace": 96,
    "team": [
     [
      658,
      92
     ],
     [
      689,
      93
     ],
     [
      693,
      94
     ],
     [
      657,
      95
     ],
     [
      692,
      96
     ]
    ]
   }
  ]
 },
 {
  "name": "Conseil 4 : Wikstrom",
  "reg": "kalos",
  "region": "Ligue de Kalos",
  "ace": 97,
  "capMargin": 2,
  "league": true,
  "steps": [
   {
    "kind": "heal",
    "name": "Ligue de Kalos",
    "bg": "town"
   },
   {
    "kind": "route",
    "name": "Salle du Conseil",
    "bg": "gym-psychic",
    "fallback": "town",
    "wild": 0,
    "trainers": 4
   },
   {
    "kind": "gym",
    "name": "Salle 4",
    "bg": "gym-psychic",
    "fallback": "town",
    "leader": "Wikstrom",
    "sprite": "byron",
    "type": "steel",
    "badge": null,
    "color": "#b7b7ce",
    "reward": 8730,
    "power": 1.34,
    "ace": 97,
    "team": [
     [
      681,
      93
     ],
     [
      707,
      94
     ],
     [
      680,
      95
     ],
     [
      679,
      96
     ],
     [
      659,
      97
     ]
    ]
   }
  ]
 },
 {
  "name": "Conseil 4 : Drasna",
  "reg": "kalos",
  "region": "Ligue de Kalos",
  "ace": 98,
  "capMargin": 2,
  "league": true,
  "steps": [
   {
    "kind": "heal",
    "name": "Ligue de Kalos",
    "bg": "town"
   },
   {
    "kind": "route",
    "name": "Salle du Conseil",
    "bg": "gym-psychic",
    "fallback": "town",
    "wild": 0,
    "trainers": 4
   },
   {
    "kind": "gym",
    "name": "Salle 4",
    "bg": "gym-psychic",
    "fallback": "town",
    "leader": "Drasna",
    "sprite": "clair",
    "type": "dragon",
    "badge": null,
    "color": "#6f35fc",
    "reward": 8820,
    "power": 1.46,
    "ace": 98,
    "team": [
     [
      706,
      94
     ],
     [
      715,
      95
     ],
     [
      697,
      96
     ],
     [
      691,
      97
     ],
     [
      705,
      98
     ]
    ]
   }
  ]
 },
 {
  "name": "Maître de la Ligue",
  "reg": "kalos",
  "region": "Ligue de Kalos",
  "ace": 99,
  "capMargin": 1,
  "league": true,
  "steps": [
   {
    "kind": "heal",
    "name": "Ligue de Kalos",
    "bg": "town"
   },
   {
    "kind": "route",
    "name": "Salle du Maître",
    "bg": "gym-psychic",
    "fallback": "town",
    "wild": 0,
    "trainers": 4
   },
   {
    "kind": "gym",
    "name": "Salle 4",
    "bg": "gym-psychic",
    "fallback": "town",
    "leader": "Dianthéa",
    "target": 0.5,
    "sprite": "erika",
    "type": "fairy",
    "badge": "Maître",
    "champion": true,
    "color": "#d685ad",
    "reward": 13860,
    "power": 1.7,
    "ace": 99,
    "team": [
     [
      671,
      94
     ],
     [
      700,
      95
     ],
     [
      703,
      96
     ],
     [
      685,
      97
     ],
     [
      707,
      98
     ],
     [
      683,
      99
     ]
    ]
   }
  ]
 },
 {
  "name": "Verdant · Lili'i",
  "reg": "alola",
  "region": "Lili'i → Route 1 d'Alola",
  "ace": 95,
  "capMargin": 3,
  "steps": [
   {
    "kind": "route",
    "name": "Route 1 d'Alola · 1",
    "bg": "prairie",
    "lv": [
     87,
     91
    ],
    "wild": 4,
    "trainers": 1,
    "item": true,
    "species": [
     722,
     723,
     724,
     725,
     726,
     19001,
     20001,
     26001,
     27001,
     28001,
     37001,
     38001,
     50001,
     51001,
     52001,
     53001,
     74001,
     75001,
     76001,
     88001,
     89001,
     103001,
     105001
    ]
   },
   {
    "kind": "heal",
    "name": "Lili'i",
    "bg": "pokecenter"
   },
   {
    "kind": "route",
    "name": "Route 1 d'Alola · 2",
    "bg": "cave",
    "lv": [
     89,
     94
    ],
    "wild": 3,
    "trainers": 2,
    "species": [
     727,
     728,
     729,
     730
    ]
   },
   {
    "kind": "gym",
    "name": "Arène de Lili'i",
    "bg": "town",
    "fallback": "mountain",
    "leader": "Ilima",
    "sprite": "whitney",
    "type": "normal",
    "badge": "Verdant (Alola)",
    "color": "#a8a77a",
    "reward": 6650,
    "power": 0.3,
    "ace": 95,
    "team": [
     [
      760,
      93
     ],
     [
      765,
      94
     ],
     [
      733,
      95
     ]
    ]
   }
  ]
 },
 {
  "name": "Lush · Lush Jungle",
  "reg": "alola",
  "region": "Lush Jungle → Route 2 d'Alola",
  "ace": 96,
  "capMargin": 3,
  "steps": [
   {
    "kind": "route",
    "name": "Route 2 d'Alola · 1",
    "bg": "forest",
    "lv": [
     88,
     92
    ],
    "wild": 4,
    "trainers": 1,
    "item": false,
    "species": [
     731,
     732,
     733,
     734,
     735
    ]
   },
   {
    "kind": "heal",
    "name": "Lush Jungle",
    "bg": "pokecenter"
   },
   {
    "kind": "route",
    "name": "Route 2 d'Alola · 2",
    "bg": "mountain",
    "lv": [
     90,
     95
    ],
    "wild": 3,
    "trainers": 2,
    "species": [
     736,
     737,
     738,
     739
    ]
   },
   {
    "kind": "gym",
    "name": "Arène de Lush Jungle",
    "bg": "gym-grass",
    "fallback": "mountain",
    "leader": "Barbara",
    "sprite": "erika",
    "type": "grass",
    "badge": "Lush (Alola)",
    "color": "#7ac74c",
    "reward": 6720,
    "power": 0.36,
    "ace": 96,
    "team": [
     [
      798,
      94
     ],
     [
      724,
      95
     ],
     [
      781,
      96
     ]
    ]
   }
  ]
 },
 {
  "name": "Wela · Wela Volcano",
  "reg": "alola",
  "region": "Wela Volcano → Route 3 d'Alola",
  "ace": 97,
  "capMargin": 3,
  "steps": [
   {
    "kind": "route",
    "name": "Route 3 d'Alola · 1",
    "bg": "cave",
    "lv": [
     89,
     93
    ],
    "wild": 4,
    "trainers": 2,
    "item": true,
    "species": [
     740,
     741,
     742,
     743,
     744
    ]
   },
   {
    "kind": "heal",
    "name": "Wela Volcano",
    "bg": "pokecenter"
   },
   {
    "kind": "route",
    "name": "Route 3 d'Alola · 2",
    "bg": "beach",
    "lv": [
     91,
     96
    ],
    "wild": 3,
    "trainers": 3,
    "species": [
     745,
     746,
     747,
     748
    ]
   },
   {
    "kind": "gym",
    "name": "Arène de Wela Volcano",
    "bg": "gym-fire",
    "fallback": "mountain",
    "leader": "Kiawe",
    "sprite": "blaine",
    "type": "fire",
    "badge": "Wela (Alola)",
    "color": "#ee8130",
    "reward": 6790,
    "power": 0.42,
    "ace": 97,
    "team": [
     [
      806,
      95
     ],
     [
      727,
      96
     ],
     [
      776,
      97
     ]
    ]
   }
  ]
 },
 {
  "name": "Brooklet · Brooklet Hill",
  "reg": "alola",
  "region": "Brooklet Hill → Route 4 d'Alola",
  "ace": 98,
  "capMargin": 2,
  "steps": [
   {
    "kind": "route",
    "name": "Route 4 d'Alola · 1",
    "bg": "mountain",
    "lv": [
     90,
     94
    ],
    "wild": 4,
    "trainers": 2,
    "item": false,
    "species": [
     749,
     750,
     751,
     752,
     753
    ]
   },
   {
    "kind": "heal",
    "name": "Brooklet Hill",
    "bg": "pokecenter"
   },
   {
    "kind": "route",
    "name": "Route 4 d'Alola · 2",
    "bg": "pier",
    "lv": [
     92,
     97
    ],
    "wild": 3,
    "trainers": 3,
    "species": [
     754,
     755,
     756,
     757
    ]
   },
   {
    "kind": "gym",
    "name": "Arène de Brooklet Hill",
    "bg": "gym-water",
    "fallback": "sea",
    "leader": "Néphie",
    "sprite": "misty",
    "type": "water",
    "badge": "Brooklet (Alola)",
    "color": "#6390f0",
    "reward": 6860,
    "power": 0.48,
    "ace": 98,
    "team": [
     [
      730,
      95
     ],
     [
      768,
      96
     ],
     [
      748,
      97
     ],
     [
      779,
      98
     ]
    ]
   }
  ]
 },
 {
  "name": "Hokulani · Hokulani",
  "reg": "alola",
  "region": "Hokulani → Route 5 d'Alola",
  "ace": 99,
  "capMargin": 1,
  "steps": [
   {
    "kind": "route",
    "name": "Route 5 d'Alola · 1",
    "bg": "beach",
    "lv": [
     91,
     95
    ],
    "wild": 4,
    "trainers": 2,
    "item": true,
    "species": [
     758,
     759,
     760,
     761,
     762
    ]
   },
   {
    "kind": "heal",
    "name": "Hokulani",
    "bg": "pokecenter"
   },
   {
    "kind": "route",
    "name": "Route 5 d'Alola · 2",
    "bg": "lake",
    "lv": [
     93,
     98
    ],
    "wild": 3,
    "trainers": 3,
    "species": [
     763,
     764,
     765,
     766
    ]
   },
   {
    "kind": "gym",
    "name": "Arène de Hokulani",
    "bg": "gym-electric",
    "fallback": "mountain",
    "leader": "Chrys",
    "sprite": "ltsurge",
    "type": "electric",
    "badge": "Hokulani (Alola)",
    "color": "#f7d02c",
    "reward": 6930,
    "power": 0.54,
    "ace": 99,
    "team": [
     [
      796,
      96
     ],
     [
      738,
      97
     ],
     [
      777,
      98
     ],
     [
      737,
      99
     ]
    ]
   }
  ]
 },
 {
  "name": "Thrifty · Thrifty Megamart",
  "reg": "alola",
  "region": "Thrifty Megamart → Route 6 d'Alola",
  "ace": 99,
  "capMargin": 1,
  "steps": [
   {
    "kind": "route",
    "name": "Route 6 d'Alola · 1",
    "bg": "pier",
    "lv": [
     91,
     95
    ],
    "wild": 4,
    "trainers": 2,
    "item": false,
    "species": [
     767,
     768,
     769,
     770,
     771
    ]
   },
   {
    "kind": "heal",
    "name": "Thrifty Megamart",
    "bg": "pokecenter"
   },
   {
    "kind": "route",
    "name": "Route 6 d'Alola · 2",
    "bg": "sea",
    "lv": [
     93,
     98
    ],
    "wild": 3,
    "trainers": 3,
    "species": [
     774,
     775,
     776,
     777
    ]
   },
   {
    "kind": "gym",
    "name": "Arène de Thrifty Megamart",
    "bg": "town",
    "fallback": "mountain",
    "leader": "Margie",
    "sprite": "morty",
    "type": "ghost",
    "badge": "Thrifty (Alola)",
    "color": "#735797",
    "reward": 6930,
    "power": 0.6,
    "ace": 99,
    "team": [
     [
      806,
      96
     ],
     [
      724,
      97
     ],
     [
      781,
      98
     ],
     [
      770,
      99
     ]
    ]
   }
  ]
 },
 {
  "name": "Poni · Poni",
  "reg": "alola",
  "region": "Poni → Route 7 d'Alola",
  "ace": 100,
  "capMargin": 0,
  "steps": [
   {
    "kind": "route",
    "name": "Route 7 d'Alola · 1",
    "bg": "lake",
    "lv": [
     92,
     96
    ],
    "wild": 4,
    "trainers": 2,
    "item": true,
    "species": [
     778,
     779,
     780,
     781,
     782
    ]
   },
   {
    "kind": "heal",
    "name": "Poni",
    "bg": "pokecenter"
   },
   {
    "kind": "route",
    "name": "Route 7 d'Alola · 2",
    "bg": "town",
    "lv": [
     94,
     99
    ],
    "wild": 3,
    "trainers": 3,
    "species": [
     783,
     784,
     793,
     794
    ]
   },
   {
    "kind": "gym",
    "name": "Arène de Poni",
    "bg": "town",
    "fallback": "mountain",
    "leader": "Mina",
    "sprite": "erika",
    "type": "fairy",
    "badge": "Poni (Alola)",
    "color": "#d685ad",
    "reward": 7000,
    "power": 0.6599999999999999,
    "ace": 100,
    "team": [
     [
      730,
      96
     ],
     [
      764,
      97
     ],
     [
      778,
      98
     ],
     [
      743,
      99
     ],
     [
      756,
      100
     ]
    ]
   }
  ]
 },
 {
  "name": "Vast · Vast Poni Canyon",
  "reg": "alola",
  "region": "Vast Poni Canyon → Route 8 d'Alola",
  "ace": 100,
  "capMargin": 0,
  "steps": [
   {
    "kind": "route",
    "name": "Route 8 d'Alola · 1",
    "bg": "sea",
    "lv": [
     92,
     96
    ],
    "wild": 4,
    "trainers": 2,
    "item": false,
    "species": [
     795,
     796,
     797,
     798,
     799,
     773,
     786,
     788,
     790,
     792,
     801,
     807,
     809
    ]
   },
   {
    "kind": "heal",
    "name": "Vast Poni Canyon",
    "bg": "pokecenter"
   },
   {
    "kind": "route",
    "name": "Route 8 d'Alola · 2",
    "bg": "prairie",
    "lv": [
     94,
     99
    ],
    "wild": 3,
    "trainers": 3,
    "species": [
     803,
     804,
     805,
     806,
     772,
     785,
     787,
     789,
     791,
     800,
     802,
     808
    ]
   },
   {
    "kind": "gym",
    "name": "Arène de Vast Poni Canyon",
    "bg": "gym-ground",
    "fallback": "mountain",
    "leader": "Hapu",
    "sprite": "giovanni",
    "type": "ground",
    "badge": "Vast (Alola)",
    "color": "#e2bf65",
    "reward": 7000,
    "power": 0.72,
    "ace": 100,
    "team": [
     [
      750,
      96
     ],
     [
      770,
      97
     ],
     [
      749,
      98
     ],
     [
      769,
      99
     ],
     [
      731,
      100
     ]
    ]
   }
  ]
 },
 {
  "name": "Conseil 4 : Hala",
  "reg": "alola",
  "region": "Ligue de Alola",
  "ace": 100,
  "capMargin": 0,
  "league": true,
  "steps": [
   {
    "kind": "heal",
    "name": "Ligue de Alola",
    "bg": "town"
   },
   {
    "kind": "route",
    "name": "Salle du Conseil",
    "bg": "gym-psychic",
    "fallback": "town",
    "wild": 0,
    "trainers": 4
   },
   {
    "kind": "gym",
    "name": "Salle 4",
    "bg": "gym-psychic",
    "fallback": "town",
    "leader": "Hala",
    "sprite": "brawly",
    "type": "fighting",
    "badge": null,
    "color": "#c22e28",
    "reward": 9000,
    "power": 1.1,
    "ace": 100,
    "team": [
     [
      784,
      96
     ],
     [
      794,
      97
     ],
     [
      795,
      98
     ],
     [
      760,
      99
     ],
     [
      766,
      100
     ]
    ]
   }
  ]
 },
 {
  "name": "Conseil 4 : Olivia",
  "reg": "alola",
  "region": "Ligue de Alola",
  "ace": 100,
  "capMargin": 0,
  "league": true,
  "steps": [
   {
    "kind": "heal",
    "name": "Ligue de Alola",
    "bg": "town"
   },
   {
    "kind": "route",
    "name": "Salle du Conseil",
    "bg": "gym-psychic",
    "fallback": "town",
    "wild": 0,
    "trainers": 4
   },
   {
    "kind": "gym",
    "name": "Salle 4",
    "bg": "gym-rock",
    "fallback": "town",
    "leader": "Olivia",
    "sprite": "brock",
    "type": "rock",
    "badge": null,
    "color": "#b6a136",
    "reward": 9000,
    "power": 1.2200000000000002,
    "ace": 100,
    "team": [
     [
      793,
      96
     ],
     [
      805,
      97
     ],
     [
      745,
      98
     ],
     [
      774,
      99
     ],
     [
      744,
      100
     ]
    ]
   }
  ]
 },
 {
  "name": "Conseil 4 : Molayne",
  "reg": "alola",
  "region": "Ligue de Alola",
  "ace": 100,
  "capMargin": 0,
  "league": true,
  "steps": [
   {
    "kind": "heal",
    "name": "Ligue de Alola",
    "bg": "town"
   },
   {
    "kind": "route",
    "name": "Salle du Conseil",
    "bg": "gym-psychic",
    "fallback": "town",
    "wild": 0,
    "trainers": 4
   },
   {
    "kind": "gym",
    "name": "Salle 4",
    "bg": "gym-psychic",
    "fallback": "town",
    "leader": "Molayne",
    "sprite": "byron",
    "type": "steel",
    "badge": null,
    "color": "#b7b7ce",
    "reward": 9000,
    "power": 1.34,
    "ace": 100,
    "team": [
     [
      797,
      96
     ],
     [
      798,
      97
     ],
     [
      805,
      98
     ],
     [
      777,
      99
     ],
     [
      731,
      100
     ]
    ]
   }
  ]
 },
 {
  "name": "Conseil 4 : Kahili",
  "reg": "alola",
  "region": "Ligue de Alola",
  "ace": 100,
  "capMargin": 0,
  "league": true,
  "steps": [
   {
    "kind": "heal",
    "name": "Ligue de Alola",
    "bg": "town"
   },
   {
    "kind": "route",
    "name": "Salle du Conseil",
    "bg": "gym-psychic",
    "fallback": "town",
    "wild": 0,
    "trainers": 4
   },
   {
    "kind": "gym",
    "name": "Salle 4",
    "bg": "gym-psychic",
    "fallback": "town",
    "leader": "Kahili",
    "sprite": "falkner",
    "type": "flying",
    "badge": null,
    "color": "#a98ff3",
    "reward": 9000,
    "power": 1.46,
    "ace": 100,
    "team": [
     [
      797,
      96
     ],
     [
      733,
      97
     ],
     [
      741,
      98
     ],
     [
      774,
      99
     ],
     [
      723,
      100
     ]
    ]
   }
  ]
 },
 {
  "name": "Maître de la Ligue",
  "reg": "alola",
  "region": "Ligue de Alola",
  "ace": 100,
  "capMargin": 0,
  "league": true,
  "steps": [
   {
    "kind": "heal",
    "name": "Ligue de Alola",
    "bg": "town"
   },
   {
    "kind": "route",
    "name": "Salle du Maître",
    "bg": "gym-psychic",
    "fallback": "town",
    "wild": 0,
    "trainers": 4
   },
   {
    "kind": "gym",
    "name": "Salle 4",
    "bg": "gym-psychic",
    "fallback": "town",
    "leader": "Kukui",
    "target": 0.5,
    "sprite": "whitney",
    "type": "normal",
    "badge": "Maître",
    "champion": true,
    "color": "#a8a77a",
    "reward": 14000,
    "power": 1.7,
    "ace": 100,
    "team": [
     [
      760,
      95
     ],
     [
      765,
      96
     ],
     [
      733,
      97
     ],
     [
      780,
      98
     ],
     [
      775,
      99
     ],
     [
      735,
      100
     ]
    ]
   }
  ]
 },
 {
  "name": "Herbe · Kickenham",
  "reg": "galar",
  "region": "Kickenham → Route 1 de Galar",
  "ace": 96,
  "capMargin": 3,
  "steps": [
   {
    "kind": "route",
    "name": "Route 1 de Galar · 1",
    "bg": "prairie",
    "lv": [
     88,
     92
    ],
    "wild": 4,
    "trainers": 1,
    "item": true,
    "species": [
     810,
     811,
     812,
     813,
     814,
     815,
     52002,
     58001,
     59001,
     77001,
     78001,
     79001,
     80001,
     83001,
     100001,
     101001,
     110001,
     122001,
     144001,
     145001,
     146001,
     157001,
     199001,
     211001,
     215001,
     222001,
     263001,
     264001,
     503001,
     549001,
     554001,
     555001,
     562001,
     570001,
     571001,
     618001,
     628001,
     705001,
     706001,
     713001,
     724001
    ]
   },
   {
    "kind": "heal",
    "name": "Kickenham",
    "bg": "pokecenter"
   },
   {
    "kind": "route",
    "name": "Route 1 de Galar · 2",
    "bg": "cave",
    "lv": [
     90,
     95
    ],
    "wild": 3,
    "trainers": 2,
    "species": [
     816,
     817,
     818,
     819,
     820
    ]
   },
   {
    "kind": "gym",
    "name": "Arène de Kickenham",
    "bg": "gym-grass",
    "fallback": "mountain",
    "leader": "Milo",
    "sprite": "erika",
    "type": "grass",
    "badge": "Herbe (Galar)",
    "color": "#7ac74c",
    "reward": 6720,
    "power": 0.3,
    "ace": 96,
    "team": [
     [
      812,
      94
     ],
     [
      841,
      95
     ],
     [
      842,
      96
     ]
    ]
   }
  ]
 },
 {
  "name": "Eau · Motorby",
  "reg": "galar",
  "region": "Motorby → Route 2 de Galar",
  "ace": 97,
  "capMargin": 3,
  "steps": [
   {
    "kind": "route",
    "name": "Route 2 de Galar · 1",
    "bg": "forest",
    "lv": [
     89,
     93
    ],
    "wild": 4,
    "trainers": 1,
    "item": false,
    "species": [
     821,
     822,
     823,
     824,
     825
    ]
   },
   {
    "kind": "heal",
    "name": "Motorby",
    "bg": "pokecenter"
   },
   {
    "kind": "route",
    "name": "Route 2 de Galar · 2",
    "bg": "mountain",
    "lv": [
     91,
     96
    ],
    "wild": 3,
    "trainers": 2,
    "species": [
     826,
     827,
     828,
     829,
     830
    ]
   },
   {
    "kind": "gym",
    "name": "Arène de Motorby",
    "bg": "gym-water",
    "fallback": "sea",
    "leader": "Donna",
    "sprite": "misty",
    "type": "water",
    "badge": "Eau (Galar)",
    "color": "#6390f0",
    "reward": 6790,
    "power": 0.36,
    "ace": 97,
    "team": [
     [
      818,
      95
     ],
     [
      902,
      96
     ],
     [
      882,
      97
     ]
    ]
   }
  ]
 },
 {
  "name": "Feu · Aiguilles",
  "reg": "galar",
  "region": "Aiguilles → Route 3 de Galar",
  "ace": 98,
  "capMargin": 2,
  "steps": [
   {
    "kind": "route",
    "name": "Route 3 de Galar · 1",
    "bg": "cave",
    "lv": [
     90,
     94
    ],
    "wild": 4,
    "trainers": 2,
    "item": true,
    "species": [
     831,
     832,
     833,
     834,
     835,
     836
    ]
   },
   {
    "kind": "heal",
    "name": "Aiguilles",
    "bg": "pokecenter"
   },
   {
    "kind": "route",
    "name": "Route 3 de Galar · 2",
    "bg": "beach",
    "lv": [
     92,
     97
    ],
    "wild": 3,
    "trainers": 3,
    "species": [
     837,
     838,
     839,
     840,
     841
    ]
   },
   {
    "kind": "gym",
    "name": "Arène de Aiguilles",
    "bg": "gym-fire",
    "fallback": "mountain",
    "leader": "Kabu",
    "sprite": "blaine",
    "type": "fire",
    "badge": "Feu (Galar)",
    "color": "#ee8130",
    "reward": 6860,
    "power": 0.42,
    "ace": 98,
    "team": [
     [
      815,
      96
     ],
     [
      851,
      97
     ],
     [
      839,
      98
     ]
    ]
   }
  ]
 },
 {
  "name": "Combat · Chavamure",
  "reg": "galar",
  "region": "Chavamure → Route 4 de Galar",
  "ace": 99,
  "capMargin": 1,
  "steps": [
   {
    "kind": "route",
    "name": "Route 4 de Galar · 1",
    "bg": "mountain",
    "lv": [
     91,
     95
    ],
    "wild": 4,
    "trainers": 2,
    "item": false,
    "species": [
     842,
     843,
     844,
     845,
     846
    ]
   },
   {
    "kind": "heal",
    "name": "Chavamure",
    "bg": "pokecenter"
   },
   {
    "kind": "route",
    "name": "Route 4 de Galar · 2",
    "bg": "pier",
    "lv": [
     93,
     98
    ],
    "wild": 3,
    "trainers": 3,
    "species": [
     847,
     848,
     849,
     850,
     851
    ]
   },
   {
    "kind": "gym",
    "name": "Arène de Chavamure",
    "bg": "town",
    "fallback": "mountain",
    "leader": "Faïza",
    "sprite": "brawly",
    "type": "fighting",
    "badge": "Combat (Galar)",
    "color": "#c22e28",
    "reward": 6930,
    "power": 0.48,
    "ace": 99,
    "team": [
     [
      903,
      96
     ],
     [
      865,
      97
     ],
     [
      853,
      98
     ],
     [
      870,
      99
     ]
    ]
   }
  ]
 },
 {
  "name": "Fée · Aliville",
  "reg": "galar",
  "region": "Aliville → Route 5 de Galar",
  "ace": 100,
  "capMargin": 0,
  "steps": [
   {
    "kind": "route",
    "name": "Route 5 de Galar · 1",
    "bg": "beach",
    "lv": [
     92,
     96
    ],
    "wild": 4,
    "trainers": 2,
    "item": true,
    "species": [
     852,
     853,
     854,
     855,
     856,
     857
    ]
   },
   {
    "kind": "heal",
    "name": "Aliville",
    "bg": "pokecenter"
   },
   {
    "kind": "route",
    "name": "Route 5 de Galar · 2",
    "bg": "lake",
    "lv": [
     94,
     99
    ],
    "wild": 3,
    "trainers": 3,
    "species": [
     858,
     859,
     860,
     861,
     862
    ]
   },
   {
    "kind": "gym",
    "name": "Arène de Aliville",
    "bg": "town",
    "fallback": "mountain",
    "leader": "Opal",
    "sprite": "erika",
    "type": "fairy",
    "badge": "Fée (Galar)",
    "color": "#d685ad",
    "reward": 7000,
    "power": 0.54,
    "ace": 100,
    "team": [
     [
      858,
      97
     ],
     [
      861,
      98
     ],
     [
      869,
      99
     ],
     [
      860,
      100
     ]
    ]
   }
  ]
 },
 {
  "name": "Roche · Chamboul",
  "reg": "galar",
  "region": "Chamboul → Route 6 de Galar",
  "ace": 100,
  "capMargin": 0,
  "steps": [
   {
    "kind": "route",
    "name": "Route 6 de Galar · 1",
    "bg": "pier",
    "lv": [
     92,
     96
    ],
    "wild": 4,
    "trainers": 2,
    "item": false,
    "species": [
     863,
     864,
     865,
     866,
     867
    ]
   },
   {
    "kind": "heal",
    "name": "Chamboul",
    "bg": "pokecenter"
   },
   {
    "kind": "route",
    "name": "Route 6 de Galar · 2",
    "bg": "sea",
    "lv": [
     94,
     99
    ],
    "wild": 3,
    "trainers": 3,
    "species": [
     868,
     869,
     870,
     871,
     872
    ]
   },
   {
    "kind": "gym",
    "name": "Arène de Chamboul",
    "bg": "gym-rock",
    "fallback": "mountain",
    "leader": "Chaz",
    "sprite": "brock",
    "type": "rock",
    "badge": "Roche (Galar)",
    "color": "#b6a136",
    "reward": 7000,
    "power": 0.6,
    "ace": 100,
    "team": [
     [
      839,
      97
     ],
     [
      900,
      98
     ],
     [
      834,
      99
     ],
     [
      874,
      100
     ]
    ]
   }
  ]
 },
 {
  "name": "Ténèbres · Pitrouille",
  "reg": "galar",
  "region": "Pitrouille → Route 7 de Galar",
  "ace": 100,
  "capMargin": 0,
  "steps": [
   {
    "kind": "route",
    "name": "Route 7 de Galar · 1",
    "bg": "lake",
    "lv": [
     92,
     96
    ],
    "wild": 4,
    "trainers": 2,
    "item": true,
    "species": [
     873,
     874,
     875,
     876,
     877,
     878
    ]
   },
   {
    "kind": "heal",
    "name": "Pitrouille",
    "bg": "pokecenter"
   },
   {
    "kind": "route",
    "name": "Route 7 de Galar · 2",
    "bg": "town",
    "lv": [
     94,
     99
    ],
    "wild": 3,
    "trainers": 3,
    "species": [
     879,
     880,
     881,
     882,
     883
    ]
   },
   {
    "kind": "gym",
    "name": "Arène de Pitrouille",
    "bg": "town",
    "fallback": "mountain",
    "leader": "Alistair",
    "sprite": "koga",
    "type": "dark",
    "badge": "Ténèbres (Galar)",
    "color": "#705746",
    "reward": 7000,
    "power": 0.6599999999999999,
    "ace": 100,
    "team": [
     [
      862,
      96
     ],
     [
      861,
      97
     ],
     [
      904,
      98
     ],
     [
      828,
      99
     ],
     [
      877,
      100
     ]
    ]
   }
  ]
 },
 {
  "name": "Dragon · Kickenham",
  "reg": "galar",
  "region": "Kickenham → Route 8 de Galar",
  "ace": 100,
  "capMargin": 0,
  "steps": [
   {
    "kind": "route",
    "name": "Route 8 de Galar · 1",
    "bg": "sea",
    "lv": [
     92,
     96
    ],
    "wild": 4,
    "trainers": 2,
    "item": false,
    "species": [
     884,
     885,
     886,
     887,
     899,
     889,
     891,
     893,
     895,
     897,
     905
    ]
   },
   {
    "kind": "heal",
    "name": "Kickenham",
    "bg": "pokecenter"
   },
   {
    "kind": "route",
    "name": "Route 8 de Galar · 2",
    "bg": "prairie",
    "lv": [
     94,
     99
    ],
    "wild": 3,
    "trainers": 3,
    "species": [
     900,
     901,
     902,
     903,
     904,
     888,
     890,
     892,
     894,
     896,
     898
    ]
   },
   {
    "kind": "gym",
    "name": "Arène de Kickenham",
    "bg": "town",
    "fallback": "mountain",
    "leader": "Raihan",
    "sprite": "clair",
    "type": "dragon",
    "badge": "Dragon (Galar)",
    "color": "#6f35fc",
    "reward": 7000,
    "power": 0.72,
    "ace": 100,
    "team": [
     [
      887,
      96
     ],
     [
      884,
      97
     ],
     [
      880,
      98
     ],
     [
      882,
      99
     ],
     [
      841,
      100
     ]
    ]
   }
  ]
 },
 {
  "name": "Conseil 4 : Nabil",
  "reg": "galar",
  "region": "Ligue de Galar",
  "ace": 100,
  "capMargin": 0,
  "league": true,
  "steps": [
   {
    "kind": "heal",
    "name": "Ligue de Galar",
    "bg": "town"
   },
   {
    "kind": "route",
    "name": "Salle du Conseil",
    "bg": "gym-psychic",
    "fallback": "town",
    "wild": 0,
    "trainers": 4
   },
   {
    "kind": "gym",
    "name": "Salle 4",
    "bg": "gym-psychic",
    "fallback": "town",
    "leader": "Nabil",
    "sprite": "koga",
    "type": "dark",
    "badge": null,
    "color": "#705746",
    "reward": 9000,
    "power": 1.1,
    "ace": 100,
    "team": [
     [
      862,
      96
     ],
     [
      861,
      97
     ],
     [
      904,
      98
     ],
     [
      828,
      99
     ],
     [
      877,
      100
     ]
    ]
   }
  ]
 },
 {
  "name": "Conseil 4 : Sally",
  "reg": "galar",
  "region": "Ligue de Galar",
  "ace": 100,
  "capMargin": 0,
  "league": true,
  "steps": [
   {
    "kind": "heal",
    "name": "Ligue de Galar",
    "bg": "town"
   },
   {
    "kind": "route",
    "name": "Salle du Conseil",
    "bg": "gym-psychic",
    "fallback": "town",
    "wild": 0,
    "trainers": 4
   },
   {
    "kind": "gym",
    "name": "Salle 4",
    "bg": "gym-psychic",
    "fallback": "town",
    "leader": "Sally",
    "sprite": "erika",
    "type": "fairy",
    "badge": null,
    "color": "#d685ad",
    "reward": 9000,
    "power": 1.2200000000000002,
    "ace": 100,
    "team": [
     [
      858,
      96
     ],
     [
      861,
      97
     ],
     [
      869,
      98
     ],
     [
      860,
      99
     ],
     [
      868,
      100
     ]
    ]
   }
  ]
 },
 {
  "name": "Conseil 4 : Roy",
  "reg": "galar",
  "region": "Ligue de Galar",
  "ace": 100,
  "capMargin": 0,
  "league": true,
  "steps": [
   {
    "kind": "heal",
    "name": "Ligue de Galar",
    "bg": "town"
   },
   {
    "kind": "route",
    "name": "Salle du Conseil",
    "bg": "gym-psychic",
    "fallback": "town",
    "wild": 0,
    "trainers": 4
   },
   {
    "kind": "gym",
    "name": "Salle 4",
    "bg": "gym-psychic",
    "fallback": "town",
    "leader": "Roy",
    "sprite": "byron",
    "type": "steel",
    "badge": null,
    "color": "#b7b7ce",
    "reward": 9000,
    "power": 1.34,
    "ace": 100,
    "team": [
     [
      884,
      96
     ],
     [
      879,
      97
     ],
     [
      823,
      98
     ],
     [
      863,
      99
     ],
     [
      878,
      100
     ]
    ]
   }
  ]
 },
 {
  "name": "Conseil 4 : Duncan",
  "reg": "galar",
  "region": "Ligue de Galar",
  "ace": 100,
  "capMargin": 0,
  "league": true,
  "steps": [
   {
    "kind": "heal",
    "name": "Ligue de Galar",
    "bg": "town"
   },
   {
    "kind": "route",
    "name": "Salle du Conseil",
    "bg": "gym-psychic",
    "fallback": "town",
    "wild": 0,
    "trainers": 4
   },
   {
    "kind": "gym",
    "name": "Salle 4",
    "bg": "gym-psychic",
    "fallback": "town",
    "leader": "Duncan",
    "sprite": "clair",
    "type": "dragon",
    "badge": null,
    "color": "#6f35fc",
    "reward": 9000,
    "power": 1.46,
    "ace": 100,
    "team": [
     [
      887,
      96
     ],
     [
      884,
      97
     ],
     [
      880,
      98
     ],
     [
      882,
      99
     ],
     [
      841,
      100
     ]
    ]
   }
  ]
 },
 {
  "name": "Maître de la Ligue",
  "reg": "galar",
  "region": "Ligue de Galar",
  "ace": 100,
  "capMargin": 0,
  "league": true,
  "steps": [
   {
    "kind": "heal",
    "name": "Ligue de Galar",
    "bg": "town"
   },
   {
    "kind": "route",
    "name": "Salle du Maître",
    "bg": "gym-psychic",
    "fallback": "town",
    "wild": 0,
    "trainers": 4
   },
   {
    "kind": "gym",
    "name": "Salle 4",
    "bg": "gym-fire",
    "fallback": "town",
    "leader": "Léon",
    "target": 0.5,
    "sprite": "blaine",
    "type": "fire",
    "badge": "Maître",
    "champion": true,
    "color": "#ee8130",
    "reward": 14000,
    "power": 1.7,
    "ace": 100,
    "team": [
     [
      815,
      95
     ],
     [
      851,
      96
     ],
     [
      839,
      97
     ],
     [
      814,
      98
     ],
     [
      838,
      99
     ],
     [
      813,
      100
     ]
    ]
   }
  ]
 },
 {
  "name": "Insecte · Assimila",
  "reg": "paldea",
  "region": "Assimila → Route 1 de Paldea",
  "ace": 97,
  "capMargin": 3,
  "steps": [
   {
    "kind": "route",
    "name": "Route 1 de Paldea · 1",
    "bg": "prairie",
    "lv": [
     89,
     93
    ],
    "wild": 4,
    "trainers": 1,
    "item": true,
    "species": [
     906,
     907,
     908,
     909,
     910,
     911,
     912
    ]
   },
   {
    "kind": "heal",
    "name": "Assimila",
    "bg": "pokecenter"
   },
   {
    "kind": "route",
    "name": "Route 1 de Paldea · 2",
    "bg": "cave",
    "lv": [
     91,
     96
    ],
    "wild": 3,
    "trainers": 2,
    "species": [
     913,
     914,
     915,
     916,
     917,
     918,
     919
    ]
   },
   {
    "kind": "gym",
    "name": "Arène de Assimila",
    "bg": "town",
    "fallback": "mountain",
    "leader": "Katy",
    "sprite": "bugsy",
    "type": "bug",
    "badge": "Insecte (Paldea)",
    "color": "#a6b91a",
    "reward": 6790,
    "power": 0.3,
    "ace": 97,
    "team": [
     [
      988,
      95
     ],
     [
      954,
      96
     ],
     [
      920,
      97
     ]
    ]
   }
  ]
 },
 {
  "name": "Plante · Artazon",
  "reg": "paldea",
  "region": "Artazon → Route 2 de Paldea",
  "ace": 98,
  "capMargin": 2,
  "steps": [
   {
    "kind": "route",
    "name": "Route 2 de Paldea · 1",
    "bg": "forest",
    "lv": [
     90,
     94
    ],
    "wild": 4,
    "trainers": 1,
    "item": false,
    "species": [
     920,
     921,
     922,
     923,
     924,
     925,
     926
    ]
   },
   {
    "kind": "heal",
    "name": "Artazon",
    "bg": "pokecenter"
   },
   {
    "kind": "route",
    "name": "Route 2 de Paldea · 2",
    "bg": "mountain",
    "lv": [
     92,
     97
    ],
    "wild": 3,
    "trainers": 2,
    "species": [
     927,
     928,
     929,
     930,
     931,
     932
    ]
   },
   {
    "kind": "gym",
    "name": "Arène de Artazon",
    "bg": "gym-grass",
    "fallback": "mountain",
    "leader": "Brassius",
    "sprite": "erika",
    "type": "grass",
    "badge": "Plante (Paldea)",
    "color": "#7ac74c",
    "reward": 6860,
    "power": 0.36,
    "ace": 98,
    "team": [
     [
      1010,
      96
     ],
     [
      986,
      97
     ],
     [
      1019,
      98
     ]
    ]
   }
  ]
 },
 {
  "name": "Volt · Levincia",
  "reg": "paldea",
  "region": "Levincia → Route 3 de Paldea",
  "ace": 99,
  "capMargin": 1,
  "steps": [
   {
    "kind": "route",
    "name": "Route 3 de Paldea · 1",
    "bg": "cave",
    "lv": [
     91,
     95
    ],
    "wild": 4,
    "trainers": 2,
    "item": true,
    "species": [
     933,
     934,
     935,
     936,
     937,
     938,
     939
    ]
   },
   {
    "kind": "heal",
    "name": "Levincia",
    "bg": "pokecenter"
   },
   {
    "kind": "route",
    "name": "Route 3 de Paldea · 2",
    "bg": "beach",
    "lv": [
     93,
     98
    ],
    "wild": 3,
    "trainers": 3,
    "species": [
     940,
     941,
     942,
     943,
     944,
     945,
     946
    ]
   },
   {
    "kind": "gym",
    "name": "Arène de Levincia",
    "bg": "gym-electric",
    "fallback": "mountain",
    "leader": "Iono",
    "sprite": "ltsurge",
    "type": "electric",
    "badge": "Volt (Paldea)",
    "color": "#f7d02c",
    "reward": 6930,
    "power": 0.42,
    "ace": 99,
    "team": [
     [
      1021,
      97
     ],
     [
      989,
      98
     ],
     [
      992,
      99
     ]
    ]
   }
  ]
 },
 {
  "name": "Eau · Cascarrafa",
  "reg": "paldea",
  "region": "Cascarrafa → Route 4 de Paldea",
  "ace": 100,
  "capMargin": 0,
  "steps": [
   {
    "kind": "route",
    "name": "Route 4 de Paldea · 1",
    "bg": "mountain",
    "lv": [
     92,
     96
    ],
    "wild": 4,
    "trainers": 2,
    "item": false,
    "species": [
     947,
     948,
     949,
     950,
     951,
     952,
     953
    ]
   },
   {
    "kind": "heal",
    "name": "Cascarrafa",
    "bg": "pokecenter"
   },
   {
    "kind": "route",
    "name": "Route 4 de Paldea · 2",
    "bg": "pier",
    "lv": [
     94,
     99
    ],
    "wild": 3,
    "trainers": 3,
    "species": [
     954,
     955,
     956,
     957,
     958,
     959
    ]
   },
   {
    "kind": "gym",
    "name": "Arène de Cascarrafa",
    "bg": "gym-water",
    "fallback": "sea",
    "leader": "Kofu",
    "sprite": "misty",
    "type": "water",
    "badge": "Eau (Paldea)",
    "color": "#6390f0",
    "reward": 7000,
    "power": 0.48,
    "ace": 100,
    "team": [
     [
      1009,
      97
     ],
     [
      991,
      98
     ],
     [
      914,
      99
     ],
     [
      977,
      100
     ]
    ]
   }
  ]
 },
 {
  "name": "Normal · Medali",
  "reg": "paldea",
  "region": "Medali → Route 5 de Paldea",
  "ace": 100,
  "capMargin": 0,
  "steps": [
   {
    "kind": "route",
    "name": "Route 5 de Paldea · 1",
    "bg": "beach",
    "lv": [
     92,
     96
    ],
    "wild": 4,
    "trainers": 2,
    "item": true,
    "species": [
     960,
     961,
     962,
     963,
     964,
     965,
     966
    ]
   },
   {
    "kind": "heal",
    "name": "Medali",
    "bg": "pokecenter"
   },
   {
    "kind": "route",
    "name": "Route 5 de Paldea · 2",
    "bg": "lake",
    "lv": [
     94,
     99
    ],
    "wild": 3,
    "trainers": 3,
    "species": [
     967,
     968,
     969,
     970,
     971,
     972,
     973
    ]
   },
   {
    "kind": "gym",
    "name": "Arène de Medali",
    "bg": "town",
    "fallback": "mountain",
    "leader": "Larry",
    "sprite": "whitney",
    "type": "normal",
    "badge": "Normal (Paldea)",
    "color": "#a8a77a",
    "reward": 7000,
    "power": 0.54,
    "ace": 100,
    "team": [
     [
      981,
      97
     ],
     [
      982,
      98
     ],
     [
      930,
      99
     ],
     [
      967,
      100
     ]
    ]
   }
  ]
 },
 {
  "name": "Spectre · Monténégro",
  "reg": "paldea",
  "region": "Monténégro → Route 6 de Paldea",
  "ace": 100,
  "capMargin": 0,
  "steps": [
   {
    "kind": "route",
    "name": "Route 6 de Paldea · 1",
    "bg": "pier",
    "lv": [
     92,
     96
    ],
    "wild": 4,
    "trainers": 2,
    "item": false,
    "species": [
     974,
     975,
     976,
     977,
     978,
     979,
     980
    ]
   },
   {
    "kind": "heal",
    "name": "Monténégro",
    "bg": "pokecenter"
   },
   {
    "kind": "route",
    "name": "Route 6 de Paldea · 2",
    "bg": "sea",
    "lv": [
     94,
     99
    ],
    "wild": 3,
    "trainers": 3,
    "species": [
     981,
     982,
     983,
     984,
     985,
     986
    ]
   },
   {
    "kind": "gym",
    "name": "Arène de Monténégro",
    "bg": "town",
    "fallback": "mountain",
    "leader": "Ryme",
    "sprite": "morty",
    "type": "ghost",
    "badge": "Spectre (Paldea)",
    "color": "#735797",
    "reward": 7000,
    "power": 0.6,
    "ace": 100,
    "team": [
     [
      987,
      97
     ],
     [
      1000,
      98
     ],
     [
      979,
      99
     ],
     [
      911,
      100
     ]
    ]
   }
  ]
 },
 {
  "name": "Psy · Faisandelle",
  "reg": "paldea",
  "region": "Faisandelle → Route 7 de Paldea",
  "ace": 100,
  "capMargin": 0,
  "steps": [
   {
    "kind": "route",
    "name": "Route 7 de Paldea · 1",
    "bg": "lake",
    "lv": [
     92,
     96
    ],
    "wild": 4,
    "trainers": 2,
    "item": true,
    "species": [
     987,
     988,
     989,
     990,
     991,
     992,
     993
    ]
   },
   {
    "kind": "heal",
    "name": "Faisandelle",
    "bg": "pokecenter"
   },
   {
    "kind": "route",
    "name": "Route 7 de Paldea · 2",
    "bg": "town",
    "lv": [
     94,
     99
    ],
    "wild": 3,
    "trainers": 3,
    "species": [
     994,
     995,
     996,
     997,
     998,
     999,
     1000
    ]
   },
   {
    "kind": "gym",
    "name": "Arène de Faisandelle",
    "bg": "gym-psychic",
    "fallback": "mountain",
    "leader": "Tulip",
    "sprite": "sabrina",
    "type": "psychic",
    "badge": "Psy (Paldea)",
    "color": "#f95587",
    "reward": 7000,
    "power": 0.6599999999999999,
    "ace": 100,
    "team": [
     [
      1010,
      96
     ],
     [
      1022,
      97
     ],
     [
      1023,
      98
     ],
     [
      985,
      99
     ],
     [
      936,
      100
     ]
    ]
   }
  ]
 },
 {
  "name": "Glace · Zapapico",
  "reg": "paldea",
  "region": "Zapapico → Route 8 de Paldea",
  "ace": 100,
  "capMargin": 0,
  "steps": [
   {
    "kind": "route",
    "name": "Route 8 de Paldea · 1",
    "bg": "sea",
    "lv": [
     92,
     96
    ],
    "wild": 4,
    "trainers": 2,
    "item": false,
    "species": [
     1005,
     1006,
     1009,
     1010,
     1011,
     1012,
     1013,
     1002,
     1004,
     1008,
     1015,
     1017,
     1025
    ]
   },
   {
    "kind": "heal",
    "name": "Zapapico",
    "bg": "pokecenter"
   },
   {
    "kind": "route",
    "name": "Route 8 de Paldea · 2",
    "bg": "prairie",
    "lv": [
     94,
     99
    ],
    "wild": 3,
    "trainers": 3,
    "species": [
     1018,
     1019,
     1020,
     1021,
     1022,
     1023,
     1001,
     1003,
     1007,
     1014,
     1016,
     1024
    ]
   },
   {
    "kind": "gym",
    "name": "Arène de Zapapico",
    "bg": "town",
    "fallback": "mountain",
    "leader": "Grusha",
    "sprite": "pryce",
    "type": "ice",
    "badge": "Glace (Paldea)",
    "color": "#96d9d6",
    "reward": 7000,
    "power": 0.72,
    "ace": 100,
    "team": [
     [
      998,
      96
     ],
     [
      991,
      97
     ],
     [
      975,
      98
     ],
     [
      997,
      99
     ],
     [
      974,
      100
     ]
    ]
   }
  ]
 },
 {
  "name": "Conseil 4 : Rika",
  "reg": "paldea",
  "region": "Ligue de Paldea",
  "ace": 100,
  "capMargin": 0,
  "league": true,
  "steps": [
   {
    "kind": "heal",
    "name": "Ligue de Paldea",
    "bg": "town"
   },
   {
    "kind": "route",
    "name": "Salle du Conseil",
    "bg": "gym-psychic",
    "fallback": "town",
    "wild": 0,
    "trainers": 4
   },
   {
    "kind": "gym",
    "name": "Salle 4",
    "bg": "gym-ground",
    "fallback": "town",
    "leader": "Rika",
    "sprite": "giovanni",
    "type": "ground",
    "badge": null,
    "color": "#e2bf65",
    "reward": 9000,
    "power": 1.1,
    "ace": 100,
    "team": [
     [
      984,
      96
     ],
     [
      989,
      97
     ],
     [
      990,
      98
     ],
     [
      949,
      99
     ],
     [
      980,
      100
     ]
    ]
   }
  ]
 },
 {
  "name": "Conseil 4 : Poppy",
  "reg": "paldea",
  "region": "Ligue de Paldea",
  "ace": 100,
  "capMargin": 0,
  "league": true,
  "steps": [
   {
    "kind": "heal",
    "name": "Ligue de Paldea",
    "bg": "town"
   },
   {
    "kind": "route",
    "name": "Salle du Conseil",
    "bg": "gym-psychic",
    "fallback": "town",
    "wild": 0,
    "trainers": 4
   },
   {
    "kind": "gym",
    "name": "Salle 4",
    "bg": "gym-psychic",
    "fallback": "town",
    "leader": "Poppy",
    "sprite": "byron",
    "type": "steel",
    "badge": null,
    "color": "#b7b7ce",
    "reward": 9000,
    "power": 1.2200000000000002,
    "ace": 100,
    "team": [
     [
      1018,
      96
     ],
     [
      1023,
      97
     ],
     [
      990,
      98
     ],
     [
      983,
      99
     ],
     [
      1000,
      100
     ]
    ]
   }
  ]
 },
 {
  "name": "Conseil 4 : Larry",
  "reg": "paldea",
  "region": "Ligue de Paldea",
  "ace": 100,
  "capMargin": 0,
  "league": true,
  "steps": [
   {
    "kind": "heal",
    "name": "Ligue de Paldea",
    "bg": "town"
   },
   {
    "kind": "route",
    "name": "Salle du Conseil",
    "bg": "gym-psychic",
    "fallback": "town",
    "wild": 0,
    "trainers": 4
   },
   {
    "kind": "gym",
    "name": "Salle 4",
    "bg": "gym-psychic",
    "fallback": "town",
    "leader": "Larry",
    "sprite": "whitney",
    "type": "normal",
    "badge": null,
    "color": "#a8a77a",
    "reward": 9000,
    "power": 1.34,
    "ace": 100,
    "team": [
     [
      981,
      96
     ],
     [
      982,
      97
     ],
     [
      930,
      98
     ],
     [
      967,
      99
     ],
     [
      916,
      100
     ]
    ]
   }
  ]
 },
 {
  "name": "Conseil 4 : Hassel",
  "reg": "paldea",
  "region": "Ligue de Paldea",
  "ace": 100,
  "capMargin": 0,
  "league": true,
  "steps": [
   {
    "kind": "heal",
    "name": "Ligue de Paldea",
    "bg": "town"
   },
   {
    "kind": "route",
    "name": "Salle du Conseil",
    "bg": "gym-psychic",
    "fallback": "town",
    "wild": 0,
    "trainers": 4
   },
   {
    "kind": "gym",
    "name": "Salle 4",
    "bg": "gym-psychic",
    "fallback": "town",
    "leader": "Hassel",
    "sprite": "clair",
    "type": "dragon",
    "badge": null,
    "color": "#6f35fc",
    "reward": 9000,
    "power": 1.46,
    "ace": 100,
    "team": [
     [
      998,
      96
     ],
     [
      1018,
      97
     ],
     [
      1005,
      98
     ],
     [
      1009,
      99
     ],
     [
      1020,
      100
     ]
    ]
   }
  ]
 },
 {
  "name": "Maître de la Ligue",
  "reg": "paldea",
  "region": "Ligue de Paldea",
  "ace": 100,
  "capMargin": 0,
  "league": true,
  "steps": [
   {
    "kind": "heal",
    "name": "Ligue de Paldea",
    "bg": "town"
   },
   {
    "kind": "route",
    "name": "Salle du Maître",
    "bg": "gym-psychic",
    "fallback": "town",
    "wild": 0,
    "trainers": 4
   },
   {
    "kind": "gym",
    "name": "Salle 4",
    "bg": "gym-ground",
    "fallback": "town",
    "leader": "Alisma",
    "target": 0.5,
    "sprite": "giovanni",
    "type": "ground",
    "badge": "Maître",
    "champion": true,
    "color": "#e2bf65",
    "reward": 14000,
    "power": 1.7,
    "ace": 100,
    "team": [
     [
      984,
      95
     ],
     [
      989,
      96
     ],
     [
      990,
      97
     ],
     [
      949,
      98
     ],
     [
      980,
      99
     ],
     [
      948,
      100
     ]
    ]
   }
  ]
 }
];
  const badgeMaps = {
 "unova": {
  "Trio (Unys)": 1,
  "Basique (Unys)": 2,
  "Insecte (Unys)": 3,
  "Volt (Unys)": 4,
  "Sismique (Unys)": 5,
  "Jet (Unys)": 6,
  "Glaçon (Unys)": 7,
  "Légende (Unys)": 8
 },
 "kalos": {
  "Insecte (Kalos)": 1,
  "Roche (Kalos)": 2,
  "Poing (Kalos)": 3,
  "Plante (Kalos)": 4,
  "Tension (Kalos)": 5,
  "Fée (Kalos)": 6,
  "Psychisme (Kalos)": 7,
  "Iceberg (Kalos)": 8
 },
 "alola": {
  "Verdant (Alola)": 1,
  "Lush (Alola)": 2,
  "Wela (Alola)": 3,
  "Brooklet (Alola)": 4,
  "Hokulani (Alola)": 5,
  "Thrifty (Alola)": 6,
  "Poni (Alola)": 7,
  "Vast (Alola)": 8
 },
 "galar": {
  "Herbe (Galar)": 1,
  "Eau (Galar)": 2,
  "Feu (Galar)": 3,
  "Combat (Galar)": 4,
  "Fée (Galar)": 5,
  "Roche (Galar)": 6,
  "Ténèbres (Galar)": 7,
  "Dragon (Galar)": 8
 },
 "paldea": {
  "Insecte (Paldea)": 1,
  "Plante (Paldea)": 2,
  "Volt (Paldea)": 3,
  "Eau (Paldea)": 4,
  "Normal (Paldea)": 5,
  "Spectre (Paldea)": 6,
  "Psy (Paldea)": 7,
  "Glace (Paldea)": 8
 }
};
  const badgeSheets = {
 "unova": "assets/badges/unova-sheet.png",
 "kalos": "assets/badges/kalos-sheet.png",
 "alola": "assets/badges/alola-sheet.png",
 "galar": "assets/badges/galar-sheet.png",
 "paldea": "assets/badges/paldea-sheet.png"
};
  for (const def of regions) {
    const slot = t.STORY.REGIONS.find(r => r.name === def.name);
    if (slot) Object.assign(slot, def);
    else t.STORY.REGIONS.push(def);
  }
  t.STORY.CHAPTERS.push(...chapters);
  Object.assign(t.STORY, { GEN5TO9_BADGES: badgeMaps, GEN5TO9_BADGE_SHEETS: badgeSheets });
  const prevSheet = t.STORY.badgeSheet.bind(t.STORY);
  t.STORY.badgeSheet = function (badge) {
    for (const key of ['unova', 'kalos', 'alola', 'galar', 'paldea']) {
      const idx = this.GEN5TO9_BADGES?.[key]?.[badge];
      if (idx) return { src: this.GEN5TO9_BADGE_SHEETS[key], n: idx };
    }
    return prevSheet(badge);
  };
  Object.assign(t.CONFIG.REGION_XP, { unova: 1.45, kalos: 1.5, alola: 1.55, galar: 1.6, paldea: 1.65 });
  Object.assign(t.CONFIG.LEAGUE_TRAINERS.xp, { unova: 1.9, kalos: 1.95, alola: 2, galar: 2.05, paldea: 2.1 });
})();
