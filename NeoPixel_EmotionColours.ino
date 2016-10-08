#include <Adafruit_NeoPixel.h>
#ifdef __AVR__
  #include <avr/power.h>
#endif


#define PIN 6
#define NUMPIXELS 24
Adafruit_NeoPixel strip = Adafruit_NeoPixel(NUMPIXELS, PIN, NEO_GRB + NEO_KHZ800);
int i;

void setup() {
  strip.begin();
  strip.show(); // Initialize all pixels to 'off'
  strip.setBrightness(60);

}

void loop() {

 // for (i=0; i< 24; i+7) {
  strip.setPixelColor(0, strip.Color(78,4,109)); // first SURPRISE ME
  strip.setPixelColor(6, strip.Color(78,4,109)); // first SURPRISE ME
  strip.setPixelColor(12, strip.Color(78,4,109)); // first SURPRISE ME
  strip.setPixelColor(18, strip.Color(78,4,109)); // first SURPRISE ME
 // }
  
  for (i=1; i<6; i++) {
    strip.setPixelColor(i, strip.Color(243,156,18)); // yellow
  }
  
  for (i=7; i<12; i++) {
    strip.setPixelColor(i, strip.Color(0,92,1)); // green
  }
  for (i=13; i<18; i++) {
    strip.setPixelColor(i, strip.Color(0,55,128)); // blue
  }
  for (i=19; i<24;i++) {
    strip.setPixelColor(i, strip.Color(135,0,0)); // red
  }
  strip.show();

}
