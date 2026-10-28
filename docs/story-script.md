# Dungeon Loot Shoppe - Script

Oct 24, 2026 · @Boss

**Copies of this script:** this doc is the master. A copy lives in the game's GitHub repo at `docs/story-script.md` for collaborators who can't open this doc, such as ChatGPT. Script changes made there through pull requests get carried back here, and the copy is refreshed whenever this doc changes. The repo's `AGENTS.md` has the rules every collaborator follows.

**How prompts appear:** every tutorial prompt, Wren tip, new-customer intro, decline line and idle line pops up as a card over the game. Play pauses until the player taps **Got it**, so no prompt can be missed. When several are waiting, they show one after another. Scene cards work the same way, with the buttons written in each scene.

**How highlights work:** when a prompt says "(highlighting the X)", X gets a pulsing gold outline after the player taps **Got it**. Tabs, dungeons and the Open the Shop button keep their outline until the player taps them. Everything else (combat buttons, the mood badge, panels like Market Today) shows its outline until the player's next tap. If X is on another tab, that tab is outlined first. Only one highlight shows at a time, and the next waiting prompt appears once it's done. Prompts about the town wait until the player is back in town. If the player goes delving or opens the shop while a tab or dungeon is still outlined, its outline comes back on returning to town; other town highlights end there.

**Portraits:** every speaking character has a 16×16 pixel-art portrait beside their lines and tips. So does every customer type, on the shop customer card (regulars use their type's portrait). Staff also have portraits on their staff cards and hire rows. Looks, for anyone adding scenes: Wren (brown hair with a grey streak and ponytail, scar, green cloak), Maribel (long silver hair, plum shawl), Pip (messy ginger hair, freckles, apron, broom), Marlo (slick black hair, mustache, blue vest with gold), Old Greta (white bun, glasses, green shawl), Bram (bald, black beard, soot, leather apron), Sable (dark hood, pale skin, silver eyes), Voss (white hair, gold cracks in pale skin, blue-and-gold coat with a star), Ember Knight (blackened helm, burning visor), Kobold Foreman (hard hat, red scales, safety vest), Celestial Executor (gold armor, star seal for a face). A new speaking character needs a portrait added to match.

**Ending a chapter:** finishing every goal doesn't move the story on by itself. Wren tells the player, and a button on the Journal's chapter card starts the next one, so the player chooses when.

- **Chapter 1:** Wren tip (highlighting the Journal tab, then the Sleep until morning button): "That's everything for now. Get some sleep. Open the **Journal** and turn in for the night; Chapter 2 starts in the morning." The Journal card says "Every goal is done. Chapter 2 begins in the morning." with a **Sleep until morning** button that ends the day. The letter (Scene 1.7) arrives the next morning. Ending the day any other way (a delve or a shop day) also works.
- **Chapters 2–5:** Wren tip (highlighting the Journal tab, then the Start Chapter button): "That's every goal this chapter. Open the **Journal** and start the next one when you're ready." The Journal card shows **Start Chapter N: Title**. Tapping it writes the chapter-complete entry, applies the chapter's unlocks and starts the next chapter.
- **Chapter 6:** no button. The epilogue plays on its own when the player gets home after Voss.

**Fainting** shows a pop-up the player dismisses ("You fainted: You were dragged back to town. You lost …"). It appears ahead of any other waiting prompt.

**Item info:** every item shows a small (i). Tapping it opens a card with the item's type and market value, what it does (for potions and supplies), where it's found (which dungeon, rarer in neighboring ones, secret floors, boss and mini-boss drops, dungeon peddlers) and its Workshop recipe.

**Delve buffs** (like the Whetstone's or the shrine's attack bonus) show under the HP bar at the top of the delve screen.

**Enemy HP:** in a fight, the enemy's HP shows as numbers under its health bar ("HP 7 / 12").

# Chapter 1: Dust and Doorbells

**Chapter goal:** teach the core loop (delve → sell → haggle → craft) and introduce Wren, Maribel, and the Celestials.

**Unlocks at chapter end:** Skills tab (Wren's training yard).

## Journal: Chapter 1 goals

1. Clear Floor 1 of the Mossy Cellar (find the stairs down on Floor 1)
2. Sell your first item
3. Haggle a sale above market value
4. Craft a supply in the Workshop
5. Reach Level 2

Opening entry:

> *Hollowmere. The shop is mine now, along with whatever Aunt Maribel left in it. Wren says start with the cellar.*

## Scene 1.1: Arrival

**Trigger:** new game, before the Town screen appears.

**CARD 1** (narration)

> The bell over the door still works. Nothing else does.

> Dust everywhere but the floor. An empty stockroom. A journal with your name on the first page, in Aunt Maribel's handwriting.
>
> **\[Read it\]**

**CARD 2** (Maribel's note)

> *"If you're reading this, the shop is yours. Keep the doors open. Keep the lamp lit. And whatever anyone offers, don't sell the cellar."*
>
> **\[Continue\]**

**CARD 3**

> The door creaks. A woman with one hand and no patience looks you over.

> **Wren:** "You're Maribel's kin. Good. I'm Wren. I adventured with her for twenty years."
>
> **Wren:** "The shop's got no stock, and the cellar's got rats the size of goats. Let's fix one of those problems."
>
> **\[Let's go\]**

→ The Journal unlocks, and Goal 1 appears.

→ **Tutorial prompt** (highlighting the Journal tab): Wren: "Maribel's journal is yours now. Your goals are in the **Journal** tab. Check it whenever you're not sure what's next." It stays up until the player taps the Journal tab, then the Mossy Cellar prompt appears.

→ **Tutorial prompt** (on the Town screen, highlighting the Mossy Cellar): "Tap **Mossy Cellar** to enter the dungeon." It stays up until the player taps it.

## Scene 1.2: First delve

**Trigger:** first time pressing Enter on the Mossy Cellar.

> **Wren:** "Delving takes the whole day. Go deep for better loot, but every floor bites harder."
>
> **Wren:** "Faint down there and you lose everything you found, plus some of your coin. The deeper you fall, the more it costs."
>
> **\[Into the cellar\]**

**Wren tips** (one-time pop-ups the player dismisses with Got it):

- **First combat (highlighting Attack, Guard and Flee):** "Attack deals damage; if the enemy survives, it hits back. Guard means you don't attack that turn, but the enemy deals about 70% less damage. Flee might fail, giving the enemy a free hit."
- **First enemy hit (highlighting the enemy's damage number):** "That number's a rough guess at its damage. Plan around it."
- **First loot (highlighting your pack space):** "Everything has a price. Mind your pack space."
- **First supply-belt use (highlighting the supply belt):** "Combat supplies cost your turn. Ladders work between fights to skip a floor. Use supplies before you need them, not after."
- **First room event:** "The cellar's strange since the star fell. Not all strange is bad."
- **First floor cleared (highlighting the Descend and Return to town buttons):** "Push deeper, or head up with what you've got. No shame in a short day."

**Log flavor (Mossy Cellar):**

- *Something skitters behind the barrels.*
- *Old shelving, Maribel's labels still on the jars.*
- *A faint glitter in the moss, gone when you look closer.*
- *The air smells like rain and old pennies.*

## Scene 1.3: Back from the first delve

**Trigger:** returning to town after the first delve.

> **Wren:** "Not bad. Loot's no good in a sack, though. Open the shop and let the customers come to you."
>
> **\[Continue\]**

→ Goal 2 appears, with a tutorial prompt (highlighting the Open the Shop button) until the player taps it. It follows the Market Today tip and the For sale and Keep tip below, so both are pointed out before the player leaves town.

**Wren tip (Market Today, highlighting the Market Today panel):** "Prices shift daily. Green means folk want it."

**Wren tip (For sale and Keep, highlighting the For sale and Keep buttons on the first item in Stock):** "Everything in your **Stock** has two buttons, **For sale** and **Keep**. Tap one to choose. Anything on Keep stays in the back and won't go out on the floor, so no customer will ever ask for it. Potions and supplies start on Keep, so you don't sell what you need down there."

## Scene 1.4: First shop day

**Trigger:** first press of Open the Shop.

> **Wren:** "Only three customers a day while the town's like this."
>
> **Wren:** "They'll make an offer. Their mood tells you how far you can push."
>
> **\[Open the doors\]**

**Wren tips** (first appearance of each mood, highlighting the customer's mood badge):

- **Eager:** "That one wants it bad. Push."
- **Keen:** "Interested. A little push won't hurt."
- **Fair:** "Take a fair deal when you see one."
- **Thrifty:** "This one's counting coins. Push and they'll walk."

**After the first sale:**

> **Wren:** "First coin in the till in a long while. Maribel would've rung the bell twice."

→ **Tutorial prompt** (highlighting the Workshop tab, with Goal 4): Wren: "Maribel's workbench is in the **Workshop** tab. Go make something."

**After the first sale above market** (Goal 3):

> **Wren:** "Ha. Maybe you've got her nose for it."

→ **Tutorial prompt** (highlighting the Upgrades tab): Wren: "Coin's for spending too. See what the **Upgrades** tab has."

**After the first customer walks away:**

> **Wren:** "Lost one. Happens. Their mood can lie, but their feet never do."

**New customer intro, first passing adventurer:**

> **Adventurer:** "Didn't think this place was still open. Got anything sharp?"

## Scene 1.5: The Workshop

**Trigger:** first time opening the Workshop tab.

> **Wren:** "Maribel's workbench. She could make a rope out of rumors."
>
> **Wren:** "Materials from the cellar can be used to craft new items to sell and the supplies you craft can be equipped on your supply belt (in Town Tab) to carry with you when you go delving."
>
> **\[Continue\]**

**After the first craft** (Goal 4):

> **Wren:** "Ugly, but it'll work. Most good things are."

→ **Tutorial prompt** (highlighting the supply belt on the Town tab): Wren: "Put it on your belt before you head down."

**Ladder (defined):** a tier 1 supply crafted from 2 Moss Fiber + 1 Scrap Iron. Equip it on the supply belt, then use it between encounters to descend exactly one normal dungeon floor without finding the stairs. The Ladder is consumed only after a successful descent. It cannot be used during combat or room events, on the deepest or secret floor, or to bypass a story-sealed floor.

**Bombs and Blasting Powder (defined):** there are five kinds of bomb. Each deals a fixed multiple of the player's attack, never less than the old floor-based blast (80% of that floor's ordinary monster's HP), and uses the player's turn. Whetstone and shrine bonuses don't apply. Each kind has its own recipe, and a bomb keeps its strength once made. **Blasting Powder** is an upgrade in the Upgrades tab, available once the Apothecary is repaired. It has 4 ranks starting at 180G, with normal upgrade cost scaling. Each rank unlocks the next, costlier bomb recipe; the Workshop shows the next locked one as a teaser. Bosses, mini-bosses and dungeon peddlers only ever give Fire Bombs.

| Bomb | Damage | Recipe |
| --- | --- | --- |
| Fire Bomb (from the start) | 1.2× attack | 1 Scrap Iron + 1 Slime Gel |
| Blast Bomb (rank 1) | 1.8× | 2 Scrap Iron + 2 Slime Gel |
| Ironshell Bomb (rank 2) | 2.4× | 2 Scrap Iron + 2 Slime Gel + 1 Ore Chunk |
| Ember Bomb (rank 3) | 3× | 2 Scrap Iron + 2 Slime Gel + 1 Ore Chunk + 1 Ember Core |
| Star Bomb (rank 4) | 3.6× | 3 Scrap Iron + 2 Slime Gel + 2 Ember Core + 1 Stardust |

Market values: 45G, 90G, 150G, 260G and 450G. A bomb's damage shows on its supply button in a fight and in its item info. Blasting Powder resets with the other gear upgrades at a Grand Reopening.

**Whetstones and Master Grindstone (defined):** there are five kinds of whetstone. Each gives a fixed attack bonus for the rest of the delve and uses the player's turn in a fight. The player can carry as many as they like, but **only one whetstone of any kind works per delve**. Once one is used, the rest show "used this delve" until the next delve. **Master Grindstone** is an upgrade in the Upgrades tab, available once the Smithy is repaired. It has 4 ranks starting at 180G, with normal upgrade cost scaling. Each rank unlocks the next, costlier whetstone recipe, and the Workshop shows the next locked one as a teaser. Bosses, mini-bosses and dungeon peddlers only ever give plain Whetstones. Master Grindstone resets with the other gear upgrades at a Grand Reopening.

| Whetstone | Attack bonus | Recipe | Market value |
| --- | --- | --- | --- |
| Whetstone (from the start) | +30% | 1 Scrap Iron + 1 Ore Chunk | 40G |
| Fine Whetstone (rank 1) | +45% | 2 Scrap Iron + 2 Ore Chunk | 80G |
| Steel Hone (rank 2) | +60% | 1 Scrap Iron + 2 Ore Chunk + 1 Ember Core | 140G |
| Ember Hone (rank 3) | +80% | 2 Ore Chunk + 2 Ember Core | 240G |
| Starsteel Hone (rank 4) | +100% | 2 Ore Chunk + 2 Ember Core + 1 Stardust | 420G |

## Scene 1.6: Upgrades

**Trigger:** first time opening the Upgrades tab.

> **Wren:** "Gear and Shop upgrades can be purchased here. Sharpen your blades, buy bigger packs, add loops to your supply belt. Fix the town to unlock new upgrades."

**Supply belt upgrade (defined):** new games and Grand Reopenings start with 2 supply-belt slots. **Expand Supply Belt** is available immediately in the Upgrades tab, costs 150G for its first rank with normal upgrade cost scaling, and adds 1 slot per rank. It has 4 ranks, for a maximum of 6 slots. Saves created before this upgrade begin at rank 2 so they retain the previous 4-slot capacity; equipped supplies are never removed by migration.

**Locked-state note:** until the Smithy is repaired, the Upgrades page explains that Sharpen Blade, Reinforce Armor and Bigger Pack stop at level 3, and that the Kobold Foreman must be defeated in Chapter 3 before the Smithy can be unlocked and built. The Upgrades tab's purchase count only includes upgrades the player can actually buy now; Smithy-locked levels do not count.

## Scene 1.7: The letter (chapter climax)

**Trigger:** all five goals complete, at the start of the next day.

**CARD 1** (narration)

> A letter is slipped under the door. Heavy paper. A small gold star pressed into the wax seal.
>
> **\[Open it\]**

**CARD 2** (the letter)

> *"To the new proprietor. Now that your aunt has been declared dead, the Celestial Consortium extends its condolences. Her outstanding balance transfers to you. We look forward to a long and orderly relationship. — G. Voss, Guildmaster"*
>
> **\[Continue\]**

**CARD 3**

> **Wren:** *(reading over your shoulder)* "The Celestials. Maribel borrowed from them to fund the expeditions. I told her not to."
>
> **Wren:** "They're patient. That's what worries me."
>
> **\[What do we do?\]**

**CARD 4**

> **Wren:** "We pay it. Bit by bit. But you'll need to get tougher first."
>
> **Wren:** "Out back. There's a training yard under all those weeds."
>
> **\[Follow her\]**

→ The **Skills tab unlocks (highlighting the Skills tab)**.

→ **Tutorial prompt** (highlighting the Pay button under Ledgers in the Journal): Wren: "When you've coin to spare, pay the Celestials from the **Journal** tab. Every bit off the balance is a bit they can't hold over you."

**Wren tip (first time opening Skills):** "Fighter, finder, or seller. Pick what fits. You'll grow into the rest."

## Journal: Chapter 1 complete

> *Debt: the Celestial Consortium. Balance: 61,000G.*
>
> *Wren says we pay it bit by bit. Maribel's journal has a map in the back, all mountain, with the summit circled twice. Above it, she wrote: "It's still warm."*

→ Chapter 2: The Ledger begins.

# Chapter 2: The Ledger

**Chapter goal:** first debt payment, first boss, first town repair. Introduce Voss and Pip.

**Unlocks:** Pip (first hire), the Town Well repair, Grand Reopening (after the Well), customers 3 → 4.

## Journal: Chapter 2 goals

1. Hire Pip
2. Defeat the Rat Matriarch in the Mossy Cellar
3. Defeat the Slime Monarch in the Mossy Cellar
4. Make your first payment to the Celestials (1,000G)
5. Repair the Town Well (300G + 3 Moss Fiber + the star-glass, after the Slime Monarch)

Opening entry:

> *The Celestials want their coin. Wren says the cellar goes deeper than Maribel ever let on.*

## Scene 2.1: The Guildmaster calls

**Trigger:** first day of Chapter 2, on the Town screen.

**CARD 1** (narration)

> The bell rings. A tall man in blue and gold steps in, brushing dust from his sleeve as if it offended him.
>
> **\[Continue\]**

**CARD 2**

> **Voss:** "Guildmaster Voss, of the Celestial Consortium. Your aunt was a dear customer."
>
> **Voss:** "I do hope you're more… punctual."
>
> **\[We'll pay.\]** / **\[Get out of my shop.\]**

**CARD 3a** (if "We'll pay")

> **Voss:** "Splendid. No rush. The Consortium is nothing if not patient."

**CARD 3b** (if "Get out")

> **Voss:** *(smiling)* "Of course. It *is* your shop. For now."

**CARD 4** (after he leaves)

> **Wren:** "Didn't like his hands. Too clean for a man who collects debts."
>
> **\[Continue\]**

## Scene 2.2: The broom thief

**Trigger:** start of the second day of Chapter 2.

> *(narration)* The floor is swept. You didn't sweep it. A gangly boy of about fifteen is hiding behind the counter, broom in hand.
>
> **Pip:** "I wasn't stealing! Miss Maribel let me sweep for bread when I was little. After she left, I just… kept sweeping."
>
> **Wren:** "That's Pip. Been minding this place longer than anyone."
>
> **\[Hire him\]**

**After hiring** (Goal 1):

> **Pip:** "I'll sell everything! Well. Two things a day. Maybe."

**Wren tip (first delve with Pip hired):** "Hired hands sell while you're below. Less than you would, but better than an empty shelf."

## Scene 2.3: The Rat Matriarch

**Trigger:** first encounter with the Rat Matriarch.

> *(log)* *The squeaking stops all at once. Something big shifts in the dark.*
>
> **Wren tip:** "Mini-bosses hit hard. Guard when it winds up. Bring tonics."

**After victory** (Goal 2):

> *(log)* *Behind her nest, the moss glows faintly. A tunnel leads down.*

## Scene 2.4: The Slime Monarch

**Trigger:** first encounter with the Slime Monarch.

> *(narration)* A mound of green ooze wearing a crown of rusted pots. Something bright pulses deep inside it.
>
> **\[Fight\]**

**After victory** (Goal 3):

> *(narration)* The Monarch melts away. Left behind: a sliver of crystal, warm as a sunlit stone.
>
> **Wren:** *(quiet)* "That's star-glass. Haven't seen any in ten years."
>
> **Wren:** "Keep it. Don't sell it. And don't show it around."
>
> **\[Continue\]**

→ **The Town Well repair unlocks** (highlighting the Town Well in the Journal's Hollowmere list, where repairs are made).

**Log flavor (deeper Mossy Cellar):**

- *Slime trails glitter like they swallowed starlight.*
- *A child's drawing of a falling star, nailed to a beam.*
- *The walls are warm here. Warmer than they should be.*

## Scene 2.5: The first payment

**Trigger:** first time paying the debt (Journal → Pay).

> *(narration)* A Celestial courier takes the coin, stamps a receipt with a small gold star, and leaves without a word.
>
> **Wren:** "One down. Feels good, doesn't it? Don't get used to it."

## Scene 2.6: The Well

**Trigger:** Town Well repair complete. (The repair stays locked until the Slime Monarch is defeated, since it needs the star-glass.)

**CARD 1**

> **Wren:** "Drop the star-glass in. Maribel always said the well went dry the night the star fell."
>
> **\[Drop it in\]**

**CARD 2** (narration)

> A faint glow. Then the sound of water, rising for the first time in twelve years.
>
> **\[Continue\]**

**CARD 3** (narration)

> By evening, smoke rises from three chimneys that were cold this morning.
>
> **Old Greta:** *(from the street)* "Well, I'll be. The shop's lamp is lit."
>
> **\[Continue\]**

**CARD 4**

> **Wren:** "Folk will come back now. More customers, more coin."
>
> **Wren:** "And if the shop ever goes stale, close up and reopen it bigger. Maribel did it twice."

→ **Customers 3 → 4. Grand Reopening unlocks (highlighting the Reopen button in the Journal's Grand Reopening section).**

**New customer intro, first townsfolk:**

> **Townsfolk:** "Heard the well's flowing. Figured I'd see if you sell anything a body can afford."

## Journal: Chapter 2 complete

> *The well runs again. Star-glass did that. Maribel's notes say the big shards are deeper, past the mines. Next to her sketch of the Sunken Mine, she wrote: "Kobolds. Not wild. Someone's paying them."*

→ The Sunken Mine unlocks (highlighting the Sunken Mine). Chapter 3: Sparks at the Smithy begins.

# Chapter 3: Sparks at the Smithy

**Chapter goal:** open the Sunken Mine, recover the first shard, rebuild the heart of town. Introduce Bram, Marlo, and Greta.

**Unlocks:** Sunken Mine, Smithy (gear upgrades, advanced crafting), Apothecary (bombs, ropes, advanced potions), Tavern (hire board), Marlo and Old Greta. Customers 4 → 5 (Tavern) → 6 (Smithy + Apothecary).

**What each building gates (settled):** the Smithy unlocks gear upgrades above level 3 and tier 3–4 recipes (including the Cinder Crown and Astral Aegis boss crafts). The Apothecary unlocks recipes for bombs, ropes, Healing Tonic, Ember Draught and Starlight Elixir. Lockpicks, whetstones and ladders are craftable from the start, so Chapter 1's "craft a supply" goal always works. The Tavern opens the hire board for Marlo, Old Greta and Sable.

## Journal: Chapter 3 goals

1. Repair the Tavern
2. Defeat the Tunnel Wurm in the Sunken Mine
3. Defeat the Kobold Foreman in the Sunken Mine
4. Repair the Smithy (after the Kobold Foreman)
5. Repair the Apothecary
6. Make your second payment (5,000G)

Opening entry:

> *Maribel thought someone was paying the kobolds. Wren thinks Maribel was usually right.*

## Scene 3.1: The Tavern reopens

**Trigger:** Tavern repair complete.

> **Wren:** "Finally. A place to sit that isn't your counter."
>
> *(narration)* Within the hour, a hire board is nailed by the door. One name is already on it.
>
> **\[Continue\]**

**Marlo intro:**

> **Marlo:** "Marlo. Clerk, salesman, charmer. The Consortium likes to keep an eye on its… investments. So they loaned me out."
>
> **Marlo:** "Don't worry. I sell better than I spy."
>
> **Wren:** *(under her breath)* "Keep your ledger locked."
>
> **\[Hire him\]** / **\[Not now\]**

**If declined,** Marlo: "Your loss. I'll be at the Tavern, looking trustworthy." He stays on the hire board.

→ **Customers 4 → 5. Hire board unlocks (highlighting the Shop staff section on the Town tab, where hires are made).**

**New customer intro, first traveler:**

> **Traveler:** "Word in the next valley is Hollowmere's waking up. Thought I'd see for myself."

## Scene 3.2: Into the Sunken Mine

**Trigger:** first time entering the Sunken Mine.

> **Wren:** "The mine flooded the night the star fell. Half the town worked down here."
>
> **Wren:** "Watch your footing. Watch the water. Watch everything."

**Log flavor (Sunken Mine):**

- *Mine carts rusted to the rails, still half full of ore.*
- *Fresh pickaxe marks. Too fresh.*
- *A lantern hook stamped with a tiny gold star.*
- *The water hums, faintly, like a struck bell.*

## Scene 3.3: The Tunnel Wurm

**Trigger:** first encounter with the Tunnel Wurm.

> *(log)* *The floor buckles. Something huge is chewing through the rock beneath you.*

**After victory** (Goal 2):

> *(log)* *The Wurm's tunnel cuts straight down. Someone mapped it. There are chalk arrows.*

## Scene 3.4: The Kobold Foreman

**Trigger:** first encounter with the Kobold Foreman.

> *(narration)* A kobold in a hard hat, barking orders at a crew digging toward a glowing seam.
>
> **Kobold Foreman:** "No visitors! Shift's not done! Quota's not met!"
>
> **\[Fight\]**

**After victory** (Goal 3):

**CARD 1** (narration)

> The crew scatters. In the seam, half-dug, is a shard of star-glass the size of your fist.
>
> **\[Take it\]**

**CARD 2** (narration)

> The Foreman dropped a crumpled work order. Most of it is smudged. The seal is a small gold star.
>
> **\[Continue\]**

**CARD 3**

> **Wren:** "That's the Celestial seal."
>
> **Wren:** "Could be nothing. Mining guilds hire anyone."

**Journal note:** *First shard recovered. The kobolds were digging for it on Celestial orders.*

## Scene 3.5: Old Greta

**Trigger:** after the Kobold Foreman, with the Tavern repaired.

> **Old Greta:** "We've met. I'm the one who hollered when I saw your lamp was lit back up. I ran the counter at the general store before you were born. Before your aunt was, near enough."
>
> **Old Greta:** "Hire me. I know every haggler in this valley and every lie they tell."
>
> **\[Hire her\]** / **\[Not now\]**

**If declined,** Greta: "Suit yourself. I'll be at the Tavern telling everyone your prices." She stays on the hire board.

**Later, idle line (first time she's in the shop after Scene 3.5; if she isn't hired, she stops by the counter to say it):**

> **Old Greta:** "That Voss fellow came by. Funny thing. My mother did business with a Mister Voss. Same blue coat."
>
> **Old Greta:** "Must be his grandson. Spitting image."

## Scene 3.6: Bram and the Smithy

**Trigger:** Smithy repair complete. (The repair unlocks after the Kobold Foreman, since Bram reacts to the shard.)

**CARD 1** (narration)

> A big man with soot-black arms is already inside, kicking the forge like an old friend.
>
> **Bram:** "Left when the mine flooded. Heard the well came back. Figured the forge might too."
>
> **\[Continue\]**

**CARD 2**

> **Bram:** *(seeing the shard)* "Star-glass. Put a chip of that in the coals and they'll burn for a week."
>
> **Bram:** "Bring me ore and I'll make you something worth fighting with."

**Wren tip (first time on the gear upgrade tiers, highlighting Sharpen Blade, Reinforce Armor and Bigger Pack):** "Good steel means you come home. Spend here before you spend on pride."

## Scene 3.7: The Apothecary

**Trigger:** Apothecary repair complete.

> *(narration)* The jars are still labeled in Maribel's hand. Someone left a note on the counter: "Back soon. — M."
>
> **Wren:** *(long pause)* "She wrote that ten years ago."
>
> **Wren:** "Bombs, ropes, the good tonics. They're yours to make now."

→ **Customers 5 → 6 when both the Smithy and Apothecary are repaired.**

**New customer intro, first craftsperson:**

> **Craftsperson:** "Need copper, herbs, anything. Bram's got the whole street working again."

## Journal: Chapter 3 complete

> *One shard in hand. The forge is lit. Maribel's notes for the Ember Vault are shaky, like she wrote them in a hurry: "The Vault is not a vault. It's a door. Someone has been knocking."*

→ The Ember Vault unlocks (highlighting the Ember Vault). Chapter 4: What the Celestials Knew begins.

# Chapter 4: What the Celestials Knew

**Chapter goal:** the Ember Vault and second shard. The debt is revealed as a trap, Wren confesses, and Sable arrives.

**Unlocks:** Ember Vault, Market Square (special customer days), Watchtower (floor modifier preview), Sable. Customers 6 → 8 (Market Square) → 9 (Watchtower).

## Journal: Chapter 4 goals

1. Repair the Market Square
2. Defeat the Ember Knight in the Ember Vault
3. Defeat the Cinder Colossus in the Ember Vault
4. Repair the Watchtower
5. Make your third payment (15,000G)

Opening entry:

> *"The Vault is a door. Someone has been knocking." Maribel, what did you find down there?*

## Scene 4.1: Market day

**Trigger:** Market Square repair complete.

> *(narration)* Stalls go up overnight. Bunting. A fiddler. Hollowmere smells like bread again.
>
> **Pip:** "There's a man here who collects *spoons*. He has a spoon *bag*."
>
> **Wren:** "Collectors. They pay stupid money for shiny things. Be nice to them."

→ **Customers 6 → 8. Special customer days unlock (highlighting Market Today, which announces collector days).**

**Special customer days (defined):** every seventh day (days 3, 10, 17…) is a **collector day** at the Market Square: +2 customers, with collectors and nobles four times as likely to walk in. Market Today announces it.

**New customer intro, first collector (always the Spoon Man, a Collector regular):**

> **The Spoon Man:** "Good day! Any spoons? Silver, wooden, cursed, I'm not picky."

**Spoon Man timing (interpretation):** he's the first collector to walk in once the Market Square is repaired, on the first shop day when a collector visits and gems or trinkets are For sale. Collectors only buy those, so he waits until there's something on the shelf for him. Before then, no other collector takes his place. Saves that already had the Market Square before this change skip his intro, because collectors were already visiting.

## Scene 4.2: Into the Ember Vault

**Trigger:** first time entering the Ember Vault.

> **Wren:** "I was here once. Ten years ago."
>
> **Wren:** "Bring water. Bring more than you think."

**Log flavor (Ember Vault):**

- *The stone glows red at the seams, like coals breathing.*
- *Celestial banners, burned to rags, still hang from the walls.*
- *A rhythm in the floor. Slow. Like a heartbeat, far below.*
- *Scorch marks shaped like someone threw up their arms.*

## Scene 4.3: The Ember Knight

**Trigger:** first encounter with the Ember Knight.

> *(narration)* A knight in blackened Celestial armor, burning from the inside, guarding a cracked door.
>
> **Ember Knight:** "Turn back. He sent us. He always sends someone."
>
> **\[Fight\]**

**After victory** (Goal 2):

**CARD 1**

> **Ember Knight:** *(fading)* "Captain Holt… Celestial expedition. Voss paid us to dig. Not for gold."
>
> **Ember Knight:** "He asked about the deep places. The heat. How far down it goes."
>
> **\[Continue\]**

**CARD 2**

> **Ember Knight:** "Two climbers passed us. One in a red scarf. Heading up, toward the light. They didn't stop…"
>
> *(narration)* The fire in the armor goes out.
>
> **\[Continue\]**

**CARD 3**

> **Wren:** *(quiet)* "That was us. Maribel and me."

## Scene 4.4: Marlo's choice

**Trigger:** start of the day after Scene 4.3 (plays whether or not Marlo was hired; if he isn't on staff, he walks in from the Tavern).

**CARD 1**

> **Marlo:** *(closing the door behind him)* "I quit the Consortium this morning. Thought you should see why."
>
> *(narration)* He lays a contract on the counter. Maribel's loan.
>
> **\[Read it\]**

**CARD 2**

> **Marlo:** "See this clause? The interest doubles every season the shop is 'impaired.' They decide what impaired means."
>
> **Marlo:** "She was never meant to pay it off. They wanted the deed. Specifically the cellar."
>
> **Marlo:** "Maribel warded the deep door down there. It only opens for whoever holds the deed. With her missing, nobody could sign it over. So they waited for an heir."
>
> **\[Continue\]**

**CARD 3**

> **Wren:** "Why tell us?"
>
> **Marlo:** "Because I've been selling in this shop for weeks, and I like it here. And Voss scares me."

**If Marlo was never hired,** his last line becomes: "Because I've watched this shop from the Tavern for weeks, and I like what you've built. And Voss scares me."

**Journal note:** *The debt was a trap. Voss never wanted the coin. He wants the way down.*

**Marlo's description in the staff list (or on the hire board) now reads:** *Smooth talker · ex-Celestial.*

→ **Hollowmere Mutual opens** (Marlo, at a Tavern table, with town money). From now on, Grand Reopening startup loans come from it, whether or not Marlo is on staff.

## Scene 4.5: The offer

**Trigger:** Voss visits the day after Scene 4.4.

**CARD 1**

> **Voss:** "I hear you've been reading. Such an untidy habit."
>
> **Voss:** "Let's be civil. Sign over the cellar, and the Consortium forgives every coin."
>
> **\[Never.\]** / **\[Why do you want it so badly?\]**

**CARD 2a** (if "Never")

> **Voss:** "Lovely little town. It would be a shame if it were *repossessed*."

**CARD 2b** (if "Why")

> **Voss:** *(a pause too long)* "Sentiment. I'm very old-fashioned."

**CARD 3** (after he leaves)

> **Pip:** "Did anyone else notice his tea? He didn't drink it. He didn't drink it last time either."

## Scene 4.6: The Cinder Colossus

**Trigger:** first encounter with the Cinder Colossus.

> *(narration)* Behind the cracked door, a giant of slag and fire rises from a pool of molten rock. In its chest, a second shard burns white.
>
> **\[Fight\]**

**After victory** (Goal 3):

> *(narration)* The Colossus crumbles. The shard cools in your hand. Far below the pool, the rhythm you felt keeps beating.
>
> **Wren:** "That's not a monster down there. That's the mountain."

**Journal note:** *Second shard recovered. The Vault sits on something hot and deep. Voss wanted to know how deep.*

## Scene 4.7: Wren's confession

**Trigger:** returning to town after the Cinder Colossus.

**CARD 1**

> **Wren:** "I need to tell you something. About the last expedition."
>
> **Wren:** "We made it past this Vault. Up the Spire. Halfway. Then the light got too bright and I lost my hand to something I couldn't see."
>
> **\[Continue\]**

**CARD 2**

> **Wren:** "Maribel said go home. So I did. I turned back and she kept climbing."
>
> **Wren:** "I've told myself for ten years there was nothing I could do. I don't know if that's true."
>
> **\[It wasn't your fault.\]** / **\[Then let's finish the climb.\]**

**CARD 3** (either choice)

> **Wren:** "...Thank you. When the Spire opens, I'm coming with you. As far as I can."

## Scene 4.8: Sable arrives

**Trigger:** after Scene 4.7, with the Tavern repaired.

> *(narration)* A woman sits in the Tavern's darkest corner, hood up. When she looks up, her eyes catch the lamplight like a cat's, faintly silver.
>
> **Sable:** "I hear you're hiring. I can sell anything to anyone. I'd rather not talk about where I learned."
>
> **Wren:** *(flatly)* "No."
>
> **Sable:** "Then let your till decide."
>
> **\[Hire her\]** / **\[Not now\]**

**If declined,** Sable: "Then I'll keep my corner. You'll want me before the end." She stays on the hire board. Her idle lines only play if she's on staff.

**Idle lines (Sable in the shop):**

- "Your shards hum when the door opens. Did you know that?"
- "Don't stand near the cellar when a Celestial walks by."
- "I like this shop. Nobody here looks at me like a tool."

## Scene 4.9: The Watchtower

**Trigger:** Watchtower repair complete.

> **Wren:** "From up here you can see the whole valley. And the Spire."
>
> *(narration)* At the mountain's peak, a faint light flickers. Steady. Waiting. Like someone holding a lamp.

→ **Customers 8 → 9. Floor modifier preview unlocks (highlighting the Descend button's modifier the next time you find stairs).**

**Floor modifier preview (defined):** when you find stairs, the Descend button names the next floor's modifier (for example "Descend to floor 4 · Flooded", or "calm" when there is none).

## Journal: Chapter 4 complete

> *Two shards. One trap of a contract. One stranger with silver eyes. And a light at the top of the mountain that never goes out. Maribel's last legible note: "If it holds, the town holds. If it breaks, run."*

→ Chapter 5: Starfall begins.

# Chapter 5: Starfall

**Chapter goal:** climb the Spire, free Maribel, and watch it all go wrong. Sable's past and Voss's first crack.

**Unlocks:** Observatory (secret floor clues, relic lore, scholar customers), Starfall Spire (level 10).

## Journal: Chapter 5 goals

1. Repair the Observatory
2. Reach Level 10
3. Defeat the Prism Golem in the Starfall Spire
4. Make your final payment (40,000G, clears Maribel's debt)
5. Defeat the Astral Wyrm in the Starfall Spire

Opening entry:

> *"If it holds, the town holds." Whatever "it" is, it's at the top of the Spire. So is the light.*

## Scene 5.1: The Observatory

**Trigger:** Observatory repair complete.

**CARD 1** (narration)

> Brass telescopes, cracked lenses, and star charts pinned to every wall. Maribel's handwriting covers half of them.
>
> **\[Look closer\]**

**CARD 2**

> **Wren:** "She spent nights up here. Said the star didn't fall. It was *pulled*."
>
> *(narration)* One very old chart, older than the town, shows a gap in a constellation. A star went missing long, long ago. Beside it, in Maribel's hand: *"Two stars fell. Where is the first?"*
>
> **\[Continue\]**

**CARD 3**

> **Old Greta:** *(peering at a town record)* "Odd. Says here the Celestial Consortium was founded the year Hollowmere was."
>
> **Old Greta:** "No. Before. That can't be right."

→ **Secret floor clues and relic lore unlock (highlighting a relic's lore in your stock, and the hidden-stair hint the next time you reach a dungeon's last floor). Scholar customers appear.**

**Secret floor clues (defined):** on a dungeon's last floor, the hint reads "Maribel's star charts mark a hidden stair beyond the lair (X% chance)", and the Observatory adds +10% to the chance a hidden stairway opens after a boss.

**Relic lore (defined),** shown under each relic in your stock:

- **Mossglass Idol:** *Carved from moss-glass that grew where the first star-glass fell. Maribel kept one on her counter for luck.*
- **Golden Pickaxe:** *A miner's pick plated in star-gold. The Consortium paid well for these, then stopped asking where the gold came from.*
- **Phoenix Feather:** *Found in the Vault's deepest ash and warm forever. Scholars say it fell with the star.*
- **Fallen Star:** *A sliver of the first star, the one missing from the old charts. It hums a note no one can quite hear.*

**New customer intro, first scholar:**

> **Scholar:** "A relic from a secret floor? Name your price. No, truly, I have a grant."

## Scene 5.2: Sable's confession

**Trigger:** first time the player reaches Level 10. If Sable isn't on staff, she's waiting at the shop door when you get home.

**CARD 1**

> **Sable:** "The Spire's open now. Before you climb, you should know what I am."
>
> **Sable:** "The Celestials take orphans. They put us in a room with star-glass until our eyes change. Then we can feel shards through solid rock."
>
> **\[Continue\]**

**CARD 2**

> **Sable:** "They call us Starlings. Voss calls us 'instruments.' I ran. The safest place to hide was his blind spot: the town around a shop he was about to repossess."
>
> **Wren:** "...You could've told us."
>
> **Sable:** "You'd have thrown me out. You nearly did."
>
> **\[Continue\]**

**If Sable was declined,** her last line becomes: "You did turn me away. I don't blame you."

**CARD 3**

> **Sable:** "One more thing. Voss isn't a man. I've felt him the way I feel shards. He's *old*. Older than the mountain's monsters. He hums the same as the star."
>
> **\[What does he want?\]**

**CARD 4**

> **Sable:** "I don't know yet. But he doesn't want your coin. Never did."

→ **The Starfall Spire unlocks** (highlighting the Starfall Spire).

## Scene 5.3: Into the Starfall Spire

**Trigger:** first time entering the Starfall Spire.

> **Wren:** "I'll get you halfway. That's where I lost my hand last time."
>
> **Wren:** "Bring her home."
>
> **Sable:** "I'll climb with you. I can feel the shards up there, and whatever's holding the light."

**Log flavor (Starfall Spire):**

- *The air tastes like snow and lightning.*
- *Your shadow points the wrong way.*
- *Footprints in the crystal dust. A woman's boots, ten years old.*
- *A faded red scarf, tied to a ledge like a trail marker.*
- *The light above pulses slowly, like breathing.*

## Scene 5.4: The Prism Golem

**Trigger:** first encounter with the Prism Golem.

> *(log)* *A figure of living crystal turns toward you. Every facet shows a different you.*

**After victory** (Goal 3):

> *(log)* *The Golem shatters. In the shards of its body, the light above grows brighter, as if relieved.*

## Scene 5.5: Paid in full

**Trigger:** making the final payment.

**CARD 1** (narration)

> Voss comes himself to collect. He counts every coin. Slowly. Then he slides the cancelled contract across the counter.
>
> **\[Continue\]**

**CARD 2**

> **Voss:** "Paid in full. How quaint."
>
> **Voss:** "Keep the paperwork. I suspect I won't need your cellar's permission much longer."
>
> **\[Continue\]**

**CARD 3**

> **Sable:** *(after he leaves, pale; if she isn't on staff, she slips in from the street)* "He was happy. I've never felt him happy."

**Journal note:** *The debt is paid. The deed is clear. So why does it feel like we lost?*

## Scene 5.6: The Astral Wyrm

**Trigger:** first encounter with the Astral Wyrm. The summit floor stays sealed until Goals 1–4 are complete (Observatory, Level 10, Prism Golem, final payment).

**CARD 1** (narration)

> At the summit, the star rests in a crater of glass: a sphere of light, cracked and stitched together. Coiled around it is a serpent of starlight.
>
> **\[Continue\]**

**CARD 2** (narration)

> It doesn't attack. It raises its head between you and the star, and waits.
>
> **\[Fight\]**

## Scene 5.7: Maribel

**Trigger:** after defeating the Astral Wyrm.

**CARD 1** (narration)

> The Wyrm dissolves into light. The star's shell splits. Someone stumbles out of it and falls into the glass dust.
>
> **\[Run to her\]**

**CARD 2** (narration)

> Her hair is silver now. Her red scarf is gone. But you know her face from every page of the journal.
>
> **Maribel:** "...You've got my nose. Who—"
>
> **Maribel:** "Oh. Oh, you inherited the shop. I'm so sorry about the debt."
>
> **\[Continue\]**

**CARD 3**

> **Maribel:** "The star had been cracking since the night it fell. By the time I reached it, it was coming apart. I went inside to hold it together. If it shattered, the whole valley would've burned."
>
> **Maribel:** "The Wyrm guarded me. It was the star's guardian, keeping me safe while I kept it whole."
>
> **Maribel:** "It's whole enough now to hold without me. Barely."
>
> **\[Continue\]**

**CARD 4**

> **Maribel:** *(looking at the dissolving light, horror dawning)* "Wait. If the Wyrm is gone… then nothing's guarding it."
>
> **\[Continue\]**

## Scene 5.8: The theft

**Trigger:** immediately after Scene 5.7.

**CARD 1** (narration)

> Applause. Slow and polite. Voss steps out of the light as if he has always been standing there.
>
> **Voss:** "Ten years I waited for someone foolish enough to kill that guardian. Thank you, shopkeeper."
>
> **\[Continue\]**

**CARD 2** (narration)

> His skin splits along hairline cracks. Starlight leaks through. He reaches into the star and pulls out its burning heart.
>
> **Voss:** "Your aunt held this together for a decade. Admirable. She was simply keeping it warm for me."
>
> **\[Continue\]**

**CARD 3** (narration)

> The summit shakes. Voss drops through the crater floor like a falling star, straight down into the mountain.
>
> **Maribel:** "He's going down. All the way down. To the core."
>
> **Sable:** "And the fastest way into the deep is…"
>
> **\[…our cellar.\]**

## Journal: Chapter 5 complete

> *Maribel is home. Voss has the star's heart. He isn't a man. He never was. Maribel can barely stand, but she keeps saying the same thing: "The heat. He needs the heat."*

→ Chapter 6: The Long Way Home begins.

# Chapter 6: The Long Way Home

**Chapter goal:** rally the town, descend through the cellar to the core, and defeat Voss.

**Unlocks:** the Hollow Heart (final dungeon, entered through the shop cellar), Festival Grounds after the ending. Customers 9 → 10 (after the ending).

**Hollow Heart layout (defined):** 6 floors. Monsters come from every dungeon (Moss Beetle, Kobold Miner, Ash Wraith, Star Wisp) plus the Celestial Enforcer. The Celestial Executor guards floor 3. Reaching floor 6 plays Scene 6.5, then the Voss fight starts. After the ending, the floor 6 boss becomes **Echo of Voss**, refightable with the same three phases.

## Journal: Chapter 6 goals

1. Hold the war council (tap its button on this goal in the Journal)
2. Collect Bram's star-forged weapon (2 shards + 6 Ember Core, 6 Ore Chunk, 4 Stardust; +50% attack; made at Bram's forge in the Journal, below Ledgers)
3. Defeat the Celestial Executor in the Hollow Heart
4. Reach the bottom of the Hollow Heart
5. Defeat Voss in the Hollow Heart

Opening entry:

> *Voss is under our feet. Somewhere below the cellar, below the mines, below everything. Maribel says we have days, not weeks. Wren's gathering everyone at the shop. When I'm ready, I'll call the war council from this journal.*

→ **Tutorial prompt** (highlighting the Journal tab, then the **Hold the war council** button on Goal 1): Wren: "Everyone's coming to the shop. Open the **Journal** and call the war council when you're ready."

## Scene 6.1: The war council

**Trigger:** tapping the Hold the war council button on Goal 1 in the Journal.

**CARD 1** (narration)

> The shop is crowded for the first time in ten years. Not with customers. With friends.
>
> **\[Continue\]**

**CARD 2**

> **Maribel:** *(wrapped in a blanket by the counter)* "I saw his thoughts while he took the heart. He fell here, long before the town. His own kind cast him down."
>
> **Maribel:** "And the second star didn't fall on its own. He pulled it down. Fuel."
>
> **Maribel:** "He burns worlds to travel. The star's power and the heat of the core, together, are enough to launch him home."
>
> **Maribel:** "Before, he couldn't pass my ward or burn through the rock. With the heart, he can do both. That's how he went straight down."
>
> **\[And us?\]**

**CARD 3**

> **Maribel:** "The blast would scorch the whole world. Every field, every forest, every living thing."
>
> **Pip:** *(quietly)* "...Even the spoon man?"
>
> **Maribel:** "Even the spoon man."
>
> **\[Continue\]**

**CARD 4**

> **Bram:** "Then we stop him. Give me those two shards. I'll forge something that can cut starlight."
>
> **Marlo:** "The Consortium's vault key is still in my coat. Take whatever supplies you need."
>
> **Old Greta:** "I'll keep the shop open. If the world ends, it ends with the lamp lit."
>
> **Sable:** "I can feel him. I'll guide you down."
>
> **Wren:** "And I'm coming. All the way, this time."

→ **The cellar's deepest door opens. The Hollow Heart unlocks (highlighting the Hollow Heart), and Bram's forge appears in the Journal (highlighting the Bram's forge row).**

→ **Tutorial prompt** (highlighting **Bram's forge** in the Journal, below Ledgers): Bram: "Bring me 6 Ember Core, 6 Ore Chunk and 4 Stardust, and I'll fold your two shards into a blade. When you've got it all, find me at **Bram's forge** in the Journal, under the Ledgers."

## Scene 6.2: The star-forged weapon

**Trigger:** Goal 2 complete.

> **Bram:** "Two shards, folded into steel. It's warm. Like holding a hand."
>
> **Maribel:** "That's the star. It remembers us. It wants him stopped too."
>
> **Maribel:** "There's a little of its light left in me. Not much. I'm saving it for the end."

**Wren tip:** "Nobody's ready for this. Go anyway."

**Collecting the weapon:** a "Bram's forge" row appears in the Journal, below Ledgers, after the war council. It lists the materials still needed and shows a Forge button once they're all in hand. It uses up both shards and the materials, and the blade stays through every Grand Reopening. After forging, the row stays in the Journal, marked Forged with a check, the way repaired buildings are. While delving, "Star-forged blade:" shows under the HP bar with "Attack +50%" on the line below. Any other attack bonus (Whetstone, shrine) shows beneath it as "Other:" with its own "Attack +X%" line; without the blade, that bonus shows as just "Attack +X%".

## Scene 6.3: Into the Hollow Heart

**Trigger:** first time entering the Hollow Heart (through the shop cellar).

> *(narration)* Past the Mossy Cellar. Past where the rats nested. Past a door you never noticed. Maribel's ward on it has gone dark, its starlight stolen with the heart.
>
> **Sable:** "He's straight below us. He isn't even hiding anymore."
>
> **Wren:** "Maribel's note. 'Someone has been knocking.' That was his crews, at this door, for years."

**Log flavor (Hollow Heart):**

- *Every dungeon you've known, layered like rings in a tree: moss, then mine, then ember, then glass.*
- *A trail of starlight scorched into the rock. Above it, the child's drawing of the falling star, signed "PIP" in big wobbly letters.*
- *The heartbeat in the floor is fast now. Frantic.*
- *Celestial banners, brand new. His crews have been digging toward this door for years.*
- *Wren hums one of Maribel's old marching songs, off key.*
- *The heat bends the air until the walls ripple.*

## Scene 6.4: The Celestial Executor

**Trigger:** first encounter with the Celestial Executor (mini-boss).

> *(narration)* A towering figure in gold armor, a Celestial seal for a face, blocks a bridge over a river of magma.
>
> **Celestial Executor:** "The Guildmaster's departure is scheduled. Your attendance is not."
>
> **\[Fight\]**

**After victory** (Goal 3):

> **Sable:** "Its armor's hollow. No one was ever inside. Just his will."

## Scene 6.5: The core

**Trigger:** reaching the final floor of the Hollow Heart. The final floor stays sealed until Bram's star-forged weapon is collected (Goal 2).

**CARD 1** (narration)

> A cavern of white-hot stone. At its center, the star's heart floats above a well of molten light that reaches down forever. Voss stands before it in his blue coat, hands folded.
>
> **\[Continue\]**

**CARD 2**

> **Voss:** "Ah. The shopkeeper. Did you come to collect?"
>
> **Wren:** "We came to stop you. All those years in that blue coat, drinking tea you never touched, smiling at our counters. Hiding among us."
>
> **Voss:** "You think I *hid* among you? I *farmed* you. Ten thousand years, and every one of your kind has been a candle waiting to be lit."
>
> **\[You're not going home.\]** / **\[What are you?\]**

**CARD 3a** (if "You're not going home")

> **Voss:** "I have been told that by better than you. They are ash now."

**CARD 3b** (if "What are you?")

> **Voss:** "A star, child. One that learned it could feed. My kind called it a crime. I called it travel."

**CARD 4**

> **Voss:** "Enough. The heart is ready. The core is hot. And you are standing in my doorway."
>
> **\[Fight\]**

## Scene 6.6: The final battle

**Phase 1 — The Guildmaster**

> *(log)* *Voss fights like a banker: summoning Celestial enforcers and flinging gold coins that cut like knives.*
>
> **Voss:** "Your aunt's interest was compounding. So is mine."

*(gameplay: every third turn a Celestial enforcer joins in for an extra half-strength hit; combat is one enemy at a time, so summons are extra hits rather than separate enemies. Every few turns he winds up a coin storm for double damage, which Guard blocks.)*

**Phase 2 — The Unmasking** (at 66% HP)

> *(log)* *His skin cracks. Starlight pours through. He draws power from the floating heart.*
>
> **Voss:** "Do you feel that? That's your world getting warmer."
>
> **Sable:** "He's linked to the heart. I can feel the thread. I'll pull!"
>
> *(gameplay: each turn Voss heals from the heart, starting at 7% of his HP and dropping by 1.5% a turn as Sable pulls the thread, until it reaches zero; heals can't lift him back above 66%)*

**Phase 3 — The Fallen Star** (at 33% HP)

> *(log)* *The coat burns away. What's left is a shape of white fire and broken light, too bright to look at.*
>
> **Voss:** "This world is kindling. Nothing more."
>
> *(gameplay: magma vents erupt every other turn for 6% of your HP, which Guard can't block; on the turns between, starfire gathers overhead and crashes down next turn for 15% of your HP, or 4% if you Guard)*

## Scene 6.7: Victory

**Trigger:** Voss defeated.

**CARD 1** (narration)

> The star-forged blade strikes true. Voss screams in a voice like a kettle the size of a mountain.
>
> **Voss:** "I have burned brighter worlds than this—"
>
> **Wren:** "Not this one."
>
> **\[Continue\]**

**CARD 2** (narration)

> Far above, Maribel opens her hand. The last starlight in her drifts down through stone and dirt and roots, and settles over Voss like a blanket of snow.
>
> When it lifts, there is only a small, dark, cold stone where he stood.
>
> **\[Continue\]**

**CARD 3** (narration)

> The star's heart dims to a gentle glow, then slowly sinks into the core. The heartbeat in the floor slows. Then calms.
>
> **Sable:** "He's gone. I can't feel him anywhere."
>
> **Wren:** "Good. Let's go home. The long way. I want to enjoy it."

## Epilogue: The Festival of Lights

**Trigger:** returning to town after Voss. Festival Grounds unlock automatically.

**CARD 1** (narration)

> Hollowmere throws its first festival since the star fell. Lanterns line every street. The spoon man brought a spoon for everyone.
>
> **\[Continue\]**

**CARD 2** (narration)

> The Celestial Consortium's office stands empty. The gold star on its door has gone dull and gray. Marlo hangs a sign on it: **FOR RENT. NO GUILDS.**
>
> **\[Continue\]**

**CARD 3**

> **Maribel:** *(on the shop step, silver hair in the lantern light)* "I can't climb anymore. Can barely walk to the well. Turns out holding a star together for ten years takes it out of you."
>
> **Maribel:** "But the lamp's lit. The doors are open. You did that."
>
> **\[Continue\]**

**CARD 4**

> **Wren:** "So. What now, shopkeeper?"
>
> **\[Open the shop.\]**

→ **Customers 9 → 10. Festival Grounds unlock (post-game cosmetics, festival days; highlighting the Shop colors (Festival Grounds) section in the Journal). The Hollow Heart stays open as a post-game dungeon.**

**Festival Grounds (defined):** every seventh day is a **festival day**: +3 customers and +10% customer budgets. The post-game cosmetics are three shop color themes, chosen in the Journal: Lantern (the original teal and copper), Festival (crimson and lantern gold) and Starlight (midnight blue and silver).

## Journal: The End

> *The debt is paid. The star is sleeping. The man in the blue coat is a cold stone in the deepest dark, and Sable checks on him once a month just to be sure.*
>
> *Maribel sits by the counter most days now, haggling with customers and winning. Pip still sweeps. Wren still says "don't get used to it."*
>
> *Whoever reads this next: keep the doors open. Keep the lamp lit. And don't sell the cellar.*

# Post-game: Endless Goals

**Trigger:** tapping **\[Open the shop.\]** at the end of the Epilogue.

**Journal quest section:** the chapter card no longer says "Chapter 6: The Long Way Home". Where the chapter title normally sits, it reads **Storyline Complete!**, with "Goals completed: N" underneath. Past chapters and the Journal: The End entry stay readable in the Journal log below.

**How it works:**

- Three goals are active at once, each on its own row with a progress bar (for example "Sell 12 items · 7 / 12") and its reward.
- Each goal completes on its own: a small pop-up says "Goal complete! +\[reward\]", and a new goal replaces it at once. No two active goals share a type.
- Every completion raises the **goal tier** by 1. Each tier makes targets about 15% bigger (rounded), so goals never run out and keep pace with the player.
- Goals, their progress, the tier and the completed count all carry through every Grand Reopening.

**Goal pool** (starting targets at tier 1):

| Type | Goal |
| --- | --- |
| Delve | Defeat 15 monsters in any dungeon |
| Delve | Reach floor 4 of \[a random dungeon\] |
| Delve | Defeat any boss (Echo of Voss counts) |
| Delve | Find a hidden stairway |
| Shop | Sell 10 items |
| Shop | Haggle 5 sales above market value |
| Shop | Earn 2,000G from sales in one day |
| Shop | Sell to 3 collectors (the Spoon Man counts double) |
| Craft | Craft 5 items in the Workshop |
| Craft | Craft 3 bombs or whetstones |

**Rewards:** 1,000G at tier 1, plus 250G per tier after that. Every 5th completion also gives a materials bundle (2 Ember Core, 2 Ore Chunk, 1 Stardust). Every 10th completion gives 1 Reputation star, spent like any other.

→ **Tutorial prompt** (highlighting the Journal tab, then the Storyline Complete! card): Wren: "Story's done. The shop isn't. There's always more to do. Check the **Journal**."

**Settled while building:** "type" means the Type column, so one Delve, one Shop and one Craft goal are always active; a finished goal is replaced by a different goal of the same type. Counts and the floor scale with the tier (the floor stops at that dungeon's deepest floor), and gold targets round to the nearest 50G. A goal's reward uses the tier it was given at. Sales by staff and Quick Sale count toward selling and daily earnings; haggling and collector goals count only sales you make at the counter. Saves that finished the game before this update start with three tier-1 goals and see Wren's prompt once.

# Grand Reopening

**Available:** any time after the Town Well is repaired (Ch2).

**What persists:** Journal, chapter progress, repaired buildings, recruited staff, Maribel's debt and every payment made on it, and story items (star-glass shards, Bram's star-forged weapon). **What resets:** shop gold, stock, gear upgrades, level, and the startup loan (each reopening takes a new one). Reputation perks are earned as normal.

**Also resets (settled):** skills, materials, belt supplies and boss trophies are lost too. You reopen with the startup loan's cash plus any Family Fortune bonus, an empty stockroom, and the day moves forward by one.

**Reputation (settled): Grand Reopening replaces the old Retire and Legacy system.** Each reopening earns Reputation stars: one per boss beaten since the last reopening, plus sales stars (the first at 1,500G sold, each after that taking more). Stars buy permanent perks that carry through every reopening:

| Perk | Effect per rank | Max rank |
| --- | --- | --- |
| Family Fortune | +250G on top of the startup loan | 5 |
| Seasoned | +10% XP from everything | 5 |
| Heirloom Gear | +10% attack and max HP | 5 |
| Renowned Name | +5% customer budgets | 5 |
| Packrat | +2 pack space | 3 |
| Lucky Finds | Rarer loot | 3 |
| Head Start | +2 bonus skill points | 3 |

Old Connections (customers) and Loyal Staff (staff now always stay) were removed, and stars spent on them were refunded. The Legacy tab is gone; Reputation lives in the Journal.

**Gating note:** story gates check goal flags, not current level. Once "Reach Level 10" is complete, the Starfall Spire stays open after a Reopening.

**Debt note (two ledgers):** Maribel's debt is story-only and never resets. Each payment goal has a fixed amount that grows by chapter (1,000G, 5,000G, 15,000G, 40,000G; 61,000G in all), payments made stay made, and the Ch5 final payment always clears it. Each Grand Reopening instead takes a **startup loan**, not secured against the deed. The cash grows with the story: 500G in Ch2, 1,500G in Ch3, 4,000G in Ch4, 10,000G in Ch5 and 15,000G in Ch6 and after the ending. The lender charges interest on top: the Celestials 50%, Hollowmere Mutual 25% ("low interest"). So a Ch3 loan is 1,500G in hand and 2,250G to repay. The player repays it manually, in any amount, from the Journal (Pay → Startup loan), kept separate from Maribel's debt. It has no payment goals and never replays a story scene, but until it's cleared, payments on Maribel's debt and the next Grand Reopening are locked (a chapter's payment goal waits until it's repaid). The Journal shows it on its own line: *Startup loan: 2,250G left · borrowed 1,500G at 50% interest.* The lender depends on story progress: the Celestials from Ch2 until Scene 4.4, then Hollowmere Mutual (Marlo, from a Tavern table), then Hollowmere Mutual in the old Consortium office after the ending.

## Reopening confirmation

> **Wren:** "Close up tonight? Sell it all, borrow what it takes, start fresh. Town stays. Staff stays. You'll be rusty, but folk will remember the name."
>
> **\[Close up shop\]** / **\[Not yet\]**

**If the startup loan isn't repaid** (shown when trying to reopen or pay Maribel's debt, highlighting the Startup loan row under Ledgers in the Journal), Wren: "Clear the last loan first. One debt at a time."

## The reopening

**CARD 1** (narration)

> The shelves go bare. The till goes empty. You sweep the floor yourself, then sit on the step until the lamp is the only light on the street.
>
> **\[Continue\]**

**CARD 2**

> **Wren:** "Feels strange, doesn't it? Empty shelves, full town."
>
> **Wren:** "You've gone soft behind that counter. Grab a stick. The cellar won't clear itself."
>
> **\[Open the doors\]**

**CARD 3a** (startup loan, Ch2 until Scene 4.4)

> *(narration)* A Celestial courier is waiting at dawn with fresh papers. A small gold star is pressed into the seal.
>
> **Voss:** *(in a note)* "A grand reopening! The Consortium is delighted to extend further credit. We do so love a long relationship."
>
> **\[Sign\]**

**CARD 3b** (startup loan, from Scene 4.4 on)

> **Marlo** *(before the ending)***:** "Hollowmere Mutual. The office is a Tavern table for now. No stars, no clauses."
>
> **Marlo** *(after the ending)***:** "Hollowmere Mutual, open for business. Low interest, no stars, and the town always gets paid back."
>
> **\[Sign\]**

**Variant lines by chapter** (replace Wren's second line from Ch4 on; Ch2–3 use the default line above):

- **Ch4:** "The Celestials are watching. Let them watch us start over and not flinch."
- **Ch5:** "The Spire's still open. Someone up there is still waiting."
- **Ch6:** "No time for a slow start. Voss is under our feet."

## Reopening (after the ending)

> **Maribel:** *(from her chair by the counter)* "A grand reopening! First lesson, all over again: a customer's mood can lie, but their feet never do."
>
> **Wren:** "That's *my* line."
>
> **Maribel:** "You stole it from me in the first place."

## Journal entry for each reopening

> *Grand Reopening No. \[N\]. The shelves are bare again, and the doors are open. Keep the lamp lit.*

→ **Tutorial prompt** (first reopening only, highlighting Reputation and the Startup loan row under Ledgers in the Journal): Wren: "Folk remember a good name. Spend your stars in the **Journal**, and pay off the startup loan there too."

**Replay rule (interpretation):** the confirmation and the reopening cards (1, 2 and 3a or 3b) play on every reopening, since each reopening is its own event. The post-ending Maribel and Wren scene plays once, on the first reopening after the ending. After the ending, Wren's second line on Card 2 uses the default line.

# Haggling

Every customer names an opening offer, and the player can **Accept**, **Haggle**, or **Let them walk**. Their mood (Eager, Keen, Fair, Thrifty) and body language hint at their limit. Their haggling style is hidden, so pushing for more is always a gamble.

Customers only choose stock marked **For sale**. Items marked **Keep** never receive an offer, including from returning customers, and are not selected as automatic sweeteners during a haggle.

## Haggling styles

| Style | Share of customers | Opening offer | Patience | Counter-offers | Comes back after walking |
| --- | --- | --- | --- | --- | --- |
| Straight shooter | 25% | Their exact limit | 2 | None: "I said my price." | 15% |
| Haggler | 30% | 65–80% of their limit | 4 | Generous, rising to 88–98% of their limit | 50% |
| Bluffer | 25% | 80–90% of their limit | 3 | Normal, 85–97% of their limit | 55% |
| Impulse buyer | 20% | 85–95% of their limit, which is 10% higher than usual | 1 | Normal | 25% |

The Calm Presence skill still adds patience on top.

**Style lines** (said with the opening offer):

- **Straight shooter:** "I don't haggle. That's my price." / "That's a fair number. It's the only number."
- **Haggler:** "Let's dance, shall we?" / "Opening bid. You know how this goes."
- **Bluffer:** "Take it or leave it." / "Final offer. Probably." Six times in ten, a bluffer uses a straight shooter's line instead.
- **Impulse buyer:** "Quick, before I talk myself out of it!" / "I need it. Now. How much?"

## Insults and suspicion

- Asking more than 130% of their limit is an insult: "That's an insult!" It costs 2 patience instead of 1.
- Dropping your ask more than 20% below your last ask makes them suspicious. Their counter-offers stop rising for the rest of the haggle.

## Let them walk

"Refuse sale" becomes **Let them walk**. Depending on their style, a customer may come back after the day's last customer with a better offer (90–98% of their limit) and 1 patience. Let them walk again and they're gone for good. Customers who run out of patience never come back.

## Regulars

About a third of customers are named regulars, as long as one of that type hasn't already visited today. Each regular keeps the same haggling style forever. After the first visit, the game shows it ("You know their style: Haggler").

- **Fair deal:** selling at no more than 105% of market value earns +1 trust.
- **Gouging:** selling at 95% or more of their limit and above 115% of market value costs 1 trust.
- **Effect:** trust runs from −3 to +3, and each point changes that regular's budget by 5% on later visits.
- Regulars and their trust carry through every Grand Reopening.

| Customer type | Regulars |
| --- | --- |
| Village Kid | Little Wick, Pell and Posy |
| Townsfolk | Old Tam, Widow Hessa, Farmer Bix |
| Adventurer | Kesta the Bold, Brother Ulm, Rook |
| Traveler | Jory the Peddler, Saska from the next valley |
| Craftsperson | Ilse the cooper, Dob the tanner |
| Collector | the Spoon Man, Madame Orsolya |
| Noble | Lord Fenwick |
| Scholar | Professor Quill |

## Pitch (once per customer, while haggling)

- **Talk it up:** costs 1 patience, with a 60% chance their limit rises 5–10%.
- **Throw in a sweetener:** give away your cheapest item worth no more than half the sale item's value. Their limit rises by 1.5 times its value, up to +15%. The sweetener is gone even if they don't buy.

The mood badge shows their limit as it was when they arrived, so a pitch doesn't reveal anything new.

**Combo:** accepting a straight shooter's opening offer counts as a great price, since it's their limit, so it builds the haggle combo.

## Skills to read customers (Merchant branch)

| Skill | Max rank | Effect |
| --- | --- | --- |
| Read the Room | 3 | 30% chance per rank to see a new customer's haggling style when they arrive ("You read them: Bluffer"). It sees through bluffers. |
| Poker Face | 2 | 25% chance per rank that a turned-down offer costs no patience. An insult still costs at least 1. |

Regulars whose style you already know are shown as known, whatever your skills.

## New Wren tips (one-time pop-ups)

- **First insult:** "Ask double and they'll take it personal. That's two strikes, not one."
- **First suspicious customer:** "Drop your price that fast and they figure it was never worth it."
- **First customer who comes back:** "Told you. Let 'em walk and some come crawling back."
- **First regular:** "That's one of the regulars. They remember how you treat them."
- **First pitch:** "Talking it up works on dreamers. Misers just get bored."

# Town building summary

| Building | Chapter | Repair cost | Unlocks | Base customers a day |
| --- | --- | --- | --- | --- |
| Start | Ch1 | — | Core loop | 3 |
| Town Well | Ch2 | 300G + 3 Moss Fiber + the star-glass | Townsfolk, Grand Reopening | 4 |
| Tavern | Ch3 | 600G + 4 Scrap Iron + 3 Moss Fiber | Hire board, travelers | 5 |
| Smithy + Apothecary | Ch3 | Smithy 900G + 6 Ore Chunk + 4 Scrap Iron; Apothecary 700G + 4 Slime Gel + 3 Moss Fiber | Gear tiers, advanced crafting, bombs/ropes/potions, craftsfolk | 6 |
| Market Square | Ch4 | 2,000G + 6 Ore Chunk + 4 Ember Core | Special customer days, collectors | 8 |
| Watchtower | Ch4 | 2,500G + 6 Ember Core | Floor modifier preview | 9 |
| Observatory | Ch5 | 5,000G + 8 Ember Core + 6 Ore Chunk | Secret floor clues, relic lore, scholars | 9 |
| Festival Grounds | Ending | Free (opens with the Epilogue) | Cosmetics, festival days | 10 |

**Customers a day (settled):** the town sets a base, not a hard cap, so future skills or upgrades can add to it. The old More Shelves upgrade, Showman skill and Old Connections perk were removed. Collector days (+2) and festival days (+3) add on top of the base.

**Customer types by building:** at the start, adventurers and village kids; townsfolk with the Well; travelers with the Tavern; craftsfolk once the Smithy and Apothecary are both repaired; collectors and nobles with the Market Square; scholars with the Observatory, who prefer secret-floor relics.

**Staff unlocks:** Pip (Ch2) · Marlo (Tavern, Ch3) · Old Greta (Kobold Foreman + Tavern, Ch3) · Sable (Cinder Colossus + Tavern, Ch4).

**Optional hires:** Marlo, Old Greta, and Sable can each be declined. Anyone not on staff stays in town (on the Tavern hire board, hireable later) and still appears in every story scene, walking in from the Tavern or the street. Only idle lines and shop sales need them on staff (one exception: Greta's Voss idle line plays at the counter either way). Pip is the one required hire, since he's part of the Chapter 2 tutorial.

**Several staff at once (interpretation):** the script has more than one person "on staff", so hired staff work as a team. On each delve day each staff member serves their own customers, selling up to their own daily limit. Staff aren't bound by the shop's customers a day: that base only limits the player's own shop days. Each staff member sees at most 2 customers beyond their daily limit who balk at the price or find nothing they want. Each sale goes to a staff member picked at random from those still under their limit, weighted toward later hires and higher levels: Pip 1, Marlo 2, Old Greta 3, Sable 4, plus 1 for each level above 1 (so at equal levels they sell about 10/20/30/40% of items, and a level 5 Pip outsells a level 1 Sable). Better sellers also talk customers into more: a customer's budget stretches by 6% per hire after Pip and 3% per staff level, so the pricier staff don't lose most of their customers. One shopkeeper costs their normal wage; each shopkeeper after the first multiplies the entire team's payroll by another 1.5× (1× / 1.5× / 2.25× / 3.375× for one through four staff).

**What each shopkeeper sells (defined):** each staff card has a **Sells** row with the Market Today categories (Weapons, Armor, Potions, Trinkets, Gems) plus Supplies. All are on by default; tapping one turns it off or back on, and at least one always stays on. A shopkeeper only sells items marked For sale in their chosen categories, and the choice stays until the player changes it. If nothing For sale fits any shopkeeper's categories, the staff take the day off and no wages are paid.

**Staff levels (defined):** staff level from 1 to 100 by their lifetime sales.

- **Levels 1–5 are unchanged:** 12 sales each, +3% price a level, and +1 daily sale at levels 3 and 5.
- **From level 5 on:** each level takes 2.5% more sales than the last. That's 12 for level 6, about 36 a level around 50 and about 120 for level 100: roughly 1,000 lifetime sales for level 50 and 4,600 for level 100.
- **Rewards per level after 5:** +0.5% of market value. A level 100 Sable asks about 180% of market.
- **Every tenth level (10, 20 … 100):** +1 sale a day.
- **Customers keep up:** past level 5, a staff member's budget stretch grows with their price, so higher levels don't make customers walk away more often.
- **Who gets a sale:** level weight is +1 a level up to 5, then +0.1 a level.
- **Catching thieves:** the chance keeps rising slowly, up to 90%.
- **Staff card:** shows progress within the current level ("9 / 19 sales to level 24") with a separate lifetime count ("Lifetime: 326 sold").
- **Old saves:** staff whose lifetime sales already pass level 5 get their higher level right away.

**New content needed in-game:** Celestial Executor (mini-boss) and Voss (final boss, three phases) in the Hollow Heart, entered through the shop cellar.

## Notes for the game chat

- Story debt payments (`[X]G`) grow by chapter: 1,000G, 5,000G, 15,000G and 40,000G, 61,000G in all, sized to each chapter's earnings. The Grand Reopening startup loan (`[Y]G`) scales with the story (500G to 15,000G) and carries interest (Celestials 50%, Hollowmere Mutual 25%). The Chapter 1 journal shows the real balance, 61,000G.
- In Chapter 1, the gold star on the seal and "patient" are the only Celestial hints, intentionally subtle.
- "It's still warm" foreshadows both Maribel inside the star and Voss's need for heat.

### Decisions settled while building the game

- **Fainting:** you lose everything found that run (items and materials) plus 10% of your total gold (everything you're carrying, not just what you found that run) on floor 1, +5% per floor deeper, up to 50% on a secret floor. Wren's line in Scene 1.2 now says so.
- **Customers a day:** buildings set a base, not a cap; More Shelves, Showman and Old Connections were removed (see the Town building summary).
- **Retire and Legacy:** replaced by Grand Reopening and Reputation (see Grand Reopening).
- **Grand Reopening also resets** skills, materials and belt supplies.
- **Building gates:** the Smithy gates gear above level 3 and tier 3–4 recipes; the Apothecary gates bombs, ropes and the better potions (see Chapter 3).
- **Undefined parts the game now defines:** collector days, festival days, shop color themes, relic lore, the Hollow Heart layout, Bram's blade, Voss's phase mechanics and every repair cost, each noted where it appears above.

### Interpretations

- **"Clear Floor 1"** means finding the stairs down on floor 1 of the Mossy Cellar.
- **Chapter 1 goal reveals:** the script says when Goals 1 and 2 appear. In the game, Goal 3 appears after the first shop day, Goal 4 after the first sale or Workshop visit, and Goal 5 once Goal 1 is done.
- **The letter (Scene 1.7)** arrives at the start of the next day, as the script says. Settled: it waits for the next morning in town, so it never interrupts a delve or a sale, and the overnight pause gives it weight.
- **Several staff at once** each serve their own customers on a delve day, up to their own daily limits, not the shop's customers a day (see the Town building summary).
- **"Hold the war council"** completes when Scene 6.1 plays. Bram's weapon is collected from the Journal.
- **Reaching floor 6 of the Hollow Heart** plays Scene 6.5, and its last Fight button starts the Voss battle.
- **Voss's Phase 1 enforcers** are extra hits, because combat is one enemy at a time.
- **Reopening cards** play every reopening; the post-ending Maribel scene plays once.
- **After the ending,** the Hollow Heart boss is Echo of Voss, since Voss is now a cold stone.
- **Stage directions** such as "if he isn't on staff, he walks in from the Tavern" appear as short asides on the speaker's line, not as new narration.
- **Existing saves** count Chapter 1 as done and start at Voss's letter. Deeper dungeons lock again until the story opens them.

### Balance

The old monster scaling made the Astral Wyrm unwinnable at any gear level, and the story requires beating it. Monster HP and attack now scale separately from gold rewards. In simulations, a build that fits each chapter wins, and one a level and a gear rank weaker usually loses:

| Boss | Fitting build | Win rate |
| --- | --- | --- |
| Slime Monarch | Level 4, gear 2 | 99% |
| Kobold Foreman | Level 6, gear 3 | 95% |
| Cinder Colossus | Level 9, gear 5 | 98% |
| Astral Wyrm | Level 12, gear 7 | 87% |
| Voss | Level 14, gear 8, star-forged blade | 68% |
