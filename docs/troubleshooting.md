# ESP32 Security Troubleshooting Guide

Common issues and solutions when working with ESP32 security modules and peripherals.

---

## 1. SPI/I2C Initialization Failures

### HSPI/VSPI Pin Conflicts

The ESP32 has three SPI peripherals: FSPI (used by flash), HSPI, and VSPI. HSPI and VSPI share overlapping GPIO pins with I2C and other peripherals.

**Common conflict:** Using HSPI for NRF24L01 while I2C sensors are on the same pins.

```cpp
// Pin mapping (ESP32 default)
// HSPI: MOSI=13, MISO=12, SCLK=14, SS=15
// VSPI: MOSI=23, MISO=19, SCLK=18, SS=5

// SOLUTION: Use alternative pins and explicit SPI initialization
#include <SPI.h>

// Define custom SPI pins to avoid conflicts
#define NRF_MOSI  23
#define NRF_MISO  19
#define NRF_SCK   18
#define NRF_SS    5
#define NRF_CE    4
#define NRF_CSN   15

SPIClass *spiNRF = new SPIClass(VSPI);  // Use VSPI instead of HSPI

void setup() {
    spiNRF->begin(NRF_SCK, NRF_MISO, NRF_MOSI, NRF_SS);
    // Verify SPI is working
    if (!SPI.begin()) {
        Serial.println("SPI initialization failed!");
        // Check pin availability
        Serial.printf("Pin %d in use: %d\n", NRF_MOSI, digitalPinCanOutput(NRF_MOSI));
    }
}
```

**Debugging SPI:**
```cpp
// Test SPI communication
void testSPI() {
    byte testByte = 0xA5;
    digitalWrite(NRF_SS, LOW);
    byte received = spiNRF->transfer(testByte);
    digitalWrite(NRF_SS, HIGH);
    
    if (received == testByte) {
        Serial.println("SPI loopback OK");
    } else {
        Serial.printf("SPI loopback FAIL: sent 0x%02X, got 0x%02X\n", testByte, received);
    }
}
```

### I2C Address Conflicts

Multiple I2C devices can have overlapping addresses (e.g., 0x3C for OLED and AHT20 sensor).

```cpp
#include <Wire.h>

void scanI2C() {
    byte count = 0;
    for (byte addr = 1; addr < 127; addr++) {
        Wire.beginTransmission(addr);
        if (Wire.endTransmission() == 0) {
            Serial.printf("Found device at 0x%02X\n", addr);
            count++;
        }
    }
    Serial.printf("Total devices: %d\n", count);
}
```

---

## 2. NRF24L01 Connection Issues

### Power Supply Problems

The NRF24L01 requires a **stable 3.3V supply** with low noise. Drawing power from ESP32's 3.3V regulator is unreliable for RF communication.

**Solution:**
```cpp
// Pin definitions
#define NRF_CE    4
#define NRF_CSN   5

// Power via external 3.3V regulator (AMS1117-3.3)
// Add 10uF + 100nF decoupling capacitors near NRF24L01 VCC pin

#include <nRF24L01.h>
#include <RF24.h>

RF24 radio(NRF_CE, NRF_CSN);

void setup() {
    // Check radio initialization
    if (!radio.begin()) {
        Serial.println("NRF24L01 not responding!");
        
        // Diagnostic steps
        Serial.println("Check:");
        Serial.println("1. Power supply: 3.3V stable?");
        Serial.println("2. Decoupling: 10uF near VCC?");
        Serial.println("3. Wiring: CE/CSN swapped?");
        Serial.println("4. Pull-up on CE?");
        return;
    }
    
    // Configure for stability
    radio.setDataRate(RF24_1MBPS);      // Lower rate = more reliable
    radio.setPALevel(RF24_PA_LOW);      // Lower power = less noise
    radio.setChannel(108);              // Above WiFi channels
    radio.setRetries(15, 15);           // Max retries
}
```

### CE/CSN Pin Issues

CE and CSN are often confused. CE controls TX/RX mode, CSN is chip select.

```cpp
// Correct pin assignment
#define NRF_CE    4    // Controls TX/RX switching
#define NRF_CSN   5    // SPI chip select (active LOW)

// Common mistake: swapping CE and CSN
// CE=5, CSN=4 won't work reliably
```

### Channel and Data Rate Conflicts with WiFi

WiFi uses channels 1-13 (2.4GHz). NRF24L01 can use channels 0-125.

```cpp
// Use channel above WiFi range
radio.setChannel(108);  // 2.508 GHz, above WiFi channel 13

// Or use lower channel to avoid WiFi interference
radio.setChannel(2);    // 2.402 GHz, below WiFi channel 1
```

---

## 3. Power Supply Problems

### 3.3V vs 5V Issues

ESP32 GPIOs are **3.3V logic only**. Connecting 5V signals directly can damage the chip.

```cpp
// Level shifter for 5V sensors
#include <Wire.h>

// Bidirectional level shifter using BSS138
// SDA_IN (5V sensor) → SDA_OUT (3.3V ESP32)
// SCL_IN (5V sensor) → SCL_OUT (3.3V ESP32)

void setup() {
    Wire.begin(21, 22);  // SDA, SCL
    
    // Verify I2C is working after level shifting
    Wire.setClock(100000);  // 100kHz for reliability
    scanI2C();
}
```

### Decoupling Capacitors

**Rule:** 100nF ceramic capacitor on every VCC pin, 10uF bulk capacitor per power rail.

```
NRF24L01 Power:
    VCC ──┬── 10uF electrolytic ── GND
          ├── 100nF ceramic ── GND
          └── to ESP32 3.3V regulator

ESP32 Power:
    3V3 ──┬── 10uF ceramic ── GND
          ├── 100nF ceramic ── GND (near each VCC pin)
          └── USB power or external supply
```

---

## 4. Flash Firmware Errors

### Boot Mode Issues

ESP32 enters boot mode based on GPIO pins during reset:
- **Download mode:** GPIO0 LOW, GPIO2 LOW, GPIO12 LOW
- **SPI boot (normal):** GPIO0 HIGH

```cpp
// Force boot mode via code
#include <rom/rtc.h>

void checkBootMode() {
    Serial.printf("Reset reason: %d\n", rtc_get_reset_reason(0));
    // 1=power-on, 3=software reset, 5=deep-sleep wakeup
    
    // Check if stuck in boot mode
    if (digitalRead(0) == LOW) {
        Serial.println("WARNING: GPIO0 LOW - may enter download mode on reset");
    }
}
```

### Flash Size and Partition Table

```cpp
// Check flash size at runtime
#include <esp_flash.h>

void checkFlash() {
    uint32_t flashSize;
    esp_flash_get_size(NULL, &flashSize);
    Serial.printf("Flash size: %d MB\n", flashSize / 1024 / 1024);
    
    // Common partition table errors
    // "A fatal error occurred: This chip is ESP32 not ESP32-S2..."
    // Solution: Select correct board in Arduino IDE or PlatformIO
    
    // "Partition table invalid"
    // Solution: Use default partition table or custom one
    // In platformio.ini:
    // board_build.partitions = huge_app.csv
}
```

### Flashing Errors

```bash
# Common flash errors and solutions

# Error: "Failed to connect to ESP32"
# Solution: Hold BOOT button while pressing RESET
# Or: Check USB cable (data lines, not just power)

# Error: "A fatal error occurred: MD5 of file does not match"
# Solution: Erase flash completely
esptool.py --port /dev/ttyUSB0 erase_flash

# Error: "Wrong boot mode detected (0x13)"
# Solution: 
# 1. Hold BOOT button
# 2. Press and release RESET
# 3. Release BOOT button
# 4. Flash firmware

# Error: "Stuck in download mode"
# Solution: Check GPIO0, GPIO2, GPIO12 pull-ups
# Add 10kΩ pull-up resistors to GPIO0 and GPIO2
```

---

## 5. Serial Communication Debugging

### Baud Rate Mismatch

```cpp
// Standard baud rates for ESP32
// USB: 115200 (default)
// Hardware UART: 9600-921600
// Software Serial: 9600-57600 (unreliable above)

void setup() {
    Serial.begin(115200);  // Must match terminal settings
    
    // Debug: verify baud rate is set correctly
    delay(1000);
    Serial.println("=== ESP32 Debug Start ===");
    Serial.printf("CPU freq: %d MHz\n", ESP.getCpuFreqMHz());
    Serial.printf("Free heap: %d bytes\n", ESP.getFreeHeap());
}
```

### USB-UART Driver Issues

```cpp
// Common problems:
// 1. CH340/CH341 drivers not installed (Linux: sudo apt install ch341-dkms)
// 2. CP2102 drivers missing (Silicon Labs website)
// 3. Wrong port selected in IDE

// Diagnostic: check if USB device is detected
// Linux: lsusb | grep -i "1a86\|10c4\|0403"
// Windows: Device Manager → Ports (COM & LPT)
// macOS: system_profiler SPUSBDataType

// Auto-reset circuit (built into most dev boards)
// DTR → capacitor → GPIO0 (boot mode)
// RTS → capacitor → EN (reset)
```

### Serial Debug Macros

```cpp
// Debugging helper macros
#define DEBUG_SERIAL if(Serial)
#define DEBUG_BAUD 115200

#ifdef DEBUG
    #define DBG_PRINT(x) DEBUG_SERIAL print(x)
    #define DBG_PRINTLN(x) DEBUG_SERIAL println(x)
    #define DBG_PRINTF(fmt, ...) DEBUG_SERIAL printf(fmt, __VA_ARGS__)
#else
    #define DBG_PRINT(x)
    #define DBG_PRINTLN(x)
    #define DBG_PRINTF(fmt, ...)
#endif

// Usage
void setup() {
    Serial.begin(DEBUG_BAUD);
    DBG_PRINTLN("Debug mode enabled");
    DBG_PRINTF("Heap: %d\n", ESP.getFreeHeap());
}
```

---

## 6. WiFi/BLE Interference

### Channel Selection

WiFi and BLE both use 2.4GHz band. NRF24L01 is also 2.4GHz.

```cpp
#include <WiFi.h>

void setupWiFi() {
    // Use channel 1 to minimize interference with NRF24L01 (channel 108)
    WiFi.begin(ssid, password, 1);  // Channel 1
    
    // Or use channel 6 (center of WiFi band)
    // WiFi.begin(ssid, password, 6);
    
    // Monitor interference
    WiFi.mode(WIFI_STA);
    int rssi = WiFi.RSSI();
    Serial.printf("WiFi RSSI: %d dBm\n", rssi);
    
    // Weak signal = more interference
    if (rssi < -70) {
        Serial.println("Weak WiFi signal - consider channel change");
    }
}
```

### BLE Coexistence

ESP32 can run WiFi and BLE simultaneously but with performance trade-offs.

```cpp
#include <BLEDevice.h>
#include <BLEServer.h>

void setupBLE() {
    BLEDevice::init("ESP32-Security");
    
    // Reduce BLE power to minimize WiFi interference
    esp_ble_tx_power_set(ESP_BLE_PWR_TYPE_DEFAULT, ESP_PWR_LVL_N0);  // 0dBm
    esp_ble_tx_power_set(ESP_BLE_PWR_TYPE_ADV, ESP_PWR_LVL_N0);
    esp_ble_tx_power_set(ESP_BLE_PWR_TYPE_SCAN, ESP_PWR_LVL_N0);
    
    // Use BLE 1M PHY for better range/stability
    // vs 2M PHY which is faster but shorter range
}
```

---

## 7. Memory Issues

### Heap Fragmentation

```cpp
#include <Arduino.h>

void checkHeap() {
    Serial.printf("Free heap: %d bytes\n", ESP.getFreeHeap());
    Serial.printf("Min free heap: %d bytes\n", ESP.getMinimumFreeHeap());
    Serial.printf("Max alloc heap: %d bytes\n", ESP.getMaxAllocHeap());
    
    // Detect fragmentation
    size_t freeBlock = ESP.getLargestFreeBlock();
    size_t totalFree = ESP.getFreeHeap();
    
    if (freeBlock < totalFree / 2) {
        Serial.println("WARNING: High heap fragmentation!");
        Serial.printf("Largest block: %d / Total free: %d\n", freeBlock, totalFree);
    }
}

// Avoid fragmentation:
// 1. Pre-allocate buffers
// 2. Avoid frequent malloc/free
// 3. Use fixed-size buffers
// 4. Avoid String class (use char arrays)
```

### Stack Overflow Detection

```cpp
// Enable stack overflow detection in FreeRTOS
void setup() {
    // Check stack usage
    UBaseType_t highWaterMark = uxTaskGetStackHighWaterMark(NULL);
    Serial.printf("Stack high water mark: %d words\n", highWaterMark);
    
    // If less than 100 words free, increase stack size
    if (highWaterMark < 100) {
        Serial.println("WARNING: Low stack space!");
    }
}

// In FreeRTOS tasks, specify stack size explicitly
xTaskCreatePinnedToCore(
    myTask,      // Function
    "MyTask",    // Name
    8192,        // Stack size in bytes (increase if stack overflow)
    NULL,        // Parameters
    1,           // Priority
    NULL,        // Task handle
    0            // Core
);
```

### Memory Leak Detection

```cpp
// Periodic memory check
void memoryMonitor() {
    static size_t lastFree = 0;
    size_t currentFree = ESP.getFreeHeap();
    
    if (lastFree > 0 && currentFree < lastFree - 1024) {
        Serial.printf("MEMORY LEAK: Free heap decreased by %d bytes\n", 
                      lastFree - currentFree);
    }
    lastFree = currentFree;
}

// Call periodically
void loop() {
    static unsigned long lastCheck = 0;
    if (millis() - lastCheck > 30000) {  // Every 30 seconds
        memoryMonitor();
        lastCheck = millis();
    }
    // ... main code
}
```

---

## Quick Reference: Common Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| `Guru Meditation Error` | Unhandled exception | Add try-catch, check null pointers |
| `Stack smashing detected` | Stack overflow | Increase task stack size |
| `Heap corruption` | Use-after-free | Check pointer validity |
| `Brownout detector triggered` | Power supply dip | Add decoupling capacitors, check current draw |
| `Reset reason: 4 (Exception)` | Crash | Add watchdog timer, check for infinite loops |
| `SPI Flash error` | Flash corruption | Re-flash firmware, check power stability |

---

## References

- [ESP32 Technical Reference Manual](https://www.espressif.com/en/documentation/esp32技术参考手册)
- [ESP32 Arduino Core GitHub Issues](https://github.com/espressif/arduino-esp32/issues)
- [NRF24L01 Troubleshooting](https://github.com/nRF24/RF24/issues)
- [ESP32 Power Supply Design Guide](https://www.espressif.com/en/documentation/电源设计指南)
