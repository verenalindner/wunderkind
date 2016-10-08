#include <Adafruit_NeoPixel.h>
#ifdef __AVR_ATtiny85__ // Trinket, Gemma, etc.
 #include <avr/power.h>
#endif
 
#define PIN 6
 
Adafruit_NeoPixel pixels = Adafruit_NeoPixel(24, PIN);
 
uint8_t  offset = 0; // Position of spinny eyes
uint32_t color  = 0xffcccccc; // Colour is grey/white
uint32_t prevTime;
 
void setup() {
  pixels.begin();
  pixels.setBrightness(50); // 1/3 brightness
  
}
 
void loop() {
  uint8_t  i;
 
    for(i=0; i<25; i++) {
      uint32_t c = 0;
      if(((offset + i) & 7) < 4) c = color; // 4 pixels on...
      pixels.setPixelColor(   i, c); // First eye
      pixels.setPixelColor(47-i, c); // Second eye (flipped)
    }
    pixels.show();
    offset++;
    delay(80);
    
}
