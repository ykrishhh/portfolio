# Research: Funky Security / Reverse-Eng Heading Grounding

## Key findings (real, 2025–2026)

1. **Fault injection / glitching is the punk-rock edge of hardware security.**
   - RP2350 Hacking Challenge: IOActive extracted antifuse secrets via Focused Ion Beam passive voltage contrast; courk built a ~$300 laser fault-injection rig to bypass secure boot [1][2].
   - Reolink Lumus Pro: glitching the bootloader (solder DO→GND) to dump firmware [3].
   - CH55x firmware extractor: timing attack over UART (verify cmd returns early on first wrong byte) [4].
   - LayerOne 2025 GLiTCh BadgE: RP2040 + iCE40 FPGA + voltage glitcher + crowbar [5].
   - *Heading metaphor source: "glitch", "extract", "fault", "badge", "silicon".*

2. **Loader-metadata exploitation is elegant, not brute.**
   - ret2dso: Full RELRO bypass by corrupting already-loaded DSO `link_map` metadata — "the dynamic linker is one of the most trusted components... by forging the metadata it reads, we turned that trust into total compromise" [6].
   - ret2dlresolve overlapping-ELF-struct technique: "two carefully crafted binary payloads... no leaks, no gadget chains" [7].
   - *Heading metaphor source: "trust", "metadata", "forge", "linker".*

3. **Side-channel: you can see a key in a voltage graph.**
   - ChipWhisperer CPA/DPA on STM32: full AES-128 key recovery from power traces [8].
   - *Heading metaphor source: "trace", "leak", "signal".*

4. **Embedded/IoT: everyday devices, real attack surface.**
   - Echo Show 8 (3rd gen): eMMC tap + UART to root [9].
   - ESP32 BLE OTA exploitation [from prior project list].
   - *Heading metaphor source: "chip", "device", "root".*

5. **Through-line:** all funky work is *physical and visible* — glitch pulses, solder joints, power traces, LED badges. Maps to the CRT/telemetry/brutalist hero. The site should feel like a workbench oscilloscope, not a SaaS landing page.

## Voice constraints (anti-slop, from stop-slop skill)
- Directness high, rhythm varied (avoid 3-item "X, Y, and Z" lists in the heading), no em-dash, no quotable/clever-cliché lines, specific not vague.
- Current heading "I break systems so they can't break you." = cliché "break you" phrasing → rejected by user.

## Citations
[1] IOActive. "RP2350 Hacking Challenge" (FIB/PVC antifuse extraction). 2025.
[2] courk. "Laser Fault Injection on a Budget: RP2350 Edition." courk.cc, 2025-01-14.
[3] Diogo. "Glitching Reolink Lumus Pro to Dump the Firmware." diogoblog.com, 2025-12-06.
[4] finngineering. "ch55x_firmware_extractor" (UART timing attack). GitHub, 2025-12-18.
[5] charlie-x. "LayerOne 2025 GLiTCh BadgE" (RP2040 + iCE40 + voltage glitcher). GitHub.
[6] lowlevel.re. "ret2dso: Runtime Ret2dlresolve Under Full RELRO." 2026-01-26.
[7] byteco.dev. "Weaponizing Integer Carry: ret2dlresolve with Overlapping ELF Structures." 2026.
[8] morchidy. "Hardware-Security-Labs" (ChipWhisperer CPA/DPA on STM32F303). GitHub, 2025-26.
[9] Posch, M. "Hacking Amazon Echo Show 8 3rd Gen Via UART And EMMC." Hackaday, 2026-07-08.
