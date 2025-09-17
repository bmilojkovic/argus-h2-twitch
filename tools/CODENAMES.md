## Core boons
* Attack: `Weapon`
* Special: `Special`
* Cast: `Cast`
* Sprint: `Sprint`
* Magick regeneration: `Mana`

All core boons are named as follows in the code:
[God][Type]Boon, for example: `ApolloWeaponBoon` is Apollo attack.

Currently equipped boons can be found in `CurrentRun.Hero.Traits`.

## Weapons
The aspects are labeled as follows in the code:
* Staff
  * Melinoe: `BaseStaffAspect`
  * Momus: `StaffClearCastAspect`
  * Circe: `StaffSelfHitAspect`
  * Anubis: `StaffRaiseDeadAspect`
* Dagger
  * Mel: `DaggerBackstabAspect`
  * Artemis: `DaggerBlockAspect`
  * Pan: `DaggerHomingThrowAspect`
  * Morrigan: `DaggerTripleAspect`
* Torches
  * Mel: `TorchSpecialDurationAspect`
  * Moros: `TorchDetonateAspect`
  * Eos: `TorchSprintRecallAspect`
  * Supay: `TorchAutofireAspect`
* Axe
  * Mel: `AxeRecoveryAspect`
  * Charon: `AxeArmCastAspect`
  * Thanatos: `AxePerfectCriticalAspect`
  * Nergal: `AxeRallyAspect`
* Skull
  * Mel: `LobAmmoBoostAspect`
  * Medea: `LobCloseAttackAspect`
  * Persephone: `LobImpulseAspect`
  * Hel: `LobGunAspect`
* Coat
  * Mel: `BaseSuitAspect`
  * Nyx: `SuitMarkCritAspect`
  * Selene: `SuitHexAspect`
  * Shiva: `SuitComboAspect`

These can be found as traits associated with `CurrentRun.Hero.Traits`.
## Familiars
* Frinos: `FrogFamiliar`
* Gale: `PolecatFamiliar`
* Hecuba: `DogFamiliar`
* Raki: `RavenFamiliar`
* Toula: `CatFamiliar`

The current familiar is stored in `GameState.EquippedFamiliar`.