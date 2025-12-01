export const argusBackend = "https://argus-h2-backend.fly.dev";
//export const argusBackend = "https://argus-h2-backend-test.fly.dev";

/*
export const testingData = {
  boonData: {
    otherBoons: [
      {
        codeName: "DaggerBlinkAoETrait",
        rarity: "Common",
        name: "Sweeping Ambush",
        boonType: "Hammer",
        description:
          "Your <b>Omega Attack</b> deals <b>+400%</b> damage in a wider area, but uses <b>+20 Magick</b>.",
      },
      {
        codeName: "PoseidonSplashSprintBoon",
        rarity: "Duo",
        name: "Beach Ball",
        boonType: "Boon",
        description:
          "Your <b>Sprint</b> creates a watery globe behind you, which surges ahead once you stop.",
        effects: [{ text: "Max Blast Damage (after 2 Sec.):", value: "300" }],
      },
      {
        codeName: "DoubleRewardBoon",
        rarity: "Rare",
        name: "Sea Star",
        boonType: "Boon",
        description:
          "Whenever you claim rewards other than <b>Boons</b>, <b>Daedalus Hammers</b>, or rare resources, a copy may appear.",
        effects: [{ text: "Double Reward Chance:", value: "30%" }],
      },
      {
        codeName: "AmplifyConeBoon",
        rarity: "Legendary",
        name: "King Tide",
        boonType: "Boon",
        description:
          "Your splash effects from <b>Poseidon</b> are larger and deal bonus damage to <b>Guardians</b>.",
        effects: [{ text: "Splash Damage vs. Guardians:", value: "+200%" }],
      },
      {
        codeName: "ElementalDodgeBoon",
        rarity: "Infusion",
        name: "Wispy Wiles",
        boonType: "Boon",
        description:
          "Gain a chance to <b>Dodge</b> for each <b>Air</b> you have.",
        effects: [{ text: "Dodge Chance per Air Boon:", value: "+2%" }],
      },
    ],
    totalBoons: 9,
    manaBoon: {
      codeName: "ApolloManaBoon",
      rarity: "Common",
      name: "Lucid Gain",
      boonType: "Boon",
      description: "Whenever your <b>Casts</b> expire, restore <b>Magick</b>.",
      effects: [{ text: "Magick Restored:", value: "40" }],
    },
    specialBoon: {
      codeName: "AphroditeSpecialBoon",
      rarity: "Rare",
      name: "Flutter Flourish",
      boonType: "Boon",
      description: "Your <b>Specials</b> deal more damage to nearby foes.",
      effects: [{ text: "Close-Up Damage:", value: "+150%" }],
    },
    weaponBoon: {
      codeName: "PoseidonWeaponBoon",
      rarity: "Epic",
      name: "Wave Strike",
      boonType: "Boon",
      description:
        "Your <b>Attacks</b> hit foes with a splash that knocks other foes away.",
      effects: [{ text: "Splash Damage:", value: "30" }],
    },
    castBoon: {
      codeName: "PoseidonCastBoon",
      rarity: "Heroic",
      name: "Tidal Ring",
      boonType: "Boon",
      description:
        "Your <b>Casts</b> also immediately hit foes with a powerful splash that inflicts <b>Froth</b>.",
      effects: [{ text: "Splash Damage:", value: "150" }],
    },
  },
  weaponData: {
    name: "Aspect of Artemis",
    description:
      "While you <b>Channel</b> your <b>Omega Attack</b>, you occasionally <b>Parry</b>, then <b>Riposte</b> right after.",
    effects: [
      {
        text: "Omega Attack Speed:",
        common: "+20%",
        rare: "+30%",
        epic: "+40%",
        heroic: "+50%",
        legendary: "+60%",
        perfect: "+90%",
        value: "+30%",
      },
    ],
    codeName: "DaggerBlockAspect",
    rarity: "Rare",
  },
  familiarData: {
    codeName: "LastStandFamiliar",
    rarity: "8",
    name: "Toula",
    description:
      "After you <b>Sprint</b> nearby, lunges at the nearest foe for <b>99</b> damage.",
    effects: [
      { text: "Bonus Death Defiance:", value: "+1" },
      { text: "Bonus chance of Fishing Spots appearing:", value: "+40%" },
    ],
  },
  extraData: [
    {
      extraType: "Keepsake",
      codeName: "ForceZeusBoonKeepsake",
      name: "Cloud Bangle",
      description:
        "A <b>Boon</b> of <b>Zeus</b> is likely. You can <b>Rarify</b> his <b>Epic</b> blessings once this night.",
      rarity: "Epic",
    },
    {
      extraType: "Hex",
      codeName: "SpellSummonTrait",
      name: "Night Bloom",
      description:
        "Your <b>Hex</b> raises the last susceptible foe slain this <b>Encounter</b> to fight for you for <b>12 Sec.</b>",
      rarity: "Common",
    },
  ],
  elementalData: [
    { name: "Earth", value: "3" },
    { name: "Water", value: "0" },
    { name: "Air", value: "0" },
    { name: "Fire", value: "1" },
    { name: "Aether", value: "0" },
  ],
  pinData: [
    {
      codeName: "RandomStatusBoon",
      rarity: "Legendary",
      name: "Nervous Wreck",
      description:
        "Whenever you inflict <b>Weak</b>, also randomly inflict <b>Curses</b> from other Olympians.",
      effects: [{ text: "Bonus Random Curses:", value: "3" }],
      requirements: [
        {
          type: "Aphrodite",
          items: [
            {
              codeName: "AphroditeCastBoon",
              rarity: "Common",
              name: "Rapture Ring",
              boonType: "Boon",
              description:
                "Your <b>Casts</b> inflict <b>Weak</b>, and damage foes while dragging them toward the center.",
              effects: [
                { text: "Cast Damage (every 0.85 Sec.):", value: "10" },
              ],
              fulfilled: false,
            },
            {
              codeName: "AphroditeSprintBoon",
              rarity: "Common",
              name: "Passion Rush",
              boonType: "Boon",
              description:
                "<b>Rushing</b> damages surrounding foes and inflicts <b>Weak</b>, and again once you stop.",
              effects: [{ text: "Blast Damage:", value: "20" }],
              fulfilled: false,
            },
            {
              codeName: "AphroditeManaBoon",
              rarity: "Common",
              name: "Glamour Gain",
              boonType: "Boon",
              description:
                "You automatically inflict <b>Weak</b> on nearby foes and gradually restore <b>Magick</b> near them.",
              effects: [
                { text: "Magick Restoration (every 1 Sec.):", value: "6" },
              ],
              fulfilled: false,
            },
          ],
        },
        {
          type: "Aphrodite",
          items: [
            {
              codeName: "AphroditeWeaponBoon",
              rarity: "Common",
              name: "Flutter Strike",
              boonType: "Boon",
              description:
                "Your <b>Attacks</b> deal more damage to nearby foes.",
              effects: [{ text: "Close-Up Damage:", value: "+80%" }],
              fulfilled: false,
            },
            {
              codeName: "AphroditeSpecialBoon",
              rarity: "Common",
              name: "Flutter Flourish",
              boonType: "Boon",
              description:
                "Your <b>Specials</b> deal more damage to nearby foes.",
              effects: [{ text: "Close-Up Damage:", value: "+100%" }],
              fulfilled: true,
            },
          ],
        },
        {
          type: "Aphrodite",
          items: [
            {
              codeName: "WeakPotencyBoon",
              rarity: "Common",
              name: "Broken Resolve",
              boonType: "Boon",
              description: "Your <b>Weak</b> effects are more potent.",
              effects: [{ text: "Weak Damage Reduction:", value: "+10%" }],
              fulfilled: false,
            },
            {
              codeName: "WeakVulnerabilityBoon",
              rarity: "Common",
              name: "Sweet Surrender",
              boonType: "Boon",
              description: "<b>Weak</b>-afflicted foes take more damage.",
              effects: [{ text: "Damage vs. Weak:", value: "+10%" }],
              fulfilled: false,
            },
            {
              codeName: "HighHealthOffenseBoon",
              rarity: "Common",
              name: "Shameless Attitude",
              boonType: "Boon",
              description:
                "You deal more damage. While you have at least <b>80% Health</b>, the bonus is doubled.",
              effects: [{ text: "Bonus Damage:", value: "+5%" }],
              fulfilled: false,
            },
            {
              codeName: "FocusRawDamageBoon",
              rarity: "Common",
              name: "Secret Crush",
              boonType: "Boon",
              description:
                "Your <b>Attacks</b> gain <b>Power</b>, but you <b>Prime 20 Magick</b>.",
              effects: [{ text: "Bonus Power:", value: "+5" }],
              fulfilled: false,
            },
          ],
        },
      ],
    },
    {
      codeName: "AresExCastBoon",
      rarity: "Common",
      name: "Meat Grinder",
      description:
        "Your <b>Omega Cast</b> also creates a <b>Blade Rift</b> in the binding circle.",
      effects: [{ text: "Rift Damage (every 1 Sec.):", value: "30" }],
      requirements: [
        {
          type: "Other",
          items: [
            {
              codeName: "AphroditeCastBoon",
              rarity: "Common",
              name: "Rapture Ring",
              boonType: "Boon",
              description:
                "Your <b>Casts</b> inflict <b>Weak</b>, and damage foes while dragging them toward the center.",
              effects: [
                { text: "Cast Damage (every 0.85 Sec.):", value: "10" },
              ],
              fulfilled: false,
            },
            {
              codeName: "ApolloCastBoon",
              rarity: "Common",
              name: "Solar Ring",
              boonType: "Boon",
              description:
                "Your <b>Casts</b> inflict <b>Daze</b>, and deal a burst of damage before they expire.",
              effects: [{ text: "Cast Damage:", value: "80" }],
              fulfilled: false,
            },
            {
              codeName: "DemeterCastBoon",
              rarity: "Common",
              name: "Arctic Ring",
              boonType: "Boon",
              description:
                "Your <b>Casts</b> inflict <b>Freeze</b> and repeatedly deal damage to foes in the binding circle.",
              effects: [{ text: "Cast Damage (every 0.5 Sec.):", value: "10" }],
              fulfilled: false,
            },
            {
              codeName: "HephaestusCastBoon",
              rarity: "Common",
              name: "Anvil Ring",
              boonType: "Boon",
              description:
                "Your <b>Casts</b> deal damage <b>3</b> times in succession to foes in the binding circle.",
              effects: [{ text: "Cast Damage (every 1 Sec.):", value: "60" }],
              fulfilled: false,
            },
            {
              codeName: "HeraCastBoon",
              rarity: "Common",
              name: "Engagement Ring",
              boonType: "Boon",
              description:
                "Your <b>Casts</b> inflict <b>Hitch</b> and immediately deal damage based on foes in the binding circle.",
              effects: [{ text: "Damage per Foe:", value: "20" }],
              fulfilled: false,
            },
            {
              codeName: "HestiaCastBoon",
              rarity: "Common",
              name: "Smolder Ring",
              boonType: "Boon",
              description:
                "Your <b>Casts</b> repeatedly inflict <b>Scorch</b> on foes in the binding circle.",
              effects: [{ text: "Scorch Damage (every 1 Sec.):", value: "40" }],
              fulfilled: false,
            },
            {
              codeName: "PoseidonCastBoon",
              rarity: "Common",
              name: "Tidal Ring",
              boonType: "Boon",
              description:
                "Your <b>Casts</b> also immediately hit foes with a powerful splash that inflicts <b>Froth</b>.",
              effects: [{ text: "Splash Damage:", value: "60" }],
              fulfilled: true,
            },
            {
              codeName: "ZeusCastBoon",
              rarity: "Common",
              name: "Storm Ring",
              boonType: "Boon",
              description:
                "Your <b>Casts</b> cause lightning bolts to repeatedly strike <b>1</b> foe at a time in the binding circle.",
              effects: [
                { text: "Bolt Damage (every 0.35 Sec.):", value: "25" },
              ],
              fulfilled: false,
            },
            {
              codeName: "AresCastBoon",
              rarity: "Common",
              name: "Sword Ring",
              boonType: "Boon",
              description:
                "Your <b>Casts</b> create a falling blade over each foe in the binding circle.",
              effects: [{ text: "Blade Damage:", value: "100" }],
              fulfilled: false,
            },
          ],
        },
      ],
    },
    {
      codeName: "GoodStuffBoon",
      rarity: "Duo",
      name: "Natural Selection",
      description:
        "Your <b>Boon(s)</b> in the leftmost column gain <b>Levels</b> spread across however many you got.",
      effects: [{ text: "Total Bonus Lv. for Main Boon(s):", value: "+8" }],
      requirements: [
        {
          type: "Poseidon",
          items: [
            {
              codeName: "PoseidonWeaponBoon",
              rarity: "Common",
              name: "Wave Strike",
              boonType: "Boon",
              description:
                "Your <b>Attacks</b> hit foes with a splash that knocks other foes away.",
              effects: [{ text: "Splash Damage:", value: "20" }],
              fulfilled: true,
            },
            {
              codeName: "PoseidonSpecialBoon",
              rarity: "Common",
              name: "Wave Flourish",
              boonType: "Boon",
              description:
                "Your <b>Specials</b> hit foes with a splash that knocks other foes away.",
              effects: [{ text: "Splash Damage:", value: "25" }],
              fulfilled: false,
            },
            {
              codeName: "PoseidonCastBoon",
              rarity: "Common",
              name: "Tidal Ring",
              boonType: "Boon",
              description:
                "Your <b>Casts</b> also immediately hit foes with a powerful splash that inflicts <b>Froth</b>.",
              effects: [{ text: "Splash Damage:", value: "60" }],
              fulfilled: true,
            },
            {
              codeName: "PoseidonSprintBoon",
              rarity: "Common",
              name: "Breaker Rush",
              boonType: "Boon",
              description:
                "Whenever you <b>Sprint</b>, hit the first foe you run into with a blast that knocks foes away.",
              effects: [{ text: "Impact Blast Damage:", value: "80" }],
              fulfilled: false,
            },
            {
              codeName: "PoseidonManaBoon",
              rarity: "Common",
              name: "Flood Gain",
              boonType: "Boon",
              description:
                "Your <b>Omega Moves</b> make you briefly restore any <b>Magick</b> you use, repeatable after <b>8 Sec.</b>",
              effects: [{ text: "Magick Flood Duration:", value: "4 Sec." }],
              fulfilled: false,
            },
          ],
        },
        {
          type: "Demeter",
          items: [
            {
              codeName: "DemeterWeaponBoon",
              rarity: "Common",
              name: "Ice Strike",
              boonType: "Boon",
              description:
                "Your <b>Attacks</b> deal more damage and inflict <b>Freeze</b>.",
              effects: [{ text: "Attack Damage:", value: "+30%" }],
              fulfilled: false,
            },
            {
              codeName: "DemeterSpecialBoon",
              rarity: "Common",
              name: "Ice Flourish",
              boonType: "Boon",
              description:
                "Your <b>Specials</b> deal more damage and inflict <b>Freeze</b>.",
              effects: [{ text: "Special Damage:", value: "+40%" }],
              fulfilled: false,
            },
            {
              codeName: "DemeterCastBoon",
              rarity: "Common",
              name: "Arctic Ring",
              boonType: "Boon",
              description:
                "Your <b>Casts</b> inflict <b>Freeze</b> and repeatedly deal damage to foes in the binding circle.",
              effects: [{ text: "Cast Damage (every 0.5 Sec.):", value: "10" }],
              fulfilled: false,
            },
            {
              codeName: "DemeterSprintBoon",
              rarity: "Common",
              name: "Frigid Rush",
              boonType: "Boon",
              description:
                "Your <b>Sprint</b> forms a <b>Gust</b> around you that lingers after you stop.",
              effects: [
                { text: "Gust Area Damage (every 0.25 Sec.):", value: "4" },
              ],
              fulfilled: false,
            },
            {
              codeName: "DemeterManaBoon",
              rarity: "Common",
              name: "Tranquil Gain",
              boonType: "Boon",
              description:
                "After remaining inactive for <b>0.5 Sec.</b>, rapidly restores <b>Magick</b> until you act.",
              effects: [
                { text: "Magick Restoration (every 1 Sec.):", value: "50%" },
              ],
              fulfilled: false,
            },
          ],
        },
        {
          type: "Other",
          items: [
            {
              codeName: "RoomRewardBonusBoon",
              rarity: "Common",
              name: "Buried Treasure",
              boonType: "Boon",
              description:
                "Any <b>Minor Finds</b> and <b>Gold</b> are worth more, and you receive <b>Gold</b>, <b>Health</b>, and <b>Bones</b> now.",
              effects: [{ text: "Reward Value:", value: "+50%" }],
              fulfilled: false,
            },
            {
              codeName: "DoubleRewardBoon",
              rarity: "Common",
              name: "Sea Star",
              boonType: "Boon",
              description:
                "Whenever you claim rewards other than <b>Boons</b>, <b>Daedalus Hammers</b>, or rare resources, a copy may appear.",
              effects: [{ text: "Double Reward Chance:", value: "25%" }],
              fulfilled: true,
            },
            {
              codeName: "BoonGrowthBoon",
              rarity: "Common",
              name: "Steady Growth",
              boonType: "Boon",
              description:
                "Whenever you clear enough <b>Encounters</b>, a random <b>Boon</b> you have gains <b>Rarity</b>.",
              effects: [{ text: "Encounters per Rarity Upgrade:", value: "6" }],
              fulfilled: false,
            },
            {
              codeName: "PlantHealthBoon",
              rarity: "Common",
              name: "Plentiful Forage",
              boonType: "Boon",
              description:
                "Whenever you gather resources from a <b>Location</b>, restore <b>Health</b>. Receive <b>1 Mystery Seed</b> now.",
              effects: [
                { text: "Life Restored from Gathering:", value: "10%" },
              ],
              fulfilled: false,
            },
          ],
        },
      ],
    },
  ],
  vowData: {
    vowList: [
      {
        codeName: "BossDifficultyShrineUpgrade",
        name: "Vow of Rivals",
        level: "4",
        description:
          "The <b>Guardian</b> of the first <b>4 Regions</b> shall be stronger in various ways.",
      },
      {
        codeName: "MinibossCountShrineUpgrade",
        name: "Vow of Shadow",
        level: "1",
        description:
          "All <b>Encounters</b> with <b>Wardens</b> contain no fewer than <b>1 Shadow Servants</b>",
      },
      {
        codeName: "NextBiomeEnemyShrineUpgrade",
        name: "Vow of Menace",
        level: "2",
        description:
          "Most foes have <b>25%</b> chance to be from the next <b>Region</b> (if there is one).",
      },
      {
        codeName: "BiomeSpeedShrineUpgrade",
        name: "Vow of Time",
        level: "2",
        description:
          "You have <b>07:00.00</b> to fight through each <b>Region</b> (or else...).",
      },
    ],
    totalFear: 20,
  },
  arcanaData: {
    arcanaList: [
      {
        codeName: "PanelRerollMetaUpgrade",
        name: "The Champions",
        rarity: "Epic",
        description:
          "You have <b>+3 Rerolls</b>, and can alter <b>Boons</b> and certain other choices.",
      },
      {
        codeName: "EffectVulnerabilityMetaUpgrade",
        name: "Origination",
        rarity: "Epic",
        description:
          "You deal <b>+50%</b> damage to foes afflicted with at least <b>2 Curses</b> from different <b>Olympians</b>.",
      },
      {
        codeName: "ChannelSlowMetaUpgrade",
        name: "The Sorceress",
        rarity: "Rare",
        description: "Your <b>Omega Moves</b> are <b>25%</b> faster.",
      },
      {
        codeName: "DoorHealMetaUpgrade",
        name: "The Wayward Son",
        rarity: "Epic",
        description:
          "After you exit a <b>Location</b>, restore <b>5 Health</b>.",
      },
      {
        codeName: "LowManaDamageMetaupgrade",
        name: "The Huntress",
        rarity: "Epic",
        description:
          "While you have less than <b>100% Magick</b>, your <b>Attack</b> and <b>Special</b> deal <b>+50%</b> damage.",
      },
      {
        codeName: "CastDamageMetaUpgrade",
        name: "Eternity",
        rarity: "Common",
        description:
          "While you <b>Channel</b> your <b>Omega Moves</b>, everything moves slower for <b>0.8 Sec.</b>",
      },
      {
        codeName: "SorceryRegenMetaUpgrade",
        name: "The Moon",
        rarity: "Epic",
        description:
          "Your <b>Hex</b> also charges up automatically as though you used <b>3 Magick</b> every <b>1 Sec.</b>",
      },
    ],
    totalGrasp: 16,
  },
  totalRunItems: "13",
};
*/
